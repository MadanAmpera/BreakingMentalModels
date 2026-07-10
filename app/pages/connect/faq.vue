<script setup lang="ts">
const { data: page } = await useAsyncData('connect-faq', () =>
  queryCollection('connect').path('/connect/faq').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'FAQ'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Connect', to: '/connect' },
  { label: 'FAQ' },
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
      <div class="wrap-narrow" style="max-width: 840px; margin: 0 auto;">
        <div v-for="(group, gi) in page.faqGroups" :key="gi" class="faq-grp">
          <div class="gh">{{ group.title }}</div>
          <details
            v-for="(item, ii) in group.items"
            :key="ii"
            class="qa"
            :open="item.open"
          >
            <summary>
              <span class="q">{{ item.q }}</span>
              <span class="ic">+</span>
            </summary>
            <div class="a">
              <p>
                {{ item.a }}
                <NuxtLink v-if="item.linkLabel" class="link-arrow" :to="item.linkTo">{{ item.linkLabel }} →</NuxtLink>
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* FAQ (from Prototype1 connect/faq.html) */
.faq-grp { margin-top: 8px; }
.faq-grp + .faq-grp { margin-top: 56px; }
.faq-grp > .gh {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  border-bottom: 2px solid var(--ink);
  padding-bottom: 12px;
  margin-bottom: 4px;
}
details.qa { border-bottom: 1px solid var(--line-2); }
details.qa summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding: 24px 0;
}
details.qa summary::-webkit-details-marker { display: none; }
details.qa summary .q {
  font-family: var(--serif);
  font-size: clamp(20px, 2.4vw, 25px);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--ink);
  flex: 1;
}
details.qa summary .ic {
  font-family: var(--mono);
  font-size: 20px;
  color: var(--accent);
  transition: transform 0.2s;
  line-height: 1;
  flex: none;
}
details.qa[open] summary .ic { transform: rotate(45deg); }
details.qa .a { padding: 0 38px 26px 0; max-width: 70ch; }
details.qa .a p {
  font-family: var(--serif);
  font-size: 17.5px;
  line-height: 1.6;
  color: var(--ink-2);
  margin: 0 0 0.8em;
}
details.qa .a p em { color: var(--accent); font-style: italic; }
</style>
