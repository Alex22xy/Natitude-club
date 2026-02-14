import './globals.css';
import Navbar from '@/components/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className="antialiased">
        <main className="pb-32"> 
          {children}
        </main>
        {/* We just place the component here once */}
        <Navbar />
      </body>
    </html>
  );
}