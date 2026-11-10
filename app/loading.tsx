import React from "react";
import { Sparkles, Heart } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1a0528] via-[#12031d] to-[#07010e] text-blush-50">
      <div className="relative flex flex-col items-center">
        {/* Glowing aura */}
        <div className="absolute w-48 h-48 rounded-full bg-pink-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 w-16 h-16 rounded-full glass-card border-gold-300/50 flex items-center justify-center text-gold-300 shadow-xl mb-4">
          <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: "3s" }} />
        </div>

        <h2 className="relative z-10 text-xl font-serif font-bold text-pink-gradient mb-2 tracking-wide">
          Preparing Megha&apos;s Surprise...
        </h2>

        <div className="relative z-10 flex items-center gap-2 text-xs text-gold-300/80 uppercase tracking-widest">
          <Heart className="w-3.5 h-3.5 text-blush-400 fill-blush-400 animate-ping" />
          <span>Almost ready</span>
        </div>
      </div>
    </div>
  );
}

