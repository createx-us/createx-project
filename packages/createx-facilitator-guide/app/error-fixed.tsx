'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f9fafb',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <div style={{ maxWidth: '400px', textAlign: 'center', padding: '20px' }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>Error</h1>
                <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>Something went wrong</h2>
                <p style={{ color: '#666', margin: '0 0 2rem 0' }}>
                    We're sorry, but an error occurred while loading the facilitator guide.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={() => reset()}
                        style={{
                            background: 'linear-gradient(to right, #14b8a6, #3b82f6)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </button>
                    <a
                        href="/"
                        style={{
                            background: '#e5e7eb',
                            color: '#374151',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
