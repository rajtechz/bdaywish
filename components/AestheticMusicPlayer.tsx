"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Music2, Volume2, VolumeX, X, Sliders } from "lucide-react";
import { soundManager } from "@/lib/soundEffects";

export default function AestheticMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

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

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundManager.setMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      soundManager.setMuted(true);
    } else {
      if (isMuted) {
        setIsMuted(false);
        soundManager.setMuted(false);
      }
    }
  };

  // Timeline progress simulation while music is playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed top-3.5 right-3.5 sm:top-5 sm:right-6 z-40 select-none">
      {/* ============================================================ */}
      {/* MOBILE COMPACT FLOATING CONTROLS (Screen < 640px)            */}
      {/* Keeps top navigation capsule (A-L-L-E-N) 100% visible!       */}
      {/* ============================================================ */}
      <div className="sm:hidden relative">
        {!isMobileExpanded ? (
          <div className="flex items-center gap-1.5">
            {/* Quick Play/Pause Round Button */}
            <button
              onClick={togglePlay}
              className={`w-9 h-9 rounded-full shadow-lg border border-white/95 flex items-center justify-center transition-all ${
                isPlaying
                  ? "bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-400 text-white shadow-pink-400/50 scale-105"
                  : "bg-white/90 text-pink-600 hover:bg-white shadow-pink-200/40"
              }`}
              title={isPlaying ? "Pause Birthday Song" : "Play Birthday Song"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            {/* Micro Details Dropdown Trigger */}
            <button
              onClick={() => setIsMobileExpanded(true)}
              className="w-7 h-7 rounded-full bg-white/80 border border-white/95 flex items-center justify-center text-pink-500 shadow-sm"
              title="Song Settings"
            >
              <Music2 className={`w-3.5 h-3.5 ${isPlaying ? "animate-bounce" : ""}`} />
            </button>
          </div>
        ) : (
          /* Mobile Popover Menu when user wants to seek / adjust volume */
          <div className="absolute right-0 top-0 w-60 glass-player rounded-3xl p-3.5 shadow-2xl border border-white/95 bg-white/95 backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                <span className="text-[9px] tracking-widest uppercase font-semibold text-pink-600 font-sans">
                  Now Playing
                </span>
              </div>
              <button
                onClick={() => setIsMobileExpanded(false)}
                className="p-1 rounded-full text-pink-400 hover:text-pink-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-left mb-2">
              <h4 className="text-xs font-semibold text-neutral-800 font-script">
                Happy Birthday 🎂
              </h4>
              <p className="text-[9px] text-pink-500/80 font-sans">
                {isPlaying ? "Playing Birthday Melody ✨" : "Tap play to start"}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-pink-100 rounded-full h-1 mb-2.5 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-2 mb-2">
              <button
                onClick={() => soundManager.playCelestialChime()}
                className="p-1 rounded-full text-pink-400 hover:text-pink-600"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-400 text-white flex items-center justify-center shadow-md shadow-pink-300/60 active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={() => soundManager.playGiftFanfare()}
                className="p-1 rounded-full text-pink-400 hover:text-pink-600"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 pt-1.5 border-t border-pink-100/80">
              <button onClick={toggleMute} className="text-pink-500">
                {isMuted ? <VolumeX className="w-3 h-3 text-pink-400" /> : <Volume2 className="w-3 h-3 text-pink-500" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* DESKTOP VIEW (Screen >= 640px)                               */}
      {/* Full glassmorphic card on desktop with comfortable space     */}
      {/* ============================================================ */}
      <div className="hidden sm:block">
        <div className="glass-player rounded-3xl p-3.5 sm:p-4 shadow-xl border border-white/95 max-w-[210px] sm:max-w-[240px] transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
              <span className="text-[10px] tracking-widest uppercase font-semibold text-pink-600/90 font-sans">
                Now Playing
              </span>
            </div>
          </div>

          {/* Track Title */}
          <div className="text-left mb-2">
            <h4 className="text-xs sm:text-sm font-semibold text-neutral-800 truncate font-script">
              Happy Birthday 🎂
            </h4>
            <p className="text-[10px] text-pink-500/80 truncate font-sans">
              {isPlaying ? "Playing Birthday Song..." : "Tap play to start"}
            </p>
          </div>

          {/* Timeline Progress Bar */}
          <div className="w-full bg-pink-100 rounded-full h-1 mb-3 relative overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-1 mb-2">
            <button
              onClick={() => soundManager.playCelestialChime()}
              className="p-1 rounded-full text-pink-400 hover:text-pink-600 hover:bg-pink-50 transition-all"
              title="Previous"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

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

            <button
              onClick={() => soundManager.playGiftFanfare()}
              className="p-1 rounded-full text-pink-400 hover:text-pink-600 hover:bg-pink-50 transition-all"
              title="Next"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Volume Control Bar */}
          <div className="flex items-center gap-2 pt-2 border-t border-pink-100/80">
            <button onClick={toggleMute} className="text-pink-400 hover:text-pink-600">
              {isMuted ? (
                <VolumeX className="w-3 h-3 text-pink-400" />
              ) : (
                <Volume2 className="w-3 h-3 text-pink-500" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <Music2 className="w-3 h-3 text-pink-400 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
