/**
 * Shared deterministic PRNG utilities used by daily presentation modules.
 * Both Folds and Scurry seed a mulberry32 generator from a FNV-1a hash of
 * the date key, producing a stable per-day shuffle/orientation.
 */

/** Mulberry32 seeded PRNG — returns a function that yields floats in [0, 1). */
export function mulberry32(seed) {
  return function mulberry() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** FNV-1a 32-bit hash of a string — used to derive a numeric seed from a date key. */
export function hashStr(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
