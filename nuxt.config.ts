import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui',
    'unplugin-icons/nuxt',
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

  // nitro: {
  //   devProxy: {
  //     '/api': {
  //       target:'https://104social-front-end.vercel.app',
  //       changeOrigin: true,
  //     },
  //   },
  // },

  vite: {
    plugins: [
      Components({
        resolvers: [IconsResolver({
          prefix: 'icon',
        })],
      }),
      Icons({}),
    ],
    // server: {
    //   proxy: {
    //     '/api': {
    //       target:'https://104social-front-end.vercel.app',
    //       changeOrigin: true,
    //       rewrite: path => path.replace(/^\/api/, ''),
    //     },
    //   },
    // },
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
