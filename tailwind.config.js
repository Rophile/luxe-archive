/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#F5F5DC",
        taro: {
          light: "#D2B4DE",
          DEFAULT: "#A569BD",
          dark: "#4A3B4F",
        },
      },
    },
  },
  plugins: [],
}