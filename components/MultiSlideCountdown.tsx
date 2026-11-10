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
  word: string;
  salutation: string;
  message: string;
}

const LETTERS_DATA: LetterData[] = [
  {
    letter: "A",
    word: "Authentic",
    salutation: "My Authentic Allen,",
    message:
      "A is for AUTHENTIC. In a world full of people putting on acts, you are the realest person I know. You speak your mind, you stay true to who you are, and your honesty as a best  is something I cherish more than words can say. Thank you for always keeping it 100% real with me.",
  },
  {
    letter: "L",
    word: "Legendary",
    salutation: "My Legendary Allen,",
    message:
      "L is for LEGENDARY. Every single adventure, late-night conversation, and chaotic idea we've ever shared turns into an unforgettable story. Having you as my partner in crime makes everyday life ten times more exciting. You are genuinely a legend, bro.",
  },
  {
    letter: "L",
    word: "Loyal",
    salutation: "My Loyal Allen,",
    message:
      "L is for LOYAL. You are the  who stands by me through thick and thin. You show up when it matters most, listen without judgment, and celebrate my wins like your own. A loyal best  like you is one in a million, and I'll never take that for granted.",
  },
  {
    letter: "E",
    word: "Extraordinary",
    salutation: "My Extraordinary Allen,",
    message:
      "E is for EXTRAORDINARY. Your humor, your positive energy, and your massive heart make you completely irreplaceable. You have this rare gift of walking into any room and instantly making everyone smile. Never lose that spark that makes you so special.",
  },
  {
    letter: "N",
    word: "Number One",
    salutation: "My Number One Allen,",
    message:
      "N is for NUMBER ONE. My best , my ride-or-die, and the best idiot I could ever ask for. In just 3 days (13 November 2026), it's officially your birthday, but you deserve to be celebrated every single day. Let's make this year your best one yet! ❤️",
  },
];

