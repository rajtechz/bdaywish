"use client";

import React, { useState, useEffect } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import MultiSlideCountdown from "@/components/MultiSlideCountdown";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function BirthdayExperience() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="relative min-h-screen text-[#4a0e2e] overflow-x-hidden selection:bg-pink-400 selection:text-white"
      style={{
        backgroundColor: "#ffd8e4",
        backgroundImage: "radial-gradient(circle at 50% 20%, #ffeaf1 0%, #ffd4e2 50%, #fbcfe8 100%)",
      }}
    >
      {/* Universal Floating Aesthetic Canvas Particles */}
      {mounted && <ParticleBackground />}

      {/* Ambient Pastel Glows matching screenshots */}
      <div className="fixed top-0 left-1/4 w-[35rem] h-[35rem] rounded-full bg-pink-300/25 blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[35rem] h-[35rem] rounded-full bg-rose-300/25 blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-purple-200/20 blur-[180px] pointer-events-none z-0" />

      {/* The Multi-Slide One-Click Countdown Experience with Cinematic Curtains */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <ErrorBoundary fallbackTitle="Birthday Countdown Surprise">
          <MultiSlideCountdown />
        </ErrorBoundary>
      </div>
    </main>
  );
}
