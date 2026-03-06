// ── Client-side wellness data persistence (localStorage) ──
// Mirrors Firestore collections for offline-first capability

const MOODS_KEY = 'ytb_mood_entries';
const PLANS_KEY = 'ytb_wellness_plan';
const EMOTIONS_KEY = 'ytb_emotion_timeline';
const CHECKINS_KEY = 'ytb_check_ins';
const RECAPS_KEY = 'ytb_session_recaps';
const ONBOARDING_KEY = 'ytb_onboarding_complete';

// ── Types ──

export type MoodEntry = {
    mood: string;
    note: string;
    timestamp: string;
    source: 'user' | 'vision' | 'agent';
};

export type WellnessPlan = {
    id: string;
    title: string;
    description: string;
    days: number;
    startDate: string;
    steps: WellnessPlanStep[];
    status: 'active' | 'completed' | 'paused';
    createdAt: string;
};

export type WellnessPlanStep = {
    id: string;
    day: number;
    action: string;
    timeOfDay: string;
    completed: boolean;
    completedAt?: string;
};

export type EmotionFrame = {
    emotion: string;
    confidence: string;
    timestamp: string;
    sessionId?: string;
};

export type CheckIn = {
    id: string;
    scheduledFor: string;
    reason: string;
    status: 'pending' | 'completed' | 'dismissed';
    createdAt: string;
};

export type SessionRecap = {
    id: string;
    sessionId: string;
    summary: string;
    moodShift: { start: string; end: string } | null;
    topicsDiscussed: string[];
    toolsUsed: string[];
    emotionTimeline: EmotionFrame[];
    duration: number;
    timestamp: string;
};

// ── Mood Entries ──

export function saveMoodEntry(entry: MoodEntry): void {
    if (typeof window === 'undefined') return;
    const entries = loadMoodEntries();
    entries.push(entry);
    // Keep last 200 entries
    const trimmed = entries.slice(-200);
    localStorage.setItem(MOODS_KEY, JSON.stringify(trimmed));
}

export function loadMoodEntries(): MoodEntry[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(MOODS_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export function getMoodTrend(days: number = 7): { date: string; moods: MoodEntry[] }[] {
    const entries = loadMoodEntries();
    const now = new Date();
    const result: { date: string; moods: MoodEntry[] }[] = [];

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayMoods = entries.filter(e => e.timestamp.startsWith(dateStr));
        result.push({ date: dateStr, moods: dayMoods });
    }
    return result;
}

export function getMoodStats(): { total: number; topMood: string; streak: number; avgPerDay: number } {
    const entries = loadMoodEntries();
    if (entries.length === 0) return { total: 0, topMood: 'none', streak: 0, avgPerDay: 0 };

    const moodCounts: Record<string, number> = {};
    entries.forEach(e => {
        moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
    });
    const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'none';

    // Calculate streak (consecutive days with entries)
    const uniqueDays = new Set(entries.map(e => e.timestamp.split('T')[0]));
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        if (uniqueDays.has(d.toISOString().split('T')[0])) {
            streak++;
        } else {
            break;
        }
    }

    const daySpan = Math.max(1, Math.ceil((Date.now() - new Date(entries[0].timestamp).getTime()) / 86400000));
    const avgPerDay = Math.round((entries.length / daySpan) * 10) / 10;

    return { total: entries.length, topMood, streak, avgPerDay };
}

// ── Wellness Plans ──

export function saveWellnessPlan(plan: WellnessPlan): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(PLANS_KEY, JSON.stringify(plan));
}

export function loadWellnessPlan(): WellnessPlan | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(PLANS_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function updatePlanStep(stepId: string, completed: boolean): void {
    const plan = loadWellnessPlan();
    if (!plan) return;
    plan.steps = plan.steps.map(s =>
        s.id === stepId ? { ...s, completed, completedAt: completed ? new Date().toISOString() : undefined } : s
    );
    const allDone = plan.steps.every(s => s.completed);
    if (allDone) plan.status = 'completed';
    saveWellnessPlan(plan);
}

// ── Emotion Timeline ──

export function saveEmotionFrame(frame: EmotionFrame): void {
    if (typeof window === 'undefined') return;
    const frames = loadEmotionTimeline();
    frames.push(frame);
    const trimmed = frames.slice(-500);
    localStorage.setItem(EMOTIONS_KEY, JSON.stringify(trimmed));
}

export function loadEmotionTimeline(): EmotionFrame[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(EMOTIONS_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export function getSessionEmotions(sessionId: string): EmotionFrame[] {
    return loadEmotionTimeline().filter(f => f.sessionId === sessionId);
}

// ── Check-ins ──

export function saveCheckIn(checkIn: CheckIn): void {
    if (typeof window === 'undefined') return;
    const checkIns = loadCheckIns();
    checkIns.push(checkIn);
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(checkIns));
}

export function loadCheckIns(): CheckIn[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(CHECKINS_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export function getPendingCheckIns(): CheckIn[] {
    return loadCheckIns().filter(c => c.status === 'pending' && new Date(c.scheduledFor) <= new Date());
}

export function updateCheckInStatus(id: string, status: CheckIn['status']): void {
    const checkIns = loadCheckIns();
    const updated = checkIns.map(c => c.id === id ? { ...c, status } : c);
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(updated));
}

// ── Session Recaps ──

export function saveSessionRecap(recap: SessionRecap): void {
    if (typeof window === 'undefined') return;
    const recaps = loadSessionRecaps();
    recaps.unshift(recap);
    const trimmed = recaps.slice(0, 50);
    localStorage.setItem(RECAPS_KEY, JSON.stringify(trimmed));
}

export function loadSessionRecaps(): SessionRecap[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(RECAPS_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

// ── Onboarding ──

export function isOnboardingComplete(): boolean {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
}

export function setOnboardingComplete(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ONBOARDING_KEY, 'true');
}

// ── Activity Heatmap ──

export function getActivityHeatmap(days: number = 30): { date: string; count: number }[] {
    const entries = loadMoodEntries();
    const recaps = loadSessionRecaps();
    const now = new Date();
    const result: { date: string; count: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const moodCount = entries.filter(e => e.timestamp.startsWith(dateStr)).length;
        const sessionCount = recaps.filter(r => r.timestamp.startsWith(dateStr)).length;
        result.push({ date: dateStr, count: moodCount + sessionCount });
    }
    return result;
}
