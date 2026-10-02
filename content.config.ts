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
  displayAccent: z.string().optional(),
  displayMax: z.string().optional(),
  lead: z.string().optional(),
  primaryLabel: z.string().optional(),
  primaryTo: z.string().optional(),
  ghostLabel: z.string().optional(),
  ghostTo: z.string().optional(),
  ghostLinks: z.array(z.object({ label: z.string(), to: z.string().optional() })).optional(),
}).optional()

// Section heading (roman rn + title, optional lead + anchor id) — reused a lot.
const secHead = z.object({
  rn: z.string(),
  heading: z.string(),
  lead: z.string().optional(),
  id: z.string().optional(),
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

    // ── Work With Me (Chapter IV): landing + services, engagement, book ─────
    workwithme: defineCollection({
      type: 'page',
      source: 'work-with-me/**/*.md',
      schema: z.object({
        title: z.string(),
        hero,
        cta,
        chapterNav,
        chapterIndex,
        banner: z.string().optional(),

        // Landing: intro sections, ice→water thesis, variables, four domains
        secA: z.object({ rn: z.string(), heading: z.string(), lead: z.string().optional() }).optional(),
        secB: z.object({ rn: z.string(), heading: z.string(), lead: z.string().optional() }).optional(),
        secC: z.object({ rn: z.string(), heading: z.string(), lead: z.string().optional() }).optional(),
        thesis: z.object({
          imageLabel: z.string().optional(),
          image: z.string().optional(),
          eyebrow: z.string().optional(),
          headingPre: z.string().optional(),
          headingEm: z.string().optional(),
          headingPost: z.string().optional(),
          paragraph: z.string().optional(),
          emphasis: z.string().optional(),
        }).optional(),
        vars: z.array(z.object({
          lab: z.string(),
          heading: z.string(),
          body: z.string(),
        })).optional(),
        domains: z.array(z.object({
          rn: z.string(),
          title: z.string(),
          body: z.string(),
          ct: z.string().optional(),
        })).optional(),

        // Services: two grouped chapters of services + a services-at-a-glance table
        serviceGroups: z.array(z.object({
          rn: z.string(),
          title: z.string(),
          count: z.string().optional(),
          lead: z.string().optional(),
          services: z.array(z.object({
            rn: z.string(),
            id: z.string().optional(),
            title: z.string(),
            intro: z.string(),
            focus: z.array(z.object({ term: z.string(), desc: z.string() })),
            timeline: z.array(z.object({ d: z.string(), w: z.string() })),
            bestFor: z.string().optional(),
          })),
        })).optional(),
        glance: z.object({
          rn: z.string().optional(),
          heading: z.string(),
          lead: z.string().optional(),
          rows: z.array(z.object({
            service: z.string(),
            focus: z.string(),
            timeline: z.string(),
          })),
        }).optional(),

        // Engagement: three models, approach steps, who-we-work-with, principle panel
        models: z.array(z.object({
          rn: z.string(),
          title: z.string(),
          body: z.string(),
          tag: z.string().optional(),
        })).optional(),
        modelsNote: z.string().optional(),
        approach: z.array(z.object({
          s: z.string(),
          title: z.string(),
          body: z.string(),
        })).optional(),
        who: z.array(z.object({
          n: z.string(),
          title: z.string(),
          body: z.string(),
        })).optional(),
        principle: z.object({
          eyebrow: z.string().optional(),
          displayPre: z.string().optional(),
          displayEm: z.string().optional(),
          displayPost: z.string().optional(),
          lead: z.string().optional(),
          ctaLabel: z.string().optional(),
          ctaTo: z.string().optional(),
        }).optional(),
      }),
    }),

    // ── Podcast (Chapter V): landing + episodes, be-a-guest, philosophy ─────
    podcast: defineCollection({
      type: 'page',
      source: 'podcast/**/*.md',
      schema: z.object({
        title: z.string(),
        hero,
        cta,
        chapterNav,
        chapterIndex,
        banner: z.string().optional(),
        secA: secHead,
        secB: secHead,
        secC: secHead,

        // Landing: featured episode player + three anchors
        featured: z.object({
          artLabel: z.string().optional(),
          image: z.string().optional(),
          epNo: z.string().optional(),
          title: z.string(),
          body: z.string().optional(),
          credits: z.array(z.object({ label: z.string(), accent: z.boolean().optional() })).optional(),
          primaryLabel: z.string().optional(),
          primaryTo: z.string().optional(),
          ghostLabel: z.string().optional(),
          ghostTo: z.string().optional(),
        }).optional(),
        anchors: z.array(z.object({
          n: z.string(),
          title: z.string(),
          body: z.string(),
        })).optional(),

        // Episodes: live episode card + pipeline list
        liveHead: z.object({ label: z.string(), count: z.string().optional() }).optional(),
        live: z.object({
          artLabel: z.string().optional(),
          image: z.string().optional(),
          status: z.string().optional(),
          title: z.string(),
          body: z.string().optional(),
          listenLabel: z.string().optional(),
          listenTo: z.string().optional(),
          recorded: z.string().optional(),
          details: z.array(z.object({ h: z.string(), p: z.string() })).optional(),
        }).optional(),
        pipelineHead: z.object({ label: z.string(), count: z.string().optional() }).optional(),
        pipeline: z.array(z.object({
          no: z.string(),
          status: z.string().optional(),
          title: z.string(),
          desc: z.string().optional(),
          guest: z.string().optional(),
        })).optional(),

        // Be a guest: how-it-works steps + elephant list (pitch form is a static mock)
        steps: z.array(z.object({
          n: z.string(),
          title: z.string(),
          body: z.string(),
        })).optional(),
        elephants: z.array(z.object({
          n: z.string(),
          title: z.string(),
          body: z.string(),
        })).optional(),

        // Philosophy: prose lives in the markdown body; this is the format grid + coda
        format: z.object({
          title: z.string().optional(),
          steps: z.array(z.object({ s: z.string(), h: z.string(), p: z.string() })).optional(),
          closer: z.string().optional(),
          pullQuote: z.string().optional(),
          attribution: z.string().optional(),
        }).optional(),
      }),
    }),

    // ── Connect (Chapter VI): contact landing ──────────────────────────────
    connect: defineCollection({
      type: 'page',
      source: 'connect/**/*.md',
      schema: z.object({
        title: z.string(),
        hero,
        cta,
        chapterNav,
        chapterIndex,
        banner: z.string().optional(),
        secA: secHead,
        secB: secHead,
        secC: secHead,
        secD: secHead,

        // Landing: contact channels, audience split, socials hub
        channels: z.array(z.object({
          lab: z.string(),
          val: z.string(),
          body: z.string().optional(),
        })).optional(),
        audiences: z.array(z.object({
          ey: z.string().optional(),
          heading: z.string(),
          body: z.string().optional(),
          items: z.array(z.object({ term: z.string(), desc: z.string() })).optional(),
          linkLabel: z.string().optional(),
          linkTo: z.string().optional(),
        })).optional(),
        hub: z.object({
          title: z.string().optional(),
          body: z.string().optional(),
          ctaLabel: z.string().optional(),
          ctaTo: z.string().optional(),
        }).optional(),
        socials: z.array(z.object({
          p: z.string(),
          d: z.string().optional(),
          to: z.string().optional(),
        })).optional(),
      }),
    }),

    // ── Research (Chapter II): landing + publications. Citation/author lines
    //    are plain editable strings. ─────────────────────────────────────────
    research: defineCollection({
      type: 'page',
      source: 'research/**/*.md',
      schema: z.object({
        title: z.string(),
        hero,
        cta,
        chapterNav,
        chapterIndex,
        banner: z.string().optional(),
        secA: secHead,
        secB: secHead,
        secC: secHead,
        stats: z.array(z.object({
          n: z.string(),
          nAccent: z.string().optional(),
          lab: z.string(),
        })).optional(),

        // Landing: four pillars + featured publication
        pillars: z.array(z.object({
          rn: z.string(),
          title: z.string(),
          body: z.string(),
          ct: z.string().optional(),
        })).optional(),
        featured: z.object({
          imageLabel: z.string().optional(),
          image: z.string().optional(),
          eyebrow: z.string().optional(),
          title: z.string(),
          lede: z.string().optional(),
          auth: z.string().optional(),
          primaryLabel: z.string().optional(),
          primaryTo: z.string().optional(),
          ghostLabel: z.string().optional(),
          ghostTo: z.string().optional(),
        }).optional(),

        // Publications: grouped citation list + download bar
        pubGroups: z.array(z.object({
          title: z.string(),
          ct: z.string().optional(),
          items: z.array(z.object({
            year: z.string(),
            type: z.string().optional(),
            title: z.string(),
            auth: z.string().optional(),
            badges: z.array(z.object({ label: z.string(), ft50: z.boolean().optional() })).optional(),
          })),
        })).optional(),
        downloadBar: z.object({
          label: z.string().optional(),
          links: z.array(z.object({ label: z.string(), to: z.string().optional() })),
        }).optional(),
      }),
    }),

    // ── Education Hub (Chapter III): landing + theory guide, video lessons ──
    educationhub: defineCollection({
      type: 'page',
      source: 'education-hub/**/*.md',
      schema: z.object({
        title: z.string(),
        hero,
        cta,
        chapterNav,
        chapterIndex,
        banner: z.string().optional(),
        stats: z.array(z.object({
          n: z.string(),
          nAccent: z.string().optional(),
          lab: z.string(),
        })).optional(),

        // Landing: opening doctrine, three-level theory columns, video preview
        doctrine: z.object({
          eyebrow: z.string().optional(),
          headA: z.string().optional(),
          em1: z.string().optional(),
          headB: z.string().optional(),
          em2: z.string().optional(),
          headC: z.string().optional(),
          paragraphs: z.array(z.string()).optional(),
        }).optional(),
        levels: z.array(z.object({
          lab: z.string(),
          rn: z.string(),
          title: z.string(),
          desc: z.string().optional(),
          ct: z.string().optional(),
          cat: z.enum(['i', 'g', 'o']),
          theories: z.array(z.object({
            num: z.string(),
            title: z.string(),
            sub: z.string().optional(),
            summ: z.string().optional(),
            tags: z.array(z.string()).optional(),
          })),
        })).optional(),
        videoPreview: z.object({
          rn: z.string().optional(),
          heading: z.string().optional(),
          lead: z.string().optional(),
          lessons: z.array(z.object({
            label: z.string().optional(),
            cat: z.enum(['i', 'g', 'o']),
            title: z.string(),
            when: z.string().optional(),
          })).optional(),
          primaryLabel: z.string().optional(),
          primaryTo: z.string().optional(),
          ghostLabel: z.string().optional(),
          ghostTo: z.string().optional(),
        }).optional(),

        // Theory guide: legend + alphabetical letter sections
        legend: z.array(z.object({ cat: z.enum(['i', 'g', 'o']), label: z.string() })).optional(),
        legendCount: z.string().optional(),
        letterSections: z.array(z.object({
          letter: z.string(),
          ct: z.string().optional(),
          entries: z.array(z.object({
            name: z.string(),
            who: z.string().optional(),
            summ: z.string().optional(),
            level: z.enum(['i', 'g', 'o']),
          })),
        })).optional(),
        footNote: z.string().optional(),

        // Video lessons: featured player + lesson grid + playlists
        feature: z.object({
          label: z.string().optional(),
          time: z.string().optional(),
          progress: z.string().optional(),
          image: z.string().optional(),
          lvl: z.string().optional(),
          titlePre: z.string().optional(),
          titleEm: z.string().optional(),
          titlePost: z.string().optional(),
          body: z.string().optional(),
          meta: z.array(z.string()).optional(),
          primaryLabel: z.string().optional(),
          primaryTo: z.string().optional(),
          ghostLabel: z.string().optional(),
          ghostTo: z.string().optional(),
        }).optional(),
        railCount: z.string().optional(),
        lessons: z.array(z.object({
          // Omitted for topics outside the three levels (e.g. foundational models).
          cat: z.enum(['i', 'g', 'o']).optional(),
          theory: z.string().optional(),
          title: z.string(),
          body: z.string().optional(),
          lesson: z.string().optional(),
          when: z.string().optional(),
          dur: z.string().optional(),
          label: z.string().optional(),
          image: z.string().optional(),
        })).optional(),
        lessonsNote: z.string().optional(),
        playlistHead: z.string().optional(),
        playlists: z.array(z.object({
          cat: z.enum(['i', 'g', 'o']),
          count: z.string().optional(),
          dur: z.string().optional(),
          name: z.string().optional(),
          title: z.string(),
          best: z.string().optional(),
          updated: z.string().optional(),
          label: z.string().optional(),
        })).optional(),
      }),
    }),

  },
})
