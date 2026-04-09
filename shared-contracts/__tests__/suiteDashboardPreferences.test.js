import { describe, it, expect, beforeEach } from 'vitest'
import {
  createDefaultSuiteDashboardPreferences,
  getEnabledTierIndices,
  getTierMask,
  isSuiteCompleteForPrefs,
  hubHrefFirstUnfinishedThreeWithPrefs,
  hubHrefFirstUnfinishedCluelessWithPrefs,
} from '../suiteDashboardPreferences.js'
import { GAME_KEYS } from '../gameChrome.js'

/** Build a full prefs object with specific tier overrides, leaving everything else at defaults. */
function makePrefs(tierOverrides = {}) {
  const base = createDefaultSuiteDashboardPreferences()
  return { ...base, tierOn: { ...base.tierOn, ...tierOverrides } }
}

const DATE = '2025-04-09'

// ── createDefaultSuiteDashboardPreferences ────────────────────────────────────

describe('createDefaultSuiteDashboardPreferences', () => {
  it('has schema version 1', () => {
    expect(createDefaultSuiteDashboardPreferences().v).toBe(1)
  })

  it('has every known game enabled by default', () => {
    const { puzzleOn } = createDefaultSuiteDashboardPreferences()
    for (const key of Object.values(GAME_KEYS)) {
      expect(puzzleOn[key]).toBe(true)
    }
  })

  it('has all three tiers on for every three-tier game', () => {
    const { tierOn } = createDefaultSuiteDashboardPreferences()
    const threeTierKeys = [
      GAME_KEYS.SCURRY,
      GAME_KEYS.FOLDS,
      GAME_KEYS.CLUELESS,
      GAME_KEYS.HONEYCOMBS,
      GAME_KEYS.SUMTILES,
      GAME_KEYS.PRODUCTILES,
      GAME_KEYS.FACTORFALL,
    ]
    for (const key of threeTierKeys) {
      expect(tierOn[key]).toEqual([true, true, true])
    }
  })

  it('has timer enabled by default', () => {
    expect(createDefaultSuiteDashboardPreferences().timerOn).toBe(true)
  })
})

// ── getEnabledTierIndices ─────────────────────────────────────────────────────

describe('getEnabledTierIndices', () => {
  it('returns [0, 1, 2] when all tiers on', () => {
    expect(getEnabledTierIndices(GAME_KEYS.SCURRY, makePrefs())).toEqual([0, 1, 2])
  })

  it('returns only the single enabled tier', () => {
    const prefs = makePrefs({ [GAME_KEYS.SCURRY]: [true, false, false] })
    expect(getEnabledTierIndices(GAME_KEYS.SCURRY, prefs)).toEqual([0])
  })

  it('returns [1, 2] when easy is off', () => {
    const prefs = makePrefs({ [GAME_KEYS.FOLDS]: [false, true, true] })
    expect(getEnabledTierIndices(GAME_KEYS.FOLDS, prefs)).toEqual([1, 2])
  })

  it('returns [0, 2] for easy+hard only', () => {
    const prefs = makePrefs({ [GAME_KEYS.HONEYCOMBS]: [true, false, true] })
    expect(getEnabledTierIndices(GAME_KEYS.HONEYCOMBS, prefs)).toEqual([0, 2])
  })
})

// ── getTierMask ───────────────────────────────────────────────────────────────

describe('getTierMask', () => {
  it('returns the stored mask for a three-tier game', () => {
    const prefs = makePrefs({ [GAME_KEYS.SUMTILES]: [true, false, true] })
    expect(getTierMask(GAME_KEYS.SUMTILES, prefs)).toEqual([true, false, true])
  })

  it('falls back to [true, true, true] for non-three-tier game', () => {
    expect(getTierMask(GAME_KEYS.ALLTEN, makePrefs())).toEqual([true, true, true])
  })
})

// ── isSuiteCompleteForPrefs ───────────────────────────────────────────────────

