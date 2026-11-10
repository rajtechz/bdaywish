"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Gift, ChevronDown } from "lucide-react";
import GiftBox from "./GiftBox";
import { soundManager } from "@/lib/soundEffects";
import { triggerRoyalConfetti, triggerHeartConfetti, triggerFireworks } from "@/lib/confetti";

interface BirthdayIntroProps {
  onSurpriseOpened?: () => void;
}

export default function BirthdayIntro({ onSurpriseOpened }: BirthdayIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpenSurprise = () => {
    if (isOpen) {
      // Re-trigger celebration fanfare
      soundManager.playGiftFanfare();
      triggerRoyalConfetti();
      return;
    }

    setIsOpen(true);
    setHasOpened(true);

    // Audio fanfare & start background chimes
    soundManager.playGiftFanfare();
    soundManager.startBackgroundMusic();

    // Multi-stage celebration fireworks & confetti
    triggerRoyalConfetti();
    setTimeout(() => {
      triggerHeartConfetti();
    }, 350);
    setTimeout(() => {
      triggerFireworks(3500);
    }, 700);

    onSurpriseOpened?.();

    // Smoothly scroll to the celebration hero section
    setTimeout(() => {
      const heroSection = document.getElementById("birthday-hero");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 1100);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between px-4 pt-10 pb-16 overflow-hidden">
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center gap-2 px-5 py-2 rounded-full glass-card border-gold-300/30 text-gold-200 text-xs sm:text-sm font-medium tracking-widest uppercase shadow-lg"
      >
        <Sparkles className="w-4 h-4 text-gold-300 animate-spin" style={{ animationDuration: "8s" }} />
        <span>A Precious Birthday Gift For You</span>
        <Heart className="w-4 h-4 text-blush-400 fill-blush-400 animate-pulse" />
      </motion.div>

      {/* Center Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto my-auto py-6">
        {/* Subtitle */}
        <p className="text-pink-200/90 font-light text-base sm:text-lg tracking-wide mb-2 flex items-center gap-2 justify-center">
          <Sparkles className="w-4 h-4 text-gold-300" />
          <span>Something Special Is Waiting For You...</span>
          <Sparkles className="w-4 h-4 text-gold-300" />
        </p>

        {/* Hey Megha ❤️ */}
        <h1 className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight mb-2">
          <span className="text-pink-gradient drop-shadow-md">Hey Megha </span>
          <span className="inline-block text-blush-500 drop-shadow-[0_0_15px_rgba(238,87,120,0.8)] animate-pulse">
            ❤️
          </span>
        </h1>

        <p className="text-lavender-200/80 text-sm sm:text-base max-w-xs sm:max-w-md mx-auto mb-4">
          A magical surprise created with boundless love to celebrate the most amazing sister in the world!
        </p>

        {/* Animated 3D Gift Box */}
        <div className="my-2">
          <GiftBox isOpen={isOpen} onOpen={handleOpenSurprise} />
        </div>

        {/* Primary Action Button: "OPEN YOUR SURPRISE 🎁" */}
        <div className="mt-4">
          <motion.button
            onClick={handleOpenSurprise}
            whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(217,179,69,0.7)" }}
            whileTap={{ scale: 0.96 }}
            className="relative group px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg tracking-wider uppercase text-midnight-950 bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 shadow-[0_10px_35px_rgba(217,179,69,0.45)] border border-gold-100 flex items-center gap-3 overflow-hidden transition-all duration-300"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <Gift className="w-5 h-5 text-midnight-950" />
            <span>{hasOpened ? "CELEBRATE AGAIN 🎁" : "OPEN YOUR SURPRISE 🎁"}</span>
          </motion.button>
        </div>

        {hasOpened && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gold-300 font-medium mt-4 tracking-wider uppercase flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Surprise Unlocked! Scroll down to celebrate ✨</span>
          </motion.p>
        )}
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        onClick={() => {
          const hero = document.getElementById("birthday-hero");
          if (hero) hero.scrollIntoView({ behavior: "smooth" });
        }}
        className="relative z-10 flex flex-col items-center cursor-pointer text-xs text-lavender-300/70 hover:text-gold-200 transition-colors tracking-widest uppercase gap-1"
      >
        <span>Explore Your Birthday Gift</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold-300" />
      </div>
    </section>
  );
}
