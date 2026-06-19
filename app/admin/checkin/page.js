'use client';

import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function CheckInPage() {
  const [reference, setReference] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCheckIn(refValue = '') {
    const ticketRef = (refValue || reference).trim();

    if (!ticketRef) {
      setResult({
        error: 'Please enter a ticket reference',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const key = new URLSearchParams(window.location.search).get('key');

      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: ticketRef,
          key,
        }),
      });

      const data = await res.json();

      setResult(data);
    } catch (err) {
      setResult({
        error: 'Failed to check ticket',
      });
    }

    setLoading(false);
  }

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          let extractedReference = decodedText;

          if (decodedText.includes('/verify/')) {
            extractedReference = decodedText.split('/verify/')[1];
          }

          setReference(extractedReference);

          await handleCheckIn(extractedReference);

          await scanner.clear();
        } catch (error) {
          console.error(error);
        }
      },
      () => {}
    );

    return () => {
      try {
        scanner.clear();
      } catch {}
    };
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        padding: 30,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          color: '#D4AF37',
          marginBottom: 10,
        }}
      >
        BeatRush Check In
      </h1>

      <p
        style={{
          color: '#aaa',
          marginBottom: 20,
        }}
      >
        Scan a ticket QR or enter the ticket reference manually.
      </p>

      <div
        id="reader"
        style={{
          background: '#fff',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 20,
        }}
      />

      <input
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        placeholder="Ticket Reference"
        style={{
          width: '100%',
          maxWidth: 500,
          padding: 12,
          borderRadius: 8,
          color: '#000',
          marginBottom: 16,
        }}
      />

      <br />

      <button
        onClick={() => handleCheckIn()}
        disabled={loading}
        style={{
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