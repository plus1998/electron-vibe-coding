<script setup lang="ts">
import { Cpu, MonitorSmartphone } from 'lucide-vue-next'

import { Card } from '@/components/ui/card'

defineProps<{
  pingDescription: string
  pingSummary: string
  runtimeRows: Array<[label: string, value: string]>
  runtimeStatus: string
}>()
</script>

<template>
  <Card class="relative overflow-hidden p-0">
    <div class="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(20,25,34,0.06),transparent)]" />
    <div class="relative flex h-full flex-col gap-5 p-6 sm:p-7">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.24em] text-muted-foreground">Executive Console</p>
          <h3 class="mt-2 text-2xl font-semibold">AI Delivery Readiness</h3>
        </div>
        <span class="inline-flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <MonitorSmartphone class="size-5" />
        </span>
      </div>

      <div class="grid gap-3">
        <div class="rounded-[28px] border border-border/60 bg-background/80 p-5">
          <p class="text-sm uppercase tracking-[0.18em] text-muted-foreground">Latest ping</p>
          <p class="mt-3 text-3xl font-semibold">{{ pingSummary }}</p>
          <p class="mt-2 text-sm text-muted-foreground">{{ pingDescription }}</p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-[24px] border border-border/60 bg-background/80 p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-muted-foreground">Governance</p>
            <p class="mt-2 text-lg font-semibold">Skills + rules</p>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">类型、lint、脚本入口、组件模式与 skills 规范保持一致。</p>
          </div>
          <div class="rounded-[24px] border border-border/60 bg-background/80 p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-muted-foreground">Delivery</p>
            <p class="mt-2 text-lg font-semibold">High availability</p>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">适合长期演进、多人协作与商业化上线。</p>
          </div>
        </div>

        <div class="rounded-[28px] border border-border/60 bg-background/80 p-5">
          <div class="mb-4 flex items-center gap-3">
            <span class="inline-flex size-10 items-center justify-center rounded-2xl border border-chart-2/35 bg-chart-2/10 text-chart-2">
              <Cpu class="size-5" />
            </span>
            <div>
              <h4 class="font-semibold">Runtime Surface</h4>
              <p class="text-sm text-muted-foreground">当前商业级桌面壳层的关键状态。</p>
            </div>
          </div>

          <div class="grid gap-3">
            <div
              v-for="[label, value] in runtimeRows"
              :key="label"
              class="flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3 text-sm"
            >
              <span class="text-muted-foreground">{{ label }}</span>
              <span class="max-w-[14rem] truncate text-right font-medium">{{ value }}</span>
            </div>

            <div class="flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3 text-sm">
              <span class="text-muted-foreground">Status</span>
              <span class="max-w-[14rem] truncate text-right font-medium">{{ runtimeStatus }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
