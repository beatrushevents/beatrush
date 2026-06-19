export default function SuccessPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: 560,
        width: '100%',
        border: '1px solid rgba(255,255,255,.15)',
        borderRadius: 24,
        padding: 36,
        textAlign: 'center',
        background: '#050505'
      }}>
        <p style={{
          color: '#D4AF37',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          marginBottom: 12
        }}>BeatRush Events</p>
        <h1 style={{ margin: '0 0 12px' }}>Payment successful</h1>
        <p>Your ticket will be emailed automatically after payment confirmation.</p>
        <p style={{ color: '#aaa' }}>Please check your inbox and spam/junk folder.</p>
        <a href="/" style={{
          display: 'inline-block',
          marginTop: 24,
          background: '#fff',
          color: '#000',
          padding: '14px 26px',
          borderRadius: 999,
          textDecoration: 'none',
          fontWeight: 700
        }}>Back to homepage</a>
      </div>
    </main>
  );
}
