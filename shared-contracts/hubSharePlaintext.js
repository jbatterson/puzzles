/**
 * Hub and in-game share plaintext formatters for suite games (not All Ten — use allTenSharePlaintext).
 * Progress is read via hubProgress.js, which is the single source of truth for localStorage access.
 */

import { readSuiteGameElapsedMs } from './suiteCompletionTimer.js'
import { formatAllTenElapsedMsForShare } from './allTenSharePlaintext.js'
import {
  lsGet,
  loadCompletions,
  loadPerfects,
  loadMoveCounts,
  CLUELESS_DIFFS,
  loadCluelessAttempt,
  loadCluelessAttempts,
} from './hubProgress.js'
import {
  getEnabledTierIndices,
  isSuiteTimerEnabled,
  readSuiteDashboardPreferences,
} from './suiteDashboardPreferences.js'

function elapsedLineForShare(gameKey, dateKey) {
  if (!isSuiteTimerEnabled()) return ''
  const ms = readSuiteGameElapsedMs(gameKey, dateKey)
  if (ms == null) return ''
  return `\n${formatAllTenElapsedMsForShare(ms)}\n`
}

function loadSingleCompletion(gameKey, dateKey) {
  if (gameKey === 'clueless') return loadCluelessAttempt(dateKey, 'medium') != null
  return ['1', '2'].includes(lsGet(`${gameKey}:${dateKey}`))
}

function loadSinglePerfect(gameKey, dateKey) {
  if (gameKey === 'clueless') return loadCluelessAttempt(dateKey, 'medium') === 1
  return lsGet(`${gameKey}:${dateKey}`) === '2'
}

const TILE_GAMES = new Set(['sumtiles', 'productiles'])
const DIFF_LABELS = ['Easy', 'Med', 'Hard']

const GAME_TITLES = Object.freeze({
  scurry: 'Scurry',
  clueless: 'Clueless',
  folds: 'Folds',
  sumtiles: 'Sum Tiles',
  productiles: 'Productiles',
  honeycombs: 'Honeycombs',
})

function buildShareText(key, title, href, completions, perfects, moveCounts, dateKey, prefs) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const playUrl = new URL(href, origin || 'http://localhost').href
  const isTileGame = TILE_GAMES.has(key)
  const tiers = getEnabledTierIndices(key, prefs)
  let out = title.toUpperCase() + '\n'
  for (const i of tiers) {
    const label = DIFF_LABELS[i]
    if (completions[i]) {
      let moves = ''
      if (isTileGame && moveCounts && moveCounts[i] != null) {
        const star = perfects && perfects[i] ? ' ⭐' : ''
        moves = ` (${moveCounts[i]} moves${star})`
      }
      const firstTry = !isTileGame && perfects && perfects[i] ? ' (⭐ First try!)' : ''
      out += `${label}   🟩${moves}${firstTry}\n`
    } else {
      out += `${label}   ⬜\n`
    }
  }
  out += elapsedLineForShare(key, dateKey)
  out += playUrl
  return out
}

function buildSingleShareText(gameKey, dateKey, title, href, completed, perfect) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const playUrl = new URL(href, origin || 'http://localhost').href
  let out = title.toUpperCase() + '\n'
  if (completed) {
    const star = perfect ? ' (⭐ First try!)' : ''
    out += `🟩${star}\n`
  } else {
    out += `⬜\n`
  }
  out += elapsedLineForShare(gameKey, dateKey)
  out += playUrl
  return out
}

function buildCluelessShareText(dateKey, title, href, attempts, prefs) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const playUrl = new URL(href, origin || 'http://localhost').href
  const tiers = getEnabledTierIndices('clueless', prefs)
  let out = title.toUpperCase() + '\n'
  for (const i of tiers) {
    const a = attempts?.[i] ?? null
    if (a != null) {
      const suffix = a === 1 ? ' (⭐ First try!)' : ` ${String(Math.min(a, 99))}`
      out += `${DIFF_LABELS[i]}   🟩${suffix}\n`
    } else {
      out += `${DIFF_LABELS[i]}   ⬜\n`
    }
  }
  out += elapsedLineForShare('clueless', dateKey)
  out += playUrl
  return out
}

/** Games that use one completion slot per day (`gameKey:dateKey` storage). */
const SINGLE_PUZZLE_GAMES = new Set()

/**
 * Whether the hub would show an enabled share for this game/date (any completion / Clueless attempt).
 * Align with `src/home.jsx` hasAnyCompletion for non–All Ten games.
 * @param {string} gameKey
 * @param {string} dateKey
 * @returns {boolean}
 */
export function hasShareableHubProgress(gameKey, dateKey) {
  const prefs = readSuiteDashboardPreferences()
  if (!GAME_TITLES[gameKey]) return false
  if (gameKey === 'clueless') {
    const attempts = loadCluelessAttempts(dateKey)
    return getEnabledTierIndices('clueless', prefs).some((i) => attempts[i] != null)
  }
  if (SINGLE_PUZZLE_GAMES.has(gameKey)) {
    return loadSingleCompletion(gameKey, dateKey)
  }
  const completions = loadCompletions(gameKey, dateKey)
  return getEnabledTierIndices(gameKey, prefs).some((i) => completions[i])
}

/**
 * Plaintext copied by hub share and suite completion modals (not All Ten — use allTenSharePlaintext).
 * @param {string} gameKey — e.g. scurry, folds, clueless
 * @param {string} dateKey — PST calendar YYYY-MM-DD
 * @param {string} [baseHref] — `import.meta.env.BASE_URL` (e.g. /Puzzles/)
 * @returns {string}
 */
export function buildHubSharePlaintext(gameKey, dateKey, baseHref = '/') {
  const title = GAME_TITLES[gameKey]
  if (!title) return ''
  const prefs = readSuiteDashboardPreferences()
  const b = baseHref.endsWith('/') ? baseHref : `${baseHref}/`
  const href = `${b}puzzlegames/${gameKey}/`

  if (gameKey === 'clueless') {
    return buildCluelessShareText(dateKey, title, href, loadCluelessAttempts(dateKey), prefs)
  }
  if (SINGLE_PUZZLE_GAMES.has(gameKey)) {
    return buildSingleShareText(
      gameKey,
      dateKey,
      title,
      href,
      loadSingleCompletion(gameKey, dateKey),
      loadSinglePerfect(gameKey, dateKey)
    )
  }
  return buildShareText(
    gameKey,
    title,
    href,
    loadCompletions(gameKey, dateKey),
    loadPerfects(gameKey, dateKey),
    loadMoveCounts(gameKey, dateKey),
    dateKey,
    prefs
  )
}
