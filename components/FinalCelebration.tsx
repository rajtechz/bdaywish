"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, PartyPopper, RotateCcw } from "lucide-react";
import { soundManager } from "@/lib/soundEffects";
import { triggerRoyalConfetti, triggerFireworks, triggerHeartConfetti } from "@/lib/confetti";

export default function FinalCelebration() {
  const [celebrationCount, setCelebrationCount] = useState(0);

  const handleCelebrateAgain = () => {
    setCelebrationCount((prev) => prev + 1);
    soundManager.playGiftFanfare();
    soundManager.playFireworkPop();

    triggerRoyalConfetti();
    setTimeout(() => {
      triggerHeartConfetti();
    }, 400);
    setTimeout(() => {
      triggerFireworks(4500);
    }, 800);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden">
      {/* Radiant Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] rounded-full bg-gradient-to-tr from-pink-600/25 via-gold-400/20 to-purple-700/25 blur-[150px] pointer-events-none" />

      {/* Floating Animated Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: "110%",
              x: `${(i * 9) % 100}%`,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              y: "-10%",
              opacity: [0, 0.7, 0.8, 0],
              scale: [0.5, 1.2, 0.9],
            }}
            transition={{
              duration: 8 + (i % 5) * 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "linear",
            }}
            className="absolute text-pink-400/40"
          >
            <Heart className="w-6 h-6 fill-pink-400/30" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* "ONCE AGAIN..." */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border-gold-300/40 text-gold-200 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
          <span>ONCE AGAIN...</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
        </div>

        {/* "HAPPY BIRTHDAY MEGHA! ❤️" */}
        <h2 className="text-4xl sm:text-7xl md:text-8xl font-serif font-black tracking-tight my-2">
          <span className="text-gold-gradient drop-shadow-[0_10px_40px_rgba(217,179,69,0.5)] block">
            HAPPY BIRTHDAY
          </span>
          <span className="text-pink-gradient drop-shadow-[0_10px_40px_rgba(238,87,120,0.5)] block mt-1">
            MEGHA! ❤️
          </span>
        </h2>

        {/* Final Message */}
        <p className="text-base sm:text-2xl font-serif italic text-blush-100/95 max-w-2xl mx-auto mt-6 leading-relaxed">
          &ldquo;Keep smiling, keep shining. You deserve all the happiness in this world!&rdquo;
        </p>

        {/* Celebrate Again Button */}
        <div className="mt-10">
          <motion.button
            onClick={handleCelebrateAgain}
            whileHover={{ scale: 1.08, boxShadow: "0 0 45px rgba(217,179,69,0.7)" }}
            whileTap={{ scale: 0.94 }}
            className="group px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg tracking-wider uppercase text-midnight-950 bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 shadow-[0_15px_40px_rgba(217,179,69,0.4)] border border-gold-100 flex items-center gap-3 overflow-hidden transition-all duration-300"
          >
            <PartyPopper className="w-6 h-6 text-midnight-950 group-hover:rotate-12 transition-transform" />
            <span>CELEBRATE AGAIN 🎉</span>
          </motion.button>
        </div>

        {celebrationCount > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gold-300/80 mt-4 tracking-wider uppercase"
          >
            Celebrated {celebrationCount} {celebrationCount === 1 ? "time" : "times"} with joy! ✨
          </motion.p>
        )}

        {/* Footer Credit & Love */}
        <div className="mt-20 pt-8 border-t border-white/10 w-full max-w-md mx-auto text-xs text-lavender-300/50 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span>Crafted with boundless love by your brother for Megha</span>
            <Heart className="w-3.5 h-3.5 text-blush-400 fill-blush-400" />
          </div>
          <span>Happy Birthday Megha • An Unforgettable Celebration</span>
        </div>
      </div>
    </section>
  );
}

