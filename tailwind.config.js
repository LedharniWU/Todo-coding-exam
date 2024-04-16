/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor" : '#0D1117',
        "columnBackgroundColor": '#161C22'
      }
    },
  },
  plugins: [],
}

