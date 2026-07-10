<script setup lang="ts">
const { data: page } = await useAsyncData('podcast', () =>
  queryCollection('podcast').path('/podcast').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'The Podcast'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [{ label: 'Home', to: '/' }, { label: 'The Podcast' }]
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

    <!-- a · Featured episode -->
    <section v-if="page.featured" class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secA" class="sec-head">
          <span class="rn">{{ page.secA.rn }}</span><h2>{{ page.secA.heading }}</h2>
        </div>

        <div class="feat-ep">
          <div class="art">
            <img v-if="page.featured.image" :src="page.featured.image" alt="">
            <div class="play">▶</div>
            <span v-if="page.featured.artLabel" class="ph-lab">{{ page.featured.artLabel }}</span>
          </div>
          <div class="body">
            <span class="ep-no">{{ page.featured.epNo }}</span>
            <h2>{{ page.featured.title }}</h2>
            <p>{{ page.featured.body }}</p>
            <div v-if="page.featured.credits?.length" class="credits">
              <span
                v-for="(c, i) in page.featured.credits"
                :key="i"
                class="tag"
                :class="{ accent: c.accent }"
              >{{ c.label }}</span>
            </div>
            <div class="feat-actions">
              <NuxtLink v-if="page.featured.primaryLabel" class="btn btn-primary" :to="page.featured.primaryTo" style="border-radius: 0;">
                {{ page.featured.primaryLabel }} <span class="arrow">→</span>
              </NuxtLink>
              <NuxtLink v-if="page.featured.ghostLabel" class="btn btn-ghost" :to="page.featured.ghostTo" style="border-radius: 0;">
                {{ page.featured.ghostLabel }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- b · Three anchors -->
    <section v-if="page.anchors?.length" class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secB" class="sec-head">
          <span class="rn">{{ page.secB.rn }}</span><h2>{{ page.secB.heading }}</h2>
        </div>
        <p v-if="page.secB?.lead" class="lead" style="max-width: 62ch;">{{ page.secB.lead }}</p>

        <div class="anchors">
          <div v-for="(a, i) in page.anchors" :key="i" class="anchor">
            <span class="n">{{ a.n }}</span>
            <h4>{{ a.title }}</h4>
            <p>{{ a.body }}</p>
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
/* Featured episode player (from Prototype1 podcast/index.html) */
.feat-ep {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 0;
  border: 2px solid var(--ink);
  margin-top: 8px;
}
@media (max-width: 860px) {
  .feat-ep { grid-template-columns: 1fr; }
}
.feat-ep .art {
  position: relative;
  border-right: 2px solid var(--ink);
  min-height: 420px;
  background: repeating-linear-gradient(135deg, var(--paper-3) 0 11px, transparent 11px 22px), var(--paper-2);
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 860px) {
  .feat-ep .art { border-right: 0; border-bottom: 2px solid var(--ink); min-height: 300px; }
}
.feat-ep .art img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.feat-ep .art .play {
  position: relative;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  padding-left: 6px;
  box-shadow: 0 16px 40px -16px rgba(189, 91, 42, 0.7);
}
.feat-ep .art .ph-lab {
  position: absolute;
  bottom: 14px;
  left: 14px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
  background: var(--paper);
  border: 1px solid var(--line-2);
  padding: 5px 10px;
  border-radius: 99px;
}
.feat-ep .body {
  padding: clamp(28px, 3.6vw, 52px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.feat-ep .body .ep-no {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}
.feat-ep .body h2 {
  font-family: var(--serif);
  font-size: clamp(28px, 3.4vw, 42px);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.018em;
  margin: 12px 0 16px;
}
.feat-ep .body p {
  font-family: var(--serif);
  font-size: 18px;
  line-height: 1.55;
  color: var(--ink-2);
  margin: 0 0 1em;
  max-width: 48ch;
}
.feat-ep .body .credits { display: flex; flex-wrap: wrap; gap: 10px; margin: 8px 0 22px; }
.feat-actions { display: flex; gap: 12px; flex-wrap: wrap; }

/* Three anchors */
.anchors {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  margin-top: 8px;
}
@media (max-width: 760px) {
  .anchors { grid-template-columns: 1fr; }
}
.anchor {
  padding: 30px 28px 30px 0;
  border-left: 1px solid var(--line);
}
.anchor:first-child { border-left: 0; }
@media (max-width: 760px) {
  .anchor { border-left: 0; padding-left: 0; border-top: 1px solid var(--line); padding-top: 28px; }
  .anchor:first-child { border-top: 0; padding-top: 0; }
}
.anchor .n {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}
.anchor h4 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  margin: 10px 0 8px;
  letter-spacing: -0.01em;
}
.anchor p { font-size: 15px; color: var(--ink-2); margin: 0; line-height: 1.5; }
</style>
