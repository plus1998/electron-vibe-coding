<script setup lang="ts">
import type { FeatureColumn } from './content'

defineProps<{
  featureColumns: FeatureColumn[]
}>()
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-3">
    <article
      v-for="feature in featureColumns"
      :key="feature.title"
      class="rounded-[32px] border border-border/60 bg-card/78 p-6 shadow-[0_28px_120px_-56px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
    >
      <span class="mb-5 inline-flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
        <component :is="feature.icon" class="size-5" />
      </span>
      <h3 class="text-xl font-semibold">{{ feature.title }}</h3>
      <p class="mt-3 text-sm leading-7 text-muted-foreground">{{ feature.body }}</p>
    </article>
  </section>
</template>
