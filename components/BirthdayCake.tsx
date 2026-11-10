"use client";

import React from "react";
import { motion } from "framer-motion";

interface BirthdayCakeProps {
  isCandleBlown: boolean;
  onBlowCandle: () => void;
}

export default function BirthdayCake({ isCandleBlown, onBlowCandle }: BirthdayCakeProps) {
  return (
    <div
      onClick={onBlowCandle}
      className="relative flex flex-col items-center justify-center cursor-pointer select-none py-4"
    >
      {/* Radiant Glow Behind Cake */}
      <motion.div
        animate={{
          scale: isCandleBlown ? [1, 1.2, 1] : [1, 1.1, 1],
          opacity: isCandleBlown ? 0.4 : [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-pink-500/30 via-gold-400/25 to-purple-600/30 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 w-64 sm:w-72 flex flex-col items-center">
        {/* Candles Container (3 Elegant Candles) */}
        <div className="flex justify-center items-end gap-5 sm:gap-7 mb-0 z-20">
          {[0, 1, 2].map((idx) => {
            const candleHeights = [36, 44, 36];
            return (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Flame */}
                {!isCandleBlown ? (
                  <motion.div
                    animate={{
                      scaleY: [1, 1.25, 0.9, 1.2, 1],
                      scaleX: [1, 0.85, 1.1, 0.9, 1],
                      rotate: [-2, 3, -3, 2, -2],
                    }}
                    transition={{
                      duration: 1.2 + idx * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative -mb-1 flex flex-col items-center"
                  >
                    {/* Outer Glow */}
                    <div className="w-5 h-7 rounded-full bg-gradient-to-t from-gold-500 via-yellow-300 to-amber-100 blur-[2px] shadow-[0_0_15px_rgba(255,200,50,0.8)]" />
                    {/* Inner Core */}
                    <div className="absolute bottom-1 w-2 h-3.5 rounded-full bg-white blur-[0.5px]" />
                  </motion.div>
                ) : (
                  /* Smoke puff when blown */
                  <motion.div
                    initial={{ opacity: 0.9, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -25, scale: 1.8 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="w-4 h-6 rounded-full bg-white/40 blur-sm -mb-1"
                  />
                )}

                {/* Wick */}
                <div className="w-0.5 h-2 bg-neutral-800" />

                {/* Candle Body */}
                <div
                  style={{ height: `${candleHeights[idx]}px` }}
                  className="w-3 rounded-t-sm bg-gradient-to-r from-pink-200 via-white to-pink-300 shadow-sm border border-pink-200/50 relative overflow-hidden"
                >
                  {/* Gold spiral stripe */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#d9b345,#d9b345_2px,transparent_2px,transparent_6px)] opacity-50" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tier 1 (Top Tier - Champagne Cream with Strawberries) */}
        <div className="relative w-36 h-14 rounded-2xl bg-gradient-to-b from-blush-100 via-blush-200 to-pink-300 border border-gold-300/40 shadow-lg flex items-center justify-around px-2 z-15 overflow-hidden">
          {/* Frosted icing drops */}
          <div className="absolute top-0 inset-x-0 h-3 bg-white/90 rounded-b-xl shadow-sm" />
          <div className="relative z-10 w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_rgba(238,87,120,0.8)]" />
          <div className="relative z-10 w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_rgba(238,87,120,0.8)]" />
          <div className="relative z-10 w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_rgba(238,87,120,0.8)]" />
          {/* Golden ribbon line */}
          <div className="absolute bottom-1.5 inset-x-0 h-1 bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400 shadow-sm" />
        </div>

        {/* Tier 2 (Middle Tier - Velvet Rose & Vanilla) */}
        <div className="relative w-48 h-18 -mt-2 rounded-2xl bg-gradient-to-b from-pink-300 via-blush-400 to-pink-500 border border-gold-300/40 shadow-xl flex items-center justify-center z-10 overflow-hidden">
          {/* Icing scalloped pattern */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/95 rounded-b-2xl shadow-sm" />
          <div className="relative z-10 flex gap-4">
            <span className="text-white text-xs tracking-widest font-serif font-semibold drop-shadow">
              ✨ FOR MEGHA ✨
            </span>
          </div>
          {/* Golden accent trim */}
          <div className="absolute bottom-2 inset-x-0 h-1.5 bg-gradient-to-r from-gold-400 via-gold-200 to-gold-500 shadow-md" />
        </div>

        {/* Tier 3 (Bottom Tier - Royal Lavender & Chocolate) */}
        <div className="relative w-60 sm:w-64 h-22 -mt-2 rounded-2xl bg-gradient-to-b from-purple-800 via-lavender-700 to-purple-950 border border-gold-400/50 shadow-2xl flex items-center justify-center z-5 overflow-hidden">
          {/* Decorative gold pearls and icing */}
          <div className="absolute top-0 inset-x-0 h-5 bg-gradient-to-b from-blush-100 to-pink-200 rounded-b-2xl shadow-md" />
          <div className="relative z-10 flex gap-3 text-gold-200">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-xs">🌸</span>
            ))}
          </div>
          {/* Gold bottom ribbon */}
          <div className="absolute bottom-2 inset-x-0 h-2 bg-gradient-to-r from-gold-500 via-gold-200 to-gold-500 shadow-lg" />
        </div>

        {/* Cake Stand / Plate */}
        <div className="relative w-72 sm:w-80 h-6 -mt-2 rounded-full bg-gradient-to-r from-neutral-200 via-white to-neutral-300 border-2 border-gold-300/60 shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex items-center justify-center">
          <div className="w-56 h-1.5 rounded-full bg-gold-400/50" />
        </div>
        <div className="w-32 h-4 rounded-b-xl bg-gradient-to-b from-neutral-300 to-neutral-400 border-x border-b border-gold-300/50 shadow-md" />
      </div>
    </div>
  );
}

