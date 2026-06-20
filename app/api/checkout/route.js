import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const EVENT = {
  name: 'Thala X Thalapathy - BeatRush Events',
  ticketName: 'General Ticket',
  price: 1299,
  currency: 'gbp',
};

export async function POST(request) {
  try {
    const { quantity = 1 } = await request.json().catch(() => ({}));
    const safeQuantity = Math.max(1, Math.min(Number(quantity) || 1, 10));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_creation: 'always',
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: 'full_name',
          label: { type: 'custom', custom: 'Full name for ticket' },
          type: 'text',
          optional: false,
        },
      ],
      line_items: [
        {
          price_data: {
            currency: EVENT.currency,
            product_data: {
              name: EVENT.ticketName,
              description: EVENT.name,
            },
            unit_amount: EVENT.price,
          },
          quantity: safeQuantity,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
        },
      ],
      metadata: {
        event_name: EVENT.name,
        ticket_option: EVENT.ticketName,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#upcoming-events`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return Response.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
