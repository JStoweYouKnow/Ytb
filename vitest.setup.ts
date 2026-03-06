import '@testing-library/jest-dom';
import { vi } from 'vitest';

class AudioContextMock {
    createOscillator() {
        return {
            type: 'sine',
            frequency: { value: 0 },
            connect: vi.fn(),
            start: vi.fn(),
            stop: vi.fn(),
            disconnect: vi.fn(),
        };
    }
    createGain() {
        return {
            gain: {
                value: 0,
                setValueAtTime: vi.fn(),
                linearRampToValueAtTime: vi.fn(),
                cancelScheduledValues: vi.fn(),
                setTargetAtTime: vi.fn(),
            },
            connect: vi.fn(),
            disconnect: vi.fn(),
        };
    }
    createStereoPanner() {
        return {
            pan: { value: 0 },
            connect: vi.fn(),
            disconnect: vi.fn(),
        };
    }
    createChannelSplitter() {
        return { connect: vi.fn(), disconnect: vi.fn() };
    }
    createChannelMerger() {
        return { connect: vi.fn(), disconnect: vi.fn() };
    }
    get currentTime() { return 0; }
    get state() { return 'running'; }
    resume = vi.fn().mockResolvedValue(undefined);
    close = vi.fn().mockResolvedValue(undefined);
    destination = {};
}

vi.stubGlobal('AudioContext', AudioContextMock);
vi.stubGlobal('webkitAudioContext', AudioContextMock);
