'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main style={{
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg, #111)',
            color: 'var(--text, #f0f0f0)',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <div style={{
                background: 'var(--surface, #1e1e1e)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid var(--border, #333)',
                maxWidth: '400px',
                width: '100%',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(255, 82, 82, 0.1)',
                    color: '#ff5252',
                    marginBottom: '1.5rem'
                }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                    </svg>
                </div>

                <h2 style={{
                    fontSize: '1.5rem',
                    margin: '0 0 0.5rem 0',
                    fontWeight: '600'
                }}>Something went wrong!</h2>

                <p style={{
                    color: 'var(--text-secondary, #aaa)',
                    margin: '0 0 2rem 0',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                }}>
                    We encountered an unexpected error. Please try again or refresh the page.
                </p>

                <button
                    onClick={() => reset()}
                    style={{
                        background: 'var(--accent, #6366f1)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'opacity 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                    Try again
                </button>
            </div>
        </main>
    );
}
