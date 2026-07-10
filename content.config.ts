import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {

    // ── Root pages (currently the D3 homepage) ─────────────────────────────
    pages: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        title: z.string(),

        // Title page (hero)
        kicker: z.string().optional(),
        headingLine1: z.string().optional(),
        headingLine2: z.string().optional(),
        headingAccent: z.string().optional(),
        byline: z.string().optional(),
        imprint: z.string().optional(),

        // Epigraph
        epigraphQuote: z.string().optional(),
        epigraphAttribution: z.string().optional(),

        // Contents (table-of-contents tiles)
        contentsYear: z.string().optional(),
        tiles: z.array(z.object({
          roman: z.string(),
          countBold: z.string(),
          countText: z.string(),
          title: z.string(),
          description: z.string(),
          foot: z.string(),
          to: z.string(),
        })).optional(),

        // Feature (Plate I)
        featureEyebrow: z.string().optional(),
        featureHeading: z.string().optional(),
        featureBody: z.string().optional(),
        featureLinkLabel: z.string().optional(),
        featureLinkTo: z.string().optional(),
        featureImageLabel: z.string().optional(),

        // Closing call-to-action
        ctaEyebrow: z.string().optional(),
        ctaDisplay: z.string().optional(),
        ctaPrimaryLabel: z.string().optional(),
        ctaPrimaryTo: z.string().optional(),
        ctaGhostLabel: z.string().optional(),
        ctaGhostTo: z.string().optional(),
      }),
    }),

  },
})
