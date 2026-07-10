<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  display?: string
  displayAccent?: string
  displayMax?: string
  lead?: string
  primaryLabel?: string
  primaryTo?: string
  ghostLabel?: string
  ghostTo?: string
  // Extra ghost buttons rendered as plain external links (e.g. Scholar, ORCID)
  ghostLinks?: { label: string, to?: string }[]
}>(), {
  displayMax: '18ch',
})
</script>

<template>
  <section class="section dark-section" style="text-align: center;">
    <div class="wrap">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <p class="display" :style="{ maxWidth: displayMax, margin: '18px auto 0' }">
        {{ display }}<template v-if="displayAccent"> <span class="d-accent">{{ displayAccent }}</span></template>
      </p>
      <p v-if="lead" class="lead" style="max-width: 48ch; margin: 20px auto 0;">{{ lead }}</p>
      <div v-if="primaryLabel || ghostLabel || ghostLinks?.length" style="display: flex; gap: 14px; justify-content: center; margin-top: 32px; flex-wrap: wrap;">
        <NuxtLink v-if="primaryLabel" class="btn btn-primary" :to="primaryTo" style="border-radius: 0;">
          {{ primaryLabel }} <span class="arrow">→</span>
        </NuxtLink>
        <NuxtLink
          v-if="ghostLabel"
          class="btn btn-ghost"
          :to="ghostTo"
          style="color: var(--ink-on-dark); border-color: var(--line-dark); border-radius: 0;"
        >
          {{ ghostLabel }}
        </NuxtLink>
        <a
          v-for="(g, i) in ghostLinks"
          :key="i"
          class="btn btn-ghost"
          :href="g.to"
          style="color: var(--ink-on-dark); border-color: var(--line-dark); border-radius: 0;"
        >
          {{ g.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Accent tail on the display line — the lighter accent that reads on dark. */
.display .d-accent { color: #d98a5e; font-style: italic; }
</style>
