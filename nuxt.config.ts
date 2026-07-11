// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    'nuxt-studio',
  ],

  // Global design system (ported from the Prototype1 design)
  css: [
    '~/assets/css/bmm.css',
    '~/assets/css/bmm-site.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      script: [
        {
          // Pre-paint theme application — mirrors the design's inline <head> snippet.
          // Applies the saved theme before first paint to avoid a flash of the wrong theme.
          innerHTML:
            "(function(){try{var t=localStorage.getItem('bmm-theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();",
          tagPosition: 'head',
        },
      ],
    },
  },

  nitro: {
    // Cloudflare Pages deployment (Nitro preset). autoSubfolderIndex:false so
    // Cloudflare's route matching serves /about/ style routes correctly.
    preset: 'cloudflare_pages',
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  content: {
    // Local dev uses better-sqlite3; production on Cloudflare uses a D1
    // database bound as "DB" (create it in the Cloudflare dashboard).
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
    renderer: {
      // The design's prose headings are plain text, not links. Disable the
      // auto-generated <a> anchor inside every heading so h3/h4 don't render
      // as orange hyperlinks (e.g. the "§ III — …" kickers in the biography).
      anchorLinks: false,
    },
  },

  studio: {
    // GitHub repository backing the CMS (Nuxt Studio commits content here).
    repository: {
      provider: 'github',
      owner: 'MadanAmpera',
      repo: 'BreakingMentalModels',
      branch: 'main',
    },
  },
})
