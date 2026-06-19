'use client';

import { useState } from 'react';

export default function CheckInPage() {
  const [reference, setReference] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCheckIn() {
    setLoading(true);
    setResult(null);

    const key = new URLSearchParams(window.location.search).get('key');

    const res = await fetch('/api/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference,
        key,
      }),
    });

    const data = await res.json();

    setResult(data);
    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        padding: 40,
        fontFamily: 'Arial',
      }}
    >
      <h1 style={{ color: '#D4AF37' }}>
        BeatRush Check In
      </h1>

      <input
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        placeholder="Ticket Reference"
        style={{
          width: '100%',
          maxWidth: 500,
          padding: 12,
          borderRadius: 8,
          marginTop: 20,
          color: '#000',
        }}
      />

      <br />

      <button
        onClick={handleCheckIn}
        disabled={loading}
        style={{
          marginTop: 16,
          background: '#D4AF37',
          color: '#000',
          border: 'none',
          padding: '12px 20px',
          borderRadius: 8,
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Checking...' : 'Check In Ticket'}
      </button>

      {result && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            border: '1px solid #333',
            borderRadius: 12,
          }}
        >
          {result.error && (
            <h2 style={{ color: '#ef4444' }}>
              {result.error}
            </h2>
          )}

          {result.alreadyUsed && (
            <>
              <h2 style={{ color: '#f59e0b' }}>
                Already Used
              </h2>
              <p>{result.ticket.customer_name}</p>
              <p>{result.ticket.reference}</p>
              <p>{result.ticket.used_at}</p>
            </>
          )}

          {result.success && (
            <>
              <h2 style={{ color: '#22c55e' }}>
                Check In Successful
              </h2>
              <p>{result.ticket.customer_name}</p>
              <p>{result.ticket.reference}</p>
              <p>{result.ticket.ticket_option}</p>
            </>
          )}
        </div>
      )}
    </main>
  );
}