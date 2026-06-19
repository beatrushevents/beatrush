create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  stripe_session_id text not null,
  stripe_payment_intent text,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  event_name text not null,
  ticket_option text not null,
  status text not null default 'valid',
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists tickets_reference_idx on public.tickets(reference);
create index if not exists tickets_email_idx on public.tickets(customer_email);
