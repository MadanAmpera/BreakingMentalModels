<script setup lang="ts">
// Floating light/dark toggle. Mirrors the design's theme.js:
// persists the choice in localStorage('bmm-theme'); the pre-paint
// snippet in <head> (see nuxt.config) applies it before first paint.
type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

function apply(next: Theme) {
  const root = document.documentElement
  if (next === 'dark') root.setAttribute('data-theme', 'dark')
  else root.removeAttribute('data-theme')
  try {
    localStorage.setItem('bmm-theme', next)
  }
  catch {
    // ignore storage errors (private mode, etc.)
  }
  theme.value = next
}

function toggle() {
  apply(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  theme.value = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
})
</script>

<template>
  <ClientOnly>
    <button
      class="bmm-theme-toggle"
      type="button"
      :aria-pressed="theme === 'dark'"
      aria-label="Toggle colour theme"
      @click="toggle"
    >
      <span class="tt-ico" aria-hidden="true">{{ theme === 'dark' ? '☀' : '☾' }}</span>
      <span class="tt-lab">{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
    </button>
  </ClientOnly>
</template>
