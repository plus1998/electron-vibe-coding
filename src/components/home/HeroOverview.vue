<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { ExecutiveStat } from './content'

defineProps<{
  executiveStats: ExecutiveStat[]
  isElectron: boolean
}>()

const emit = defineEmits<{
  openDocs: [url: string]
  refreshRuntime: []
}>()
</script>

<template>
  <Card class="relative overflow-hidden p-0">
    <div
      class="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,rgba(95,93,255,0.32),transparent_42%),radial-gradient(circle_at_70%_18%,rgba(63,186,199,0.22),transparent_30%)]"
    />
    <div class="relative flex h-full flex-col gap-8 p-6 sm:p-8 lg:p-10">
      <div class="flex flex-wrap gap-2">
        <Badge>Enterprise AI desktop foundation</Badge>
        <Badge variant="outline">{{ isElectron ? 'Runtime verified in Electron' : 'Browser preview mode' }}</Badge>
      </div>

      <div class="space-y-5">
        <p class="text-sm uppercase tracking-[0.32em] text-muted-foreground">AI-native Delivery Infrastructure</p>
        <h2 class="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
          为商业级桌面产品打造的高端工程模板，以 Vite 8 与成体系 skills 为核心，驱动更高效、更稳定、更高可用的 AI 编程交付。
        </h2>
        <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
          这不是传统脚手架的堆砌，而是一套围绕前沿技术、强规范协作与长期可维护性交付重新设计的工程底座。
          它把 renderer、main 与 preload 收敛进更清晰的控制面，并通过大量优秀且规范的 skills 沉淀可复用工程经验，
          帮助团队在 AI 编程时代仍然保持高质量输出与稳定节奏。
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <Button size="lg" @click="emit('openDocs', 'https://vite.dev')">
          Explore Vite 8
          <ArrowUpRight class="size-4" />
        </Button>
        <Button
          as="a"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          size="lg"
          variant="outline"
        >
          Launch Template
        </Button>
        <Button size="lg" variant="secondary" @click="emit('refreshRuntime')">刷新运行时面板</Button>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <article
          v-for="stat in executiveStats"
          :key="stat.label"
          class="rounded-[28px] border border-white/55 bg-white/50 p-5 shadow-[0_20px_70px_-48px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <p class="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">{{ stat.label }}</p>
          <p class="mt-3 text-2xl font-semibold tracking-tight">{{ stat.value }}</p>
          <p class="mt-2 text-sm leading-6 text-muted-foreground">{{ stat.detail }}</p>
        </article>
      </div>
    </div>
  </Card>
</template>
