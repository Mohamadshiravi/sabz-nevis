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
        virgoolBlue: "#107abe",
        virgoolBlueHover: "#0e6aa6",
        virgoolText: "#323232",
      },
    },
  },
  plugins: [],
};
export default config;
