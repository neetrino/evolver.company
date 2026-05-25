import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { siteConfig } from '@/config/site';
import { Navbar } from '@/shared/components/layout/navbar';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: '/images/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/images/logo-mark.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0a0b10] text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
