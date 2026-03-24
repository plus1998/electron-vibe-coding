import { contextBridge, ipcRenderer } from 'electron'

import type { AppInfo, DesktopApi, PingPayload, WindowState } from '@/types/desktop'

const desktopApi: DesktopApi = {
  getAppInfo() {
    return ipcRenderer.invoke('app:info') as Promise<AppInfo>
  },
  getWindowState() {
    return ipcRenderer.invoke('window:state') as Promise<WindowState>
  },
  openExternal(url) {
    return ipcRenderer.invoke('shell:openExternal', url) as Promise<boolean>
  },
  ping() {
    return ipcRenderer.invoke('app:ping') as Promise<PingPayload>
  },
}

contextBridge.exposeInMainWorld('desktop', desktopApi)
