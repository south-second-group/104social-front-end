import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'
import {
  appDescription,
} from './constants/index'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  modules: [
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui',
    'unplugin-icons/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'nuxt-simple-sitemap',
    'nuxt-easy-lightbox',
  ],
  sitemap: {
    xsl: false,
  },
  site: {
    url: process.env.BASE_API_URL,
  },

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

  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            customPrimary: {
              100: '#FFF5F5',
              500: '#F47277',
            },
          },
        },
      },
    },
  },

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
      meta: [{
        name: 'description',
        content: appDescription,
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, user-scalable=no',
      }],
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
  nitro: {
    experimental: {
      websocket: true,
    },
  },

  vite: {
    optimizeDeps: {
      include: ['socket.io-client'],
    },
    define: {
      'process.env': process.env,
    },
    plugins: [
      Components({
        resolvers: [
          IconsResolver({
            prefix: 'icon',
          }),
        ],
      }),
      Icons({}),
      ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
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
