"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift } from "lucide-react";
import GiftBox from "./GiftBox";
import { soundManager } from "@/lib/soundEffects";
import { triggerRoyalConfetti, triggerHeartConfetti } from "@/lib/confetti";

interface BirthdayIntroProps {
  onReveal: () => void;
}

export default function BirthdayIntro({ onReveal }: BirthdayIntroProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSurprise = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio fanfare & chimes
    soundManager.playGiftFanfare();
    soundManager.startBackgroundMusic();

    // Celebration confetti
    triggerRoyalConfetti();
    setTimeout(() => {
      triggerHeartConfetti();
    }, 400);

    // Zoom transition into the main celebration
    setTimeout(() => {
      onReveal();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.25,
          filter: "blur(12px)",
          transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between min-h-screen px-4 py-8 overflow-hidden bg-gradient-to-b from-[#120726] via-[#1e0b36] to-[#07030b]"
      >
        {/* Ambient atmospheric glowing orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-pink-600/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-lavender-600/25 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-500/15 blur-[140px] pointer-events-none" />

        {/* Top Header Badge */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative z-10 flex items-center gap-2 px-5 py-2 mt-4 rounded-full glass-card border-gold-300/30 text-gold-200 text-xs sm:text-sm font-medium tracking-widest uppercase shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-gold-300 animate-spin" style={{ animationDuration: "8s" }} />
          <span>A Precious Digital Gift</span>
          <Heart className="w-4 h-4 text-blush-400 fill-blush-400 animate-pulse" />
        </motion.div>

        {/* Center Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto my-auto">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-pink-200/90 font-light text-base sm:text-lg tracking-wide mb-2 flex items-center gap-2 justify-center"
          >
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span>Something Special Is Waiting For You...</span>
            <Sparkles className="w-4 h-4 text-gold-300" />
          </motion.p>

          {/* Hey Megha ❤️ */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight mb-2"
          >
            <span className="text-pink-gradient drop-shadow-md">Hey Megha </span>
            <span className="inline-block text-blush-500 drop-shadow-[0_0_15px_rgba(238,87,120,0.8)] animate-pulse">
              ❤️
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lavender-200/80 text-sm sm:text-base max-w-xs sm:max-w-md mx-auto mb-4"
          >
            A heartfelt surprise crafted with all my love to celebrate the most extraordinary sister today!
          </motion.p>

          {/* Animated 3D Gift Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <GiftBox isOpen={isOpening} onOpen={handleOpenSurprise} />
          </motion.div>

          {/* Primary Action Button: "OPEN YOUR SURPRISE 🎁" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-6"
          >
            <motion.button
              onClick={handleOpenSurprise}
              disabled={isOpening}
              whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(217,179,69,0.7)" }}
              whileTap={{ scale: 0.96 }}
              className="relative group px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg tracking-wider uppercase text-midnight-950 bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 shadow-[0_10px_35px_rgba(217,179,69,0.45)] border border-gold-100 flex items-center gap-3 overflow-hidden transition-all duration-300"
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Gift className="w-5 h-5 text-midnight-950" />
              <span>OPEN YOUR SURPRISE 🎁</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom subtle note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="relative z-10 text-xs text-lavender-300/60 text-center tracking-widest uppercase flex items-center gap-2"
        >
          <span>Turn on sound for the magical experience</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
