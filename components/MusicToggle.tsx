"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import { soundManager } from "@/lib/soundEffects";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsPlaying(soundManager.isPlayingMusic());
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      soundManager.stopBackgroundMusic(setIsPlaying);
    } else {
      soundManager.startBackgroundMusic(setIsPlaying);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-40">
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-card-gold border-gold-300/40 text-gold-200 text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-xl transition-all"
        title={isPlaying ? "Pause music" : "Play birthday music"}
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Waveform */}
            <div className="flex items-end gap-1 h-3.5">
              <span className="w-0.5 h-full bg-gold-300 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2/3 bg-gold-200 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-full bg-pink-300 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s]" />
              <span className="w-0.5 h-1/2 bg-gold-300 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s]" />
            </div>
            <Volume2 className="w-4 h-4 text-gold-300" />
            <span className="hidden sm:inline text-xs tracking-wider uppercase">Music Playing</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-lavender-300/70" />
            <span className="hidden sm:inline text-xs text-lavender-200/80 tracking-wider uppercase">Play Music</span>
          </>
        )}
      </motion.button>
    </div>
  );
}

