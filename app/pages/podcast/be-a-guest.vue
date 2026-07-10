<script setup lang="ts">
const { data: page } = await useAsyncData('podcast-be-a-guest', () =>
  queryCollection('podcast').path('/podcast/be-a-guest').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Be a Guest'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Podcast', to: '/podcast' },
  { label: 'Be a guest' },
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

    <!-- a · How it works -->
    <section v-if="page.steps?.length" class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secA" class="sec-head">
          <span class="rn">{{ page.secA.rn }}</span><h2>{{ page.secA.heading }}</h2>
        </div>
        <div class="steps">
          <div v-for="(s, i) in page.steps" :key="i" class="step">
            <span class="n">{{ s.n }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- b · The elephant list -->
    <section v-if="page.elephants?.length" class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secB" class="sec-head">
          <span class="rn">{{ page.secB.rn }}</span><h2>{{ page.secB.heading }}</h2>
        </div>
        <p v-if="page.secB?.lead" class="lead" style="max-width: 62ch;">{{ page.secB.lead }}</p>
        <div class="elephants">
          <div v-for="(e, i) in page.elephants" :key="i" class="ele">
            <span class="n">{{ e.n }}</span>
            <h4>{{ e.title }}</h4>
            <p>{{ e.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- c · Pitch your conversation (static mock form) -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secC" :id="page.secC.id" class="sec-head">
          <span class="rn">{{ page.secC.rn }}</span><h2>{{ page.secC.heading }}</h2>
        </div>
        <p v-if="page.banner" class="client-banner">{{ page.banner }}</p>
        <div class="pitch">
          <form @submit.prevent>
            <div class="two">
              <div class="field"><label>Your name</label><input type="text" placeholder="Full name"></div>
              <div class="field"><label>Email</label><input type="email" placeholder="you@email.com"></div>
            </div>
            <div class="field">
              <label>What's bothering you?</label>
              <textarea placeholder="The question you can't stop circling, the belief you're not sure you believe anymore — whatever you'd want to sit with on record." />
            </div>
            <button class="btn btn-primary" type="submit" style="border-radius: 0;">
              Send my pitch <span class="arrow">→</span>
            </button>
            <p class="meta" style="margin-top: 14px;">The less polished, the better. We read every message.</p>
          </form>
        </div>
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Be a guest (from Prototype1 podcast/be-a-guest.html) */
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 2px solid var(--ink);
  margin-top: 8px;
}
@media (max-width: 760px) {
  .steps { grid-template-columns: 1fr; }
}
.step {
  padding: 34px 30px;
  border-left: 1px solid var(--ink);
}
.step:first-child { border-left: 0; }
@media (max-width: 760px) {
  .step { border-left: 0; border-top: 1px solid var(--ink); }
  .step:first-child { border-top: 0; }
}
.step .n {
  font-family: var(--serif);
  font-size: 48px;
  font-weight: 500;
  color: var(--accent);
  line-height: 1;
  letter-spacing: -0.02em;
}
.step h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 500;
  margin: 14px 0 10px;
  letter-spacing: -0.01em;
}
.step p { font-size: 15.5px; color: var(--ink-2); margin: 0; line-height: 1.55; }

.elephants {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  margin-top: 8px;
}
@media (max-width: 680px) {
  .elephants { grid-template-columns: 1fr; }
}
.ele {
  padding: 26px 30px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.ele .n { font-family: var(--mono); font-size: 13px; color: var(--accent); letter-spacing: 0.1em; }
.ele h4 {
  font-family: var(--serif);
  font-size: 21px;
  font-weight: 500;
  margin: 6px 0 6px;
  letter-spacing: -0.01em;
}
.ele p { font-size: 15px; color: var(--ink-2); margin: 0; line-height: 1.5; }

/* Pitch form (static mock) */
.field { margin-bottom: 18px; }
.field label {
  display: block;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 7px;
}
.field input,
.field textarea {
  width: 100%;
  font-family: var(--sans);
  font-size: 15px;
  color: var(--ink);
  background: var(--paper-2);
  border: 1px solid var(--line-2);
  border-radius: var(--radius);
  padding: 12px 14px;
  transition: 0.12s;
}
.field input:focus,
.field textarea:focus { outline: none; border-color: var(--accent); background: #fff; }
.field textarea { min-height: 120px; resize: vertical; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 480px) {
  .two { grid-template-columns: 1fr; }
}
.pitch { max-width: 640px; }
</style>