export default function MultiSlideCountdown() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isCurtainTransitioning, setIsCurtainTransitioning] = useState(false);
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

  // When clicking any letter or next button:
  // Close curtains -> switch slide -> open curtains with golden light burst!
  const switchSlideWithCurtains = (targetSlide: number) => {
    if (targetSlide === currentSlide || isCurtainTransitioning) return;

    soundManager.playCelestialChime();
    setIsCurtainTransitioning(true);

    // 1. Curtains close smoothly to center seam
    setTimeout(() => {
      setCurrentSlide(targetSlide);

      // Play sound on reveal
      if (targetSlide === 6) {
        triggerRoyalConfetti();
        triggerHeartConfetti();
        setTimeout(() => triggerFireworks(3500), 500);
        soundManager.playGiftFanfare();
      } else {
        triggerHeartConfetti();
      }

      // 2. Curtains open smoothly from top and bottom
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

  const currentLetterData = currentSlide <= 5 ? LETTERS_DATA[currentSlide - 1] : null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-4 py-8 overflow-hidden select-none">
      {/* Cinematic Curtains Overlay (Handles initial load & letter transitions) */}
      <CinematicCurtains isTransitioning={isCurtainTransitioning} />

      {/* Top Capsule Navigation Badge: [ ✨ ] [ A ] [ L ] [ L ] [ E ] [ N ] [ ✨ ] [ ❤️ ] */}
      <TopCapsuleNav
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSelectSlide={switchSlideWithCurtains}
      />

      {/* Floating Aesthetic Glassmorphic Music Player (All of Me) */}
      <AestheticMusicPlayer />

      {/* Main Slide Content Area */}
      <div className="relative z-10 w-full max-w-xl mx-auto my-auto flex flex-col items-center justify-center text-center pt-20 pb-8">
        <AnimatePresence mode="wait">
          {/* LETTER SLIDES 1 to 5 (A - L - L - E - N matching media_1794294699632_5edb4420.jpg) */}
          {currentLetterData && (
            <motion.div
              key={`letter-${currentLetterData.letter}-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Big Serif Letter (Matching screenshot) */}
              <h1 className="text-8xl sm:text-9xl font-serif font-bold text-magenta-gradient tracking-tight my-0 leading-none drop-shadow-sm">
                {currentLetterData.letter}
              </h1>

              {/* Word in cursive script (Matching screenshot) */}
              <h2 className="text-3xl sm:text-5xl font-script font-bold text-pink-700 mt-2 mb-3 drop-shadow-sm">
                {currentLetterData.word}
              </h2>

              {/* Emojis matching reference screenshot */}
              <div className="flex items-center justify-center gap-2 mb-6 text-2xl">
                <span>💕</span>
                <span>🌸</span>
                <span>💖</span>
              </div>

              {/* Glassmorphic Letter Card (Matching reference screenshot) */}
              <div className="w-full glass-card-pastel rounded-3xl p-6 sm:p-8 shadow-xl border border-white/95 text-left mb-6 bg-white/80 backdrop-blur-xl">
                <div className="text-center mb-3">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-pink-900 mb-1">
                    {currentLetterData.salutation}
                  </h3>
                  <span className="text-lg">🌸</span>
                </div>

                <p className="font-serif text-xs sm:text-sm text-pink-950/85 leading-relaxed text-justify sm:text-left">
                  {currentLetterData.message}
                </p>
              </div>

              {/* Button: Next Letter with Curtain Transition */}
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(225,29,72,0.25)" }}
                whileTap={{ scale: 0.96 }}
                className="px-8 sm:px-10 py-3.5 rounded-full font-bold text-sm sm:text-base tracking-wider text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-300/60 border border-white/60 flex items-center gap-2 transition-all"
              >
                <span>
                  {currentSlide < 5
                    ? `Next Letter: ${LETTERS_DATA[currentSlide].letter} 👉`
                    : "The Big Finale ✨"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* SLIDE 6 – THE REVEAL, 3-DAY COUNTDOWN, CAKE & GRAND CELEBRATION */}
          {currentSlide === 6 && (
            <motion.div
              key="slide-6"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Emojis */}
              <div className="flex items-center gap-2 mb-2 text-2xl">
                <span>💕</span>
                <span>🌹</span>
                <span>🌸</span>
                <span>💖</span>
              </div>

              {/* Main Typography */}
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-pink-700 tracking-wide mb-1">
                Happy Birthday
              </h2>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-magenta-gradient tracking-tight mb-2">
                Allen, My Best
              </h1>
              <div className="flex items-center justify-center gap-2 mb-2">
               
                <span className="text-3xl sm:text-5xl text-purple-600 animate-pulse">
                  💜
                </span>
              </div>

              <p className="text-sm sm:text-lg font-serif italic text-pink-800/90 mb-3 max-w-md font-medium">
                My dearest , today is all about celebrating you.
              </p>

              <div className="inline-block px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-pink-700 mb-6">
                MY BEST . MY PARTNER IN CRIME. MY FAVOURITE IDIOT. 😂
              </div>

              {/* Live Countdown to 13 November 2026 Asia/Kolkata */}
              <div className="w-full max-w-md mb-6">
                <span className="text-xs uppercase tracking-widest text-pink-600 font-bold mb-2 block">
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
                      <span className="text-[9px] sm:text-[10px] tracking-widest font-semibold text-pink-500/80 mt-0.5">
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

              {/* Celebrate Again & Replay Action Buttons */}
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
                  onClick={() => switchSlideWithCurtains(1)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-3.5 rounded-full font-semibold text-sm tracking-wider text-pink-800 bg-white/80 hover:bg-white shadow-md border border-pink-200 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay From A 🔄</span>
                </motion.button>
              </div>

              <p className="text-[11px] text-pink-600/70 mt-6 tracking-wider uppercase">
                13 November 2026 • Made with love for Allen ✨
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
            onClick={() => switchSlideWithCurtains(idx + 1)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx + 1
                ? "w-8 h-2.5 bg-gradient-to-r from-pink-500 to-rose-400"
                : "w-2.5 h-2.5 bg-pink-300/60 hover:bg-pink-400"
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
