"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Wand2, Star } from "lucide-react";
import BirthdayCake from "./BirthdayCake";
import { soundManager } from "@/lib/soundEffects";
import { triggerRoyalConfetti, triggerFireworks } from "@/lib/confetti";

export default function BirthdayHero() {
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleMakeWish = () => {
    if (wishMade) {
      // Re-spark candles
      setIsCandleBlown(false);
      setWishMade(false);
      soundManager.playCelestialChime();
      return;
    }

    soundManager.playCandleBlow();
    setIsCandleBlown(true);
    setWishMade(true);

    // Multi-stage fireworks & confetti
    triggerRoyalConfetti();
    setTimeout(() => {
      triggerFireworks(3500);
    }, 500);
  };

  return (
    <section
      id="birthday-hero"
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-20 overflow-hidden"
    >
      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-gradient-to-r from-pink-500/20 via-gold-400/20 to-purple-600/20 blur-[130px] pointer-events-none" />

      {/* Floating decorative badges */}
      <div className="flex items-center gap-2 px-5 py-2 rounded-full glass-card border-gold-300/40 text-gold-200 text-xs sm:text-sm font-medium tracking-widest uppercase mb-6 shadow-xl">
        <Star className="w-3.5 h-3.5 text-gold-300 fill-gold-300 animate-spin" style={{ animationDuration: "12s" }} />
        <span>Today Is All About Celebrating You</span>
        <Star className="w-3.5 h-3.5 text-gold-300 fill-gold-300 animate-spin" style={{ animationDuration: "12s" }} />
      </div>

      {/* "HAPPY BIRTHDAY" */}
      <div className="relative">
        <span className="text-xl sm:text-3xl md:text-4xl font-serif font-light tracking-[0.3em] uppercase text-pink-200/90 block mb-1">
          HAPPY BIRTHDAY
        </span>

        {/* "MEGHA" - Huge Gold Gradient Luxury Typography */}
        <h2 className="text-6xl sm:text-8xl md:text-9xl font-serif font-extrabold tracking-tight my-2">
          <span className="text-gold-gradient relative inline-block drop-shadow-[0_10px_40px_rgba(217,179,69,0.5)]">
            MEGHA
            {/* Sparkle icons hugging the name */}
            <motion.span
              animate={{ rotate: 360, scale: [1, 1.25, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -top-3 -right-6 sm:-right-10 text-gold-300 pointer-events-none"
            >
              <Sparkles className="w-6 h-6 sm:w-10 sm:h-10" />
            </motion.span>
          </span>
        </h2>
      </div>

      {/* "To the most wonderful sister in the world ❤️" */}
      <p className="text-base sm:text-2xl font-serif italic text-pink-100/95 max-w-xl mx-auto mt-2 flex items-center justify-center gap-2">
        <span>To the most wonderful sister in the world</span>
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-blush-500 fill-blush-500 inline-block animate-pulse" />
      </p>

      {/* Interactive Birthday Cake Illustration */}
      <div className="mt-8 mb-2">
        <BirthdayCake isCandleBlown={isCandleBlown} onBlowCandle={handleMakeWish} />
      </div>

      {/* "Make a Wish ✨" Button / Confirmation message */}
      <div className="flex flex-col items-center mt-4 z-20">
        <motion.button
          onClick={handleMakeWish}
          whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(238,87,120,0.6)" }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-semibold text-sm sm:text-base tracking-wider transition-all duration-300 flex items-center gap-2.5 shadow-xl border ${
            wishMade
              ? "bg-gradient-to-r from-blush-500 to-purple-600 text-white border-pink-300/40"
              : "bg-gradient-to-r from-gold-400 via-gold-200 to-gold-400 text-midnight-950 border-gold-200 shadow-gold-500/20"
          }`}
        >
          <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{wishMade ? "Relight Candles ✨" : "Make a Wish ✨"}</span>
        </motion.button>

        {/* Animated Wish Banner Revelation */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="mt-6 px-6 py-3.5 rounded-2xl glass-card-gold max-w-md mx-auto flex items-center gap-3 text-gold-100 shadow-2xl"
            >
              <Sparkles className="w-6 h-6 text-gold-300 shrink-0 animate-spin" style={{ animationDuration: "6s" }} />
              <p className="text-sm sm:text-base font-serif italic text-gold-100 text-center">
                ✨ &ldquo;May all your dreams come true, Megha!&rdquo; ✨
              </p>
              <Sparkles className="w-6 h-6 text-gold-300 shrink-0 animate-spin" style={{ animationDuration: "6s" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
