'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body>
                <main style={{
                    height: '100dvh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#111',
                    color: '#f0f0f0',
                    fontFamily: 'system-ui, sans-serif',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        background: '#1e1e1e',
                        padding: '2rem',
                        borderRadius: '16px',
                        border: '1px solid #333',
                        maxWidth: '400px',
                        width: '100%'
                    }}>
                        <h2 style={{ margin: '0 0 1rem 0' }}>Critical Application Error</h2>
                        <p style={{ color: '#aaa', margin: '0 0 2rem 0' }}>
                            The application encountered a critical error it could not recover from.
                        </p>
                        <button
                            onClick={() => reset()}
                            style={{
                                background: '#6366f1',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            Restart Application
                        </button>
                    </div>
                </main>
            </body>
        </html>
    )
}
