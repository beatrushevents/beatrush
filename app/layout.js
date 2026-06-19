import './globals.css';

export const metadata = {
  title: 'BeatRush Events',
  description: 'Tamil and Malayalam nightlife events in London',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
