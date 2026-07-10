<script setup lang="ts">
const { data: page } = await useAsyncData('about', () =>
  queryCollection('about').path('/about').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'About'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [{ label: 'Home', to: '/' }, { label: 'About' }]
</script>

<template>
  <div v-if="page">
    <PageHero
      :crumb="crumb"
      :roman="page.hero?.roman"
      :heading="page.hero?.heading"
      :heading-accent="page.hero?.headingAccent"
      :lede="page.hero?.lede"
      :meta="page.hero?.meta"
    />

    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div class="portrait">
          <div class="ph" :data-label="page.portrait?.imageLabel" />
          <div class="body">
            <span class="eyebrow-block">{{ page.portrait?.eyebrow }}</span>
            <h2>{{ page.portrait?.heading }} <em v-if="page.portrait?.headingEm">{{ page.portrait.headingEm }}</em></h2>
            <p v-for="(para, i) in page.portrait?.paragraphs" :key="i">{{ para }}</p>
            <p class="sig">{{ page.portrait?.signature }}</p>
          </div>
        </div>

        <div class="journey" style="margin-top: 64px;">
          <div v-for="(j, i) in page.journey" :key="i" class="j">
            <div class="place">{{ j.place }}</div>
            <div class="yr">{{ j.year }}</div>
            <div class="what">{{ j.what }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <ChapterIndex
          :label="page.chapterIndex?.label"
          :count="page.chapterIndex?.count"
          :rows="page.chapterIndex?.rows"
        />
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Portrait split + journey strip (from Prototype1 about/index.html) */
.portrait {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 0;
  margin-top: 48px;
  border: 2px solid var(--ink);
}
@media (max-width: 820px) {
  .portrait { grid-template-columns: 1fr; }
}
.portrait .ph {
  min-height: 520px;
  border: 0;
  border-right: 2px solid var(--ink);
  border-radius: 0;
}
@media (max-width: 820px) {
  .portrait .ph {
    border-right: 0;
    border-bottom: 2px solid var(--ink);
    min-height: 380px;
  }
}
.portrait .body {
  padding: clamp(32px, 5vw, 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.portrait .body .eyebrow-block { margin-bottom: 14px; }
.portrait .body h2 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(34px, 4.4vw, 58px);
  line-height: 1.04;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}
.portrait .body h2 em { color: var(--accent); }
.portrait .body p {
  font-family: var(--serif);
  font-size: 19px;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 42ch;
  margin: 0 0 1em;
}
.portrait .body .sig {
  margin-top: 28px;
  font-family: var(--serif);
  font-style: italic;
  font-size: 22px;
  color: var(--ink);
}

.journey {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
}
@media (max-width: 820px) {
  .journey { grid-template-columns: repeat(2, 1fr); }
}
.j {
  padding: 28px 24px 28px 0;
  border-left: 1px solid var(--line);
}
.j:first-child { border-left: 0; padding-left: 0; }
@media (max-width: 820px) {
  .j { padding-left: 20px; }
  .j:nth-child(odd) { border-left: 0; padding-left: 0; }
}
.j .place {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}
.j .yr {
  font-family: var(--serif);
  font-size: 40px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.02em;
}
.j .what {
  font-family: var(--serif);
  font-size: 16px;
  color: var(--ink-2);
  margin-top: 8px;
  max-width: 18ch;
}
</style>
