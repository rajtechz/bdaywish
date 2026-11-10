"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, ArrowRight, RotateCcw, PartyPopper } from "lucide-react";
import TopCapsuleNav from "./TopCapsuleNav";
import AestheticMusicPlayer from "./AestheticMusicPlayer";
import CardFlipper from "./CardFlipper";
import BirthdayCake from "./BirthdayCake";
import CinematicCurtains from "./CinematicCurtains";
import { soundManager } from "@/lib/soundEffects";
import { triggerRoyalConfetti, triggerFireworks, triggerHeartConfetti } from "@/lib/confetti";

interface LetterData {
  letter: string;
  message: string;
}

const LETTERS_DATA: LetterData[] = [
  {
    letter: "A",
    message:
      "As your birthday is coming up, I just wanted to remind you that you're freaking special! ❤️",
  },
  {
    letter: "L",
    message:
      "You make Mumma proud in more ways than you know ♥️",
  },
  {
    letter: "L",
    message:
      "I hope the coming year brings you everything you've ever wished for and so much more!",
  },
  {
    letter: "E",
    message:
      "I hope this new chapter gives you countless reasons to smile and everything you've been silently praying for",
  },
  {
    letter: "N",
    message:
      "And lastly, I’m always here for you! Always and forever, cheering you on, celebrating your wins, and rooting for you louder than ever! ❤️",
  },
];

