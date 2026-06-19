export default function SuccessPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'Arial' }}>
      <div style={{ maxWidth: 620, textAlign: 'center', border: '1px solid #333', borderRadius: 24, padding: 32, background: '#070707' }}>
        <p style={{ color: '#D4AF37', letterSpacing: 3, textTransform: 'uppercase' }}>BeatRush Events</p>
        <h1>Payment successful</h1>
        <p>Your ticket will be emailed automatically after payment confirmation.</p>
        <p style={{ color: '#aaa' }}>Please check your inbox and spam/junk folder.</p>
        <a href="/" style={{ display: 'inline-block', marginTop: 20, background: '#fff', color: '#000', padding: '12px 20px', borderRadius: 999, textDecoration: 'none' }}>Back to homepage</a>
      </div>
    </main>
  );
}
