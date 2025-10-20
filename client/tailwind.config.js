/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // blue-600
        secondary: "#1e293b", // slate-800
        accent: "#f97316",    // orange-500
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
