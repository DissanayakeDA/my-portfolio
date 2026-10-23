import type { Metadata, Viewport } from 'next';
import { Archivo, Geist_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from "@/components/CustomCursor";
import Preloader from '@/components/Preloader';
import MotionPauseProvider from '@/components/MotionPause';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const siteUrl = 'https://dumindu.me';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dumindu Dissanayake | Full Stack Developer',
    template: '%s | Dumindu Dissanayake',
  },
  description: 'Dumindu Dissanayake is a Full Stack Developer at HashBaze in Colombo, Sri Lanka, specializing in React, Next.js, TypeScript, Java and cloud. See selected work, skills and experience.',
  applicationName: 'Dumindu Dissanayake Portfolio',
  category: 'technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    'Colombo',
    'Full Stack Developer Sri Lanka',
    'Next.js Developer Sri Lanka',
    'OnlinePhysics.lk',
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
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / NEXT_PUBLIC_BING_SITE_VERIFICATION to verify ownership
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: '#111010',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const personId = `${siteUrl}/#person`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Dumindu Dissanayake',
      givenName: 'Dumindu',
      familyName: 'Dissanayake',
      jobTitle: 'Full Stack Developer',
      description:
        'Full Stack Developer at HashBaze building modern web applications with React, Next.js, TypeScript, and Java.',
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      email: 'dumindudissanayake2k01@gmail.com',
      nationality: 'Sri Lankan',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Colombo',
        addressCountry: 'LK',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'HashBaze',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Sri Lanka Institute of Information Technology (SLIIT)',
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
      workExample: [
        {
          '@type': 'WebSite',
          name: 'OnlinePhysics.lk',
          url: 'https://onlinephysics.lk',
          description:
            'Online physics learning platform for Sri Lankan students with interactive lessons and practice problems.',
          creator: { '@id': personId },
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Dumindu Dissanayake | Full Stack Developer',
      description:
        'Portfolio of Dumindu Dissanayake, a Full Stack Developer at HashBaze.',
      inLanguage: 'en',
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: 'Dumindu Dissanayake | Full Stack Developer',
      isPartOf: { '@id': `${siteUrl}/#website` },
      // Google's ProfilePage rich result requires mainEntity
      mainEntity: { '@id': personId },
      about: { '@id': personId },
      dateModified: new Date().toISOString(),
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <SmoothScroll>
          <Preloader>
            <MotionPauseProvider>{children}</MotionPauseProvider>
          </Preloader>
        </SmoothScroll>
      </body>
    </html>
  );
}

