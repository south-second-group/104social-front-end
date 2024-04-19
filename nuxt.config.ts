import { appDescription } from './constants/index'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: [
    '@/assets/css/main.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  pinia: {
    storesDirs: ['./store/**'],
  },

  build: {
    transpile: ['@headlessui/vue'],
  },

  app: {
    head: {
      meta: [
        { name: 'description', content: appDescription },
      ],
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        // types: [],
      },
    },
  },
})
