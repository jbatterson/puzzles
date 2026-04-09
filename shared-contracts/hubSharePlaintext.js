/**
 * Hub and in-game share plaintext — matches `src/home.jsx` share rules (single source of truth).
 */

import { readSuiteGameElapsedMs } from './suiteCompletionTimer.js'
import { formatAllTenElapsedMsForShare } from './allTenSharePlaintext.js'

function elapsedLineForShare(gameKey, dateKey) {
	const ms = readSuiteGameElapsedMs(gameKey, dateKey)
	if (ms == null) return ''
	return `\n${formatAllTenElapsedMsForShare(ms)}\n`
}

function lsGet(key) {
	try {
		return localStorage.getItem(key)
	} catch {
		return null
	}
}

function loadCompletions(gameKey, dateKey) {
	return [0, 1, 2].map(i => ['1', '2'].includes(lsGet(`${gameKey}:${dateKey}:${i}`)))
}

function loadPerfects(gameKey, dateKey) {
	return [0, 1, 2].map(i => lsGet(`${gameKey}:${dateKey}:${i}`) === '2')
}

function loadMoveCounts(gameKey, dateKey) {
	return [0, 1, 2].map(i => {
		const v = lsGet(`${gameKey}:${dateKey}:${i}:moves`)
		return v != null ? parseInt(v, 10) : null
	})
}

const CLUELESS_DIFFS = ['easy', 'medium', 'hard']

function loadSingleBestAttemptsClueless(dateKey) {
	const v = lsGet(`clueless:${dateKey}:bestAttempts`)
	if (v == null) return null
	const n = parseInt(v, 10)
	return n >= 1 && n <= 99 ? n : null
}

function loadCluelessAttempt(dateKey, diff) {
	const v = lsGet(`clueless:${dateKey}:${diff}:bestAttempts`)
	if (v != null) {
		const n = parseInt(v, 10)
		if (n >= 1 && n <= 99) return n
	}
	if (diff === 'medium') {
		const legacy = loadSingleBestAttemptsClueless(dateKey)
		if (legacy != null) return legacy
	}
	return null
}

function loadCluelessAttempts(dateKey) {
	return CLUELESS_DIFFS.map(diff => loadCluelessAttempt(dateKey, diff))
}

function loadSingleCompletion(gameKey, dateKey) {
	if (gameKey === 'clueless') return loadSingleBestAttemptsClueless(dateKey) != null
	return ['1', '2'].includes(lsGet(`${gameKey}:${dateKey}`))
}

function loadSinglePerfect(gameKey, dateKey) {
	if (gameKey === 'clueless') return loadSingleBestAttemptsClueless(dateKey) === 1
	return lsGet(`${gameKey}:${dateKey}`) === '2'
}

const TILE_GAMES = new Set(['sumtiles', 'productiles'])
const DIFF_LABELS = ['Easy', 'Med', 'Hard']

const GAME_TITLES = Object.freeze({
	scurry: 'Scurry',
	clueless: 'Clueless',
	folds: 'Folds',
	factorfall: 'Factorfall',
	sumtiles: 'Sum Tiles',
	productiles: 'Productiles',
	honeycombs: 'Honeycombs',
})

function buildShareText(key, title, href, completions, perfects, moveCounts, dateKey) {
	const origin = typeof window !== 'undefined' ? window.location.origin : ''
	const playUrl = new URL(href, origin || 'http://localhost').href
	const isTileGame = TILE_GAMES.has(key)
	let out = title.toUpperCase() + '\n'
	for (let i = 0; i < 3; i++) {
		const label = DIFF_LABELS[i]
		if (completions[i]) {
			const moves = isTileGame && moveCounts && moveCounts[i] != null ? ` (${moveCounts[i]} moves)` : ''
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

function buildCluelessShareText(dateKey, title, href, attempts) {
	const origin = typeof window !== 'undefined' ? window.location.origin : ''
	const playUrl = new URL(href, origin || 'http://localhost').href
	const labels = ['Easy', 'Med', 'Hard']
	let out = title.toUpperCase() + '\n'
	for (let i = 0; i < 3; i++) {
		const a = attempts?.[i] ?? null
		if (a != null) {
			const suffix = a === 1 ? ' (⭐ First try!)' : ` ${String(Math.min(a, 99))}`
			out += `${labels[i]}   🟩${suffix}\n`
		} else {
			out += `${labels[i]}   ⬜\n`
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
	if (!GAME_TITLES[gameKey]) return false
	if (gameKey === 'clueless') {
		return loadCluelessAttempts(dateKey).some(a => a != null)
	}
	if (SINGLE_PUZZLE_GAMES.has(gameKey)) {
		return loadSingleCompletion(gameKey, dateKey)
	}
	return loadCompletions(gameKey, dateKey).some(Boolean)
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
	const b = baseHref.endsWith('/') ? baseHref : `${baseHref}/`
	const href = `${b}puzzlegames/${gameKey}/`

	if (gameKey === 'clueless') {
		return buildCluelessShareText(dateKey, title, href, loadCluelessAttempts(dateKey))
	}
	if (SINGLE_PUZZLE_GAMES.has(gameKey)) {
		return buildSingleShareText(
			gameKey,
			dateKey,
			title,
			href,
			loadSingleCompletion(gameKey, dateKey),
			loadSinglePerfect(gameKey, dateKey),
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
	)
}
