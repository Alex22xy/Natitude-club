"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (data) setImages(data);
    };
    fetchGallery();
  }, []);

  const featured = images.filter(img => img.is_featured);

  // Auto-scroll for Carousel
  useEffect(() => {
    if (featured.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featured.length]);

  return (
    <main className="min-h-screen bg-black text-white pb-40">
      
      {/* 1. FEATURED CAROUSEL */}
      {featured.length > 0 && (
        <section className="relative h-[60vh] w-full overflow-hidden bg-zinc-900">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={featured[currentIndex].url}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-[0.6em] text-white/90 drop-shadow-2xl">
              Visions
            </h1>
          </div>
          {/* Progress Dots */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20">
            {featured.map((_, i) => (
              <div key={i} className={`h-[2px] transition-all duration-500 ${i === currentIndex ? 'w-8 bg-natitude-pink' : 'w-4 bg-white/20'}`} />
            ))}
          </div>
        </section>
      )}

      {/* 2. RESPONSIVE MASONRY GRID */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img) => (
            <motion.div 
              key={img.id}
              layoutId={img.id.toString()}
              onClick={() => setSelectedImg(img.url)}
              className="relative cursor-pointer overflow-hidden border border-white/5 bg-zinc-900 group"
              whileHover={{ scale: 0.98 }}
            >
              <img 
                src={img.url} 
                alt={img.caption} 
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[8px] uppercase tracking-widest">{img.caption || 'The Wild'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img 
              src={selectedImg} 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}