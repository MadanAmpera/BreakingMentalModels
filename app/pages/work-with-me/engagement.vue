<script setup lang="ts">
const { data: page } = await useAsyncData('work-with-me-engagement', () =>
  queryCollection('workwithme').path('/work-with-me/engagement').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Engagement Models'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Work With Me', to: '/work-with-me' },
  { label: 'Engagement models' },
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

    <!-- a · Three ways to work together -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secA" class="sec-head">
          <span class="rn">{{ page.secA.rn }}</span><h2>{{ page.secA.heading }}</h2>
        </div>

        <div v-if="page.models?.length" class="models">
          <div v-for="(m, i) in page.models" :key="i" class="model">
            <span class="rn">{{ m.rn }}</span>
            <h3>{{ m.title }}</h3>
            <p>{{ m.body }}</p>
            <span v-if="m.tag" class="tag">{{ m.tag }}</span>
          </div>
        </div>
        <p v-if="page.modelsNote" class="meta" style="margin-top: 18px; max-width: 70ch;">{{ page.modelsNote }}</p>
      </div>
    </section>

    <!-- b · Our approach in action -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secB" class="sec-head">
          <span class="rn">{{ page.secB.rn }}</span><h2>{{ page.secB.heading }}</h2>
        </div>
        <p v-if="page.secB?.lead" class="lead" style="max-width: 62ch;">{{ page.secB.lead }}</p>

        <div v-if="page.approach?.length" class="approach">
          <div v-for="(step, i) in page.approach" :key="i" class="step">
            <span class="s">{{ step.s }}</span>
            <h4>{{ step.title }}</h4>
            <p>{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- c · Who we work with -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secC" class="sec-head">
          <span class="rn">{{ page.secC.rn }}</span><h2>{{ page.secC.heading }}</h2>
        </div>
        <p v-if="page.secC?.lead" class="lead" style="max-width: 62ch;">{{ page.secC.lead }}</p>

        <div v-if="page.who?.length" class="who">
          <div v-for="(w, i) in page.who" :key="i" class="w">
            <span class="n">{{ w.n }}</span>
            <h3>{{ w.title }}</h3>
            <p>{{ w.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- The principle underneath all of it -->
    <section v-if="page.principle" class="section dark-section">
      <div class="wrap principle-wrap">
        <span v-if="page.principle.eyebrow" class="eyebrow">{{ page.principle.eyebrow }}</span>
        <p class="display principle-display">
          {{ page.principle.displayPre }} <span class="demph">{{ page.principle.displayEm }}</span> {{ page.principle.displayPost }}
        </p>
        <p v-if="page.principle.lead" class="lead" style="max-width: 54ch; margin: 24px auto 0;">{{ page.principle.lead }}</p>
        <div v-if="page.principle.ctaLabel" class="principle-cta">
          <NuxtLink class="btn btn-primary" :to="page.principle.ctaTo" style="border-radius: 0;">
            {{ page.principle.ctaLabel }} <span class="arrow">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Engagement models (from Prototype1 work-with-me/engagement.html) */
.models {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-top: 8px;
  border: 2px solid var(--ink);
}
@media (max-width: 820px) {
  .models { grid-template-columns: 1fr; }
}
.model {
  padding: 34px 30px;
  border-left: 1px solid var(--ink);
  display: flex;
  flex-direction: column;
}
.model:first-child { border-left: 0; }
@media (max-width: 820px) {
  .model { border-left: 0; border-top: 1px solid var(--ink); }
  .model:first-child { border-top: 0; }
}
.model .rn {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}
.model h3 {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 500;
  margin: 12px 0 14px;
  letter-spacing: -0.015em;
}
.model p {
  font-family: var(--serif);
  font-size: 16.5px;
  line-height: 1.55;
  color: var(--ink-2);
  margin: 0;
  flex: 1;
}
.model .tag { margin-top: 20px; align-self: flex-start; }

/* Approach steps */
.approach {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  margin-top: 8px;
}
@media (max-width: 820px) {
  .approach { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .approach { grid-template-columns: 1fr; }
}
.step {
  padding: 28px 24px 28px 0;
  border-left: 1px solid var(--line);
}
.step:first-child { border-left: 0; padding-left: 0; }
@media (max-width: 820px) {
  .step { padding-left: 24px; }
  .step:nth-child(odd) { border-left: 0; padding-left: 0; }
  .step:nth-child(n+3) { border-top: 1px solid var(--line); padding-top: 28px; }
}
.step .s {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--accent);
}
.step h4 {
  font-family: var(--serif);
  font-size: 21px;
  font-weight: 500;
  margin: 10px 0 6px;
}
.step p { font-size: 14.5px; color: var(--ink-2); margin: 0; line-height: 1.5; }

/* Who we work with */
.who {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  margin-top: 8px;
}
@media (max-width: 680px) {
  .who { grid-template-columns: 1fr; }
}
.who .w {
  padding: 28px 30px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.who .w .n {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.1em;
}
.who .w h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  margin: 8px 0 8px;
  letter-spacing: -0.01em;
}
.who .w p { font-size: 15px; color: var(--ink-2); margin: 0; line-height: 1.5; }

/* Principle panel */
.principle-wrap { max-width: 880px; text-align: center; }
.principle-display {
  font-size: clamp(30px, 4.4vw, 52px);
  margin: 20px auto 0;
  max-width: 24ch;
}
.principle-display .demph { color: #d98a5e; font-style: italic; }
.principle-cta {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-top: 32px;
  flex-wrap: wrap;
}
</style>
