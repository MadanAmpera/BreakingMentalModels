<script setup lang="ts">
defineProps<{
  crumb?: { label: string, to?: string }[]
  roman?: string
  heading?: string
  headingAccent?: string
  lede?: string
  meta?: { lab: string, val: string }[]
}>()
</script>

<template>
  <header class="page-hero">
    <div class="wrap">
      <p v-if="crumb?.length" class="crumb">
        <template v-for="(c, i) in crumb" :key="i">
          <NuxtLink v-if="c.to" :to="c.to">{{ c.label }}</NuxtLink>
          <span v-else>{{ c.label }}</span>
          <span v-if="i < crumb.length - 1" class="sep">/</span>
        </template>
      </p>
      <p v-if="roman" class="roman">{{ roman }}</p>
      <h1>{{ heading }} <span v-if="headingAccent" class="it">{{ headingAccent }}</span></h1>
      <p v-if="lede" class="lede">{{ lede }}</p>
      <div v-if="meta?.length" class="meta-row">
        <div v-for="(m, i) in meta" :key="i">
          <span class="lab">{{ m.lab }}</span><span class="val">{{ m.val }}</span>
        </div>
      </div>
    </div>
  </header>
</template>
