<script setup lang="ts">
const { data: page } = await useAsyncData('research-invitations', () =>
  queryCollection('research').path('/research/invitations').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Guest Invitations'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Research', to: '/research' },
  { label: 'Guest invitations' },
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
        <p v-if="page.banner" class="client-banner">{{ page.banner }}</p>

        <template v-for="(group, gi) in page.invGroups" :key="gi">
          <div class="group-head">
            <h3>{{ group.title }}</h3>
            <span v-if="group.ct" class="ct">{{ group.ct }}</span>
          </div>
          <div>
            <div
              v-for="(inv, ii) in group.items"
              :key="ii"
              class="invitation"
              :class="{ future: inv.future }"
            >
              <span class="yr"><span v-if="inv.kind" class="kind">{{ inv.kind }}</span>{{ inv.date }}</span>
              <div>
                <div class="ttl">{{ inv.title }}</div>
                <div v-if="inv.venue" class="venue">{{ inv.venue }}</div>
              </div>
              <span v-if="inv.where" class="where">{{ inv.where }}</span>
            </div>
          </div>
        </template>

        <div v-if="page.topicsCard" class="topics-card">
          <h4 v-if="page.topicsCard.title">{{ page.topicsCard.title }}</h4>
          <div v-for="(talk, ti) in page.topicsCard.talks" :key="ti" class="talk">
            <div class="t">{{ talk.t }}</div>
            <div v-if="talk.desc" class="desc">{{ talk.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Guest invitations (from Prototype1 research/invitations.html) */
.invitation {
  display: grid;
  grid-template-columns: 100px 1fr 160px;
  gap: 24px;
  padding: 26px 0;
  border-top: 1px solid var(--line-2);
  align-items: baseline;
}
.invitation:last-of-type { border-bottom: 1px solid var(--line-2); }
.invitation .yr { font-family: var(--mono); font-size: 12.5px; letter-spacing: 0.08em; color: var(--ink-3); }
.invitation .yr .kind { display: block; color: var(--accent); margin-bottom: 4px; }
.invitation .ttl {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.005em;
}
.invitation .venue { font-family: var(--serif); font-style: italic; color: var(--ink-2); font-size: 16px; margin-top: 6px; }
.invitation .where {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  color: var(--ink-3);
  text-transform: uppercase;
  text-align: right;
  align-self: center;
}
.invitation.future { background: var(--accent-tint); padding-inline: 16px; margin-inline: -16px; }
.invitation.future .where { color: var(--accent-deep); }
@media (max-width: 760px) {
  .invitation { grid-template-columns: 1fr; gap: 6px; }
  .invitation .where { text-align: left; }
}

.group-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 14px;
  margin-top: 60px;
  margin-bottom: 0;
}
.group-head h3 {
  font-family: var(--serif);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 500;
  letter-spacing: -0.012em;
}
.group-head .ct {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
}

/* Available talks card */
.topics-card {
  background: var(--paper-2);
  border: 1px solid var(--line);
  padding: 28px;
  border-radius: var(--radius-lg);
  margin-top: 48px;
}
.topics-card h4 {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 16px;
}
.topics-card .talk { padding: 14px 0; border-top: 1px dashed var(--line-2); }
.topics-card .talk:first-of-type { border-top: 0; padding-top: 0; }
.topics-card .talk .t {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.005em;
}
.topics-card .talk .desc {
  font-family: var(--serif);
  font-size: 15.5px;
  color: var(--ink-2);
  margin-top: 4px;
  line-height: 1.5;
}
</style>
