<script setup lang="ts">
const explore = [
  { label: 'For students', to: '/students' },
  { label: 'For organisations', to: '/organisations' },
  { label: 'About', to: '/about' },
  { label: 'Research', to: '/research' },
  { label: 'Podcast', to: '/podcast' },
]
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site">
    <div class="wrap">
      <div class="colophon">
        <div class="seal">
          <NuxtLink class="logo" to="/" aria-label="Breaking Mental Models — home">
            <img src="/brand/owl-footer.png" width="87" height="150" alt="" />
          </NuxtLink>
          <div>
            <NuxtLink class="brand" to="/"><b>Breaking Mental Models</b></NuxtLink>
            <p style="color: var(--ink-2); font-size: 14.5px; margin-top: 16px; max-width: 34ch;">
              Dr. Ankit Agarwal — educator, researcher, and lifelong learner. Adelaide, South Australia.
            </p>
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <NuxtLink v-for="l in explore" :key="l.to" :to="l.to">{{ l.label }}</NuxtLink>
        </div>

        <div>
          <h4>Connect</h4>
          <NuxtLink to="/connect">Contact</NuxtLink>
          <a href="mailto:breakingmentalmodels@gmail.com">Email</a>
          <a href="tel:+61450921758">Phone</a>
        </div>
      </div>

      <div class="foot-bottom">
        <span>© {{ year }} Breaking Mental Models</span>
      </div>
    </div>
  </footer>
</template>
