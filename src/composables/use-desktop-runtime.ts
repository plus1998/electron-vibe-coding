import { computed, onMounted, ref } from 'vue'

import type { AppInfo, PingResult, WindowState } from '@/types/desktop'

const fallbackWindowState: WindowState = {
  isFullScreen: false,
  isMaximized: false,
}

export function useDesktopRuntime() {
  const appInfo = ref<AppInfo | null>(null)
  const ping = ref<PingResult | null>(null)
  const windowState = ref<WindowState>(fallbackWindowState)
  const isElectron = computed(() => Boolean(window.desktop))
  const bridgeLabel = computed(() => (isElectron.value ? 'Electron bridge ready' : 'Browser preview fallback'))

  async function refreshAppInfo() {
    if (!window.desktop) {
      appInfo.value = null
      windowState.value = fallbackWindowState
      return
    }

    appInfo.value = await window.desktop.getAppInfo()
    windowState.value = await window.desktop.getWindowState()
  }

  async function pingMain() {
    if (!window.desktop) {
      ping.value = {
        latency: 0,
        message: 'preview',
        time: new Date().toISOString(),
      }
      return
    }

    const startedAt = performance.now()
    const payload = await window.desktop.ping()

    ping.value = {
      ...payload,
      latency: Math.round(performance.now() - startedAt),
    }
  }

  async function openExternal(url: string) {
    if (!window.desktop) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }

    await window.desktop.openExternal(url)
  }

  onMounted(() => {
    void refreshAppInfo()
    void pingMain()
  })

  return {
    appInfo,
    bridgeLabel,
    isElectron,
    openExternal,
    ping,
    pingMain,
    refreshAppInfo,
    windowState,
  }
}
