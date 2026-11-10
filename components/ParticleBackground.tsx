"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
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

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  alpha: number;
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

    // Rose petals
    const petalColors = ["#ffd1dc", "#fcaebb", "#f78198", "#ffccd5", "#fff0f3"];
    const petals: Petal[] = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 8,
      speedX: (Math.random() - 0.3) * 0.8,
      speedY: Math.random() * 1.2 + 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    // Twinkling stars
    const stars: Star[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random(),
      alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
    }));

    // Golden dust particles
    const goldParticles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: -Math.random() * 0.8 - 0.2, // Drifting upwards
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const drawPetal = (p: Petal) => {
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

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.alpha += star.alphaSpeed;
        if (star.alpha <= 0.1 || star.alpha >= 0.9) {
          star.alphaSpeed = -star.alphaSpeed;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
        ctx.shadowColor = "#e9ddfc";
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      // Render golden dust
      goldParticles.forEach((gp) => {
        gp.x += gp.speedX;
        gp.y += gp.speedY;
        if (gp.y < 0) {
          gp.y = height + 10;
          gp.x = Math.random() * width;
        }
        if (gp.x < 0) gp.x = width;
        if (gp.x > width) gp.x = 0;

        ctx.beginPath();
        ctx.arc(gp.x, gp.y, gp.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#e3cb73";
        ctx.globalAlpha = gp.alpha;
        ctx.shadowColor = "#d9b345";
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      // Render rose petals
      petals.forEach((petal) => {
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }
        drawPetal(petal);
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
      style={{ opacity: 0.85 }}
    />
  );
}
