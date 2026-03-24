import { rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(currentDir, '..')
const releaseDir = path.resolve(rootDir, 'release')

await rm(releaseDir, { recursive: true, force: true })

console.log(`[clean] removed ${path.relative(rootDir, releaseDir)}`)
