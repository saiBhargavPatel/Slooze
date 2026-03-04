import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        slateBrand: {
          50: "#f8fafc",
          100: "#f1f5f9",
          500: "#0f766e",
          600: "#115e59",
          700: "#134e4a"
        }
      }
    }
  },
  plugins: []
};

export default config;
