'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import BinauralControls from './BinauralControls';

/* ── Breathing pattern definitions ── */
interface BreathPhase {
    label: string;
    seconds: number;
}

interface BreathPattern {
    name: string;
    description: string;
    duration: string;
    phases: BreathPhase[];
    rounds: number;
}

const PATTERNS: Record<string, BreathPattern> = {
    box: {
        name: 'Box Breathing',
        description: 'Equal inhale, hold, exhale, hold',
        duration: '4 min',
        phases: [
            { label: 'Breathe In', seconds: 4 },
            { label: 'Hold', seconds: 4 },
            { label: 'Breathe Out', seconds: 4 },
            { label: 'Hold', seconds: 4 },
        ],
        rounds: 4,
    },
    fourSevenEight: {
        name: '4-7-8 Breathing',
        description: 'Calming breath for sleep & anxiety',
        duration: '5 min',
        phases: [
            { label: 'Breathe In', seconds: 4 },
            { label: 'Hold', seconds: 7 },
            { label: 'Breathe Out', seconds: 8 },
        ],
        rounds: 4,
    },
    meditation: {
        name: '5-Minute Meditation',
        description: 'Slow, deep breathing focus',
        duration: '5 min',
        phases: [
            { label: 'Breathe In', seconds: 5 },
            { label: 'Breathe Out', seconds: 5 },
        ],
        rounds: 6,
    },
};

interface WellnessSheetProps {
    patternKey: string;
    userName: string;
    onClose: () => void;
}

export default function WellnessSheet({ patternKey, userName, onClose }: WellnessSheetProps) {
    const pattern = PATTERNS[patternKey] || PATTERNS.box;
    const [isRunning, setIsRunning] = useState(false);
    const [currentPhase, setCurrentPhase] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [countdown, setCountdown] = useState(pattern.phases[0].seconds);
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const totalPhaseSeconds = pattern.phases[currentPhase]?.seconds ?? 1;
    const progress = 1 - countdown / totalPhaseSeconds;

    // SVG ring math for 320x320
    const radius = 140;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progress);

    // Haptic feedback during Hold phase
    useEffect(() => {
        if (!isRunning) return;
        const phaseName = pattern.phases[currentPhase]?.label;
        if (phaseName === 'Hold') {
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([10, 30, 10]); // subtle vibration tap
            }
        }
    }, [countdown, currentPhase, isRunning, pattern]);

    const clearTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // Core timer
    useEffect(() => {
        if (!isRunning) return;

        intervalRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    // Move to next phase
                    setCurrentPhase((phase) => {
                        const nextPhase = phase + 1;
                        if (nextPhase >= pattern.phases.length) {
                            // Round complete
                            setCurrentRound((round) => {
                                const nextRound = round + 1;
                                if (nextRound >= pattern.rounds) {
                                    // All rounds complete
                                    setIsRunning(false);
                                    setIsComplete(true);
                                    clearTimer();
                                    return round;
                                }
                                return nextRound;
                            });
                            // Reset to first phase of new round
                            setCountdown(pattern.phases[0].seconds);
                            return 0;
                        }
                        setCountdown(pattern.phases[nextPhase].seconds);
                        return nextPhase;
                    });
                    return prev; // will be overwritten above
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearTimer();
    }, [isRunning, pattern, clearTimer]);

    const handleStart = () => {
        if (isComplete) {
            // Reset
            setCurrentPhase(0);
            setCurrentRound(0);
            setCountdown(pattern.phases[0].seconds);
            setIsComplete(false);
        }
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
        clearTimer();
    };

    return (
        <>
            <div className="sheet-backdrop" onClick={onClose} />
            <div className="wellness-sheet">
                <div className="sheet-handle" />
                <button className="sheet-close" onClick={onClose} aria-label="Close">
                    <X size={16} />
                </button>

                <div className="sheet-header">
                    <h2>{pattern.name} with {userName} 🌬️</h2>
                    <p>{pattern.duration} • {pattern.description}</p>
                </div>

                <div className="sheet-body">
                    {/* Breathing ring */}
                    <div className="breathing-ring-wrap">
                        <svg className="breathing-ring-svg" viewBox="0 0 320 320">
                            <circle className="breathing-ring-bg" cx="160" cy="160" r={radius} />
                            <circle
                                className="breathing-ring-fg"
                                cx="160"
                                cy="160"
                                r={radius}
                                strokeDasharray={circumference}
                                strokeDashoffset={isRunning || isComplete ? dashOffset : circumference}
                            />
                        </svg>
                        <div className="breathing-ring-label">
                            {isComplete ? (
                                <>
                                    <span className="breathing-phase">Complete</span>
                                    <span className="breathing-count">✨</span>
                                </>
                            ) : (
                                <>
                                    <span className="breathing-phase">
                                        {isRunning ? pattern.phases[currentPhase]?.label : 'Ready'}
                                    </span>
                                    <span className="breathing-count">
                                        {isRunning ? countdown : '—'}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Phase dots */}
                    <div className="step-dots">
                        {pattern.phases.map((_, i) => (
                            <div
                                key={i}
                                className={`step-dot ${i === currentPhase && isRunning ? 'step-dot-active' : ''}`}
                            />
                        ))}
                    </div>

                    {/* Round indicator */}
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-2)' }}>
                        Round {currentRound + 1} of {pattern.rounds}
                    </p>

                    {/* Binaural Controls */}
                    <div style={{ width: '100%', maxWidth: '300px', marginTop: '1rem' }}>
                        <BinauralControls
                            autoPlay={false}
                            initialPreset={patternKey === 'sleep' ? 'sleep' : 'relax'}
                        />
                    </div>
                </div>

                <div className="sheet-actions">
                    {isRunning ? (
                        <button className="btn btn-primary" onClick={handlePause}>Pause</button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleStart}>
                            {isComplete ? 'Restart' : 'Start'}
                        </button>
                    )}
                    <button className="sheet-back-link" onClick={onClose}>Back to chat</button>
                </div>
            </div>
        </>
    );
}
