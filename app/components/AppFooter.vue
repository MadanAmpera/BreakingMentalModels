<script setup lang="ts">
const explore = [
  { label: 'About', to: '/about' },
  { label: 'Research', to: '/research' },
  { label: 'Education Hub', to: '/education-hub' },
  { label: 'Work With Me', to: '/work-with-me' },
  { label: 'Podcast', to: '/podcast' },
]
const more = [
  { label: 'Testimonials', to: '/voices' },
  { label: 'Student feedback', to: '/voices#students' },
  { label: 'Travel & whereabouts', to: '/connect#travel' },
  { label: 'FAQ', to: '/connect/faq' },
]
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site">
    <div class="wrap">
      <div class="colophon">
        <div>
          <NuxtLink class="brand" to="/">
            <span class="mark"><i /><i /><i /></span><b>B / M / M</b>
          </NuxtLink>
          <p style="color: var(--ink-2); font-size: 14.5px; margin-top: 16px; max-width: 34ch;">
            Dr. Ankit Agarwal — educator, researcher, and lifelong learner. Adelaide, South Australia.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <NuxtLink v-for="l in explore" :key="l.to" :to="l.to">{{ l.label }}</NuxtLink>
        </div>

        <div>
          <h4>More</h4>
          <NuxtLink v-for="l in more" :key="l.to" :to="l.to">{{ l.label }}</NuxtLink>
        </div>

        <div>
          <h4>Connect</h4>
          <NuxtLink to="/connect">Contact</NuxtLink>
          <NuxtLink to="/work-with-me/book">Book appointment</NuxtLink>
          <a href="#">YouTube</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>

      <div class="foot-bottom">
        <span>© {{ year }} Breaking Mental Models</span>
        <span>Set in Newsreader &amp; IBM Plex</span>
      </div>
    </div>
  </footer>
</template>
