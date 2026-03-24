import { defineConfig } from 'vite'
// @ts-expect-error shared config is authored as runtime ESM for Node scripts
import { createRendererConfig } from './scripts/vite.shared.mjs'

export default defineConfig(({ mode }) => createRendererConfig({ mode }))
