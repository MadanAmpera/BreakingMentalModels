<script setup lang="ts">
const { data: page } = await useAsyncData('organisations', () =>
  queryCollection('audiences').path('/audiences/organisations').first(),
)
// Services are read from the Work With Me services content (single source).
const { data: svc } = await useAsyncData('organisations-services', () =>
  queryCollection('workwithme').path('/work-with-me/services').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'For practitioners & organisations'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [{ label: 'Home', to: '/' }, { label: 'For organisations' }]
const services = computed(() =>
  (svc.value?.serviceGroups?.[0]?.services ?? []).map((s) => {
    const [name, ...rest] = s.title.split(' — ')
    return { ...s, name, sub: rest.join(' — ') }
  }),
)
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

    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secA" class="sec-head"><span class="rn">{{ page.secA.rn }}</span><h2>{{ page.secA.heading }}</h2></div>
        <p v-if="page.secA?.lead" class="lead" style="max-width: 60ch; margin-top: -14px;">{{ page.secA.lead }}</p>

        <div class="svc-grid">
          <article v-for="s in services" :id="s.id" :key="s.rn" class="svc">
            <span class="svc-rn">{{ s.rn }}</span>
            <h3>{{ s.name }}</h3>
            <p v-if="s.sub" class="svc-sub">{{ s.sub }}</p>
            <p class="svc-intro">{{ s.intro }}</p>
            <div class="svc-block">
              <span class="svc-lab">Focus</span>
              <div v-for="(f, i) in s.focus" :key="i" class="svc-focus"><b>{{ f.term }}</b> {{ f.desc }}</div>
            </div>
            <div class="svc-block">
              <span class="svc-lab">Timeline</span>
              <div v-for="(t, i) in s.timeline" :key="i" class="svc-time"><span class="d">{{ t.d }}</span><span>{{ t.w }}</span></div>
            </div>
            <p v-if="s.bestFor" class="svc-best"><span class="svc-lab">Best for</span> {{ s.bestFor }}</p>
          </article>
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
.svc-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px; background: var(--ink); border: 2px solid var(--ink); margin-top: 40px; }
@media (max-width: 820px) { .svc-grid { grid-template-columns: 1fr; } }
.svc { background: var(--paper-2); padding: clamp(24px, 3.4vw, 44px); display: flex; flex-direction: column; gap: 14px; }
.svc-rn { font-family: var(--mono); font-size: 13px; letter-spacing: 0.12em; color: var(--accent); }
.svc h3 { font-family: var(--serif); font-weight: 500; font-size: clamp(30px, 3.2vw, 40px); line-height: 1; letter-spacing: -0.02em; }
.svc-sub { font-family: var(--serif); font-style: italic; font-size: 19px; line-height: 1.35; color: var(--ink-2); margin: -4px 0 0; }
.svc-intro { font-size: 15.5px; line-height: 1.6; color: var(--ink-2); margin: 0; }
.svc-block { border-top: 1px solid var(--line-2); padding-top: 12px; display: flex; flex-direction: column; gap: 8px; }
.svc-lab { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); }
.svc-focus { font-size: 14.5px; line-height: 1.5; color: var(--ink-2); }
.svc-focus b { font-weight: 600; color: var(--ink); }
.svc-time { display: grid; grid-template-columns: 90px 1fr; gap: 12px; font-size: 14.5px; color: var(--ink-2); align-items: baseline; }
.svc-time .d { font-family: var(--serif); font-size: 18px; color: var(--ink); }
.svc-best { font-size: 14.5px; line-height: 1.5; color: var(--ink-2); margin: auto 0 0; padding-top: 12px; border-top: 1px dashed var(--line-2); }
.svc-best .svc-lab { margin-right: 6px; }
</style>
