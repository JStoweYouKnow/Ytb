import { Message } from './chat-service';

const MESSAGES_KEY = 'onlyyou_messages';
const PROFILE_KEY = 'onlyyou_profile';
const HISTORY_KEY = 'onlyyou_history';

export type HistorySession = {
    id: string;
    timestamp: string;
    preview: string;
    messages: Message[];
};

export type UserProfile = {
    conversationCount: number;
    topicsDiscussed: string[];
    lastVisit: string;
    firstVisit: string;
};

const DEFAULT_PROFILE: UserProfile = {
    conversationCount: 0,
    topicsDiscussed: [],
    lastVisit: '',
    firstVisit: '',
};

export function loadMessages(): Message[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(MESSAGES_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export function saveMessages(messages: Message[]): void {
    if (typeof window === 'undefined') return;
    // Keep last 200 messages to avoid bloating localStorage
    const trimmed = messages.slice(-200);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(trimmed));
}

export function loadProfile(): UserProfile {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    try {
        const raw = localStorage.getItem(PROFILE_KEY);
        if (!raw) return { ...DEFAULT_PROFILE, firstVisit: new Date().toISOString(), lastVisit: new Date().toISOString() };
        return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
    } catch {
        return DEFAULT_PROFILE;
    }
}

export function saveProfile(profile: UserProfile): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function extractTopics(content: string): string[] {
    const topics: string[] = [];
    const keywords: Record<string, string> = {
        'work': 'work',
        'job': 'career',
        'boss': 'work',
        'career': 'career',
        'school': 'education',
        'study': 'education',
        'exam': 'education',
        'relationship': 'relationships',
        'friend': 'friendships',
        'family': 'family',
        'health': 'health',
        'exercise': 'fitness',
        'gym': 'fitness',
        'money': 'finances',
        'stress': 'stress management',
        'anxious': 'anxiety',
        'anxiety': 'anxiety',
        'sleep': 'sleep',
        'tired': 'energy',
        'goal': 'goals',
        'dream': 'dreams',
        'project': 'projects',
        'creative': 'creativity',
        'confident': 'confidence',
        'motivation': 'motivation',
    };

    const lower = content.toLowerCase();
    for (const [keyword, topic] of Object.entries(keywords)) {
        if (lower.includes(keyword) && !topics.includes(topic)) {
            topics.push(topic);
        }
    }
    return topics;
}

export function loadHistory(): HistorySession[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export function saveHistory(history: HistorySession[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function archiveCurrentMessages(messages: Message[]): void {
    if (typeof window === 'undefined') return;

    // Always clear active chat so the UI can start fresh
    localStorage.removeItem(MESSAGES_KEY);

    // Ignore archiving if it's just the initial greeting or empty
    if (messages.length <= 1) return;

    // Find the first user message to use as preview
    const firstUserMsg = messages.find(m => m.role === 'user');
    const preview = firstUserMsg ? firstUserMsg.content.substring(0, 60) + (firstUserMsg.content.length > 60 ? '...' : '') : 'Voice session';

    const session: HistorySession = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        preview: preview,
        messages: messages,
    };

    const currentHistory = loadHistory();
    currentHistory.unshift(session); // Add to beginning
    saveHistory(currentHistory);
}

export function clearAllData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(MESSAGES_KEY);
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(HISTORY_KEY);
}
