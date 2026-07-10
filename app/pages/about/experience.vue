<script setup lang="ts">
const { data: page } = await useAsyncData('about-experience', () =>
  queryCollection('about').path('/about/experience').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Experience'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Experience' },
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
    />

    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.currentHead" class="sec-head">
          <span class="rn">{{ page.currentHead.rn }}</span>
          <h2>{{ page.currentHead.title }}</h2>
        </div>

        <div class="proj-grid">
          <div v-for="(p, i) in page.projects" :key="i" class="proj">
            <div class="stat"><span class="dot" />{{ p.stat }}</div>
            <h3>{{ p.title }}</h3>
            <div v-if="p.tags" class="tags">{{ p.tags }}</div>
            <p v-if="p.body">{{ p.body }}</p>
            <div v-if="p.with" class="with">{{ p.with }}</div>
          </div>
        </div>

        <div v-if="page.roadHead" class="sec-head" style="margin-top: 90px;">
          <span class="rn">{{ page.roadHead.rn }}</span>
          <h2>{{ page.roadHead.title }}</h2>
        </div>

        <p v-if="page.banner" class="client-banner">{{ page.banner }}</p>

        <div class="timeline">
          <div v-for="(t, i) in page.timeline" :key="i" class="tl-item" :class="{ active: t.active }">
            <div class="when">{{ t.when }}</div>
            <h3>{{ t.title }}</h3>
            <div v-if="t.where" class="where"><em>{{ t.where }}</em></div>
            <p v-if="t.body">{{ t.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Experience (from Prototype1 about/experience.html) */
.proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
}
.proj {
  padding: 32px 0 32px 28px;
  border-left: 1px solid var(--line);
}
.proj:first-child { border-left: 0; padding-left: 0; }
@media (max-width: 680px) {
  .proj { padding-left: 0; border-left: 0; border-top: 1px solid var(--line); }
  .proj:first-child { border-top: 0; }
}
.proj .stat {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
}
.proj .stat .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
  animation: pulse 2.6s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
.proj h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.15;
}
.proj .tags {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--ink-3);
  margin-top: 6px;
  text-transform: uppercase;
}
.proj p {
  font-family: var(--serif);
  font-size: 16.5px;
  line-height: 1.5;
  color: var(--ink-2);
  margin-top: 14px;
  max-width: 38ch;
}
.proj .with {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px dashed var(--line-2);
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.timeline {
  position: relative;
  margin-top: 48px;
  padding-left: 32px;
  border-left: 1px solid var(--line-2);
}
.tl-item {
  position: relative;
  padding: 14px 0 36px;
}
.tl-item::before {
  content: "";
  position: absolute;
  left: -37px;
  top: 22px;
  width: 11px;
  height: 11px;
  background: var(--paper);
  border: 2px solid var(--accent);
  border-radius: 50%;
}
.tl-item.active::before { background: var(--accent); }
.tl-item .when {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}
.tl-item h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.15;
}
.tl-item .where {
  font-family: var(--serif);
  font-style: italic;
  color: var(--ink-2);
  font-size: 17px;
  margin-top: 4px;
}
.tl-item p {
  font-family: var(--serif);
  font-size: 17px;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 60ch;
  margin-top: 10px;
}
</style>
