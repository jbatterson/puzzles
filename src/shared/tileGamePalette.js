/**
 * Productiles & Sum Tiles — tile fill colors by semantic id.
 * Shape → token mapping is fixed; edit hex values here to retheme both games.
 */
export const TILE_GAME_PALETTE = {
    ltpurple: '#c066c7',
    purple: '#84338a',
    dkpurple: '#522056',
    blue: '#33658a',
    dkblue: '#2f4858',
    green: '#398a33',
    amber: '#f26419',
    dkamber: '#C64D0C',

    red: '#ff3b30',

}

const SHAPE_TO_TOKEN = {
    '2,2': 'dkblue',
    '3,1': 'purple',
    '1,3': 'ltpurple',
    '2,1': 'amber',
    '1,2': 'dkamber',
}

/** Resolve a palette token to hex (hex strings pass through). */
export function tileGameFillColorForToken(token) {
    if (token == null) return TILE_GAME_PALETTE.sky
    if (typeof token === 'string' && token.startsWith('#')) return token
    const hex = TILE_GAME_PALETTE[token]
    if (hex) return hex
    if (import.meta.env.DEV) console.warn('Unknown tile game palette token:', token)
    return TILE_GAME_PALETTE.blue
}

/** Canvas fill for a tile from its width/height (same rules as legacy tileColor). */
export function tileGameFillColor(t) {
    const token = SHAPE_TO_TOKEN[`${t.w},${t.h}`] ?? 'sky'
    return tileGameFillColorForToken(token)
}
