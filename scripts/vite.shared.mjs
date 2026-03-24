import { readFileSync } from 'node:fs'
import { builtinModules } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const packageJson = JSON.parse(readFileSync(path.resolve(rootDir, 'package.json'), 'utf8'))

function cleanVersion(version) {
  return version.replace(/^[^\d]*/, '')
}

function createBuildSignalPlugin(name, onBundleClose) {
  if (!onBundleClose) {
    return undefined
  }

  return {
    name: `build-signal:${name}`,
    closeBundle() {
      onBundleClose(name)
    },
  }
}

const externalModules = [
  'electron',
  ...builtinModules,
  ...builtinModules.map((moduleName) => `node:${moduleName}`),
]

export const paths = {
  rootDir,
  distDir: path.resolve(rootDir, 'dist'),
  srcDir: path.resolve(rootDir, 'src'),
  electronDir: path.resolve(rootDir, 'electron'),
  rendererOutDir: path.resolve(rootDir, 'dist/renderer'),
  mainOutDir: path.resolve(rootDir, 'dist/main'),
  preloadOutDir: path.resolve(rootDir, 'dist/preload'),
  mainEntry: path.resolve(rootDir, 'electron/main/index.ts'),
  preloadEntry: path.resolve(rootDir, 'electron/preload/index.ts'),
  mainOutFile: path.resolve(rootDir, 'dist/main/index.js'),
}

export const appMeta = {
  name: packageJson.name,
  version: packageJson.version,
  stack: {
    electron: cleanVersion(packageJson.devDependencies.electron),
    tailwind: cleanVersion(packageJson.devDependencies.tailwindcss),
    typescript: cleanVersion(packageJson.devDependencies.typescript),
    vite: cleanVersion(packageJson.devDependencies.vite),
    vue: cleanVersion(packageJson.dependencies.vue),
  },
}

function sharedConfig(mode) {
  return {
    root: rootDir,
    mode,
    clearScreen: false,
    resolve: {
      alias: {
        '@': paths.srcDir,
        '@electron': paths.electronDir,
      },
      tsconfigPaths: true,
    },
  }
}

export function createRendererConfig({ mode = 'development' } = {}) {
  return {
    ...sharedConfig(mode),
    publicDir: path.resolve(rootDir, 'public'),
    plugins: [vue(), tailwindcss()],
    define: {
      __APP_META__: JSON.stringify(appMeta),
    },
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
      forwardConsole: {
        unhandledErrors: true,
        logLevels: ['warn', 'error'],
      },
      warmup: {
        clientFiles: ['./src/main.ts', './src/App.vue', './src/components/ui/*.vue'],
      },
    },
    build: {
      outDir: paths.rendererOutDir,
      emptyOutDir: false,
      sourcemap: mode === 'development' ? 'inline' : true,
      target: 'chrome146',
    },
    optimizeDeps: {
      include: ['class-variance-authority', 'clsx', 'lucide-vue-next', 'tailwind-merge', 'vue'],
    },
  }
}

export function createMainConfig({ mode = 'production', watch = false, onBundleClose } = {}) {
  const plugin = createBuildSignalPlugin('main', onBundleClose)

  return {
    ...sharedConfig(mode),
    publicDir: false,
    plugins: plugin ? [plugin] : [],
    build: {
      outDir: paths.mainOutDir,
      emptyOutDir: false,
      minify: mode === 'production',
      sourcemap: mode === 'development' ? 'inline' : true,
      target: 'node24',
      watch: watch ? {} : undefined,
      lib: {
        entry: paths.mainEntry,
        formats: ['es'],
        fileName: () => 'index.js',
      },
      rollupOptions: {
        external: externalModules,
      },
    },
  }
}

export function createPreloadConfig({ mode = 'production', watch = false, onBundleClose } = {}) {
  const plugin = createBuildSignalPlugin('preload', onBundleClose)

  return {
    ...sharedConfig(mode),
    publicDir: false,
    plugins: plugin ? [plugin] : [],
    build: {
      outDir: paths.preloadOutDir,
      emptyOutDir: false,
      minify: mode === 'production',
      sourcemap: mode === 'development' ? 'inline' : true,
      target: 'chrome146',
      watch: watch ? {} : undefined,
      lib: {
        entry: paths.preloadEntry,
        formats: ['cjs'],
        fileName: () => 'index.cjs',
      },
      rollupOptions: {
        external: ['electron'],
      },
    },
  }
}
