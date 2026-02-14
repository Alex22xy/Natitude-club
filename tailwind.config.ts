// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        natitudeBlack: "#000000",
        natitudeGray: "#18181B",
        natitudePink: "#FF00FF", // The "Action" color
      },
      borderWidth: {
        '3': '3px', // For that heavy brutalist border look
      }
    },
  },
  plugins: [],
}