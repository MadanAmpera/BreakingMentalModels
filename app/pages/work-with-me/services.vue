<script setup lang="ts">
const { data: page } = await useAsyncData('work-with-me-services', () =>
  queryCollection('workwithme').path('/work-with-me/services').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Services'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Work With Me', to: '/work-with-me' },
  { label: 'Services & solutions' },
]

// The final service overall drops its bottom border (matches the design).
const lastGroup = computed(() => (page.value?.serviceGroups?.length ?? 0) - 1)
function isLastService(gi: number, si: number) {
  const g = page.value?.serviceGroups
  return !!g && gi === lastGroup.value && si === g[gi].services.length - 1
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
    />

    <section
      v-for="(group, gi) in page.serviceGroups"
      :key="gi"
      class="section"
      style="padding-top: 0;"
    >
      <div class="wrap">
        <div class="grp-head">
          <span class="rn">{{ group.rn }}</span>
          <h2>{{ group.title }}</h2>
          <span v-if="group.count" class="c">{{ group.count }}</span>
        </div>
        <p v-if="group.lead" class="lead" style="max-width: 64ch; margin-bottom: 8px;">{{ group.lead }}</p>

        <div
          v-for="(s, si) in group.services"
          :id="s.id"
          :key="si"
          class="svc"
          :style="isLastService(gi, si) ? 'border-bottom: 0;' : ''"
        >
          <span class="rn">{{ s.rn }}</span>
          <div>
            <h3>{{ s.title }}</h3>
            <p class="intro">{{ s.intro }}</p>
            <div class="cols">
              <div class="focus">
                <h4>Topics of focus</h4>
                <ul>
                  <li v-for="(f, fi) in s.focus" :key="fi">
                    <b>{{ f.term }}</b><span>{{ f.desc }}</span>
                  </li>
                </ul>
              </div>
              <div class="side">
                <h4>Timeline</h4>
                <div v-for="(t, ti) in s.timeline" :key="ti" class="tl">
                  <span class="d">{{ t.d }}</span><span class="w">{{ t.w }}</span>
                </div>
                <div v-if="s.bestFor" class="best">
                  <div class="bl">Best for</div>
                  <p>{{ s.bestFor }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services at a glance -->
    <section v-if="page.glance" class="section" style="padding-top: 0;">
      <div class="wrap">
        <div class="sec-head">
          <span class="rn">{{ page.glance.rn }}</span><h2>{{ page.glance.heading }}</h2>
        </div>
        <p v-if="page.glance.lead" class="lead" style="max-width: 60ch;">{{ page.glance.lead }}</p>
        <table class="glance">
          <thead>
            <tr><th>Service</th><th>Focus area</th><th>Indicative timeline</th></tr>
          </thead>
          <tbody>
            <tr v-for="(r, ri) in page.glance.rows" :key="ri">
              <td class="svc-n">{{ r.service }}</td>
              <td class="focus-c">{{ r.focus }}</td>
              <td class="tl-c">{{ r.timeline }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Services & solutions (from Prototype1 work-with-me/services.html) */
.grp-head {
  display: flex;
  align-items: baseline;
  gap: 16px;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 14px;
  margin: 0 0 8px;
}
.grp-head .rn {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
}
.grp-head h2 {
  font-family: var(--serif);
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 500;
  letter-spacing: -0.015em;
}
.grp-head .c {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.svc {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 24px;
  padding: 40px 0;
  border-bottom: 1px solid var(--line-2);
}
@media (max-width: 680px) {
  .svc { grid-template-columns: 1fr; gap: 14px; }
}
.svc .rn {
  font-family: var(--mono);
  font-size: 14px;
  color: var(--accent);
  letter-spacing: 0.06em;
  padding-top: 0.3em;
}
.svc h3 {
  font-family: var(--serif);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.018em;
}
.svc .intro {
  font-family: var(--serif);
  font-size: 18.5px;
  line-height: 1.55;
  color: var(--ink-2);
  margin: 14px 0 0;
  max-width: 64ch;
}
.svc .cols {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 36px;
  margin-top: 26px;
  align-items: start;
}
@media (max-width: 760px) {
  .svc .cols { grid-template-columns: 1fr; gap: 24px; }
}
.svc .focus h4,
.svc .side h4 {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin: 0 0 14px;
}
.svc .focus ul { margin: 0; padding: 0; list-style: none; }
.svc .focus li { padding: 12px 0; border-top: 1px solid var(--line); }
.svc .focus li:first-child { border-top: 0; padding-top: 0; }
.svc .focus li b {
  font-family: var(--serif);
  font-weight: 600;
  font-size: 17px;
  color: var(--ink);
  display: block;
  margin-bottom: 2px;
}
.svc .focus li span { font-size: 15px; color: var(--ink-2); }
.svc .side {
  background: var(--paper-2);
  border: 1px solid var(--line);
  padding: 22px;
}
.svc .side .tl {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px dashed var(--line-2);
}
.svc .side .tl:first-of-type { border-top: 0; }
.svc .side .tl .d {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 600;
  color: var(--accent);
  white-space: nowrap;
}
.svc .side .tl .w { font-size: 14px; color: var(--ink-2); }
.svc .side .best {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.svc .side .best .bl {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}
.svc .side .best p { font-size: 14.5px; color: var(--ink-2); margin: 0; line-height: 1.5; }

/* Glance table */
.glance { width: 100%; border-collapse: collapse; margin-top: 18px; }
.glance th,
.glance td {
  text-align: left;
  padding: 16px 18px;
  border-bottom: 1px solid var(--line-2);
  vertical-align: top;
}
.glance thead th {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
  border-bottom: 1px solid var(--ink);
  font-weight: 500;
}
.glance td.svc-n {
  font-family: var(--serif);
  font-size: 17px;
  font-weight: 600;
  color: var(--ink);
  width: 30%;
}
.glance td.focus-c { font-size: 14.5px; color: var(--ink-2); }
.glance td.tl-c {
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--accent);
  white-space: nowrap;
}
.glance tbody tr:hover { background: var(--accent-tint); }
@media (max-width: 680px) {
  .glance thead { display: none; }
  .glance td { display: block; border: 0; padding: 2px 0; }
  .glance tr { display: block; padding: 18px 0; border-bottom: 1px solid var(--line-2); }
  .glance td.tl-c { color: var(--ink-3); margin-top: 4px; }
}
</style>
