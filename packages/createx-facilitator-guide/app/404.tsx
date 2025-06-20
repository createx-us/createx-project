export const revalidate = 0;

export async function generateStaticParams() {
  return [];
}

export default function Custom404() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <a href="/" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Go Home</a>
    </div>
  );
}
