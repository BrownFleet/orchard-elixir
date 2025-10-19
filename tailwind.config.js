/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // ✅ only scan pages and components in app
    "!./ui/**/*",                   // 🚫 exclude heavy UI folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
