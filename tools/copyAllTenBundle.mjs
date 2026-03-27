import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..')
const src = path.join(repoRoot, 'all-ten-main', 'public', 'dist', 'bundle_allten.js')
const srcMap = path.join(repoRoot, 'all-ten-main', 'public', 'dist', 'bundle_allten.js.map')
const destDir = path.join(repoRoot, 'puzzlegames', 'allten')
const dest = path.join(destDir, 'bundle_allten.js')
const destMap = path.join(destDir, 'bundle_allten.js.map')

function copyIfExists(from, to) {
  if (!fs.existsSync(from)) return false
  fs.copyFileSync(from, to)
  return true
}

fs.mkdirSync(destDir, { recursive: true })

if (!copyIfExists(src, dest)) {
  console.error(
    [
      'Missing All Ten bundle.',
      'Build it first:',
      '  cd all-ten-main',
      '  npm run build',
      '',
      `Expected to find: ${src}`,
    ].join('\n'),
  )
  process.exit(1)
}

copyIfExists(srcMap, destMap)
console.log(`Copied All Ten bundle to ${path.relative(repoRoot, dest)}`)
