import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BinauralBeatEngine, AmbientSoundEngine } from './audio-engine';

describe('BinauralBeatEngine', () => {
    let engine: BinauralBeatEngine;

    beforeEach(() => {
        engine = new BinauralBeatEngine();
        vi.useFakeTimers();
    });

    it('initializes without throwing', () => {
        expect(engine).toBeInstanceOf(BinauralBeatEngine);
    });

    it('can play a preset without error', () => {
        expect(() => engine.play('focus')).not.toThrow();
        expect((engine as any).isPlaying).toBe(true);
        expect((engine as any).currentPreset).toBe('focus');
    });

    it('can stop playing', () => {
        engine.play('relax');
        expect(() => engine.stop()).not.toThrow();

        // Fast-forward fade out time (1.5s + 100ms)
        vi.advanceTimersByTime(1600);
        expect((engine as any).isPlaying).toBe(false);
    });

    it('does not restart if already playing the same preset', () => {
        engine.play('sleep');
        const osc = (engine as any).leftOsc;
        engine.play('sleep');
        expect((engine as any).leftOsc).toBe(osc); // Should be exactly the same object
    });

    it('switches preset when playing a different one', () => {
        engine.play('focus');
        expect((engine as any).currentPreset).toBe('focus');
        vi.advanceTimersByTime(1600); // Let stop fade complete
        engine.play('sleep');
        expect((engine as any).currentPreset).toBe('sleep');
    });

    it('handles volume changes', () => {
        engine.play('relax');
        expect(() => engine.setVolume(0.5)).not.toThrow();
    });

    it('does nothing when stopping without playing', () => {
        expect(() => engine.stop()).not.toThrow();
    });
});

describe('AmbientSoundEngine', () => {
    let engine: AmbientSoundEngine;

    beforeEach(() => {
        // Extend the AudioContext mock with createBiquadFilter and createBuffer
        const origAC = (window as any).AudioContext;
        class ExtendedAudioContextMock extends origAC {
            createBiquadFilter() {
                return {
                    type: 'lowpass',
                    frequency: { value: 0 },
                    Q: { value: 0 },
                    connect: vi.fn(),
                    disconnect: vi.fn(),
                };
            }
            createBuffer(channels: number, length: number, _sampleRate: number) {
                return {
                    numberOfChannels: channels,
                    length,
                    sampleRate: _sampleRate,
                    getChannelData: () => new Float32Array(length),
                };
            }
            createBufferSource() {
                return {
                    buffer: null,
                    loop: false,
                    connect: vi.fn(),
                    start: vi.fn(),
                    stop: vi.fn(),
                    disconnect: vi.fn(),
                };
            }
            get sampleRate() { return 44100; }
        }
        vi.stubGlobal('AudioContext', ExtendedAudioContextMock);

        engine = new AmbientSoundEngine();
        vi.useFakeTimers();
    });

    it('initializes without throwing', () => {
        expect(engine).toBeInstanceOf(AmbientSoundEngine);
    });

    it('can play rain sound', () => {
        expect(() => engine.play('rain')).not.toThrow();
        expect((engine as any).isPlaying).toBe(true);
        expect((engine as any).currentSound).toBe('rain');
    });

    it('can play ocean sound', () => {
        expect(() => engine.play('ocean')).not.toThrow();
        expect((engine as any).currentSound).toBe('ocean');
    });

    it('can play forest sound', () => {
        expect(() => engine.play('forest')).not.toThrow();
        expect((engine as any).currentSound).toBe('forest');
    });

    it('does not restart if already playing the same sound', () => {
        engine.play('rain');
        const node = (engine as any).noiseNode;
        engine.play('rain');
        expect((engine as any).noiseNode).toBe(node);
    });

    it('can stop playing', () => {
        engine.play('ocean');
        expect(() => engine.stop()).not.toThrow();
        vi.advanceTimersByTime(2200);
        expect((engine as any).isPlaying).toBe(false);
    });

    it('handles volume changes', () => {
        engine.play('forest');
        expect(() => engine.setVolume(0.3)).not.toThrow();
    });

    it('does nothing when stopping without playing', () => {
        expect(() => engine.stop()).not.toThrow();
    });
});
