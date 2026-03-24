import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { app, BrowserWindow, ipcMain, shell } from 'electron'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const rendererHtml = path.resolve(currentDir, '../renderer/index.html')
const preloadFile = path.resolve(currentDir, '../preload/index.cjs')
const devServerUrl = process.env.VITE_DEV_SERVER_URL
const isMac = process.platform === 'darwin'
const allowedExternalProtocols = new Set(['https:', 'mailto:'])

function isAllowedExternalUrl(targetUrl: string) {
  try {
    const parsedUrl = new URL(targetUrl)

    return allowedExternalProtocols.has(parsedUrl.protocol)
  } catch {
    return false
  }
}

async function openAllowedExternalUrl(targetUrl: string) {
  if (!isAllowedExternalUrl(targetUrl)) {
    return false
  }

  await shell.openExternal(targetUrl)
  return true
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1480,
    height: 940,
    minWidth: 1180,
    minHeight: 760,
    backgroundColor: '#08101d',
    title: 'Electron Vibe Coding',
    autoHideMenuBar: true,
    show: false,
    titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
    titleBarOverlay: isMac
      ? undefined
      : {
          color: '#00000000',
          symbolColor: '#0f172a',
          height: 48,
        },
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: preloadFile,
    },
  })

  window.once('ready-to-show', () => {
    window.show()
  })

  window.webContents.once('did-finish-load', () => {
    if (devServerUrl) {
      window.webContents.openDevTools({ mode: 'detach' })
    }
  })

  window.webContents.on('did-fail-load', (_event, errorCode, errorDescription, validatedUrl) => {
    console.error('[main] renderer failed to load', {
      errorCode,
      errorDescription,
      validatedUrl,
    })
  })

  window.webContents.on('will-navigate', (event, targetUrl) => {
    const currentUrl = window.webContents.getURL()

    if (targetUrl === currentUrl) {
      return
    }

    event.preventDefault()
    void openAllowedExternalUrl(targetUrl)
  })

  window.webContents.setWindowOpenHandler(({ url }) => {
    void openAllowedExternalUrl(url)
    return { action: 'deny' }
  })

  if (devServerUrl) {
    void window.loadURL(devServerUrl)
  } else {
    void window.loadFile(rendererHtml)
  }

  return window
}

ipcMain.handle('app:info', () => ({
  appPath: app.getAppPath(),
  arch: process.arch,
  cpu: os.cpus()[0]?.model ?? 'Unknown CPU',
  memory: `${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB`,
  pid: process.pid,
  platform: process.platform,
  userData: app.getPath('userData'),
  versions: {
    chrome: process.versions.chrome,
    electron: process.versions.electron,
    node: process.versions.node,
  },
}))

ipcMain.handle('app:ping', () => ({
  message: 'pong',
  time: new Date().toISOString(),
}))

ipcMain.handle('shell:openExternal', async (_event, url: string) => {
  return openAllowedExternalUrl(url)
})

ipcMain.handle('window:state', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender)

  return {
    isFullScreen: window?.isFullScreen() ?? false,
    isMaximized: window?.isMaximized() ?? false,
  }
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
