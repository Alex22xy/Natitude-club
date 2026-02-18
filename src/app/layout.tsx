import './globals.css';
import Navbar from '@/components/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black scroll-smooth">
      <body className="antialiased overflow-x-hidden selection:bg-natitude-pink selection:text-black">
        {/* Children contains the main tag from page.tsx */}
        {children}
        <Navbar />
      </body>
    </html>
  );
}