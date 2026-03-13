// tailwind.config.js
// Used if you switch from CDN to a local Tailwind build (npm run build:css)

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,html}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eefff7',
          100: '#d7fff0',
          200: '#b2ffe3',
          300: '#76ffcb',
          400: '#33f5ac',
          500: '#09de8e',
          600: '#00b872',
          700: '#00925d',
          800: '#03724b',
          900: '#045d3e',
          950: '#013424',
        },
        surface: {
          900: '#070b0f',
          800: '#0d1117',
          700: '#161b22',
          600: '#21262d',
          500: '#2d333b',
        }
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        }
      },
    }
  },
  plugins: [],
}
