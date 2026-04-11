export const GAME_KEYS = Object.freeze({
  ALLTEN: 'allten',
  SCURRY: 'scurry',
  FOLDS: 'folds',
  SUMTILES: 'sumtiles',
  PRODUCTILES: 'productiles',
  CLUELESS: 'clueless',
  HONEYCOMBS: 'honeycombs',
})

const GAME_CHROME = Object.freeze({
  [GAME_KEYS.ALLTEN]: { title: 'All Ten', showStats: true },
  [GAME_KEYS.SCURRY]: { title: 'Scurry', showStats: true },
  [GAME_KEYS.FOLDS]: { title: 'Folds', showStats: true },
  [GAME_KEYS.SUMTILES]: { title: 'Sum Tiles', showStats: true },
  [GAME_KEYS.PRODUCTILES]: { title: 'Productiles', showStats: true },
  [GAME_KEYS.CLUELESS]: { title: 'Clueless', showStats: true },
  [GAME_KEYS.HONEYCOMBS]: { title: 'Honeycombs', showStats: true },
})

export function getGameChrome(gameKey) {
  return GAME_CHROME[gameKey] || { title: 'Puzzle', showStats: false }
}

const TILE_GAME_KEYS = new Set([GAME_KEYS.SUMTILES, GAME_KEYS.PRODUCTILES])

/** True for games that track move counts and show them on hub tiles (Sum Tiles, Productiles). */
export function isTileGameKey(gameKey) {
  return TILE_GAME_KEYS.has(gameKey)
}
