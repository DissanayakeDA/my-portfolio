import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dumindu Dissanayake | Full Stack Developer',
    short_name: 'Dumindu D.',
    description:
      'Portfolio of Dumindu Dissanayake, a Full Stack Developer building modern web applications with React, Next.js, TypeScript, and Java.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#FF6B00',
    categories: ['portfolio', 'technology', 'business'],
    icons: [
      {
        src: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },
    ],
  };
}
