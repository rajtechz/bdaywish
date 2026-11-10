"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, MailOpen, Feather } from "lucide-react";

export default function BirthdayMessage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="relative py-20 px-4 max-w-4xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-gradient-to-r from-pink-500/10 via-gold-400/15 to-purple-600/10 blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-gold-300/30 text-gold-200 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3"
        >
          <Feather className="w-3.5 h-3.5 text-gold-300" />
          <span>Personal Letter</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-pink-gradient"
        >
          A Little Message From My Heart ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lavender-200/80 text-sm sm:text-base max-w-md mx-auto mt-2"
        >
          Words that come straight from the soul, sealed with infinite love for you.
        </motion.p>
      </div>

      {/* Handwritten Letter Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto rounded-3xl p-6 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.6)] border border-gold-300/40 overflow-hidden bg-gradient-to-b from-[#1b0b2b]/95 via-[#160722]/95 to-[#0e0417]/95 backdrop-blur-2xl"
      >
        {/* Subtle parchment watermark / corner ornaments */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold-300/30 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold-300/30 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold-300/30 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold-300/30 rounded-br-xl pointer-events-none" />

        {/* Wax Seal Stamp (Top Right) */}
        <div className="absolute top-6 right-6 sm:top-10 sm:right-10 flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-red-950 border-2 border-gold-300/80 shadow-[0_4px_20px_rgba(220,38,38,0.5)] flex items-center justify-center rotate-[-12deg]">
            <span className="font-serif text-gold-200 text-lg sm:text-xl font-black tracking-widest drop-shadow">
              M
            </span>
          </div>
          <span className="text-[10px] text-gold-300/70 tracking-widest uppercase mt-1">SEALED</span>
        </div>

        {/* Salutation */}
        <div className="mb-6">
          <span className="font-serif italic text-2xl sm:text-3xl text-gold-200 block">
            Dear Megha,
          </span>
          <span className="text-blush-300/80 text-xs sm:text-sm tracking-wider uppercase">
            Today is all about you!
          </span>
        </div>

        {/* Message Paragraphs */}
        <div className="space-y-5 text-blush-100/90 font-serif leading-relaxed text-base sm:text-xl text-justify sm:text-left">
          <p>
            You are not just my sister, you are one of the most precious blessings in my life.
          </p>

          <p>
            Your smile makes everything brighter, your happiness means more than words can express, and I wish that life always gives you countless reasons to smile.
          </p>

          <p>
            May your journey be filled with love, happiness, success, good health, beautiful memories, and dreams that come true.
          </p>

          <p>
            No matter how much time passes, you will always hold a special place in my heart.
          </p>

          <p>
            Keep smiling, keep shining, and never stop being the wonderful person you are.
          </p>
        </div>

        {/* Climax Sign-off */}
        <div className="mt-8 pt-6 border-t border-gold-300/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-gold-gradient">
              Happy Birthday, Megha! ❤️
            </h3>
            <p className="text-xs text-lavender-200/70 tracking-wide mt-1">
              May every year ahead shine brighter than the last.
            </p>
          </div>

          <div className="text-right sm:text-right font-serif">
            <span className="text-sm italic text-blush-200 block">With lots of love,</span>
            <span className="text-xl sm:text-2xl font-bold text-pink-300 block mt-0.5">
              Your Brother
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
