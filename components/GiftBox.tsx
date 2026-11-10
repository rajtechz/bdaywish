"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface GiftBoxProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function GiftBox({ isOpen, onOpen }: GiftBoxProps) {
  return (
    <div className="relative flex flex-col items-center justify-center cursor-pointer select-none py-6">
      {/* Radiant Glow Behind Gift Box */}
      <motion.div
        animate={{
          scale: isOpen ? [1, 2.5, 4] : [1, 1.15, 1],
          opacity: isOpen ? [0.6, 1, 0] : [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: isOpen ? 1.5 : 3.5,
          repeat: isOpen ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-pink-500/40 via-gold-400/40 to-lavender-500/40 blur-3xl pointer-events-none"
      />

      {/* Floating Sparkles around Box */}
      {!isOpen && (
        <>
          <motion.div
            animate={{ y: [-10, 10, -10], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-6 text-gold-300 pointer-events-none"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.div>
          <motion.div
            animate={{ y: [10, -10, 10], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute -bottom-2 -right-8 text-pink-300 pointer-events-none"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
          </motion.div>
        </>
      )}

      {/* Main 3D Box Container */}
      <motion.div
        onClick={onOpen}
        whileHover={{ scale: isOpen ? 1 : 1.05 }}
        whileTap={{ scale: isOpen ? 1 : 0.96 }}
        animate={
          isOpen
            ? { scale: [1, 1.1, 0.95], y: 15 }
            : {
                y: [0, -12, 0],
                rotate: [0, 1, -1, 0],
              }
        }
        transition={
          isOpen
            ? { duration: 0.6 }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative z-10 w-52 h-52 sm:w-60 sm:h-60"
        style={{ perspective: 1000 }}
      >
        {/* Burst of Golden Light Beam When Opened */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 0.8, 0], scaleY: [0, 1.5, 2] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-48 h-80 bg-gradient-to-t from-gold-300 via-gold-100 to-transparent blur-xl pointer-events-none"
          />
        )}

        {/* Gift Box Lid */}
        <motion.div
          animate={
            isOpen
              ? {
                  y: -110,
                  rotateX: -45,
                  rotateZ: -15,
                  opacity: 0,
                }
              : { y: 0, rotateX: 0, rotateZ: 0, opacity: 1 }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-6 left-1/2 -translate-x-1/2 w-[108%] h-16 sm:h-18 z-20"
        >
          {/* Lid Top Layer */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-r from-blush-500 via-pink-400 to-blush-600 shadow-2xl border-t border-pink-200/40 flex items-center justify-center overflow-hidden">
            {/* Shimmer reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-transparent" />

            {/* Golden Ribbon on Lid */}
            <div className="absolute inset-x-0 h-4 bg-gradient-to-r from-gold-400 via-gold-200 to-gold-500 shadow-md border-y border-gold-100/50" />
            <div className="absolute inset-y-0 w-5 bg-gradient-to-b from-gold-400 via-gold-200 to-gold-500 shadow-md border-x border-gold-100/50" />

            {/* Glowing Champagne Gold Ribbon Bow */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center">
              {/* Left loop */}
              <div className="w-8 h-8 rounded-full border-4 border-gold-300 bg-gradient-to-br from-gold-200 to-gold-500 rotate-[-25deg] -mr-2 shadow-lg" />
              {/* Center knot */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gold-100 via-gold-300 to-gold-600 shadow-md z-10 border border-gold-100" />
              {/* Right loop */}
              <div className="w-8 h-8 rounded-full border-4 border-gold-300 bg-gradient-to-bl from-gold-200 to-gold-500 rotate-[25deg] -ml-2 shadow-lg" />
            </div>
          </div>
        </motion.div>

        {/* Gift Box Base */}
        <div className="absolute bottom-2 inset-x-0 h-36 sm:h-44 rounded-2xl bg-gradient-to-b from-blush-600 via-pink-600 to-purple-900 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-pink-300/30 overflow-hidden flex items-center justify-center">
          {/* Luxury satin finish gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />

          {/* Golden Vertical Ribbon on Box */}
          <div className="absolute inset-y-0 w-6 bg-gradient-to-r from-gold-400 via-gold-200 to-gold-500 shadow-lg border-x border-gold-100/40" />

          {/* Golden Horizontal Ribbon on Box */}
          <div className="absolute inset-x-0 h-5 bg-gradient-to-b from-gold-400 via-gold-200 to-gold-500 shadow-lg border-y border-gold-100/40" />

          {/* Subtle Monogram or Heart Badge */}
          <div className="relative z-10 w-9 h-9 rounded-full bg-midnight-950/80 border border-gold-300/80 flex items-center justify-center shadow-lg">
            <span className="text-gold-200 text-xs font-serif font-bold tracking-wider">M</span>
          </div>
        </div>

        {/* Shadow Beneath Gift Box */}
        <motion.div
          animate={{
            scale: isOpen ? 0.7 : [1, 0.88, 1],
            opacity: isOpen ? 0.2 : [0.45, 0.25, 0.45],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-44 h-8 rounded-full bg-black/60 blur-md pointer-events-none"
        />
      </motion.div>
    </div>
  );
}

