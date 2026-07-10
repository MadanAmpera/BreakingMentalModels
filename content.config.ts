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
        featureImage: z.string().optional(),
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
          image: z.string().optional(),
        }).optional(),
        journey: z.array(z.object({
          place: z.string(),
          year: z.string(),
          what: z.string(),
        })).optional(),

        // Scaffold "client to confirm" banner (editable; client can clear it)
        banner: z.string().optional(),

        // Biography essay opener (prose lives in the markdown body)
        essay: z.object({
          backLabel: z.string().optional(),
          kick: z.string().optional(),
          heading: z.string().optional(),
          headingEm: z.string().optional(),
          dek: z.string().optional(),
          author: z.string().optional(),
          readTime: z.string().optional(),
          updated: z.string().optional(),
          heroImageLabel: z.string().optional(),
          image: z.string().optional(),
        }).optional(),

        // CV: video intro + record grid + download bar
        intro: z.object({
          videoLabel: z.string().optional(),
          image: z.string().optional(),
          eyebrow: z.string().optional(),
          heading: z.string().optional(),
          paragraphs: z.array(z.string()).optional(),
          meta: z.array(z.string()).optional(),
        }).optional(),
        cvSections: z.array(z.object({
          title: z.string(),
          items: z.array(z.object({
            yr: z.string(),
            title: z.string(),
            where: z.string().optional(),
          })),
        })).optional(),
        downloadBar: z.object({
          label: z.string().optional(),
          links: z.array(z.object({ label: z.string(), to: z.string() })),
        }).optional(),

        // Experience: current projects grid + past timeline
        currentHead: z.object({ rn: z.string(), title: z.string() }).optional(),
        projects: z.array(z.object({
          stat: z.string(),
          title: z.string(),
          tags: z.string().optional(),
          body: z.string().optional(),
          with: z.string().optional(),
        })).optional(),
        roadHead: z.object({ rn: z.string(), title: z.string() }).optional(),
        timeline: z.array(z.object({
          when: z.string(),
          title: z.string(),
          where: z.string().optional(),
          body: z.string().optional(),
          active: z.boolean().optional(),
        })).optional(),

        // Awards: stat grid + grouped honours
        stats: z.array(z.object({
          n: z.string(),
          nAccent: z.string().optional(),
          lab: z.string(),
        })).optional(),
        awardGroups: z.array(z.object({
          title: z.string(),
          meta: z.string().optional(),
          items: z.array(z.object({
            yr: z.string(),
            title: z.string(),
            where: z.string().optional(),
            badge: z.string().optional(),
          })),
        })).optional(),
        footNote: z.object({
          text: z.string(),
          linkLabel: z.string().optional(),
          linkTo: z.string().optional(),
        }).optional(),
      }),
    }),

  },
})
