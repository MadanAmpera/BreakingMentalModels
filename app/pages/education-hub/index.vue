<script setup lang="ts">
const { data: page } = await useAsyncData('education-hub', () =>
  queryCollection('educationhub').path('/education-hub').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Education Hub'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [{ label: 'Home', to: '/' }, { label: 'Education Hub' }]

const catLabel: Record<string, string> = {
  i: 'Level I · Individual',
  g: 'Level II · Group',
  o: 'Level III · Organisational',
}
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

    <!-- Opening doctrine -->
    <section v-if="page.doctrine" style="background: var(--paper-3);">
      <div class="wrap doctrine">
        <span class="eyebrow">{{ page.doctrine.eyebrow }}</span>
        <div>
          <h2>{{ page.doctrine.headA }} <em>{{ page.doctrine.em1 }}</em>{{ page.doctrine.headB }} <em>{{ page.doctrine.em2 }}</em>{{ page.doctrine.headC }}</h2>
          <p v-for="(para, i) in page.doctrine.paragraphs" :key="i">{{ para }}</p>
        </div>
      </div>
    </section>

    <!-- Three columns -->
    <section style="padding-block: clamp(40px, 6vw, 72px);">
      <div class="wrap">
        <div class="levels">
          <div v-for="(level, li) in page.levels" :key="li" class="col" :class="`lv-${level.cat}`">
            <div class="col-head">
              <span class="lab">{{ level.lab }}</span>
              <span class="rn">{{ level.rn }}</span>
              <h2>{{ level.title }}</h2>
              <p v-if="level.desc" class="desc">{{ level.desc }}</p>
              <div class="meta">
                <span v-if="level.ct" class="ct">{{ level.ct }}</span>
                <span class="swatch" />
              </div>
            </div>
            <div class="col-body">
              <div v-for="(t, ti) in level.theories" :key="ti" class="theory">
                <span class="num">{{ t.num }}</span>
                <h3>{{ t.title }}</h3>
                <p v-if="t.sub" class="sub">{{ t.sub }}</p>
                <p v-if="t.summ" class="summ">{{ t.summ }}</p>
                <div v-if="t.tags?.length" class="tags">
                  <span v-for="(tag, gi) in t.tags" :key="gi">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video lessons preview -->
    <section v-if="page.videoPreview" class="section" style="background: var(--paper-3);">
      <div class="wrap">
        <div class="sec-head">
          <span class="rn">{{ page.videoPreview.rn }}</span><h2>{{ page.videoPreview.heading }}</h2>
        </div>
        <p v-if="page.videoPreview.lead" class="lead" style="max-width: 60ch;">{{ page.videoPreview.lead }}</p>

        <div class="les-grid">
          <div v-for="(l, i) in page.videoPreview.lessons" :key="i" class="les">
            <div class="ph" :data-label="l.label" />
            <div class="body">
              <span class="cat" :class="l.cat">{{ catLabel[l.cat] }}</span>
              <h4>{{ l.title }}</h4>
              <span v-if="l.when" class="when">{{ l.when }}</span>
            </div>
          </div>
        </div>

        <div class="preview-actions">
          <NuxtLink v-if="page.videoPreview.primaryLabel" class="btn btn-primary" :to="page.videoPreview.primaryTo" style="border-radius: 0;">
            {{ page.videoPreview.primaryLabel }} <span class="arrow">→</span>
          </NuxtLink>
          <NuxtLink v-if="page.videoPreview.ghostLabel" class="btn btn-ghost" :to="page.videoPreview.ghostTo" style="border-radius: 0;">
            {{ page.videoPreview.ghostLabel }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- In this chapter -->
    <section class="section">
      <div class="wrap">
        <ChapterIndex
          v-if="page.chapterIndex"
          :label="page.chapterIndex.label"
          :count="page.chapterIndex.count"
          :rows="page.chapterIndex.rows"
        />
      </div>
    </section>

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Opening doctrine (from Prototype1 education-hub/index.html) */
.doctrine {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: 48px;
  align-items: start;
  padding-block: clamp(48px, 8vw, 100px);
}
@media (max-width: 820px) {
  .doctrine { grid-template-columns: 1fr; gap: 20px; }
}
.doctrine h2 {
  font-family: var(--serif);
  font-size: clamp(28px, 3.6vw, 44px);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.018em;
}
.doctrine h2 em { color: var(--accent); }
.doctrine p {
  font-family: var(--serif);
  font-size: 19px;
  line-height: 1.55;
  color: var(--ink-2);
  margin: 0 0 1em;
  max-width: 54ch;
}

/* Three vertical columns of levels */
.levels {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
  margin-top: 56px;
}
@media (max-width: 900px) {
  .levels { grid-template-columns: 1fr; }
}
.col { border-left: 1px solid var(--ink); display: flex; flex-direction: column; }
.col:first-child { border-left: 0; }
@media (max-width: 900px) {
  .col { border-left: 0; border-top: 1px solid var(--ink); }
  .col:first-child { border-top: 0; }
}
.col-head {
  position: sticky;
  top: 64px;
  background: var(--paper);
  z-index: 3;
  padding: 28px 24px 22px;
  border-bottom: 1px solid var(--ink);
}
.col-head .lab {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-3);
  display: block;
  margin-bottom: 8px;
}
.col-head .rn { font-family: var(--mono); font-size: 12px; letter-spacing: 0.2em; }
.col-head h2 {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.018em;
  line-height: 1.05;
  margin-top: 6px;
}
.col-head .desc {
  font-family: var(--serif);
  font-style: italic;
  font-size: 15.5px;
  color: var(--ink-2);
  line-height: 1.45;
  margin-top: 10px;
  max-width: 30ch;
}
.col-head .meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.col-head .meta .ct {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.col-head .meta .swatch { width: 14px; height: 14px; border-radius: 50%; }

/* Per-level theming */
.col.lv-i .col-head { border-bottom-color: var(--cat-individual); }
.col.lv-i .col-head .rn { color: var(--cat-individual); }
.col.lv-i .col-head .swatch { background: var(--cat-individual); }
.col.lv-g .col-head { border-bottom-color: var(--cat-group); }
.col.lv-g .col-head .rn { color: var(--cat-group); }
.col.lv-g .col-head .swatch { background: var(--cat-group); }
.col.lv-o .col-head { border-bottom-color: var(--cat-org); }
.col.lv-o .col-head .rn { color: var(--cat-org); }
.col.lv-o .col-head .swatch { background: var(--cat-org); }

/* Theory cards */
.col-body { padding: 6px 24px 24px; display: flex; flex-direction: column; gap: 0; }
.theory {
  display: block;
  padding: 22px 0 22px;
  border-bottom: 1px solid var(--line-2);
  text-decoration: none;
  color: var(--ink);
  position: relative;
  transition: padding-inline 0.15s, background 0.15s;
}
.theory:hover { padding-inline: 10px; }
.theory .num {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--ink-3);
  display: block;
  margin-bottom: 6px;
}
.theory h3 {
  font-family: var(--serif);
  font-size: 21px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
.theory .sub { font-family: var(--serif); font-style: italic; font-size: 14.5px; color: var(--ink-3); margin-top: 4px; }
.theory .summ {
  font-family: var(--sans);
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.5;
  margin-top: 10px;
  max-width: 30ch;
}
.theory .tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
.theory .tags span {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
  border: 1px solid var(--line-2);
  padding: 3px 8px;
  border-radius: 99px;
}
.col.lv-i .theory:hover { background: #fcefe3; }
.col.lv-g .theory:hover { background: #ebf1f4; }
.col.lv-o .theory:hover { background: #ecf1ed; }
.col.lv-i .theory:hover .num { color: var(--cat-individual); }
.col.lv-g .theory:hover .num { color: var(--cat-group); }
.col.lv-o .theory:hover .num { color: var(--cat-org); }

/* Video lessons preview grid */
.les-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 32px;
}
.les { background: var(--paper-2); border: 1px solid var(--line); border-radius: 0; }
.les .ph { height: 140px; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; }
.les .body { padding: 18px 18px 22px; }
.les .cat { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; }
.les .cat.i { color: var(--cat-individual); }
.les .cat.g { color: var(--cat-group); }
.les .cat.o { color: var(--cat-org); }
.les h4 {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.25;
  margin-top: 8px;
  letter-spacing: -0.005em;
}
.les .when {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--ink-3);
  margin-top: 10px;
  display: block;
}
.preview-actions { display: flex; gap: 14px; margin-top: 36px; flex-wrap: wrap; }
</style>
