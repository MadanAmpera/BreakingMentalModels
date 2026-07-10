<script setup lang="ts">
const { data: page } = await useAsyncData('podcast-episodes', () =>
  queryCollection('podcast').path('/podcast/episodes').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Episode Library'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Podcast', to: '/podcast' },
  { label: 'Episode library' },
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

    <!-- Live episode -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <p v-if="page.banner" class="client-banner">{{ page.banner }}</p>

        <div v-if="page.liveHead" class="idx-head">
          <span class="t">{{ page.liveHead.label }}</span>
          <span v-if="page.liveHead.count" class="t" style="color: var(--ink-3);">{{ page.liveHead.count }}</span>
        </div>

        <div v-if="page.live" class="ep-live" style="margin-top: 24px;">
          <div class="top">
            <div class="art">
              <img v-if="page.live.image" :src="page.live.image" alt="">
              <div class="play">▶</div>
              <span v-if="page.live.artLabel" class="ph-lab">{{ page.live.artLabel }}</span>
            </div>
            <div class="meta">
              <span class="st">{{ page.live.status }}</span>
              <h2>{{ page.live.title }}</h2>
              <p>{{ page.live.body }}</p>
              <div class="live-actions">
                <a v-if="page.live.listenLabel" class="btn btn-primary" :href="page.live.listenTo" style="border-radius: 0;">{{ page.live.listenLabel }}</a>
                <span v-if="page.live.recorded" class="tag">{{ page.live.recorded }}</span>
              </div>
            </div>
          </div>
          <div v-if="page.live.details?.length" class="detail">
            <div v-for="(d, i) in page.live.details" :key="i" class="d">
              <h4>{{ d.h }}</h4>
              <p>{{ d.p }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pipeline -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.pipelineHead" class="idx-head">
          <span class="t">{{ page.pipelineHead.label }}</span>
          <span v-if="page.pipelineHead.count" class="t" style="color: var(--ink-3);">{{ page.pipelineHead.count }}</span>
        </div>

        <div v-for="(ep, i) in page.pipeline" :key="i" class="up">
          <div class="no">{{ ep.no }}<span v-if="ep.status" class="st">{{ ep.status }}</span></div>
          <div class="body">
            <div class="ttl">{{ ep.title }}</div>
            <p v-if="ep.desc" class="ds">{{ ep.desc }}</p>
          </div>
          <div v-if="ep.guest" class="guest">{{ ep.guest }}</div>
        </div>
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Live episode hero card (from Prototype1 podcast/episodes.html) */
.ep-live { border: 2px solid var(--ink); margin-top: 8px; }
.ep-live .top { display: grid; grid-template-columns: 300px 1fr; gap: 0; }
@media (max-width: 760px) {
  .ep-live .top { grid-template-columns: 1fr; }
}
.ep-live .art {
  position: relative;
  border-right: 2px solid var(--ink);
  min-height: 300px;
  background: repeating-linear-gradient(135deg, var(--paper-3) 0 11px, transparent 11px 22px), var(--paper-2);
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 760px) {
  .ep-live .art { border-right: 0; border-bottom: 2px solid var(--ink); min-height: 220px; }
}
.ep-live .art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ep-live .art .play {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  padding-left: 5px;
}
.ep-live .art .ph-lab {
  position: absolute;
  bottom: 12px;
  left: 12px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
  background: var(--paper);
  border: 1px solid var(--line-2);
  padding: 4px 9px;
  border-radius: 99px;
}
.ep-live .meta {
  padding: clamp(24px, 3vw, 40px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ep-live .meta .st {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 8px;
}
.ep-live .meta .st::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4f6a52;
  box-shadow: 0 0 0 4px rgba(79, 106, 82, 0.18);
}
.ep-live .meta h2 {
  font-family: var(--serif);
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.018em;
  margin: 12px 0 14px;
}
.ep-live .meta p { font-size: 16px; color: var(--ink-2); margin: 0 0 18px; max-width: 52ch; }
.live-actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.ep-live .detail {
  border-top: 2px solid var(--ink);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
@media (max-width: 820px) {
  .ep-live .detail { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 520px) {
  .ep-live .detail { grid-template-columns: 1fr; }
}
.ep-live .detail .d { padding: 24px 26px; border-left: 1px solid var(--line); }
.ep-live .detail .d:first-child { border-left: 0; }
@media (max-width: 820px) {
  .ep-live .detail .d:nth-child(3) { border-left: 0; }
  .ep-live .detail .d:nth-child(n+3) { border-top: 1px solid var(--line); }
}
@media (max-width: 520px) {
  .ep-live .detail .d { border-left: 0; border-top: 1px solid var(--line); }
  .ep-live .detail .d:first-child { border-top: 0; }
}
.ep-live .detail .d h4 {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 8px;
}
.ep-live .detail .d p { font-size: 14px; color: var(--ink-2); margin: 0; line-height: 1.5; }

/* Upcoming list */
.up {
  display: grid;
  grid-template-columns: 90px 1fr 150px;
  gap: 24px;
  padding: 26px 0;
  border-top: 1px solid var(--line-2);
  align-items: baseline;
}
.up:last-child { border-bottom: 1px solid var(--line-2); }
.up .no { font-family: var(--mono); font-size: 12.5px; letter-spacing: 0.08em; color: var(--ink-3); }
.up .no .st { display: block; color: var(--accent); margin-top: 4px; }
.up .body .ttl {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
}
.up .body .ds { font-size: 14.5px; color: var(--ink-2); margin-top: 6px; max-width: 60ch; }
.up .guest {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.06em;
  color: var(--ink-3);
  text-align: right;
}
@media (max-width: 680px) {
  .up { grid-template-columns: 70px 1fr; }
  .up .guest { grid-column: 2; text-align: left; margin-top: 6px; }
}
</style>
