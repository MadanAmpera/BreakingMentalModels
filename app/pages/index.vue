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
    <!-- TITLE PAGE -->
    <header class="titlepage">
      <div class="wrap">
        <div class="top-rule" />
        <p class="kick">{{ page.kicker }}</p>
        <h1>
          {{ page.headingLine1 }}<br>{{ page.headingLine2 }}
          <span class="amp">{{ page.headingAccent }}</span>
        </h1>
        <p class="byline">{{ page.byline }}</p>
        <p class="imprint">{{ page.imprint }}</p>
        <div class="bot-rule" style="margin-top: 36px;" />
      </div>
    </header>

    <!-- EPIGRAPH -->
    <section class="section epigraph">
      <div class="wrap">
        <blockquote>&ldquo;{{ page.epigraphQuote }}&rdquo;</blockquote>
        <p class="attr">— {{ page.epigraphAttribution }}</p>
      </div>
    </section>

    <!-- CONTENTS — TILE GRID -->
    <section class="section">
      <div class="wrap">
        <div class="contents-head">
          <span class="t">Contents</span>
          <span class="t" style="color: var(--ink-3);">{{ page.contentsYear }}</span>
        </div>

        <div class="toc-grid">
          <NuxtLink
            v-for="tile in page.tiles"
            :key="tile.to"
            class="toc-tile"
            :to="tile.to"
          >
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

    <!-- FEATURE -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div class="feature">
          <div class="ph" :data-label="page.featureImageLabel" />
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
/* ── Homepage-specific styles (ported from Prototype1 index.html) ────────── */

/* TITLE PAGE HERO */
.titlepage {
  text-align: center;
  padding-block: clamp(56px, 11vw, 140px) clamp(48px, 8vw, 110px);
  position: relative;
}
.titlepage .top-rule,
.titlepage .bot-rule {
  width: 80px;
  height: 2px;
  background: var(--ink);
  margin: 0 auto;
}
.titlepage .kick {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin: 28px 0;
}
.titlepage h1 {
  font-size: clamp(50px, 10vw, 140px);
  line-height: 0.92;
  letter-spacing: -0.035em;
  font-weight: 500;
}
.titlepage h1 .amp {
  font-style: italic;
  color: var(--accent);
}
.titlepage .byline {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(20px, 2.4vw, 28px);
  color: var(--ink-2);
  margin: 30px 0;
}
.titlepage .imprint {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-3);
}

/* EPIGRAPH */
.epigraph {
  background: var(--paper-ink);
  color: var(--ink-on-dark);
}
.epigraph .wrap {
  max-width: 880px;
}
.epigraph blockquote {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(26px, 4vw, 46px);
  line-height: 1.2;
  letter-spacing: -0.01em;
  font-weight: 500;
  text-align: center;
}
.epigraph .attr {
  text-align: center;
  margin-top: 28px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-on-dark-2);
}

/* CONTENTS — tile grid */
.contents-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 16px;
  margin-bottom: 24px;
}
.contents-head .t {
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.toc-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 14px;
}
.toc-tile {
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--ink);
  background: var(--paper-2);
  border: 1px solid var(--line-2);
  padding: 22px 22px 20px;
  position: relative;
  min-height: 200px;
  transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
}
.toc-grid > :nth-child(n + 4) {
  grid-column: span 3;
}
.toc-tile:hover {
  background: var(--accent-tint);
  border-color: var(--accent);
}
.toc-tile:hover .tt-h3 {
  color: var(--accent-deep);
}
.toc-tile:hover .tt-arrow {
  transform: translateX(4px);
  color: var(--accent);
}

.tt-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.tt-rn {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--accent);
}
.tt-count {
  font-family: var(--serif);
  font-style: italic;
  font-size: 16px;
  color: var(--ink-3);
}
.tt-count b {
  font-style: normal;
  font-weight: 500;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 22px;
  margin-right: 6px;
  letter-spacing: -0.01em;
}

.tt-h3 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(24px, 2.2vw, 30px);
  line-height: 1.02;
  letter-spacing: -0.015em;
  margin: 18px 0 10px;
  transition: color 0.18s;
}
.toc-grid > :nth-child(n + 4) .tt-h3 {
  font-size: clamp(22px, 1.9vw, 26px);
}
.tt-desc {
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ink-2);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.toc-grid > :nth-child(n + 4) .tt-desc {
  -webkit-line-clamp: 2;
}

.tt-foot {
  margin-top: auto;
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-top: 1px solid var(--line-2);
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.tt-arrow {
  font-family: var(--serif);
  font-style: normal;
  font-size: 18px;
  color: var(--ink-2);
  transition: transform 0.18s ease, color 0.18s ease;
}

@media (max-width: 1100px) {
  .toc-tile {
    grid-column: span 6;
    min-height: 180px;
  }
  .toc-grid > :nth-child(n + 4) {
    grid-column: span 6;
  }
}
@media (max-width: 620px) {
  .toc-tile,
  .toc-grid > :nth-child(n + 4) {
    grid-column: span 12;
    min-height: 0;
  }
  .tt-desc {
    -webkit-line-clamp: 2 !important;
  }
}

/* FEATURE split */
.feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 2px solid var(--ink);
  border-radius: 0;
  overflow: hidden;
}
@media (max-width: 780px) {
  .feature {
    grid-template-columns: 1fr;
  }
}
.feature .ph {
  min-height: 320px;
  border: 0;
  border-radius: 0;
}
.feature .body {
  padding: clamp(28px, 4vw, 52px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* CTA */
.cta {
  text-align: center;
}
.cta .display {
  max-width: 18ch;
  margin: 18px auto 0;
}
</style>
