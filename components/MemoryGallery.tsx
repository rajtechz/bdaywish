"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Heart, Sparkles, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface Memory {
  id: number;
  src: string;
  title: string;
  caption: string;
  tag: string;
  dateTag: string;
}

const MEMORIES: Memory[] = [
  {
    id: 1,
    src: "/images/megha-1.jpg",
    title: "Radiant Smiles",
    caption: "Your infectious laughter brings light into every single room you walk into.",
    tag: "Precious Moments",
    dateTag: "Always Sparkling",
  },
  {
    id: 2,
    src: "/images/megha-2.jpg",
    title: "Pure Joy & Warmth",
    caption: "The bond we share as siblings is something I will cherish for eternity.",
    tag: "Sisterhood",
    dateTag: "Unconditional Love",
  },
  {
    id: 3,
    src: "/images/megha-3.jpg",
    title: "Chasing Beautiful Dreams",
    caption: "Watching you grow, achieve, and shine makes me the proudest brother.",
    tag: "Inspiration",
    dateTag: "Golden Days",
  },
  {
    id: 4,
    src: "/images/megha-4.jpg",
    title: "Celebrations & Cheer",
    caption: "Every celebration is ten times more magical when you are right there smiling.",
    tag: "Festive Vibes",
    dateTag: "Cherished Times",
  },
  {
    id: 5,
    src: "/images/megha-5.jpg",
    title: "Forever My Favorite Sister",
    caption: "No matter how many years fly by, you will always be my sweetest sister.",
    tag: "Everlasting Love",
    dateTag: "Infinite Love",
  },
];

export default function MemoryGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index: number) => {
    setSelectedIdx(index);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % MEMORIES.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + MEMORIES.length) % MEMORIES.length);
    }
  };

  return (
    <section className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-600/10 blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-pink-300/30 text-blush-300 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3"
        >
          <Camera className="w-3.5 h-3.5 text-blush-400" />
          <span>Timeless Memories</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-pink-gradient"
        >
          Beautiful Memories With Megha 📸
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lavender-200/80 text-sm sm:text-base max-w-lg mx-auto mt-3"
        >
          A tribute to our happiest smiles, sweetest moments, and the boundless love we share.
        </motion.p>
      </div>

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {MEMORIES.map((item, index) => {
          const isFailed = failedImages[item.id];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer rounded-3xl p-3.5 glass-card-gold hover:border-gold-300/60 transition-all duration-500 relative flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              {/* Photo Container */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-midnight-900 to-purple-950/70 border border-gold-300/20">
                {!isFailed ? (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  /* Elegant Fallback Art Card if image is yet to be placed */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#2a133d] via-[#1a0a28] to-[#0d0417]">
                    <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-gold-300/40 flex items-center justify-center mb-4 text-gold-300 shadow-inner group-hover:scale-110 transition-transform">
                      <Sparkles className="w-8 h-8 text-gold-300" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-gold-300/80 font-medium mb-1">
                      {item.tag}
                    </span>
                    <h4 className="text-lg font-serif font-semibold text-blush-100 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-lavender-200/70 font-light italic leading-relaxed">
                      &ldquo;{item.caption}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-pink-400 text-xs font-medium">
                      <Heart className="w-3.5 h-3.5 fill-pink-400" />
                      <span>Sister Megha</span>
                    </div>
                  </div>
                )}

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Tag pill */}
                <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full glass-card border-gold-200/30 text-gold-200 text-[11px] font-medium tracking-wider uppercase">
                  {item.tag}
                </div>
              </div>

              {/* Bottom Card Caption */}
              <div className="pt-4 pb-1 px-2">
                <div className="flex items-center justify-between text-xs text-gold-300/70 mb-1">
                  <span>{item.dateTag}</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-blush-400 fill-blush-400" /> Megha
                  </span>
                </div>
                <h3 className="text-base font-serif font-semibold text-blush-100 group-hover:text-gold-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-lavender-200/70 line-clamp-2 mt-1">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full glass-card text-white hover:text-gold-300 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Left */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 p-3 rounded-full glass-card text-white hover:text-gold-300 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Navigation Right */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 p-3 rounded-full glass-card text-white hover:text-gold-300 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden glass-card-gold p-4 sm:p-6"
            >
              <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-midnight-950 flex items-center justify-center">
                {!failedImages[MEMORIES[selectedIdx].id] ? (
                  <Image
                    src={MEMORIES[selectedIdx].src}
                    alt={MEMORIES[selectedIdx].title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#2f1246] via-[#1a0a29] to-[#0c0414] w-full h-full">
                    <Sparkles className="w-16 h-16 text-gold-300 mb-4 animate-spin" style={{ animationDuration: "10s" }} />
                    <h3 className="text-2xl font-serif font-bold text-pink-gradient mb-2">
                      {MEMORIES[selectedIdx].title}
                    </h3>
                    <p className="text-sm sm:text-base text-lavender-100 max-w-md italic">
                      &ldquo;{MEMORIES[selectedIdx].caption}&rdquo;
                    </p>
                    <div className="mt-4 px-4 py-1.5 rounded-full glass-card text-xs text-gold-200">
                      Photo placeholder ready at: {MEMORIES[selectedIdx].src}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs uppercase tracking-widest text-gold-300 font-medium">
                  {MEMORIES[selectedIdx].tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-blush-100 mt-1">
                  {MEMORIES[selectedIdx].title}
                </h3>
                <p className="text-sm text-lavender-200/90 mt-2 max-w-md mx-auto">
                  {MEMORIES[selectedIdx].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

