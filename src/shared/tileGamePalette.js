/**
 * Productiles & Sum Tiles — tile fill colors by semantic id.
 * Shape → token mapping is fixed; edit hex values here to retheme both games.
 */
export const TILE_GAME_PALETTE = {
    ltpurple: '#744b77',
    blue: '#4587ba',
    amber: '#ea9a19',
    dkred: '#9d270c',


}

const SHAPE_TO_TOKEN = {
    '2,2': 'dkred',
    '3,1': 'ltpurple',
    '1,3': 'ltpurple',
    '2,1': 'amber',
    '1,2': 'amber',
}

/** Resolve a palette token to hex (hex strings pass through). */
export function tileGameFillColorForToken(token) {
    if (token == null) return TILE_GAME_PALETTE.blue
    if (typeof token === 'string' && token.startsWith('#')) return token
    const hex = TILE_GAME_PALETTE[token]
    if (hex) return hex
    if (import.meta.env.DEV) console.warn('Unknown tile game palette token:', token)
    return TILE_GAME_PALETTE.blue
}

/** Canvas fill for a tile from its width/height (same rules as legacy tileColor). */
export function tileGameFillColor(t) {
    const token = SHAPE_TO_TOKEN[`${t.w},${t.h}`] ?? 'blue'
    return tileGameFillColorForToken(token)
}
