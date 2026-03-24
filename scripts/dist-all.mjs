import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(currentDir, '..')

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

run('pnpm', ['run', 'clean:release'])
run('pnpm', ['run', 'build'])
run('pnpm', ['run', 'assets:icons'])
run('pnpm', ['exec', 'electron-builder', '--mac', 'dmg', '--publish', 'never'])
run('pnpm', ['exec', 'electron-builder', '--linux', 'deb', '--x64', '--publish', 'never'])
run('pnpm', ['exec', 'electron-builder', '--win', 'nsis', '--x64', '--publish', 'never'])
