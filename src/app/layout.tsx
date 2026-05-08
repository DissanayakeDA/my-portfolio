import type { Metadata } from 'next';
import { Inter, Syncopate } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from "@/components/CustomCursor";

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

const siteUrl = 'https://dumindu.me';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dumindu Dissanayake | Full Stack Developer',
    template: '%s | Dumindu Dissanayake',
  },
  description: 'Dumindu Dissanayake is a Full Stack Developer at HashBaze, specializing in React, Next.js, TypeScript, Java, and cloud technologies. Building modern, high-performance web applications.',
  keywords: [
    'Dumindu',
    'Dumindu Dissanayake',
    'Full Stack Developer',
    'HashBaze',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Java Developer',
    'Web Developer',
    'Software Engineer',
    'Sri Lanka',
  ],
  authors: [{ name: 'Dumindu Dissanayake', url: siteUrl }],
  creator: 'Dumindu Dissanayake',
  publisher: 'Dumindu Dissanayake',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Dumindu Dissanayake | Full Stack Developer',
    description: 'Dumindu Dissanayake is a Full Stack Developer at HashBaze, building modern web applications with React, Next.js, TypeScript, and Java.',
    siteName: 'Dumindu Dissanayake',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dumindu Dissanayake | Full Stack Developer',
    description: 'Full Stack Developer at HashBaze. Building modern web applications with React, Next.js, TypeScript, and Java.',
  },
  icons: {
    icon: '/icon.svg',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dumindu Dissanayake',
  givenName: 'Dumindu',
  familyName: 'Dissanayake',
  jobTitle: 'Full Stack Developer',
  url: siteUrl,
  email: 'dumindudissanayake2k01@gmail.com',
  worksFor: {
    '@type': 'Organization',
    name: 'HashBaze',
  },
  knowsAbout: [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Java',
    'Python', 'Docker', 'AWS', 'Azure', 'Angular', '.NET',
    'Full Stack Development', 'Web Development',
  ],
  sameAs: [
    'https://github.com/DissanayakeDA',
    'https://www.linkedin.com/in/dumindu-dissanayake-24168b31a/',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syncopate.variable}`}>
      <body className="antialiased bg-background text-foreground selection:bg-primary selection:text-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

