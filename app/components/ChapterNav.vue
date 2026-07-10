<script setup lang="ts">
defineProps<{
  prev?: { to: string, title: string, label?: string }
  next?: { to: string, title: string, label?: string }
}>()
</script>

<template>
  <nav class="chapter-nav" aria-label="Chapter navigation">
    <NuxtLink v-if="prev" :to="prev.to">
      <span class="lab">{{ prev.label ?? '← Previous' }}</span>
      <span class="ttl">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else />

    <NuxtLink v-if="next" class="next" :to="next.to">
      <span class="lab">{{ next.label ?? 'Next chapter →' }}</span>
      <span class="ttl">{{ next.title }}</span>
    </NuxtLink>
    <span v-else />
  </nav>
</template>
