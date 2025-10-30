import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zama Service Status Monitor - Demo',
  description: 'Live demo of zama-service-status-monitor package',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
