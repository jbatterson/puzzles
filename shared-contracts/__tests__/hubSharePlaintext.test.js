import { describe, it, expect, beforeEach } from 'vitest'
import { buildHubSharePlaintext } from '../hubSharePlaintext.js'

// Use a fixed base so URLs in output are deterministic.
const BASE = '/'
const DATE = '2025-04-09'

// jsdom sets window.location.origin to 'http://localhost', so share URLs read:
//   http://localhost/puzzlegames/<game>/

describe('buildHubSharePlaintext', () => {
  beforeEach(() => localStorage.clear())

  it('returns empty string for an unknown game key', () => {
    expect(buildHubSharePlaintext('notreal', DATE, BASE)).toBe('')
  })

  // ── Scurry (standard three-tier, no move counts, supports star) ───────────

  describe('scurry', () => {
    it('all three tiers complete → all green, correct title', () => {
      localStorage.setItem(`scurry:${DATE}:0`, '1')
      localStorage.setItem(`scurry:${DATE}:1`, '1')
      localStorage.setItem(`scurry:${DATE}:2`, '1')
      const text = buildHubSharePlaintext('scurry', DATE, BASE)
      expect(text).toContain('SCURRY')
      expect(text).toContain('Easy   🟩')
      expect(text).toContain('Med   🟩')
      expect(text).toContain('Hard   🟩')
      expect(text).not.toContain('⬜')
    })

    it('partial completion — easy done, med and hard empty', () => {
      localStorage.setItem(`scurry:${DATE}:0`, '1')
      const text = buildHubSharePlaintext('scurry', DATE, BASE)
      expect(text).toContain('Easy   🟩')
      expect(text).toContain('Med   ⬜')
      expect(text).toContain('Hard   ⬜')
    })

    it('no completions — all empty boxes', () => {
      const text = buildHubSharePlaintext('scurry', DATE, BASE)
      expect(text).toContain('Easy   ⬜')
      expect(text).toContain('Med   ⬜')
      expect(text).toContain('Hard   ⬜')
      expect(text).not.toContain('🟩')
    })

    it('perfect solve (value "2") shows star annotation', () => {
      localStorage.setItem(`scurry:${DATE}:0`, '2')
      const text = buildHubSharePlaintext('scurry', DATE, BASE)
      expect(text).toContain('Easy   🟩 (⭐ First try!)')
    })

    it('non-perfect solve (value "1") does not show star', () => {
      localStorage.setItem(`scurry:${DATE}:0`, '1')
      const text = buildHubSharePlaintext('scurry', DATE, BASE)
      expect(text).not.toContain('⭐')
    })

    it('includes a play URL containing the game path', () => {
      const text = buildHubSharePlaintext('scurry', DATE, BASE)
      expect(text).toContain('/puzzlegames/scurry/')
    })

    it('respects baseHref when building the play URL', () => {
      const text = buildHubSharePlaintext('scurry', DATE, '/MyApp/')
      expect(text).toContain('/MyApp/puzzlegames/scurry/')
    })
  })

  // ── Sum Tiles (tile game — shows move count, no star) ─────────────────────

  describe('sumtiles (tile game)', () => {
    it('shows move count in parentheses when recorded', () => {
      localStorage.setItem(`sumtiles:${DATE}:0`, '1')
      localStorage.setItem(`sumtiles:${DATE}:0:moves`, '12')
      const text = buildHubSharePlaintext('sumtiles', DATE, BASE)
      expect(text).toContain('(12 moves)')
    })

    it('does not show star even when value is "2"', () => {
      localStorage.setItem(`sumtiles:${DATE}:0`, '2')
      const text = buildHubSharePlaintext('sumtiles', DATE, BASE)
      expect(text).not.toContain('⭐')
    })

    it('no move count shows green without parentheses', () => {
      localStorage.setItem(`sumtiles:${DATE}:0`, '1')
      const text = buildHubSharePlaintext('sumtiles', DATE, BASE)
      expect(text).toContain('Easy   🟩\n')
    })
  })

  // ── Clueless (attempt count 1..99, no multi-completion keys) ─────────────

  describe('clueless', () => {
    it('first-try (attempt 1) shows star', () => {
      localStorage.setItem(`clueless:${DATE}:easy:bestAttempts`, '1')
      localStorage.setItem(`clueless:${DATE}:medium:bestAttempts`, '3')
      localStorage.setItem(`clueless:${DATE}:hard:bestAttempts`, '2')
      const text = buildHubSharePlaintext('clueless', DATE, BASE)
      expect(text).toContain('CLUELESS')
      expect(text).toContain('Easy   🟩 (⭐ First try!)')
      expect(text).toContain('Med   🟩 3')
      expect(text).toContain('Hard   🟩 2')
    })

    it('no attempts → all empty boxes', () => {
      const text = buildHubSharePlaintext('clueless', DATE, BASE)
      expect(text).toContain('Easy   ⬜')
      expect(text).toContain('Med   ⬜')
      expect(text).toContain('Hard   ⬜')
    })

    it('caps displayed attempt count at 99', () => {
      localStorage.setItem(`clueless:${DATE}:easy:bestAttempts`, '99')
      const text = buildHubSharePlaintext('clueless', DATE, BASE)
      expect(text).toContain('Easy   🟩 99')
    })
  })

  // ── Snapshot — full expected text for a clean reviewer reference ──────────

  describe('full output snapshots', () => {
    it('scurry all-complete snapshot', () => {
      localStorage.setItem(`scurry:${DATE}:0`, '1')
      localStorage.setItem(`scurry:${DATE}:1`, '1')
      localStorage.setItem(`scurry:${DATE}:2`, '1')
      expect(buildHubSharePlaintext('scurry', DATE, BASE)).toMatchInlineSnapshot(`
"SCURRY
Easy   🟩
Med   🟩
Hard   🟩
http://localhost:3000/puzzlegames/scurry/"
`)
    })

    it('clueless first-try easy, multi-attempt others snapshot', () => {
      localStorage.setItem(`clueless:${DATE}:easy:bestAttempts`, '1')
      localStorage.setItem(`clueless:${DATE}:medium:bestAttempts`, '4')
      localStorage.setItem(`clueless:${DATE}:hard:bestAttempts`, '2')
      expect(buildHubSharePlaintext('clueless', DATE, BASE)).toMatchInlineSnapshot(`
"CLUELESS
Easy   🟩 (⭐ First try!)
Med   🟩 4
Hard   🟩 2
http://localhost:3000/puzzlegames/clueless/"
`)
    })
  })
})
