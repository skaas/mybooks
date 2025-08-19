/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bar-dark': '#1a1a1a',
        'bar-wood': '#2d1810',
        'bar-gold': '#d4af37',
        'bar-amber': '#ffb84d',
        'bar-warm': '#3a2f2a',
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slow-glow': 'slowGlow 8s ease-in-out infinite alternate',
        'gentle-pulse': 'gentlePulse 12s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)' },
        },
        slowGlow: {
          '0%': { 
            opacity: '0.02',
            transform: 'scale(0.95)',
          },
          '50%': {
            opacity: '0.05',
            transform: 'scale(1.02)',
          },
          '100%': { 
            opacity: '0.02',
            transform: 'scale(0.98)',
          },
        },
        gentlePulse: {
          '0%': { 
            opacity: '0.01',
            transform: 'scale(1) rotate(0deg)',
          },
          '25%': {
            opacity: '0.03',
            transform: 'scale(1.01) rotate(0.3deg)',
          },
          '50%': {
            opacity: '0.025',
            transform: 'scale(0.99) rotate(0deg)',
          },
          '75%': {
            opacity: '0.035',
            transform: 'scale(1.005) rotate(-0.3deg)',
          },
          '100%': { 
            opacity: '0.01',
            transform: 'scale(1) rotate(0deg)',
          },
        }
      }
    },
  },
  plugins: [],
}
