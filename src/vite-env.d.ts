/// <reference types="vite/client" />

import type { AppMeta, DesktopApi } from '@/types/desktop'

declare global {
  const __APP_META__: AppMeta

  interface Window {
    desktop?: DesktopApi
  }
}

export {}
