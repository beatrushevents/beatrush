import './globals.css';

export const metadata = {
  title: 'BeatRush Events — Tamil & Malayalam Nightlife in the UK',
  description:
    'BeatRush brings the rhythm, language, and energy of South India to the UK club scene. DJ nights, fusion parties, unforgettable moments in London.',
  openGraph: {
    title: 'BeatRush Events',
    description:
      'Tamil & Malayalam nightlife in the heart of the UK. Where the South comes alive.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
