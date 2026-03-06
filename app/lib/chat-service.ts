import { Settings } from './settings-store';
import { UserProfile } from './chat-store';

export type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    plan?: Plan;
    timestamp?: string;
};

export type Plan = {
    title: string;
    steps: Array<{
        id: string;
        text: string;
        completed?: boolean;
    }>;
};

function getTimeGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 5) return 'late-night';
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'late-night';
}

function getName(settings: Settings): string {
    return settings.userName || 'champ';
}

function hypePrefix(level: Settings['hypeLevel']): string {
    switch (level) {
        case 'chill': return '';
        case 'normal': return '\u{1F4AA} ';
        case 'maximum': return '\u{1F525}\u{1F525}\u{1F525} ';
    }
}

export function generateGreeting(settings: Settings, profile: UserProfile): string {
    const name = getName(settings);
    const time = getTimeGreeting();
    const prefix = hypePrefix(settings.hypeLevel);
    const isReturning = profile.conversationCount > 0;

    if (isReturning) {
        const returningGreetings: Record<string, string[]> = {
            'morning': [
                `${prefix}Good morning, ${name}! \u2600\uFE0F Your favorite hypeman is BACK! What are we conquering today?`,
                `${prefix}Rise and shine, ${name}! \u{1F305} New day, new wins. I already know you're about to crush it!`,
            ],
            'afternoon': [
                `${prefix}What's good, ${name}! \u{1F64C} Good to see you back! How's the day treating you?`,
                `${prefix}Hey ${name}! \u{1F4AB} Afternoon check-in! I know you've been making moves today.`,
            ],
            'evening': [
                `${prefix}${name}! \u{1F319} Good evening! Let's talk about your wins today. I bet there were plenty!`,
                `${prefix}Hey ${name}! \u2728 Wind-down time. You earned this rest \u2014 let's reflect on your greatness.`,
            ],
            'late-night': [
                `${prefix}${name}! \u{1F989} Late night grind? I respect the hustle! What's on your mind?`,
                `${prefix}Still up, ${name}? \u{1F303} That's that champion mentality. What are we working on?`,
            ],
        };
        const options = returningGreetings[time];
        const greeting = options[Math.floor(Math.random() * options.length)];

        if (profile.topicsDiscussed.length > 0) {
            const recentTopic = profile.topicsDiscussed[profile.topicsDiscussed.length - 1];
            return `${greeting}\n\nLast time we talked about ${recentTopic} \u2014 how's that going?`;
        }
        return greeting;
    }

    const firstTimeGreetings: Record<string, string> = {
        'morning': `${prefix}Good morning! \u2600\uFE0F I'm YTB \u2014 your personal hypeman, cheerleader, and biggest fan all rolled into one! What should I call you?`,
        'afternoon': `${prefix}Hey there! \u{1F64C} I'm YTB \u2014 your personal hypeman and number one supporter! What's your name so I can hype you up properly?`,
        'evening': `${prefix}Good evening! \u2728 I'm YTB \u2014 think of me as your personal cheerleader who's ALWAYS in your corner! What's your name?`,
        'late-night': `${prefix}Hey! \u{1F303} Burning the midnight oil? I respect that. I'm YTB \u2014 your personal hypeman! What should I call you?`,
    };
    return firstTimeGreetings[time];
}

/**
 * Send a message to Gemini via the server's /api/chat endpoint.
 * Falls back to a simple local response if the API is unavailable.
 */
export async function sendMessage(
    history: Message[],
    content: string,
    settings: Settings,
    profile: UserProfile
): Promise<Message> {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: history.map((m) => ({ role: m.role, content: m.content })),
                userName: settings.userName || 'friend',
                hypeLevel: settings.hypeLevel,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return {
                id: Date.now().toString(),
                role: 'assistant',
                content: data.text,
                timestamp: new Date().toISOString(),
            };
        }
    } catch {
        // API unavailable — fall through to local fallback
    }

    // Minimal fallback if Gemini API is unreachable
    const name = getName(settings);
    return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Hey ${name}, I'm having a bit of trouble connecting right now. Try using the voice button to talk to me live \u2014 that's where I really shine! \u{1F3A4}`,
        timestamp: new Date().toISOString(),
    };
}
