<script setup lang="ts">
const { data: page } = await useAsyncData('about-biography', () =>
  queryCollection('about').path('/about/biography').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Biography'} — Breaking Mental Models`,
  description: () => page.value?.essay?.dek,
})
</script>

<template>
  <div v-if="page">
    <header class="essay-open">
      <div class="wrap">
        <p class="back">
          <NuxtLink to="/about">{{ page.essay?.backLabel }}</NuxtLink>
        </p>
        <div class="top-rule" style="margin-top: 30px;" />
        <p class="kick">{{ page.essay?.kick }}</p>
        <h1>{{ page.essay?.heading }} <em v-if="page.essay?.headingEm">{{ page.essay.headingEm }}</em></h1>
        <p class="dek">{{ page.essay?.dek }}</p>
        <p class="byline">
          {{ page.essay?.author }}<template v-if="page.essay?.readTime"><span class="dot">·</span>{{ page.essay.readTime }}</template><template v-if="page.essay?.updated"><span class="dot">·</span>{{ page.essay.updated }}</template>
        </p>
        <div class="bot-rule" style="margin-top: 36px;" />
      </div>
    </header>

    <Figure class="hero-img" :src="page.essay?.image" :label="page.essay?.heroImageLabel" />

    <article class="section" style="padding-block: clamp(48px, 7vw, 88px);">
      <div class="article">
        <ContentRenderer :value="page" />
      </div>
    </article>

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Article opener (from Prototype1 about/biography.html) */
.essay-open {
  text-align: center;
  padding-block: clamp(56px, 9vw, 110px) clamp(36px, 5vw, 64px);
}
.essay-open .back {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.essay-open .back :deep(a) {
  color: inherit;
  text-decoration: none;
}
.essay-open .top-rule,
.essay-open .bot-rule {
  width: 60px;
  height: 2px;
  background: var(--ink);
  margin: 0 auto;
}
.essay-open .kick {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin: 24px 0;
}
.essay-open h1 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(44px, 7vw, 90px);
  line-height: 0.98;
  letter-spacing: -0.025em;
  max-width: 14ch;
  margin: 0 auto;
}
.essay-open h1 em { color: var(--accent); }
.essay-open .dek {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(19px, 2vw, 24px);
  color: var(--ink-2);
  max-width: 42ch;
  margin: 24px auto 0;
  line-height: 1.5;
}
.essay-open .byline {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-top: 34px;
}
.essay-open .byline .dot { margin: 0 12px; color: var(--line-2); }

/* Full-bleed hero image */
.hero-img {
  width: 100%;
  height: clamp(280px, 42vw, 520px);
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  border-radius: 0;
}

/* Signature caption — the "Adelaide · May 2026" line under the "— A. A."
   sign-off renders as a small mono caption, not the large pull serif. */
.article :deep(.sig-cap) {
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.18em;
  color: var(--ink-3);
  text-transform: uppercase;
  font-style: normal;
  font-weight: 400;
}

/* Drop cap on the essay's opening paragraph only (mirrors .article p.first).
   Scoped to the first direct-child <p> of the ContentRenderer wrapper so it
   never leaks into nested paragraphs (note-aside bodies, pull quotes). */
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
