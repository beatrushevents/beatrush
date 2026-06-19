‘use client’;

import { useState, useEffect } from ‘react’;
import { Html5QrcodeScanner } from ‘html5-qrcode’;

export default function CheckInPage() {
const [reference, setReference] = useState(’’);
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);

async function handleCheckIn(refValue) {
const finalReference = refValue || reference;

if (!finalReference) {
  setResult({ error: 'Please enter a ticket reference' });
  return;
}
setLoading(true);
setResult(null);
const key = new URLSearchParams(window.location.search).get('key');
const res = await fetch('/api/checkin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    reference: finalReference.trim(),
    key,
  }),
});
const data = await res.json();
setResult(data);
setLoading(false);

}

useEffect(() => {
const scanner = new Html5QrcodeScanner(
‘reader’,
{
fps: 10,
qrbox: 250,
},
false
);

scanner.render(
  async (decodedText) => {
    try {
      let reference = decodedText;
      if (decodedText.includes('/verify/')) {
        reference = decodedText.split('/verify/')[1];
      }
      setReference(reference);
      await handleCheckIn(reference);
      scanner.clear();
    } catch (err) {
      console.error(err);
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
minHeight: ‘100vh’,
background: ‘#000’,
color: ‘#fff’,
padding: 30,
fontFamily: ‘Arial’,
}}
>
<h1 style={{ color: ‘#D4AF37’ }}>
BeatRush Check In
  <p style={{ color: '#aaa' }}>
    Scan ticket QR code or enter ticket reference manually.
  </p>
  <div
    id="reader"
    style={{
      marginTop: 20,
      background: '#fff',
      borderRadius: 12,
      overflow: 'hidden',
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
      marginTop: 20,
      color: '#000',
    }}
  />
  <br />
  <button
    onClick={() => handleCheckIn()}
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