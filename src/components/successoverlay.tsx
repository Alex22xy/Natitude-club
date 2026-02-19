"use client";
import { motion } from 'framer-motion';

export default function SuccessOverlay({ message, onClose }: { message: string, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-6 text-center"
    >
      <div className="space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 border border-natitude-pink rounded-full mx-auto flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-natitude-pink rounded-full animate-ping" />
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold uppercase tracking-[0.5em]">Transmission Received</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">{message}</p>
        </div>

        <button 
          onClick={onClose}
          className="mt-12 text-[10px] text-white uppercase tracking-[0.4em] border-b border-white/20 pb-2 hover:border-natitude-pink transition-colors"
        >
          Return to the Wild
        </button>
      </div>
    </motion.div>
  );
}