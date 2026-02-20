import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: 'NATITUDE | Underground Jungle Culture',
    template: '%s | NATITUDE'
  },
  description: 'A sanctuary for the rhythmically possessed. London\'s premier destination for underground jungle and bass culture.',
  metadataBase: new URL('https://natitude-club.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NATITUDE | Underground Jungle Culture',
    description: 'Home of the ritual. Lost in the smoke, found in the bass.',
    url: 'https://natitude-club.vercel.app',
    siteName: 'NATITUDE',
    images: [
      {
        url: '/og-image.jpg', // Ensure this file is in your /public folder
        width: 1200,
        height: 630,
        alt: 'NATITUDE Sanctuary',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NATITUDE | Jungle Culture',
    description: 'Underground Jungle Culture in the heart of London.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NightClub',
    name: 'NATITUDE',
    image: 'https://natitude-club.vercel.app/og-image.jpg',
    description: 'Underground Jungle and Bass Culture Sanctuary.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
  };

  return (
    <html lang="en" className={`bg-black scroll-smooth ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden text-white selection:bg-natitude-pink selection:text-black`}>
        
        {/* The Noise Overlay - Texture Layer */}
        <div 
          className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" 
          aria-hidden="true"
        />
        
        {/* Background Ambient Depth */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a0a0a_0%,#000000_100%)] -z-10" />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Viewport */}
        <main className="relative z-10 min-h-screen">
          {children}
        </main>

        {/* Sentry or Analytics can be initialized here */}
      </body>
    </html>
  );
}