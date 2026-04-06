/**
 * String that matches how puzzles are written in puzzles.js (spaces after `{`, `,`, `:` in arrays).
 * @param {unknown} puzzle
 * @returns {string}
 */
export function formatScurryPuzzleSourceLine(puzzle) {
  if (!puzzle || typeof puzzle !== 'object') return JSON.stringify(puzzle)
  const { targets, maxBugs, prePlaced } = puzzle
  if (!Array.isArray(targets) || typeof maxBugs !== 'number' || !Array.isArray(prePlaced)) {
    return JSON.stringify(puzzle)
  }
  const nums = (arr) => arr.join(', ')
  return `{ targets: [${nums(targets)}], maxBugs: ${maxBugs}, prePlaced: [${nums(prePlaced)}] }`
}
