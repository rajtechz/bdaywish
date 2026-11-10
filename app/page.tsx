"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import BirthdayIntro from "@/components/BirthdayIntro";
import BirthdayHero from "@/components/BirthdayHero";
import MemoryGallery from "@/components/MemoryGallery";
import BirthdayMessage from "@/components/BirthdayMessage";
import BirthdayWishes from "@/components/BirthdayWishes";
import FinalCelebration from "@/components/FinalCelebration";
import MusicToggle from "@/components/MusicToggle";
import { Sparkles, RotateCcw } from "lucide-react";
import { soundManager } from "@/lib/soundEffects";

export default function BirthdayPage() {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    // Scroll smoothly to top on reveal
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReplayIntro = () => {
    setIsRevealed(false);
    soundManager.stopBackgroundMusic();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-midnight-950 text-blush-50 overflow-x-hidden">
      {/* Universal Floating Magical Particles & Rose Petals */}
      <ParticleBackground />

      {/* Floating Ambient Glow Light Gradients */}
      <div className="fixed top-0 left-1/4 w-[35rem] h-[35rem] rounded-full bg-pink-600/10 blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[35rem] h-[35rem] rounded-full bg-purple-700/10 blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-gold-500/5 blur-[180px] pointer-events-none z-0" />

      {/* Persistent Audio Toggle */}
      {isRevealed && <MusicToggle />}

      {/* Replay Intro Floating Button (Bottom Left) */}
      {isRevealed && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleReplayIntro}
          title="Replay Surprise Opening"
          className="fixed bottom-5 left-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full glass-card border-gold-300/30 text-gold-300 text-xs font-medium hover:border-gold-300 transition-all shadow-xl"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Replay Opening</span>
        </motion.button>
      )}

      {/* Scene 1: The Magical Opening Screen */}
      <AnimatePresence mode="wait">
        {!isRevealed && (
          <BirthdayIntro key="intro" onReveal={handleReveal} />
        )}
      </AnimatePresence>

      {/* Main Celebration Experience (Revealed after Gift Box opens) */}
      {isRevealed && (
        <motion.div
          key="celebration"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full"
        >
          {/* Section 1: Hero with Cake & Candle Interaction */}
          <BirthdayHero />

          {/* Section 2: Dedicated Photo Memory Gallery */}
          <MemoryGallery />

          {/* Section 3: Heartfelt Sister Birthday Letter */}
          <BirthdayMessage />

          {/* Section 4: Floating Animated Wishes */}
          <BirthdayWishes />

          {/* Section 5: Grand Finale Celebration with Fireworks & Confetti */}
          <FinalCelebration />
        </motion.div>
      )}
    </main>
  );
}
