'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Moon, Brain, Coffee } from 'lucide-react';
import { BinauralBeatEngine, BinauralPreset } from '../lib/audio-engine';

interface BinauralControlsProps {
    autoPlay?: boolean;
    initialPreset?: BinauralPreset;
}

export default function BinauralControls({ autoPlay = false, initialPreset = 'relax' }: BinauralControlsProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [preset, setPreset] = useState<BinauralPreset>(initialPreset);
    const engineRef = useRef<BinauralBeatEngine | null>(null);

    useEffect(() => {
        engineRef.current = new BinauralBeatEngine();

        // Auto-play if requested
        if (autoPlay) {
            handlePlay(initialPreset);
        }

        return () => {
            engineRef.current?.stop();
        };
    }, []);

    const handlePlay = (p: BinauralPreset) => {
        if (!engineRef.current) return;
        engineRef.current.play(p);
        engineRef.current.setVolume(volume);
        setIsPlaying(true);
        setPreset(p);
    };

    const handleStop = () => {
        engineRef.current?.stop();
        setIsPlaying(false);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        engineRef.current?.setVolume(v);
    };

    return (
        <div className="binaural-controls">
            <div className="binaural-header">
                <span className="binaural-title">Soundscapes 🎧</span>
                <span className="binaural-status">{isPlaying ? 'Playing • Use headphones' : 'Off'}</span>
            </div>

            <div className="binaural-presets">
                <button
                    className={`preset-btn ${preset === 'focus' ? 'active' : ''}`}
                    onClick={() => isPlaying && preset === 'focus' ? handleStop() : handlePlay('focus')}
                >
                    <Coffee size={16} /> Focus
                </button>
                <button
                    className={`preset-btn ${preset === 'relax' ? 'active' : ''}`}
                    onClick={() => isPlaying && preset === 'relax' ? handleStop() : handlePlay('relax')}
                >
                    <Brain size={16} /> Relax
                </button>
                <button
                    className={`preset-btn ${preset === 'sleep' ? 'active' : ''}`}
                    onClick={() => isPlaying && preset === 'sleep' ? handleStop() : handlePlay('sleep')}
                >
                    <Moon size={16} /> Sleep
                </button>
            </div>

            <div className="binaural-playback">
                <button
                    className="binaural-play-btn"
                    onClick={() => isPlaying ? handleStop() : handlePlay(preset)}
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                </button>

                <div className="binaural-volume">
                    <Volume2 size={16} className="volume-icon" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                    />
                </div>
            </div>
        </div>
    );
}
