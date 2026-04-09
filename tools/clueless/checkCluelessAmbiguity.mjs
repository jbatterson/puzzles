/**
 * Scan Clueless puzzles for crossing-letter ambiguities against the vocabulary
 * of all words ever used in puzzles.js.
 */
import fs from 'node:fs'
import path from 'node:path'
import puzzleData from '../../puzzlegames/clueless/puzzles.js'

const puzzles = [...puzzleData.easy, ...puzzleData.medium, ...puzzleData.hard]

const repoRoot = path.resolve(import.meta.dirname, '../..')

const CROSSINGS = [
  [0, 0],
  [0, 2],
  [0, 4],
  [2, 0],
  [2, 2],
  [2, 4],
  [4, 0],
  [4, 2],
  [4, 4],
]

/** @param {typeof puzzles} list */
export function buildVocabulary(list) {
  const s = new Set()
  for (const p of list) {
    for (const k of ['h1', 'h2', 'h3', 'v1', 'v2', 'v3']) {
      s.add(p[k].toLowerCase())
    }
  }
  return s
}

/**
 * @param {typeof puzzles[0]} p
 * @param {Set<string>} vocab
 * @returns {Array<{ r: number, c: number, from: string, to: string, hPrime: string, vPrime: string, strict: boolean }>}
 */
export function findAmbiguitiesForPuzzle(p, vocab) {
  const hWords = [p.h1, p.h2, p.h3].map((w) => w.toLowerCase())
  const vWords = [p.v1, p.v2, p.v3].map((w) => w.toLowerCase())
  const out = []

  for (const [r, c] of CROSSINGS) {
    const hIdx = r / 2
    const vIdx = c / 2
    const hWord = hWords[hIdx]
    const vWord = vWords[vIdx]
    const from = hWord[c]
    if (from !== vWord[r]) {
      continue
    }

    for (let code = 'a'.charCodeAt(0); code <= 'z'.charCodeAt(0); code++) {
      const to = String.fromCharCode(code)
      if (to === from) continue

      const hPrime = hWord.slice(0, c) + to + hWord.slice(c + 1)
      const vPrime = vWord.slice(0, r) + to + vWord.slice(r + 1)
      if (!vocab.has(hPrime) || !vocab.has(vPrime)) continue

      const six = [p.h1, p.h2, p.h3, p.v1, p.v2, p.v3].map((w) => w.toLowerCase())
      six[hIdx] = hPrime
      six[3 + vIdx] = vPrime
      const strict = new Set(six).size === 6

      out.push({ r, c, from, to, hPrime, vPrime, strict })
    }
  }
  return out
}

function parseArgs(argv) {
  let noWrite = false
  let outDir = path.join(repoRoot, 'tools', 'reports')
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--no-write') noWrite = true
    else if (argv[i] === '--out-dir' && argv[i + 1]) {
      outDir = path.resolve(argv[++i])
    }
  }
  return { noWrite, outDir }
}

function main() {
  const { noWrite, outDir } = parseArgs(process.argv.slice(2))
  const vocab = buildVocabulary(puzzles)

  /** @type {Array<{ puzzleIndex: number, r: number, c: number, from: string, to: string, hPrime: string, vPrime: string, lexical: boolean, strict: boolean }>} */
  const jsonRows = []
  const puzzlesWithLexical = new Set()
  const puzzlesWithStrict = new Set()
  let lexicalCount = 0
  let strictCount = 0

  for (let i = 0; i < puzzles.length; i++) {
    const hits = findAmbiguitiesForPuzzle(puzzles[i], vocab)
    for (const h of hits) {
      lexicalCount++
      if (h.strict) strictCount++
      if (h.strict) puzzlesWithStrict.add(i)
      puzzlesWithLexical.add(i)
      jsonRows.push({
        puzzleIndex: i,
        r: h.r,
        c: h.c,
        from: h.from,
        to: h.to,
        hPrime: h.hPrime,
        vPrime: h.vPrime,
        lexical: true,
        strict: h.strict,
      })
    }
  }

  const summaryLines = [
    `Puzzles in file: ${puzzles.length}`,
    `Vocabulary size (unique words): ${vocab.size}`,
    `Lexical ambiguity instances (letter alternatives in vocab): ${lexicalCount}`,
    `Strict instances (six words all distinct after swap): ${strictCount}`,
    `Puzzles with ≥1 lexical hit: ${puzzlesWithLexical.size} — indices: ${[...puzzlesWithLexical].sort((a, b) => a - b).join(', ') || '(none)'}`,
    `Puzzles with ≥1 strict hit: ${puzzlesWithStrict.size} — indices: ${[...puzzlesWithStrict].sort((a, b) => a - b).join(', ') || '(none)'}`,
    '',
  ]

  const tableHeader = "| puzzle | (r,c) | from→to | h' | v' | strict |"
  const tableSep = '| --- | --- | --- | --- | --- | --- |'
  const tableRows = jsonRows.map(
    (row) =>
      `| ${row.puzzleIndex} | (${row.r},${row.c}) | ${row.from}→${row.to} | ${row.hPrime} | ${row.vPrime} | ${row.strict ? 'yes' : 'no'} |`
  )

  const md = [
    '# Clueless crossing ambiguity report',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    'Lexical: both alternate words appear somewhere in `puzzles.js`. Strict: the six words after the swap are all distinct.',
    '',
    '## Summary',
    '',
    ...summaryLines.map((l) => (l === '' ? '' : `- ${l}`)),
    '',
    '## All hits',
    '',
    tableHeader,
    tableSep,
    ...tableRows,
    '',
  ]

  const mdText = md.join('\n')
  const jsonText = JSON.stringify(jsonRows, null, 2)

  console.log(summaryLines.join('\n'))
  if (tableRows.length) {
    console.log(tableHeader)
    console.log(tableSep)
    for (const line of tableRows) console.log(line)
  } else {
    console.log('(No ambiguous crossings found.)')
  }

  if (!noWrite) {
    fs.mkdirSync(outDir, { recursive: true })
    const mdPath = path.join(outDir, 'clueless-ambiguity.md')
    const jsonPath = path.join(outDir, 'clueless-ambiguity.json')
    fs.writeFileSync(mdPath, mdText, 'utf8')
    fs.writeFileSync(jsonPath, jsonText, 'utf8')
    console.log('')
    console.log(`Wrote ${path.relative(repoRoot, mdPath)}`)
    console.log(`Wrote ${path.relative(repoRoot, jsonPath)}`)
  }
}

main()
