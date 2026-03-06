'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedMessage({ content, isLatest, onUpdate }: { content: string; isLatest: boolean; onUpdate?: () => void }) {
    const [displayed, setDisplayed] = useState('');
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        // If it's already animated or no longer the latest, just show the full text instantly
        if (!isLatest || hasAnimatedRef.current) {
            setDisplayed(content);
            if (!isLatest) hasAnimatedRef.current = true;
            return;
        }

        setDisplayed('');
        const words = content.split(' ');
        let i = 0;

        const interval = setInterval(() => {
            setDisplayed(words.slice(0, i + 1).join(' '));
            i++;
            if (onUpdate) onUpdate();
            if (i >= words.length) {
                clearInterval(interval);
                hasAnimatedRef.current = true;
                if (onUpdate) setTimeout(onUpdate, 100); // Final alignment scroll
            }
        }, 50);

        return () => clearInterval(interval);
    }, [content, isLatest, onUpdate]);

    return <span>{displayed}</span>;
}