export default function MultiSlideCountdown() {
  // Start on Slide 0 (Home greeting matching Image 1 & Image 7)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCurtainTransitioning, setIsCurtainTransitioning] = useState(false);
  const [transitionLetter, setTransitionLetter] = useState<string>("✨");
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

  // When clicking any letter: Close curtains with big letter -> change slide -> open curtains with golden light burst!
  const switchSlideWithCurtains = (targetSlide: number) => {
    if (targetSlide === currentSlide || isCurtainTransitioning) return;

    // Determine target letter to show in the center of the closing curtain (matching Image 2)
    let letterToShow = "✨";
    if (targetSlide >= 1 && targetSlide <= 5) {
      letterToShow = LETTERS_DATA[targetSlide - 1].letter;
    } else if (targetSlide === 6) {
      letterToShow = "🎂";
    }
    setTransitionLetter(letterToShow);

    soundManager.playCelestialChime();
    setIsCurtainTransitioning(true);

    // Curtains close to center
    setTimeout(() => {
      setCurrentSlide(targetSlide);

      if (targetSlide === 6) {
        triggerRoyalConfetti();
        triggerHeartConfetti();
        setTimeout(() => triggerFireworks(3500), 500);
        soundManager.playGiftFanfare();
      } else {
        triggerHeartConfetti();
      }

      // Curtains open smoothly from top and bottom
      setTimeout(() => {
        setIsCurtainTransitioning(false);
      }, 350);
    }, 700);
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      switchSlideWithCurtains(currentSlide + 1);
    } else {
      switchSlideWithCurtains(1);
    }
  };

  const currentLetterData =
    currentSlide >= 1 && currentSlide <= 5 ? LETTERS_DATA[currentSlide - 1] : null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-4 py-8 overflow-hidden select-none">
      {/* Cinematic Curtains Overlay for Initial Load & Every Letter Click */}
      <CinematicCurtains
        isTransitioning={isCurtainTransitioning}
        transitionLetter={transitionLetter}
      />

      {/* Top Capsule Navigation Badge: [ ✨ ] [ A ] [ L ] [ L ] [ E ] [ N ] [ ✨ ] [ ❤️ ] */}
      <TopCapsuleNav
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSelectSlide={switchSlideWithCurtains}
      />

      {/* Floating Aesthetic Glassmorphic Music Player (Happy Birthday Song) */}
      <AestheticMusicPlayer />

      {/* Main Slide Content Area */}
      <div className="relative z-10 w-full max-w-xl mx-auto my-auto flex flex-col items-center justify-center text-center pt-20 pb-8">
        <AnimatePresence mode="wait">
          {/* SLIDE 0 – HOME BIRTHDAY GREETING (Matching Image 1 & Image 7) */}
          {currentSlide === 0 && (
            <motion.div
              key="slide-0-home"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Headline Line 1 (Exact Font & Size from Image 1 & Image 7) */}
              <h2 className="text-5xl sm:text-7xl font-brush font-bold text-calligraphy-gradient tracking-tight mb-0 leading-tight">
                Happy Birthday
              </h2>

              {/* Headline Line 2 (Exact Font & Size from Image 1 & Image 7) */}
              <h1 className="text-5xl sm:text-7xl font-brush font-bold text-calligraphy-gradient tracking-tight mt-1 mb-0 leading-tight">
                Allen, My Best
              </h1>

              {/* Headline Line 3 with Purple Heart (Exact from Image 1 & Image 7) */}
              <div className="flex items-center justify-center gap-2 mt-1 mb-2">
                <span className="text-5xl sm:text-7xl font-brush font-bold text-calligraphy-gradient">
                  Friend..
                </span>
                <span className="text-4xl sm:text-6xl text-purple-600 animate-pulse">
                  💜
                </span>
              </div>

              {/* Subtitle (Exact Font & Size from Screenshot) */}
              <p className="text-xl sm:text-2xl font-sub-script text-pink-800/90 font-medium mb-3">
                My dearest friend, today is all about celebrating you
              </p>

              {/* Emojis matching reference screenshot */}
              <div className="flex items-center justify-center gap-2 mb-6 text-2xl sm:text-3xl">
                <span>💕</span>
                <span>🌹</span>
                <span>🌸</span>
                <span>💖</span>
              </div>

              {/* 3 Days To Go Countdown Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 border border-pink-200 text-pink-700 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 shadow-sm font-sans">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>🎂 13 November 2026 • Just 3 Days To Go!</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              </div>

              {/* Button: Begin exploring letters A - L - L - E - N */}
              <motion.button
                onClick={() => switchSlideWithCurtains(1)}
                whileHover={{ scale: 1.05, boxShadow: "0 12px 35px rgba(225,29,72,0.35)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 sm:px-12 py-4 rounded-full font-bold text-base sm:text-lg tracking-wider text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/80 flex items-center gap-3 transition-all font-sans"
              >
                <span>Open Letter A (A-L-L-E-N) 💌</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* LETTER SLIDES 1 to 5 (A - L - L - E - N matching exact design of Image 3) */}
          {currentLetterData && (
            <motion.div
              key={`letter-${currentLetterData.letter}-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Big Serif Display Letter (Exact matching Image 3) */}
              <span className="text-8xl sm:text-9xl font-serif font-extrabold text-pink-600 drop-shadow-sm mb-2 leading-none select-none">
                {currentLetterData.letter}
              </span>

              {/* Emojis (Exact matching Image 3) */}
              <div className="flex items-center justify-center gap-3 mb-6 text-2xl sm:text-3xl">
                <span>💕</span>
                <span>🌸</span>
                <span>💖</span>
              </div>

              {/* Glassmorphic Letter Card with EXACT user message and NO extra text */}
              <div className="w-full glass-card-pastel rounded-3xl p-7 sm:p-10 shadow-xl border border-white/95 text-center mb-8 bg-white/85 backdrop-blur-xl max-w-lg">
                <p className="font-serif text-base sm:text-lg text-pink-950/90 leading-relaxed font-medium">
                  {currentLetterData.message}
                </p>
              </div>

              {/* Button: Next Letter with Curtain Transition */}
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(225,29,72,0.25)" }}
                whileTap={{ scale: 0.96 }}
                className="px-8 sm:px-10 py-3.5 rounded-full font-bold text-sm sm:text-base tracking-wider text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/60 flex items-center gap-2 transition-all font-sans"
              >
                <span>
                  {currentSlide < 5
                    ? `Next Letter: ${LETTERS_DATA[currentSlide].letter} 👉`
                    : "The Grand Birthday Finale ✨ 👉"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* SLIDE 6 – THE COUNTDOWN & GRAND FINALE */}
          {currentSlide === 6 && (
            <motion.div
              key="slide-6"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Headline Line 1 (Exact Font & Size from Screenshot) */}
              <h2 className="text-5xl sm:text-7xl font-brush font-bold text-calligraphy-gradient tracking-tight mb-0 leading-tight">
                Happy Birthday
              </h2>

              {/* Headline Line 2 (Exact Font & Size from Screenshot) */}
              <h1 className="text-5xl sm:text-7xl font-brush font-bold text-calligraphy-gradient tracking-tight mt-1 mb-0 leading-tight">
                Allen, My Best
              </h1>

              {/* Headline Line 3 with Purple Heart (Exact from Screenshot) */}
              <div className="flex items-center justify-center gap-2 mt-1 mb-2">
                <span className="text-5xl sm:text-7xl font-brush font-bold text-calligraphy-gradient">
                  Friend..
                </span>
                <span className="text-4xl sm:text-6xl text-purple-600 animate-pulse">
                  💜
                </span>
              </div>

              {/* Subtitle (Exact Font & Size from Screenshot) */}
              <p className="text-xl sm:text-2xl font-sub-script text-pink-800/90 font-medium mb-3">
                My dearest friend, today is all about celebrating you
              </p>

              {/* Emojis matching reference screenshot */}
              <div className="flex items-center justify-center gap-2 mb-4 text-2xl sm:text-3xl">
                <span>💕</span>
                <span>🌹</span>
                <span>🌸</span>
                <span>💖</span>
              </div>

              {/* Decorative Best-Friend Badge */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-pink-700 mb-6 font-sans">
                MY BEST FRIEND. MY PARTNER IN CRIME. MY FAVOURITE IDIOT. 😂
              </div>

              {/* Live Countdown to 13 November 2026 Asia/Kolkata */}
              <div className="w-full max-w-md mb-6">
                <span className="text-xs uppercase tracking-widest text-pink-600 font-bold mb-2 block font-sans">
                  {timeLeft.isBirthdayToday
                    ? "IT’S OFFICIALLY YOUR BIRTHDAY TODAY! 🎉"
                    : "JUST 3 DAYS TO GO! 🎂"}
                </span>

                <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
                  {[
                    { label: "DAYS", value: timeLeft.days },
                    { label: "HOURS", value: timeLeft.hours },
                    { label: "MINS", value: timeLeft.minutes },
                    { label: "SECS", value: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-card-pastel rounded-2xl p-2.5 sm:p-3 border border-pink-200/90 shadow-md flex flex-col items-center"
                    >
                      <span className="text-xl sm:text-3xl font-serif font-extrabold text-pink-700">
                        {String(item.value).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] sm:text-[10px] tracking-widest font-semibold text-pink-500/80 mt-0.5 font-sans">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D Open & Close Card Flipper */}
              <div className="w-full mb-6">
                <CardFlipper />
              </div>

              {/* Interactive Birthday Cake */}
              <div className="mb-6 scale-90">
                <BirthdayCake
                  isCandleBlown={false}
                  onBlowCandle={() => {
                    soundManager.playCandleBlow();
                    triggerHeartConfetti();
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <motion.button
                  onClick={() => {
                    soundManager.playGiftFanfare();
                    triggerFireworks(4000);
                  }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/60 flex items-center gap-2 font-sans"
                >
                  <PartyPopper className="w-4 h-4" />
                  <span>CELEBRATE AGAIN 🎆</span>
                </motion.button>

                <motion.button
                  onClick={() => switchSlideWithCurtains(1)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-3.5 rounded-full font-semibold text-sm tracking-wider text-pink-800 bg-white/80 hover:bg-white shadow-md border border-pink-200 flex items-center gap-2 font-sans"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay From A 🔄</span>
                </motion.button>
              </div>

              <p className="text-[11px] text-pink-600/70 mt-6 tracking-wider uppercase font-sans">
                13 November 2026 • Made with love for Allen ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide Navigation Dots at Bottom */}
      <div className="relative z-20 flex items-center gap-2 py-2">
        {Array.from({ length: totalSlides + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => switchSlideWithCurtains(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx
                ? "w-8 h-2.5 bg-gradient-to-r from-pink-500 to-rose-400"
                : "w-2.5 h-2.5 bg-pink-300/60 hover:bg-pink-400"
            }`}
            title={`Slide ${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
