"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { soundManager } from "@/lib/soundEffects";
import { triggerRoyalConfetti, triggerHeartConfetti, triggerFireworks } from "@/lib/confetti";

interface CinematicCurtainsProps {
  isTransitioning?: boolean;
  onCurtainOpen?: () => void;
}

export default function CinematicCurtains({
  isTransitioning = false,
  onCurtainOpen,
}: CinematicCurtainsProps) {
  const [hasStarted, setHasStarted] = useState(false);

  // Prevent background scrolling while initial curtains are closed
  useEffect(() => {
    if (!hasStarted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [hasStarted]);

  const handleOpenInitialCurtains = () => {
    if (hasStarted) return;
    setHasStarted(true);

    soundManager.playGiftFanfare();
    soundManager.startBackgroundMusic();

    triggerRoyalConfetti();
    setTimeout(() => triggerHeartConfetti(), 350);
    setTimeout(() => triggerFireworks(3000), 700);

    onCurtainOpen?.();
  };

  const isCurtainClosed = !hasStarted || isTransitioning;

  return (
    <div
      className={`fixed inset-0 z-50 select-none overflow-hidden transition-all duration-300 ${
        hasStarted && !isTransitioning ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {/* Golden Light Burst Beam on split */}
      <AnimatePresence>
        {!isCurtainClosed && (
          <motion.div
            key="light-burst"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 0.9, 0], scaleY: [0, 1.8, 3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 bg-gradient-to-r from-transparent via-amber-200 to-transparent blur-2xl z-30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* TOP CURTAIN PANEL (Slides Upwards) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isCurtainClosed ? "0%" : "-100%" }}
        transition={{
          duration: hasStarted ? 0.75 : 2.0,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute top-0 inset-x-0 h-[50.5vh] z-20 overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(180deg, #f472b6 0%, #ec4899 45%, #db2777 85%, #be185d 100%)",
        }}
      >
        {/* Fabric Folds and Velvet Texture Lines */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 15px, rgba(0,0,0,0.15) 30px, rgba(0,0,0,0.15) 45px)",
          }}
        />

        {/* Soft Golden Hem Line at the Bottom of Top Curtain */}
        <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 shadow-md" />
        <div className="absolute bottom-2 inset-x-0 h-4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Floating Sparkles & Hearts on Top Curtain */}
        <div className="absolute top-8 left-10 text-white/50 text-xl animate-pulse">✨</div>
        <div className="absolute top-16 right-14 text-white/50 text-xl animate-pulse" style={{ animationDelay: "1s" }}>🌸</div>
        <div className="absolute top-24 left-1/4 text-white/40 text-lg animate-bounce" style={{ animationDuration: "4s" }}>💕</div>
        <div className="absolute top-12 right-1/3 text-white/40 text-lg animate-bounce" style={{ animationDuration: "5s" }}>💖</div>
      </motion.div>

      {/* BOTTOM CURTAIN PANEL (Slides Downwards) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isCurtainClosed ? "0%" : "100%" }}
        transition={{
          duration: hasStarted ? 0.75 : 2.0,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute bottom-0 inset-x-0 h-[50.5vh] z-20 overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(0deg, #f472b6 0%, #ec4899 45%, #db2777 85%, #be185d 100%)",
        }}
      >
        {/* Fabric Folds and Velvet Texture Lines */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 15px, rgba(0,0,0,0.15) 30px, rgba(0,0,0,0.15) 45px)",
          }}
        />

        {/* Soft Golden Hem Line at the Top of Bottom Curtain */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 shadow-md" />
        <div className="absolute top-2 inset-x-0 h-4 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

        {/* Floating Sparkles & Hearts on Bottom Curtain */}
        <div className="absolute bottom-10 left-12 text-white/50 text-xl animate-pulse" style={{ animationDelay: "0.5s" }}>✨</div>
        <div className="absolute bottom-14 right-12 text-white/50 text-xl animate-pulse" style={{ animationDelay: "1.5s" }}>🌹</div>
        <div className="absolute bottom-20 left-1/3 text-white/40 text-lg animate-bounce" style={{ animationDuration: "4.5s" }}>💕</div>
        <div className="absolute bottom-8 right-1/4 text-white/40 text-lg animate-bounce" style={{ animationDuration: "3.5s" }}>💖</div>
      </motion.div>

      {/* INITIAL OPENING CALLOUT CARD (Matching Reference Screenshot Font) */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 text-center pointer-events-none"
          >
            <div className="pointer-events-auto glass-card-pastel rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border-2 border-white/95 flex flex-col items-center bg-white/90 backdrop-blur-2xl">
              {/* Badge */}
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm font-sans">
                <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: "6s" }} />
                <span>A Surprise Is Waiting</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              </div>

              {/* “Hey Allen! 💜” in exact screenshot calligraphy brush font */}
              <h1 className="text-5xl sm:text-6xl font-brush font-bold tracking-tight mb-2 flex items-center justify-center gap-2">
                <span className="text-calligraphy-gradient">Hey Allen!</span>
                <span className="text-purple-600">💜</span>
              </h1>

              {/* “Someone has prepared a little surprise for you...” in cursive font */}
              <p className="text-xl sm:text-2xl font-sub-script text-pink-900/90 mb-6 max-w-xs leading-relaxed">
                Someone has prepared a little surprise for you…
              </p>

              {/* Button: “OPEN YOUR SURPRISE 👀 ✨” */}
              <motion.button
                onClick={handleOpenInitialCurtains}
                whileHover={{ scale: 1.06, boxShadow: "0 10px 30px rgba(225,29,72,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg tracking-wider text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/80 flex items-center gap-2.5 transition-all group font-sans"
              >
                <span>OPEN YOUR SURPRISE 👀</span>
                <Sparkles className="w-5 h-5 text-yellow-200 group-hover:rotate-12 transition-transform" />
              </motion.button>

              <span className="text-[11px] text-pink-500/70 tracking-wider uppercase mt-4 font-sans">
                Tap to open the curtains ✨
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
