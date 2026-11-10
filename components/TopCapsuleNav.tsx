"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";

interface TopCapsuleNavProps {
  currentSlide: number;
  totalSlides: number;
  onSelectSlide: (slide: number) => void;
}

export default function TopCapsuleNav({
  currentSlide,
  totalSlides,
  onSelectSlide,
}: TopCapsuleNavProps) {
  // Letters: A, L, L, E, N, and the final Celebration Star
  const navItems = [
    { label: "A", slide: 1 },
    { label: "L", slide: 2 },
    { label: "L", slide: 3 },
    { label: "E", slide: 4 },
    { label: "N", slide: 5 },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 select-none">
      <div className="glass-pill px-5 py-2 sm:px-7 sm:py-2.5 rounded-full flex items-center gap-3 sm:gap-4 shadow-lg border border-white/90 bg-white/80 backdrop-blur-xl">
        {/* Left Sparkle (matching screenshot, clickable to return Home) */}
        <button
          onClick={() => onSelectSlide(0)}
          className={`text-sm transition-all duration-300 ${
            currentSlide === 0 ? "text-pink-600 scale-125" : "text-pink-400 hover:scale-110"
          }`}
          title="Home Greeting"
        >
          ✨
        </button>

        {/* Letters A - L - L - E - N */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {navItems.map((item) => {
            const isActive = currentSlide === item.slide;
            return (
              <button
                key={item.slide}
                onClick={() => onSelectSlide(item.slide)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-bold tracking-wider flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-md shadow-pink-300/60 scale-110"
                    : "text-pink-900/60 hover:text-pink-700 hover:bg-pink-100/60"
                }`}
                title={`Letter ${item.label}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Sparkle (matching screenshot) */}
        <button
          onClick={() => onSelectSlide(6)}
          className={`text-sm transition-all duration-300 ${
            currentSlide === 6 ? "text-amber-500 scale-125 animate-spin" : "text-amber-400 hover:scale-110"
          }`}
          title="Celebration Finale"
          style={{ animationDuration: "8s" }}
        >
          ✨
        </button>

        {/* Heart Icon (matching screenshot) */}
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse ml-0.5" />
      </div>
    </div>
  );
}
