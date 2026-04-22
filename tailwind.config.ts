import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

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
        navy: {
          50: '#E8EDF5',
          100: '#C5D1E5',
          200: '#9AAED1',
          300: '#6E8DBD',
          400: '#4E74AE',
          500: '#2E5B9F',
          600: '#1E4A8E',
          700: '#163A70',
          800: '#0E2952',
          900: '#0A2240',
          950: '#061529',
        },
        gold: {
          50: '#FBF7EC',
          100: '#F4EACF',
          200: '#ECD9A3',
          300: '#E2C572',
          400: '#D9B347',
          500: '#C9A84C',
          600: '#B8932A',
          700: '#9A7B1E',
          800: '#7E6318',
          900: '#665012',
          950: '#3D3009',
        },
        cream: {
          50: '#FDFCFA',
          100: '#F8F6F1',
          200: '#F0ECE2',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        serif: ['var(--font-playfair)', ...fontFamily.serif],
        arabic: ['var(--font-noto-kufi)', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A2240 0%, #163A70 50%, #0E2952 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E2C572 50%, #B8932A 100%)',
        'section-gradient': 'linear-gradient(180deg, #F8F6F1 0%, #FDFCFA 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'pulse-gold': 'pulseGold 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201, 168, 76, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(10, 34, 64, 0.08)',
        'card-hover': '0 12px 40px rgba(10, 34, 64, 0.16)',
        'gold': '0 4px 20px rgba(201, 168, 76, 0.3)',
        'gold-hover': '0 8px 30px rgba(201, 168, 76, 0.5)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#111827',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
