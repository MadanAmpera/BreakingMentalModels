<script setup lang="ts">
const { data: page } = await useAsyncData('work-with-me', () =>
  queryCollection('workwithme').path('/work-with-me').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Work With Me'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [{ label: 'Home', to: '/' }, { label: 'Work With Me' }]
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

    <!-- a · The environment is the intervention -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secA" class="sec-head">
          <span class="rn">{{ page.secA.rn }}</span><h2>{{ page.secA.heading }}</h2>
        </div>
        <p v-if="page.secA?.lead" class="lead" style="max-width: 62ch;">{{ page.secA.lead }}</p>

        <div v-if="page.thesis" class="thesis">
          <Figure :src="page.thesis.image" :label="page.thesis.imageLabel" />
          <div class="body">
            <span class="eyebrow">{{ page.thesis.eyebrow }}</span>
            <h2>{{ page.thesis.headingPre }} <em>{{ page.thesis.headingEm }}</em> {{ page.thesis.headingPost }}</h2>
            <p>{{ page.thesis.paragraph }}</p>
            <p class="emph">{{ page.thesis.emphasis }}</p>
          </div>
        </div>

        <div v-if="page.vars?.length" class="vars">
          <div v-for="(v, i) in page.vars" :key="i" class="var">
            <span class="lab">{{ v.lab }}</span>
            <h3>{{ v.heading }}</h3>
            <p>{{ v.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- b · What we bring -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secB" class="sec-head">
          <span class="rn">{{ page.secB.rn }}</span><h2>{{ page.secB.heading }}</h2>
        </div>
        <p v-if="page.secB?.lead" class="lead" style="max-width: 62ch;">{{ page.secB.lead }}</p>

        <div v-if="page.domains?.length" class="domains">
          <div v-for="(d, i) in page.domains" :key="i" class="domain">
            <span class="rn">{{ d.rn }}</span>
            <h3>{{ d.title }}</h3>
            <p>{{ d.body }}</p>
            <span v-if="d.ct" class="ct">{{ d.ct }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- c · In this chapter -->
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
/* Ice & water thesis (from Prototype1 work-with-me/index.html) */
.thesis {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 0;
  border: 2px solid var(--ink);
  margin-top: 48px;
}
@media (max-width: 860px) {
  .thesis { grid-template-columns: 1fr; }
}
.thesis .ph {
  min-height: 380px;
  border: 0;
  border-right: 2px solid var(--ink);
  border-radius: 0;
}
@media (max-width: 860px) {
  .thesis .ph {
    border-right: 0;
    border-bottom: 2px solid var(--ink);
    min-height: 280px;
  }
}
.thesis .body {
  padding: clamp(28px, 4vw, 56px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.thesis .body h2 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(28px, 3.4vw, 44px);
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin: 14px 0 18px;
  max-width: 16ch;
}
.thesis .body h2 em { color: var(--accent); }
.thesis .body p {
  font-family: var(--serif);
  font-size: 18px;
  line-height: 1.55;
  color: var(--ink-2);
  margin: 0 0 1em;
  max-width: 46ch;
}
.thesis .body p.emph {
  font-family: var(--serif);
  font-style: italic;
  color: var(--ink);
  font-size: 20px;
}

/* Two variables */
.vars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid var(--line);
  border-top: 0;
}
@media (max-width: 680px) {
  .vars { grid-template-columns: 1fr; }
}
.var {
  padding: 30px clamp(22px, 3vw, 36px);
  border-left: 1px solid var(--line);
}
.var:first-child { border-left: 0; }
@media (max-width: 680px) {
  .var { border-left: 0; border-top: 1px solid var(--line); }
}
.var .lab {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}
.var h3 {
  font-family: var(--serif);
  font-size: 26px;
  font-weight: 500;
  margin: 10px 0 8px;
  letter-spacing: -0.01em;
}
.var p {
  font-size: 15.5px;
  color: var(--ink-2);
  margin: 0;
}

/* Four domains */
.domains {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 48px;
  border: 2px solid var(--ink);
}
@media (max-width: 980px) {
  .domains { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px) {
  .domains { grid-template-columns: 1fr; }
}
.domain {
  padding: 32px 26px;
  border-left: 1px solid var(--ink);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.domain:first-child { border-left: 0; }
@media (max-width: 980px) {
  .domain:nth-child(3) { border-left: 0; border-top: 1px solid var(--ink); }
  .domain:nth-child(4) { border-top: 1px solid var(--ink); }
}
@media (max-width: 540px) {
  .domain { border-left: 0; border-top: 1px solid var(--ink); }
  .domain:first-child { border-top: 0; }
}
.domain .rn {
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.18em;
  color: var(--accent);
}
.domain h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.01em;
}
.domain p {
  font-family: var(--serif);
  font-size: 16px;
  line-height: 1.5;
  color: var(--ink-2);
  margin: 0;
  flex: 1;
}
.domain .ct {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed var(--line-2);
}
</style>
