<script setup lang="ts">
const { data: page } = await useAsyncData('education-hub-video-lessons', () =>
  queryCollection('educationhub').path('/education-hub/video-lessons').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Video-led Learning'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Education Hub', to: '/education-hub' },
  { label: 'Video-led learning' },
]

const levelName: Record<string, string> = { i: 'Individual', g: 'Group', o: 'Organisational' }
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

        <!-- Featured player -->
        <div v-if="page.feature" class="feature">
          <div class="player">
            <div class="ph" :data-label="page.feature.label">
              <img v-if="page.feature.image" :src="page.feature.image" alt="">
            </div>
            <div class="play">▶</div>
            <span v-if="page.feature.time" class="time">{{ page.feature.time }}</span>
            <div class="bar"><i :style="{ width: page.feature.progress }" /></div>
          </div>
          <div class="info">
            <span v-if="page.feature.lvl" class="lvl">{{ page.feature.lvl }}</span>
            <h2>{{ page.feature.titlePre }} <em>{{ page.feature.titleEm }}</em> {{ page.feature.titlePost }}</h2>
            <p v-if="page.feature.body">{{ page.feature.body }}</p>
            <div v-if="page.feature.meta?.length" class="meta">
              <span v-for="(m, i) in page.feature.meta" :key="i">{{ m }}</span>
            </div>
            <div class="feature-actions">
              <a v-if="page.feature.primaryLabel" class="btn btn-primary" :href="page.feature.primaryTo" style="border-radius: 0;">
                {{ page.feature.primaryLabel }} <span class="arrow">→</span>
              </a>
              <a v-if="page.feature.ghostLabel" class="btn btn-ghost" :href="page.feature.ghostTo" style="border-radius: 0;">
                {{ page.feature.ghostLabel }}
              </a>
            </div>
          </div>
        </div>

        <!-- Filter rail (static mock) -->
        <div class="rail">
          <span class="lab">Filter</span>
          <a class="on" href="#">All levels</a>
          <a href="#">● Individual</a>
          <a href="#">● Group</a>
          <a href="#">● Organisational</a>
          <span class="lab" style="margin-left: 14px;">Length</span>
          <a href="#">Under 7 min</a>
          <a href="#">7 — 10 min</a>
          <span v-if="page.railCount" class="ct">{{ page.railCount }}</span>
        </div>

        <!-- Lesson grid -->
        <div class="lessons">
          <div v-for="(l, i) in page.lessons" :key="i" class="lesson">
            <div class="ph" :data-label="l.label">
              <img v-if="l.image" :src="l.image" alt="">
              <span class="badge" :class="l.cat">{{ levelName[l.cat] }}</span>
              <span v-if="l.dur" class="dur">{{ l.dur }}</span>
            </div>
            <div class="body">
              <span v-if="l.theory" class="theory">{{ l.theory }}</span>
              <h4>{{ l.title }}</h4>
              <span class="meta">
                <span v-if="l.lesson">{{ l.lesson }}</span>
                <span v-if="l.when">{{ l.when }}</span>
              </span>
            </div>
          </div>
        </div>

        <p v-if="page.lessonsNote" class="lessons-note">{{ page.lessonsNote }}</p>

        <!-- Playlists -->
        <div v-if="page.playlists?.length" class="playlist">
          <h3 v-if="page.playlistHead">{{ page.playlistHead }}</h3>
          <div class="lessons">
            <div v-for="(p, i) in page.playlists" :key="i" class="lesson">
              <div class="ph" :data-label="p.label">
                <span class="badge" :class="p.cat">Playlist</span>
                <span v-if="p.dur" class="dur">{{ p.dur }}</span>
              </div>
              <div class="body">
                <span v-if="p.name" class="theory">{{ p.name }}</span>
                <h4>{{ p.title }}</h4>
                <span class="meta">
                  <span v-if="p.best">{{ p.best }}</span>
                  <span v-if="p.updated">{{ p.updated }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Video lessons (from Prototype1 education-hub/video-lessons.html) */
.feature {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0;
  border: 2px solid var(--ink);
  margin-top: 48px;
}
@media (max-width: 820px) {
  .feature { grid-template-columns: 1fr; }
}
.feature .player {
  position: relative;
  min-height: 420px;
  border-right: 2px solid var(--ink);
  background: #1a1814;
}
@media (max-width: 820px) {
  .feature .player { border-right: 0; border-bottom: 2px solid var(--ink); min-height: 280px; }
}
.feature .player .ph {
  height: 100%;
  border: 0;
  border-radius: 0;
  background:
    repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0 11px, transparent 11px 22px),
    #1a1814;
  color: #7b7264;
}
.feature .player .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.feature .player .play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-size: 34px;
  box-shadow: 0 18px 40px -16px rgba(0, 0, 0, 0.6);
}
.feature .player .bar {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  height: 4px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 99px;
}
.feature .player .bar i { position: absolute; left: 0; top: 0; bottom: 0; width: 38%; background: var(--accent); border-radius: 99px; }
.feature .player .time {
  position: absolute;
  left: 24px;
  bottom: 38px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #b3a993;
}
.feature .info {
  padding: clamp(28px, 4vw, 52px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.feature .info .lvl {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cat-group);
}
.feature .info h2 {
  font-family: var(--serif);
  font-size: clamp(28px, 3.6vw, 42px);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.018em;
  margin: 14px 0 16px;
}
.feature .info h2 em { color: var(--accent); }
.feature .info p { font-family: var(--serif); font-size: 18px; line-height: 1.55; color: var(--ink-2); margin: 0 0 1em; }
.feature .info .meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  margin-top: 8px;
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.feature-actions { display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap; }

/* Filter rail */
.rail {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 48px;
  padding: 14px 22px;
  border: 1px solid var(--line);
  background: var(--paper-2);
  align-items: center;
}
.rail .lab {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-right: 8px;
}
.rail a {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: var(--ink-2);
  border: 1px solid var(--line-2);
  padding: 6px 14px;
  border-radius: 99px;
  transition: 0.15s;
}
.rail a.on { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.rail a:hover { border-color: var(--ink); color: var(--ink); }
.rail .ct { margin-left: auto; font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; color: var(--ink-3); }

/* Lesson grid */
.lessons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
}
.lesson {
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 0;
  display: flex;
  flex-direction: column;
  transition: 0.18s;
}
.lesson:hover { transform: translateY(-2px); border-color: var(--ink); }
.lesson .ph { height: 170px; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; position: relative; }
.lesson .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.lesson .ph .badge {
  position: absolute;
  left: 10px;
  top: 10px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: var(--paper);
  padding: 4px 8px;
}
.lesson .ph .badge.i { color: var(--cat-individual); border: 1px solid var(--cat-individual); }
.lesson .ph .badge.g { color: var(--cat-group); border: 1px solid var(--cat-group); }
.lesson .ph .badge.o { color: var(--cat-org); border: 1px solid var(--cat-org); }
.lesson .ph .dur {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  background: var(--ink);
  color: var(--paper);
  padding: 4px 8px;
}
.lesson .body { padding: 20px 20px 22px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.lesson .body .theory {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.lesson .body h4 {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.005em;
  margin: 0;
}
.lesson .body .meta {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed var(--line-2);
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  color: var(--ink-3);
  display: flex;
  justify-content: space-between;
}
.lessons-note {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--ink-3);
  margin-top: 32px;
  text-align: center;
}

/* Playlists */
.playlist { margin-top: 64px; border-top: 2px solid var(--ink); padding-top: 36px; }
.playlist h3 { font-family: var(--serif); font-size: 24px; font-weight: 500; margin-bottom: 18px; }
</style>
