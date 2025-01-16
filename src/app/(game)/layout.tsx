import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Providers } from '@/providers/providers';
import clsx from 'clsx';
import { ermilovFont, genFont, titleFont } from '@/config/fonts';

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
          'max-h-screen overflow-y-hidden font-sans antialiased light',
          'bg-primaryGame',
          'text-white',
          genFont.variable,
          titleFont.variable,
          ermilovFont.variable,
        )}
      >
        <Providers>
          <main className="h-screen w-full pl-[24%]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
