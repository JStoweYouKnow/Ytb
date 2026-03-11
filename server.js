const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const { WebSocketServer } = require('ws');
const { GoogleGenAI, Modality } = require('@google/genai');
const log = require('./lib/logger');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

// Initialize the Google GenAI SDK
const geminiApiKey = process.env.GEMINI_API_KEY;
const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

const SYSTEM_PROMPT = `You are YTB — an AGENTIC AI wellness companion, personal hypeman, and supportive coach. You are NOT a therapist, counselor, or medical professional. You are a caring, thoughtful acquaintance and motivational partner. You will be talking via audio. Keep your responses short, conversational, warm, and grounded.

CRITICAL AGENTIC BEHAVIOR — What makes you an AGENT, not a chatbot:
You don't just respond to the user — you PROACTIVELY plan, track, remember, and adapt.
1. At the START of every session, call getUserContext to load the user's history, mood trends, and active wellness plan.
2. If mood history shows a pattern (e.g., stressed 3+ days in a row), call generateInsights to analyze it and TELL the user what you've noticed.
3. If there's no active wellness plan and you detect recurring issues, call createWellnessPlan to build a multi-day plan.
4. If there IS an active plan, call trackProgress to check adherence and adjust your session accordingly.
5. When you detect emotions via camera, call logEmotionFrame to build an emotion timeline for the session.
6. At natural session endings, offer to schedule a check-in with scheduleCheckIn.
7. Call generateSessionRecap before the user disconnects to summarize the session.
You should chain multiple tools together in sequence. For example: getUserContext → notice stress pattern → generateInsights → createWellnessPlan → setBinauralPreset. This is AGENTIC behavior.

Your persona:
- Warm, non-judgmental, occasionally lightly humorous, always respectful of different lifestyles, cultures, and relationship structures.
- Tone is flexible: match the user's energy. If they're excited, hype them up. If they're low, be gentle and steady.
- You're like a caring coach who's always in their corner — not a romantic partner, not a "best friend," not a therapist.

Conversation modes — adapt based on context:
- "Vent mode": When the user needs to let it out, just listen, reflect, and validate. Don't rush to fix.
- "Hype me up" mode: Full energy, affirmations, pump them up for whatever they're facing.
- "Help me plan" mode: Structured, practical — help them break their day or task into manageable steps.
- "Quick check-in": 2-3 minute mood check, reflection, or gratitude prompt for busy schedules.
- "End of day debrief": Help them reflect on wins, acknowledge challenges, set intentions for tomorrow.

Core conversation approach — follow this loop naturally:
1. Ask what's going on in concrete, plain language ("What's happening?" or "What's on your mind?").
2. Reflect and validate the feeling — name it, normalize it ("That sounds really frustrating. Anyone would feel that way.").
3. Ask a gentle follow-up to understand context ("What made it feel especially tough today?").
4. Offer one small, optional next step — a reframe, a micro-action, or a simple coping idea. Never push.
5. Close with a short check-in to keep it collaborative ("How does that land?" or "Does that feel right to you?").

Tool usage guidelines:
- When the user sounds stressed or asks to relax, use setBinauralPreset with 'relax'.
- When they need to focus or work, use setBinauralPreset with 'focus'.
- For sleep, use setBinauralPreset with 'sleep'.
- For ambient soundscapes, use setAmbientSound with 'rain', 'ocean', or 'forest'.
- When the user shares how they're feeling, use logMood to record it.
- When the user reflects on their day, shares a thought worth remembering, or you want to save an encouraging note for them, use saveJournalEntry.
- When the user seems stuck or needs a pick-me-up, use getWellnessTip to deliver a contextual tip.
- When you recommend a breathing or meditation exercise, use openBreathingExercise to launch the interactive guide.
- You have access to Google Search. Use it proactively when the user asks about current events, wants real-time wellness research, or needs factual information you're unsure about.

Agentic tool guidelines (NEW — use these proactively):
- Call getUserContext at session START to understand who you're talking to and their history.
- Call getMoodHistory when you want to check for mood patterns or trends.
- Call createWellnessPlan when you identify a recurring issue that needs a multi-day approach.
- Call trackProgress when there's an active plan to see what the user has completed.
- Call generateInsights when mood history reveals patterns worth discussing.
- Call logEmotionFrame when you observe a clear emotion via camera — this builds the session's emotion timeline.
- Call scheduleCheckIn when the user mentions a stressful upcoming event or you want to follow up.
- Call generateSessionRecap near the end of a conversation to create a summary card.

Active Vision & Emotion Detection:
You receive camera frames from the user approximately once per second. Actively analyze these frames for:
- Facial expressions: smiling, frowning, yawning, squinting, raised eyebrows, jaw clenching
- Body language: slouching, fidgeting, leaning back, head in hands, arms crossed
- Energy cues: drooping eyelids (tired), rapid movements (anxious/energized), stillness (calm or zoned out)
- Environment: lighting changes, time of day cues, cluttered vs tidy space

Based on what you observe, proactively respond:
- If they look tired or are yawning → suggest a break, offer a breathing exercise, or switch to sleep binaural
- If they're smiling or laughing → celebrate with them, match their energy, hype them up
- If they look tense, stressed, or are frowning → acknowledge it gently, offer the relax preset or a wellness tip
- If they look focused and engaged → keep it brief, don't interrupt their flow, just affirm quietly
- If their posture is bad → gently remind them to sit up or stretch
- If the environment is dark → ask if they're winding down, offer sleep mode
IMPORTANT: When you detect an emotion, also call logEmotionFrame to record it in the timeline.

Do NOT wait for the user to tell you how they feel — read their face and body and respond empathetically.

SAFETY AND BOUNDARIES — you MUST always follow these:

What you CAN do:
- Listen actively and reflect what the user shares
- Offer encouragement, hype, and emotional validation
- Suggest general wellness activities: breathing exercises, hydration, movement, stretching, rest, gratitude
- Help with planning, reflection, and day structure
- Provide mood check-ins and end-of-day debriefs

What you CANNOT do:
- Diagnose any medical or psychological condition
- Prescribe or recommend medications or clinical treatments
- Provide therapy, CBT, DBT, or any clinical mental health intervention
- Give legal, financial, or medical advice
- Act as a substitute for a licensed professional

Crisis and escalation protocol — this overrides everything else:
If a user expresses suicidal thoughts, self-harm ideation, mentions abuse, or shows signs of extreme distress, you MUST:
1. Acknowledge their pain with empathy: "I hear you, and I'm really glad you told me."
2. NOT provide detailed advice, instructions, or attempt to resolve the crisis yourself.
3. Immediately and clearly provide these resources:
   - 988 Suicide & Crisis Lifeline: call or text 988
   - Crisis Text Line: text HOME to 741741
   - Emergency services: call 911
4. Encourage them to reach out: "You deserve support from someone trained for this. Please reach out — you're not alone."
5. After providing resources, remain warm and present. Do not abruptly change the topic.

When topics go beyond your scope, gently redirect:
"I'm your wellness companion, not a doctor or therapist — but I genuinely care about you. For something like this, talking to a professional could make a real difference. Would you like me to help you think about next steps for finding one?"`;

