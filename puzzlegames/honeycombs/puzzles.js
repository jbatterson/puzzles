// Honeycombs puzzle definitions — batched like other suite games (easy / medium / hard).
// Format per puzzle: { size: 'small'|'medium'|'large', clues: [[row, col, value], ...] }

const puzzleData = {
  tutorial: [
    { size: 'small', clues: [[0,0,3], [0,1,2], [0,2,1], [2,0,10], [2,1,9], [2,2,8]] },
    { size: 'small', clues: [[0,0,5], [1,1,6], [1,2,7], [2,1,8], [2,0,9], [1,0,10]] }, //
    { size: 'small', clues: [[0,2,2], [1,3,3], [1,2,4], [0,0,6], [1,0,7], [2,0,8]] }, //
    { size: 'small', clues: [[0,1,2], [1,2,3], [1,1,4], [2,1,7]] },
    { size: 'medium', clues: [[2,1,1], [3,1,2], [3,0,3], [2,0,4], [1,0,5], [1,3,9], [2,2,12]] },
  ],

  easy: [
    { size: 'small', clues: [[0, 2, 2], [1, 3, 3], [0, 0, 6]] },
    { size: 'small', clues: [[0,1,1], [0,2,4], [1,3,5]] },
    { size: 'small', clues: [[1,2,3], [2,1,7], [2,2,8]] },
    { size: 'small', clues: [[1,2,1], [2,1,6], [2,0,10]] },
    { size: 'small', clues: [[2, 0, 1], [2, 1, 4], [1, 0, 10]] },
    { size: 'small', clues: [[2, 0, 2], [2, 2, 5], [1, 2, 6]] },
    { size: 'small', clues: [[0, 2, 1], [1, 3, 6], [2, 0, 9]] },
    { size: 'small', clues: [[2,1,4], [1,1,6], [2,2,10]] },
    { size: 'small', clues: [[1,2,1], [0,1,4], [0,2,5]] },
    { size: 'small', clues: [[2,2,3], [1,1,5], [0,1,6]] },
    { size: 'small', clues: [[0,0,3], [0,1,4], [1,1,6]] },
    { size: 'small', clues: [[0,0,1], [1,2,7], [1,1,10]] },
    { size: 'small', clues: [[1,2,3], [2,1,4], [0,1,8]] },
    { size: 'small', clues: [[2, 0, 1], [1, 2, 3], [1, 3, 6]] },
    { size: 'small', clues: [[2, 2, 1], [2, 0, 4], [1, 0, 6]] },
    { size: 'small', clues: [[1, 2, 2], [2, 1, 4], [2, 0, 6]] },
    { size: 'small', clues: [[0,2,1], [1,2,2], [1,1,9]] },
  
  ],

  medium: [
    { size: 'medium', clues: [[0, 1, 4], [1, 2, 6], [2, 2, 7], [1, 3, 13]] },
    { size: 'medium', clues: [[1, 1, 3], [1, 2, 4], [2, 3, 8], [0, 1, 11]] },
    { size: 'medium', clues: [[0, 0, 3], [2, 1, 5], [1, 3, 9], [2, 2, 11]] },
    { size: 'medium', clues: [[2,2,3], [2,1,4], [1,2,6], [3,2,13]] },
    { size: 'medium', clues: [[0, 2, 2], [1, 1, 7], [0, 1, 8], [3, 0, 12]] },
    { size: 'medium', clues: [[2,3,1], [1,1,5], [2,0,12], [3,0,13]] },
    { size: 'medium', clues: [[3,2,2], [2,2,3], [2,1,5], [1,1,12]] },
    { size: 'medium', clues: [[1, 1, 1], [1, 0, 9], [3, 0, 12], [3, 1, 13]] },
    { size: 'medium', clues: [[0,2,1], [1,2,2], [0,0,7], [1,0,8]] },
    { size: 'medium', clues: [[1,2,1], [0,1,7], [2,1,9], [3,1,10]] },
    { size: 'medium', clues: [[1,2,2], [2,2,3], [3,2,4], [1,1,8]] },
    { size: 'medium', clues: [[1,1,5], [0,1,7], [1,0,9], [3,1,12]] },
    { size: 'medium', clues: [[1,0,1], [2,2,4], [1,1,6], [3,0,14]] },
    { size: 'medium', clues: [[2, 0, 2], [2, 1, 6], [0, 2, 11], [0, 0, 13]] },
    { size: 'medium', clues: [[1, 1, 2], [2, 0, 6], [3, 0, 7], [0, 1, 13]] },
    { size: 'medium', clues: [[2,1,2], [3,0,3], [1,0,9], [1,3,13]] },
    { size: 'medium', clues: [[2,1,2], [1,2,4], [3,2,7], [2,0,14]] },
  
  ],

  hard: [
    { size: 'large', clues: [[1, 0, 2], [2, 3, 5], [0, 2, 9], [4, 1, 14], [3, 2, 15]] },
    { size: 'large', clues: [[4,0,1], [3,1,2], [3,2,4], [2,1,8], [3,3,17]] },
    { size: 'large', clues: [[2,2,1], [1,2,8], [2,3,9], [1,3,12], [0,1,14]] },
    { size: 'large', clues: [[2, 1, 2], [2, 2, 6], [1, 1, 10], [3, 3, 16], [4, 2, 17]] },
    { size: 'large', clues: [[2,4,3], [2,3,4], [2,2,6], [0,1,13], [4,0,18]] },
    { size: 'large', clues: [[1,0,1], [1,2,8], [2,3,10], [4,2,13], [0,2,17]] },
    { size: 'large', clues: [[4, 2, 1], [2, 2, 4], [2, 1, 8], [4, 0, 11], [1, 3, 18]] },
    { size: 'large', clues: [[1, 3, 1], [3, 2, 7], [2, 3, 10], [3, 0, 16], [1, 0, 18]] },
    { size: 'large', clues: [[3,2,3], [2,2,4], [3,1,5], [0,2,10], [2,0,14]] },
    { size: 'large', clues: [[1,2,3], [3,2,5], [3,1,6], [3,0,9], [2,4,15]] },
    { size: 'large', clues: [[3,2,2], [3,1,4], [1,1,6], [2,0,15], [4,2,19]] },
    { size: 'large', clues: [[4, 0, 1], [2, 2, 6], [1, 3, 14], [4, 1, 18], [3, 1, 19]] },
    { size: 'large', clues: [[0,1,2], [1,2,3], [2,4,10], [4,2,12], [4,1,14]] },
    { size: 'large', clues: [[1, 1, 1], [2, 1, 2], [0, 0, 7], [0, 2, 10], [2, 2, 14]] },
    { size: 'large', clues: [[2,3,1], [1,1,6], [4,1,11], [3,2,14], [4,2,15]] },
    { size: 'large', clues: [[3,0,1], [1,2,6], [2,2,11], [3,2,16], [3,3,18]] },
    { size: 'large', clues: [[4, 1, 1], [1, 1, 8], [2, 2, 15], [2, 3, 16], [3, 3, 18]] },
  
  ],
}

export default puzzleData

function getDailyKey() {
  const now = new Date()
  const pst = new Date(now.getTime() - 8 * 60 * 60 * 1000)
  return `${pst.getUTCFullYear()}-${String(pst.getUTCMonth() + 1).padStart(2, '0')}-${String(pst.getUTCDate()).padStart(2, '0')}`
}

function getDayIndex(key) {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  const epoch = new Date(Date.UTC(2020, 0, 1))
  return Math.floor((date - epoch) / 86400000)
}

export function getDailyHoneycombsPuzzles() {
  const key = getDailyKey()
  const dayIndex = getDayIndex(key)
  const easy = puzzleData.easy || []
  const medium = puzzleData.medium || []
  const hard = puzzleData.hard || []
  return {
    dateKey: key,
    puzzles: [
      easy[dayIndex % easy.length],
      medium[dayIndex % medium.length],
      hard[dayIndex % hard.length],
    ],
  }
}

export function parsePuzzleParam(search = window.location.search) {
  try {
    const p = new URLSearchParams(search).get('p')
    const n = parseInt(p, 10)
    if (n >= 1 && n <= 3) return n - 1
  } catch {
    // ignore malformed URL params
  }
  return 0
}
