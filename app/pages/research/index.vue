<script setup lang="ts">
const { data: page } = await useAsyncData('research', () =>
  queryCollection('research').path('/research').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Research'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [{ label: 'Home', to: '/' }, { label: 'Research' }]
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
      <div v-if="page.stats?.length" class="stat-grid" style="margin-top: 48px;">
        <div v-for="(s, i) in page.stats" :key="i" class="stat">
          <span class="n"><span v-if="s.nAccent" class="accent">{{ s.nAccent }}</span>{{ s.n }}</span>
          <span class="lab">{{ s.lab }}</span>
        </div>
      </div>
    </PageHero>

    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <!-- a · The four pillars -->
        <div v-if="page.secA" class="sec-head">
          <span class="rn">{{ page.secA.rn }}</span><h2>{{ page.secA.heading }}</h2>
        </div>
        <p v-if="page.secA?.lead" class="lead" style="max-width: 60ch;">{{ page.secA.lead }}</p>

        <div v-if="page.pillars?.length" class="pillars">
          <div v-for="(p, i) in page.pillars" :key="i" class="pillar">
            <span class="rn">{{ p.rn }}</span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.body }}</p>
            <span v-if="p.ct" class="ct">{{ p.ct }}</span>
          </div>
        </div>

        <!-- b · Featured publication -->
        <div v-if="page.secB" class="sec-head" style="margin-top: 96px;">
          <span class="rn">{{ page.secB.rn }}</span><h2>{{ page.secB.heading }}</h2>
        </div>

        <div v-if="page.featured" class="featured">
          <Figure :src="page.featured.image" :label="page.featured.imageLabel" />
          <div class="body">
            <span v-if="page.featured.eyebrow" class="eyebrow">{{ page.featured.eyebrow }}</span>
            <h2>{{ page.featured.title }}</h2>
            <p v-if="page.featured.lede" class="lede">{{ page.featured.lede }}</p>
            <p v-if="page.featured.auth" class="auth">{{ page.featured.auth }}</p>
            <div class="feat-actions">
              <a v-if="page.featured.primaryLabel" class="btn btn-primary" :href="page.featured.primaryTo" style="border-radius: 0;">
                {{ page.featured.primaryLabel }} <span class="arrow">→</span>
              </a>
              <NuxtLink v-if="page.featured.ghostLabel" class="btn btn-ghost" :to="page.featured.ghostTo" style="border-radius: 0;">
                {{ page.featured.ghostLabel }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- c · In this chapter -->
        <ChapterIndex
          v-if="page.chapterIndex"
          :label="page.chapterIndex.label"
          :count="page.chapterIndex.count"
          :rows="page.chapterIndex.rows"
          style="display: block; margin-top: 96px;"
        />
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Research landing (from Prototype1 research/index.html) */
.pillars {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 48px;
  border: 2px solid var(--ink);
}
@media (max-width: 980px) {
  .pillars { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .pillars { grid-template-columns: 1fr; }
}
.pillar {
  padding: 32px 28px;
  border-left: 1px solid var(--ink);
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pillar:first-child { border-left: 0; }
@media (max-width: 980px) {
  .pillar:nth-child(3) { border-left: 0; border-top: 1px solid var(--ink); }
  .pillar:nth-child(4) { border-top: 1px solid var(--ink); }
}
@media (max-width: 560px) {
  .pillar { border-left: 0; border-top: 1px solid var(--ink); }
  .pillar:first-child { border-top: 0; }
}
.pillar .rn { font-family: var(--mono); font-size: 13px; letter-spacing: 0.18em; color: var(--accent); }
.pillar h3 {
  font-family: var(--serif);
  font-size: 26px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.01em;
}
.pillar p {
  font-family: var(--serif);
  font-size: 16px;
  line-height: 1.5;
  color: var(--ink-2);
  margin: 0;
  flex: 1;
}
.pillar .ct {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed var(--line-2);
}

/* Featured publication */
.featured {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0;
  border: 2px solid var(--ink);
  margin-top: 60px;
}
@media (max-width: 820px) {
  .featured { grid-template-columns: 1fr; }
}
.featured .ph {
  min-height: 340px;
  border: 0;
  border-right: 2px solid var(--ink);
  border-radius: 0;
}
@media (max-width: 820px) {
  .featured .ph { border-right: 0; border-bottom: 2px solid var(--ink); }
}
.featured .body {
  padding: clamp(28px, 4vw, 52px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.featured h2 {
  font-family: var(--serif);
  font-size: clamp(28px, 3.6vw, 42px);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.018em;
  margin: 14px 0 14px;
}
.featured p.lede {
  font-family: var(--serif);
  font-size: 18px;
  line-height: 1.5;
  color: var(--ink-2);
  margin: 0 0 1em;
}
.featured .auth { font-family: var(--sans); font-size: 14px; color: var(--ink-2); margin-top: 14px; }
.feat-actions { display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap; }
</style>
