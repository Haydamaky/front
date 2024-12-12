import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';
import clsx from 'clsx';
import { Navbar } from '@/components/navbar';

const titleFont = localFont({
  src: '../../public/fonts/queen_of_melbourne.ttf',
  variable: '--font-titleFont',
  weight: '100 900',
});
const genFont = localFont({
  src: '../../public/fonts/FixelDisplay-Regular.ttf',
  variable: '--font-genFont',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: 'white' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          'min-h-screen font-sans antialiased light',
          genFont.variable,
          titleFont.variable,
        )}
      >
        <Providers>
          <div className="relative flex h-screen flex-col">
            <Navbar />
            <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">
              {children}
            </main>
            <footer className="flex w-full items-center justify-center py-3">
              <p className="text-black">Test</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
