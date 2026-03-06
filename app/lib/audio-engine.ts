export type BinauralPreset = 'focus' | 'relax' | 'sleep';

interface PresetConfig {
    baseFreq: number;
    beatFreq: number; // The difference between L and R
    gain: number;
}

const PRESETS: Record<BinauralPreset, PresetConfig> = {
    focus: { baseFreq: 220, beatFreq: 14, gain: 0.15 }, // Alpha/Beta (14Hz) - Alert focus
    relax: { baseFreq: 180, beatFreq: 6, gain: 0.15 },  // Theta (6Hz) - Meditation/Relaxation
    sleep: { baseFreq: 150, beatFreq: 3, gain: 0.1 },   // Delta (3Hz) - Deep sleep
};

export class BinauralBeatEngine {
    private ctx: AudioContext | null = null;
    private leftOsc: OscillatorNode | null = null;
    private rightOsc: OscillatorNode | null = null;
    private leftGain: GainNode | null = null;
    private rightGain: GainNode | null = null;
    private masterGain: GainNode | null = null;
    private currentPreset: BinauralPreset = 'relax';
    private isPlaying: boolean = false;

    constructor() {
        // We initialize context lazily on first play
    }

    private initContext() {
        if (!this.ctx) {
            // @ts-ignore - Handle Safari/Webkit
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContextClass();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    public play(preset: BinauralPreset = 'relax') {
        this.initContext();
        if (!this.ctx) return;

        // If already playing same preset, do nothing
        if (this.isPlaying && this.currentPreset === preset) return;

        // If playing different preset, stop first
        if (this.isPlaying) {
            this.stop();
        }

        this.currentPreset = preset;
        const config = PRESETS[preset];

        // Master Gain (for fade in/out)
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 2); // 2s fade in
        this.masterGain.connect(this.ctx.destination);

        // Left Channel (Base Freq)
        const splitter = this.ctx.createChannelSplitter(2); // L=0, R=1
        const merger = this.ctx.createChannelMerger(2);

        // We use StereoPanner if available, or manual channel splitting for older browser support
        // Simplified: Oscillator -> Panner -> Master

        // Left Tone
        this.leftOsc = this.ctx.createOscillator();
        this.leftOsc.type = 'sine';
        this.leftOsc.frequency.value = config.baseFreq;

        const leftPanner = this.ctx.createStereoPanner();
        leftPanner.pan.value = -1; // Full Left

        this.leftGain = this.ctx.createGain();
        this.leftGain.gain.value = config.gain;

        this.leftOsc.connect(this.leftGain);
        this.leftGain.connect(leftPanner);
        leftPanner.connect(this.masterGain);

        // Right Tone (Base + Beat Freq)
        this.rightOsc = this.ctx.createOscillator();
        this.rightOsc.type = 'sine';
        this.rightOsc.frequency.value = config.baseFreq + config.beatFreq;

        const rightPanner = this.ctx.createStereoPanner();
        rightPanner.pan.value = 1; // Full Right

        this.rightGain = this.ctx.createGain();
        this.rightGain.gain.value = config.gain;

        this.rightOsc.connect(this.rightGain);
        this.rightGain.connect(rightPanner);
        rightPanner.connect(this.masterGain);

        // Start
        this.leftOsc.start();
        this.rightOsc.start();
        this.isPlaying = true;
    }

    public stop() {
        if (!this.ctx || !this.isPlaying) return;

        // Fade out
        const fadeOutTime = 1.5;
        try {
            if (this.masterGain) {
                this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
                this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
                this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + fadeOutTime);
            }

            // Stop oscillators after fade
            setTimeout(() => {
                if (this.leftOsc) { this.leftOsc.stop(); this.leftOsc.disconnect(); }
                if (this.rightOsc) { this.rightOsc.stop(); this.rightOsc.disconnect(); }
                this.isPlaying = false;
            }, (fadeOutTime * 1000) + 100);
        } catch (e) {
            console.error('Error stopping audio:', e);
            this.isPlaying = false;
        }
    }

    public setVolume(val: number) {
        // clamp 0-1
        if (this.leftGain && this.rightGain) {
            // Scale based on preset base gain
            const config = PRESETS[this.currentPreset];
            this.leftGain.gain.setTargetAtTime(config.gain * val, this.ctx?.currentTime || 0, 0.1);
            this.rightGain.gain.setTargetAtTime(config.gain * val, this.ctx?.currentTime || 0, 0.1);
        }
    }
}

