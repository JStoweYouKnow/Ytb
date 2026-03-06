'use client';

import React, { useRef, useState } from 'react';

export default function MagneticWrapper({ children, strength = 0.2 }: { children: React.ReactNode, strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        setPosition({ x: distanceX * strength, y: distanceY * strength });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                transition: position.x === 0 && position.y === 0 ? 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
                display: 'inline-block'
            }}
        >
            {children}
        </div>
    );
}
