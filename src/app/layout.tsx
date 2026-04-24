'use client'; // Add this at the very top

import { useEffect } from 'react';
import Lenis from 'lenis';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <html lang="en">
      <body className="antialiased cursor-none">
      
        {children}
      </body>
    </html>
  );
}