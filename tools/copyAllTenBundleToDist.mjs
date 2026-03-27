import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..')
const builtBundle = path.join(repoRoot, 'puzzlegames', 'allten', 'bundle_allten.js')
const builtBundleMap = path.join(repoRoot, 'puzzlegames', 'allten', 'bundle_allten.js.map')

const distDir = path.join(repoRoot, 'dist', 'puzzlegames', 'allten')
const distBundle = path.join(distDir, 'bundle_allten.js')
const distBundleMap = path.join(distDir, 'bundle_allten.js.map')

function copyIfExists(from, to) {
  if (!fs.existsSync(from)) return false
  fs.copyFileSync(from, to)
  return true
}

if (!fs.existsSync(distDir)) {
  console.error(`Missing dist folder at ${distDir}. Run "npm run build" first.`)
  process.exit(1)
}
if (!copyIfExists(builtBundle, distBundle)) {
  console.error(
    [
      'Missing copied All Ten bundle in source tree.',
      'Run:',
      '  node tools/copyAllTenBundle.mjs',
      '',
      `Expected to find: ${builtBundle}`,
    ].join('\n'),
  )
  process.exit(1)
}
copyIfExists(builtBundleMap, distBundleMap)
console.log(`Copied All Ten bundle into ${path.relative(repoRoot, distBundle)}`)

