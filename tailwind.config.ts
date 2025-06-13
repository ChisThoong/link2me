import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
        colors: {
            primary: "#7c3aed",         // tím indigo đẹp (nút chính)
            secondary: "#a78bfa",       // tím sáng (nội dung phụ, heading)
            accent: "#f472b6",          // hồng pastel nhẹ (nhấn CTA, chữ nổi bật)
            muted: "#e0e7ff",           // nền nhẹ sáng (gray-tím)
            background: "#0e0f1d",      // màu nền dark mode mặc định
            foreground: "#ffffff",      // chữ chính dark mode
            border: "#2e2f41",          // đường viền dark
        },
    },
  },
  plugins: [],
};

export default config;