// ================================================================
// Ambient Soundscape Engine (Procedural noise-based sounds)
// ================================================================

export type AmbientSound = 'rain' | 'ocean' | 'forest';

export class AmbientSoundEngine {
    private ctx: AudioContext | null = null;
    private noiseNode: AudioBufferSourceNode | null = null;
    private masterGain: GainNode | null = null;
    private filterNode: BiquadFilterNode | null = null;
    private lfoNode: OscillatorNode | null = null;
    private lfoGain: GainNode | null = null;
    private isPlaying: boolean = false;
    private currentSound: AmbientSound = 'rain';

    private initContext() {
        if (!this.ctx) {
            // @ts-ignore
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContextClass();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    private createNoiseBuffer(type: AmbientSound): AudioBuffer {
        if (!this.ctx) throw new Error('No audio context');
        const sampleRate = this.ctx.sampleRate;
        const duration = 4;
        const bufferSize = sampleRate * duration;
        const buffer = this.ctx.createBuffer(2, bufferSize, sampleRate);

        for (let channel = 0; channel < 2; channel++) {
            const data = buffer.getChannelData(channel);
            let lastVal = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                switch (type) {
                    case 'rain':
                        // Brown noise (rain-like)
                        lastVal = lastVal + 0.02 * white;
                        lastVal = Math.max(-1, Math.min(1, lastVal));
                        data[i] = lastVal * 0.5;
                        if (Math.random() < 0.0003) data[i] += (Math.random() - 0.5) * 0.7;
                        break;
                    case 'ocean':
                        // Modulated pink noise
                        lastVal = 0.97 * lastVal + white * 0.15;
                        data[i] = lastVal * (0.5 + 0.5 * Math.sin(2 * Math.PI * (i / sampleRate) * 0.08));
                        break;
                    case 'forest':
                        // Very quiet base with chirps
                        data[i] = white * 0.04;
                        if (Math.random() < 0.00004) {
                            const chirpLen = Math.min(600, bufferSize - i);
                            const freq = 2000 + Math.random() * 3000;
                            for (let j = 0; j < chirpLen; j++) {
                                data[i + j] += Math.sin(2 * Math.PI * freq * j / sampleRate) * Math.sin(Math.PI * j / chirpLen) * 0.1;
                            }
                        }
                        break;
                }
            }
        }
        return buffer;
    }

    public play(sound: AmbientSound = 'rain') {
        this.initContext();
        if (!this.ctx) return;
        if (this.isPlaying && this.currentSound === sound) return;
        if (this.isPlaying) this.stop();

        this.currentSound = sound;

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.6, this.ctx.currentTime + 3);
        this.masterGain.connect(this.ctx.destination);

        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.value = sound === 'rain' ? 3000 : sound === 'ocean' ? 800 : 6000;
        this.filterNode.Q.value = sound === 'ocean' ? 0.7 : 0.5;
        this.filterNode.connect(this.masterGain);

        if (sound === 'ocean') {
            this.lfoNode = this.ctx.createOscillator();
            this.lfoGain = this.ctx.createGain();
            this.lfoNode.frequency.value = 0.06;
            this.lfoGain.gain.value = 400;
            this.lfoNode.connect(this.lfoGain);
            this.lfoGain.connect(this.filterNode.frequency);
            this.lfoNode.start();
        }

        const buffer = this.createNoiseBuffer(sound);
        this.noiseNode = this.ctx.createBufferSource();
        this.noiseNode.buffer = buffer;
        this.noiseNode.loop = true;
        this.noiseNode.connect(this.filterNode);
        this.noiseNode.start();
        this.isPlaying = true;
    }

    public stop() {
        if (!this.ctx || !this.isPlaying) return;
        const fadeOut = 2;
        try {
            if (this.masterGain) {
                this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
                this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
                this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + fadeOut);
            }
            setTimeout(() => {
                if (this.noiseNode) { try { this.noiseNode.stop(); this.noiseNode.disconnect(); } catch {} }
                if (this.lfoNode) { try { this.lfoNode.stop(); this.lfoNode.disconnect(); } catch {} }
                this.isPlaying = false;
            }, (fadeOut * 1000) + 100);
        } catch {
            this.isPlaying = false;
        }
    }

    public setVolume(val: number) {
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setTargetAtTime(0.6 * val, this.ctx.currentTime, 0.1);
        }
    }
}
