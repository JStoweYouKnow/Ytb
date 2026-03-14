'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Plan, sendMessage, generateGreeting } from '../lib/chat-service';
import { loadMessages, saveMessages, loadProfile, saveProfile, extractTopics, UserProfile, archiveCurrentMessages } from '../lib/chat-store';
import { loadSettings, Settings } from '../lib/settings-store';
import { Settings as SettingsIcon, Send, CheckCircle2, Circle, Sparkles, Eye, Globe, History, Plus, X, CameraOff, Camera, BarChart3, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import VoiceButton from './VoiceButton';
import WellnessStrip from './WellnessStrip';
import WellnessSheet from './WellnessSheet';

import BrandLogo from './BrandLogo';
import AudioOrb from './AudioOrb';
import BinauralControls from './BinauralControls';
import AnimatedMessage from './AnimatedMessage';
import MagneticWrapper from './MagneticWrapper';
import { GeminiLiveClient, type GroundingSource } from '../lib/gemini-live-client';
import { BinauralBeatEngine, AmbientSoundEngine } from '../lib/audio-engine';
import OnboardingFlow from './OnboardingFlow';
import SessionRecapComponent from './SessionRecap';
import {
    isOnboardingComplete, saveMoodEntry, saveEmotionFrame, saveCheckIn,
    saveWellnessPlan, saveSessionRecap, loadWellnessPlan, getPendingCheckIns,
    type SessionRecap, type WellnessPlan, type EmotionFrame, type CheckIn,
} from '../lib/wellness-store';

/* ── Starter questions (varied prompts for new chats) ── */
const STARTER_QUESTIONS: string[] = [
    "How's my day looking?",
    "I need a pep talk",
    "Help me wind down",
    "I'm feeling anxious",
    "Give me an energy boost",
    "One thing I can do for myself today?",
    "I need to vent",
    "Quick breathing exercise",
    "I'm overwhelmed—where do I start?",
    "Help me set an intention",
    "I can't sleep",
    "Remind me what I'm good at",
];

function pickStarters(count = 4): string[] {
    const shuffled = [...STARTER_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/* ── Helpers ── */
function formatTime(ts?: string): string {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function isSameDay(a?: string, b?: string): boolean {
    if (!a || !b) return false;
    return new Date(a).toDateString() === new Date(b).toDateString();
}

function formatDayLabel(ts: string): string {
    const d = new Date(ts);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return 'Today';
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
}

function hasWellnessTopic(messages: Message[]): boolean {
    const last = [...messages].reverse().find((m) => m.role === 'assistant');
    if (!last) return false;
    const lower = last.content.toLowerCase();
    return (
        lower.includes('breath') ||
        lower.includes('meditat') ||
        lower.includes('mindful') ||
        lower.includes('grounding') ||
        lower.includes('body scan') ||
        lower.includes('relax') ||
        lower.includes('calm') ||
        !!last.plan
    );
}

function detectSheetPattern(msg: string): string | null {
    const l = msg.toLowerCase();
    if (l.includes('breathing') || l.includes('breathe')) return 'box';
    if (l.includes('meditat')) return 'meditation';
    if (l.includes('sleep')) return 'fourSevenEight';
    return null;
}

function getEmotionClass(emotion: string): string {
    const lower = emotion.toLowerCase();
    if (/happy|excited|great|joy/.test(lower)) return 'emotion-happy';
    if (/stress|anxious|worried|tense/.test(lower)) return 'emotion-stressed';
    if (/calm|peaceful|relaxed|relaxing/.test(lower)) return 'emotion-calm';
    if (/tired|sleepy|exhausted|winding/.test(lower)) return 'emotion-tired';
    return '';
}

function planFooterText(done: number, total: number): string {
    if (done === 0) return 'Let\u2019s get started! \u{1F4AA}';
    if (done < total / 2) return 'Great momentum! Keep going! \u{1F525}';
    if (done < total) return 'Almost there! \u{1F60A}';
    return 'All done! You crushed it! \u{1F3C6}';
}

/* ================================================================
   ChatScreen (main component)
   ================================================================ */
export default function ChatScreen() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [settings, setSettings] = useState<Settings>({ userName: '', hypeLevel: 'normal', theme: 'system' });
    const [profile, setProfile] = useState<UserProfile>({ conversationCount: 0, topicsDiscussed: [], lastVisit: '', firstVisit: '' });
    const [showWellnessStrip, setShowWellnessStrip] = useState(false);
    const [activeSheet, setActiveSheet] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // ── Live Session State ──
    const [isLiveSessionActive, setIsLiveSessionActive] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [detectedEmotion, setDetectedEmotion] = useState<string | null>(null);
    const [showSearchGrounding, setShowSearchGrounding] = useState(false);
    const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([]);
    const [visionActive, setVisionActive] = useState(false);
    const [audioLevel, setAudioLevel] = useState<number>(0);
    const [isGeminiResponding, setIsGeminiResponding] = useState<boolean>(false);
    const [activeBinauralPreset, setActiveBinauralPreset] = useState<string | null>(null);
    const [activeAmbientSound, setActiveAmbientSound] = useState<string | null>(null);
    const [connectionError, setConnectionError] = useState(false);
    const liveClientRef = useRef<GeminiLiveClient | null>(null);
    const audioEngineRef = useRef<BinauralBeatEngine | null>(null);
    const ambientEngineRef = useRef<AmbientSoundEngine | null>(null);
    const latestTranscriptRef = useRef<string>('');
    const messagesRef = useRef<Message[]>([]);
    const videoPreviewRef = useRef<HTMLVideoElement>(null);
    const emotionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── Onboarding, Recap, Dashboard State ──
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [welcomeExiting, setWelcomeExiting] = useState(false);
    const starterQuestions = React.useMemo(() => pickStarters(4), []);
    const [sessionRecap, setSessionRecap] = useState<SessionRecap | null>(null);
    const [activePlan, setActivePlan] = useState<WellnessPlan | null>(null);
    const [pendingCheckIns, setPendingCheckIns] = useState<CheckIn[]>([]);
    const sessionStartRef = useRef<number>(Date.now());
    const sessionEmotionsRef = useRef<EmotionFrame[]>([]);

    // Keep messagesRef in sync
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    // Clear welcome exit state after animation
    useEffect(() => {
        if (welcomeExiting) {
            const t = setTimeout(() => setWelcomeExiting(false), 320);
            return () => clearTimeout(t);
        }
    }, [welcomeExiting]);

    // Initialize Audio Engines
    useEffect(() => {
        audioEngineRef.current = new BinauralBeatEngine();
        ambientEngineRef.current = new AmbientSoundEngine();
    }, []);

    // ── Init ──
    useEffect(() => {
        // Check if onboarding is needed
        if (!isOnboardingComplete()) {
            setShowOnboarding(true);
            setMounted(true);
            return;
        }

        const s = loadSettings();
        const p = loadProfile();
        const m = loadMessages();
        setSettings(s);
        setProfile(p);

        // Load wellness data
        setActivePlan(loadWellnessPlan());
        setPendingCheckIns(getPendingCheckIns());
        sessionStartRef.current = Date.now();

        if (m.length > 0) {
            setMessages(m);
            setShowWellnessStrip(hasWellnessTopic(m));
        } else {
            const greeting = generateGreeting(s, p);
            // Enhance greeting with check-in info
            const pending = getPendingCheckIns();
            let greetingText = greeting;
            if (pending.length > 0) {
                greetingText += `\n\nI have a check-in scheduled: "${pending[0].reason}". Let's talk about that!`;
            }
            const greetMsg: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: greetingText,
                timestamp: new Date().toISOString(),
            };
            setMessages([greetMsg]);
            saveMessages([greetMsg]);
        }

        const updatedProfile = { ...p, lastVisit: new Date().toISOString(), conversationCount: p.conversationCount + 1 };
        setProfile(updatedProfile);
        saveProfile(updatedProfile);

        setMounted(true);
    }, []);

    // ── Auto-scroll ──
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    // ── Send message (text, routed through Gemini API) ──
    const handleSend = useCallback(
        async (overrideText?: string) => {
            const text = overrideText ?? input.trim();
            if (!text || isTyping) return;
            if (!overrideText) setInput('');

            const userMsg: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: text,
                timestamp: new Date().toISOString(),
            };

            const updated = [...messages, userMsg];
            setMessages(updated);
            saveMessages(updated);
            setIsTyping(true);

            try {
                const reply = await sendMessage(updated, text, settings, profile);
                const withReply = [...updated, reply];
                setMessages(withReply);
                saveMessages(withReply);

                const newTopics = extractTopics(text);
                if (newTopics.length > 0) {
                    const updatedProfile = {
                        ...profile,
                        topicsDiscussed: [...new Set([...profile.topicsDiscussed, ...newTopics])],
                    };
                    setProfile(updatedProfile);
                    saveProfile(updatedProfile);
                }

                setShowWellnessStrip(hasWellnessTopic(withReply));

                const sheetKey = detectSheetPattern(text);
                if (sheetKey) {
                    setTimeout(() => setActiveSheet(sheetKey), 600);
                }
            } catch {
                // silent
            } finally {
                setIsTyping(false);
            }
        },
        [input, isTyping, messages, settings, profile]
    );

    // ── Helper: show emotion badge with auto-dismiss ──
    const showEmotion = useCallback((emotion: string) => {
        if (emotionTimerRef.current) clearTimeout(emotionTimerRef.current);
        setDetectedEmotion(emotion);
        emotionTimerRef.current = setTimeout(() => setDetectedEmotion(null), 5000);
    }, []);

    // ── Helper: show search grounding pill with auto-dismiss ──
    const showSearch = useCallback(() => {
        if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
        setShowSearchGrounding(true);
        searchTimerRef.current = setTimeout(() => {
            setShowSearchGrounding(false);
            setGroundingSources([]);
        }, 4000);
    }, []);

    // ── Camera toggle (only during live session) ──
    const toggleCamera = useCallback(async () => {
        if (!liveClientRef.current || !isLiveSessionActive) return;

        if (isCameraOn) {
            liveClientRef.current.stopCamera();
            setIsCameraOn(false);
            if (videoPreviewRef.current) {
                videoPreviewRef.current.srcObject = null;
            }
        } else {
            await liveClientRef.current.startCamera();
            setIsCameraOn(true);
            // Wire the camera stream to the self-view preview
            if (videoPreviewRef.current) {
                videoPreviewRef.current.srcObject = liveClientRef.current.getVideoStream();
            }
        }
    }, [isCameraOn, isLiveSessionActive]);

    // Track audio state via refs so callbacks don't need state deps
    const activeBinauralRef = useRef(activeBinauralPreset);
    const activeAmbientRef = useRef(activeAmbientSound);
    const sessionRecapRef = useRef(sessionRecap);
    useEffect(() => { activeBinauralRef.current = activeBinauralPreset; }, [activeBinauralPreset]);
    useEffect(() => { activeAmbientRef.current = activeAmbientSound; }, [activeAmbientSound]);
    useEffect(() => { sessionRecapRef.current = sessionRecap; }, [sessionRecap]);

    // ── Generate client-side recap when session ends ──
    const generateClientRecap = useCallback(() => {
        const durationSec = Math.round((Date.now() - sessionStartRef.current) / 1000);
        if (durationSec < 15) return; // Skip very short sessions

        const moodEntries = messagesRef.current
            .filter(m => m.role === 'assistant' && m.content)
            .map(m => m.content.toLowerCase());
        const topics: string[] = [];
        if (moodEntries.some(c => c.includes('breath') || c.includes('meditat'))) topics.push('Breathing');
        if (moodEntries.some(c => c.includes('sleep') || c.includes('rest'))) topics.push('Sleep');
        if (moodEntries.some(c => c.includes('stress') || c.includes('anxious'))) topics.push('Stress');
        if (moodEntries.some(c => c.includes('focus') || c.includes('productiv'))) topics.push('Focus');
        if (moodEntries.some(c => c.includes('gratitude') || c.includes('grateful'))) topics.push('Gratitude');
        if (moodEntries.some(c => c.includes('energy') || c.includes('exercise'))) topics.push('Energy');

        const toolsUsed: string[] = [];
        if (activeBinauralRef.current) toolsUsed.push(`Binaural: ${activeBinauralRef.current}`);
        if (activeAmbientRef.current) toolsUsed.push(`Ambient: ${activeAmbientRef.current}`);

        const emotions = sessionEmotionsRef.current;
        const startEmotion = emotions.length > 0 ? emotions[0].emotion : null;
        const endEmotion = emotions.length > 1 ? emotions[emotions.length - 1].emotion : null;

        const msgCount = messagesRef.current.length;
        const summary = msgCount > 3
            ? `A ${Math.round(durationSec / 60)}-minute wellness session covering ${topics.length > 0 ? topics.join(', ').toLowerCase() : 'general check-in'}.`
            : 'A quick check-in session.';

        const recap: SessionRecap = {
            id: `recap_${Date.now()}`,
            sessionId: `session_${sessionStartRef.current}`,
            summary,
            moodShift: (startEmotion && endEmotion && startEmotion !== endEmotion)
                ? { start: startEmotion, end: endEmotion } : null,
            topicsDiscussed: topics,
            toolsUsed,
            emotionTimeline: emotions,
            duration: durationSec,
            timestamp: new Date().toISOString(),
        };
        saveSessionRecap(recap);
        setSessionRecap(recap);
    }, []); // Stable — uses only refs

    // ── Live Session Handlers ──
    const toggleLiveSession = useCallback(async () => {
        if (isLiveSessionActive) {
            // Stop session — generate recap if Gemini didn't already
            const hadRecap = !!sessionRecapRef.current;

            if (liveClientRef.current) {
                liveClientRef.current.stop();
                liveClientRef.current = null;
            }
            if (audioEngineRef.current) {
                audioEngineRef.current.stop();
            }
            if (ambientEngineRef.current) {
                ambientEngineRef.current.stop();
            }
            setIsLiveSessionActive(false);
            setIsCameraOn(false);
            setAudioLevel(0);
            setIsGeminiResponding(false);
            setActiveBinauralPreset(null);
            setActiveAmbientSound(null);

            if (latestTranscriptRef.current.trim()) {
                handleSend(latestTranscriptRef.current.trim());
                latestTranscriptRef.current = '';
                setInput('');
            }

            // Auto-generate recap if Gemini didn't trigger one
            if (!hadRecap) {
                setTimeout(() => generateClientRecap(), 500);
            }
        } else {
            // Start session
            setConnectionError(false);
            const client = new GeminiLiveClient();
            liveClientRef.current = client;

            latestTranscriptRef.current = '';
            setInput('Listening to live session...');

            client.onAudioLevel = (level) => setAudioLevel(level);
            client.onResponseStateChange = (responding) => setIsGeminiResponding(responding);

            client.onConnected = () => {
                setIsLiveSessionActive(true);

                // Send conversation context so Gemini has session memory
                const recent = messagesRef.current.filter((m) => m.role === 'user' || m.role === 'assistant');
                if (recent.length > 0) {
                    client.sendContext(recent.map((m) => ({ role: m.role, content: m.content })));
                }
            };

            client.onDisconnected = () => {
                setIsLiveSessionActive(false);
                setIsCameraOn(false);
                setVisionActive(false);
                setConnectionError(true);
            };

            client.onTranscript = (text) => {
                latestTranscriptRef.current = text;
                setInput(`Live: ${text}`);
            };

            client.onToolCall = (toolCall) => {
                for (const call of toolCall.functionCalls) {
                    const name = call.name;
                    const args = call.args || {};

                    switch (name) {
                        case 'setBinauralPreset':
                            if (args.preset && audioEngineRef.current) {
                                const preset = args.preset as 'focus' | 'relax' | 'sleep';
                                audioEngineRef.current.play(preset);
                                setActiveBinauralPreset(preset);
                                const emotionMap: Record<string, string> = { focus: 'Focused', relax: 'Relaxing', sleep: 'Winding down' };
                                showEmotion(emotionMap[preset] || preset);
                            }
                            break;

                        case 'setAmbientSound':
                            if (args.sound && ambientEngineRef.current) {
                                const sound = args.sound as 'rain' | 'ocean' | 'forest';
                                ambientEngineRef.current.play(sound);
                                setActiveAmbientSound(sound);
                                const soundMap: Record<string, string> = { rain: 'Rain', ocean: 'Ocean Waves', forest: 'Forest' };
                                showEmotion(soundMap[sound] || sound);
                            }
                            break;

                        case 'openBreathingExercise':
                            if (args.pattern) {
                                setActiveSheet(args.pattern);
                            }
                            break;

                        case 'logMood':
                            showEmotion(args.mood || 'detected');
                            // Save to client-side wellness store
                            saveMoodEntry({
                                mood: args.mood || 'neutral',
                                note: args.note || '',
                                timestamp: new Date().toISOString(),
                                source: 'user',
                            });
                            break;

                        case 'logEmotionFrame': {
                            const frame: EmotionFrame = {
                                emotion: args.emotion || 'neutral',
                                confidence: args.confidence || 'medium',
                                timestamp: new Date().toISOString(),
                            };
                            sessionEmotionsRef.current.push(frame);
                            saveEmotionFrame(frame);
                            showEmotion(args.emotion || 'detected');
                            break;
                        }

                        case 'createWellnessPlan': {
                            // The server creates the plan, but we also store locally
                            if (args.title && args.steps) {
                                const plan: WellnessPlan = {
                                    id: `plan_${Date.now()}`,
                                    title: args.title,
                                    description: args.description || '',
                                    days: args.days || 3,
                                    startDate: new Date().toISOString(),
                                    steps: (args.steps || []).map((s: { day?: number; action: string; timeOfDay?: string }, i: number) => ({
                                        id: `step_${Date.now()}_${i}`,
                                        day: s.day || i + 1,
                                        action: s.action,
                                        timeOfDay: s.timeOfDay || 'morning',
                                        completed: false,
                                    })),
                                    status: 'active',
                                    createdAt: new Date().toISOString(),
                                };
                                saveWellnessPlan(plan);
                                setActivePlan(plan);
                            }
                            break;
                        }

                        case 'scheduleCheckIn': {
                            const now = new Date();
                            let scheduledDate: Date;
                            switch (args.scheduledFor) {
                                case 'tomorrow_morning': scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9); break;
                                case 'tomorrow_evening': scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 18); break;
                                case 'in_2_days': scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 10); break;
                                case 'next_week': scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 10); break;
                                default: scheduledDate = new Date(args.scheduledFor || Date.now() + 86400000);
                            }
                            saveCheckIn({
                                id: `ci_${Date.now()}`,
                                scheduledFor: scheduledDate.toISOString(),
                                reason: args.reason || '',
                                status: 'pending',
                                createdAt: new Date().toISOString(),
                            });
                            break;
                        }

                        case 'generateSessionRecap': {
                            const recap: SessionRecap = {
                                id: `recap_${Date.now()}`,
                                sessionId: `session_${Date.now()}`,
                                summary: args.summary || 'Session completed.',
                                moodShift: (args.moodStart && args.moodEnd) ? { start: args.moodStart, end: args.moodEnd } : null,
                                topicsDiscussed: args.topicsDiscussed || [],
                                toolsUsed: [],
                                emotionTimeline: sessionEmotionsRef.current,
                                duration: Math.round((Date.now() - sessionStartRef.current) / 1000),
                                timestamp: new Date().toISOString(),
                            };
                            saveSessionRecap(recap);
                            setSessionRecap(recap);
                            break;
                        }

                        case 'saveJournalEntry':
                        case 'getWellnessTip':
                        case 'getUserContext':
                        case 'getMoodHistory':
                        case 'trackProgress':
                        case 'generateInsights':
                            // These are handled server-side
                            break;

                        default:
                            break;
                    }
                }
            };

            client.onGroundingResult = () => {
                showSearch();
            };
            client.onGroundingSources = (sources) => {
                setGroundingSources(sources);
            };
            client.onVisionActive = (active) => {
                setVisionActive(active);
            };

            await client.connect({
                userName: settings.userName,
                hypeLevel: settings.hypeLevel,
            });
        }
    }, [isLiveSessionActive, handleSend, generateClientRecap]);

    // ── Toggle plan step ──
    const toggleStep = useCallback(
        (messageId: string, stepId: string) => {
            setMessages((prev) => {
                const updated = prev.map((m) => {
                    if (m.id !== messageId || !m.plan) return m;
                    return {
                        ...m,
                        plan: {
                            ...m.plan,
                            steps: m.plan.steps.map((s) =>
                                s.id === stepId ? { ...s, completed: !s.completed } : s
                            ),
                        },
                    };
                });
                saveMessages(updated);
                return updated;
            });
        },
        []
    );

    if (!mounted) {
        return (
            <div className="chat-container">
                <div className="chat-loading">
                    <Sparkles className="loading-icon" size={32} />
                </div>
            </div>
        );
    }

    // ── Onboarding Flow ──
    if (showOnboarding) {
        return (
            <OnboardingFlow
                onComplete={(newSettings) => {
                    setSettings(newSettings);
                    setShowOnboarding(false);
                    // Reload init
                    const p = loadProfile();
                    setProfile(p);
                    const greeting = generateGreeting(newSettings, p);
                    const greetMsg: Message = {
                        id: Date.now().toString(),
                        role: 'assistant',
                        content: greeting,
                        timestamp: new Date().toISOString(),
                    };
                    setMessages([greetMsg]);
                    saveMessages([greetMsg]);
                    sessionStartRef.current = Date.now();
                }}
            />
        );
    }

    return (
        <div className={`chat-container ${activeBinauralPreset ? `ambient-${activeBinauralPreset}` : ''} ${activeAmbientSound ? `ambient-${activeAmbientSound}` : ''} ${visionActive ? 'vision-active' : ''}`}>
            {/* ── Header ── */}
            <header className={`chat-header ${isLiveSessionActive ? 'live-active' : ''}`}>
                <div className="chat-header-left">
                    <div className="chat-avatar">
                        <BrandLogo size={24} />
                    </div>
                    <div>
                        <div className="chat-title">YTB</div>
                        <div className="chat-subtitle">
                            {isLiveSessionActive
                                ? (isCameraOn ? 'Live \u2022 Camera On' : 'Live \u2022 Voice Active')
                                : 'Your #1 Hypeman \u{1F525}'}
                        </div>
                    </div>
                </div>

                <div className="chat-header-actions" style={{ display: 'flex', gap: '8px' }}>
                    {messages.length > 1 && !isLiveSessionActive && (
                        <button
                            className="btn btn-ghost settings-icon-btn"
                            onClick={() => {
                                if (confirm('End this session and start a new one?')) {
                                    generateClientRecap();
                                    archiveCurrentMessages(messages);
                                    setMessages([]);
                                    setShowWellnessStrip(false);
                                    sessionStartRef.current = Date.now();
                                    sessionEmotionsRef.current = [];
                                }
                            }}
                            aria-label="New Session"
                            title="New Session"
                        >
                            <Plus size={20} />
                        </button>
                    )}
                    <button
                        className="btn btn-ghost settings-icon-btn"
                        onClick={() => router.push('/dashboard')}
                        aria-label="Dashboard"
                        title="Wellness Dashboard"
                    >
                        <BarChart3 size={20} />
                    </button>
                    <button
                        className="btn btn-ghost settings-icon-btn"
                        onClick={() => router.push('/history')}
                        aria-label="Past Conversations"
                        title="Past Conversations"
                    >
                        <History size={20} />
                    </button>
                    <button
                        className="btn btn-ghost settings-icon-btn"
                        onClick={() => router.push('/settings')}
                        aria-label="Settings"
                        title="Settings"
                    >
                        <SettingsIcon size={20} />
                    </button>
                </div>
            </header>

            {/* ── Connection Error Banner ── */}
            {connectionError && (
                <div className="connection-error-banner" role="alert">
                    <span>Connection failed. Tap the mic to retry.</span>
                    <div className="connection-error-actions">
                        <button
                            className="btn btn-ghost connection-error-retry"
                            onClick={() => {
                                setConnectionError(false);
                                toggleLiveSession();
                            }}
                            aria-label="Retry connection"
                        >
                            Retry
                        </button>
                        <button
                            className="btn btn-ghost connection-error-dismiss"
                            onClick={() => setConnectionError(false)}
                            aria-label="Dismiss"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* ── Camera Self-View Preview ── */}
            {isCameraOn && (
                <div className={`camera-preview-wrap ${detectedEmotion ? getEmotionClass(detectedEmotion) : ''}`}>
                    <video
                        ref={videoPreviewRef}
                        autoPlay
                        playsInline
                        muted
                        className="camera-preview-video"
                    />
                    <div className="camera-preview-label">
                        <Eye size={10} /> Live
                    </div>
                </div>
            )}

            {/* ── Emotion Detection Badge ── */}
            {detectedEmotion && (
                <div className="emotion-badge">
                    <Eye size={12} />
                    <span>Sensing: {detectedEmotion}</span>
                </div>
            )}

            {/* ── Vision active indicator ── */}
            {visionActive && (
                <div className="vision-active-pill">
                    <Eye size={12} />
                    <span>Reading your expressions</span>
                </div>
            )}

            {/* ── Google Search Grounding Indicator + Sources ── */}
            {showSearchGrounding && (
                <div className="search-grounding-wrap">
                    <div className="search-grounding-pill">
                        <Globe size={12} />
                        <span>Searched the web</span>
                    </div>
                    {groundingSources.length > 0 && (
                        <div className="grounding-sources">
                            {groundingSources.slice(0, 5).map((s, i) => (
                                s.uri ? (
                                    <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="grounding-source-link">
                                        {s.title || s.snippet?.slice(0, 50) || 'Source'} ↗
                                    </a>
                                ) : s.snippet ? (
                                    <span key={i} className="grounding-source-snippet">{s.snippet.slice(0, 80)}{s.snippet.length > 80 ? '…' : ''}</span>
                                ) : null
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ── Ambient Sound Active Indicator ── */}
            {activeAmbientSound && (
                <div className="ambient-indicator">
                    <span className="ambient-indicator-icon">
                        {activeAmbientSound === 'rain' ? '🌧' : activeAmbientSound === 'ocean' ? '🌊' : '🌿'}
                    </span>
                    <span>{activeAmbientSound === 'rain' ? 'Rain' : activeAmbientSound === 'ocean' ? 'Ocean' : 'Forest'}</span>
                    <button
                        className="ambient-indicator-stop"
                        onClick={() => {
                            if (ambientEngineRef.current) ambientEngineRef.current.stop();
                            setActiveAmbientSound(null);
                        }}
                        aria-label="Stop ambient sound"
                    >
                        <X size={12} />
                    </button>
                </div>
            )}

            {/* ── Live Mode Area ── */}
            {isLiveSessionActive && (
                <div className="live-mode-area">
                    <AudioOrb audioLevel={audioLevel} isResponding={isGeminiResponding} preset={activeBinauralPreset} />
                    <div className={`live-status-text ${isGeminiResponding ? 'speaking' : ''}`}>
                        {isGeminiResponding ? 'Speaking...' : 'Listening...'}
                    </div>
                    <BinauralControls />
                </div>
            )
            }

            {/* ── Welcome State ── */}
            {
                !isLiveSessionActive && (messages.length <= 1 || welcomeExiting) && (
                    <div className={`welcome-state ${welcomeExiting ? 'welcome-state-exit' : ''}`}>
                        <BrandLogo size={48} className="welcome-logo" />
                        <p className="welcome-prompt">Tap the mic to start talking, or pick a prompt below</p>
                        <div className="welcome-actions">
                            {starterQuestions.map((q) => (
                                <MagneticWrapper key={q} strength={0.25}>
                                    <button
                                        className="welcome-pill"
                                        onClick={() => {
                                            setWelcomeExiting(true);
                                            handleSend(q);
                                        }}
                                    >
                                        {q}
                                    </button>
                                </MagneticWrapper>
                            ))}
                        </div>
                    </div>
                )
            }

            {/* ── Messages ── */}
            <div
                className={`chat-messages ${isLiveSessionActive ? 'chat-messages-dimmed' : ''}`}
                data-hype={settings.hypeLevel}
            >
                {messages.map((msg, index) => {
                    const prevMsg = messages[index - 1];
                    const showDaySep = msg.timestamp && (!prevMsg?.timestamp || !isSameDay(prevMsg.timestamp, msg.timestamp));

                    return (
                        <React.Fragment key={msg.id}>
                            {showDaySep && msg.timestamp && (
                                <div className="day-separator">
                                    <span>{formatDayLabel(msg.timestamp)}</span>
                                </div>
                            )}

                            <div className={`message-row ${msg.role === 'user' ? 'message-row-user' : ''}`}>
                                {msg.role === 'assistant' && (
                                    <div className="message-avatar message-avatar-bot">
                                        <BrandLogo size={18} />
                                    </div>
                                )}
                                <div className="message-content-wrap">
                                    {!!msg.content && (
                                        <div className={`message-bubble ${msg.role === 'user' ? 'message-bubble-user' : 'message-bubble-bot'}`}>
                                            {msg.role === 'assistant' ? (
                                                <AnimatedMessage
                                                    content={msg.content}
                                                    isLatest={index === messages.length - 1 && !isTyping}
                                                    onUpdate={scrollToBottom}
                                                />
                                            ) : (
                                                msg.content
                                            )}
                                        </div>
                                    )}

                                    {msg.plan && (
                                        <PlanCard plan={msg.plan} messageId={msg.id} onToggle={toggleStep} />
                                    )}

                                    {msg.timestamp && (
                                        <div className="message-timestamp">{formatTime(msg.timestamp)}</div>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}

                {isTyping && (
                    <div className="message-row">
                        <div className="message-avatar message-avatar-bot">
                            <BrandLogo size={18} />
                        </div>
                        <div className="typing-indicator">
                            <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                            <span className="typing-dot" style={{ animationDelay: '150ms' }} />
                            <span className="typing-dot" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* ── Wellness Strip (conditional) ── */}
            {
                showWellnessStrip && (
                    <WellnessStrip onSelect={(msg) => handleSend(msg)} />
                )
            }

            {/* ── Input Bar ── */}
            <div className="chat-input-area">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="chat-input-form"
                >
                    <VoiceButton
                        isListening={isLiveSessionActive}
                        onToggle={toggleLiveSession}
                        disabled={isTyping && !isLiveSessionActive}
                        isHero={isLiveSessionActive}
                    />

                    {/* Camera toggle — only visible during live session */}
                    {isLiveSessionActive && (
                        <button
                            type="button"
                            className={`btn btn-ghost camera-btn ${isCameraOn ? 'camera-active' : ''}`}
                            onClick={toggleCamera}
                            aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
                        >
                            {isCameraOn ? <CameraOff size={18} /> : <Camera size={18} />}
                        </button>
                    )}

                    <input
                        type="text"
                        value={input}
                        readOnly={isLiveSessionActive}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Tell me what's on your mind..."
                        className="input chat-input"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping || isLiveSessionActive}
                        className="btn btn-primary send-btn"
                        aria-label="Send"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>

            {/* ── Pending Check-in Banner ── */}
            {pendingCheckIns.length > 0 && !isLiveSessionActive && (
                <div className="checkin-banner">
                    <Bell size={14} />
                    <span>Check-in: {pendingCheckIns[0].reason}</span>
                    <button className="checkin-banner-btn" onClick={() => {
                        handleSend(`I'm here for my check-in about: ${pendingCheckIns[0].reason}`);
                        setPendingCheckIns([]);
                    }}>Start</button>
                </div>
            )}

            {/* ── Wellness Sheet ── */}
            {activeSheet && (
                <WellnessSheet
                    patternKey={activeSheet}
                    userName={settings.userName || 'friend'}
                    onClose={() => setActiveSheet(null)}
                />
            )}

            {/* ── Session Recap Overlay ── */}
            {sessionRecap && (
                <SessionRecapComponent
                    recap={sessionRecap}
                    onClose={() => setSessionRecap(null)}
                    onViewDashboard={() => { setSessionRecap(null); router.push('/dashboard'); }}
                />
            )}
        </div>
    );
}

/* ================================================================
   PlanCard sub-component (inline for performance)
   ================================================================ */
function PlanCard({
    plan,
    messageId,
    onToggle,
}: {
    plan: Plan;
    messageId: string;
    onToggle: (messageId: string, stepId: string) => void;
}) {
    const doneCount = plan.steps.filter((s) => s.completed).length;
    const total = plan.steps.length;
    const pct = total > 0 ? (doneCount / total) * 100 : 0;

    return (
        <div className="plan-card">
            <div className="plan-header">
                <div className="plan-title">{plan.title}</div>
                <div className="plan-progress-row">
                    <span className="plan-progress-text">
                        {doneCount} of {total} done
                    </span>
                </div>
                <div className="plan-progress-bar">
                    <div className="plan-progress-fill" style={{ width: `${pct}%` }} />
                </div>
            </div>
            <div className="plan-steps">
                {plan.steps.map((step) => (
                    <button
                        key={step.id}
                        className={`plan-step ${step.completed ? 'plan-step-done' : ''}`}
                        onClick={() => onToggle(messageId, step.id)}
                    >
                        <span className={`plan-step-icon ${step.completed ? 'animate-check' : ''}`}>
                            {step.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                        </span>
                        <span className="plan-step-text">{step.text}</span>
                    </button>
                ))}
            </div>
            <div className="plan-footer">{planFooterText(doneCount, total)}</div>
        </div>
    );
}
