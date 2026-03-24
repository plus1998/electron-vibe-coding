import { spawnSync } from 'node:child_process'
import { rm } from 'node:fs/promises'

import { build } from 'vite'

import { createMainConfig, createPreloadConfig, paths } from './vite.shared.mjs'

await rm(paths.distDir, { recursive: true, force: true })

const pnpmCmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const rendererBuild = spawnSync(
  pnpmCmd,
  ['exec', 'vite', 'build', '--configLoader', 'runner', '--mode', 'production'],
  {
    cwd: paths.rootDir,
    stdio: 'inherit',
  },
)

if (rendererBuild.status !== 0) {
  process.exit(rendererBuild.status ?? 1)
}

await build(createPreloadConfig({ mode: 'production' }))
await build(createMainConfig({ mode: 'production' }))

console.log(`[build] output written to ${paths.distDir}`)
