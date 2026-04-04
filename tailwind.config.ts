import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: "#bfff00",
          bright: "#d4ff4d",
          muted: "#99cc00",
        },
        emerald: {
          DEFAULT: "#00a86b",
          light: "#00cc88",
          dark: "#007a4d",
        },
        forest: {
          DEFAULT: "#0a1f0a",
          deep: "#050f05",
        },
        neutral: {
          light: "#f0f2f0",
          mid: "#c8ccc8",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "clamp(3rem, 8vw, 6rem)",
        container: "clamp(1rem, 4vw, 2rem)",
      },
      borderRadius: {
        DEFAULT: "0",
        sm: "0",
        md: "0",
        lg: "0",
        full: "0",
      },
      borderColor: {
        DEFAULT: "#00a86b",
      },
    },
  },
  plugins: [],
};

export default config;
