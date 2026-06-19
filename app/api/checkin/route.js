import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  try {
    const { reference, key } = await request.json();

    if (key !== process.env.ADMIN_CHECKIN_KEY) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: ticket, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('reference', reference)
      .single();

    if (error || !ticket) {
      return Response.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    if (ticket.status === 'used') {
      return Response.json({
        success: false,
        alreadyUsed: true,
        ticket,
      });
    }

    const usedAt = new Date().toISOString();

    const { data: updatedTicket, error: updateError } = await supabase
      .from('tickets')
      .update({
        status: 'used',
        used_at: usedAt,
      })
      .eq('reference', reference)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    return Response.json({
      success: true,
      ticket: updatedTicket,
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}