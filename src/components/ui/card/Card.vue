<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-[32px] border border-border/60 bg-card/78 p-6 text-card-foreground shadow-[0_28px_120px_-56px_rgba(0,0,0,0.75)] backdrop-blur-2xl',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
