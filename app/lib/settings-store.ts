export type Settings = {
    userName: string;
    hypeLevel: 'chill' | 'normal' | 'maximum';
    theme: 'light' | 'dark' | 'system';
};

const SETTINGS_KEY = 'onlyyou_settings';

export const DEFAULT_SETTINGS: Settings = {
    userName: '',
    hypeLevel: 'normal',
    theme: 'system',
};

export function loadSettings(): Settings {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) return DEFAULT_SETTINGS;
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

export function saveSettings(settings: Settings): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
