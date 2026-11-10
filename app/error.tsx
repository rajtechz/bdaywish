"use client";

import React, { useEffect } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

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
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 text-center text-[#4a0e2e]"
      style={{
        backgroundColor: "#ffd8e4",
        backgroundImage: "radial-gradient(circle at 50% 20%, #ffeaf1 0%, #ffd4e2 50%, #fbcfe8 100%)",
      }}
    >
      <div className="max-w-md w-full p-8 rounded-3xl glass-card-pastel border border-white/90 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center mb-4 text-pink-600">
          <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: "8s" }} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-magenta-gradient mb-2">
          Almost Birthday Time! ✨
        </h1>
        <p className="text-sm text-pink-900/80 mb-6">
          Everything is ready for your special surprise. Tap below to begin!
        </p>
        <button
          onClick={() => reset()}
          className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl border border-white/60 flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Open Surprise ✨</span>
        </button>
      </div>
    </div>
  );
}
