/**
 * Matches one-line objects in puzzles.js: `{ size: 'small', clues: [[0, 0, 3], ...] }`
 * @param {unknown} puzzle
 */
export function formatHoneycombPuzzleSourceLine(puzzle) {
  if (!puzzle || typeof puzzle !== 'object') return JSON.stringify(puzzle)
  const { size, clues } = puzzle
  if (typeof size !== 'string' || !Array.isArray(clues)) return JSON.stringify(puzzle)
  const tripleStr = (t) => {
    if (!Array.isArray(t) || t.length < 3) return JSON.stringify(t)
    return `[${t[0]}, ${t[1]}, ${t[2]}]`
  }
  const clueParts = clues.map(tripleStr)
  return `{ size: '${size}', clues: [${clueParts.join(', ')}] }`
}
