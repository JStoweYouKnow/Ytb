'use client';

import React, { useEffect, useState } from 'react';

interface AudioOrbProps {
    audioLevel: number; // 0-1
    isResponding: boolean;
    preset: string | null; // 'focus' | 'relax' | 'sleep' | null
}

export default function AudioOrb({ audioLevel, isResponding, preset }: AudioOrbProps) {
    const presetClass = preset ? `audio-orb-${preset}` : '';
    const respondingClass = isResponding ? 'audio-orb-responding' : '';

    const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number }>>([]);

    useEffect(() => {
        if (!isResponding) {
            setParticles([]);
            return;
        }

        const interval = setInterval(() => {
            setParticles(prev => [
                ...prev.slice(-15),
                {
                    id: Date.now() + Math.random(),
                    left: 20 + Math.random() * 60,
                    top: 20 + Math.random() * 60,
                    size: 4 + Math.random() * 6,
                    delay: Math.random() * 0.2
                }
            ]);
        }, 250);

        return () => clearInterval(interval);
    }, [isResponding]);

    return (
        <div className="audio-orb-wrapper">
            <div
                className={`audio-orb ${presetClass} ${respondingClass}`}
                style={{ '--audio-level': Math.min(audioLevel, 1) } as React.CSSProperties}
            >
                <div className="audio-orb-inner" />
            </div>
            {particles.map(p => (
                <div
                    key={p.id}
                    className="orb-particle"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: p.size,
                        height: p.size,
                        animationDelay: `${p.delay}s`
                    }}
                />
            ))}
        </div>
    );
}
