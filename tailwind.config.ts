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
        myGreen: {
          600: "#059669",
          700: "#047857",
        },
        myText: {
          200: "#fafafa",
          400: "#a2a2a2",
          500: "#8e8e8e",
          600: "#6e6e6e",
          800: "#323232",
        },
        darkColor: {
          600: "#2c2c2c",
          700: "#222222",
          800: "#1a1a1a",
        },
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
export default config;
