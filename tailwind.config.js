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
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      xxl: '1320px',
      // => @media (min-width: 1320px) { ... }
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '12px',
        },
      },
      gridTemplateColumns: {
        12: 'repeat(12, minmax(0, 86px))',
      },
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
        'primary-light': '#FFF5F5',
        'primary-dark': '#F47277',
        'neutral': {
          white: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#E4E4E7',
          400: '#A1A1AA',
          500: '#18181B',
          600: '#09090B',
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