const TOOL_DECLARATIONS = [
    // ── Original Tools ──
    {
        name: 'setBinauralPreset',
        description: 'Changes the background binaural beat audio to help the user shift their brainwave state.',
        parameters: {
            type: 'OBJECT',
            properties: {
                preset: {
                    type: 'STRING',
                    description: "The desired brainwave state preset: 'focus' (Alpha/Beta), 'relax' (Theta), or 'sleep' (Delta)."
                }
            },
            required: ['preset']
        }
    },
    {
        name: 'setAmbientSound',
        description: 'Plays an ambient soundscape to create a calming atmosphere. Use alongside or instead of binaural beats.',
        parameters: {
            type: 'OBJECT',
            properties: {
                sound: {
                    type: 'STRING',
                    description: "The ambient sound: 'rain', 'ocean', or 'forest'."
                }
            },
            required: ['sound']
        }
    },
    {
        name: 'logMood',
        description: "Records the user's current emotional state. Call this when the user shares how they're feeling.",
        parameters: {
            type: 'OBJECT',
            properties: {
                mood: {
                    type: 'STRING',
                    description: "The user's mood: 'happy', 'stressed', 'calm', 'anxious', 'energized', 'sad', 'frustrated', or 'tired'."
                },
                note: {
                    type: 'STRING',
                    description: 'A brief note about the context of this mood (1-2 sentences).'
                }
            },
            required: ['mood']
        }
    },
    {
        name: 'saveJournalEntry',
        description: 'Saves a journal or reflection entry for the user. Use when the user shares a meaningful thought, reflection, or when you want to save an encouraging note.',
        parameters: {
            type: 'OBJECT',
            properties: {
                title: {
                    type: 'STRING',
                    description: 'Short title for the journal entry (3-8 words).'
                },
                content: {
                    type: 'STRING',
                    description: 'The journal entry content (1-3 sentences capturing the key insight or reflection).'
                }
            },
            required: ['title', 'content']
        }
    },
    {
        name: 'getWellnessTip',
        description: 'Delivers a contextual wellness tip to the user. Use when they seem stuck, need motivation, or could use a pick-me-up.',
        parameters: {
            type: 'OBJECT',
            properties: {
                category: {
                    type: 'STRING',
                    description: "Tip category: 'mindfulness', 'energy', 'gratitude', 'movement', or 'social'."
                }
            },
            required: ['category']
        }
    },
    {
        name: 'openBreathingExercise',
        description: 'Opens an interactive guided breathing exercise on the user\'s screen. Use when recommending breathing or meditation.',
        parameters: {
            type: 'OBJECT',
            properties: {
                pattern: {
                    type: 'STRING',
                    description: "The breathing pattern: 'box' (4-4-4-4 box breathing), 'fourSevenEight' (4-7-8 sleep technique), or 'meditation' (5-min guided meditation)."
                }
            },
            required: ['pattern']
        }
    },
    // ── TIER 1: Agentic Tools ──
    {
        name: 'getUserContext',
        description: 'Retrieves the user\'s full context: mood history, active wellness plan, past session summaries, and scheduled check-ins. CALL THIS AT THE START OF EVERY SESSION to understand who you\'re talking to.',
        parameters: {
            type: 'OBJECT',
            properties: {
                userId: {
                    type: 'STRING',
                    description: 'The user ID (use "default" if unknown).'
                }
            },
            required: ['userId']
        }
    },
    {
        name: 'getMoodHistory',
        description: 'Gets the user\'s recent mood entries to identify patterns and trends. Returns mood entries with timestamps.',
        parameters: {
            type: 'OBJECT',
            properties: {
                userId: {
                    type: 'STRING',
                    description: 'The user ID.'
                },
                days: {
                    type: 'NUMBER',
                    description: 'Number of days to look back (default 7).'
                }
            },
            required: ['userId']
        }
    },
    {
        name: 'createWellnessPlan',
        description: 'Creates a multi-day wellness plan tailored to the user\'s needs. Use when you identify recurring issues (e.g., stress 3+ days) or the user asks for structured help. The plan should have specific daily actions.',
        parameters: {
            type: 'OBJECT',
            properties: {
                userId: {
                    type: 'STRING',
                    description: 'The user ID.'
                },
                title: {
                    type: 'STRING',
                    description: 'Plan title (e.g., "3-Day Stress Reset" or "Week of Gratitude").'
                },
                description: {
                    type: 'STRING',
                    description: 'Brief description of the plan\'s purpose (1-2 sentences).'
                },
                days: {
                    type: 'NUMBER',
                    description: 'Duration in days (3-7).'
                },
                steps: {
                    type: 'ARRAY',
                    description: 'Array of daily action steps.',
                    items: {
                        type: 'OBJECT',
                        properties: {
                            day: { type: 'NUMBER', description: 'Which day (1-based).' },
                            action: { type: 'STRING', description: 'The specific action to take.' },
                            timeOfDay: { type: 'STRING', description: "'morning', 'afternoon', or 'evening'." }
                        }
                    }
                }
            },
            required: ['userId', 'title', 'description', 'days', 'steps']
        }
    },
    {
        name: 'trackProgress',
        description: 'Checks the user\'s progress on their active wellness plan. Returns completed and pending steps.',
        parameters: {
            type: 'OBJECT',
            properties: {
                userId: {
                    type: 'STRING',
                    description: 'The user ID.'
                }
            },
            required: ['userId']
        }
    },
    {
        name: 'generateInsights',
        description: 'Analyzes mood history and session data to generate personalized wellness insights. Use when you notice patterns in mood data.',
        parameters: {
            type: 'OBJECT',
            properties: {
                userId: {
                    type: 'STRING',
                    description: 'The user ID.'
                },
                focusArea: {
                    type: 'STRING',
                    description: "What to analyze: 'mood_patterns', 'progress', 'recommendations', or 'weekly_report'."
                }
            },
            required: ['userId', 'focusArea']
        }
    },
    // ── TIER 2: Emotion & Check-in Tools ──
    {
        name: 'logEmotionFrame',
        description: 'Records a detected emotion from the camera feed into the session\'s emotion timeline. Call this when you observe a clear emotional state via vision.',
        parameters: {
            type: 'OBJECT',
            properties: {
                emotion: {
                    type: 'STRING',
                    description: "The detected emotion: 'happy', 'stressed', 'calm', 'anxious', 'focused', 'tired', 'sad', 'excited', 'tense', or 'relaxed'."
                },
                confidence: {
                    type: 'STRING',
                    description: "'high', 'medium', or 'low'."
                }
            },
            required: ['emotion']
        }
    },
    {
        name: 'scheduleCheckIn',
        description: 'Schedules a future check-in with the user. Use when they mention an upcoming stressful event or when you want to follow up on progress.',
        parameters: {
            type: 'OBJECT',
            properties: {
                userId: {
                    type: 'STRING',
                    description: 'The user ID.'
                },
                scheduledFor: {
                    type: 'STRING',
                    description: "When to check in: 'tomorrow_morning', 'tomorrow_evening', 'in_2_days', 'next_week', or an ISO date string."
                },
                reason: {
                    type: 'STRING',
                    description: 'Why this check-in is being scheduled (1 sentence).'
                }
            },
            required: ['userId', 'scheduledFor', 'reason']
        }
    },
    {
        name: 'generateSessionRecap',
        description: 'Generates a summary card for the current session. Call near the end of a conversation to create a recap with mood shift, topics, and key takeaways.',
        parameters: {
            type: 'OBJECT',
            properties: {
                userId: {
                    type: 'STRING',
                    description: 'The user ID.'
                },
                summary: {
                    type: 'STRING',
                    description: 'A 2-3 sentence summary of the session.'
                },
                moodStart: {
                    type: 'STRING',
                    description: 'The mood detected at the start of the session.'
                },
                moodEnd: {
                    type: 'STRING',
                    description: 'The mood at the end of the session.'
                },
                topicsDiscussed: {
                    type: 'ARRAY',
                    description: 'List of topics covered.',
                    items: { type: 'STRING' }
                },
                keyTakeaway: {
                    type: 'STRING',
                    description: 'One key insight or action item from the session.'
                }
            },
            required: ['userId', 'summary']
        }
    },
];

