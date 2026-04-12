import { PUZZLE_SUITE_INK } from '@shared-contracts/chromeUi.js'

/**
 * Fill when two *different* palette colors fold onto the same triangle.
 * Warm tan — distinct from suite navy / slate grays and palette reds.
 */
export const FOLDS_OVERLAP_MIX = '#a67c52'

/** Token → display hex for Folds puzzle cells. Edit here to retheme all puzzles. */
export const FOLDS_PALETTE = {
  red: '#9d270c',
  green: '#3f6d37',
  dkblue: '#1a3d5b',
  blue: '#2571b1',
  amber: '#ea9a19',
}

/** Canonical palette keys (order stable for daily color shuffles). */
export const FOLDS_PALETTE_TOKEN_KEYS = Object.keys(FOLDS_PALETTE)

/**
 * SVG/CSS fill for a board color value (palette token or legacy hex).
 * Runtime-only colors (e.g. `FOLDS_OVERLAP_MIX`) use hex strings and pass through.
 */
export function fillColor(token) {
  if (token == null) return PUZZLE_SUITE_INK
  if (typeof token === 'string' && token.startsWith('#')) return token
  const hex = FOLDS_PALETTE[token]
  if (hex) return hex
  if (import.meta.env.DEV) console.warn('Unknown Folds color token:', token)
  return '#888888'
}
