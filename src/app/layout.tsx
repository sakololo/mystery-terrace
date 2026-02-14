import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import { OnboardingModal } from '@/components/OnboardingModal';
import { LayoutShell } from './LayoutShell';

export const metadata: Metadata = {
  title: 'MYSTERY TERRACE',
  description: '日常のミステリーを語り合う、陽だまりのカフェテラス',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'M.TERRACE',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#a04d13',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@700&family=Kalam:wght@400&family=Newsreader:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LayoutShell>
          {children}
        </LayoutShell>
        <BottomNav />
        <OnboardingModal />
        {/* Paper Texture Overlay */}
        <div className="paper-texture" aria-hidden="true" />
      </body>
    </html>
  );
}
