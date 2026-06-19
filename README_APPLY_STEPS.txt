BeatRush final ticketing updates

What changed:
1. Upcoming Events section moved above Past Events in components/BeatRushSite.jsx.
2. Stripe Checkout now allows customers to increase/decrease General Ticket quantity from 1 to 10.
3. Ticket email is now an Order Details style email.
4. QR codes are moved into an attached PDF ticket instead of inside the email body.
5. Support email changed to tickets@beatrushevents.uk.

Apply steps:
1. Copy components/BeatRushSite.jsx into your project at components/BeatRushSite.jsx and replace the old file.
2. Copy app/api/checkout/route.js into your project at app/api/checkout/route.js and replace the old file.
3. Copy lib/ticketEmail.js into your project at lib/ticketEmail.js and replace the old file.
4. Copy lib/ticketConfig.js into your project at lib/ticketConfig.js and replace the old file.
5. In Terminal inside your project folder, run:
   npm install pdfkit
6. Push to GitHub:
   git add .
   git commit -m "Added PDF tickets and quantity checkout"
   git push
7. Wait for Vercel to deploy.
8. Make one Stripe test purchase. The customer email should now have an Order Details body plus a PDF attachment containing the QR ticket.

Important:
- Keep RESEND_API_KEY in Vercel.
- Keep TICKET_FROM_EMAIL optional. If you use it, set it to: BeatRush Events <tickets@beatrushevents.uk>
- Keep NEXT_PUBLIC_SITE_URL as https://www.beatrushevents.uk or https://beatrushevents.uk, whichever one your site uses.
