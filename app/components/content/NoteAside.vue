<script setup lang="ts">
// MDC block component: ::note-aside{title="…"} … :: — a marginal note in prose.
defineProps<{ title?: string }>()
</script>

<template>
  <div class="note-aside">
    <b v-if="title">{{ title }}</b>
    <slot />
  </div>
</template>

<style scoped>
.note-aside {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.06em;
  line-height: 1.65;
  color: var(--ink-3);
  border-left: 1px solid var(--line-2);
  padding-left: 18px;
  max-width: 680px;
  margin: 36px auto;
}
.note-aside b {
  display: block;
  font-family: var(--mono);
  font-weight: 500;
  font-size: 10.5px;
  letter-spacing: 0.18em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 6px;
}
.note-aside :deep(p) {
  margin: 0;
  font-family: var(--mono);
  font-size: 11.5px;
  line-height: 1.65;
  color: var(--ink-3);
}
</style>
