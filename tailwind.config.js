/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Fredoka One', 'cursive'],
        'body': ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        primary: '#B8A9E6',
        secondary: '#9ED5C5',
        accent: '#FFB5BA',
        surface: '#F8F6FF',
        background: '#FDFCFF',
        success: '#95D5B2',
        warning: '#FFD6A5',
        error: '#FFB5BA',
        info: '#A8DADC'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}