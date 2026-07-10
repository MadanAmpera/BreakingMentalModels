<script setup lang="ts">
const { data: page } = await useAsyncData('research-media', () =>
  queryCollection('research').path('/research/media').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Media & Citations'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Research', to: '/research' },
  { label: 'Media & citations' },
]
</script>

<template>
  <div v-if="page">
    <PageHero
      :crumb="crumb"
      :roman="page.hero?.roman"
      :heading="page.hero?.heading"
      :heading-accent="page.hero?.headingAccent"
      :lede="page.hero?.lede"
    >
      <div v-if="page.metrics?.length" class="metrics">
        <div v-for="(m, i) in page.metrics" :key="i" class="metric">
          <span class="n"><span v-if="m.nAccent" class="accent">{{ m.nAccent }}</span>{{ m.n }}</span>
          <span class="lab">{{ m.lab }}</span>
          <span v-if="m.src" class="src">{{ m.src }}</span>
        </div>
      </div>
    </PageHero>

    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <!-- a · In the press -->
        <div v-if="page.secA" class="sec-head">
          <span class="rn">{{ page.secA.rn }}</span><h2>{{ page.secA.heading }}</h2>
        </div>
        <p v-if="page.secA?.lead" class="lead" style="max-width: 60ch;">{{ page.secA.lead }}</p>
        <p v-if="page.banner" class="client-banner" style="margin-top: 34px;">{{ page.banner }}</p>

        <div v-if="page.press?.length" style="margin-top: 8px;">
          <a v-for="(p, i) in page.press" :key="i" class="press" :href="p.to">
            <div>
              <span class="outlet">{{ p.outlet }}</span>
              <span v-if="p.date" class="date">{{ p.date }}</span>
            </div>
            <div>
              <div class="ttl">{{ p.title }}</div>
              <span v-if="p.kind" class="kind">{{ p.kind }}</span>
            </div>
            <span class="arrow">Read ↗</span>
          </a>
        </div>

        <!-- b · Cited by -->
        <div v-if="page.secB" class="sec-head" style="margin-top: 90px;">
          <span class="rn">{{ page.secB.rn }}</span><h2>{{ page.secB.heading }}</h2>
        </div>
        <p v-if="page.secB?.lead" class="lead" style="max-width: 60ch;">{{ page.secB.lead }}</p>

        <div v-if="page.citing?.length" class="citing-grid">
          <div v-for="(c, i) in page.citing" :key="i" class="citing-card">
            <span v-if="c.cap" class="cap">{{ c.cap }}</span>
            <div class="ttl">{{ c.title }}</div>
            <div v-if="c.auth" class="auth">{{ c.auth }}</div>
          </div>
        </div>

        <p v-if="page.citingNote" class="cite-note">
          {{ page.citingNote.text }}
          <a v-if="page.citingNote.linkLabel" class="link-arrow" :href="page.citingNote.linkTo" style="font-size: 13px; margin-left: 8px;">{{ page.citingNote.linkLabel }}</a>
        </p>
      </div>
    </section>

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Media & citations (from Prototype1 research/media.html) */
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  margin-top: 48px;
}
.metric { padding: 28px 0 28px 24px; border-left: 1px solid var(--line); }
.metric:first-child { border-left: 0; padding-left: 0; }
.metric .n {
  font-family: var(--serif);
  font-size: clamp(44px, 5vw, 68px);
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 500;
}
.metric .n .accent { color: var(--accent); }
.metric .lab {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-top: 10px;
  display: block;
}
.metric .src {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--ink-3);
  margin-top: 4px;
  display: block;
}

/* Press feature row */
.press {
  display: grid;
  grid-template-columns: 160px 1fr auto;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid var(--line-2);
  align-items: baseline;
  text-decoration: none;
  color: var(--ink);
  transition: 0.15s;
}
.press:last-of-type { border-bottom: 1px solid var(--line-2); }
.press:hover { background: var(--accent-tint); padding-inline: 12px; }
.press .outlet { font-family: var(--serif); font-style: italic; font-size: 18px; color: var(--ink); }
.press .date {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  color: var(--ink-3);
  display: block;
  margin-top: 4px;
}
.press .ttl { font-family: var(--serif); font-size: 19px; line-height: 1.35; font-weight: 500; }
.press .kind {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-top: 6px;
  display: block;
}
.press .arrow { font-family: var(--mono); color: var(--ink-3); font-size: 14px; align-self: center; }
.press:hover .arrow { color: var(--accent); }
@media (max-width: 760px) {
  .press { grid-template-columns: 1fr; gap: 6px; }
  .press .arrow { display: none; }
}

/* Citing works */
.citing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 24px;
}
.citing-card {
  background: var(--paper-2);
  border: 1px solid var(--line);
  padding: 24px;
  border-radius: var(--radius-lg);
}
.citing-card .cap {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
  display: block;
}
.citing-card .ttl { font-family: var(--serif); font-size: 18px; font-weight: 500; line-height: 1.35; }
.citing-card .auth { font-family: var(--sans); font-size: 13.5px; color: var(--ink-2); margin-top: 6px; }

.cite-note {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--ink-3);
  margin-top: 48px;
}
</style>
