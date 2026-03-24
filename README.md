# Electron Vibe Coding

一个面向商业级桌面应用的现代工程模板，基于 `Vue 3 + TypeScript + Tailwind CSS v4 + shadcn-vue + Vite 8 + ESLint + Electron 41` 构建。

它的核心定位不是“再做一个脚手架”，而是提供一套更适合 AI 编程时代的工程底座:

- 强规范
  以清晰的进程边界、统一的构建入口、严格的类型与 lint 约束，降低 AI 生成代码的漂移与失控风险。
- 高效稳定
  以 Vite 8 为核心组织 renderer、main、preload 的开发与构建流程，缩短反馈回路，同时保持实现路径足够清晰。
- 高可用
  默认保留 Electron 的安全边界与桌面应用职责划分，更适合长期维护、多人协作与产品化交付。

更重要的是，这套模板把 AI 编程从“提示词驱动”升级为“工程系统驱动”:

- skills 资产化
  集成大量优秀且规范的 skills，把常见工程经验沉淀为可复用能力，而不是每次从零约束 AI。
- 交付一致性
  让 AI 在统一的分层、命名、类型和脚本边界中工作，减少代码风格漂移与架构失焦。
- 组织级复用
  更适合团队把高质量实现方式沉淀为长期资产，形成可复制的 AI 研发生产线。

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
  类型系统、lint 规则、统一脚本入口和 skills 体系让新增能力更容易保持一致。
- 更适合产品化交付
  从开发体验到安全边界都优先考虑稳定性，而不是一次性 demo 速度。

## Icon workflow

- 最简单的替换方式是在项目根目录放一个 `logo.png`。
- 打包前执行 `pnpm run assets:icons` 时，脚本会优先读取根目录的 `logo.png`，自动生成 `build/icon.png`、`build/icon.ico`、`build/icon.icns`。
- 如果根目录没有 `logo.png`，会继续按顺序回退到 `logo.svg`、`public/logo.png`、`public/logo.svg`、`public/favicon.svg`。
- 建议使用带透明背景的正方形 PNG，至少 `1024x1024`，这样 Windows、macOS、Linux 的图标一致性最好。
- 图标转换依赖本机 `ImageMagick (magick)`；macOS 额外使用系统自带的 `sips` 和 `iconutil` 生成 `icns`。

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
pnpm run clean:release
pnpm dist
pnpm run dist:all
pnpm run package:dir
pnpm dist:mac
pnpm dist:win
pnpm dist:linux
pnpm start
```

## Notes

- `pnpm dev` 会同时启动 Vite renderer、main/preload watch，并自动拉起 Electron。
- `pnpm build` 会输出 `dist/renderer`、`dist/main`、`dist/preload`。
- `pnpm run clean:release` 会清理旧的安装包与 unpacked 目录，避免历史产物干扰验证。
- `pnpm dist` 会按当前宿主平台选择对应打包目标：macOS 对应 `pnpm dist:mac`，Windows 对应 `pnpm dist:win`，Linux 对应 `pnpm dist:linux`。
- `pnpm run dist:all` 会依次尝试生成 `dmg`、`exe (nsis)`、`deb` 三类安装包。
- `pnpm run package:dir` 会生成未封装目录，适合快速验证打包后的应用结构。
- `pnpm dist:mac` 目标为 `dmg`，`pnpm dist:win` 目标为 `exe (nsis, x64)`，`pnpm dist:linux` 目标为 `deb (x64)`。
- 图标资源会在打包前由 `pnpm run assets:icons` 自动生成到 `build/`，默认优先读取项目根目录的 `logo.png`。
- 模板默认关闭 macOS 自动签名，避免本机证书环境影响通用打包；需要签名时可再按项目证书策略开启。
- 当前仓库已经接入 `electron-builder`。不同平台的真实产物仍受宿主机与交叉构建工具链限制：
  - `dmg` 最适合在 macOS 上构建
  - `exe` 通常需要 Windows，或可用的跨平台工具链
  - `deb` 最适合在 Linux 上构建，某些场景也可通过额外交叉工具链完成
