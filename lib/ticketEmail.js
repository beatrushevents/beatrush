import QRCode from 'qrcode';
import { Resend } from 'resend';
import PDFDocument from 'pdfkit';
import { EVENT_DETAILS } from './ticketConfig';

const GOLD = '#D4AF37';
const BLACK = '#050505';
const DARK = '#111111';
const WHITE = '#FFFFFF';
const MUTED = '#A3A3A3';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatCurrencyFromPence(pence = 0) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format((Number(pence) || 0) / 100);
}

function createPdfBuffer(doc) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    doc.end();
  });
}

async function createTicketsPdf({ name, email, tickets }) {
  const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false });

  for (const [index, ticket] of tickets.entries()) {
    const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify/${ticket.reference}`;
    const qrPng = await QRCode.toBuffer(verifyUrl, {
      type: 'png',
      width: 360,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    });

    doc.addPage();

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    doc.rect(0, 0, pageWidth, pageHeight).fill(BLACK);

    doc
      .fillColor(GOLD)
      .fontSize(13)
      .font('Helvetica-Bold')
      .text('BEATRUSH EVENTS', 54, 48, { characterSpacing: 3 });

    doc
      .fillColor(WHITE)
      .fontSize(38)
      .font('Helvetica-Bold')
      .text('General Ticket', 54, 82);

    doc
      .fillColor(MUTED)
      .fontSize(14)
      .font('Helvetica')
      .text(EVENT_DETAILS.eventName, 54, 132);

    doc
      .roundedRect(42, 176, pageWidth - 84, 525, 24)
      .fillAndStroke(DARK, '#2A2A2A');

    doc
      .fillColor(GOLD)
      .fontSize(18)
      .font('Helvetica-Bold')
      .text('Ticket Details', 72, 210);

    const rows = [
      ['Reference', ticket.reference],
      ['Name', name],
      ['Email', email],
      ['Admits', String(EVENT_DETAILS.admits)],
      ['Option', EVENT_DETAILS.ticketOption],
      ['Starts', EVENT_DETAILS.starts],
      ['Ends', EVENT_DETAILS.ends],
      ['Location', EVENT_DETAILS.location],
    ];

    let y = 252;
    rows.forEach(([label, value]) => {
      doc
        .fillColor(MUTED)
        .fontSize(10)
        .font('Helvetica-Bold')
        .text(label.toUpperCase(), 72, y, { width: 130 });

      doc
        .fillColor(WHITE)
        .fontSize(12)
        .font('Helvetica')
        .text(value, 190, y - 1, { width: 300 });

      y += 34;
    });

    doc
      .roundedRect(205, 515, 185, 185, 18)
      .fill(WHITE);

    doc.image(qrPng, 222, 532, { width: 150, height: 150 });

    doc
      .fillColor(MUTED)
      .fontSize(10)
      .font('Helvetica')
      .text('Scan this QR at entry', 205, 708, { width: 185, align: 'center' });

    doc
      .fillColor(WHITE)
      .fontSize(11)
      .font('Helvetica-Bold')
      .text(EVENT_DETAILS.agePolicy, 54, 740, { width: pageWidth - 108, align: 'center' });

    doc
      .fillColor(MUTED)
      .fontSize(9)
      .font('Helvetica')
      .text(`Ticket ${index + 1} of ${tickets.length} • Support: ${EVENT_DETAILS.supportEmail}`, 54, 785, {
        width: pageWidth - 108,
        align: 'center',
      });
  }

  return createPdfBuffer(doc);
}

export async function sendTicketEmail({ to, name, tickets }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY missing. Skipping email send.');
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const quantity = tickets.length;
  const unitPricePence = EVENT_DETAILS.ticketPricePence || 1000;
  const totalPence = unitPricePence * quantity;
  const orderCode = tickets[0]?.reference?.replace(/^BR-/, '') || 'BEATRUSH';
  const customerName = escapeHtml(name || 'Guest');
  const customerEmail = escapeHtml(to);
  const ticketLabel = escapeHtml(EVENT_DETAILS.ticketOption);
  const pdfBuffer = await createTicketsPdf({ name, email: to, tickets });

  const { error } = await resend.emails.send({
    from: process.env.TICKET_FROM_EMAIL || 'BeatRush Events <tickets@beatrushevents.uk>',
    to,
    subject: `Your BeatRush order - ${EVENT_DETAILS.eventName}`,
    attachments: [
      {
        filename: `BeatRush-Tickets-${orderCode}.pdf`,
        content: pdfBuffer.toString('base64'),
      },
    ],
    html: `
      <div style="margin:0;padding:0;background:#1f2024;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
        <div style="max-width:680px;margin:0 auto;background:#1f2024;padding:42px 26px 30px;">
          <h1 style="margin:0 0 22px;text-align:center;font-size:52px;line-height:1.05;color:#ffffff;font-weight:800;">Order Details</h1>
          <p style="margin:0 0 28px;text-align:center;font-size:20px;line-height:1.5;color:#ffffff;">Thank you for your order from <strong>BeatRush Events</strong></p>

          <div style="text-align:center;margin:0 0 34px;">
            <p style="margin:0 0 6px;font-size:21px;font-weight:800;color:#ffffff;">Your Details:</p>
            <p style="margin:0 0 6px;font-size:20px;color:#ffffff;">${customerName}</p>
            <p style="margin:0;font-size:18px;"><a href="mailto:${customerEmail}" style="color:#7DB1FF;text-decoration:underline;">${customerEmail}</a></p>
          </div>

          <div style="text-align:center;margin:0 0 28px;">
            <p style="margin:0;font-size:21px;font-weight:800;color:#ffffff;">Your Order (#${escapeHtml(orderCode)}):</p>
          </div>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;color:#ffffff;font-size:18px;">
            <thead>
              <tr>
                <th align="left" style="font-weight:400;padding:0 0 18px;">Item</th>
                <th align="right" style="font-weight:400;padding:0 0 18px;">Price</th>
                <th align="right" style="font-weight:400;padding:0 0 18px;">Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border-top:1px solid #3a3b40;padding:26px 0;"><span>${quantity} x </span><strong>${ticketLabel}</strong></td>
                <td align="right" style="border-top:1px solid #3a3b40;padding:26px 0;">${formatCurrencyFromPence(totalPence)}</td>
                <td align="right" style="border-top:1px solid #3a3b40;padding:26px 0;">${escapeHtml(EVENT_DETAILS.feeLabel || 'Free')}</td>
              </tr>
            </tbody>
          </table>

          <div style="background:#ffffff;color:#191a1f;margin:0 -26px 26px;padding:28px 26px;display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:24px;line-height:1.15;font-weight:800;">Order<br/>Total</div>
            <div style="font-size:24px;font-weight:800;">${formatCurrencyFromPence(totalPence)}</div>
          </div>

          <p style="margin:0 0 8px;color:#c9c9c9;font-size:15px;line-height:1.6;text-align:center;">Your PDF ticket${quantity > 1 ? 's are' : ' is'} attached to this email. Each ticket has its own QR code for entry.</p>
          <p style="margin:0;color:#c9c9c9;font-size:13px;line-height:1.6;text-align:center;">For support, contact <a href="mailto:${escapeHtml(EVENT_DETAILS.supportEmail)}" style="color:#7DB1FF;">${escapeHtml(EVENT_DETAILS.supportEmail)}</a>.</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend email failed:', error);
    throw new Error(error.message || 'Resend email failed');
  }
}
