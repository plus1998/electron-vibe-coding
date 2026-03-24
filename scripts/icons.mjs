import { spawnSync } from 'node:child_process'
import { access, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(currentDir, '..')
const buildDir = path.resolve(rootDir, 'build')
const iconsetDir = path.resolve(buildDir, 'icons.iconset')
const pngIcon = path.resolve(buildDir, 'icon.png')
const icoIcon = path.resolve(buildDir, 'icon.ico')
const icnsIcon = path.resolve(buildDir, 'icon.icns')

const iconCandidates = [
  path.resolve(rootDir, 'logo.png'),
  path.resolve(rootDir, 'logo.svg'),
  path.resolve(rootDir, 'public/logo.png'),
  path.resolve(rootDir, 'public/logo.svg'),
  path.resolve(rootDir, 'public/favicon.svg'),
]

async function pathExists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

async function resolveSourceIcon() {
  for (const candidate of iconCandidates) {
    if (await pathExists(candidate)) {
      return candidate
    }
  }

  throw new Error(
    '[icons] missing source icon. Add logo.png to the project root, or provide public/logo.png / public/logo.svg / public/favicon.svg.',
  )
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function magick(args) {
  run('magick', args)
}

const sourceIcon = await resolveSourceIcon()

await mkdir(buildDir, { recursive: true })
await rm(iconsetDir, { recursive: true, force: true })
await mkdir(iconsetDir, { recursive: true })

magick([
  sourceIcon,
  '-background',
  'none',
  '-resize',
  '1024x1024',
  '-gravity',
  'center',
  '-extent',
  '1024x1024',
  pngIcon,
])

magick([pngIcon, '-define', 'icon:auto-resize=256,128,64,48,32,16', icoIcon])

if (process.platform === 'darwin') {
  const iconSizes = [
    ['16', 'icon_16x16.png'],
    ['32', 'icon_16x16@2x.png'],
    ['32', 'icon_32x32.png'],
    ['64', 'icon_32x32@2x.png'],
    ['128', 'icon_128x128.png'],
    ['256', 'icon_128x128@2x.png'],
    ['256', 'icon_256x256.png'],
    ['512', 'icon_256x256@2x.png'],
    ['512', 'icon_512x512.png'],
    ['1024', 'icon_512x512@2x.png'],
  ]

  for (const [size, filename] of iconSizes) {
    run('sips', ['-z', size, size, pngIcon, '--out', path.resolve(iconsetDir, filename)])
  }

  run('iconutil', ['-c', 'icns', iconsetDir, '-o', icnsIcon])
}

console.log(
  `[icons] source=${path.relative(rootDir, sourceIcon)} output=${path.relative(rootDir, pngIcon)}, ${path.relative(rootDir, icoIcon)}${process.platform === 'darwin' ? `, ${path.relative(rootDir, icnsIcon)}` : ''}`,
)
