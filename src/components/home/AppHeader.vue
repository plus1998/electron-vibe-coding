<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import type { AppMeta } from '@/types/desktop'

defineProps<{
  appMeta: AppMeta
}>()
</script>

<template>
  <header
    class="drag-region flex items-center justify-between rounded-full border border-border/60 bg-card/75 px-5 py-3 shadow-[0_22px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
  >
    <div class="no-drag flex items-center gap-3">
      <span class="inline-flex size-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
        <Sparkles class="size-5" />
      </span>
      <div>
        <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">Commercial Template</p>
        <h1 class="text-sm font-semibold sm:text-base">Electron Vibe Coding</h1>
      </div>
    </div>

    <div class="no-drag hidden items-center gap-2 md:flex">
      <Badge variant="secondary">Vite {{ appMeta.stack.vite }}</Badge>
      <Badge variant="secondary">Electron {{ appMeta.stack.electron }}</Badge>
      <Badge variant="outline">Vue {{ appMeta.stack.vue }}</Badge>
    </div>
  </header>
</template>
