import { appDescription } from './constants/index'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-primevue',
  ],

  primevue: {
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    components: {
      exclude: ['Editor', 'Chart'],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: [
    '@/assets/css/main.css',
    'primeicons/primeicons.css',
    'primevue/resources/themes/aura-light-green/theme.css',
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
