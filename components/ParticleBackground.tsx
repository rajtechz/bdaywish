"use client";

import React, { useEffect, useRef } from "react";

interface ParticleItem {
  type: "petal" | "heart" | "flower" | "star" | "gold";
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const petalColors = ["#ffd1dc", "#fcaebb", "#f78198", "#ffccd5", "#fff0f3"];
    const heartColors = ["#ee5778", "#f78198", "#ff4d6d", "#ffd1dc"];
    const flowerColors = ["#fcaebb", "#ffd1dc", "#e9ddfc", "#ffffff"];

    const particles: ParticleItem[] = [];

    // Rose petals
    for (let i = 0; i < 24; i++) {
      particles.push({
        type: "petal",
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 8,
        speedX: (Math.random() - 0.3) * 0.8,
        speedY: Math.random() * 1.0 + 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.4 + 0.3,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    // Floating hearts
    for (let i = 0; i < 16; i++) {
      particles.push({
        type: "heart",
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 8,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -Math.random() * 0.8 - 0.3, // gently floating upwards
        rotation: (Math.random() - 0.5) * 30,
        rotationSpeed: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.4 + 0.25,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
      });
    }

    // Floating flowers
    for (let i = 0; i < 12; i++) {
      particles.push({
        type: "flower",
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 10,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: Math.random() * 0.8 + 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.4 + 0.3,
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
      });
    }

    // Twinkling stars
    for (let i = 0; i < 50; i++) {
      particles.push({
        type: "star",
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.6,
        speedX: 0,
        speedY: 0,
        rotation: 0,
        rotationSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        opacity: Math.random(),
        color: "#ffffff",
      });
    }

    // Golden dust
    for (let i = 0; i < 35; i++) {
      particles.push({
        type: "gold",
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: -Math.random() * 0.7 - 0.2,
        rotation: 0,
        rotationSpeed: 0,
        opacity: Math.random() * 0.6 + 0.2,
        color: "#e3cb73",
      });
    }

    // Draw functions
    const drawPetal = (p: ParticleItem) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size);
      ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.shadowColor = "#fcaebb";
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();
    };

    const drawHeart = (p: ParticleItem) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(p.size / 15, p.size / 15);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
      ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.shadowColor = "#ff4d6d";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    };

    const drawFlower = (p: ParticleItem) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      const numPetals = 5;
      for (let i = 0; i < numPetals; i++) {
        ctx.beginPath();
        ctx.ellipse(0, p.size / 2, p.size / 4, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.rotate((Math.PI * 2) / numPetals);
      }
      // Center
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd966";
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (p.type === "star") {
          p.opacity += p.rotationSpeed;
          if (p.opacity <= 0.1 || p.opacity >= 0.9) {
            p.rotationSpeed = -p.rotationSpeed;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
          ctx.shadowColor = "#e9ddfc";
          ctx.shadowBlur = 5;
          ctx.fill();
        } else if (p.type === "gold") {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.y < 0) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = "#e3cb73";
          ctx.globalAlpha = p.opacity;
          ctx.shadowColor = "#d9b345";
          ctx.shadowBlur = 6;
          ctx.fill();
        } else if (p.type === "petal") {
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.y * 0.01) * 0.4;
          p.rotation += p.rotationSpeed;
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          drawPetal(p);
        } else if (p.type === "heart") {
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.y * 0.02) * 0.3;
          p.rotation += p.rotationSpeed;
          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          drawHeart(p);
        } else if (p.type === "flower") {
          p.y += p.speedY;
          p.x += p.speedX + Math.cos(p.y * 0.015) * 0.5;
          p.rotation += p.rotationSpeed;
          if (p.y > height + 25) {
            p.y = -25;
            p.x = Math.random() * width;
          }
          drawFlower(p);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.9 }}
    />
  );
}
