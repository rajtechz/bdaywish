import React from "react";
import { Sparkles, Heart } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen text-[#4a0e2e]"
      style={{
        backgroundColor: "#ffd8e4",
        backgroundImage: "radial-gradient(circle at 50% 20%, #ffeaf1 0%, #ffd4e2 50%, #fbcfe8 100%)",
      }}
    >
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 rounded-full glass-player flex items-center justify-center text-pink-600 shadow-xl mb-4">
          <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: "3s" }} />
        </div>

        <h2 className="text-xl font-serif font-bold text-magenta-gradient mb-2 tracking-wide">
          Preparing The Countdown...
        </h2>

        <div className="flex items-center gap-2 text-xs text-pink-600 uppercase tracking-widest font-semibold">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-ping" />
          <span>Almost ready</span>
        </div>
      </div>
    </div>
  );
}
