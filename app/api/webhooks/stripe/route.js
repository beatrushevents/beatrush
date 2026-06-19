import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { createTicketReference, EVENT_DETAILS } from '@/lib/ticketConfig';
import { sendTicketEmail } from '@/lib/ticketEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            persistSession: false,
          },
        }
      );

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });
      const quantity = lineItems.data.reduce((sum, item) => sum + (item.quantity || 1), 0) || 1;

      const fullNameField = session.custom_fields?.find((field) => field.key === 'full_name');
      const name = fullNameField?.text?.value || session.customer_details?.name || 'Guest';
      const email = session.customer_details?.email;
      const phone = session.customer_details?.phone || null;

      if (!email) throw new Error('No customer email found on Stripe session');

      const tickets = Array.from({ length: quantity }, () => ({
        reference: createTicketReference(),
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        event_name: EVENT_DETAILS.eventName,
        ticket_option: EVENT_DETAILS.ticketOption,
        status: 'valid',
        used_at: null,
      }));

      const { error } = await supabase.from('tickets').insert(tickets);

      if (error) {
        throw error;
      }

      await sendTicketEmail({ to: email, name, tickets });
    } catch (error) {
      console.error('Ticket generation failed:', error);
      return Response.json(
        { received: true, ticketError: error.message },
        { status: 200 }
      );
    }
  }

  return Response.json({ received: true });
}