describe('isSuiteCompleteForPrefs', () => {
  beforeEach(() => localStorage.clear())

  it('returns false when nothing is in storage', () => {
    expect(isSuiteCompleteForPrefs(GAME_KEYS.SCURRY, DATE, makePrefs())).toBe(false)
  })

  it('returns false for a non-three-tier game (allten)', () => {
    expect(isSuiteCompleteForPrefs(GAME_KEYS.ALLTEN, DATE, makePrefs())).toBe(false)
  })

  it('returns true when all three enabled tiers are complete', () => {
    localStorage.setItem(`scurry:${DATE}:0`, '1')
    localStorage.setItem(`scurry:${DATE}:1`, '2') // '2' = perfect, still counts
    localStorage.setItem(`scurry:${DATE}:2`, '1')
    expect(isSuiteCompleteForPrefs(GAME_KEYS.SCURRY, DATE, makePrefs())).toBe(true)
  })

  it('returns false when one of three tiers is missing', () => {
    localStorage.setItem(`scurry:${DATE}:0`, '1')
    localStorage.setItem(`scurry:${DATE}:1`, '1')
    // tier 2 absent
    expect(isSuiteCompleteForPrefs(GAME_KEYS.SCURRY, DATE, makePrefs())).toBe(false)
  })

  it('ignores a disabled tier — only easy enabled and complete', () => {
    localStorage.setItem(`scurry:${DATE}:0`, '1')
    // tier 1 and 2 untouched
    const prefs = makePrefs({ [GAME_KEYS.SCURRY]: [true, false, false] })
    expect(isSuiteCompleteForPrefs(GAME_KEYS.SCURRY, DATE, prefs)).toBe(true)
  })

  it('requires every enabled tier — easy+hard on, hard missing → false', () => {
    localStorage.setItem(`scurry:${DATE}:0`, '1')
    // tier 2 absent
    const prefs = makePrefs({ [GAME_KEYS.SCURRY]: [true, false, true] })
    expect(isSuiteCompleteForPrefs(GAME_KEYS.SCURRY, DATE, prefs)).toBe(false)
  })

  it('easy+hard enabled, both complete → true', () => {
    localStorage.setItem(`scurry:${DATE}:0`, '1')
    localStorage.setItem(`scurry:${DATE}:2`, '1')
    const prefs = makePrefs({ [GAME_KEYS.SCURRY]: [true, false, true] })
    expect(isSuiteCompleteForPrefs(GAME_KEYS.SCURRY, DATE, prefs)).toBe(true)
  })

  describe('Clueless (bestAttempts storage pattern)', () => {
    it('returns true when all three difficulty attempts are recorded', () => {
      localStorage.setItem(`clueless:${DATE}:easy:bestAttempts`, '3')
      localStorage.setItem(`clueless:${DATE}:medium:bestAttempts`, '1')
      localStorage.setItem(`clueless:${DATE}:hard:bestAttempts`, '5')
      expect(isSuiteCompleteForPrefs(GAME_KEYS.CLUELESS, DATE, makePrefs())).toBe(true)
    })

    it('returns false when hard has no attempt yet', () => {
      localStorage.setItem(`clueless:${DATE}:easy:bestAttempts`, '2')
      localStorage.setItem(`clueless:${DATE}:medium:bestAttempts`, '1')
      // hard absent
      expect(isSuiteCompleteForPrefs(GAME_KEYS.CLUELESS, DATE, makePrefs())).toBe(false)
    })

    it('only easy enabled → complete when easy attempt exists', () => {
      localStorage.setItem(`clueless:${DATE}:easy:bestAttempts`, '1')
      const prefs = makePrefs({ [GAME_KEYS.CLUELESS]: [true, false, false] })
      expect(isSuiteCompleteForPrefs(GAME_KEYS.CLUELESS, DATE, prefs)).toBe(true)
    })

    it('rejects out-of-range attempt values (0 and 100)', () => {
      localStorage.setItem(`clueless:${DATE}:easy:bestAttempts`, '0')
      localStorage.setItem(`clueless:${DATE}:medium:bestAttempts`, '100')
      localStorage.setItem(`clueless:${DATE}:hard:bestAttempts`, '1')
      const prefs = makePrefs({ [GAME_KEYS.CLUELESS]: [true, true, false] })
      expect(isSuiteCompleteForPrefs(GAME_KEYS.CLUELESS, DATE, prefs)).toBe(false)
    })
  })
})

// ── hubHrefFirstUnfinishedThreeWithPrefs ──────────────────────────────────────

describe('hubHrefFirstUnfinishedThreeWithPrefs', () => {
  it('returns ?p=1 when nothing is done (all enabled, first = easy)', () => {
    const href = hubHrefFirstUnfinishedThreeWithPrefs(
      '/puzzles/puzzlegames/scurry/',
      [false, false, false],
      makePrefs()
    )
    expect(href).toBe('/puzzles/puzzlegames/scurry/?p=1')
  })

  it('skips the completed easy tier and points to medium', () => {
    const href = hubHrefFirstUnfinishedThreeWithPrefs(
      '/puzzles/puzzlegames/scurry/',
      [true, false, false],
      makePrefs()
    )
    expect(href).toBe('/puzzles/puzzlegames/scurry/?p=2')
  })

  it('when easy is disabled and medium is done, points to hard', () => {
    const prefs = makePrefs({ [GAME_KEYS.SCURRY]: [false, true, true] })
    const href = hubHrefFirstUnfinishedThreeWithPrefs(
      '/puzzles/puzzlegames/scurry/',
      [false, true, false],
      prefs
    )
    expect(href).toBe('/puzzles/puzzlegames/scurry/?p=3')
  })

  it('when all enabled tiers are done, returns first enabled tier', () => {
    const href = hubHrefFirstUnfinishedThreeWithPrefs(
      '/puzzles/puzzlegames/scurry/',
      [true, true, true],
      makePrefs()
    )
    expect(href).toBe('/puzzles/puzzlegames/scurry/?p=1')
  })
})

// ── hubHrefFirstUnfinishedCluelessWithPrefs ───────────────────────────────────

describe('hubHrefFirstUnfinishedCluelessWithPrefs', () => {
  it('returns ?p=1 when no attempts recorded', () => {
    const href = hubHrefFirstUnfinishedCluelessWithPrefs(
      '/puzzles/puzzlegames/clueless/',
      [null, null, null],
      makePrefs()
    )
    expect(href).toBe('/puzzles/puzzlegames/clueless/?p=1')
  })

  it('skips completed attempts and points to first unfinished', () => {
    const href = hubHrefFirstUnfinishedCluelessWithPrefs(
      '/puzzles/puzzlegames/clueless/',
      [3, null, null], // easy done, medium not
      makePrefs()
    )
    expect(href).toBe('/puzzles/puzzlegames/clueless/?p=2')
  })

  it('with easy disabled and easy done, returns first unfinished enabled tier', () => {
    const prefs = makePrefs({ [GAME_KEYS.CLUELESS]: [false, true, true] })
    const href = hubHrefFirstUnfinishedCluelessWithPrefs(
      '/puzzles/puzzlegames/clueless/',
      [1, null, null], // easy done but disabled
      prefs
    )
    expect(href).toBe('/puzzles/puzzlegames/clueless/?p=2')
  })
})
