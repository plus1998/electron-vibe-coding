import { computed, onMounted, ref } from 'vue'

import type { AppInfo, PingResult, WindowState } from '@/types/desktop'

const fallbackWindowState: WindowState = {
  isFullScreen: false,
  isMaximized: false,
}

function formatDesktopError(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown desktop runtime error'
}

export function useDesktopRuntime() {
  const appInfo = ref<AppInfo | null>(null)
  const ping = ref<PingResult | null>(null)
  const windowState = ref<WindowState>(fallbackWindowState)
  const runtimeError = ref<string | null>(null)
  const pingError = ref<string | null>(null)
  const isRefreshing = ref(false)
  const isPinging = ref(false)
  const isElectron = computed(() => Boolean(window.desktop))
  const bridgeLabel = computed(() => (isElectron.value ? 'Electron bridge ready' : 'Browser preview fallback'))

  async function refreshAppInfo() {
    if (!window.desktop) {
      appInfo.value = null
      windowState.value = fallbackWindowState
      runtimeError.value = null
      return
    }

    isRefreshing.value = true

    try {
      const [nextAppInfo, nextWindowState] = await Promise.all([
        window.desktop.getAppInfo(),
        window.desktop.getWindowState(),
      ])

      appInfo.value = nextAppInfo
      windowState.value = nextWindowState
      runtimeError.value = null
    } catch (error) {
      appInfo.value = null
      windowState.value = fallbackWindowState
      runtimeError.value = formatDesktopError(error)
    } finally {
      isRefreshing.value = false
    }
  }

  async function pingMain() {
    if (!window.desktop) {
      ping.value = {
        latency: 0,
        message: 'preview',
        time: new Date().toISOString(),
      }
      pingError.value = null
      return
    }

    isPinging.value = true

    try {
      const startedAt = performance.now()
      const payload = await window.desktop.ping()

      ping.value = {
        ...payload,
        latency: Math.round(performance.now() - startedAt),
      }
      pingError.value = null
    } catch (error) {
      ping.value = null
      pingError.value = formatDesktopError(error)
    } finally {
      isPinging.value = false
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
    isPinging,
    isRefreshing,
    isElectron,
    openExternal,
    ping,
    pingError,
    pingMain,
    refreshAppInfo,
    runtimeError,
    windowState,
  }
}
