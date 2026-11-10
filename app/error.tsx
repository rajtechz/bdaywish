"use client";

import React, { useEffect } from "react";
import { Sparkles, RefreshCw, Heart } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Birthday surprise page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-[#1a0528] via-[#12031d] to-[#07010e] text-blush-50">
      <div className="max-w-md w-full p-8 rounded-3xl glass-card-gold border-gold-300/40 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/20 border border-gold-300/50 flex items-center justify-center mb-4 text-gold-300">
          <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: "8s" }} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-pink-gradient mb-2">
          Happy Birthday Megha! ❤️
        </h1>
        <p className="text-sm text-lavender-200/90 mb-6">
          Everything is ready for your special day. Tap below to begin the magical celebration!
        </p>
        <button
          onClick={() => reset()}
          className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase text-midnight-950 bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 shadow-xl border border-gold-100 flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Open Surprise ✨</span>
        </button>
      </div>
    </div>
  );
}
