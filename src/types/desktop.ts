export interface AppMeta {
  name: string
  version: string
  stack: {
    electron: string
    tailwind: string
    typescript: string
    vite: string
    vue: string
  }
}

export interface AppInfo {
  appPath: string
  arch: string
  cpu: string
  memory: string
  pid: number
  platform: string
  userData: string
  versions: {
    chrome: string
    electron: string
    node: string
  }
}

export interface WindowState {
  isFullScreen: boolean
  isMaximized: boolean
}

export interface PingPayload {
  message: string
  time: string
}

export interface PingResult extends PingPayload {
  latency: number
}

export interface DesktopApi {
  getAppInfo(): Promise<AppInfo>
  getWindowState(): Promise<WindowState>
  openExternal(url: string): Promise<boolean>
  ping(): Promise<PingPayload>
}
