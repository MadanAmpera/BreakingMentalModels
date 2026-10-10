<script setup lang="ts">
const { data: page } = await useAsyncData('students', () =>
  queryCollection('audiences').path('/audiences/students').first(),
)
// Lessons are read from the Education Hub video-lessons content (single source).
const { data: videos } = await useAsyncData('students-videos', () =>
  queryCollection('educationhub').path('/education-hub/video-lessons').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'For students & learners'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [{ label: 'Home', to: '/' }, { label: 'For students' }]
const levelName: Record<string, string> = { i: 'Individual', g: 'Group', o: 'Organisational' }
const lessons = computed(() => (videos.value?.lessons ?? []).slice(0, page.value?.lessonLimit ?? 6))
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
        <div v-if="page.secA" class="sec-head"><span class="rn">{{ page.secA.rn }}</span><h2>{{ page.secA.heading }}</h2></div>
        <p v-if="page.secA?.lead" class="lead" style="max-width: 56ch; margin-top: -14px;">{{ page.secA.lead }}</p>

        <div class="lessons">
          <NuxtLink v-for="(l, i) in lessons" :key="i" class="lesson" to="/education-hub/video-lessons">
            <div class="ph" :data-label="l.label">
              <img v-if="l.image" :src="l.image" alt="">
              <span class="badge" :class="l.cat">{{ l.cat ? levelName[l.cat] : 'Start here' }}</span>
              <span v-if="l.dur" class="dur">{{ l.dur }}</span>
            </div>
            <div class="body">
              <span v-if="l.theory" class="theory">{{ l.theory }}</span>
              <h4>{{ l.title }}</h4>
              <p v-if="l.body" class="desc">{{ l.body }}</p>
            </div>
          </NuxtLink>
        </div>

        <NuxtLink v-if="page.allLabel" class="link-arrow" :to="page.allTo" style="margin-top: 28px;">
          {{ page.allLabel }} →
        </NuxtLink>
      </div>
    </section>

    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <ChapterIndex v-bind="page.chapterIndex ?? {}" />
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />
  </div>
</template>

<style scoped>
.lessons { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-top: 40px; }
.lesson { background: var(--paper-2); border: 1px solid var(--line); display: flex; flex-direction: column; text-decoration: none; color: var(--ink); transition: 0.18s; }
.lesson:hover { transform: translateY(-2px); border-color: var(--ink); }
.lesson .ph { height: 170px; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; position: relative; }
.lesson .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.lesson .ph .badge { position: absolute; left: 10px; top: 10px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; background: var(--paper); padding: 4px 8px; color: var(--ink-2); border: 1px solid var(--line-2); white-space: nowrap; }
.lesson .ph .badge.i { color: var(--cat-individual); border-color: var(--cat-individual); }
.lesson .ph .badge.g { color: var(--cat-group); border-color: var(--cat-group); }
.lesson .ph .badge.o { color: var(--cat-org); border-color: var(--cat-org); }
.lesson .ph .dur { position: absolute; right: 10px; bottom: 10px; font-family: var(--mono); font-size: 10.5px; background: var(--ink); color: var(--paper); padding: 4px 8px; }
.lesson .body { padding: 20px 20px 22px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.lesson .body .theory { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); }
.lesson .body h4 { font-family: var(--serif); font-size: 21px; font-weight: 500; line-height: 1.2; margin: 0; }
.lesson .body .desc { font-size: 14.5px; line-height: 1.55; color: var(--ink-2); margin: 0; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
</style>
