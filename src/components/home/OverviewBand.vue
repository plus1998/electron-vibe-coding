<script setup lang="ts">
import { Command } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

defineProps<{
  trustSignals: string[]
}>()
</script>

<template>
  <section class="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
    <Card class="overflow-hidden">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-2xl">
          <p class="text-sm uppercase tracking-[0.22em] text-muted-foreground">Why leading teams choose this</p>
          <h3 class="mt-2 text-2xl font-semibold">以前沿技术、统一规则和 skills 资产，支撑更像产品而不是 demo 的桌面交付。</h3>
        </div>
        <div class="flex flex-wrap gap-2">
          <Badge v-for="signal in trustSignals" :key="signal" variant="outline">{{ signal }}</Badge>
        </div>
      </div>
    </Card>

    <Card class="bg-[linear-gradient(135deg,rgba(94,95,247,0.12),rgba(69,191,201,0.08))]">
      <div class="flex items-start gap-4">
        <span class="inline-flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <Command class="size-5" />
        </span>
        <div>
          <p class="text-sm uppercase tracking-[0.22em] text-muted-foreground">Positioning</p>
          <h3 class="mt-2 text-2xl font-semibold">不是“能跑就行”的模板，而是“可交付、可治理、可复用”的 AI 桌面工程系统。</h3>
        </div>
      </div>
    </Card>
  </section>
</template>
