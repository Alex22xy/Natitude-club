import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';

// Using Inter for a clean, modern, readable aesthetic
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'NATITUDE | Underground Jungle Culture',
  description: 'A sanctuary for the rhythmically possessed. Home of underground jungle culture in the heart of London.',
  metadataBase: new URL('https://natitude-club.vercel.app'), // Replace with your final domain
  openGraph: {
    title: 'NATITUDE | Underground Jungle Culture',
    description: 'Home of the ritual. Lost in the smoke, found in the bass.',
    url: '/',
    siteName: 'NATITUDE',
    images: [
      {
        url: '/og-image.jpg', // Place an image (1200x630) in your public folder
        width: 1200,
        height: 630,
        alt: 'NATITUDE Branding',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NATITUDE',
    description: 'Underground Jungle Culture',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`bg-black scroll-smooth ${inter.variable}`}>
      <body className={`${inter.className} antialiased overflow-x-hidden text-white selection:bg-natitude-pink selection:text-black`}>
        
        {/* Subtle Background Texture - CSS Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        
        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Floating Navbar */}
        <Navbar />

        {/* Global Loading Bar or Analytics can go here */}
      </body>
    </html>
  );
}