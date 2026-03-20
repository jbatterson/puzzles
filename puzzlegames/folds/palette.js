/** Token → display hex for Folds puzzle cells. Edit here to retheme all puzzles. */
export const FOLDS_PALETTE = {
    red: '#ff3b30',
    green: '#398a33',
    blue: '#33658a',
    purple: '#84338a',
    amber: '#f26419',
}

/**
 * SVG/CSS fill for a board color value (palette token or legacy hex).
 * Runtime-only colors (e.g. mixed brown) use hex strings and pass through.
 */
export function fillColor(token) {
    if (token == null) return '#000000'
    if (typeof token === 'string' && token.startsWith('#')) return token
    const hex = FOLDS_PALETTE[token]
    if (hex) return hex
    if (import.meta.env.DEV) console.warn('Unknown Folds color token:', token)
    return '#888888'
}
