'use client';

import React from 'react';

interface SegmentedControlProps {
    options: Array<{
        value: string;
        label: string;
        description?: string;
    }>;
    value: string;
    onChange: (value: string) => void;
}

export default function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
    return (
        <div className="segmented-control">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    className={`segment-option ${value === opt.value ? 'segment-option-active' : ''}`}
                    onClick={() => onChange(opt.value)}
                    aria-pressed={value === opt.value}
                >
                    <span>{opt.label}</span>
                    {opt.description && <span className="segment-desc">{opt.description}</span>}
                </button>
            ))}
        </div>
    );
}
