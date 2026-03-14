'use client';

import React, { useState, useCallback } from 'react';
import { Sparkles, Mic, Eye, Brain, ArrowRight, Check, Shield, Volume2 } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { saveSettings, type Settings } from '../lib/settings-store';
import { saveProfile, type UserProfile } from '../lib/chat-store';
import { setOnboardingComplete, saveMoodEntry } from '../lib/wellness-store';

interface OnboardingFlowProps {
    onComplete: (settings: Settings) => void;
}

const MOOD_OPTIONS = [
    { mood: 'happy', emoji: '😊', label: 'Happy' },
    { mood: 'calm', emoji: '😌', label: 'Calm' },
    { mood: 'stressed', emoji: '😰', label: 'Stressed' },
    { mood: 'anxious', emoji: '😟', label: 'Anxious' },
    { mood: 'tired', emoji: '😴', label: 'Tired' },
    { mood: 'energized', emoji: '⚡', label: 'Energized' },
];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [hypeLevel, setHypeLevel] = useState<Settings['hypeLevel']>('normal');
    const [micGranted, setMicGranted] = useState<boolean | null>(null);
    const [cameraGranted, setCameraGranted] = useState<boolean | null>(null);
    const [transitioning, setTransitioning] = useState(false);

    const goToStep = useCallback((nextStep: number) => {
        setTransitioning(true);
        setTimeout(() => {
            setStep(nextStep);
            setTransitioning(false);
        }, 200);
    }, []);

    const requestMic = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(t => t.stop());
            setMicGranted(true);
        } catch {
            setMicGranted(false);
        }
    }, []);

    const requestCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(t => t.stop());
            setCameraGranted(true);
        } catch {
            setCameraGranted(false);
        }
    }, []);

    const handleFinish = () => {
        const settings: Settings = {
            userName: name.trim() || '',
            hypeLevel,
            theme: 'system',
        };
        saveSettings(settings);

        const profile: UserProfile = {
            conversationCount: 0,
            topicsDiscussed: [],
            lastVisit: new Date().toISOString(),
            firstVisit: new Date().toISOString(),
        };
        saveProfile(profile);

        if (selectedMood) {
            saveMoodEntry({
                mood: selectedMood,
                note: 'Initial mood during onboarding',
                timestamp: new Date().toISOString(),
                source: 'user',
            });
        }

        setOnboardingComplete();
        onComplete(settings);
    };

    const handleSkip = () => {
        const settings: Settings = { userName: '', hypeLevel: 'normal', theme: 'system' };
        saveSettings(settings);
        saveProfile({
            conversationCount: 0,
            topicsDiscussed: [],
            lastVisit: new Date().toISOString(),
            firstVisit: new Date().toISOString(),
        });
        setOnboardingComplete();
        onComplete(settings);
    };

    const totalSteps = 5;

    const steps = [
        // Step 0: Welcome
        <div key="welcome" className={`onb-step ${transitioning ? 'onb-step-exit' : ''}`}>
            <BrandLogo size={64} className="onb-logo" />
            <h1 className="onb-title">Welcome to YTB</h1>
            <p className="onb-subtitle">Your AI wellness companion that listens, remembers, and adapts to help you feel your best.</p>
            <div className="onb-features">
                <div className="onb-feature onb-feature-stagger" style={{ animationDelay: '0.1s' }}><Mic size={18} /> Real-time voice conversations</div>
                <div className="onb-feature onb-feature-stagger" style={{ animationDelay: '0.2s' }}><Eye size={18} /> Emotion-aware through vision</div>
                <div className="onb-feature onb-feature-stagger" style={{ animationDelay: '0.3s' }}><Brain size={18} /> Builds personalized wellness plans</div>
                <div className="onb-feature onb-feature-stagger" style={{ animationDelay: '0.4s' }}><Volume2 size={18} /> Binaural beats & ambient sounds</div>
            </div>
            <button className="btn btn-primary onb-next-btn" onClick={() => goToStep(1)}>
                Get Started <ArrowRight size={16} />
            </button>
            <button className="onb-skip-btn" onClick={handleSkip} type="button">
                Already set up? Skip
            </button>
        </div>,

        // Step 1: Permissions
        <div key="permissions" className={`onb-step ${transitioning ? 'onb-step-exit' : ''}`}>
            <Shield size={36} className="onb-perm-icon" />
            <h2 className="onb-question">Enable voice & vision</h2>
            <p className="onb-hint">YTB uses your mic for real-time conversation and camera to read your emotions. Both are optional.</p>
            <div className="onb-perm-grid">
                <button
                    className={`onb-perm-btn ${micGranted === true ? 'granted' : micGranted === false ? 'denied' : ''}`}
                    onClick={requestMic}
                >
                    <Mic size={24} />
                    <span className="onb-perm-name">Microphone</span>
                    <span className="onb-perm-status">
                        {micGranted === true ? 'Enabled' : micGranted === false ? 'Denied' : 'Tap to enable'}
                    </span>
                </button>
                <button
                    className={`onb-perm-btn ${cameraGranted === true ? 'granted' : cameraGranted === false ? 'denied' : ''}`}
                    onClick={requestCamera}
                >
                    <Eye size={24} />
                    <span className="onb-perm-name">Camera</span>
                    <span className="onb-perm-status">
                        {cameraGranted === true ? 'Enabled' : cameraGranted === false ? 'Denied' : 'Tap to enable'}
                    </span>
                </button>
            </div>
            <p className="onb-perm-note">You can always change these in your browser settings later.</p>
            <button className="btn btn-primary onb-next-btn" onClick={() => goToStep(2)}>
                Continue <ArrowRight size={16} />
            </button>
        </div>,

        // Step 2: Name
        <div key="name" className={`onb-step ${transitioning ? 'onb-step-exit' : ''}`}>
            <Sparkles size={28} className="onb-step-icon" />
            <h2 className="onb-question">What should I call you?</h2>
            <p className="onb-hint">This helps me personalize your experience.</p>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..."
                className="input onb-input"
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter') goToStep(3); }}
            />
            <button className="btn btn-primary onb-next-btn" onClick={() => goToStep(3)}>
                {name.trim() ? `Hey ${name.trim()}!` : 'Skip'} <ArrowRight size={16} />
            </button>
        </div>,

        // Step 3: Initial mood
        <div key="mood" className={`onb-step ${transitioning ? 'onb-step-exit' : ''}`}>
            <h2 className="onb-question">How are you feeling right now?</h2>
            <p className="onb-hint">This is your first mood log — the start of your wellness journey.</p>
            <div className="onb-mood-grid">
                {MOOD_OPTIONS.map(m => (
                    <button
                        key={m.mood}
                        className={`onb-mood-btn ${selectedMood === m.mood ? 'selected' : ''}`}
                        onClick={() => setSelectedMood(m.mood)}
                    >
                        <span className="onb-mood-emoji">{m.emoji}</span>
                        <span className="onb-mood-label">{m.label}</span>
                    </button>
                ))}
            </div>
            <button className="btn btn-primary onb-next-btn" onClick={() => goToStep(4)}>
                Continue <ArrowRight size={16} />
            </button>
        </div>,

        // Step 4: Hype level
        <div key="hype" className={`onb-step ${transitioning ? 'onb-step-exit' : ''}`}>
            <h2 className="onb-question">Pick your vibe</h2>
            <p className="onb-hint">How much energy should your companion bring?</p>
            <div className="onb-hype-options">
                <button className={`onb-hype-btn ${hypeLevel === 'chill' ? 'selected' : ''}`} onClick={() => setHypeLevel('chill')}>
                    <span className="onb-hype-emoji">😌</span>
                    <span className="onb-hype-name">Chill</span>
                    <span className="onb-hype-desc">Gentle, calm energy</span>
                </button>
                <button className={`onb-hype-btn ${hypeLevel === 'normal' ? 'selected' : ''}`} onClick={() => setHypeLevel('normal')}>
                    <span className="onb-hype-emoji">💪</span>
                    <span className="onb-hype-name">Normal</span>
                    <span className="onb-hype-desc">Encouraging & warm</span>
                </button>
                <button className={`onb-hype-btn ${hypeLevel === 'maximum' ? 'selected' : ''}`} onClick={() => setHypeLevel('maximum')}>
                    <span className="onb-hype-emoji">🔥</span>
                    <span className="onb-hype-name">Maximum</span>
                    <span className="onb-hype-desc">FULL SEND energy</span>
                </button>
            </div>
            <button className="btn btn-primary onb-next-btn" onClick={handleFinish}>
                <Check size={16} /> Let&apos;s Go!
            </button>
        </div>,
    ];

    return (
        <div className="onb-container">
            <div className="onb-progress">
                {Array.from({ length: totalSteps }, (_, i) => (
                    <div key={i} className={`onb-progress-dot ${i === step ? 'active' : i < step ? 'done' : ''}`} />
                ))}
            </div>
            {steps[step]}
        </div>
    );
}
