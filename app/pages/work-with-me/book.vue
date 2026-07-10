<script setup lang="ts">
const { data: page } = await useAsyncData('work-with-me-book', () =>
  queryCollection('workwithme').path('/work-with-me/book').first(),
)

useSeoMeta({
  title: () => `${page.value?.title ?? 'Book a Discovery Session'} — Breaking Mental Models`,
  description: () => page.value?.hero?.lede,
})

const crumb = [
  { label: 'Home', to: '/' },
  { label: 'Work With Me', to: '/work-with-me' },
  { label: 'Book a discovery' },
]

// Static scheduler mock-up — replaced by the live booking calendar (Calendly /
// Google) in a later phase. The calendar and form below are presentational only.
const dow = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const calDays = [
  { n: 26, muted: true }, { n: 27, muted: true }, { n: 28, muted: true }, { n: 29, muted: true }, { n: 30, muted: true }, { n: 31, muted: true }, { n: 1 },
  { n: 2 }, { n: 3 }, { n: 4, avail: true }, { n: 5, avail: true }, { n: 6 }, { n: 7, muted: true }, { n: 8 },
  { n: 9 }, { n: 10, avail: true }, { n: 11, avail: true, sel: true }, { n: 12, avail: true }, { n: 13 }, { n: 14, muted: true }, { n: 15 },
  { n: 16, avail: true }, { n: 17, avail: true }, { n: 18, avail: true }, { n: 19, avail: true }, { n: 20 }, { n: 21, muted: true }, { n: 22 },
  { n: 23 }, { n: 24, avail: true }, { n: 25, avail: true }, { n: 26, avail: true }, { n: 27 }, { n: 28, muted: true }, { n: 29 },
  { n: 30 }, { n: 1, muted: true }, { n: 2, muted: true }, { n: 3, muted: true }, { n: 4, muted: true }, { n: 5, muted: true }, { n: 6, muted: true },
]
const slots = ['9:00 am', '11:30 am', '2:00 pm', '4:30 pm', '6:00 pm']
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
        <div v-if="page.expect?.length" class="expect">
          <div v-for="(e, i) in page.expect" :key="i" class="e">
            <span class="n">{{ e.n }}</span>
            <h4>{{ e.title }}</h4>
            <p>{{ e.body }}</p>
          </div>
        </div>

        <div v-if="page.booker" id="booker" class="sec-head" style="margin-top: 72px;">
          <span class="rn">{{ page.booker.rn }}</span><h2>{{ page.booker.heading }}</h2>
        </div>
        <p v-if="page.banner" class="client-banner">{{ page.banner }}</p>

        <div class="booker">
          <div class="pane cal">
            <h2>Pick a date</h2>
            <p class="sub">Available slots, Adelaide time (ACST).</p>
            <div class="month">
              <span class="m">June 2026</span>
              <span class="nav">←&nbsp;&nbsp;→</span>
            </div>
            <div class="cal-grid">
              <span v-for="(d, i) in dow" :key="`dow-${i}`" class="dow">{{ d }}</span>
              <span
                v-for="(day, i) in calDays"
                :key="`day-${i}`"
                class="day"
                :class="{ muted: day.muted, avail: day.avail, sel: day.sel }"
              >{{ day.n }}</span>
            </div>
            <div class="slots">
              <span
                v-for="(s, i) in slots"
                :key="i"
                class="slot"
                :class="{ sel: s === '11:30 am' }"
              >{{ s }}</span>
            </div>
            <p class="tz">Times shown in Adelaide, South Australia (ACST). Other time zones converted automatically on the live calendar.</p>
          </div>

          <div class="pane">
            <h2>Tell us a little</h2>
            <p class="sub">The more honest and open you are, the better we can tailor the conversation.</p>
            <form @submit.prevent>
              <div class="two">
                <div class="field"><label>Your name</label><input type="text" placeholder="Full name"></div>
                <div class="field"><label>Role</label><input type="text" placeholder="e.g. Head of People"></div>
              </div>
              <div class="two">
                <div class="field"><label>Email</label><input type="email" placeholder="you@organisation.com"></div>
                <div class="field"><label>Organisation</label><input type="text" placeholder="Organisation name"></div>
              </div>
              <div class="field">
                <label>What's prompting this conversation?</label>
                <select>
                  <option>Persistent conflict or miscommunication</option>
                  <option>Preparing for significant change</option>
                  <option>Culture &amp; psychosocial safety</option>
                  <option>Leadership &amp; ethical decision-making</option>
                  <option>Performance &amp; KPI alignment</option>
                  <option>Not sure yet — let's talk</option>
                </select>
              </div>
              <div class="field">
                <label>In a sentence or two</label>
                <textarea placeholder="What's actually happening, and what you'd hope to change." />
              </div>
              <button class="btn btn-primary" type="submit" style="border-radius: 0; width: 100%; justify-content: center;">
                Request this slot <span class="arrow">→</span>
              </button>
              <p class="meta" style="margin-top: 14px; text-align: center;">We respond to every enquiry within 24 hours.</p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <DarkCta v-bind="page.cta ?? {}" />

    <ChapterNav :prev="page.chapterNav?.prev" :next="page.chapterNav?.next" />
  </div>
