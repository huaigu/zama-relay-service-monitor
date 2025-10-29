import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zama Status Proxy Service',
  description: 'CORS-enabled proxy for Betterstack status API',
  keywords: ['zama', 'status', 'proxy', 'api', 'cors'],
  authors: [{ name: 'Zama', url: 'https://www.zama.ai' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
