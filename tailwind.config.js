/** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
    './assets/**/*.css',
    './assets/**/*.scss',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      maxWidth: {
        'custom-container': '1296px', // 自定義的容器寬度為 1296px
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        notoSansTraditionalChinese: ['Noto Sans Traditional Chinese'],
        lilitaOne: ['Lilita One'],
      },
      height: {
        screen: ['100vh', '100dvh'],
      },
      minHeight: {
        screen: ['100vh', '100dvh'],
      },
      colors: {
        'primary-light': '#E4E4E7',
        'primary-dark': '#F47277',
        'neutral': {
          white: '#FFFFFF',
          100: '#f7fafc',
          200: '#f1f5f9',
          300: '#ebedee',
          400: '#e2e6e9',
          500: '#d9dfe1',
          600: '#c6cbd1',
          700: '#b3b9c3',
          800: '#a0a6ad',
          900: '#8c9299',
        },
        'special': {
          info: '#4A72FF',
          success: '#2CC585',
          warning: '#FFB054',
          danger: '#D65F5F',
        },
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      backgroundImage: {
        'social-gradient-default': 'linear-gradient(to right, #FE839A, #4A72FF)',
        'social-gradient-opacity': 'linear-gradient(to right, #FE839A66, #4A72FF66)',
      },
      boxShadow: {
        '3xl': '0 5px 10px 5px rgba(0, 0, 0,.3)',
        'primary': '0 2px 8px 0px rgba(244, 118, 110, 0.1)',
        'neutral-L1': '0 1px 2px 0 #0000000D',
        'neutral-L2': '0 2px 8px 0 #52525B1A',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
}
