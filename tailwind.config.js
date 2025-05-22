/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        logo: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        fadeInSlow: 'fadeIn 1.2s ease-out forwards',
        fadeInUp: 'fadeUp 0.6s ease-out forwards',
        slideInLeft: 'slideLeft 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
  
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
