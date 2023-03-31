/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0D2436",
        hover: "#CCCCCC",
        nominee: {
          color: "#009B86",
          hover: "#34AC9C",
        }
      }
    },
  },
  plugins: [],
}
