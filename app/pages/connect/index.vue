<script setup lang="ts">
const { data: page } = await useAsyncData('connect', () =>
  queryCollection('connect').path('/connect').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Connect'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [{ label: 'Home', to: '/' }, { label: 'Connect' }]
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

    <!-- a · All in one place -->
    <section v-if="page.channels?.length" class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secA" class="sec-head">
          <span class="rn">{{ page.secA.rn }}</span><h2>{{ page.secA.heading }}</h2>
        </div>
        <div class="channels">
          <div v-for="(c, i) in page.channels" :key="i" class="ch">
            <span class="lab">{{ c.lab }}</span>
            <div class="val">{{ c.val }}</div>
            <p v-if="c.body">{{ c.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- b · Two doors in -->
    <section v-if="page.audiences?.length" class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secB" class="sec-head">
          <span class="rn">{{ page.secB.rn }}</span><h2>{{ page.secB.heading }}</h2>
        </div>
        <p v-if="page.secB?.lead" class="lead" style="max-width: 62ch;">{{ page.secB.lead }}</p>

        <div class="aud">
          <div v-for="(a, i) in page.audiences" :key="i" class="a">
            <span v-if="a.ey" class="ey">{{ a.ey }}</span>
            <h3>{{ a.heading }}</h3>
            <p v-if="a.body">{{ a.body }}</p>
            <ul v-if="a.items?.length">
              <li v-for="(it, j) in a.items" :key="j"><b>{{ it.term }}</b> — {{ it.desc }}</li>
            </ul>
            <NuxtLink v-if="a.linkLabel" class="link-arrow" :to="a.linkTo">{{ a.linkLabel }} →</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- c · Send a message (static mock form) -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secC" :id="page.secC.id" class="sec-head">
          <span class="rn">{{ page.secC.rn }}</span><h2>{{ page.secC.heading }}</h2>
        </div>
        <p v-if="page.banner" class="client-banner">{{ page.banner }}</p>
        <div class="msg">
          <form @submit.prevent>
            <div class="two">
              <div class="field"><label>Your name</label><input type="text" placeholder="Full name"></div>
              <div class="field"><label>Email</label><input type="email" placeholder="you@email.com"></div>
            </div>
            <div class="field">
              <label>I'm reaching out as</label>
              <select>
                <option>A learner / student</option>
                <option>An organisation / institution</option>
                <option>A prospective podcast guest</option>
                <option>Media / press</option>
                <option>Something else</option>
              </select>
            </div>
            <div class="field">
              <label>Your message</label>
              <textarea placeholder="Tell us a little about yourself and what you need — the more honest and open, the better we can help." />
            </div>
            <button class="btn btn-primary" type="submit" style="border-radius: 0;">
              Send message <span class="arrow">→</span>
            </button>
            <p class="meta" style="margin-top: 14px;">We aim to respond to every message within 24 hours. Your voice, our innovation.</p>
          </form>
        </div>
      </div>
    </section>

    <!-- d · Watch & follow -->
    <section v-if="page.hub || page.socials?.length" class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secD" class="sec-head">
          <span class="rn">{{ page.secD.rn }}</span><h2>{{ page.secD.heading }}</h2>
        </div>

        <div v-if="page.hub" class="hub">
          <div>
            <div class="h3" style="color: #fff;">{{ page.hub.title }}</div>
            <p v-if="page.hub.body">{{ page.hub.body }}</p>
          </div>
          <a v-if="page.hub.ctaLabel" class="btn btn-primary" :href="page.hub.ctaTo" style="border-radius: 0;">
            {{ page.hub.ctaLabel }} <span class="arrow">→</span>
          </a>
        </div>

        <div v-if="page.socials?.length" class="socials">
          <a v-for="(s, i) in page.socials" :key="i" class="soc" :href="s.to">
            <div class="p">{{ s.p }}</div>
            <div v-if="s.d" class="d">{{ s.d }}</div>
          </a>
        </div>
      </div>
    </section>

    <!-- e · Travel & whereabouts -->
    <section class="section" style="padding-top: 0;">
      <div class="wrap">
        <div v-if="page.secE" :id="page.secE.id" class="sec-head">
          <span class="rn">{{ page.secE.rn }}</span><h2>{{ page.secE.heading }}</h2>
        </div>
        <p v-if="page.secE?.lead" class="lead" style="max-width: 62ch;">{{ page.secE.lead }}</p>

        <div class="travel">
          <div class="map">
            <div class="pin">
              <div class="dot" />
              <div v-if="page.travelPin" class="pl">{{ page.travelPin }}</div>
            </div>
          </div>
          <div class="list">
            <p v-if="page.travelBanner" class="client-banner" style="margin-bottom: 20px;">{{ page.travelBanner }}</p>
            <div v-for="(t, i) in page.travel" :key="i" class="wh">
              <div class="c">{{ t.city }}<span v-if="t.note">{{ t.note }}</span></div>
              <div v-if="t.date" class="dt">{{ t.date }}</div>
            </div>
          </div>
        </div>

        <ChapterIndex
          v-if="page.chapterIndex"
          :label="page.chapterIndex.label"
          :count="page.chapterIndex.count"
          :rows="page.chapterIndex.rows"
          style="margin-top: 60px; display: block;"
        />
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Connect landing (from Prototype1 connect/index.html) */
.channels {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border: 2px solid var(--ink);
  margin-top: 8px;
}
@media (max-width: 680px) {
  .channels { grid-template-columns: 1fr; }
}
.ch {
  padding: 30px 32px;
  border-left: 1px solid var(--ink);
  border-top: 1px solid var(--ink);
}
.ch:nth-child(1),
.ch:nth-child(2) { border-top: 0; }
.ch:nth-child(odd) { border-left: 0; }
@media (max-width: 680px) {
  .ch { border-left: 0; }
  .ch:nth-child(2) { border-top: 1px solid var(--ink); }
}
.ch .lab {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}
.ch .val {
  font-family: var(--serif);
  font-size: clamp(20px, 2.2vw, 26px);
  font-weight: 500;
  margin: 10px 0 8px;
  letter-spacing: -0.01em;
  word-break: break-word;
}
.ch p { font-size: 14.5px; color: var(--ink-2); margin: 0; line-height: 1.5; }

/* Audience split */
.aud {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 2px solid var(--ink);
  margin-top: 8px;
}
@media (max-width: 760px) {
  .aud { grid-template-columns: 1fr; }
}
.aud .a {
  padding: clamp(28px, 3.4vw, 44px);
  border-left: 1px solid var(--ink);
}
.aud .a:first-child { border-left: 0; }
@media (max-width: 760px) {
  .aud .a { border-left: 0; border-top: 1px solid var(--ink); }
  .aud .a:first-child { border-top: 0; }
}
.aud .a .ey {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.aud .a h3 {
  font-family: var(--serif);
  font-size: 26px;
  font-weight: 500;
  margin: 8px 0 12px;
  letter-spacing: -0.01em;
}
.aud .a p { font-size: 15.5px; color: var(--ink-2); margin: 0 0 16px; line-height: 1.55; }
.aud .a ul { margin: 0 0 18px; padding: 0; list-style: none; }
.aud .a li {
  font-size: 14.5px;
  color: var(--ink-2);
  padding: 9px 0;
  border-top: 1px dashed var(--line-2);
}
.aud .a li b { font-family: var(--serif); font-weight: 600; color: var(--ink); }

/* Message form (static mock) */
.field { margin-bottom: 18px; }
.field label {
  display: block;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 7px;
}
.field input,
.field select,
.field textarea {
  width: 100%;
  font-family: var(--sans);
  font-size: 15px;
  color: var(--ink);
  background: var(--paper-2);
  border: 1px solid var(--line-2);
  border-radius: var(--radius);
  padding: 12px 14px;
  transition: 0.12s;
}
.field input:focus,
.field select:focus,
.field textarea:focus { outline: none; border-color: var(--accent); background: #fff; }
.field textarea { min-height: 120px; resize: vertical; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 480px) {
  .two { grid-template-columns: 1fr; }
}
.msg { max-width: 680px; }

/* Socials hub */
.hub {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: center;
  border: 2px solid var(--ink);
  padding: 26px 30px;
  margin-top: 8px;
  background: var(--paper-ink);
  color: var(--ink-on-dark);
}
@media (max-width: 560px) {
  .hub { grid-template-columns: 1fr; }
}
.hub .h3 { font-family: var(--serif); font-size: 26px; font-weight: 500; }
.hub p { margin: 6px 0 0; color: var(--ink-on-dark-2); font-size: 14.5px; max-width: 48ch; }
.socials {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-left: 1px solid var(--line);
  border-top: 1px solid var(--line);
  margin-top: 18px;
}
@media (max-width: 680px) {
  .socials { grid-template-columns: repeat(2, 1fr); }
}
.soc {
  padding: 18px 20px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  text-decoration: none;
  color: var(--ink);
  transition: 0.12s;
}
.soc:hover { background: var(--accent-tint); }
.soc .p { font-family: var(--serif); font-size: 17px; font-weight: 500; }
.soc .d { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.04em; color: var(--ink-3); margin-top: 2px; }

/* Travel */
.travel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 2px solid var(--ink);
  margin-top: 8px;
}
@media (max-width: 760px) {
  .travel { grid-template-columns: 1fr; }
}
.travel .map {
  min-height: 300px;
  border-right: 2px solid var(--ink);
  position: relative;
  background: repeating-linear-gradient(135deg, var(--paper-3) 0 11px, transparent 11px 22px), var(--paper-2);
}
@media (max-width: 760px) {
  .travel .map { border-right: 0; border-bottom: 2px solid var(--ink); min-height: 220px; }
}
.travel .map .pin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.travel .map .pin .dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  margin: 0 auto 8px;
  box-shadow: 0 0 0 6px rgba(189, 91, 42, 0.18);
}
.travel .map .pin .pl {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-2);
}
.travel .list { padding: clamp(24px, 3vw, 40px); }
.travel .list .wh {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-top: 1px solid var(--line-2);
}
.travel .list .wh:first-of-type { border-top: 0; }
.travel .list .wh .c { font-family: var(--serif); font-size: 18px; font-weight: 500; }
.travel .list .wh .c span {
  display: block;
  font-family: var(--sans);
  font-size: 13px;
  color: var(--ink-2);
  font-weight: 400;
}
.travel .list .wh .dt {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent);
  white-space: nowrap;
  text-align: right;
}
</style>
