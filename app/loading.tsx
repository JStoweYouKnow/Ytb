export default function Loading() {
    return (
        <main style={{
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg, #111)',
            color: 'var(--text, #f0f0f0)',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                {/* Simple animated pulse indicator */}
                <div style={{
                    position: 'relative',
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'var(--accent, #6366f1)',
                        opacity: 0.2,
                        animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }} />
                    <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--accent, #6366f1)',
                    }} />
                </div>

                <p style={{
                    color: 'var(--text-secondary, #aaa)',
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                }}>
                    Waking up AI...
                </p>

                <style>{`
          @keyframes pulse-ring {
            0% { transform: scale(0.5); opacity: 0.5; }
            50% { opacity: 0.1; }
            100% { transform: scale(1.5); opacity: 0; }
          }
        `}</style>
            </div>
        </main>
    );
}
