<script setup lang="ts">
import { computed } from 'vue'

import AppHeader from '@/components/home/AppHeader.vue'
import FeatureGrid from '@/components/home/FeatureGrid.vue'
import HeroOverview from '@/components/home/HeroOverview.vue'
import OverviewBand from '@/components/home/OverviewBand.vue'
import RuntimeConsole from '@/components/home/RuntimeConsole.vue'
import WorkflowGuide from '@/components/home/WorkflowGuide.vue'
import {
  commandDeck,
  executiveStats,
  featureColumns,
  trustSignals,
  viteHighlights,
  workflowStages,
} from '@/components/home/content'
import { useDesktopRuntime } from '@/composables/use-desktop-runtime'

const {
  appInfo,
  bridgeLabel,
  isElectron,
  isPinging,
  isRefreshing,
  openExternal,
  ping,
  pingError,
  pingMain,
  refreshAppInfo,
  runtimeError,
  windowState,
} = useDesktopRuntime()

const appMeta = __APP_META__

const runtimeRows = computed<Array<[label: string, value: string]>>(() => [
  ['Bridge', bridgeLabel.value],
  ['Electron', appInfo.value?.versions.electron ?? `v${appMeta.stack.electron}`],
  ['Chromium', appInfo.value?.versions.chrome ?? 'Preview only'],
  ['Node.js', appInfo.value?.versions.node ?? 'Preview only'],
  ['Platform', appInfo.value ? `${appInfo.value.platform} / ${appInfo.value.arch}` : 'Browser preview'],
  ['Window', windowState.value.isMaximized ? 'Maximized' : 'Normal'],
])

const pingSummary = computed(() => {
  if (pingError.value) {
    return 'Unavailable'
  }

  if (ping.value) {
    return `${ping.value.message} · ${ping.value.latency}ms`
  }

  return isPinging.value ? 'Checking…' : 'Pending'
})

const pingDescription = computed(() => {
  if (pingError.value) {
    return `主进程 ping 失败：${pingError.value}`
  }

  return '用于验证 renderer、preload、main 三层链路在当前桌面壳层中的交互稳定性。'
})

const runtimeStatus = computed(() => {
  if (runtimeError.value) {
    return `Unavailable · ${runtimeError.value}`
  }

  return isRefreshing.value ? 'Refreshing' : 'Ready'
})

function handleDocs(url: string) {
  void openExternal(url)
}

function handleRefreshRuntime() {
  void refreshAppInfo()
  void pingMain()
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-background text-foreground">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute left-[-8rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-primary/18 blur-3xl" />
      <div class="absolute right-[-10rem] top-[4rem] h-[28rem] w-[28rem] rounded-full bg-chart-2/18 blur-3xl" />
      <div class="absolute bottom-[-12rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-chart-4/14 blur-3xl" />
      <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.18]" />
      <div class="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/35 to-transparent opacity-40" />
    </div>

    <div class="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-5 py-6 sm:px-8 lg:px-10">
      <AppHeader :app-meta="appMeta" />

      <section class="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)]">
        <HeroOverview
          :executive-stats="executiveStats"
          :is-electron="isElectron"
          @open-docs="handleDocs"
          @refresh-runtime="handleRefreshRuntime"
        />
        <RuntimeConsole
          :ping-description="pingDescription"
          :ping-summary="pingSummary"
          :runtime-rows="runtimeRows"
          :runtime-status="runtimeStatus"
        />
      </section>

      <OverviewBand :trust-signals="trustSignals" />
      <FeatureGrid :feature-columns="featureColumns" />
      <WorkflowGuide
        :command-deck="commandDeck"
        :vite-highlights="viteHighlights"
        :workflow-stages="workflowStages"
      />
    </div>
  </div>
</template>
