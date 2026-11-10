"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Clock, Cake, PartyPopper, ArrowRight, RotateCcw } from "lucide-react";
import TopCapsuleNav from "./TopCapsuleNav";
import AestheticMusicPlayer from "./AestheticMusicPlayer";
import CardFlipper from "./CardFlipper";
import BirthdayCake from "./BirthdayCake";
import { soundManager } from "@/lib/soundEffects";
import { triggerRoyalConfetti, triggerFireworks, triggerHeartConfetti } from "@/lib/confetti";

export default function MultiSlideCountdown() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 6;

  // Live countdown to 13 November 2026 (Asia/Kolkata timezone: +05:30)
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthdayToday: false,
  });

  useEffect(() => {
    // 13 November 2026 00:00:00 Asia/Kolkata (+05:30)
    const targetDate = new Date("2026-11-13T00:00:00+05:30").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isBirthdayToday: true,
        });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
          isBirthdayToday: false,
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (slideNum: number) => {
    setCurrentSlide(slideNum);
    soundManager.playCelestialChime();

    if (slideNum === 3) {
      triggerRoyalConfetti();
    } else if (slideNum === 6) {
      triggerRoyalConfetti();
      triggerHeartConfetti();
      setTimeout(() => triggerFireworks(3500), 500);
      soundManager.playGiftFanfare();
    }
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    } else {
      goToSlide(1);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-4 py-8 overflow-hidden select-none">
      {/* Top Capsule Navigation Badge: A L L E N ❤️ */}
      <TopCapsuleNav
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSelectSlide={goToSlide}
      />

      {/* Floating Aesthetic Glassmorphic Music Player (All of Me) */}
      <AestheticMusicPlayer />

      {/* Main Slide Content Area */}
      <div className="relative z-10 w-full max-w-xl mx-auto my-auto flex flex-col items-center justify-center text-center pt-20 pb-8">
        <AnimatePresence mode="wait">
          {/* SLIDE 1 – THE ENTRY (Exact Match to User Reference Screenshot) */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              {/* Main Birthday Typography matching screenshot layout */}
              <h2 className="text-4xl sm:text-6xl font-serif font-light text-pink-700 tracking-wide mb-1">
                Happy Birthday
              </h2>

              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-magenta-gradient tracking-tight mb-2">
                Allen, My Best
              </h1>

              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-magenta-gradient">
                  Friend..
                </span>
                <span className="text-3xl sm:text-5xl text-purple-600 animate-pulse">
                  💜
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-xl font-serif italic text-pink-800/90 mb-4 max-w-md font-medium">
                My dearest friend, today is all about celebrating you.
              </p>

              {/* Additional Decorative Best-Friend Text */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-pink-700 mb-6">
                MY BEST FRIEND. MY PARTNER IN CRIME. MY FAVOURITE IDIOT. 😂
              </div>

              {/* Emojis matching reference screenshot */}
              <div className="flex items-center justify-center gap-2 mb-8 text-2xl">
                <span>💕</span>
                <span>🌹</span>
                <span>🌸</span>
                <span>💖</span>
              </div>

              {/* Button: “Click here 👀” */}
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.06, boxShadow: "0 10px 30px rgba(225,29,72,0.25)" }}
                whileTap={{ scale: 0.96 }}
                className="px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg tracking-wider text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/60 flex items-center gap-2.5 transition-all"
              >
                <span>Click here 👀</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* SLIDE 2 – THE SUSPENSE */}
          {currentSlide === 2 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-pink-100/90 text-pink-600 flex items-center justify-center text-3xl mb-4 shadow-sm">
                🤨
              </div>

              <span className="text-xs uppercase tracking-widest text-pink-600/80 font-bold mb-2">
                Wait a minute, Allen...
              </span>

              {/* “Okay, first of all…” */}
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-pink-950 mb-2">
                Okay, first of all…
              </h2>

              {/* “Why are you even here? 😂” */}
              <p className="text-2xl sm:text-4xl font-serif italic text-magenta-gradient mb-4 font-extrabold">
                Why are you even here? 😂
              </p>

              <p className="text-sm sm:text-base text-pink-900/70 max-w-sm mb-8 leading-relaxed">
                Did you really think I’d forget your birthday? Or were you just snooping around hoping for early spoilers? 💅
              </p>

              {/* Button: “What’s coming next?” */}
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.06, boxShadow: "0 10px 30px rgba(225,29,72,0.25)" }}
                whileTap={{ scale: 0.96 }}
                className="px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg tracking-wider text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/60 flex items-center gap-2.5 transition-all"
              >
                <span>What’s coming next? 👉</span>
              </motion.button>
            </motion.div>
          )}

          {/* SLIDE 3 – THE REVEAL & COUNTDOWN */}
          {currentSlide === 3 && (
            <motion.div
              key="slide-3"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
                <span>13 November 2026 Countdown</span>
              </div>

              {/* “IT’S YOUR BIRTHDAY, BABY! 🎂” */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight mb-2">
                <span className="text-magenta-gradient drop-shadow-sm block">
                  IT’S YOUR BIRTHDAY, BABY! 🎂
                </span>
              </h2>

              {/* “And guess what? Just 3 DAYS TO GO!” */}
              <p className="text-base sm:text-xl font-serif italic text-pink-800 font-semibold mb-6">
                {timeLeft.isBirthdayToday
                  ? "IT’S OFFICIALLY YOUR BIRTHDAY TODAY, ALLEN! 🎉"
                  : "JUST 3 DAYS TO GO! 🎂"}
              </p>

              {/* Live Live Countdown Clock (Asia/Kolkata) */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-md mb-8">
                {[
                  { label: "DAYS", value: timeLeft.days },
                  { label: "HOURS", value: timeLeft.hours },
                  { label: "MINS", value: timeLeft.minutes },
                  { label: "SECS", value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-card-pastel rounded-2xl p-3 sm:p-4 border border-pink-200/90 shadow-md flex flex-col items-center"
                  >
                    <span className="text-2xl sm:text-4xl font-serif font-extrabold text-pink-700">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] sm:text-xs tracking-widest font-semibold text-pink-500/80 mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-pink-600/80 font-medium mb-6">
                Target Date: 13 November 2026 • Asia/Kolkata
              </p>

              {/* Button: “Wait, there’s more…” */}
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.06, boxShadow: "0 10px 30px rgba(225,29,72,0.25)" }}
                whileTap={{ scale: 0.96 }}
                className="px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg tracking-wider text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/60 flex items-center gap-2.5 transition-all"
              >
                <span>Wait, there’s more… 🎁</span>
              </motion.button>
            </motion.div>
          )}

          {/* SLIDE 4 – THE FLIPPER CARD TO ALLEN */}
          {currentSlide === 4 && (
            <motion.div
              key="slide-4"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-widest mb-1">
                <span>💌 An Open &amp; Close Letter</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-pink-950 mb-1">
                A Letter For Allen ❤️
              </h2>
              <p className="text-xs sm:text-sm text-pink-900/70 mb-2">
                Click the envelope to flip open and read!
              </p>

              {/* 3D Flip Card Component */}
              <CardFlipper />

              {/* Button */}
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.06, boxShadow: "0 10px 30px rgba(225,29,72,0.25)" }}
                whileTap={{ scale: 0.96 }}
                className="mt-4 px-8 sm:px-10 py-3.5 rounded-full font-bold text-base tracking-wider text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/60 flex items-center gap-2 transition-all"
              >
                <span>Blow your pre-birthday candles 🕯️</span>
              </motion.button>
            </motion.div>
          )}

          {/* SLIDE 5 – CAKE & CANDLE WISH */}
          {currentSlide === 5 && (
            <motion.div
              key="slide-5"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              <span className="text-xs uppercase tracking-widest text-pink-600 font-bold mb-1">
                Make A Preliminary Wish, Allen ✨
              </span>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-950 mb-1">
                Pre-Birthday Cake 🎂
              </h2>
              <p className="text-xs sm:text-sm text-pink-900/70 mb-2">
                Tap the candles to blow them out for 13 November!
              </p>

              {/* Cake Component */}
              <div className="scale-90 sm:scale-100">
                <BirthdayCake
                  isCandleBlown={false}
                  onBlowCandle={() => {
                    soundManager.playCandleBlow();
                    triggerHeartConfetti();
                  }}
                />
              </div>

              {/* Button */}
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.06, boxShadow: "0 10px 30px rgba(225,29,72,0.25)" }}
                whileTap={{ scale: 0.96 }}
                className="mt-6 px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg tracking-wider text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/60 flex items-center gap-2.5 transition-all"
              >
                <span>The Grand Finale 🎉</span>
              </motion.button>
            </motion.div>
          )}

          {/* SLIDE 6 – GRAND CELEBRATION */}
          {currentSlide === 6 && (
            <motion.div
              key="slide-6"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              <div className="flex items-center gap-2 mb-3 text-3xl">
                <span>🎉</span>
                <span>✨</span>
                <span>💖</span>
                <span>🚀</span>
              </div>

              <span className="text-xs uppercase tracking-[0.25em] text-pink-600 font-bold mb-1">
                13 NOVEMBER 2026 • 3 DAYS TO GO
              </span>

              {/* Big Text */}
              <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight mb-2">
                <span className="text-magenta-gradient drop-shadow-sm block">
                  HAPPY (ALMOST) BIRTHDAY, ALLEN! ❤️
                </span>
              </h2>

              <p className="text-base sm:text-xl font-serif italic text-pink-900/85 max-w-md mb-2">
                To my best friend, partner in crime, and favourite idiot.
              </p>

              <p className="text-xs sm:text-sm text-pink-700/80 max-w-sm mb-6 leading-relaxed">
                Life is infinitely more fun with you around. In 3 days, we celebrate YOU!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <motion.button
                  onClick={() => {
                    soundManager.playGiftFanfare();
                    triggerFireworks(4000);
                  }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/60 flex items-center gap-2"
                >
                  <PartyPopper className="w-4 h-4" />
                  <span>CELEBRATE AGAIN 🎆</span>
                </motion.button>

                <motion.button
                  onClick={() => goToSlide(1)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-3.5 rounded-full font-semibold text-sm tracking-wider text-pink-800 bg-white/80 hover:bg-white shadow-md border border-pink-200 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Journey 🔄</span>
                </motion.button>
              </div>

              <p className="text-[11px] text-pink-600/70 mt-8 tracking-wider uppercase">
                Made with all my love for Allen • Best Friends Forever ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide Navigation Dots at Bottom */}
      <div className="relative z-20 flex items-center gap-2 py-2">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx + 1)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx + 1
                ? "w-8 h-2.5 bg-gradient-to-r from-pink-500 to-rose-400"
                : "w-2.5 h-2.5 bg-pink-300/60 hover:bg-pink-400"
            }`}
            title={`Part ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
