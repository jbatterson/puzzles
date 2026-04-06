const KEYS = ['h1', 'h2', 'h3', 'v1', 'v2', 'v3']

/**
 * Matches puzzles.js: `{ h1:"forum", h2:"amber", ... }`
 * @param {unknown} puzzle
 */
export function formatCluelessPuzzleSourceLine(puzzle) {
  if (!puzzle || typeof puzzle !== 'object') return JSON.stringify(puzzle)
  const parts = []
  for (const k of KEYS) {
    if (typeof puzzle[k] !== 'string') return JSON.stringify(puzzle)
    parts.push(`${k}:"${puzzle[k]}"`)
  }
  return `{ ${parts.join(', ')} }`
}
