<script setup lang="ts">
const { data: page } = await useAsyncData('about-awards', () =>
  queryCollection('about').path('/about/awards').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Awards'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Awards & honours' },
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
      <div v-if="page.stats?.length" class="stat-grid" style="margin-top: 48px;">
        <div v-for="(s, i) in page.stats" :key="i" class="stat">
          <span class="n"><span v-if="s.nAccent" class="accent">{{ s.nAccent }}</span>{{ s.n }}</span>
          <span class="lab">{{ s.lab }}</span>
        </div>
      </div>
    </PageHero>

    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <p v-if="page.banner" class="client-banner">{{ page.banner }}</p>

        <div v-for="(group, gi) in page.awardGroups" :key="gi" class="award-section">
          <div class="hd">
            <h3>{{ group.title }}</h3>
            <span v-if="group.meta" class="ct">{{ group.meta }}</span>
          </div>
          <div v-for="(a, ai) in group.items" :key="ai" class="award">
            <span class="yr">{{ a.yr }}</span>
            <div>
              <div class="title">{{ a.title }}</div>
              <div v-if="a.where" class="where">{{ a.where }}</div>
            </div>
            <span v-if="a.badge" class="badge">{{ a.badge }}</span>
          </div>
        </div>

        <p v-if="page.footNote" style="font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em; color: var(--ink-3); margin-top: 48px;">
          {{ page.footNote.text }}
          <NuxtLink v-if="page.footNote.linkLabel" class="link-arrow" :to="page.footNote.linkTo" style="font-size: 13px; margin-left: 8px;">
            {{ page.footNote.linkLabel }}
          </NuxtLink>
        </p>
      </div>
    </section>

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Awards (from Prototype1 about/awards.html) */
.award-section { margin-top: 60px; }
.award-section .hd {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 14px;
  margin-bottom: 0;
}
.award-section .hd h3 {
  font-family: var(--serif);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 500;
  letter-spacing: -0.01em;
}
.award-section .hd .ct {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.award {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 24px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line-2);
  align-items: baseline;
}
.award .yr {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--ink-3);
  letter-spacing: 0.06em;
}
.award .title {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.005em;
}
.award .where {
  font-family: var(--sans);
  font-size: 14.5px;
  color: var(--ink-2);
  margin-top: 4px;
}
.award .badge {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-deep);
  background: var(--accent-tint);
  border: 1px solid var(--accent-soft);
  padding: 4px 10px;
  border-radius: 99px;
  white-space: nowrap;
  align-self: center;
}
@media (max-width: 680px) {
  .award { grid-template-columns: 60px 1fr; }
  .award .badge { grid-column: 2; justify-self: start; margin-top: 8px; }
}
</style>
