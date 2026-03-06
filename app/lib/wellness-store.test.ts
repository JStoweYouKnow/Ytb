import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    saveMoodEntry, loadMoodEntries, getMoodTrend, getMoodStats,
    saveWellnessPlan, loadWellnessPlan, updatePlanStep,
    saveEmotionFrame, loadEmotionTimeline,
    saveCheckIn, loadCheckIns, getPendingCheckIns, updateCheckInStatus,
    saveSessionRecap, loadSessionRecaps,
    isOnboardingComplete, setOnboardingComplete,
    getActivityHeatmap,
    type MoodEntry, type WellnessPlan, type EmotionFrame, type CheckIn, type SessionRecap,
} from './wellness-store';

// Mock localStorage
let store: Record<string, string> = {};
const localStorageMock = {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
    store = {};
    vi.clearAllMocks();
});

describe('Mood Entries', () => {
    it('saves and loads a mood entry', () => {
        const entry: MoodEntry = { mood: 'happy', note: 'Feeling great', timestamp: '2026-03-05T10:00:00Z', source: 'user' };
        saveMoodEntry(entry);
        const entries = loadMoodEntries();
        expect(entries).toHaveLength(1);
        expect(entries[0].mood).toBe('happy');
        expect(entries[0].note).toBe('Feeling great');
    });

    it('trims entries to 200 max', () => {
        for (let i = 0; i < 210; i++) {
            saveMoodEntry({ mood: 'calm', note: `Entry ${i}`, timestamp: `2026-03-05T10:00:${String(i % 60).padStart(2, '0')}Z`, source: 'user' });
        }
        const entries = loadMoodEntries();
        expect(entries).toHaveLength(200);
    });

    it('returns empty array for corrupted data', () => {
        store['ytb_mood_entries'] = 'not-json';
        const entries = loadMoodEntries();
        expect(entries).toEqual([]);
    });
});

describe('getMoodTrend', () => {
    it('returns correct number of days', () => {
        const trend = getMoodTrend(7);
        expect(trend).toHaveLength(7);
    });

    it('groups moods by date', () => {
        const today = new Date().toISOString().split('T')[0];
        saveMoodEntry({ mood: 'happy', note: '', timestamp: `${today}T10:00:00Z`, source: 'user' });
        saveMoodEntry({ mood: 'calm', note: '', timestamp: `${today}T14:00:00Z`, source: 'user' });
        const trend = getMoodTrend(7);
        const todayData = trend.find(d => d.date === today);
        expect(todayData?.moods).toHaveLength(2);
    });
});

describe('getMoodStats', () => {
    it('returns defaults for empty data', () => {
        const stats = getMoodStats();
        expect(stats.total).toBe(0);
        expect(stats.topMood).toBe('none');
    });

    it('calculates top mood correctly', () => {
        const today = new Date().toISOString().split('T')[0];
        saveMoodEntry({ mood: 'happy', note: '', timestamp: `${today}T10:00:00Z`, source: 'user' });
        saveMoodEntry({ mood: 'happy', note: '', timestamp: `${today}T11:00:00Z`, source: 'user' });
        saveMoodEntry({ mood: 'stressed', note: '', timestamp: `${today}T12:00:00Z`, source: 'user' });
        const stats = getMoodStats();
        expect(stats.total).toBe(3);
        expect(stats.topMood).toBe('happy');
        expect(stats.streak).toBeGreaterThanOrEqual(1);
    });
});

describe('Wellness Plans', () => {
    const samplePlan: WellnessPlan = {
        id: 'plan_1',
        title: '3-Day Stress Reset',
        description: 'A gentle stress reduction plan.',
        days: 3,
        startDate: new Date().toISOString(),
        steps: [
            { id: 'step_1', day: 1, action: 'Morning meditation', timeOfDay: 'morning', completed: false },
            { id: 'step_2', day: 2, action: 'Evening walk', timeOfDay: 'evening', completed: false },
        ],
        status: 'active',
        createdAt: new Date().toISOString(),
    };

    it('saves and loads a wellness plan', () => {
        saveWellnessPlan(samplePlan);
        const plan = loadWellnessPlan();
        expect(plan?.title).toBe('3-Day Stress Reset');
        expect(plan?.steps).toHaveLength(2);
    });

    it('updates a plan step to completed', () => {
        saveWellnessPlan(samplePlan);
        updatePlanStep('step_1', true);
        const plan = loadWellnessPlan();
        expect(plan?.steps[0].completed).toBe(true);
        expect(plan?.steps[0].completedAt).toBeDefined();
        expect(plan?.steps[1].completed).toBe(false);
    });

    it('marks plan completed when all steps done', () => {
        saveWellnessPlan(samplePlan);
        updatePlanStep('step_1', true);
        updatePlanStep('step_2', true);
        const plan = loadWellnessPlan();
        expect(plan?.status).toBe('completed');
    });

    it('returns null for missing plan', () => {
        expect(loadWellnessPlan()).toBeNull();
    });
});

