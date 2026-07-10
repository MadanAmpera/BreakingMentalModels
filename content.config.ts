import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// ── Reusable schema fragments (shared across section pages) ────────────────
const hero = z.object({
  roman: z.string().optional(),
  heading: z.string().optional(),
  headingAccent: z.string().optional(),
  lede: z.string().optional(),
  meta: z.array(z.object({ lab: z.string(), val: z.string() })).optional(),
}).optional()

const cta = z.object({
  eyebrow: z.string().optional(),
  display: z.string().optional(),
  displayMax: z.string().optional(),
  primaryLabel: z.string().optional(),
  primaryTo: z.string().optional(),
  ghostLabel: z.string().optional(),
  ghostTo: z.string().optional(),
}).optional()

const chapterNav = z.object({
  prev: z.object({ to: z.string(), title: z.string(), label: z.string().optional() }).optional(),
  next: z.object({ to: z.string(), title: z.string(), label: z.string().optional() }).optional(),
}).optional()

const chapterIndex = z.object({
  label: z.string().optional(),
  count: z.string().optional(),
  rows: z.array(z.object({
    rn: z.string(),
    to: z.string(),
    title: z.string(),
    desc: z.string(),
    count: z.string().optional(),
    unit: z.string().optional(),
  })).optional(),
}).optional()

export default defineContentConfig({
  collections: {

    // ── Root pages (D3 homepage) ───────────────────────────────────────────
    pages: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        title: z.string(),
        kicker: z.string().optional(),
        headingLine1: z.string().optional(),
        headingLine2: z.string().optional(),
        headingAccent: z.string().optional(),
        byline: z.string().optional(),
        imprint: z.string().optional(),
        epigraphQuote: z.string().optional(),
        epigraphAttribution: z.string().optional(),
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
        featureEyebrow: z.string().optional(),
        featureHeading: z.string().optional(),
        featureBody: z.string().optional(),
        featureLinkLabel: z.string().optional(),
        featureLinkTo: z.string().optional(),
        featureImageLabel: z.string().optional(),
        ctaEyebrow: z.string().optional(),
        ctaDisplay: z.string().optional(),
        ctaPrimaryLabel: z.string().optional(),
        ctaPrimaryTo: z.string().optional(),
        ctaGhostLabel: z.string().optional(),
        ctaGhostTo: z.string().optional(),
      }),
    }),

    // ── About (Chapter I): landing + biography, cv, experience, awards ─────
    about: defineCollection({
      type: 'page',
      source: 'about/**/*.md',
      schema: z.object({
        title: z.string(),
        hero,
        cta,
        chapterNav,
        chapterIndex,
        // Landing: portrait split + journey strip
        portrait: z.object({
          eyebrow: z.string().optional(),
          heading: z.string().optional(),
          headingEm: z.string().optional(),
          paragraphs: z.array(z.string()).optional(),
          signature: z.string().optional(),
          imageLabel: z.string().optional(),
        }).optional(),
        journey: z.array(z.object({
          place: z.string(),
          year: z.string(),
          what: z.string(),
        })).optional(),
      }),
    }),

  },
})
