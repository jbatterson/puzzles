/**
 * Aggregate PLAYED / STREAK / STARS for suite games that store progress in localStorage.
 * Logic mirrors `src/home.jsx` streak and completion rules.
 */

import { GAME_KEYS } from './gameChrome.js'

const MAX_STREAK_DAYS = 365

const CLUELESS_DIFFS = ['easy', 'medium', 'hard']

function lsGet(key) {
    try {
        return localStorage.getItem(key)
    } catch {
        return null
    }
}

/** PST calendar date key YYYY-MM-DD, matching games + hub. */
export function getPstDateKeyFromOffset(dayOffset) {
    const d = new Date()
    d.setDate(d.getDate() - dayOffset)
    const pst = new Date(d.getTime() - 8 * 60 * 60 * 1000)
    return `${pst.getUTCFullYear()}-${String(pst.getUTCMonth() + 1).padStart(2, '0')}-${String(pst.getUTCDate()).padStart(2, '0')}`
}

function loadCluelessAttempt(dateKey, diff) {
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

function loadCluelessAttempts(dateKey) {
    return CLUELESS_DIFFS.map(diff => loadCluelessAttempt(dateKey, diff))
}

function dayHasMultiCompletion(gameKey, dateKey) {
    for (let i = 0; i < 3; i++) {
        const v = lsGet(`${gameKey}:${dateKey}:${i}`)
        if (v === '1' || v === '2') return true
    }
    return false
}

function dayHasCluelessCompletion(dateKey) {
    return loadCluelessAttempts(dateKey).some(a => a != null)
}

function dayHasCompletion(gameKey, dateKey) {
    if (gameKey === GAME_KEYS.CLUELESS) return dayHasCluelessCompletion(dateKey)
    return dayHasMultiCompletion(gameKey, dateKey)
}

function getStreak(gameKey) {
    const hasToday = dayHasCompletion(gameKey, getPstDateKeyFromOffset(0))
    const startOffset = hasToday ? 0 : 1
    let count = 0
    for (let dayOffset = startOffset; dayOffset <= MAX_STREAK_DAYS; dayOffset++) {
        const dateKey = getPstDateKeyFromOffset(dayOffset)
        if (dayHasCompletion(gameKey, dateKey)) count++
        else break
    }
    return count
}

function aggregateMultiGameFromStorage(gameKey) {
    const playedDates = new Set()
    let stars = 0
    const escaped = gameKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`^${escaped}:(\\d{4}-\\d{2}-\\d{2}):([0-2])$`)
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i)
            if (!k) continue
            const m = k.match(re)
            if (!m) continue
            const date = m[1]
            const v = lsGet(k)
            if (v === '1' || v === '2') {
                playedDates.add(date)
                if (v === '2') stars++
            }
        }
    } catch {
        // ignore
    }
    return { played: playedDates.size, stars }
}

function aggregateTileMovesFromStorage(gameKey) {
    const playedDates = new Set()
    const totals = [0, 0, 0]
    const counts = [0, 0, 0]
    const escaped = gameKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`^${escaped}:(\\d{4}-\\d{2}-\\d{2}):([0-2]):moves$`)
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i)
            if (!k) continue
            const m = k.match(re)
            if (!m) continue
            const date = m[1]
            const idxStr = m[2]
            const idx = parseInt(idxStr, 10)
            const v = lsGet(k)
            if (v == null) continue
            const moves = parseInt(v, 10)
            if (!Number.isFinite(moves) || moves <= 0) continue
            if (idx < 0 || idx > 2) continue
            playedDates.add(date)
            totals[idx] += moves
            counts[idx] += 1
        }
    } catch {
        // ignore
    }
    const parts = totals.map((sum, i) => {
        const c = counts[i]
        if (!c) return '–'
        return String(Math.round(sum / c))
    })
    return {
        played: playedDates.size,
        avgMoves: parts.join('|'),
    }
}

function collectCluelessDateKeysFromStorage() {
    const dates = new Set()
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i)
            if (!k || !k.startsWith('clueless:')) continue
            const m = k.match(/^clueless:(\d{4}-\d{2}-\d{2})/)
            if (m) dates.add(m[1])
        }
    } catch {
        // ignore
    }
    return dates
}

function aggregateCluelessFromStorage() {
    const dates = collectCluelessDateKeysFromStorage()
    let played = 0
    let stars = 0
    for (const dateKey of dates) {
        const attempts = loadCluelessAttempts(dateKey)
        if (!attempts.some(a => a != null)) continue
        played++
        for (const a of attempts) {
            if (a === 1) stars++
        }
    }
    return { played, stars }
}

/**
 * @param {string} gameKey One of `GAME_KEYS` for suite games.
 * @returns {{ played: number, streak: number, stars: number, avgMoves?: string }}
 */
export function computeSimpleGameStats(gameKey) {
    if (gameKey === GAME_KEYS.CLUELESS) {
        const { played, stars } = aggregateCluelessFromStorage()
        return { played, streak: getStreak(gameKey), stars }
    }
    if (
        gameKey === GAME_KEYS.SCURRY
        || gameKey === GAME_KEYS.FOLDS
        || gameKey === GAME_KEYS.FACTORFALL
        || gameKey === GAME_KEYS.HONEYCOMBS
    ) {
        const { played, stars } = aggregateMultiGameFromStorage(gameKey)
        return { played, streak: getStreak(gameKey), stars }
    }
    if (gameKey === GAME_KEYS.SUMTILES || gameKey === GAME_KEYS.PRODUCTILES) {
        const { played, stars } = aggregateMultiGameFromStorage(gameKey)
        const { avgMoves } = aggregateTileMovesFromStorage(gameKey)
        return { played, streak: getStreak(gameKey), stars, avgMoves }
    }
    return { played: 0, streak: 0, stars: 0 }
}
