import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'A Romantic Surprise for Lovely ❤️ | Perfect Presents',
  description: 'An interactive romantic journey with memories, puzzles, love letters, and a customized keepsake.',
  keywords: ['romantic gift', 'anniversary surprise', 'interactive love letter', 'monogram necklace'],
  authors: [{ name: 'Rarz' }],
  openGraph: {
    title: 'A Special Surprise for You ❤️',
    description: 'I have a special surprise for you, lovely! Unlock our memories.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#fce4ec',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fce4ec] text-slate-800 antialiased selection:bg-[#f48fb1] selection:text-white">
        {children}
      </body>
    </html>
  );
}
