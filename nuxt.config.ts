// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image'
  ],

  // Runtime config for environment variables
  // Use NUXT_ prefix in .env files (e.g., NUXT_CONTENTFUL_SPACE_ID)
  runtimeConfig: {
    contentfulSpaceId: '',
    contentfulAccessToken: '',
    contentfulPreviewAccessToken: '',
    contentfulPreviewSecret: '',
    contentfulRevalidateSecret: '',
  },

  // Enable SSR
  ssr: true,

  // Image configuration for Contentful
  image: {
    domains: ['images.ctfassets.net', 'videos.ctfassets.net'],
  },


  // App configuration
  app: {
    head: {
      title: 'Mihai Peteu - Los Angeles-based Software Engineer',
      meta: [
        { name: 'description', content: 'Software Designer/Developer specializing in Vue.js, React, Typescript and Node' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Route rules for caching/revalidation (ISR-like behavior)
  routeRules: {
    '/': { isr: 3600 },
    '/p/**': { isr: 3600 }
  },

  // CSS/SCSS
  css: ['@/assets/css/main.scss']
})