describe('Emotion Timeline', () => {
    it('saves and loads emotion frames', () => {
        const frame: EmotionFrame = { emotion: 'happy', confidence: 'high', timestamp: new Date().toISOString() };
        saveEmotionFrame(frame);
        const timeline = loadEmotionTimeline();
        expect(timeline).toHaveLength(1);
        expect(timeline[0].emotion).toBe('happy');
    });

    it('trims to 500 frames max', () => {
        for (let i = 0; i < 510; i++) {
            saveEmotionFrame({ emotion: 'calm', confidence: 'medium', timestamp: new Date().toISOString() });
        }
        expect(loadEmotionTimeline()).toHaveLength(500);
    });
});

describe('Check-ins', () => {
    it('saves and loads check-ins', () => {
        const ci: CheckIn = {
            id: 'ci_1', scheduledFor: new Date(Date.now() - 1000).toISOString(),
            reason: 'Follow up on stress', status: 'pending', createdAt: new Date().toISOString(),
        };
        saveCheckIn(ci);
        expect(loadCheckIns()).toHaveLength(1);
    });

    it('gets pending check-ins that are due', () => {
        const past: CheckIn = {
            id: 'ci_past', scheduledFor: new Date(Date.now() - 60000).toISOString(),
            reason: 'Past', status: 'pending', createdAt: new Date().toISOString(),
        };
        const future: CheckIn = {
            id: 'ci_future', scheduledFor: new Date(Date.now() + 86400000).toISOString(),
            reason: 'Future', status: 'pending', createdAt: new Date().toISOString(),
        };
        saveCheckIn(past);
        saveCheckIn(future);
        const pending = getPendingCheckIns();
        expect(pending).toHaveLength(1);
        expect(pending[0].id).toBe('ci_past');
    });

    it('updates check-in status', () => {
        const ci: CheckIn = {
            id: 'ci_1', scheduledFor: new Date().toISOString(),
            reason: 'Test', status: 'pending', createdAt: new Date().toISOString(),
        };
        saveCheckIn(ci);
        updateCheckInStatus('ci_1', 'completed');
        const all = loadCheckIns();
        expect(all[0].status).toBe('completed');
    });
});

describe('Session Recaps', () => {
    it('saves and loads session recaps', () => {
        const recap: SessionRecap = {
            id: 'recap_1', sessionId: 'session_1', summary: 'Great session.',
            moodShift: { start: 'stressed', end: 'calm' }, topicsDiscussed: ['Breathing'],
            toolsUsed: ['setBinauralPreset'], emotionTimeline: [],
            duration: 300, timestamp: new Date().toISOString(),
        };
        saveSessionRecap(recap);
        const recaps = loadSessionRecaps();
        expect(recaps).toHaveLength(1);
        expect(recaps[0].summary).toBe('Great session.');
    });

    it('newest recaps appear first', () => {
        saveSessionRecap({ id: 'r1', sessionId: 's1', summary: 'First', moodShift: null, topicsDiscussed: [], toolsUsed: [], emotionTimeline: [], duration: 60, timestamp: '2026-03-01T10:00:00Z' });
        saveSessionRecap({ id: 'r2', sessionId: 's2', summary: 'Second', moodShift: null, topicsDiscussed: [], toolsUsed: [], emotionTimeline: [], duration: 60, timestamp: '2026-03-02T10:00:00Z' });
        const recaps = loadSessionRecaps();
        expect(recaps[0].id).toBe('r2');
    });

    it('trims to 50 recaps max', () => {
        for (let i = 0; i < 55; i++) {
            saveSessionRecap({ id: `r${i}`, sessionId: `s${i}`, summary: `Recap ${i}`, moodShift: null, topicsDiscussed: [], toolsUsed: [], emotionTimeline: [], duration: 60, timestamp: new Date().toISOString() });
        }
        expect(loadSessionRecaps()).toHaveLength(50);
    });
});

describe('Onboarding', () => {
    it('returns false before onboarding', () => {
        expect(isOnboardingComplete()).toBe(false);
    });

    it('returns true after onboarding', () => {
        setOnboardingComplete();
        expect(isOnboardingComplete()).toBe(true);
    });
});

describe('Activity Heatmap', () => {
    it('returns correct number of days', () => {
        const heatmap = getActivityHeatmap(28);
        expect(heatmap).toHaveLength(28);
    });

    it('counts mood entries and recaps per day', () => {
        const today = new Date().toISOString().split('T')[0];
        saveMoodEntry({ mood: 'happy', note: '', timestamp: `${today}T10:00:00Z`, source: 'user' });
        saveMoodEntry({ mood: 'calm', note: '', timestamp: `${today}T14:00:00Z`, source: 'user' });
        saveSessionRecap({ id: 'r1', sessionId: 's1', summary: 'Test', moodShift: null, topicsDiscussed: [], toolsUsed: [], emotionTimeline: [], duration: 60, timestamp: `${today}T12:00:00Z` });
        const heatmap = getActivityHeatmap(1);
        expect(heatmap[0].count).toBe(3);
    });
});
