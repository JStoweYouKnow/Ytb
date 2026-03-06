'use client';

import React from 'react';

const WELLNESS_OPTIONS = [
    { id: 'breathing', label: 'Breathing', emoji: '🌬️' },
    { id: 'meditation', label: 'Meditation', emoji: '🧘' },
    { id: 'grounding', label: 'Grounding', emoji: '🌿' },
    { id: 'sleep', label: 'Sleep', emoji: '🌙' },
    { id: 'cooldown', label: 'Cool Down', emoji: '🧊' },
    { id: 'relax', label: 'Reset', emoji: '🫧' },
];

const WELLNESS_PROMPTS: Record<string, string> = {
    breathing: 'I need a breathing exercise',
    meditation: 'I want to meditate',
    grounding: 'I need help being mindful',
    sleep: "I can't sleep",
    cooldown: 'I feel angry and frustrated',
    relax: 'I need to relax and unwind',
};

interface WellnessStripProps {
    onSelect: (message: string) => void;
}

export default function WellnessStrip({ onSelect }: WellnessStripProps) {
    return (
        <div className="wellness-strip">
            {WELLNESS_OPTIONS.map((opt) => (
                <button
                    key={opt.id}
                    className="wellness-pill"
                    onClick={() => onSelect(WELLNESS_PROMPTS[opt.id])}
                    aria-label={opt.label}
                >
                    <span>{opt.emoji}</span>
                    <span>{opt.label}</span>
                </button>
            ))}
        </div>
    );
}
