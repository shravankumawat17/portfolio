/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cinema: {
          950: '#050507',
          900: '#0a0a0e',
          850: '#0f0f14',
          800: '#14141c',
          700: '#1e1e28',
          600: '#2c2c3b',
          gold: '#d4af37',
          'gold-light': '#f3e5ab',
          red: '#c81d2c',
          'red-bright': '#e50914',
          blue: '#3b6ea5',
          teal: '#2fa89a',
          purple: '#8a6fd4',
        }
      },
      animation: {
        'film-flicker': 'flicker 0.15s infinite',
        'subtle-pulse': 'subtlePulse 3s ease-in-out infinite',
        'slow-spin': 'spin 20s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 0.98 },
          '50%': { opacity: 0.94 },
        },
        subtlePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
          '50%': { transform: 'scale(1.03)', opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
