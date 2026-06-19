import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export default async function VerifyTicketPage({ params }) {
  const reference = params.reference;
  const supabase = getSupabaseAdmin();

  const { data: ticket, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('reference', reference)
    .single();

  if (error || !ticket) {
    return (
      <main style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'Arial' }}>
        <div style={{ maxWidth: 520, border: '1px solid #333', borderRadius: 24, padding: 28 }}>
          <h1 style={{ color: '#ff4d4d' }}>Invalid Ticket</h1>
          <p>This ticket reference was not found.</p>
          <p style={{ color: '#aaa' }}>{reference}</p>
        </div>
      </main>
    );
  }

  const used = Boolean(ticket.used_at);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'Arial' }}>
      <div style={{ maxWidth: 620, width: '100%', border: '1px solid #333', borderRadius: 24, padding: 28, background: '#070707' }}>
        <p style={{ letterSpacing: 3, color: '#D4AF37', textTransform: 'uppercase' }}>BeatRush Events</p>
        <h1 style={{ color: used ? '#ff4d4d' : '#22c55e', fontSize: 42 }}>{used ? 'Already Used' : 'Valid Ticket'}</h1>
        <p><strong>Reference:</strong> {ticket.reference}</p>
        <p><strong>Name:</strong> {ticket.customer_name}</p>
        <p><strong>Email:</strong> {ticket.customer_email}</p>
        <p><strong>Event:</strong> {ticket.event_name}</p>
        <p><strong>Ticket:</strong> {ticket.ticket_option}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        {used && <p><strong>Used at:</strong> {new Date(ticket.used_at).toLocaleString('en-GB')}</p>}
        <p style={{ color: '#aaa', marginTop: 24 }}>Door staff can verify this page against the customer’s physical ID.</p>
      </div>
    </main>
  );
}
