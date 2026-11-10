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
  // Letters: "M Y B E S T"
  const letters = ["M", "Y", "B", "E", "S", "T"];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 select-none">
      <div className="glass-pill px-4 py-1.5 sm:px-6 sm:py-2 rounded-full flex items-center gap-2 sm:gap-3.5 shadow-lg border border-white/80">
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: "6s" }} />

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {letters.map((letter, idx) => {
            const isActive = currentSlide === idx + 1;
            return (
              <button
                key={idx}
                onClick={() => onSelectSlide(idx + 1)}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-md shadow-pink-300/50 scale-110"
                    : "text-pink-900/60 hover:text-pink-700 hover:bg-pink-100/60"
                }`}
                title={`Slide ${idx + 1}`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse ml-0.5" />
      </div>
    </div>
  );
}
