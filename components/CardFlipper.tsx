"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, RotateCw } from "lucide-react";
import { soundManager } from "@/lib/soundEffects";

export default function CardFlipper() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    soundManager.playCelestialChime();
    if (!soundManager.isPlayingMusic()) {
      soundManager.startBackgroundMusic();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto py-4 select-none perspective-1000">
      <div
        onClick={handleFlip}
        className={`relative w-full min-h-[380px] sm:min-h-[420px] rounded-3xl transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE (Envelope / Sealed Letter) */}
        <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 glass-card-pastel border-2 border-pink-200/80 shadow-xl flex flex-col items-center justify-between backface-hidden bg-gradient-to-br from-white/90 via-pink-50/80 to-rose-100/70">
          {/* Header Stamp */}
          <div className="w-full flex items-center justify-between text-xs text-pink-500 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Special Delivery</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-[10px]">
              Tap to Flip 💌
            </span>
          </div>

          {/* Center Envelope Illustration */}
          <div className="my-auto flex flex-col items-center text-center">
            {/* Wax Seal Circle */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-600 shadow-lg shadow-pink-400/40 border-4 border-white flex items-center justify-center text-white mb-4 relative"
            >
              <span className="font-serif text-2xl sm:text-3xl font-black tracking-widest">
                A
              </span>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-amber-900 flex items-center justify-center text-xs shadow">
                ✨
              </div>
            </motion.div>

            <span className="text-xs uppercase tracking-widest text-pink-600/80 font-semibold mb-1">
              To My Partner in Crime
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-magenta-gradient mb-2">
              For Allen ❤️
            </h3>

            <p className="text-xs sm:text-sm text-pink-900/70 max-w-xs font-serif italic">
              A little letter filled with big love and zero boring words.
            </p>
          </div>

          {/* Footer instruction */}
          <div className="flex items-center gap-2 text-xs text-pink-600 font-medium">
            <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "10s" }} />
            <span>Click to flip open &amp; read</span>
          </div>
        </div>

        {/* BACK SIDE (The Heartfelt Letter to Allen) */}
        <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 glass-card-pastel border-2 border-pink-200/80 shadow-2xl flex flex-col justify-between backface-hidden rotate-y-180 bg-gradient-to-br from-white/95 via-pink-50/90 to-rose-50/90 text-left">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-pink-200/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">💌</span>
              <div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-pink-800">
                  Dear Allen,
                </h4>
                <span className="text-[10px] text-pink-500/80 tracking-wider uppercase block">
                  My Best . My Favourite Idiot. 😂
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFlip();
              }}
              className="text-[11px] text-pink-600 hover:text-pink-800 bg-pink-100 px-2.5 py-1 rounded-full font-medium"
            >
              Flip Back ↩
            </button>
          </div>

          {/* Letter Body */}
          <div className="space-y-3 font-serif text-pink-950/85 text-xs sm:text-sm leading-relaxed my-auto pt-2">
            <p>
              First of all, you are not just a  — you are <span className="font-bold text-pink-700">my absolute best </span>, my unpaid therapist, and my favourite human to laugh with until our stomachs hurt.
            </p>
            <p>
              Thank you for understanding my weird humor, supporting my chaotic plans, and always having my back through thick and thin.
            </p>
            <p className="italic font-medium text-pink-800">
              In just 3 days (13 November 2026), it&apos;s officially your time to shine! Get ready for an epic year ahead. ✨
            </p>
          </div>

          {/* Signoff */}
          <div className="border-t border-pink-200/60 pt-3 flex items-center justify-between">
            <span className="text-xs font-serif italic text-pink-700">Forever &amp; Always,</span>
            <span className="text-sm font-serif font-bold text-magenta-gradient">
              Your Best  ❤️
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
