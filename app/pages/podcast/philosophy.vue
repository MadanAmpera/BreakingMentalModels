<script setup lang="ts">
const { data: page } = await useAsyncData('podcast-philosophy', () =>
  queryCollection('podcast').path('/podcast/philosophy').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'The Philosophy'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Podcast', to: '/podcast' },
  { label: 'The philosophy' },
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

    <article class="section" style="padding-block: clamp(40px, 6vw, 72px);">
      <div class="article">
        <ContentRenderer :value="page" />

        <template v-if="page.format">
          <hr>
          <h4 v-if="page.format.title" style="text-align: center;">{{ page.format.title }}</h4>
          <div v-if="page.format.steps?.length" class="format">
            <div v-for="(f, i) in page.format.steps" :key="i" class="fmt">
              <span class="s">{{ f.s }}</span>
              <h4>{{ f.h }}</h4>
              <p>{{ f.p }}</p>
            </div>
          </div>
          <p v-if="page.format.closer" style="margin-top: 48px;">{{ page.format.closer }}</p>
          <p v-if="page.format.pullQuote" class="pull"><em>{{ page.format.pullQuote }}</em></p>
          <p v-if="page.format.attribution" class="ep-attr">{{ page.format.attribution }}</p>
        </template>
      </div>
    </article>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Format grid + coda (from Prototype1 podcast/philosophy.html) */
.format {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  margin: 8px auto 0;
  max-width: 680px;
}
@media (max-width: 680px) {
  .format { grid-template-columns: 1fr 1fr; }
}
.fmt { padding: 24px 20px 24px 0; border-left: 1px solid var(--line); }
.fmt:first-child { border-left: 0; }
@media (max-width: 680px) {
  .fmt { padding-left: 20px; }
  .fmt:nth-child(odd) { border-left: 0; padding-left: 0; }
  .fmt:nth-child(n+3) { border-top: 1px solid var(--line); padding-top: 24px; }
}
.fmt .s { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; color: var(--accent); }
.fmt h4 { font-family: var(--serif); font-size: 19px; font-weight: 500; margin: 8px 0 5px; }
.fmt p { font-size: 13.5px; color: var(--ink-2); margin: 0; line-height: 1.45; }

.ep-attr {
  text-align: center;
  color: var(--ink-3);
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.04em;
}

/* Drop cap on the essay's opening paragraph only. Scoped to the first
   direct-child <p> of the ContentRenderer wrapper so it never leaks into
   nested paragraphs (pull quotes, the appended format coda). */
.article :deep([data-content-id] > p:first-of-type)::first-letter {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 5.6em;
  line-height: 0.85;
  float: left;
  margin: 0.05em 0.12em 0 -0.04em;
  color: var(--accent);
}
</style>
