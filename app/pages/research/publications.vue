<script setup lang="ts">
const { data: page } = await useAsyncData('research-publications', () =>
  queryCollection('research').path('/research/publications').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Publications'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Research', to: '/research' },
  { label: 'Publications' },
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

        <div v-for="(group, gi) in page.pubGroups" :key="gi" class="pub-group">
          <div class="hd">
            <h3>{{ group.title }}</h3>
            <span v-if="group.ct" class="ct">{{ group.ct }}</span>
          </div>

          <div v-for="(pub, pi) in group.items" :key="pi" class="pub">
            <span class="meta"><span class="yr">{{ pub.year }}</span>{{ pub.type }}</span>
            <div>
              <div class="ttl">{{ pub.title }}</div>
              <div v-if="pub.auth" class="auth">{{ pub.auth }}</div>
            </div>
            <div v-if="pub.badges?.length" class="badges">
              <span v-for="(b, bi) in pub.badges" :key="bi" class="badge" :class="{ ft50: b.ft50 }">{{ b.label }}</span>
            </div>
          </div>
        </div>

        <div v-if="page.downloadBar" class="download-bar">
          <span class="lab">{{ page.downloadBar.label }}</span>
          <a v-for="(l, i) in page.downloadBar.links" :key="i" class="btn btn-ghost" :href="l.to">{{ l.label }}</a>
        </div>
      </div>
    </section>

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Publications (from Prototype1 research/publications.html) */
.pub-group { margin-top: 60px; }
.pub-group .hd {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 14px;
  margin-bottom: 0;
}
.pub-group .hd h3 {
  font-family: var(--serif);
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 500;
  letter-spacing: -0.012em;
}
.pub-group .hd .ct {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.pub {
  display: grid;
  grid-template-columns: 120px 1fr 100px;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid var(--line-2);
  align-items: baseline;
}
.pub:first-of-type { border-top: 0; }
.pub .meta {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  color: var(--ink-3);
  text-transform: uppercase;
}
.pub .meta .yr {
  display: block;
  font-family: var(--serif);
  font-size: 20px;
  color: var(--ink);
  letter-spacing: 0;
  text-transform: none;
  font-weight: 500;
  margin-bottom: 2px;
}
.pub .ttl {
  font-family: var(--serif);
  font-size: 19.5px;
  line-height: 1.35;
  font-weight: 500;
  color: var(--ink);
  letter-spacing: -0.005em;
}
.pub .auth { font-family: var(--sans); font-size: 14px; color: var(--ink-2); margin-top: 8px; }
.pub .badges {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
  padding-top: 0.3em;
}
.pub .badge {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-2);
  background: var(--paper-2);
  border: 1px solid var(--line-2);
  padding: 4px 10px;
  border-radius: 99px;
  white-space: nowrap;
}
.pub .badge.ft50 {
  color: var(--accent-deep);
  background: var(--accent-tint);
  border-color: var(--accent-soft);
}
@media (max-width: 760px) {
  .pub { grid-template-columns: 1fr; gap: 8px; }
  .pub .badges { flex-direction: row; align-items: flex-start; }
}

.download-bar {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
  padding: 18px 22px;
  border: 1px solid var(--line);
  background: var(--paper-2);
  margin-top: 60px;
}
.download-bar .lab {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-right: auto;
}
</style>
