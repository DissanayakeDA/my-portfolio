import type { Metadata } from 'next';
import { Inter, Syncopate } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syncopate = Syncopate({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-syncopate',
  display: 'swap',
});

import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: 'Dumindu Dissanayake',
  description: 'Full Stack Developer building the future at HashBaze.',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syncopate.variable}`}>
      <body className="antialiased bg-background text-foreground selection:bg-primary selection:text-black">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

