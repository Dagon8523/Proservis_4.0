import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#003B8E',
          'blue-dark': '#001F5B',
          'blue-mid': '#005BB5',
          yellow: '#FFC300',
          'gray-light': '#F5F7FA',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #001F5B 0%, #003B8E 50%, #005BB5 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(0,59,142,0.08) 0%, rgba(0,91,181,0.04) 100%)',
      },
      boxShadow: {
        'premium': '0 4px 24px -4px rgba(0,59,142,0.18), 0 1px 4px rgba(0,59,142,0.08)',
        'premium-hover': '0 8px 40px -8px rgba(0,59,142,0.28), 0 2px 8px rgba(0,59,142,0.12)',
        'yellow': '0 4px 20px -4px rgba(255,195,0,0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-route': 'slideRoute 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        slideRoute: {
          '0%': { strokeDashoffset: '200' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
