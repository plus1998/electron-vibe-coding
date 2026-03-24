import { spawn } from 'node:child_process'
import { rm } from 'node:fs/promises'
import { setTimeout as delay } from 'node:timers/promises'

import electronPath from 'electron'
import { build } from 'vite'

import { createMainConfig, createPreloadConfig, paths } from './vite.shared.mjs'

const pnpmCmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const rendererUrl = 'http://127.0.0.1:5173/'

let electronProcess = null
let rendererProcess = null
let pendingRestart = false
let restarting = false
let shuttingDown = false
let restartTimer = null
let rendererReady = false
let mainWatcher
let preloadWatcher

const readyTargets = new Set()

function launchElectron() {
  if (!rendererReady || readyTargets.size < 2) {
    return
  }

  if (electronProcess) {
    pendingRestart = true
    restarting = true
    electronProcess.kill('SIGTERM')
    return
  }

  electronProcess = spawn(electronPath, [paths.mainOutFile], {
    stdio: 'inherit',
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: rendererUrl,
    },
  })

  electronProcess.once('exit', (code) => {
    electronProcess = null

    if (shuttingDown) {
      return
    }

    if (pendingRestart) {
      pendingRestart = false
      restarting = false
      launchElectron()
      return
    }

    if (restarting) {
      restarting = false
      return
    }

    void shutdown(code ?? 0)
  })
}

function scheduleRestart(name) {
  readyTargets.add(name)

  if (!rendererReady || readyTargets.size < 2) {
    return
  }

  if (restartTimer) {
    clearTimeout(restartTimer)
  }

  restartTimer = setTimeout(() => {
    launchElectron()
  }, 120)
}

async function waitForRenderer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(rendererUrl)

      if (response.ok) {
        rendererReady = true
        launchElectron()
        return
      }
    } catch {
      // Renderer may not be ready yet.
    }

    await delay(250)
  }

  throw new Error(`Renderer dev server did not become ready at ${rendererUrl}`)
}

async function shutdown(code = 0) {
  if (shuttingDown) {
    return
  }

  shuttingDown = true

  if (restartTimer) {
    clearTimeout(restartTimer)
  }

  if (electronProcess) {
    electronProcess.kill('SIGTERM')
  }

  if (rendererProcess) {
    rendererProcess.kill('SIGTERM')
  }

  await Promise.allSettled([mainWatcher?.close?.(), preloadWatcher?.close?.()])

  process.exit(code)
}

process.on('SIGINT', () => {
  void shutdown(0)
})

process.on('SIGTERM', () => {
  void shutdown(0)
})

await rm(paths.distDir, { recursive: true, force: true })

rendererProcess = spawn(
  pnpmCmd,
  ['exec', 'vite', '--configLoader', 'runner', '--mode', 'development', '--host', '127.0.0.1', '--port', '5173', '--strictPort'],
  {
    cwd: paths.rootDir,
    stdio: 'inherit',
    env: process.env,
  },
)

rendererProcess.once('exit', (code) => {
  rendererProcess = null

  if (!shuttingDown) {
    void shutdown(code ?? 1)
  }
})

mainWatcher = await build(
  createMainConfig({
    mode: 'development',
    watch: true,
    onBundleClose(name) {
      scheduleRestart(name)
    },
  }),
)

preloadWatcher = await build(
  createPreloadConfig({
    mode: 'development',
    watch: true,
    onBundleClose(name) {
      scheduleRestart(name)
    },
  }),
)

await waitForRenderer()

console.log(`[dev] renderer ready on ${rendererUrl}`)
