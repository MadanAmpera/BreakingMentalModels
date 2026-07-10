<script setup lang="ts">
defineProps<{
  label?: string
  count?: string
  rows?: {
    rn: string
    to: string
    title: string
    desc: string
    count?: string
    unit?: string
  }[]
}>()
</script>

<template>
  <div>
    <div class="idx-head">
      <span class="t">{{ label ?? 'In this chapter' }}</span>
      <span v-if="count" class="t" style="color: var(--ink-3);">{{ count }}</span>
    </div>

    <NuxtLink v-for="row in rows" :key="row.to" class="idx-row" :to="row.to">
      <span class="rn">{{ row.rn }}</span>
      <span>
        <h3>{{ row.title }}</h3>
        <p class="desc">{{ row.desc }}</p>
      </span>
      <span class="pg">
        <span class="count">{{ row.count }}</span>
        <span class="unit">{{ row.unit }}</span>
      </span>
    </NuxtLink>
  </div>
</template>
