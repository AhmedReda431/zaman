// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/_nuxt/assets/img/Logo-zamn.png",
        },
      ],
    },
    // layoutTransition: { name: "page", mode: "out-in" },
  },
  build: {
    transpile: ["@vuepic/vue-datepicker", "@fawmi/vue-google-maps"],
  },
  runtimeConfig: {
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      VITE_NUXT_API_ENDPOINT: process.env.VITE_NUXT_API_ENDPOINT,
    },
  },
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "nuxt-icon",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "nuxt-swiper",
    "@nuxtjs/google-fonts",
    "nuxt-easy-lightbox",
  ],
  googleFonts: {
    families: {
      "Noto Naskh Arabic": {
        wght: [400, 500, 600, 700],
      },
      Tajawal: {
        wght: [400, 500, 600, 700],
      },
      Cairo: {
        wght: [400, 500, 600, 700],
      },
    },
  },
  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "no_prefix", // No language prefix for default locale
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // Redirect to root if no preference is set
      fallbackLocale: "ar", // Fallback to Arabic
    },
    locales: [
      {
        code: "ar",
        iso: "ar-SA",
        name: "Arabic",
        file: "ar-SA.json",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English(US)",
        file: "en-US.json",
      },
    ],
    defaultLocale: "ar", // Default to Arabic
  },

  css: [
    "swiper/swiper-bundle.css",
    "~/assets/css/main.css",
    "@/assets/scss/main.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/variables.scss"; @import "@/assets/scss/mixins.scss"; @import "@/assets/scss/classes.scss"; @import "@/assets/scss/lang.scss";`,
        },
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    devServer: {
      host: "127.0.0.1",
      port: 3000,
    },
  },
});
