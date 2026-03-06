import { describe, it, expect, vi } from 'vitest';
import { generateGreeting, sendMessage } from './chat-service';
import { Settings } from './settings-store';
import { UserProfile } from './chat-store';

describe('chat-service', () => {
    describe('generateGreeting', () => {
        it('generates a greeting with the correct hype level', () => {
            const settings: Settings = { userName: 'Alice', hypeLevel: 'normal', theme: 'system' };
            const profile: UserProfile = { conversationCount: 0, topicsDiscussed: [], lastVisit: '', firstVisit: '' };
            const greeting = generateGreeting(settings, profile);
            expect(greeting).toContain('YTB');
            expect(greeting).toContain('💪'); // Normal hype
        });

        it('generates returning greetings if conversationCount > 0', () => {
            const settings: Settings = { userName: 'Bob', hypeLevel: 'maximum', theme: 'system' };
            const profile: UserProfile = { conversationCount: 5, topicsDiscussed: ['goals'], lastVisit: '', firstVisit: '' };
            const greeting = generateGreeting(settings, profile);
            expect(greeting).toContain('Bob');
            expect(greeting).toContain('goals'); // Topics discussed
            expect(greeting).toContain('🔥'); // Maximum hype
        });
    });

    describe('sendMessage', () => {
        it('returns a fallback message if API fails', async () => {
            global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
            const settings: Settings = { userName: 'Charlie', hypeLevel: 'chill', theme: 'system' };
            const profile: UserProfile = { conversationCount: 0, topicsDiscussed: [], lastVisit: '', firstVisit: '' };

            const response = await sendMessage([], 'Hello', settings, profile);

            expect(response.role).toBe('assistant');
            expect(response.content).toContain('Charlie');
            expect(response.content).toContain('trouble connecting');
        });

        it('returns API response if successful', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ text: 'API success response' })
            } as any);
            const settings: Settings = { userName: 'Dave', hypeLevel: 'normal', theme: 'system' };
            const profile: UserProfile = { conversationCount: 0, topicsDiscussed: [], lastVisit: '', firstVisit: '' };

            const response = await sendMessage([], 'Hi', settings, profile);

            expect(response.role).toBe('assistant');
            expect(response.content).toBe('API success response');
        });
    });
});
