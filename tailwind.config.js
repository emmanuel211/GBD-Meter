/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#FDF2F6',
          100: '#FBE0EB',
          200: '#F5B9D2',
          300: '#ED8AB2',
          400: '#E25690',
          500: '#D13272',
          600: '#B81F5F',
          700: '#96184C',
          800: '#78143D',
          900: '#5C1130',
          950: '#390A1D',
        },
        navy: {
          50: '#EEF1FA',
          100: '#DCE2F2',
          200: '#B9C4E3',
          300: '#8E9FCB',
          400: '#6578A8',
          500: '#46598B',
          600: '#324070',
          700: '#1F2E58',
          800: '#111C46',
          900: '#0A0E30',
          950: '#050718',
        },
        cream: {
          50: '#FBF8F4',
          100: '#F4EEE6',
          200: '#EAE1D2',
          300: '#DACBAE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Barlow Condensed"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
    },
  },
  plugins: [],
}
