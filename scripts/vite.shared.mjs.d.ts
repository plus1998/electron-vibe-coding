import type { UserConfig } from 'vite'

export declare const paths: {
  rootDir: string
  distDir: string
  srcDir: string
  electronDir: string
  rendererOutDir: string
  mainOutDir: string
  preloadOutDir: string
  mainEntry: string
  preloadEntry: string
  mainOutFile: string
}

export declare const appMeta: {
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

export declare function createRendererConfig(options?: { mode?: string }): UserConfig
export declare function createMainConfig(options?: {
  mode?: string
  watch?: boolean
  onBundleClose?: (name: string) => void
}): UserConfig
export declare function createPreloadConfig(options?: {
  mode?: string
  watch?: boolean
  onBundleClose?: (name: string) => void
}): UserConfig
