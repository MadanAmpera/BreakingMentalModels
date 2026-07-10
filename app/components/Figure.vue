<script setup lang="ts">
// Renders an uploaded image when `src` is set (a /public path from Studio's
// Media panel, e.g. "/portrait.jpg"); otherwise falls back to the editorial
// hatched placeholder showing `label`. Drop-in replacement for the raw `.ph`
// divs so any placeholder can be filled from Studio. Overlays (e.g. a play
// button) can be passed via the default slot.
defineProps<{
  src?: string
  label?: string
  alt?: string
}>()
</script>

<template>
  <div class="ph" :class="{ 'has-img': src }" :data-label="label">
    <img v-if="src" :src="src" :alt="alt ?? label ?? ''">
    <slot />
  </div>
</template>

<style scoped>
.ph.has-img::after { display: none; }
.ph img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
