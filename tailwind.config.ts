import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "3rem", lg: "4rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        paper: { DEFAULT: "#FAF8F5", 2: "#F2EDE7" },
        forest: { DEFAULT: "#2D5F3E", light: "#3A7A50", deep: "#244D32" },
        sage: "#8B9D77",
        copper: "#C4956A",
        ink: { DEFAULT: "#2C2C2C", 2: "#6B6B6B" },
        rule: "#E0DAD2",
        admin: {
          bg: "#FFFFFF",
          surface: "#F8F9FA",
          border: "#E5E7EB",
          sidebar: "#111827",
          sidebarHover: "#1F2937",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Libre Baskerville", "Georgia", "serif"],
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h2: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h3: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        body: ["1rem", { lineHeight: "1.7" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.06)",
        "card-hover": "0 10px 28px rgba(0,0,0,0.08)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      borderRadius: {
        card: "12px",
      },
      maxWidth: {
        prose: "680px",
        site: "1200px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 400ms cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 40s linear infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
