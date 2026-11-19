/** @type {import('tailwindcss').Config} */
const mocha = {
  50: '#FAF7F2',
  100: '#F2ECE3',
  200: '#E7DCCB',
  300: '#D7C4AB',
  400: '#BFA184',
  500: '#9F7D5E',
  600: '#806147',
  700: '#634B37',
  800: '#49382B',
  900: '#35291F',
  950: '#241B15',
};

const coral = {
  50: '#FFF1ED',
  100: '#FFE2D9',
  200: '#FFC4B5',
  300: '#FFA08A',
  400: '#FF8065',
  500: '#F86449',
  600: '#E94B34',
  700: '#C63B2D',
  800: '#9F3028',
  900: '#75251F',
  950: '#421612',
};

const sunshine = {
  50: '#FFFBE8',
  100: '#FFF4C1',
  200: '#FFE88B',
  300: '#FFDA52',
  400: '#FFD029',
  500: '#FFC21C',
  600: '#E5A900',
  700: '#B88200',
  800: '#835A00',
  900: '#5A3E00',
  950: '#382600',
};

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: mocha,
        brand: {
          blue: coral[600],
          green: mocha[600],
          amber: sunshine[500],
          red: coral[600],
          indigo: sunshine[600],
        },
        white: '#FFFCF7',
        slate: mocha,
        blue: coral,
        red: coral,
        indigo: sunshine,
        amber: sunshine,
        emerald: mocha,
        purple: mocha,
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(233, 75, 52, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(233, 75, 52, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(233, 75, 52, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
