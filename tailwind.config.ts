import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff5f7",
          100: "#ffe8ed",
          200: "#ffd1dc",
          300: "#fcaebb",
          400: "#f78198",
          500: "#ee5778",
          600: "#dc365d",
        },
        lavender: {
          50: "#faf7fe",
          100: "#f3edfd",
          200: "#e9ddfc",
          300: "#d7c1fa",
          400: "#be98f5",
          500: "#a56fef",
          600: "#8e49e2",
        },
        gold: {
          50: "#fbf9ed",
          100: "#f7f1d4",
          200: "#eee1a7",
          300: "#e3cb73",
          400: "#d9b345",
          500: "#c79a29",
          600: "#9e741c",
        },
        midnight: {
          900: "#0c0714",
          950: "#07030b",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
