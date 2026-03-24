<script setup lang="ts">
import {
  ArrowUpRight,
  Command,
  Cpu,
  Gauge,
  Layers3,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-vue-next'
import { computed } from 'vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDesktopRuntime } from '@/composables/use-desktop-runtime'

const { appInfo, bridgeLabel, isElectron, openExternal, ping, pingMain, refreshAppInfo, windowState } =
  useDesktopRuntime()
const appMeta = __APP_META__

const executiveStats = [
  {
    value: 'Vite 8',
    label: 'Frontier build core',
    detail: '以前沿能力驱动桌面工程基座。',
  },
  {
    value: 'Strong Rules',
    label: 'AI coding discipline',
    detail: '更强规范，更少漂移，更稳协作。',
  },
  {
    value: 'High Availability',
    label: 'Commercial delivery focus',
    detail: '面向长期维护与产品级上线。',
  },
]

const trustSignals = [
  'Vue 3 + TypeScript',
  'Tailwind CSS v4 + shadcn-vue',
  'Electron 41 multi-process boundary',
  'Lint + typecheck + unified scripts',
]

const featureColumns = [
  {
    title: '前沿技术栈',
    body: '以 Vite 8 为中心组织 renderer、main、preload，避免把桌面工程建立在陈旧 bundler 之上。',
    icon: Rocket,
  },
  {
    title: 'AI 编程强规范',
    body: '通过清晰分层、严格类型、统一脚本与一致化组件约束，让 AI 生成代码更可控、更易审阅。',
    icon: ShieldCheck,
  },
  {
    title: '高效稳定交付',
    body: '缩短开发反馈回路，同时保留 Electron 安全边界与桌面职责划分，兼顾速度与可靠性。',
    icon: Gauge,
  },
]

const workflowStages = [
  {
    step: '01',
    title: 'Define the contract',
    body: '先固定进程边界、组件层级与工程规则，让 AI 在清晰约束里工作。',
  },
  {
    step: '02',
    title: 'Accelerate implementation',
    body: '依托 Vite 8、Tailwind v4 与可复用 UI 基础层，更快完成桌面界面与壳层能力接入。',
  },
  {
    step: '03',
    title: 'Ship with confidence',
    body: '用 lint、typecheck、统一构建链与 Electron 安全基线，提升产品化上线质量。',
  },
]

const commandDeck = [
  {
    name: 'pnpm dev',
    detail: '启动 renderer、main、preload 的联动开发环境，并自动拉起 Electron。',
  },
  {
    name: 'pnpm lint',
    detail: '执行工程规范检查，约束 AI 编程输出与团队协作质量。',
  },
  {
    name: 'pnpm build',
    detail: '一键产出 renderer、main、preload 三段构建结果。',
  },
]

const viteHighlights = [
  'resolve.tsconfigPaths: true',
  'server.forwardConsole',
  'server.warmup',
  'Vite-driven main/preload build pipeline',
]

const runtimeRows = computed(() => [
  ['Bridge', bridgeLabel.value],
  ['Electron', appInfo.value?.versions.electron ?? `v${appMeta.stack.electron}`],
  ['Chromium', appInfo.value?.versions.chrome ?? 'Preview only'],
  ['Node.js', appInfo.value?.versions.node ?? 'Preview only'],
  ['Platform', appInfo.value ? `${appInfo.value.platform} / ${appInfo.value.arch}` : 'Browser preview'],
  ['Window', windowState.value.isMaximized ? 'Maximized' : 'Normal'],
])

function handleDocs(url: string) {
  void openExternal(url)
}

function handleRefresh() {
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
      <header class="drag-region flex items-center justify-between rounded-full border border-border/60 bg-card/75 px-5 py-3 shadow-[0_22px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
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

      <section class="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)]">
        <Card class="relative overflow-hidden p-0">
          <div class="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,rgba(95,93,255,0.32),transparent_42%),radial-gradient(circle_at_70%_18%,rgba(63,186,199,0.22),transparent_30%)]" />
          <div class="relative flex h-full flex-col gap-8 p-6 sm:p-8 lg:p-10">
            <div class="flex flex-wrap gap-2">
              <Badge>Enterprise desktop foundation</Badge>
              <Badge variant="outline">{{ isElectron ? 'Runtime verified in Electron' : 'Browser preview mode' }}</Badge>
            </div>

            <div class="space-y-5">
              <p class="text-sm uppercase tracking-[0.32em] text-muted-foreground">AI-native Engineering System</p>
              <h2 class="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
                为商业级桌面产品打造的高端工程模板，用 Vite 8 驱动更高效、更稳定、更高可用的 AI 编程交付。
              </h2>
              <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                这不是传统脚手架的堆砌，而是一套围绕前沿技术、强规范协作与长期可维护性交付重新设计的工程底座。
                它把 renderer、main 与 preload 收敛进更清晰的控制面，帮助团队在 AI 编程时代仍然保持高质量输出。
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <Button size="lg" @click="handleDocs('https://vite.dev')">
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
              <Button size="lg" variant="secondary" @click="handleRefresh">刷新运行时面板</Button>
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
                <p class="mt-3 text-3xl font-semibold">
                  {{ ping ? `${ping.message} · ${ping.latency}ms` : 'Pending' }}
                </p>
                <p class="mt-2 text-sm text-muted-foreground">
                  用于验证 renderer、preload、main 三层链路在当前桌面壳层中的交互稳定性。
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-[24px] border border-border/60 bg-background/80 p-4">
                  <p class="text-xs uppercase tracking-[0.18em] text-muted-foreground">Governance</p>
                  <p class="mt-2 text-lg font-semibold">Strong rules</p>
                  <p class="mt-2 text-sm leading-6 text-muted-foreground">类型、lint、脚本入口和组件模式保持一致。</p>
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
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section class="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card class="overflow-hidden">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="max-w-2xl">
              <p class="text-sm uppercase tracking-[0.22em] text-muted-foreground">Why leading teams choose this</p>
              <h3 class="mt-2 text-2xl font-semibold">以前沿技术和工程纪律，支撑更像产品而不是 demo 的桌面交付。</h3>
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
              <h3 class="mt-2 text-2xl font-semibold">不是“能跑就行”的模板，而是“可交付、可治理、可持续”的 AI 桌面工程系统。</h3>
            </div>
          </div>
        </Card>
      </section>

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

      <section class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card class="space-y-6">
          <div class="flex items-center gap-3">
            <span class="inline-flex size-11 items-center justify-center rounded-2xl border border-chart-3/35 bg-chart-3/10 text-chart-3">
              <Layers3 class="size-5" />
            </span>
            <div>
              <p class="text-sm uppercase tracking-[0.22em] text-muted-foreground">AI Coding System</p>
              <h3 class="text-2xl font-semibold">高质量 AI 编程不是更自由，而是更有边界。</h3>
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
    </div>
  </div>
</template>
