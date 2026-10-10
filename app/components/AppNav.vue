<script setup lang="ts">
const links = [
  { label: 'For students', to: '/students' },
  { label: 'For organisations', to: '/organisations' },
  { label: 'About', to: '/about' },
  { label: 'Research', to: '/research' },
  { label: 'Podcast', to: '/podcast' },
]

const open = ref(false)
</script>

<template>
  <nav class="site">
    <div class="wrap">
      <NuxtLink class="brand" to="/">
        <span class="mark"><i /><i /><i /></span><b>B / M / M</b>
      </NuxtLink>

      <div class="navlinks">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          active-class="is-current"
        >
          {{ l.label }}
        </NuxtLink>
      </div>

      <NuxtLink class="btn btn-primary nav-cta" to="/connect">
        Get in touch
      </NuxtLink>

      <button
        class="nav-burger"
        type="button"
        :aria-expanded="open"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        {{ open ? '✕' : '☰' }}
      </button>
    </div>

    <div v-show="open" class="nav-mobile">
      <NuxtLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        @click="open = false"
      >
        {{ l.label }}
      </NuxtLink>
      <NuxtLink to="/connect" @click="open = false">Get in touch</NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.nav-burger {
  display: none;
  margin-left: 14px;
  background: none;
  border: 1px solid var(--line-2);
  color: var(--ink);
  font-size: 15px;
  line-height: 1;
  padding: 9px 11px;
  border-radius: var(--radius);
  cursor: pointer;
}
.nav-mobile {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line);
  background: var(--paper);
}
.nav-mobile a {
  padding: 14px var(--gutter);
  text-decoration: none;
  color: var(--ink);
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--line);
}
.nav-mobile a:hover {
  color: var(--accent);
}
@media (max-width: 960px) {
  .nav-burger { display: inline-flex; align-items: center; }
}
@media (min-width: 961px) {
  .nav-mobile { display: none !important; }
}
</style>
