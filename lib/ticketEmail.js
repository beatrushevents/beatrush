import QRCode from 'qrcode';
import { Resend } from 'resend';
import { EVENT_DETAILS } from './ticketConfig';

export async function sendTicketEmail({ to, name, tickets }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY missing. Skipping email send.');
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const ticketBlocks = await Promise.all(
    tickets.map(async (ticket) => {
      const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify/${ticket.reference}`;
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'H',
      });

      return `
        <div style="border:1px solid #222;border-radius:18px;padding:22px;margin:18px 0;background:#080808;color:#fff;font-family:Arial,sans-serif;">
          <h2 style="margin:0 0 10px;color:#D4AF37;">BeatRush Events ticket</h2>
          <p><strong>Admits:</strong> ${EVENT_DETAILS.admits}</p>
          <p><strong>Reference:</strong> ${ticket.reference}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Option:</strong> ${EVENT_DETAILS.ticketOption}</p>
          <p><strong>Starts:</strong> ${EVENT_DETAILS.starts}</p>
          <p><strong>Ends:</strong> ${EVENT_DETAILS.ends}</p>
          <p><strong>Event:</strong> ${EVENT_DETAILS.eventName}</p>
          <p><strong>Location:</strong> ${EVENT_DETAILS.location}</p>
          <p><strong>Important:</strong> ${EVENT_DETAILS.agePolicy}</p>
          <div style="text-align:center;margin-top:18px;background:#fff;padding:16px;border-radius:14px;">
            <img
              src="${qrDataUrl}"
              alt="Ticket QR Code"
              width="220"
              height="220"
              style="display:block;margin:auto;background:#fff;"
            />
          </div>
          <p style="font-size:12px;color:#aaa;text-align:center;">Scan at entry to verify this ticket.</p>
        </div>
      `;
    })
  );

  await resend.emails.send({
    from: process.env.TICKET_FROM_EMAIL || 'BeatRush Events <tickets@beatrushevents.uk>',
    to,
    subject: `Your BeatRush ticket - ${EVENT_DETAILS.eventName}`,
    html: `
      <div style="background:#000;padding:24px;font-family:Arial,sans-serif;color:#fff;">
        <h1 style="color:#D4AF37;">Your ticket is confirmed</h1>
        <p>Hi ${name},</p>
        <p>Thank you for booking with BeatRush Events. Your ticket details are below.</p>
        ${ticketBlocks.join('')}
        <p style="color:#aaa;font-size:12px;">For support, contact ${EVENT_DETAILS.supportEmail}.</p>
      </div>
    `,
  });
}