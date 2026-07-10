<script setup lang="ts">
const { data: page } = await useAsyncData('research-interviews', () =>
  queryCollection('research').path('/research/interviews').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Online Interviews'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Research', to: '/research' },
  { label: 'Online interviews' },
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
        <p v-if="page.banner" class="client-banner">{{ page.banner }}</p>

        <div v-if="page.ivHead" class="idx-head" style="margin-top: 24px;">
          <span class="t">{{ page.ivHead.label }}</span>
          <span v-if="page.ivHead.count" class="t" style="color: var(--ink-3);">{{ page.ivHead.count }}</span>
        </div>

        <a v-for="(iv, i) in page.interviews" :key="i" class="iv" :href="iv.to">
          <Figure :src="iv.image" :label="iv.imageLabel" />
          <div class="body">
            <span v-if="iv.show" class="show">{{ iv.show }}</span>
            <div class="ttl">{{ iv.title }}</div>
            <div v-if="iv.with" class="with">{{ iv.with }}</div>
            <div v-if="iv.topics?.length" class="topics">
              <span v-for="(t, ti) in iv.topics" :key="ti">{{ t }}</span>
            </div>
          </div>
          <div class="when">
            {{ iv.when }}<span v-if="iv.dur" class="dur">{{ iv.dur }}</span>
          </div>
        </a>
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Online interviews (from Prototype1 research/interviews.html) */
.iv {
  display: grid;
  grid-template-columns: 200px 1fr 110px;
  gap: 28px;
  padding: 28px 0;
  border-top: 1px solid var(--line-2);
  align-items: start;
  text-decoration: none;
  color: var(--ink);
  transition: 0.15s;
}
.iv:last-of-type { border-bottom: 1px solid var(--line-2); }
.iv:hover { background: var(--accent-tint); padding-inline: 12px; }
.iv .ph { height: 120px; border-radius: 0; border: 1px solid var(--line-2); }
.iv .ph::after { font-size: 10px; }
.iv .body .show { font-family: var(--serif); font-style: italic; font-size: 17px; color: var(--ink-2); }
.iv .body .ttl {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
  margin-top: 6px;
}
.iv .body .with { font-family: var(--sans); font-size: 14px; color: var(--ink-2); margin-top: 8px; }
.iv .body .topics { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
.iv .body .topics span {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
  border: 1px solid var(--line-2);
  padding: 3px 8px;
  border-radius: 99px;
}
.iv .when {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--ink-3);
  text-align: right;
}
.iv .when .dur {
  display: block;
  color: var(--accent);
  margin-top: 6px;
  font-family: var(--serif);
  font-size: 18px;
}
@media (max-width: 760px) {
  .iv { grid-template-columns: 1fr; }
  .iv .when { text-align: left; }
}
</style>
