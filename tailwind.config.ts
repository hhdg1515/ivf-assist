import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E91E63",
        secondary: "#9C27B0",
        accent: "#00BCD4",
        background: "#FFF5F8",
        surface: "#FFFFFF",
        text: "#37474F",
        "text-secondary": "#78909C",
        "mood-great": "#4CAF50",
        "mood-ok": "#FFC107",
        "mood-bad": "#FF9800",
        "mood-terrible": "#F44336",
      },
    },
  },
  plugins: [],
};
export default config;
