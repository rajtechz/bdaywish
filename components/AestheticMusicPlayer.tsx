"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Music2, Volume2, VolumeX, Sparkles } from "lucide-react";
import { soundManager } from "@/lib/soundEffects";

export default function AestheticMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    setIsPlaying(soundManager.isPlayingMusic());
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      soundManager.stopBackgroundMusic(setIsPlaying);
    } else {
      soundManager.startBackgroundMusic(setIsPlaying);
    }
  };

  // Subtle progress animation when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-50 select-none">
      <div className="glass-player rounded-3xl p-3 sm:p-4 shadow-xl border border-white/90 max-w-[200px] sm:max-w-[230px] transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
            <span className="text-[10px] tracking-widest uppercase font-semibold text-pink-600/90 font-sans">
              Now Playing
            </span>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-[11px] text-pink-400 hover:text-pink-600 transition-colors"
          >
            {isMinimized ? "▲" : "▼"}
          </button>
        </div>

        {/* Track Title */}
        <div className="text-left mb-2">
          <h4 className="text-xs sm:text-sm font-semibold text-neutral-800 truncate font-serif italic">
            Birthday Vibes ✨
          </h4>
          <p className="text-[10px] text-pink-500/80 truncate">
            {isPlaying ? "Playing soft melody..." : "Tap play to listen"}
          </p>
        </div>

        {!isMinimized && (
          <>
            {/* Timeline Progress Bar */}
            <div className="w-full bg-pink-100 rounded-full h-1 mb-3 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-1">
              {/* Prev (Rewind chime) */}
              <button
                onClick={() => soundManager.playCelestialChime()}
                className="p-1 rounded-full text-pink-400 hover:text-pink-600 hover:bg-pink-50 transition-all"
                title="Previous"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              {/* Main Play / Pause Circle */}
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-400 text-white flex items-center justify-center shadow-md shadow-pink-300/60 hover:scale-108 active:scale-95 transition-all"
                title={isPlaying ? "Pause Music" : "Play Music"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                )}
              </button>

              {/* Next (Fanfare chime) */}
              <button
                onClick={() => soundManager.playGiftFanfare()}
                className="p-1 rounded-full text-pink-400 hover:text-pink-600 hover:bg-pink-50 transition-all"
                title="Next"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Note badge */}
            <div className="mt-2.5 pt-2 border-t border-pink-100/80 flex items-center justify-center gap-1.5 text-[10px] text-pink-500/70">
              <Music2 className="w-3 h-3 text-pink-400 animate-bounce" />
              <span>Aesthetic Sound</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

