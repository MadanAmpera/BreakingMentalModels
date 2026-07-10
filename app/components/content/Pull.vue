<template>
  <div class="pull"><slot /></div>
</template>

<script setup lang="ts">
// MDC block component: ::pull … :: — an editorial pull-quote inside prose.
// Base styling comes from `.article .pull` in bmm-site.css; here we just make
// the markdown-wrapped inner paragraph inherit it (scoped attr wins specificity).
</script>

<style scoped>
.pull :deep(p) {
  margin: 0;
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
  text-align: inherit;
}
</style>
