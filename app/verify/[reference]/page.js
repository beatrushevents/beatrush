import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export default async function VerifyTicketPage({ params }) {
  const reference = params.reference;
  const supabase = getSupabaseAdmin();

  const { data: ticket, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('reference', reference)
    .single();

  const isValid = ticket && !error && ticket.status === 'valid';

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
        maxWidth: 680,
        width: '100%',
        border: '1px solid rgba(255,255,255,.15)',
        borderRadius: 24,
        padding: 36,
        background: '#050505'
      }}>
        <p style={{
          color: '#D4AF37',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          marginBottom: 16
        }}>BeatRush Events</p>

        {!ticket || error ? (
          <>
            <h1 style={{ color: '#ef4444', fontSize: 48, margin: '0 0 18px' }}>Invalid Ticket</h1>
            <p>Reference: {reference}</p>
            <p style={{ color: '#aaa' }}>This ticket was not found in the BeatRush database.</p>
          </>
        ) : (
          <>
            <h1 style={{ color: isValid ? '#22c55e' : '#f59e0b', fontSize: 48, margin: '0 0 18px' }}>
              {isValid ? 'Valid Ticket' : 'Ticket Not Valid'}
            </h1>
            <p><strong>Reference:</strong> {ticket.reference}</p>
            <p><strong>Name:</strong> {ticket.customer_name}</p>
            <p><strong>Email:</strong> {ticket.customer_email}</p>
            <p><strong>Event:</strong> {ticket.event_name}</p>
            <p><strong>Ticket:</strong> {ticket.ticket_option}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            {ticket.used_at && <p><strong>Used at:</strong> {ticket.used_at}</p>}
            <p style={{ color: '#aaa', marginTop: 28 }}>
              Door staff can verify this page against the customer’s physical ID.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
