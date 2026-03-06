"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2, Save, Heart, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { Settings, loadSettings, saveSettings, DEFAULT_SETTINGS } from "../lib/settings-store";
import { clearAllData } from "../lib/chat-store";
import SegmentedControl from "../components/SegmentedControl";

export default function SettingsPage() {
    const router = useRouter();
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [saved, setSaved] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);

    useEffect(() => {
        setSettings(loadSettings());
    }, []);

    useEffect(() => {
        if (settings.theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else if (settings.theme === 'light') {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode', 'light-mode');
        }
    }, [settings.theme]);

    const handleSave = () => {
        saveSettings(settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleClear = () => {
        if (confirmClear) {
            clearAllData();
            setConfirmClear(false);
            router.push("/");
        } else {
            setConfirmClear(true);
            setTimeout(() => setConfirmClear(false), 3000);
        }
    };

    return (
        <main className="settings-page">
            <div className="settings-container">
                {/* Header */}
                <header className="settings-header">
                    <button onClick={() => router.push("/")} className="btn btn-ghost settings-back-btn" aria-label="Go back">
                        <ArrowLeft size={20} />
                    </button>
                    <h1>Settings</h1>
                    <div style={{ width: 44 }} />
                </header>

                {/* Form */}
                <div className="settings-body">
                    {/* Name */}
                    <div className="settings-group animate-fade-in">
                        <label className="settings-label">Your Name</label>
                        <p className="settings-hint">This personalizes your hypeman responses.</p>
                        <input
                            type="text"
                            value={settings.userName}
                            onChange={(e) => setSettings({ ...settings, userName: e.target.value })}
                            placeholder="Enter your name..."
                            className="input"
                        />
                    </div>

                    {/* Hype Level */}
                    <div className="settings-group animate-fade-in" style={{ animationDelay: "100ms" }}>
                        <label className="settings-label">Hype Level</label>
                        <p className="settings-hint">How much energy should your hypeman bring?</p>
                        <SegmentedControl
                            options={[
                                { value: 'chill', label: '😌 Chill', description: 'Easy vibes 🌊' },
                                { value: 'normal', label: '💪 Normal', description: "Let's GO" },
                                { value: 'maximum', label: '🔥 Maximum', description: 'FULL SEND 🔥🔥🔥' },
                            ]}
                            value={settings.hypeLevel}
                            onChange={(v) => setSettings({ ...settings, hypeLevel: v as Settings['hypeLevel'] })}
                        />
                    </div>

                    {/* Theme */}
                    <div className="settings-group animate-fade-in" style={{ animationDelay: "200ms" }}>
                        <label className="settings-label">Theme</label>
                        <SegmentedControl
                            options={[
                                { value: 'system', label: '💻 System' },
                                { value: 'light', label: '☀️ Light' },
                                { value: 'dark', label: '🌙 Dark' },
                            ]}
                            value={settings.theme}
                            onChange={(v) => setSettings({ ...settings, theme: v as Settings['theme'] })}
                        />
                    </div>

                    {/* Save */}
                    <button onClick={handleSave} className="btn btn-primary settings-save-btn animate-fade-in" style={{ animationDelay: "300ms" }}>
                        <Save size={18} />
                        <span>{saved ? "Saved! ✓" : "Save Settings"}</span>
                    </button>

                    {/* What YTB Can & Can't Do */}
                    <div className="settings-group settings-boundaries animate-fade-in" style={{ animationDelay: "350ms" }}>
                        <label className="settings-label">
                            <ShieldAlert size={18} style={{ marginRight: 6, verticalAlign: -3 }} />
                            What YTB Can &amp; Can&apos;t Do
                        </label>

                        <div className="boundaries-section">
                            <div className="boundaries-col boundaries-can">
                                <h3><Heart size={14} /> I can help with</h3>
                                <ul>
                                    <li>Daily motivation &amp; hype</li>
                                    <li>Reflecting on your day</li>
                                    <li>Talking through stress</li>
                                    <li>Goal-setting &amp; planning</li>
                                    <li>Guided breathing &amp; focus</li>
                                </ul>
                            </div>
                            <div className="boundaries-col boundaries-cant">
                                <h3><ShieldAlert size={14} /> I can&apos;t replace</h3>
                                <ul>
                                    <li>Therapy or counseling</li>
                                    <li>Medical/psychiatric advice</li>
                                    <li>Crisis intervention</li>
                                    <li>Medication guidance</li>
                                    <li>Diagnosing conditions</li>
                                </ul>
                            </div>
                        </div>

                        <p className="settings-hint" style={{ marginTop: 12 }}>
                            If you&apos;re in crisis, call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) or text <strong>HELLO</strong> to <strong>741741</strong> (Crisis Text Line).
                        </p>
                    </div>

                    {/* Danger Zone */}
                    <div className="settings-danger animate-fade-in" style={{ animationDelay: "400ms" }}>
                        <label className="settings-label">Danger Zone</label>
                        <p className="settings-hint">This will erase all messages and settings.</p>
                        <button onClick={handleClear} className="btn settings-clear-btn">
                            <Trash2 size={16} />
                            <span>{confirmClear ? "Tap again to confirm" : "Clear All Data"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
