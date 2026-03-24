import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(currentDir, '..')
const pnpmCmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function getPlatformDistArgs() {
  switch (process.platform) {
    case 'darwin':
      return ['run', 'dist:mac']
    case 'win32':
      return ['run', 'dist:win']
    case 'linux':
      return ['run', 'dist:linux']
    default:
      throw new Error(`[dist] unsupported platform: ${process.platform}`)
  }
}

run(pnpmCmd, getPlatformDistArgs())