const WELLNESS_TIPS = {
    mindfulness: [
        'Take 30 seconds right now to notice 3 things you can see, 2 you can hear, and 1 you can feel. This simple grounding exercise resets your nervous system.',
        'Try a "micro-meditation" — close your eyes for just 10 seconds and focus on the sensation of air entering your nostrils. That\'s it. That\'s mindfulness.',
        'Put your hand on your chest. Feel your heartbeat. You\'re alive, you\'re here, and that\'s enough.',
    ],
    energy: [
        'Stand up and stretch your arms overhead for 10 seconds. That tiny movement increases blood flow to your brain by 15%.',
        'Drink a glass of cold water right now. Dehydration is the #1 hidden cause of afternoon fatigue.',
        'Try the "power pose" — stand with your feet apart and hands on your hips for 2 minutes. It actually changes your cortisol levels.',
    ],
    gratitude: [
        'Name one person who made you smile this week. Now imagine telling them why. That warmth you feel? That\'s gratitude rewiring your brain.',
        'Look at something ordinary around you — a cup, a window, your hands. Think about all the effort that went into making it exist. Gratitude is everywhere.',
        'Your biggest "failure" this month probably taught you something. What was the lesson? That\'s growth disguised as struggle.',
    ],
    movement: [
        'Roll your shoulders backwards 5 times. Now forwards. You were probably holding tension there without realizing it.',
        'Try the "doorway stretch" — put your hands on a door frame at shoulder height and lean forward for 15 seconds. Your chest and shoulders will thank you.',
        'Take a 2-minute walk. Not for exercise — just to change your scenery. Movement changes your mental state.',
    ],
    social: [
        'Text someone you haven\'t talked to in a while. Just say "thinking of you." It takes 5 seconds and makes two people feel good.',
        'Compliment the next person you interact with — genuinely. Giving positive energy creates positive energy.',
        'Think of someone who believed in you when you didn\'t believe in yourself. Carry that energy forward today.',
    ],
};

