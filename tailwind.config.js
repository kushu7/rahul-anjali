/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-ebony': '#010f24',
        'silk-cream': '#f9f5ec',
        'romantic-red': '#b81424',
        'gold-leaf': '#f2c86c',
        'gold-muted': '#c9a14a',
        'midnight-blue': '#0a1733',
        'royal-blue': '#14234a',
      },
      fontFamily: {
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Great Vibes"', 'cursive'],
        handwritten: ['"Allura"', 'cursive'],
        garamond: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        'romantic': '0 10px 40px -10px rgba(184, 20, 36, 0.4)',
        'gold-glow': '0 0 25px rgba(242, 200, 108, 0.45)',
        'envelope': '0 24px 50px -12px rgba(0,0,0,0.65)',
      }
    },
  },
  plugins: [],
}

