'use client';

import React from 'react';
import { X, TrendingUp, Sparkles, Clock } from 'lucide-react';
import type { SessionRecap as SessionRecapType } from '../lib/wellness-store';

const MOOD_EMOJI: Record<string, string> = {
    happy: '😊', stressed: '😰', calm: '😌', anxious: '😟', energized: '⚡',
    sad: '😢', frustrated: '😤', tired: '😴', focused: '🎯', excited: '🎉', relaxed: '🧘',
};

const MOOD_COLORS: Record<string, string> = {
    happy: '#6a9f7e', energized: '#5b8fa8', calm: '#7db8c9', focused: '#5b8fa8',
    excited: '#e8a838', relaxed: '#8fc5a4',
    stressed: '#d9534f', anxious: '#e8a838', sad: '#a594cc', frustrated: '#d9534f', tired: '#a594cc',
};

interface SessionRecapProps {
    recap: SessionRecapType;
    onClose: () => void;
    onViewDashboard: () => void;
}

export default function SessionRecap({ recap, onClose, onViewDashboard }: SessionRecapProps) {
    const hasMoodShift = recap.moodShift?.start && recap.moodShift?.end && recap.moodShift.start !== recap.moodShift.end;
    const durationMin = Math.round(recap.duration / 60);

    return (
        <>
            <div className="sheet-backdrop" onClick={onClose} />
            <div className="recap-sheet">
                <button className="sheet-close" onClick={onClose} aria-label="Close">
                    <X size={16} />
                </button>

                <div className="recap-content">
                    <div className="recap-header">
                        <Sparkles size={24} className="recap-icon" />
                        <h2>Session Recap</h2>
                        {durationMin > 0 && <span className="recap-duration"><Clock size={12} /> {durationMin} min</span>}
                    </div>

                    {/* Mood shift */}
                    {hasMoodShift && (
                        <div className="recap-mood-shift">
                            <div className="recap-mood-start">
                                <span className="recap-mood-emoji">{MOOD_EMOJI[recap.moodShift!.start] || '•'}</span>
                                <span className="recap-mood-text">{recap.moodShift!.start}</span>
                            </div>
                            <TrendingUp size={20} className="recap-arrow" />
                            <div className="recap-mood-end">
                                <span className="recap-mood-emoji">{MOOD_EMOJI[recap.moodShift!.end] || '•'}</span>
                                <span className="recap-mood-text">{recap.moodShift!.end}</span>
                            </div>
                        </div>
                    )}

                    {/* Summary */}
                    <p className="recap-summary">{recap.summary}</p>

                    {/* Emotion timeline mini */}
                    {recap.emotionTimeline.length > 0 && (
                        <div className="recap-timeline">
                            <h3 className="recap-section-title">Emotion Journey</h3>
                            <div className="recap-timeline-bar">
                                {recap.emotionTimeline.map((e, i) => (
                                    <div
                                        key={i}
                                        className="recap-timeline-segment"
                                        style={{ background: MOOD_COLORS[e.emotion] || 'var(--text-3)', flex: 1 }}
                                        title={e.emotion}
                                    />
                                ))}
                            </div>
                            <div className="recap-timeline-labels">
                                <span>Start</span>
                                <span>End</span>
                            </div>
                        </div>
                    )}

                    {/* Topics */}
                    {recap.topicsDiscussed.length > 0 && (
                        <div className="recap-topics">
                            {recap.topicsDiscussed.map((t, i) => (
                                <span key={i} className="recap-topic-tag">{t}</span>
                            ))}
                        </div>
                    )}

                    {/* Tools used */}
                    {recap.toolsUsed.length > 0 && (
                        <div className="recap-tools">
                            <span className="recap-tools-label">Tools used:</span>
                            {recap.toolsUsed.filter(t => !['getUserContext', 'generateSessionRecap', 'logEmotionFrame'].includes(t)).map((t, i) => (
                                <span key={i} className="recap-tool-tag">{t.replace(/([A-Z])/g, ' $1').trim()}</span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="recap-actions">
                    <button className="btn btn-primary" onClick={onViewDashboard}>View Dashboard</button>
                    <button className="sheet-back-link" onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    );
}
