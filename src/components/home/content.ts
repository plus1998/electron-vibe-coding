import type { Component } from 'vue'

import { Gauge, Rocket, ShieldCheck } from 'lucide-vue-next'

export interface ExecutiveStat {
  value: string
  label: string
  detail: string
}

export interface FeatureColumn {
  title: string
  body: string
  icon: Component
}

export interface WorkflowStage {
  step: string
  title: string
  body: string
}

export interface CommandDeckItem {
  name: string
  detail: string
}

export const executiveStats: ExecutiveStat[] = [
  {
    value: 'Vite 8',
    label: 'Frontier build core',
    detail: '以前沿能力驱动桌面工程基座。',
  },
  {
    value: 'Skills System',
    label: 'AI coding governance',
    detail: '以高质量 skills 体系约束 AI 输出边界与交付一致性。',
  },
  {
    value: 'High Availability',
    label: 'Commercial delivery focus',
    detail: '面向长期维护与产品级上线。',
  },
]

export const trustSignals = [
  'Vue 3 + TypeScript',
  'Tailwind CSS v4 + shadcn-vue',
  'Electron 41 multi-process boundary',
  'Lint + typecheck + skills-driven workflow',
]

export const featureColumns: FeatureColumn[] = [
  {
    title: '前沿技术栈',
    body: '以 Vite 8 为中心组织 renderer、main、preload，避免把桌面工程建立在陈旧 bundler 之上。',
    icon: Rocket,
  },
  {
    title: 'AI 编程强规范',
    body: '通过清晰分层、严格类型、统一脚本与成体系 skills 约束，让 AI 生成代码更可控、更易审阅、更接近生产标准。',
    icon: ShieldCheck,
  },
  {
    title: '高效稳定交付',
    body: '缩短开发反馈回路，同时保留 Electron 安全边界与桌面职责划分，兼顾速度与可靠性。',
    icon: Gauge,
  },
]

export const workflowStages: WorkflowStage[] = [
  {
    step: '01',
    title: 'Define the contract',
    body: '先固定进程边界、组件层级、skills 规范与工程规则，让 AI 在明确契约中稳定工作。',
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

export const commandDeck: CommandDeckItem[] = [
  {
    name: 'pnpm dev',
    detail: '启动 renderer、main、preload 的联动开发环境，并自动拉起 Electron。',
  },
  {
    name: 'pnpm lint',
    detail: '执行工程规范检查，和 skills 体系一起约束 AI 编程输出与团队协作质量。',
  },
  {
    name: 'pnpm build',
    detail: '一键产出 renderer、main、preload 三段构建结果。',
  },
]

export const viteHighlights = [
  'resolve.tsconfigPaths: true',
  'server.forwardConsole',
  'server.warmup',
  'Vite-driven main/preload build pipeline',
]
