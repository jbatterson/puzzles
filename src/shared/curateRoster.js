/** Tier order for suite games (tutorial + daily difficulties). */
export const DEFAULT_SUITE_TIER_ORDER = ['tutorial', 'easy', 'medium', 'hard']

/**
 * @param {Record<string, unknown>} puzzleData — default export from a game's puzzles.js
 * @param {string[]} [tierOrder]
 * @returns {{ tier: string, indexInTier: number, puzzle: unknown }[]}
 */
export function buildTierRoster(puzzleData, tierOrder = DEFAULT_SUITE_TIER_ORDER) {
  const list = []
  for (const tier of tierOrder) {
    const arr = puzzleData[tier]
    if (!Array.isArray(arr)) continue
    arr.forEach((puzzle, indexInTier) => {
      list.push({ tier, indexInTier, puzzle })
    })
  }
  return list
}

/**
 * @param {string} search — e.g. `window.location.search`
 * @returns {{ curate: boolean, i: number }} `i` is 0-based flat roster index
 */
export function parseCurateParams(search) {
  const params = new URLSearchParams(search)
  const c = params.get('curate')
  const curate = c === '1' || c === 'true' || c === ''
  const iRaw = params.get('i')
  let i = 0
  if (iRaw != null) {
    const n = parseInt(iRaw, 10)
    if (!Number.isNaN(n) && n >= 0) i = n
  }
  return { curate, i }
}

/**
 * Line 1: stable location in puzzles.js (`{game} {tier} {1-based index in tier}`).
 * Line 2: prefix of JSON for quick find-in-file.
 * @param {string} gameSlug
 * @param {string} tier
 * @param {number} indexOneBased
 * @param {unknown} puzzle
 * @param {number} [jsonPrefixLength]
 */
export function formatCurateClipboard(
  gameSlug,
  tier,
  indexOneBased,
  puzzle,
  jsonPrefixLength = 100
) {
  const line1 = `${gameSlug} ${tier} ${indexOneBased}`
  const line2 = JSON.stringify(puzzle).slice(0, jsonPrefixLength)
  return `${line1}\n${line2}`
}

/**
 * Flat roster from a single array (e.g. Clueless default export).
 * @param {unknown[]} items
 * @param {string} [tierLabel]
 */
export function buildFlatPuzzleRoster(items, tierLabel = 'all') {
  if (!Array.isArray(items)) return []
  return items.map((puzzle, indexInTier) => ({ tier: tierLabel, indexInTier, puzzle }))
}
