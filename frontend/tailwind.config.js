/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', 'html:not(.light-mode)'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0a0f18',
          900: '#101726',
          850: '#151e2e',
          800: '#1b2639',
          750: '#222f45',
          700: '#2a3b54',
          600: '#384d6b',
        },
        forest: {
          950: '#040e08',
          900: '#071610',
          850: '#0a1c14',
          800: '#0d2318',
          750: '#10291e',
          700: '#143024',
          600: '#1a3d2e',
          500: '#22513d',
          400: '#2d6b52',
        },
        gold: {
          300: '#f0d98a',
          400: '#e8c76a',
          500: '#d4a528',
          600: '#c5922a',
          700: '#a87820',
        },
        teal: {
          accent: '#2a7c6b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-forest': 'linear-gradient(135deg, #040e08 0%, #0d2318 50%, #143024 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(13,35,24,0.0) 0%, rgba(13,35,24,0.8) 100%)',
      },
      maxWidth: {
        '8xl': '1440px',
      },
    },
  },
  plugins: [],
}
