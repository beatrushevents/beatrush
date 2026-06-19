export const EVENT_DETAILS = {
  eventName: 'Thala X Thalapathy - BeatRush Events',
  organiser: 'BeatRush Events',
  ticketOption: 'General Ticket',
  admits: 1,
  starts: 'Sat 20 Jun 2026, 11:00pm',
  ends: 'Sun 21 Jun 2026, 4:00am',
  location: 'Brixton Jamm, 261 Brixton Road, London SW9 6LH',
  agePolicy: '18+ Event. Physical ID must. No ID, No Entry.',
  supportEmail: 'beatrushevents@gmail.com',
};

export function createTicketReference() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  const time = Date.now().toString(36).slice(-4).toUpperCase();
  return `BR-${time}-${random}`;
}
