/**
 * Hub deep-links to the first unfinished daily puzzle (1=easiest … 3=hardest).
 * Games read `?p=1|2|3` and map to index 0..2.
 */

/** @param {string} [search] defaults to `window.location.search` in browser */
export function parseHubDailyPuzzleParam(search) {
	const s = search ?? (typeof window !== "undefined" ? window.location.search : "")
	try {
		const p = new URLSearchParams(s).get("p")
		if (p == null) return 0
		const n = parseInt(p, 10)
		if (n >= 1 && n <= 3) return n - 1
	} catch {
		// ignore
	}
	return 0
}

/** @param {boolean[]} doneThree — completion flags for puzzles 1..3 */
export function hubHrefFirstUnfinishedThree(href, doneThree) {
	if (!Array.isArray(doneThree) || doneThree.length < 3) return href
	const first = [0, 1, 2].find((i) => !doneThree[i])
	const idx = first !== undefined ? first : 0
	return `${href}${href.includes("?") ? "&" : "?"}p=${idx + 1}`
}

/** @param {(number|null|undefined)[]} attempts — null/undefined = not finished */
export function hubHrefFirstUnfinishedClueless(href, attempts) {
	if (!Array.isArray(attempts) || attempts.length < 3) return href
	const first = [0, 1, 2].find((i) => attempts[i] == null)
	const idx = first !== undefined ? first : 0
	return `${href}${href.includes("?") ? "&" : "?"}p=${idx + 1}`
}
