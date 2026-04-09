import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..')

const checks = [
  {
    name: 'allten runtime must not import suite source',
    baseDir: path.join(repoRoot, 'src', 'allten', 'runtime', 'src'),
    forbidden: [
      /from\s+["'][^"']*src\/shared\/[^"']*["']/g,
      /from\s+["'][^"']*\.\.\/\.\.\/\.\.\/src\/[^"']*["']/g,
    ],
  },
  {
    name: 'suite src must not import allten runtime internals',
    baseDir: path.join(repoRoot, 'src'),
    forbidden: [
      /from\s+["'][^"']*src\/allten\/runtime\/src\/[^"']*["']/g,
      /from\s+["'][^"']*\.\.\/[^"']*allten\/runtime\/src\/[^"']*["']/g,
    ],
  },
  {
    name: 'puzzlegames must not import allten runtime internals',
    baseDir: path.join(repoRoot, 'puzzlegames'),
    forbidden: [
      /from\s+["'][^"']*src\/allten\/runtime\/src\/[^"']*["']/g,
      /from\s+["'][^"']*\.\.\/[^"']*allten\/runtime\/src\/[^"']*["']/g,
    ],
  },
]

const codeExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'])

function collectFiles(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist') {
      continue
    }
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...collectFiles(fullPath))
    } else if (entry.isFile() && codeExtensions.has(path.extname(entry.name))) {
      out.push(fullPath)
    }
  }
  return out
}

const violations = []

for (const check of checks) {
  if (!fs.existsSync(check.baseDir)) {
    continue
  }
  for (const filePath of collectFiles(check.baseDir)) {
    const rel = path.relative(repoRoot, filePath).replaceAll('\\', '/')
    const content = fs.readFileSync(filePath, 'utf8')
    for (const pattern of check.forbidden) {
      pattern.lastIndex = 0
      if (pattern.test(content)) {
        violations.push(`${check.name}: ${rel}`)
        break
      }
    }
  }
}

if (violations.length) {
  console.error('All Ten boundary check failed. Forbidden cross-runtime imports found:')
  for (const violation of violations) {
    console.error(`- ${violation}`)
  }
  process.exit(1)
}

console.log('All Ten boundary check passed.')
