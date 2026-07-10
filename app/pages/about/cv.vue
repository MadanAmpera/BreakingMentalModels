<script setup lang="ts">
const { data: page } = await useAsyncData('about-cv', () =>
  queryCollection('about').path('/about/cv').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Profile & CV'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Profile & CV' },
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

    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.intro" class="intro">
          <Figure :src="page.intro.image" :label="page.intro.videoLabel">
            <div class="play">▶</div>
          </Figure>
          <div class="body">
            <span class="eyebrow">{{ page.intro.eyebrow }}</span>
            <h2>{{ page.intro.heading }}</h2>
            <p v-for="(para, i) in page.intro.paragraphs" :key="i">{{ para }}</p>
            <div v-if="page.intro.meta?.length" class="meta">
              <span v-for="(m, i) in page.intro.meta" :key="i">{{ m }}</span>
            </div>
          </div>
        </div>

        <p v-if="page.banner" class="client-banner" style="margin-top: 48px;">{{ page.banner }}</p>

        <div style="margin-top: 24px;">
          <div v-for="(sec, si) in page.cvSections" :key="si" class="cv-section">
            <h3>{{ sec.title }}</h3>
            <div>
              <div v-for="(item, ii) in sec.items" :key="ii" class="cv-item">
                <span class="yr">{{ item.yr }}</span>
                <div>
                  <div class="title">{{ item.title }}</div>
                  <div v-if="item.where" class="where">{{ item.where }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="page.downloadBar" class="download-bar">
          <span class="lab">{{ page.downloadBar.label }}</span>
          <a v-for="(l, i) in page.downloadBar.links" :key="i" class="btn btn-ghost" :href="l.to">{{ l.label }}</a>
        </div>
      </div>
    </section>

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* CV (from Prototype1 about/cv.html) */
.intro {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0;
  border: 2px solid var(--ink);
  margin-top: 48px;
}
@media (max-width: 820px) {
  .intro { grid-template-columns: 1fr; }
}
.intro .ph {
  min-height: 420px;
  border: 0;
  border-right: 2px solid var(--ink);
  border-radius: 0;
  position: relative;
}
@media (max-width: 820px) {
  .intro .ph {
    border-right: 0;
    border-bottom: 2px solid var(--ink);
    min-height: 280px;
  }
}
.play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-size: 32px;
  box-shadow: 0 18px 40px -16px rgba(0, 0, 0, 0.5);
}
.intro .body { padding: clamp(28px, 4vw, 52px); }
.intro .body h2 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(28px, 3.2vw, 40px);
  letter-spacing: -0.015em;
  line-height: 1.05;
  margin: 14px 0 16px;
}
.intro .body p {
  font-family: var(--serif);
  font-size: 18px;
  line-height: 1.55;
  color: var(--ink-2);
  margin: 0 0 1em;
  max-width: 42ch;
}
.intro .body .meta {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}
.intro .body .meta span {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.cv-section {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  padding: 36px 0;
  border-top: 1px solid var(--line);
}
@media (max-width: 680px) {
  .cv-section { grid-template-columns: 1fr; gap: 14px; }
}
.cv-section h3 {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 500;
}
.cv-item {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 24px;
  padding: 14px 0;
}
.cv-item + .cv-item { border-top: 1px dashed var(--line-2); }
@media (max-width: 520px) {
  .cv-item { grid-template-columns: 1fr; gap: 4px; }
}
.cv-item .yr {
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--ink-3);
  letter-spacing: 0.06em;
}
.cv-item .title {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 500;
  letter-spacing: -0.005em;
}
.cv-item .where {
  font-family: var(--sans);
  font-size: 14.5px;
  color: var(--ink-2);
  margin-top: 4px;
}

.download-bar {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
  padding: 18px 22px;
  border: 1px solid var(--line);
  background: var(--paper-2);
  border-radius: 0;
  margin-top: 36px;
}
.download-bar .lab {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-right: auto;
}
</style>
