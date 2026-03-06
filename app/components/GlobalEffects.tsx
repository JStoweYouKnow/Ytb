'use client';

import React, { useEffect, useState } from 'react';

export default function GlobalEffects() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Time of day theme shifting (Night = Lavender lean)
        const hour = new Date().getHours();
        if (hour >= 19 || hour < 6) {
            document.documentElement.classList.add('theme-night');
        }

        // Parallax effects
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30; // -15 to 15
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            setMousePos({ x, y });
        };

        // Mobile gyroscope parallax
        const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
            if (e.gamma !== null && e.beta !== null) {
                const x = Math.max(-30, Math.min(30, e.gamma));
                const y = Math.max(-30, Math.min(30, (e.beta - 45)));
                setMousePos({ x, y });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('deviceorientation', handleDeviceOrientation);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
    }, []);

    return (
        <div className="ambient-orbs-container" aria-hidden="true">
            <div
                className="ambient-orb orb-core"
                style={{ transform: `translate3d(${mousePos.x * 2}px, ${mousePos.y * 2}px, 0)` }}
            />
            <div
                className="ambient-orb orb-accent"
                style={{ transform: `translate3d(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px, 0)` }}
            />
            <div
                className="ambient-orb orb-wellness"
                style={{ transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)` }}
            />
        </div>
    );
}
