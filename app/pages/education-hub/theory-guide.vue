<script setup lang="ts">
const { data: page } = await useAsyncData('education-hub-theory-guide', () =>
  queryCollection('educationhub').path('/education-hub/theory-guide').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'OB Theory Guide'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Education Hub', to: '/education-hub' },
  { label: 'Theory guide' },
]

const levelName: Record<string, string> = { i: 'Individual', g: 'Group', o: 'Organisational' }
const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
const hasLetter = computed(() => new Set(page.value?.letterSections?.map(s => s.letter) ?? []))
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
      <div v-if="page.legend?.length" class="legend">
        <span v-for="(l, i) in page.legend" :key="i" :class="l.cat">{{ l.label }}</span>
        <span v-if="page.legendCount" style="border: 0; color: var(--ink-3);">{{ page.legendCount }}</span>
      </div>

      <nav class="alpha" aria-label="Letter index">
        <a
          v-for="L in letters"
          :key="L"
          :class="hasLetter.has(L) ? 'has' : 'off'"
          :href="`#${L}`"
        >{{ L }}</a>
      </nav>
    </PageHero>

    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-for="(section, si) in page.letterSections" :key="si" :id="section.letter" class="letter-section">
          <div class="letter-h">
            <span class="L">{{ section.letter }}</span>
            <span v-if="section.ct" class="ct">{{ section.ct }}</span>
          </div>
          <div v-for="(e, ei) in section.entries" :key="ei" class="entry">
            <div>
              <div class="name">{{ e.name }}</div>
              <div v-if="e.who" class="who">{{ e.who }}</div>
            </div>
            <div v-if="e.summ" class="summ">{{ e.summ }}</div>
            <span class="level" :class="e.level">{{ levelName[e.level] }}</span>
          </div>
        </div>

        <p v-if="page.footNote" class="foot-note">{{ page.footNote }}</p>
      </div>
    </section>

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Theory guide (from Prototype1 education-hub/theory-guide.html) */
.legend {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 24px;
  padding: 14px 22px;
  border: 1px solid var(--line);
  background: var(--paper-2);
}
.legend span {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  display: flex;
  gap: 8px;
  align-items: center;
}
.legend span::before { content: ""; width: 10px; height: 10px; border-radius: 50%; }
.legend span.i::before { background: var(--cat-individual); }
.legend span.g::before { background: var(--cat-group); }
.legend span.o::before { background: var(--cat-org); }

.alpha {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 36px;
  padding: 18px 22px;
  background: var(--paper-2);
  border: 1px solid var(--line);
}
.alpha a {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--ink-2);
  text-decoration: none;
  border: 1px solid transparent;
  transition: 0.15s;
}
.alpha a:hover { background: var(--paper); border-color: var(--line-2); color: var(--accent); }
.alpha a.has { color: var(--ink); }
.alpha a.off { color: var(--ink-3); }

.letter-section { margin-top: 48px; }
.letter-section .letter-h {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 24px;
  align-items: end;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 10px;
  margin-bottom: 0;
}
.letter-section .letter-h .L {
  font-family: var(--serif);
  font-size: clamp(56px, 7vw, 84px);
  font-weight: 500;
  line-height: 0.85;
  letter-spacing: -0.02em;
}
.letter-section .letter-h .ct {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-3);
  padding-bottom: 8px;
}
.entry {
  display: grid;
  grid-template-columns: 180px 1fr 120px;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid var(--line-2);
  align-items: baseline;
  text-decoration: none;
  color: var(--ink);
  transition: 0.15s;
}
.entry:hover { background: var(--accent-tint); padding-inline: 12px; }
.entry .name {
  font-family: var(--serif);
  font-size: 21px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.008em;
}
.entry .who { font-family: var(--serif); font-style: italic; font-size: 14.5px; color: var(--ink-3); margin-top: 2px; }
.entry .summ {
  font-family: var(--serif);
  font-size: 16.5px;
  color: var(--ink-2);
  line-height: 1.5;
  max-width: 60ch;
}
.entry .level {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-align: right;
  align-self: center;
}
.entry .level::before { content: "●"; margin-right: 6px; font-size: 9px; }
.entry .level.i { color: var(--cat-individual); }
.entry .level.g { color: var(--cat-group); }
.entry .level.o { color: var(--cat-org); }
@media (max-width: 760px) {
  .entry { grid-template-columns: 1fr; gap: 6px; }
  .entry .level { text-align: left; }
}

.foot-note {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--ink-3);
  margin-top: 60px;
}
</style>
