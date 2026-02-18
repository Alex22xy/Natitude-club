"use client";

import Link from 'next/link';
import { motion } from 'framer-motion'; // If you have framer-motion installed

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans">
      {/* Animated Wrapper */}
      <div className="w-full max-w-md text-center space-y-8">
        
        {/* Logo / Icon Area */}
        <div className="flex justify-center">
          <div className="w-24 h-24 border-2 border-natitude-pink flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(255,0,255,0.3)]">
            <span className="text-white text-4xl">✓</span>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-white text-3xl font-bold uppercase tracking-[0.5em]">
            Payment Received
          </h1>
          <div className="h-[1px] w-20 bg-natitude-pink mx-auto"></div>
          <p className="text-zinc-400 text-sm tracking-widest uppercase leading-relaxed">
            Welcome to the Jungle.<br />
            Your unique entry code has been generated.
          </p>
        </div>

        {/* Instructions Note */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-sm">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
            Note: Your ticket is linked to your email address. Please have your email or code ready at the door for scanning.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            href="/"
            className="inline-block w-full py-4 border border-white/20 text-white text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Background Decor */}
      <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-natitude-pink/5 to-transparent -z-10 pointer-events-none" />
    </div>
  );
}