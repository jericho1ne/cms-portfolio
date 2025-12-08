// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image'
  ],

  // Runtime config for environment variables
  runtimeConfig: {
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
    contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    contentfulPreviewAccessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    contentfulPreviewSecret: process.env.CONTENTFUL_PREVIEW_SECRET,
    contentfulRevalidateSecret: process.env.CONTENTFUL_REVALIDATE_SECRET,
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
