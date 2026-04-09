/**
 * Suite session timer: first puzzle load records start; each newly completed daily slot
 * bumps end so elapsed = end − start. Recording runs regardless of the hub “timer on”
 * display preference; modals and share omit elapsed when that pref is off.
 */

import { GAME_KEYS } from './gameChrome.js'

const CLUELESS_DIFFS = ['easy', 'medium', 'hard']

function lsGet(key) {
	try {
		return localStorage.getItem(key)
	} catch {
		return null
	}
}

function lsSet(key, val) {
	try {
		localStorage.setItem(key, val)
	} catch {
		// ignore
	}
}

function lsRemove(key) {
	try {
		localStorage.removeItem(key)
	} catch {
		// ignore
	}
}

export function suiteTimerStartKey(gameKey, dateKey) {
	return `${gameKey}:${dateKey}:suiteTimerStart`
}

export function suiteElapsedKey(gameKey, dateKey) {
	return `${gameKey}:${dateKey}:suiteElapsedMs`
}

function suiteTimerEndKey(gameKey, dateKey) {
	return `${gameKey}:${dateKey}:suiteTimerEndMs`
}

/** Bitmask of which daily slots (0–2) were complete when end time was last updated. */
function suiteElapsedCompletionMaskKey(gameKey, dateKey) {
	return `${gameKey}:${dateKey}:suiteElapsedCompletionMask`
}

/** Mirrors `simpleGameStats` / hub clueless loading — one non-null attempt = slot complete for the mask. */
function loadCluelessAttemptForMask(dateKey, diff) {
	const v = lsGet(`clueless:${dateKey}:${diff}:bestAttempts`)
	if (v != null) {
		const n = parseInt(v, 10)
		if (n >= 1 && n <= 99) return n
	}
	if (diff === 'medium') {
		const legacy = lsGet(`clueless:${dateKey}:bestAttempts`)
		if (legacy != null) {
			const n = parseInt(legacy, 10)
			if (n >= 1 && n <= 99) return n
		}
	}
	const legacy = lsGet(`clueless:${dateKey}`)
	if (legacy === '2') return 1
	if (legacy === '1') return 2
	return null
}

/** @returns {number} bits 1|2|4 for slots 0,1,2 — matches hub / game storage. */
function readDailySlotCompletionMask(gameKey, dateKey) {
	if (gameKey === GAME_KEYS.CLUELESS) {
		let mask = 0
		for (let i = 0; i < 3; i++) {
			if (loadCluelessAttemptForMask(dateKey, CLUELESS_DIFFS[i]) != null) mask |= 1 << i
		}
		return mask
	}
	let mask = 0
	for (let i = 0; i < 3; i++) {
		const v = lsGet(`${gameKey}:${dateKey}:${i}`)
		if (v === '1' || v === '2') mask |= 1 << i
	}
	return mask
}

/**
 * @param {string} gameKey
 * @param {string} dateKey
 * @param {{ track: boolean, alreadyFullyComplete: boolean }} opts
 */
export function ensureSuiteGameTimerStart(gameKey, dateKey, opts) {
	const { track, alreadyFullyComplete } = opts
	if (!track || !gameKey || !dateKey) return
	if (alreadyFullyComplete) return
	const sk = suiteTimerStartKey(gameKey, dateKey)
	if (lsGet(sk)) return
	lsSet(sk, String(Date.now()))
}

/**
 * On completion modal open: if at least one daily slot was newly completed since we
 * last recorded an end time, set end = now and elapsed = end − start. Start is set on
 * first puzzle load and kept when enabling more difficulties.
 */
export function finalizeSuiteGameTimerFromModal(gameKey, dateKey) {
	if (!gameKey || !dateKey) return
	const sk = suiteTimerStartKey(gameKey, dateKey)
	const ek = suiteElapsedKey(gameKey, dateKey)
	const endK = suiteTimerEndKey(gameKey, dateKey)
	const mk = suiteElapsedCompletionMaskKey(gameKey, dateKey)

	const currentMask = readDailySlotCompletionMask(gameKey, dateKey) & 7
	const mkRaw = lsGet(mk)
	const endRaw = lsGet(endK)
	const ekLegacy = lsGet(ek)

	// Old saves: elapsed only, no end/start pair — lock mask once so reopen doesn’t bump end.
	if (mkRaw == null && ekLegacy != null && endRaw == null) {
		lsSet(mk, String(currentMask))
		return
	}

	const prevMask = mkRaw != null ? parseInt(mkRaw, 10) & 7 : 0
	const newSlots = currentMask & ~prevMask
	if (newSlots === 0) return

	const endMs = Date.now()
	let startMs = parseInt(lsGet(sk), 10)
	if (!Number.isFinite(startMs)) {
		if (ekLegacy != null) {
			const prevElapsed = parseInt(ekLegacy, 10)
			startMs = Number.isFinite(prevElapsed) ? endMs - Math.max(0, prevElapsed) : endMs
		} else {
			startMs = endMs
		}
		lsSet(sk, String(startMs))
	}

	const elapsed = Math.max(0, endMs - startMs)
	lsSet(endK, String(endMs))
	lsSet(ek, String(elapsed))
	lsSet(mk, String(currentMask))
}

/** Raw elapsed from storage. UI and share should hide this when the timer display pref is off (`isSuiteTimerEnabled`). */
export function readSuiteGameElapsedMs(gameKey, dateKey) {
	if (!gameKey || !dateKey) return null
	const sk = lsGet(suiteTimerStartKey(gameKey, dateKey))
	const endRaw = lsGet(suiteTimerEndKey(gameKey, dateKey))
	if (sk != null && endRaw != null) {
		const startMs = parseInt(sk, 10)
		const endMs = parseInt(endRaw, 10)
		if (Number.isFinite(startMs) && Number.isFinite(endMs)) return Math.max(0, endMs - startMs)
	}
	const raw = lsGet(suiteElapsedKey(gameKey, dateKey))
	if (raw == null) return null
	const n = parseInt(raw, 10)
	return Number.isFinite(n) ? n : null
}

/** Long date line for the puzzle day (PST calendar), e.g. "Wednesday, April 8, 2026". */
export function formatPuzzleDateHeading(dateKey) {
	const parts = String(dateKey).split("-").map(Number)
	if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return dateKey
	const [y, m, d] = parts
	const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0))
	return dt.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		timeZone: "America/Los_Angeles",
	})
}
