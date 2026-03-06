'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface BrandLogoProps {
    size?: number;
    className?: string;
}

export default function BrandLogo({ size = 24, className = '' }: BrandLogoProps) {
    return (
        <div
            className={`brand-logo ${className}`}
            style={{
                width: size,
                height: size,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Sparkles
                size={size * 0.75}
                strokeWidth={2.5}
                className="brand-icon-main"
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    color: 'white',
                    zIndex: 2,
                }}
            />
            <Heart
                size={size * 0.5}
                strokeWidth={3}
                fill="currentColor"
                className="brand-icon-secondary"
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '10%',
                    color: 'rgba(255, 255, 255, 0.9)',
                    zIndex: 1,
                }}
            />
        </div>
    );
}
