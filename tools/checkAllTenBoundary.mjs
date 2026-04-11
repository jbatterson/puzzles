import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..')

const checks = [
  {
    name: 'allten runtime must not import suite source',
    baseDir: path.join(repoRoot, 'src', 'allten', 'runtime', 'src'),
    forbidden: [
      // Absolute-style alias or path containing src/shared/
      /from\s+["'][^"']*src\/shared\/[^"']*["']/g,
      // Relative path going up to src/ (e.g. ../../../src/…)
      /from\s+["'][^"']*\.\.\/\.\.\/\.\.\/src\/[^"']*["']/g,
      // Relative path going up N levels then into shared/ (e.g. ../../../../shared/)
      // This was the previously undetected pattern used by Links, Results, Instructions.
      /from\s+["'](?:\.\.\/)+shared\/[^"']*["']/g,
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
    const lines = fs.readFileSync(filePath, 'utf8').split('\n')
    let reported = false
    for (const line of lines) {
      // A line annotated with // boundary-ok has been explicitly reviewed and
      // approved as a deliberate exception. Every other cross-import is a violation.
      if (line.includes('// boundary-ok')) continue
      for (const pattern of check.forbidden) {
        pattern.lastIndex = 0
        if (pattern.test(line)) {
          if (!reported) {
            violations.push(`${check.name}: ${rel}`)
            reported = true
          }
          break
        }
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
