<script setup lang="ts">
import { Command, Layers3, Rocket } from 'lucide-vue-next'

import { Card } from '@/components/ui/card'
import type { CommandDeckItem, WorkflowStage } from './content'

defineProps<{
  commandDeck: CommandDeckItem[]
  viteHighlights: string[]
  workflowStages: WorkflowStage[]
}>()
</script>

<template>
  <section class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
    <Card class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="inline-flex size-11 items-center justify-center rounded-2xl border border-chart-3/35 bg-chart-3/10 text-chart-3">
          <Layers3 class="size-5" />
        </span>
        <div>
          <p class="text-sm uppercase tracking-[0.22em] text-muted-foreground">AI Coding System</p>
          <h3 class="text-2xl font-semibold">高质量 AI 编程，不只是更快，而是把优秀经验沉淀为可复用的 skills 体系。</h3>
        </div>
      </div>

      <div class="grid gap-4">
        <article
          v-for="stage in workflowStages"
          :key="stage.step"
          class="rounded-[28px] border border-border/60 bg-background/75 p-5"
        >
          <div class="flex items-start gap-4">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 font-mono text-sm font-semibold text-primary">
              {{ stage.step }}
            </div>
            <div>
              <h4 class="text-lg font-semibold">{{ stage.title }}</h4>
              <p class="mt-2 text-sm leading-7 text-muted-foreground">{{ stage.body }}</p>
            </div>
          </div>
        </article>
      </div>
    </Card>

    <div class="grid gap-6">
      <Card class="space-y-5">
        <div class="flex items-center gap-3">
          <span class="inline-flex size-10 items-center justify-center rounded-2xl border border-chart-4/35 bg-chart-4/10 text-chart-4">
            <Rocket class="size-5" />
          </span>
          <div>
            <h3 class="text-lg font-semibold">Vite 8 Highlights</h3>
            <p class="text-sm text-muted-foreground">模板内已经直接落地的前沿能力。</p>
          </div>
        </div>

        <ul class="grid gap-3">
          <li
            v-for="item in viteHighlights"
            :key="item"
            class="rounded-2xl border border-border/60 bg-background/75 px-4 py-3 text-sm text-muted-foreground"
          >
            <code class="font-mono text-foreground">{{ item }}</code>
          </li>
        </ul>
      </Card>

      <Card class="space-y-5">
        <div class="flex items-center gap-3">
          <span class="inline-flex size-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <Command class="size-5" />
          </span>
          <div>
            <h3 class="text-lg font-semibold">Command Deck</h3>
            <p class="text-sm text-muted-foreground">从开发到构建的一体化工程入口。</p>
          </div>
        </div>

        <div class="grid gap-3">
          <article
            v-for="item in commandDeck"
            :key="item.name"
            class="rounded-[24px] border border-border/60 bg-background/75 px-4 py-4"
          >
            <p class="font-mono text-sm text-primary">{{ item.name }}</p>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">{{ item.detail }}</p>
          </article>
        </div>
      </Card>
    </div>
  </section>
</template>
