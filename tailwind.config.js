/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#00D15E',
          50: '#E5FDF0',
          100: '#CCFBE1',
          200: '#99F6C3',
          300: '#66F2A5',
          400: '#33ED86',
          500: '#00D15E',
          600: '#00B04F',
          700: '#008C3F',
          800: '#006B30',
          900: '#004A21',
        },
        mako: {
          50: '#f6f7f9',
          100: '#eceff3',
          200: '#d5dae4',
          300: '#b1bccc',
          400: '#8696ae',
          500: '#647693',
          600: '#4e5c77',
          700: '#404a60',
          800: '#363e4f',
          900: '#232529',
          950: '#1a1c1e',
        },
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}