// ── Rate limiter (Memory fallback) ──
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20;      // 20 requests per minute per IP

// Fallback in-memory rate limiter if Firestore is unavailable
function fallbackRateLimit(ip) {
    const now = Date.now();
    let bucket = rateLimitMap.get(ip);
    if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
        bucket = { windowStart: now, count: 0 };
        rateLimitMap.set(ip, bucket);
    }
    bucket.count++;
    return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, bucket] of rateLimitMap) {
        if (now - bucket.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
            rateLimitMap.delete(ip);
        }
    }
}, 5 * 60 * 1000);

app.prepare().then(() => {
    const server = express();
    const httpServer = createServer(server);

    const wss = new WebSocketServer({ noServer: true });

    // Explicitly route WebSocket upgrades so Next.js HMR upgrades aren't blocked
    httpServer.on('upgrade', (request, socket, head) => {
        const { pathname } = parse(request.url, true);
        if (pathname === '/ws') {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        }
        // Non-/ws upgrades (e.g. Next.js HMR) are handled by Next.js internally
    });
    log.info('WebSocket server configured at /ws');

    server.use(express.json());

    // ── Health check endpoint ──
    server.get('/health', (req, res) => {
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        });
    });

    // ── Firestore (optional — graceful fallback) ──
    let firestore = null;
    try {
        firestore = require('./lib/firestore');
    } catch (e) {
        log.warn('Firestore not available (missing credentials). Conversation persistence disabled.');
    }

    if (firestore) {
        server.post('/api/conversations/:sessionId', async (req, res) => {
            try {
                await firestore.saveTranscript(req.params.sessionId, req.body);
                res.json({ success: true });
            } catch (err) {
                log.error('Error saving transcript:', err);
                res.status(500).json({ error: 'Failed to save transcript' });
            }
        });

        server.get('/api/conversations/:sessionId', async (req, res) => {
            try {
                const messages = await firestore.getTranscripts(req.params.sessionId);
                res.json({ messages });
            } catch (err) {
                log.error('Error fetching transcripts:', err);
                res.status(500).json({ error: 'Failed to fetch transcripts' });
            }
        });

        server.post('/api/profiles/:userId', async (req, res) => {
            try {
                await firestore.saveUserProfile(req.params.userId, req.body);
                res.json({ success: true });
            } catch (err) {
                log.error('Error saving profile:', err);
                res.status(500).json({ error: 'Failed to save profile' });
            }
        });

        server.get('/api/profiles/:userId', async (req, res) => {
            try {
                const profile = await firestore.getUserProfile(req.params.userId);
                res.json({ profile: profile || null });
            } catch (err) {
                log.error('Error fetching profile:', err);
                res.status(500).json({ error: 'Failed to fetch profile' });
            }
        });
    }

    // ── Dashboard API endpoints (work with or without Firestore) ──
    server.get('/api/dashboard/:userId', async (req, res) => {
        const userId = req.params.userId;
        if (!firestore) {
            return res.json({ moods: [], plan: null, summaries: [], checkIns: [], emotions: [] });
        }
        try {
            const [moods, plan, summaries, checkIns] = await Promise.all([
                firestore.getMoodHistory(userId, 30).catch(() => []),
                firestore.getWellnessPlan(userId).catch(() => null),
                firestore.getSessionSummaries(userId, 10).catch(() => []),
                firestore.getCheckIns(userId).catch(() => []),
            ]);
            res.json({ moods, plan, summaries, checkIns });
        } catch (err) {
            log.error('Dashboard API error:', err);
            res.status(500).json({ error: 'Failed to fetch dashboard data' });
        }
    });

    server.get('/api/emotions/:sessionId', async (req, res) => {
        if (!firestore) return res.json({ frames: [] });
        try {
            const frames = await firestore.getEmotionTimeline(req.params.sessionId);
            res.json({ frames });
        } catch (err) {
            log.error('Emotions API error:', err);
            res.status(500).json({ error: 'Failed to fetch emotion timeline' });
        }
    });

    server.post('/api/wellness-plan/:userId', async (req, res) => {
        if (!firestore) return res.json({ success: false, message: 'Firestore not available' });
        try {
            await firestore.saveWellnessPlan(req.params.userId, req.body);
            res.json({ success: true });
        } catch (err) {
            log.error('Plan save error:', err);
            res.status(500).json({ error: 'Failed to save wellness plan' });
        }
    });

    // ── Risk detection for crisis/safety ──
    function detectCrisis(text) {
        if (!text || typeof text !== 'string') return false;
        const lower = text.toLowerCase();
        const crisisPatterns = [
            /\b(kill|end)\s+(my\s*self|my\s*life)\b/,
            /\bsuicid/,
            /\bself[- ]?harm/,
            /\bwant\s+to\s+die\b/,
            /\bdon'?t\s+want\s+to\s+(live|be\s+alive|exist)\b/,
            /\bend\s+it\s+all\b/,
            /\bbetter\s+off\s+(dead|without\s+me)\b/,
            /\bno\s+reason\s+to\s+(live|go\s+on)\b/,
        ];
        return crisisPatterns.some(p => p.test(lower));
    }

    const CRISIS_RESPONSE = `I hear you, and I'm really glad you told me. What you're feeling is real, and you deserve support from someone trained to help.

Please reach out now:
• **988 Suicide & Crisis Lifeline** — call or text 988
• **Crisis Text Line** — text HELLO to 741741
• **Emergency** — call 911

You're not alone. These are free, confidential, and available 24/7. I'll be right here whenever you want to talk.`;

    // ── Text chat endpoint (non-live Gemini) ──
    server.post('/api/chat', async (req, res) => {
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

        let isRateLimited = false;
        if (firestore) {
            isRateLimited = await firestore.checkRateLimit(clientIp);
        } else {
            isRateLimited = fallbackRateLimit(clientIp);
        }

        if (isRateLimited) {
            return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
        }

        if (!ai) {
            return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
        }

        try {
            const { messages, userName, hypeLevel } = req.body;

            // Input validation
            if (messages !== undefined && !Array.isArray(messages)) {
                return res.status(400).json({ error: 'messages must be an array' });
            }
            if (userName !== undefined && typeof userName !== 'string') {
                return res.status(400).json({ error: 'userName must be a string' });
            }
            if (hypeLevel !== undefined && !['chill', 'normal', 'maximum'].includes(hypeLevel)) {
                return res.status(400).json({ error: 'hypeLevel must be chill, normal, or maximum' });
            }

            // Check latest user message for crisis signals
            const latestUserMsg = (messages || []).filter(m => m.role === 'user').pop();
            if (latestUserMsg && detectCrisis(latestUserMsg.content)) {
                log.warn('Crisis signal detected in text chat — returning safety response');
                return res.json({ text: CRISIS_RESPONSE });
            }

            // Build conversation history for Gemini
            const contents = [];
            const recentMessages = (messages || []).slice(-10);
            for (const msg of recentMessages) {
                contents.push({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }],
                });
            }

            const personalizedPrompt = SYSTEM_PROMPT.replace(
                'You will be talking via audio.',
                `You will be responding via text. The user's name is "${userName || 'friend'}". Hype level: ${hypeLevel || 'normal'} (chill = gentle and supportive, normal = energetic and encouraging, maximum = INTENSE all-caps motivation). IMPORTANT: You are in text-only fallback mode. DO NOT attempt to use or call any tools or functions (like logMood, setBinauralPreset, etc). Just respond with plain supportive text.`
            );

            const result = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents,
                config: {
                    systemInstruction: personalizedPrompt,
                    maxOutputTokens: 2048,
                    temperature: 0.9,
                },
            });

            let text = result.text || 'I\'m here for you! What\'s on your mind?';

            // Just in case it hallucinates pseudo-XML tool tags like <function=logMood...>
            text = text.replace(/<function=[^>]+>/g, '').trim();

            res.json({ text });
        } catch (err) {
            log.error('Chat API error:', err);
            res.status(500).json({ error: 'Failed to generate response' });
        }
    });

    // ── Per-session state tracking for agentic tools ──
    const sessionToolsUsed = new Map(); // sessionId -> Set of tool names
    const sessionMoods = new Map();     // sessionId -> { start, end }
    const sessionEmotions = new Map();  // sessionId -> EmotionFrame[]

    // ── Helper: process tool calls server-side ──
    function processToolCall(name, args, sessionId) {
        // Track tools used per session
        if (!sessionToolsUsed.has(sessionId)) sessionToolsUsed.set(sessionId, new Set());
        sessionToolsUsed.get(sessionId).add(name);

        switch (name) {
            case 'logMood': {
                const userId = args.userId || 'default';
                const timestamp = new Date().toISOString();
                if (firestore) {
                    firestore.saveTranscript(sessionId, {
                        role: 'system',
                        content: `[Mood logged: ${args.mood}${args.note ? ' — ' + args.note : ''}]`,
                        timestamp, type: 'mood', mood: args.mood,
                    }).catch((err) => log.error('Firestore mood save error:', err));
                    firestore.saveMoodEntry(userId, {
                        mood: args.mood, note: args.note || '', timestamp, source: 'user',
                    }).catch((err) => log.error('Firestore mood entry error:', err));
                }
                // Track session mood shift
                if (!sessionMoods.has(sessionId)) {
                    sessionMoods.set(sessionId, { start: args.mood, end: args.mood });
                } else {
                    sessionMoods.get(sessionId).end = args.mood;
                }
                return { result: `Mood "${args.mood}" logged successfully and saved to your history.` };
            }

            case 'saveJournalEntry':
                if (firestore && sessionId) {
                    firestore.saveTranscript(sessionId, {
                        role: 'system',
                        content: `[Journal: ${args.title}] ${args.content}`,
                        timestamp: new Date().toISOString(),
                        type: 'journal', title: args.title,
                    }).catch((err) => log.error('Firestore journal save error:', err));
                }
                return { result: `Journal entry "${args.title}" saved.` };

            case 'getWellnessTip': {
                const category = args.category || 'mindfulness';
                const tips = WELLNESS_TIPS[category] || WELLNESS_TIPS.mindfulness;
                const tip = tips[Math.floor(Math.random() * tips.length)];
                return { result: tip };
            }

            case 'setBinauralPreset':
                return { result: 'ok' };

            case 'setAmbientSound':
                return { result: `Ambient sound "${args.sound}" started.` };

            case 'openBreathingExercise': {
                const validPatterns = ['box', 'fourSevenEight', 'meditation'];
                if (!args || !args.pattern || !validPatterns.includes(args.pattern)) {
                    const fallback = args && args.pattern ? args.pattern : 'unknown';
                    return { result: JSON.stringify({ error: `Invalid breathing exercise pattern '${fallback}'. Use 'box', 'fourSevenEight', or 'meditation'.` }) };
                }
                return { result: `Breathing exercise "${args.pattern}" opened on screen.` };
            }

            // ── TIER 1: Agentic Tools ──

            case 'getUserContext': {
                const userId = args.userId || 'default';
                if (!firestore) {
                    return {
                        result: JSON.stringify({
                            moodHistory: [], activePlan: null, recentSessions: [],
                            checkIns: [], message: 'Running in offline mode — no historical data available.'
                        })
                    };
                }
                // Return a promise-based result — we'll handle async below
                return {
                    async: true, handler: async () => {
                        const [moods, plan, summaries, checkIns] = await Promise.all([
                            firestore.getMoodHistory(userId, 14).catch(() => []),
                            firestore.getWellnessPlan(userId).catch(() => null),
                            firestore.getSessionSummaries(userId, 5).catch(() => []),
                            firestore.getCheckIns(userId).catch(() => []),
                        ]);
                        const pendingCheckIns = checkIns.filter(c => c.status === 'pending');
                        // Analyze mood patterns
                        const moodCounts = {};
                        moods.forEach(m => { moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1; });
                        const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
                        return {
                            result: JSON.stringify({
                                moodHistory: moods.slice(-7),
                                moodPattern: dominantMood ? { mood: dominantMood[0], count: dominantMood[1], total: moods.length } : null,
                                activePlan: plan,
                                recentSessions: summaries,
                                pendingCheckIns: pendingCheckIns,
                                totalMoodEntries: moods.length,
                            })
                        };
                    }
                };
            }

            case 'getMoodHistory': {
                const userId = args.userId || 'default';
                if (!firestore) return { result: JSON.stringify({ entries: [], message: 'Offline mode.' }) };
                return {
                    async: true, handler: async () => {
                        const moods = await firestore.getMoodHistory(userId, args.days ? args.days * 5 : 35).catch(() => []);
                        // Group by day
                        const byDay = {};
                        moods.forEach(m => {
                            const day = m.timestamp.split('T')[0];
                            if (!byDay[day]) byDay[day] = [];
                            byDay[day].push(m);
                        });
                        return { result: JSON.stringify({ entries: moods.slice(-20), byDay, totalEntries: moods.length }) };
                    }
                };
            }

            case 'createWellnessPlan': {
                const userId = args.userId || 'default';
                const plan = {
                    id: `plan_${Date.now()}`,
                    title: args.title,
                    description: args.description,
                    days: args.days || 3,
                    startDate: new Date().toISOString(),
                    steps: (args.steps || []).map((s, i) => ({
                        id: `step_${Date.now()}_${i}`,
                        day: s.day || i + 1,
                        action: s.action,
                        timeOfDay: s.timeOfDay || 'morning',
                        completed: false,
                    })),
                    status: 'active',
                    createdAt: new Date().toISOString(),
                };
                if (firestore) {
                    firestore.saveWellnessPlan(userId, plan).catch(err => log.error('Plan save error:', err));
                }
                return { result: JSON.stringify({ success: true, plan, message: `Created "${args.title}" — a ${args.days}-day wellness plan with ${plan.steps.length} action steps.` }) };
            }

            case 'trackProgress': {
                const userId = args.userId || 'default';
                if (!firestore) return { result: JSON.stringify({ plan: null, message: 'No plan data in offline mode.' }) };
                return {
                    async: true, handler: async () => {
                        const plan = await firestore.getWellnessPlan(userId).catch(() => null);
                        if (!plan) return { result: JSON.stringify({ plan: null, message: 'No active wellness plan.' }) };
                        const completed = plan.steps.filter(s => s.completed).length;
                        const total = plan.steps.length;
                        const todaySteps = plan.steps.filter(s => {
                            const daysSinceStart = Math.floor((Date.now() - new Date(plan.startDate).getTime()) / 86400000) + 1;
                            return s.day === daysSinceStart && !s.completed;
                        });
                        return {
                            result: JSON.stringify({
                                plan: { title: plan.title, status: plan.status, days: plan.days },
                                progress: { completed, total, percentage: Math.round((completed / total) * 100) },
                                todaysTasks: todaySteps,
                                message: completed === total ? 'All steps completed! Time to celebrate!' : `${completed}/${total} steps done. ${todaySteps.length} tasks for today.`
                            })
                        };
                    }
                };
            }

            case 'generateInsights': {
                const userId = args.userId || 'default';
                if (!firestore) return { result: JSON.stringify({ insights: 'Offline mode — connect to see insights.' }) };
                return {
                    async: true, handler: async () => {
                        const moods = await firestore.getMoodHistory(userId, 30).catch(() => []);
                        if (moods.length < 3) return { result: JSON.stringify({ insights: 'Not enough data yet. Keep logging moods to unlock insights!' }) };

                        const moodCounts = {};
                        const timePatterns = { morning: {}, afternoon: {}, evening: {}, night: {} };
                        moods.forEach(m => {
                            moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
                            const hour = new Date(m.timestamp).getHours();
                            const period = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 21 ? 'evening' : 'night';
                            timePatterns[period][m.mood] = (timePatterns[period][m.mood] || 0) + 1;
                        });

                        const sorted = Object.entries(moodCounts).sort((a, b) => b[1] - a[1]);
                        const topMood = sorted[0];
                        const negativeMoods = ['stressed', 'anxious', 'sad', 'frustrated', 'tired'];
                        const negativeCount = sorted.filter(([m]) => negativeMoods.includes(m)).reduce((acc, [, c]) => acc + c, 0);
                        const positiveCount = moods.length - negativeCount;

                        // Streak detection
                        const recentMoods = moods.slice(-5).map(m => m.mood);
                        const isStuckInPattern = recentMoods.filter(m => m === recentMoods[0]).length >= 3;

                        return {
                            result: JSON.stringify({
                                focusArea: args.focusArea,
                                totalEntries: moods.length,
                                topMood: { mood: topMood[0], count: topMood[1], percentage: Math.round((topMood[1] / moods.length) * 100) },
                                ratio: { positive: positiveCount, negative: negativeCount },
                                timePatterns,
                                stuckInPattern: isStuckInPattern ? recentMoods[0] : null,
                                recommendation: isStuckInPattern && negativeMoods.includes(recentMoods[0])
                                    ? `You've been feeling ${recentMoods[0]} frequently. Consider creating a wellness plan to address this.`
                                    : positiveCount > negativeCount
                                        ? 'Your overall mood trend is positive! Keep up the great work.'
                                        : 'Your mood has been challenging lately. Let\'s work on some strategies together.',
                            })
                        };
                    }
                };
            }

            // ── TIER 2: Emotion & Check-in Tools ──

            case 'logEmotionFrame': {
                const timestamp = new Date().toISOString();
                const frame = { emotion: args.emotion, confidence: args.confidence || 'medium', timestamp };
                if (!sessionEmotions.has(sessionId)) sessionEmotions.set(sessionId, []);
                sessionEmotions.get(sessionId).push(frame);
                if (firestore) {
                    firestore.saveEmotionFrame(sessionId, frame).catch(err => log.error('Emotion frame save error:', err));
                }
                return { result: `Emotion "${args.emotion}" recorded in timeline.` };
            }

            case 'scheduleCheckIn': {
                const userId = args.userId || 'default';
                // Parse the scheduledFor into an ISO date
                let scheduledDate;
                const now = new Date();
                switch (args.scheduledFor) {
                    case 'tomorrow_morning':
                        scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0);
                        break;
                    case 'tomorrow_evening':
                        scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 18, 0);
                        break;
                    case 'in_2_days':
                        scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 10, 0);
                        break;
                    case 'next_week':
                        scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 10, 0);
                        break;
                    default:
                        scheduledDate = new Date(args.scheduledFor || Date.now() + 86400000);
                }
                const checkIn = {
                    id: `ci_${Date.now()}`,
                    scheduledFor: scheduledDate.toISOString(),
                    reason: args.reason || '',
                };
                if (firestore) {
                    firestore.saveCheckIn(userId, checkIn).catch(err => log.error('Check-in save error:', err));
                }
                const friendlyDate = scheduledDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
                return { result: JSON.stringify({ success: true, checkIn: { ...checkIn, scheduledFor: scheduledDate.toISOString() }, message: `Check-in scheduled for ${friendlyDate}: "${args.reason}"` }) };
            }

            case 'generateSessionRecap': {
                const userId = args.userId || 'default';
                const emotions = sessionEmotions.get(sessionId) || [];
                const tools = Array.from(sessionToolsUsed.get(sessionId) || []);
                const moodShift = sessionMoods.get(sessionId) || null;
                const recap = {
                    sessionId,
                    summary: args.summary || 'Session completed.',
                    moodStart: args.moodStart || moodShift?.start || null,
                    moodEnd: args.moodEnd || moodShift?.end || null,
                    topicsDiscussed: args.topicsDiscussed || [],
                    toolsUsed: tools,
                    emotionTimeline: emotions,
                    keyTakeaway: args.keyTakeaway || '',
                    timestamp: new Date().toISOString(),
                };
                if (firestore) {
                    firestore.saveSessionSummary(userId, recap).catch(err => log.error('Recap save error:', err));
                }
                return { result: JSON.stringify({ success: true, recap, message: 'Session recap created.' }) };
            }

            default:
                return { result: 'ok' };
        }
    }

    // ── WebSocket handler: Gemini Live API via SDK ──
    wss.on('connection', async (clientWs) => {
        log.info('Client connected to proxy');

        if (!ai) {
            log.error('GEMINI_API_KEY is not set');
            clientWs.close(1011, 'Server configuration error');
            return;
        }

        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        let session = null;

        try {
            session = await ai.live.connect({
                model: 'gemini-3-flash-preview',
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: {
                                voiceName: 'Aoede',
                            },
                        },
                    },
                    systemInstruction: {
                        parts: [{ text: SYSTEM_PROMPT }]
                    },
                    tools: [{ functionDeclarations: TOOL_DECLARATIONS }, { googleSearch: {} }],
                },
                callbacks: {
                    onopen: () => {
                        log.info('Connected to Gemini Live API via SDK');
                        clientWs.send(JSON.stringify({ type: 'connected_to_gemini' }));
                    },
                    onmessage: (message) => {
                        try {
                            clientWs.send(JSON.stringify(message));
                        } catch (err) {
                            log.error('Error forwarding to client:', err);
                        }

                        // Auto-respond to tool calls (with async support)
                        if (message.toolCall?.functionCalls) {
                            (async () => {
                                const functionResponses = [];
                                for (const fc of message.toolCall.functionCalls) {
                                    const result = processToolCall(fc.name, fc.args || {}, sessionId);
                                    if (result.async && result.handler) {
                                        try {
                                            // Handle potential GenAI SDK tool timeout errors
                                            const timeoutMs = 15000;
                                            const asyncResult = await Promise.race([
                                                result.handler(),
                                                new Promise((_, reject) => setTimeout(() => reject(new Error('Tool execution timeout')), timeoutMs))
                                            ]);
                                            functionResponses.push({ id: fc.id, name: fc.name, response: asyncResult });
                                        } catch (err) {
                                            log.error(`Async tool error or timeout (${fc.name}):`, err);
                                            functionResponses.push({ id: fc.id, name: fc.name, response: { result: JSON.stringify({ error: 'Tool execution failed or timed out.' }) } });
                                        }
                                    } else {
                                        functionResponses.push({ id: fc.id, name: fc.name, response: result });
                                    }
                                }
                                try {
                                    session.sendToolResponse({ functionResponses });
                                } catch (err) {
                                    log.error('Error sending tool response:', err);
                                }
                            })();
                        }

                        // Save assistant transcripts to Firestore
                        if (firestore && message.serverContent?.modelTurn?.parts) {
                            const textParts = message.serverContent.modelTurn.parts
                                .filter((p) => p.text)
                                .map((p) => p.text);
                            if (textParts.length > 0) {
                                firestore.saveTranscript(sessionId, {
                                    role: 'assistant',
                                    content: textParts.join(' '),
                                    timestamp: new Date().toISOString(),
                                }).catch((err) => log.error('Firestore save error:', err));
                            }
                        }
                    },
                    onerror: (e) => {
                        log.error('Gemini SDK error:', e.message || e);
                        clientWs.close(1011, 'Gemini connection error');
                    },
                    onclose: () => {
                        log.info('Gemini SDK session closed');
                        clientWs.close();
                    },
                },
            });

            clientWs.send(JSON.stringify({ type: 'session_id', sessionId }));
        } catch (err) {
            log.error('Failed to connect to Gemini:', err);
            clientWs.close(1011, 'Failed to establish Gemini session');
            return;
        }

        // Handle messages from the browser client
        clientWs.on('message', (rawMessage) => {
            if (!session) return;

            try {
                const parsed = JSON.parse(rawMessage.toString());

                // Audio input
                if (parsed.realtimeInput?.mediaChunks) {
                    for (const chunk of parsed.realtimeInput.mediaChunks) {
                        // Route audio vs video based on mimeType
                        if (chunk.mimeType.startsWith('image/')) {
                            session.sendRealtimeInput({
                                video: { data: chunk.data, mimeType: chunk.mimeType },
                            });
                        } else {
                            session.sendRealtimeInput({
                                audio: { data: chunk.data, mimeType: chunk.mimeType },
                            });
                        }
                    }
                    return;
                }

                // Text content (with optional conversation context)
                if (parsed.clientContent) {
                    const text = parsed.clientContent.turns?.[0]?.parts?.[0]?.text;
                    if (text) {
                        session.sendClientContent({ turns: text });

                        if (firestore) {
                            firestore.saveTranscript(sessionId, {
                                role: 'user',
                                content: text,
                                timestamp: new Date().toISOString(),
                            }).catch((err) => log.error('Firestore save error:', err));
                        }
                    }
                    return;
                }

                // Conversation context injection
                if (parsed.type === 'context' && parsed.messages) {
                    const contextText = parsed.messages
                        .map((m) => `${m.role === 'user' ? 'User' : 'YTB'}: ${m.content}`)
                        .join('\n');
                    session.sendClientContent({
                        turns: `[Previous conversation context for continuity — do not repeat these, just be aware of them]\n${contextText}\n[End of context. The user is now speaking live via audio.]`,
                    });
                    return;
                }

                // Tool responses from client
                if (parsed.toolResponse) {
                    session.sendToolResponse({
                        functionResponses: parsed.toolResponse.functionResponses,
                    });
                    return;
                }
            } catch (err) {
                log.error('Error parsing client message:', err);
            }
        });

        clientWs.on('close', () => {
            log.info('Client disconnected');
            if (session) {
                session.close();
                session = null;
            }
        });

        clientWs.on('error', (error) => {
            log.error('Client WebSocket error:', error);
            if (session) {
                session.close();
                session = null;
            }
        });
    });

    // Let Next.js handle all other routes
    server.use((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    httpServer.listen(port, () => {
        log.info(`> Ready on http://localhost:${port}`);
    });

    // ── Graceful shutdown ──
    const shutdown = () => {
        log.info('SIGTERM received. Shutting down gracefully...');
        wss.clients.forEach((client) => client.close(1001, 'Server shutting down'));
        httpServer.close(() => {
            log.info('HTTP server closed.');
            process.exit(0);
        });
        setTimeout(() => { log.error('Forced shutdown'); process.exit(1); }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
});
