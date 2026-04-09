/**
 * Wall-clock session timer for suite game completion (same idea as All Ten).
 * Keys use hub `dateKey` (YYYY-MM-DD) + `gameKey`.
 */

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
 * On completion modal open: persist elapsed once, clear start key.
 */
export function finalizeSuiteGameTimerFromModal(gameKey, dateKey) {
	if (!gameKey || !dateKey) return
	const ek = suiteElapsedKey(gameKey, dateKey)
	if (lsGet(ek) != null) return
	const sk = suiteTimerStartKey(gameKey, dateKey)
	const raw = lsGet(sk)
	const end = Date.now()
	const startMs = raw != null ? parseInt(raw, 10) : NaN
	const elapsed = Number.isFinite(startMs) ? Math.max(0, end - startMs) : 0
	lsSet(ek, String(elapsed))
	lsRemove(sk)
}

export function readSuiteGameElapsedMs(gameKey, dateKey) {
	if (!gameKey || !dateKey) return null
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