</template>

<style scoped>
/* Book a discovery (from Prototype1 work-with-me/book.html) */
.expect {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-top: 8px;
}
@media (max-width: 680px) {
  .expect { grid-template-columns: 1fr; }
}
.expect .e {
  padding: 26px 26px 26px 0;
  border-left: 1px solid var(--line);
}
.expect .e:first-child { border-left: 0; }
@media (max-width: 680px) {
  .expect .e { border-left: 0; padding-left: 0; border-top: 1px solid var(--line); padding-top: 24px; }
  .expect .e:first-child { border-top: 0; padding-top: 0; }
}
.expect .e .n {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.12em;
}
.expect .e h4 {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 500;
  margin: 8px 0 6px;
}
.expect .e p { font-size: 14.5px; color: var(--ink-2); margin: 0; line-height: 1.5; }

.booker {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 2px solid var(--ink);
  margin-top: 8px;
}
@media (max-width: 860px) {
  .booker { grid-template-columns: 1fr; }
}
.booker .pane { padding: clamp(26px, 3.4vw, 44px); }
.booker .pane.cal {
  border-right: 2px solid var(--ink);
  background: var(--paper-2);
}
@media (max-width: 860px) {
  .booker .pane.cal { border-right: 0; border-bottom: 2px solid var(--ink); }
}
.booker h2 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 4px;
}
.booker .sub { font-size: 14px; color: var(--ink-3); margin: 0 0 22px; }

/* mini month */
.month {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.month .m { font-family: var(--serif); font-size: 18px; font-weight: 600; }
.month .nav {
  font-family: var(--mono);
  font-size: 14px;
  color: var(--ink-3);
  display: flex;
  gap: 14px;
}
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.cal-grid .dow {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
  text-align: center;
  padding: 6px 0;
}
.cal-grid .day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--mono);
  font-size: 13.5px;
  color: var(--ink-2);
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: default;
}
.cal-grid .day.muted { color: var(--line-2); }
.cal-grid .day.avail {
  background: var(--paper);
  border-color: var(--line-2);
  color: var(--ink);
  cursor: pointer;
  transition: 0.12s;
}
.cal-grid .day.avail:hover { border-color: var(--accent); color: var(--accent-deep); }
.cal-grid .day.sel { background: var(--accent); border-color: var(--accent); color: #fff; }
.slots { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.slot {
  font-family: var(--mono);
  font-size: 12.5px;
  padding: 8px 14px;
  border: 1px solid var(--line-2);
  border-radius: 2px;
  color: var(--ink-2);
  cursor: pointer;
  transition: 0.12s;
  background: var(--paper);
}
.slot:hover { border-color: var(--accent); color: var(--accent-deep); }
.slot.sel { background: var(--accent); border-color: var(--accent); color: #fff; }
.tz {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-3);
  margin-top: 14px;
  letter-spacing: 0.04em;
}

/* form */
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
.field textarea { min-height: 96px; resize: vertical; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 480px) {
  .two { grid-template-columns: 1fr; }
}
</style>
