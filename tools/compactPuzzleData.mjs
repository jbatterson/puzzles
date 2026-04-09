/**
 * Rewrites selected puzzlegames (folds, sumtiles, productiles, factorfall, honeycombs).
 * Folds: each puzzle is start / target / folds on separate lines, blank line between puzzles.
 * Other games: one puzzle object per line.
 * Run from repo root: node --import ./tools/registerSharedContractsResolve.mjs tools/compactPuzzleData.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const repoRoot = path.resolve(import.meta.dirname, '..')

const TIER_ORDER = ['tutorial', 'easy', 'medium', 'hard']

const FACTORFALL_HEADER = `// ── Factorfall puzzle data ────────────────────────────────────────────────────
// Colors
const R = '#744b77'
const B = '#faa80a'

`

const HONEYCOMBS_HEADER = `// Honeycombs puzzle definitions — batched like other suite games (easy / medium / hard).
// Format per puzzle: { size: 'small'|'medium'|'large', clues: [[row, col, value], ...] }

import { getDailyKey, getDayIndex } from '@shared-contracts/dailyPuzzleDate.js'

`

/**
 * @param {string} key
 */
function jsKey(key) {
  if (/^[a-zA-Z_$][\w$]*$/.test(key)) return key
  return `'${key.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

/**
 * @param {unknown} value
 * @param {{ factorfallColors?: boolean }} ctx
 */
function toJs(value, ctx = {}) {
  if (value === null) return 'null'
  const t = typeof value
  if (t === 'number' || t === 'boolean') return String(value)
  if (t === 'string') {
    if (ctx.factorfallColors) {
      if (value === '#744b77') return 'R'
      if (value === '#faa80a') return 'B'
    }
    return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  }
  if (Array.isArray(value)) {
    const inner = value.map((v) => toJs(v, ctx)).join(', ')
    return `[${inner}]`
  }
  if (t === 'object') {
    const o = /** @type {Record<string, unknown>} */ (value)
    const parts = Object.keys(o).map((k) => `${jsKey(k)}: ${toJs(o[k], ctx)}`)
    return `{ ${parts.join(', ')} }`
  }
  return 'undefined'
}

/**
 * @param {Record<string, unknown[]>} data
 * @param {{ factorfallColors?: boolean }} ctx
 */
function formatExportBody(data, ctx) {
  const tiers = TIER_ORDER.filter((t) => Object.prototype.hasOwnProperty.call(data, t))
  const blocks = tiers.map((tier) => {
    const list = data[tier]
    if (!Array.isArray(list)) throw new Error(`Tier "${tier}" is not an array`)
    const lines = list.map((p) => `    ${toJs(p, ctx)},`)
    return `  ${tier}: [\n${lines.join('\n')}\n  ],`
  })
  return `export default {\n${blocks.join('\n\n')}\n}\n`
}

/**
 * Folds: three property lines per puzzle (start, target, folds) plus braces; blank line between puzzles.
 * @param {Record<string, unknown[]>} data
 */
function formatFoldsExportBody(data) {
  const tiers = TIER_ORDER.filter((t) => Object.prototype.hasOwnProperty.call(data, t))
  const blocks = tiers.map((tier) => {
    const list = data[tier]
    if (!Array.isArray(list)) throw new Error(`Folds tier "${tier}" is not an array`)
    const puzzleBlocks = list.map((p, i) => {
      if (!p || typeof p !== 'object') throw new Error(`Folds ${tier}[${i}] must be an object`)
      const po = /** @type {Record<string, unknown>} */ (p)
      for (const k of ['start', 'target', 'folds']) {
        if (!(k in po)) throw new Error(`Folds ${tier}[${i}] missing "${k}"`)
      }
      return `    {\n      start: ${toJs(po.start, {})},\n      target: ${toJs(po.target, {})},\n      folds: ${toJs(po.folds, {})},\n    },`
    })
    return `  ${tier}: [\n${puzzleBlocks.join('\n\n')}\n  ],`
  })
  return `export default {\n${blocks.join('\n\n')}\n}\n`
}

/**
 * @param {Record<string, unknown[]>} puzzleData
 * @param {string} tailFromGetHoneycombs
 */
function formatHoneycombsFile(puzzleData, tailFromGetHoneycombs) {
  const tiers = TIER_ORDER.filter((t) => Object.prototype.hasOwnProperty.call(puzzleData, t))
  const blocks = tiers.map((tier) => {
    const list = puzzleData[tier]
    if (!Array.isArray(list)) throw new Error(`Tier "${tier}" is not an array`)
    const lines = list.map((p) => `    ${toJs(p, {})},`)
    return `  ${tier}: [\n${lines.join('\n')}\n  ],`
  })
  const body = `const puzzleData = {\n${blocks.join('\n\n')}\n}\n\nexport default puzzleData\n\n`
  return HONEYCOMBS_HEADER + body + tailFromGetHoneycombs
}

let cacheNonce = 0

async function loadDefault(rel) {
  const abs = path.join(repoRoot, rel)
  const url = pathToFileURL(abs).href + `?c=${++cacheNonce}`
  const mod = await import(url)
  return mod.default
}

async function main() {
  const foldsPath = path.join(repoRoot, 'puzzlegames/folds/puzzles.js')
  const foldsData = await loadDefault('puzzlegames/folds/puzzles.js')
  fs.writeFileSync(
    foldsPath,
    formatFoldsExportBody(/** @type {Record<string, unknown[]>} */ (foldsData)),
    'utf8'
  )
  console.log('Wrote', path.relative(repoRoot, foldsPath))

  for (const rel of ['puzzlegames/sumtiles/puzzles.js', 'puzzlegames/productiles/puzzles.js']) {
    const data = await loadDefault(rel)
    const abs = path.join(repoRoot, rel)
    fs.writeFileSync(
      abs,
      formatExportBody(/** @type {Record<string, unknown[]>} */ (data), {}),
      'utf8'
    )
    console.log('Wrote', rel)
  }

  const factorfallPath = path.join(repoRoot, 'puzzlegames/factorfall/puzzles.js')
  const factorfallData = await loadDefault('puzzlegames/factorfall/puzzles.js')
  fs.writeFileSync(
    factorfallPath,
    FACTORFALL_HEADER +
      formatExportBody(/** @type {Record<string, unknown[]>} */ (factorfallData), {
        factorfallColors: true,
      }),
    'utf8'
  )
  console.log('Wrote puzzlegames/factorfall/puzzles.js')

  const honeyPath = path.join(repoRoot, 'puzzlegames/honeycombs/puzzles.js')
  const honeyText = fs.readFileSync(honeyPath, 'utf8')
  const tailMatch = honeyText.match(/\nexport function getHoneycombsDailyDateKey\(\)[\s\S]*$/m)
  if (!tailMatch) throw new Error('Could not find Honeycombs tail exports')
  const tail = tailMatch[0].replace(/^\n/, '')
  const honeyMod = await import(pathToFileURL(honeyPath).href + `?c=${++cacheNonce}`)
  const puzzleData = honeyMod.default
  if (!puzzleData || typeof puzzleData !== 'object')
    throw new Error('Honeycombs default export missing')
  fs.writeFileSync(
    honeyPath,
    formatHoneycombsFile(/** @type {Record<string, unknown[]>} */ (puzzleData), tail),
    'utf8'
  )
  console.log('Wrote puzzlegames/honeycombs/puzzles.js')

  console.log('Done. Run: npm run check:puzzle-schemas')
}

await main()
