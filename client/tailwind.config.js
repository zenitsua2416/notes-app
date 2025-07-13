import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      maxWidth: {
        app: "var(--app-size)",
      },
      width: {
        app: "var(--app-size)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui(),
    function ({ addBase }) {
      addBase({
        ":root": {
          "--app-size": "1024px",
        },
      });
    },
  ],
};
