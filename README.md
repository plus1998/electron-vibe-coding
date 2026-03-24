# Electron Vibe Coding

一个面向商业级桌面应用的现代工程模板，基于 `Vue 3 + TypeScript + Tailwind CSS v4 + shadcn-vue + Vite 8 + ESLint + Electron 41` 构建。

它的核心定位不是“再做一个脚手架”，而是提供一套更适合 AI 编程时代的工程底座:

- 强规范
  以清晰的进程边界、统一的构建入口、严格的类型与 lint 约束，降低 AI 生成代码的漂移与失控风险。
- 高效稳定
  以 Vite 8 为核心组织 renderer、main、preload 的开发与构建流程，缩短反馈回路，同时保持实现路径足够清晰。
- 高可用
  默认保留 Electron 的安全边界与桌面应用职责划分，更适合长期维护、多人协作与产品化交付。

## Why this template

- 以前沿技术栈为中心，而不是围绕过时脚手架做兼容性妥协。
- `renderer` 直接使用 Vite 8 dev server 与构建输出，开发反馈更快。
- `main` 与 `preload` 保持在统一的 Vite 驱动工作流中，工程结构更清晰。
- 默认启用 `contextIsolation`，通过 preload 暴露白名单 API，适合商业产品的安全基线。
- 使用 Tailwind v4 的 CSS-first 方案与 shadcn-vue 组件风格，兼顾表达力与扩展性。
- ESLint flat config + TypeScript 类型校验，适合 AI 编程场景下的强规范协作。

## Vite 8 choices

- `resolve.tsconfigPaths: true`
  让 Vite 直接读取 `tsconfig.json` 路径别名，减少多余插件与配置噪音。
- `server.forwardConsole`
  将 renderer 的 `console.warn / console.error` 和未处理异常转发回终端，提升 Electron 联调效率。
- `server.warmup`
  预热核心页面和组件，降低首次进入时的 transform waterfall。
- `build/watch` via JS API
  将 main 与 preload 纳入统一控制面，减少额外 bundler 带来的复杂性。

## AI Coding Value

- 更适合 AI 参与实现
  明确 renderer / preload / main 分层，能让 AI 更容易在正确边界内生成代码。
- 更适合团队持续演进
  类型系统、lint 规则和统一脚本入口让新增能力更容易保持一致。
- 更适合产品化交付
  从开发体验到安全边界都优先考虑稳定性，而不是一次性 demo 速度。

## Project structure

```text
.
├─ electron/
│  ├─ main/
│  └─ preload/
├─ scripts/
├─ src/
│  ├─ components/ui/
│  ├─ composables/
│  ├─ lib/
│  └─ types/
└─ vite.config.ts
```

## Scripts

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## Notes

- `pnpm dev` 会同时启动 Vite renderer、main/preload watch，并自动拉起 Electron。
- `pnpm build` 会输出 `dist/renderer`、`dist/main`、`dist/preload`。
- 模板当前优先关注高质量开发与构建基线，没有额外接入 installer/packager，可按团队需求继续叠加 `electron-builder` 或 `electron-forge`。
