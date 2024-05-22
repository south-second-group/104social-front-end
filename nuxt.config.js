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
    '@nuxtjs/google-fonts',
    '@nuxt/image',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: [
    '@/assets/css/base.css',
    '@/assets/css/utils.css',
    '@/assets/css/btn.css',
    '@/assets/css/font.css',
  ],

  colorMode: {
    preference: 'light',
  },

  pinia: {
    storesDirs: ['./store/**'],
  },

  build: {
    transpile: ['@headlessui/vue'],
  },

  app: {
    head: {
      meta: [{ name: 'description', content: appDescription }],
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
        resolvers: [
          IconsResolver({
            prefix: 'icon',
          }),
        ],
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
    vue: {
      script: {
        defineModel: true,
      },
    },
  },

  typescript: {
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        strict: true,
        // types: [],
      },
    },
  },

  googleFonts: {
    families: {
      'Lilita One': true,
      'Montserrat': true,
      'Noto Sans Traditional Chinese': true,
    },
  },

  devServer: {
    port: 3000,
  },
})
