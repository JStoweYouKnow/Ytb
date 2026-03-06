'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, Calendar, Brain, Target, Clock, Sparkles, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import {
    loadMoodEntries, getMoodTrend, getMoodStats, loadWellnessPlan,
    loadCheckIns, loadSessionRecaps, getActivityHeatmap,
    updatePlanStep, updateCheckInStatus, type MoodEntry, type WellnessPlan, type SessionRecap, type CheckIn
} from '../lib/wellness-store';
import BrandLogo from '../components/BrandLogo';

const MOOD_COLORS: Record<string, string> = {
    happy: '#6a9f7e', energized: '#5b8fa8', calm: '#7db8c9', focused: '#5b8fa8',
    excited: '#e8a838', relaxed: '#8fc5a4',
    stressed: '#d9534f', anxious: '#e8a838', sad: '#a594cc', frustrated: '#d9534f', tired: '#a594cc',
};

const MOOD_EMOJI: Record<string, string> = {
    happy: '😊', stressed: '😰', calm: '😌', anxious: '😟', energized: '⚡',
    sad: '😢', frustrated: '😤', tired: '😴', focused: '🎯', excited: '🎉', relaxed: '🧘',
};

function MoodChart({ data }: { data: { date: string; moods: MoodEntry[] }[] }) {
    const maxMoods = Math.max(...data.map(d => d.moods.length), 1);
    return (
        <div className="dash-chart">
            <div className="dash-chart-bars">
                {data.map((day, i) => {
                    const height = day.moods.length > 0 ? Math.max((day.moods.length / maxMoods) * 100, 12) : 4;
                    const dominantMood = day.moods.length > 0
                        ? day.moods.reduce((acc: Record<string, number>, m) => { acc[m.mood] = (acc[m.mood] || 0) + 1; return acc; }, {} as Record<string, number>)
                        : null;
                    const topMood = dominantMood ? Object.entries(dominantMood).sort((a, b) => b[1] - a[1])[0][0] : null;
                    const color = topMood ? MOOD_COLORS[topMood] || 'var(--text-3)' : 'var(--surface-alt)';
                    const dayLabel = new Date(day.date).toLocaleDateString(undefined, { weekday: 'narrow' });

                    return (
                        <div key={i} className="dash-chart-col">
                            <div className="dash-chart-bar" style={{ height: `${height}%`, background: color }} title={topMood ? `${topMood} (${day.moods.length})` : 'No data'}>
                                {day.moods.length > 0 && <span className="dash-chart-count">{day.moods.length}</span>}
                            </div>
                            <span className="dash-chart-label">{dayLabel}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ActivityHeatmap({ data }: { data: { date: string; count: number }[] }) {
    const maxCount = Math.max(...data.map(d => d.count), 1);
    return (
        <div className="dash-heatmap">
            {data.map((day, i) => {
                const opacity = day.count > 0 ? Math.max(day.count / maxCount, 0.2) : 0.05;
                return (
                    <div
                        key={i}
                        className="dash-heatmap-cell"
                        style={{ opacity, background: day.count > 0 ? 'var(--wellness)' : 'var(--surface-alt)' }}
                        title={`${new Date(day.date).toLocaleDateString()}: ${day.count} activities`}
                    />
                );
            })}
        </div>
    );
}

function PlanProgress({ plan, onToggleStep }: { plan: WellnessPlan; onToggleStep: (stepId: string) => void }) {
    const completed = plan.steps.filter(s => s.completed).length;
    const total = plan.steps.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const daysSinceStart = Math.floor((Date.now() - new Date(plan.startDate).getTime()) / 86400000) + 1;

    return (
        <div className="dash-plan">
            <div className="dash-plan-header">
                <div>
                    <h3 className="dash-plan-title">{plan.title}</h3>
                    <p className="dash-plan-desc">{plan.description}</p>
                </div>
                <div className="dash-plan-badge">{pct}%</div>
            </div>
            <div className="plan-progress-bar" style={{ marginBottom: '12px' }}>
                <div className="plan-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="dash-plan-steps">
                {plan.steps.filter(s => s.day === daysSinceStart || !s.completed).slice(0, 5).map(step => (
                    <button key={step.id} className={`dash-plan-step ${step.completed ? 'done' : ''}`} onClick={() => onToggleStep(step.id)}>
                        {step.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                        <span>Day {step.day} ({step.timeOfDay}): {step.action}</span>
                    </button>
                ))}
            </div>
            <p className="dash-plan-meta">Day {Math.min(daysSinceStart, plan.days)} of {plan.days} | {completed}/{total} steps</p>
        </div>
    );
}

export default function DashboardPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [moodTrend, setMoodTrend] = useState<{ date: string; moods: MoodEntry[] }[]>([]);
    const [stats, setStats] = useState({ total: 0, topMood: 'none', streak: 0, avgPerDay: 0 });
    const [plan, setPlan] = useState<WellnessPlan | null>(null);
    const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
    const [recaps, setRecaps] = useState<SessionRecap[]>([]);
    const [heatmap, setHeatmap] = useState<{ date: string; count: number }[]>([]);

    useEffect(() => {
        setMoodTrend(getMoodTrend(7));
        setStats(getMoodStats());
        setPlan(loadWellnessPlan());
        setCheckIns(loadCheckIns().filter(c => c.status === 'pending'));
        setRecaps(loadSessionRecaps().slice(0, 5));
        setHeatmap(getActivityHeatmap(28));
        setMounted(true);
    }, []);

    const handleToggleStep = (stepId: string) => {
        updatePlanStep(stepId, true);
        setPlan(loadWellnessPlan());
    };

    const handleDismissCheckIn = (id: string) => {
        updateCheckInStatus(id, 'dismissed');
        setCheckIns(prev => prev.filter(c => c.id !== id));
    };

    if (!mounted) return null;

    const hasData = stats.total > 0 || recaps.length > 0;

    return (
        <main className="dash-page">
            <header className="dash-header">
                <button className="history-back-btn" onClick={() => router.push('/chat')}>
                    <ArrowLeft size={20} />
                </button>
                <h1>Wellness Dashboard</h1>
                <div style={{ width: 44 }} />
            </header>

            <div className="dash-body">
                {!hasData ? (
                    <div className="dash-empty">
                        <BrandLogo size={48} />
                        <h2>Your wellness journey starts here</h2>
                        <p>Start a conversation and log your moods to see insights, trends, and personalized wellness plans.</p>
                        <button className="btn btn-primary" onClick={() => router.push('/chat')}>Start a Session</button>
                    </div>
                ) : (
                    <>
                        {/* ── Stat Cards ── */}
                        <div className="dash-stats">
                            <div className="dash-stat-card">
                                <TrendingUp size={18} className="dash-stat-icon" />
                                <div className="dash-stat-value">{stats.total}</div>
                                <div className="dash-stat-label">Moods Logged</div>
                            </div>
                            <div className="dash-stat-card">
                                <Calendar size={18} className="dash-stat-icon" />
                                <div className="dash-stat-value">{stats.streak}</div>
                                <div className="dash-stat-label">Day Streak</div>
                            </div>
                            <div className="dash-stat-card">
                                <Sparkles size={18} className="dash-stat-icon" />
                                <div className="dash-stat-value">{MOOD_EMOJI[stats.topMood] || '—'}</div>
                                <div className="dash-stat-label">Top Mood</div>
                            </div>
                            <div className="dash-stat-card">
                                <Brain size={18} className="dash-stat-icon" />
                                <div className="dash-stat-value">{recaps.length}</div>
                                <div className="dash-stat-label">Sessions</div>
                            </div>
                        </div>

                        {/* ── Pending Check-ins ── */}
                        {checkIns.length > 0 && (
                            <div className="dash-section">
                                <h2 className="dash-section-title"><Clock size={16} /> Scheduled Check-ins</h2>
                                {checkIns.map(ci => (
                                    <div key={ci.id} className="dash-checkin">
                                        <div className="dash-checkin-info">
                                            <div className="dash-checkin-time">
                                                {new Date(ci.scheduledFor).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                            </div>
                                            <div className="dash-checkin-reason">{ci.reason}</div>
                                        </div>
                                        <div className="dash-checkin-actions">
                                            <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.75rem' }} onClick={() => { handleDismissCheckIn(ci.id); router.push('/chat'); }}>Check In</button>
                                            <button className="btn btn-ghost" style={{ padding: '6px 8px', fontSize: '0.7rem' }} onClick={() => handleDismissCheckIn(ci.id)}>Dismiss</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ── Mood Trend Chart ── */}
                        <div className="dash-section">
                            <h2 className="dash-section-title"><TrendingUp size={16} /> 7-Day Mood Trend</h2>
                            <MoodChart data={moodTrend} />
                        </div>

                        {/* ── Active Wellness Plan ── */}
                        {plan && plan.status === 'active' && (
                            <div className="dash-section">
                                <h2 className="dash-section-title"><Target size={16} /> Active Wellness Plan</h2>
                                <PlanProgress plan={plan} onToggleStep={handleToggleStep} />
                            </div>
                        )}

                        {/* ── Activity Heatmap ── */}
                        <div className="dash-section">
                            <h2 className="dash-section-title"><Calendar size={16} /> 28-Day Activity</h2>
                            <ActivityHeatmap data={heatmap} />
                        </div>

                        {/* ── Recent Session Recaps ── */}
                        {recaps.length > 0 && (
                            <div className="dash-section">
                                <h2 className="dash-section-title"><Sparkles size={16} /> Recent Sessions</h2>
                                <div className="dash-recaps">
                                    {recaps.map(recap => (
                                        <div key={recap.id} className="dash-recap-card">
                                            <div className="dash-recap-header">
                                                <span className="dash-recap-date">
                                                    {new Date(recap.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </span>
                                                {recap.moodShift && (
                                                    <span className="dash-recap-shift">
                                                        {MOOD_EMOJI[recap.moodShift.start] || '•'} → {MOOD_EMOJI[recap.moodShift.end] || '•'}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="dash-recap-summary">{recap.summary}</p>
                                            {recap.topicsDiscussed.length > 0 && (
                                                <div className="dash-recap-topics">
                                                    {recap.topicsDiscussed.map((t, i) => (
                                                        <span key={i} className="dash-recap-topic">{t}</span>
                                                    ))}
                                                </div>
                                            )}
                                            {recap.emotionTimeline.length > 0 && (
                                                <div className="dash-emotion-mini">
                                                    {recap.emotionTimeline.slice(0, 8).map((e, i) => (
                                                        <span key={i} className="dash-emotion-dot" style={{ background: MOOD_COLORS[e.emotion] || 'var(--text-3)' }} title={e.emotion} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
