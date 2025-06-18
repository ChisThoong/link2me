import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",
        secondary: "#a78bfa",
        accent: "#f472b6",
        muted: "#e0e7ff",
        background: "#0e0f1d",
        foreground: "#ffffff",
        border: "#2e2f41",
      },
      keyframes: {
        buzz: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
        },
        wobble: {
          "0%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-3px)" },
          "75%": { transform: "translateY(3px)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        buzz: "buzz 0.3s linear infinite",
        wobble: "wobble 0.5s ease-in-out infinite",
        pop: "pop 0.6s ease-in-out infinite",
        blink: "blink 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
