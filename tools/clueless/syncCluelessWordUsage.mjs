/**
 * 1) Writes tools/clueless/reports/clueless-all-puzzle-words.csv — every distinct word
 *    from puzzlegames/clueless/puzzles.js (easy/medium/hard), with usage counts.
 * 2) Refreshes tools/clueless/reports/wordle-answers-zipf-curated.csv in_clueless_puzzles
 *    column (Y/N) from that set.
 *
 * Run from repo root: node tools/clueless/syncCluelessWordUsage.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puzzleData from '../../puzzlegames/clueless/puzzles.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPORTS = path.join(__dirname, 'reports')
const WORDS_OUT = path.join(REPORTS, 'clueless-all-puzzle-words.csv')
const CURATED = path.join(REPORTS, 'wordle-answers-zipf-curated.csv')

const KEYS = ['h1', 'h2', 'h3', 'v1', 'v2', 'v3']
const TIERS = ['easy', 'medium', 'hard']

function collectWordStats() {
  /** @type {Map<string, { slotCount: number, puzzleIds: Set<string> }>} */
  const byWord = new Map()

  for (const tier of TIERS) {
    const list = puzzleData[tier] || []
    list.forEach((puzzle, indexInTier) => {
      const puzzleId = `${tier}:${indexInTier}`
      for (const k of KEYS) {
        const w = puzzle[k]
        if (typeof w !== 'string' || w.length !== 5) {
          console.warn(`Skip invalid ${tier}[${indexInTier}].${k}:`, w)
          continue
        }
        const word = w.toLowerCase()
        let rec = byWord.get(word)
        if (!rec) {
          rec = { slotCount: 0, puzzleIds: new Set() }
          byWord.set(word, rec)
        }
        rec.slotCount += 1
        rec.puzzleIds.add(puzzleId)
      }
    })
  }

  return byWord
}

function csvCell(s) {
  if (/[",\n\r]/.test(s)) return `"${String(s).replace(/"/g, '""')}"`
  return s
}

function writeWordsCsv(byWord) {
  const rows = [['word', 'slot_occurrences', 'puzzle_count'].join(',')]
  const sorted = [...byWord.keys()].sort()
  for (const word of sorted) {
    const { slotCount, puzzleIds } = byWord.get(word)
    rows.push([csvCell(word), String(slotCount), String(puzzleIds.size)].join(','))
  }
  fs.mkdirSync(REPORTS, { recursive: true })
  fs.writeFileSync(WORDS_OUT, rows.join('\n') + '\n', 'utf8')
  console.log(`Wrote ${sorted.length} words → ${path.relative(process.cwd(), WORDS_OUT)}`)
}

function updateCuratedYn(inCluelessSet) {
  const raw = fs.readFileSync(CURATED, 'utf8')
  const lines = raw.split(/\r?\n/)
  const out = []
  let dataRows = 0
  let yCount = 0
  let nCount = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === '') {
      out.push(line)
      continue
    }
    if (i === 0) {
      // Preserve header; normalize to known columns + trailing comma if file used it
      if (/^word,zipf_frequency,in_clueless_puzzles/.test(line)) {
        out.push('word,zipf_frequency,in_clueless_puzzles,')
      } else {
        out.push(line)
      }
      continue
    }

    // word, zipf, Y/N, optional 4th column (e.g. trailing comma or ",*")
    const m = line.match(/^([^,]+),([^,]+),(Y|N)(,.*)?$/)
    if (!m) {
      console.warn('Unparsed line, copied as-is:', line.slice(0, 80))
      out.push(line)
      continue
    }
    const word = m[1].trim().toLowerCase()
    const zipf = m[2]
    const tail = m[4] ?? ','
    const yn = inCluelessSet.has(word) ? 'Y' : 'N'
    if (yn === 'Y') yCount++
    else nCount++
    dataRows++
    out.push(`${csvCell(word)},${zipf},${yn}${tail}`)
  }

  fs.writeFileSync(CURATED, out.join('\n'), 'utf8')
  console.log(
    `Updated ${path.relative(process.cwd(), CURATED)} (${dataRows} rows: ${yCount} Y, ${nCount} N)`
  )
}

const byWord = collectWordStats()
const inCluelessSet = new Set(byWord.keys())

writeWordsCsv(byWord)
updateCuratedYn(inCluelessSet)
