'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Something went wrong</h2>
          <button
            onClick={reset}
            style={{ padding: '0.75rem 1.5rem', background: '#0A2240', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
