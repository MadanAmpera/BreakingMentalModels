<script setup lang="ts">
const { data: page } = await useAsyncData('home', () =>
  queryCollection('pages').path('/').first(),
)

useSeoMeta({
  title: () => page.value?.title ?? 'Breaking Mental Models',
  description: () => page.value?.byline,
})
</script>

<template>
  <div v-if="page">
    <!-- TITLE (shortened) -->
    <header class="titlepage">
      <div class="wrap">
        <p class="kick">{{ page.kicker }}</p>
        <h1>
          {{ page.headingLine1 }} {{ page.headingLine2 }}
          <span class="amp">{{ page.headingAccent }}</span>
        </h1>
        <p class="byline">{{ page.byline }}</p>
      </div>
    </header>

    <!-- TWO DOORS: students / organisations -->
    <section class="doors-section">
      <div class="wrap">
        <div class="doors">
          <NuxtLink v-for="d in page.doors" :key="d.to" class="door" :to="d.to">
            <span class="eyebrow">{{ d.eyebrow }}</span>
            <h2>{{ d.title }} <em v-if="d.titleAccent">{{ d.titleAccent }}</em></h2>
            <p class="door-body">{{ d.body }}</p>
            <div v-if="d.items?.length" class="door-list">
              <span class="door-lab">{{ d.listLabel }}</span>
              <span v-for="(it, i) in d.items" :key="i" class="door-item">
                <span class="di-t">{{ it.title }}</span>
                <span v-if="it.meta" class="di-m">{{ it.meta }}</span>
              </span>
            </div>
            <span class="door-go">{{ d.linkLabel }} <span class="arrow">→</span></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- PORTFOLIO STRIP -->
    <section class="section strip-section">
      <div class="wrap">
        <div class="contents-head">
          <span class="t">{{ page.tilesLabel ?? 'Contents' }}</span>
          <span class="t" style="color: var(--ink-3);">{{ page.contentsYear }}</span>
        </div>
        <div class="toc-grid">
          <NuxtLink v-for="tile in page.tiles" :key="tile.to" class="toc-tile" :to="tile.to">
            <div class="tt-head">
              <span class="tt-rn">{{ tile.roman }}</span>
              <span class="tt-count"><b>{{ tile.countBold }}</b>{{ tile.countText }}</span>
            </div>
            <h3 class="tt-h3">{{ tile.title }}</h3>
            <p class="tt-desc">{{ tile.description }}</p>
            <div class="tt-foot">
              <span>{{ tile.foot }}</span><span class="tt-arrow">→</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- EPIGRAPH -->
    <section class="section epigraph">
      <div class="wrap">
        <blockquote>&ldquo;{{ page.epigraphQuote }}&rdquo;</blockquote>
        <p class="attr">— {{ page.epigraphAttribution }}</p>
      </div>
    </section>

    <!-- FEATURE -->
    <section class="section">
      <div class="wrap">
        <div class="feature">
          <Figure :src="page.featureImage" :label="page.featureImageLabel" />
          <div class="body">
            <span class="eyebrow">{{ page.featureEyebrow }}</span>
            <h2 class="h2" style="margin: 14px 0; max-width: 16ch;">{{ page.featureHeading }}</h2>
            <p style="color: var(--ink-2); max-width: 48ch;">{{ page.featureBody }}</p>
            <NuxtLink class="link-arrow" :to="page.featureLinkTo" style="margin-top: 20px;">
              {{ page.featureLinkLabel }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section dark-section cta">
      <div class="wrap">
        <span class="eyebrow">{{ page.ctaEyebrow }}</span>
        <p class="display">{{ page.ctaDisplay }}</p>
        <div style="display: flex; gap: 14px; justify-content: center; margin-top: 32px; flex-wrap: wrap;">
          <NuxtLink class="btn btn-primary" :to="page.ctaPrimaryTo" style="border-radius: 0;">
            {{ page.ctaPrimaryLabel }} <span class="arrow">→</span>
          </NuxtLink>
          <NuxtLink
            v-if="page.ctaGhostLabel"
            class="btn btn-ghost"
            :to="page.ctaGhostTo"
            style="color: var(--ink-on-dark); border-color: var(--line-dark); border-radius: 0;"
          >
            {{ page.ctaGhostLabel }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* TITLE (shortened so the two doors sit in the first screen) */
.titlepage { text-align: center; padding-block: clamp(40px, 6vw, 80px) clamp(28px, 4vw, 48px); }
.titlepage .kick { font-family: var(--mono); font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-3); margin: 0 0 20px; }
.titlepage h1 { font-size: clamp(42px, 7vw, 96px); line-height: 0.95; letter-spacing: -0.035em; font-weight: 500; }
.titlepage h1 .amp { font-style: italic; color: var(--accent); }
.titlepage .byline { font-family: var(--serif); font-style: italic; font-size: clamp(18px, 2vw, 24px); color: var(--ink-2); margin: 20px auto 0; max-width: 40ch; }

/* TWO DOORS */
.doors-section { padding-bottom: clamp(56px, 8vw, 100px); }
.doors { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px; background: var(--ink); border: 2px solid var(--ink); }
@media (max-width: 820px) { .doors { grid-template-columns: 1fr; } }
.door { display: flex; flex-direction: column; gap: 18px; padding: clamp(28px, 4vw, 52px); background: var(--paper-2); color: var(--ink); text-decoration: none; transition: background 0.18s ease; }
.door:hover { background: var(--accent-tint); }
.door h2 { font-family: var(--serif); font-weight: 500; font-size: clamp(32px, 4vw, 52px); line-height: 1.02; letter-spacing: -0.022em; max-width: 14ch; }
.door h2 em { color: var(--accent); }
.door-body { font-size: 16px; line-height: 1.55; color: var(--ink-2); max-width: 44ch; margin: 0; }
.door-list { display: flex; flex-direction: column; border-top: 2px solid var(--ink); margin-top: 6px; }
.door-lab { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); padding: 12px 0 4px; }
.door-item { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--line-2); }
.di-t { font-family: var(--serif); font-size: 19px; line-height: 1.25; }
.di-m { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); text-align: right; flex: none; }
.door-go { margin-top: auto; padding-top: 10px; align-self: flex-start; display: inline-flex; gap: 0.6em; align-items: center; background: var(--accent); color: #fff; font-family: var(--sans); font-size: 15px; font-weight: 500; padding: 13px 22px; }
.door:hover .door-go { background: var(--accent-deep); }
.door-go .arrow { transition: transform 0.18s ease; }
.door:hover .door-go .arrow { transform: translateX(3px); }

/* PORTFOLIO STRIP */
.strip-section { padding-top: 0; }
.contents-head { display: flex; align-items: baseline; justify-content: space-between; border-bottom: 2px solid var(--ink); padding-bottom: 16px; margin-bottom: 24px; }
.contents-head .t { font-family: var(--mono); font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; }
.toc-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
@media (max-width: 1100px) { .toc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) { .toc-grid { grid-template-columns: 1fr; } }
.toc-tile { display: flex; flex-direction: column; text-decoration: none; color: var(--ink); background: var(--paper-2); border: 1px solid var(--line-2); padding: 20px 20px 18px; transition: background 0.18s ease, border-color 0.18s ease; }
.toc-tile:hover { background: var(--accent-tint); border-color: var(--accent); }
.toc-tile:hover .tt-h3 { color: var(--accent-deep); }
.toc-tile:hover .tt-arrow { transform: translateX(4px); color: var(--accent); }
.tt-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.tt-rn { font-family: var(--mono); font-size: 12px; letter-spacing: 0.18em; color: var(--accent); }
.tt-count { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink-3); }
.tt-count b { font-style: normal; font-weight: 500; color: var(--ink); font-size: 19px; margin-right: 6px; }
.tt-h3 { font-family: var(--serif); font-weight: 500; font-size: clamp(22px, 2vw, 26px); line-height: 1.05; letter-spacing: -0.015em; margin: 14px 0 8px; transition: color 0.18s; }
.tt-desc { font-size: 13.5px; line-height: 1.45; color: var(--ink-2); margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.tt-foot { margin-top: auto; padding-top: 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; border-top: 1px solid var(--line-2); font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
.tt-desc + .tt-foot { margin-top: 14px; }
.tt-arrow { font-family: var(--serif); font-size: 18px; color: var(--ink-2); transition: transform 0.18s ease, color 0.18s ease; }

/* EPIGRAPH */
.epigraph { background: var(--paper-ink); color: var(--ink-on-dark); }
.epigraph .wrap { max-width: 880px; }
.epigraph blockquote { margin: 0; font-family: var(--serif); font-size: clamp(26px, 4vw, 46px); line-height: 1.2; letter-spacing: -0.01em; font-weight: 500; text-align: center; }
.epigraph .attr { text-align: center; margin-top: 28px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-on-dark-2); }

/* FEATURE split */
.feature { display: grid; grid-template-columns: 1fr 1fr; border: 2px solid var(--ink); overflow: hidden; }
@media (max-width: 780px) { .feature { grid-template-columns: 1fr; } }
.feature .ph { min-height: 320px; border: 0; border-radius: 0; }
.feature .body { padding: clamp(28px, 4vw, 52px); display: flex; flex-direction: column; justify-content: center; }

/* CTA */
.cta { text-align: center; }
.cta .display { max-width: 18ch; margin: 18px auto 0; }
</style>
