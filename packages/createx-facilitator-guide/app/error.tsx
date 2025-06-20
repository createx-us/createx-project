'use client';

export async function generateStaticParams() {
  return [];
}

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>An error occurred</h1>
      <button onClick={() => reset()} style={{ padding: '0.5rem 1rem', background: '#ff6b6b', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>
        Try Again
      </button>
    </div>
  );
}
