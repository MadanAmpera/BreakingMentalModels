<script setup lang="ts">
const { data: page } = await useAsyncData('voices', () =>
  queryCollection('voices').path('/voices').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Voices'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [{ label: 'Home', to: '/' }, { label: 'Voices' }]
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

    <!-- Featured testimonial -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <p v-if="page.banner" class="client-banner">{{ page.banner }}</p>

        <div v-if="page.feat" class="feat-quote">
          <span class="mark">“</span>
          <blockquote>
            {{ page.feat.quotePre }} <em v-if="page.feat.quoteEm">{{ page.feat.quoteEm }}</em> {{ page.feat.quotePost }}
          </blockquote>
          <p v-if="page.feat.byLabel || page.feat.byNote" class="by">
            {{ page.feat.byLabel }} <span v-if="page.feat.byNote" class="client-note">{{ page.feat.byNote }}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- a · From organisations & leaders -->
    <section v-if="page.orgTestimonials?.length" class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secA" class="sec-head">
          <span class="rn">{{ page.secA.rn }}</span><h2>{{ page.secA.heading }}</h2>
        </div>
        <div class="tcols">
          <div v-for="(t, i) in page.orgTestimonials" :key="i" class="tcard">
            <p>{{ t.quote }}</p>
            <div class="who">
              <span class="av" :class="{ 'has-img': t.avatar }"><img v-if="t.avatar" :src="t.avatar" alt=""></span>
              <div>
                <div class="nm">
                  <span v-if="t.nameNote" class="client-note">{{ t.nameNote }}</span>
                  <template v-else>{{ t.name }}</template>
                </div>
                <div v-if="t.role" class="rl">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- b · Student feedback -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secB" :id="page.secB.id" class="sec-head">
          <span class="rn">{{ page.secB.rn }}</span><h2>{{ page.secB.heading }}</h2>
        </div>
        <p v-if="page.secB?.lead" class="lead" style="max-width: 62ch;">{{ page.secB.lead }}</p>

        <div v-if="page.videos?.length" class="vids">
          <div v-for="(v, i) in page.videos" :key="i" class="vid">
            <div class="thumb">
              <img v-if="v.image" :src="v.image" alt="">
              <div class="play">▶</div>
              <span v-if="v.label" class="ph-lab">{{ v.label }}</span>
            </div>
            <div class="cap">
              <p class="q">{{ v.quote }}</p>
              <p class="nm">
                <span v-if="v.nameNote" class="client-note">{{ v.nameNote }}</span><template v-else>{{ v.name }}</template><template v-if="v.suffix"> · {{ v.suffix }}</template>
              </p>
            </div>
          </div>
        </div>

        <div v-if="page.studentTestimonials?.length" class="tcols" style="margin-top: 40px;">
          <div v-for="(t, i) in page.studentTestimonials" :key="i" class="tcard">
            <p>{{ t.quote }}</p>
            <div class="who">
              <span class="av" :class="{ 'has-img': t.avatar }"><img v-if="t.avatar" :src="t.avatar" alt=""></span>
              <div>
                <div class="nm">
                  <span v-if="t.nameNote" class="client-note">{{ t.nameNote }}</span>
                  <template v-else>{{ t.name }}</template>
                </div>
                <div v-if="t.role" class="rl">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Voices (from Prototype1 voices/index.html) */
.feat-quote {
  border: 2px solid var(--ink);
  padding: clamp(32px, 5vw, 64px);
  margin-top: 8px;
  text-align: center;
}
.feat-quote .mark {
  font-family: var(--serif);
  font-size: 64px;
  line-height: 0.5;
  color: var(--accent);
  display: block;
  height: 34px;
}
.feat-quote blockquote {
  margin: 0 auto;
  font-family: var(--serif);
  font-size: clamp(24px, 3.4vw, 40px);
  line-height: 1.28;
  font-weight: 500;
  letter-spacing: -0.012em;
  max-width: 24ch;
}
.feat-quote blockquote em { color: var(--accent); }
.feat-quote .by {
  margin-top: 28px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
}

/* Testimonial masonry */
.tcols { columns: 2; column-gap: 24px; margin-top: 8px; }
@media (max-width: 760px) {
  .tcols { columns: 1; }
}
.tcard {
  break-inside: avoid;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 26px;
  margin-bottom: 24px;
}
.tcard p {
  font-family: var(--serif);
  font-size: 18px;
  line-height: 1.5;
  color: var(--ink);
  margin: 0 0 18px;
}
.tcard p em { color: var(--accent); font-style: italic; }
.tcard .who {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.tcard .who .av {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex: none;
  overflow: hidden;
  background: repeating-linear-gradient(135deg, var(--paper-3) 0 7px, transparent 7px 14px), var(--paper-3);
  border: 1px solid var(--line-2);
}
.tcard .who .av.has-img { background: none; }
.tcard .who .av img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.tcard .who .nm { font-family: var(--sans); font-weight: 600; font-size: 14.5px; color: var(--ink); }
.tcard .who .rl {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--ink-3);
  margin-top: 2px;
}

/* Student feedback video grid */
.vids {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 8px;
}
@media (max-width: 820px) {
  .vids { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 520px) {
  .vids { grid-template-columns: 1fr; }
}
.vid {
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--paper-2);
}
.vid .thumb {
  position: relative;
  aspect-ratio: 16 / 10;
  border-bottom: 1px solid var(--line);
  background: repeating-linear-gradient(135deg, var(--paper-3) 0 11px, transparent 11px 22px), var(--paper-2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.vid .thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.vid .thumb .play {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding-left: 4px;
}
.vid .thumb .ph-lab {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-family: var(--mono);
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
  background: var(--paper);
  border: 1px solid var(--line-2);
  padding: 3px 8px;
  border-radius: 99px;
}
.vid .cap { padding: 18px 20px; }
.vid .cap .q {
  font-family: var(--serif);
  font-size: 16.5px;
  line-height: 1.4;
  color: var(--ink);
  margin: 0 0 10px;
}
.vid .cap .nm { font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; color: var(--ink-3); }
</style>
