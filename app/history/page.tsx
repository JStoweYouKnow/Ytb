'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadHistory, HistorySession, clearAllData } from '../lib/chat-store';
import { ArrowLeft, MessageSquare, Trash2, ChevronRight } from 'lucide-react';
import MagneticWrapper from '../components/MagneticWrapper';

export default function HistoryPage() {
    const router = useRouter();
    const [history, setHistory] = useState<HistorySession[]>([]);
    const [mounted, setMounted] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        setHistory(loadHistory());
        setMounted(true);
    }, []);

    const handleClear = () => {
        if (confirm('Are you sure you want to delete all past conversations? This cannot be undone.')) {
            clearAllData();
            setHistory([]);
        }
    };

    if (!mounted) return null;

    return (
        <main className="history-page">
            <header className="history-header">
                <button className="history-back-btn" onClick={() => router.push('/chat')}>
                    <ArrowLeft size={20} />
                </button>
                <h1>Past Conversations</h1>
                {history.length > 0 ? (
                    <button className="history-clear-btn" onClick={handleClear} aria-label="Clear all">
                        <Trash2 size={18} />
                    </button>
                ) : (
                    <div style={{ width: 44 }} />
                )}
            </header>

            <div className="history-body">
                {history.length === 0 ? (
                    <div className="history-empty">
                        <MessageSquare size={48} className="history-empty-icon" />
                        <h2>No history yet</h2>
                        <p>Your past conversations will appear here when you end a chat session.</p>
                        <MagneticWrapper strength={0.2}>
                            <button className="btn btn-primary mt-4" onClick={() => router.push('/chat')}>
                                Start a Conversation
                            </button>
                        </MagneticWrapper>
                    </div>
                ) : (
                    <div className="history-list">
                        {history.map((session) => (
                            <div key={session.id} className="history-card">
                                <div
                                    className="history-card-header"
                                    onClick={() => setExpandedId(expandedId === session.id ? null : session.id)}
                                >
                                    <div className="history-card-info">
                                        <div className="history-date">
                                            {new Date(session.timestamp).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                        <div className="history-preview">"{session.preview}"</div>
                                    </div>
                                    <div className={`history-card-chevron ${expandedId === session.id ? 'expanded' : ''}`}>
                                        <ChevronRight size={20} />
                                    </div>
                                </div>

                                {expandedId === session.id && (
                                    <div className="history-card-content">
                                        {session.messages.map((msg, i) => (
                                            msg.role === 'assistant' || msg.role === 'user' ? (
                                                <div key={msg.id || i} className={`history-msg ${msg.role}`}>
                                                    <span className="history-role">{msg.role === 'user' ? 'You' : 'YTB'}</span>
                                                    <div className="history-text">{msg.content}</div>
                                                </div>
                                            ) : null
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
