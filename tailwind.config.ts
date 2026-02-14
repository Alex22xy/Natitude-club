/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Renamed to kebab-case to match standard Tailwind style
        'natitude-black': "#000000",
        'natitude-gray': "#18181B",
        'natitude-pink': "#FF00FF", 
      },
      // Adding this makes replicating the navigation and headers MUCH easier
      letterSpacing: {
        'widest-club': '0.3em',
        'brutal': '0.5em',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}