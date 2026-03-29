import React, { useMemo, useState, useRef, useCallback } from 'react'
import TopBar from './shared/TopBar.jsx'
import AllTenLinksModal from './shared/AllTenLinksModal.jsx'
import './shared/style.css'
import BugIcon from './shared/icons/BugIcon.jsx'
import FoldsIcon from './shared/icons/FoldsIcon.jsx'
import ProductilesIcon from './shared/icons/ProductilesIcon.jsx'
import SumTilesIcon from './shared/icons/SumTilesIcon.jsx'
import FactorfallIcon from './shared/icons/FactorfallIcon.jsx'
import CluelessIcon from './shared/icons/CluelessIcon.jsx'
import AllTenIcon from './shared/icons/AllTenIcon.jsx'
import DiceFace from './shared/DiceFace.jsx'
import { PUZZLE_SUITE_INK, PUZZLE_SUITE_SURFACE_INCOMPLETE } from '../shared-contracts/chromeUi.js'
import {
    buildAllTenInPuzzleStyleSharePlaintext,
    getAllTenPuzzleNumberDisplayString,
} from '../shared-contracts/allTenSharePlaintext.js'
import { hubHrefFirstUnfinishedClueless, hubHrefFirstUnfinishedThree } from '../shared-contracts/hubEntry.js'

const base = import.meta.env.BASE_URL

/** Avoid crashing the hub if localStorage is blocked (strict privacy / enterprise policy). */
function lsGet(key) {
    try {
        return localStorage.getItem(key)
    } catch {
        return null
    }
}

function getDailyKey() {
    const now = new Date()
    const pst = new Date(now.getTime() - 8 * 60 * 60 * 1000)
    return `${pst.getUTCFullYear()}-${String(pst.getUTCMonth() + 1).padStart(2, '0')}-${String(pst.getUTCDate()).padStart(2, '0')}`
}

function getDateKey(dayOffset) {
    const d = new Date()
    d.setDate(d.getDate() - dayOffset)
    const pst = new Date(d.getTime() - 8 * 60 * 60 * 1000)
    return `${pst.getUTCFullYear()}-${String(pst.getUTCMonth() + 1).padStart(2, '0')}-${String(pst.getUTCDate()).padStart(2, '0')}`
}

// ── Multi-puzzle games (3 per day) ───────────────────────────────────────────

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

// ── Single-puzzle games (1 per day) ──────────────────────────────────────────
// Clueless uses bestAttempts (1..99 = CHECKs to complete) and legacy failed; others use '1'/'2'.

function loadSingleBestAttempts(gameKey, dateKey) {
    if (gameKey !== 'clueless') return null
    const v = lsGet(`clueless:${dateKey}:bestAttempts`)
    if (v == null) return null
    const n = parseInt(v, 10)
    return (n >= 1 && n <= 99) ? n : null
}

function loadSingleFailed(gameKey, dateKey) {
    if (gameKey !== 'clueless') return false
    return lsGet(`clueless:${dateKey}:failed`) === '1'
}

function loadSingleCompletion(gameKey, dateKey) {
    if (gameKey === 'clueless') return loadSingleBestAttempts(gameKey, dateKey) != null
    return ['1', '2'].includes(lsGet(`${gameKey}:${dateKey}`))
}

function loadSinglePerfect(gameKey, dateKey) {
    if (gameKey === 'clueless') return loadSingleBestAttempts(gameKey, dateKey) === 1
    return lsGet(`${gameKey}:${dateKey}`) === '2'
}

// ── Clueless difficulties (Easy/Med/Hard) ────────────────────────────────────

const CLUELESS_DIFFS = ['easy', 'medium', 'hard']

function loadCluelessAttempt(dateKey, diff) {
    const v = lsGet(`clueless:${dateKey}:${diff}:bestAttempts`)
    if (v != null) {
        const n = parseInt(v, 10)
        if (n >= 1 && n <= 99) return n
    }
    // Legacy (pre-difficulty) progress is treated as Medium
    if (diff === 'medium') {
        const legacy = loadSingleBestAttempts('clueless', dateKey)
        if (legacy != null) return legacy
    }
    return null
}

function loadCluelessAttempts(dateKey) {
    return CLUELESS_DIFFS.map(diff => loadCluelessAttempt(dateKey, diff))
}

/** Maps hub puzzle day (YYYY-MM-DD) to All Ten `-targets` localStorage suffix (PST calendar). */
function hubDateKeyToAllTenTargetsKey(dateKey) {
    const parts = dateKey.split('-').map(Number)
    if (parts.length !== 3 || parts.some(Number.isNaN)) return ''
    const [y, m, d] = parts
    const utc = Date.UTC(y, m - 1, d, 12, 0, 0)
    const head = new Date(utc).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }).split(',')[0]?.trim() ?? ''
    return head ? `${head}-targets` : ''
}

/** Count of targets solved today for All Ten (0–10), matching AppState `-targets` JSON. */
function loadAllTenSolvedCountForHubDateKey(dateKey) {
    const k = hubDateKeyToAllTenTargetsKey(dateKey)
    if (!k) return 0
    try {
        const raw = lsGet(k)
        if (!raw) return 0
        const arr = JSON.parse(raw)
        if (!Array.isArray(arr)) return 0
        return arr.filter((t) => t != null && t.solution != null).length
    } catch {
        return 0
    }
}

/** Parsed `-targets` array for the hub puzzle day, or null. */
function loadAllTenTargetsForHubDateKey(dateKey) {
    const k = hubDateKeyToAllTenTargetsKey(dateKey)
    if (!k) return null
    try {
        const raw = lsGet(k)
        if (!raw) return null
        const arr = JSON.parse(raw)
        return Array.isArray(arr) ? arr : null
    } catch {
        return null
    }
}

// ── Streaks ───────────────────────────────────────────────────────────────────

const MAX_STREAK_DAYS = 365

/** True if at least one puzzle of this type was completed on that calendar day (PST). */
function dayHasCompletion(gameKey, single, dateKey) {
    if (gameKey === 'allten') return loadAllTenSolvedCountForHubDateKey(dateKey) > 0
    return gameKey === 'clueless'
        ? loadCluelessAttempts(dateKey).some(a => a != null)
        : single
            ? loadSingleCompletion(gameKey, dateKey)
            : loadCompletions(gameKey, dateKey).some(Boolean)
}

/** Consecutive days with a completion, counting backward from today. Includes today when played today. */
function getStreak(gameKey, single = false) {
    const hasToday = dayHasCompletion(gameKey, single, getDateKey(0))
    const startOffset = hasToday ? 0 : 1
    let count = 0
    for (let dayOffset = startOffset; dayOffset <= MAX_STREAK_DAYS; dayOffset++) {
        const dateKey = getDateKey(dayOffset)
        if (dayHasCompletion(gameKey, single, dateKey)) count++
        else break
    }
    return count
}

// ── PuzzleBoxes (multi-puzzle games) ─────────────────────────────────────────

const TILE_GAMES = new Set(['sumtiles', 'productiles'])
const DIFF_LABELS = ['Easy', 'Med', 'Hard']

function PuzzleBoxes({ gameKey, completions, perfects, moveCounts }) {
    const isTileGame = TILE_GAMES.has(gameKey)
    const c = completions ?? [false, false, false]
    const p = perfects ?? [false, false, false]
    const mc = moveCounts ?? [null, null, null]
    return (
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            {[0, 1, 2].map(i => {
                const done = c[i]
                const perfect = p[i]
                const moves = mc[i] != null ? mc[i] : null
                const content = !done
                    ? <DiceFace count={i + 1} size={20} />
                    : isTileGame
                        ? (moves != null ? String(Math.min(moves, 99)) : '✓')
                        : (perfect ? '★' : '✓')
                return (
                    <div
                        key={i}
                        style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: done ? '#22c55e' : PUZZLE_SUITE_SURFACE_INCOMPLETE,
                            color: done ? '#fff' : PUZZLE_SUITE_INK,
                            fontWeight: 900,
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s',
                        }}
                    >
                        {content}
                    </div>
                )
            })}
        </div>
    )
}

// ── SinglePuzzleBox (one-per-day games like Clueless) ────────────────────────
// Clueless: attempts (1..99) = CHECKs to complete; legacy failed. Others: completed + perfect.

function SinglePuzzleBox({ completed, perfect, attempts, failed }) {
    const useAttempts = attempts != null || failed
    const done = useAttempts ? (attempts != null) : completed
    const showSuccess = useAttempts && attempts != null
    const showFailed = useAttempts && failed && attempts == null
    const bg = showSuccess ? '#22c55e' : (showFailed ? '#374151' : (done ? '#22c55e' : PUZZLE_SUITE_SURFACE_INCOMPLETE))
    const content = useAttempts
        ? (attempts != null ? (attempts === 1 ? '★' : String(Math.min(attempts, 99))) : (failed ? '•' : '1'))
        : (completed ? (perfect ? '★' : '✓') : '1')
    return (
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: bg,
                color: (showSuccess || showFailed || done) ? '#fff' : PUZZLE_SUITE_INK,
                fontWeight: 900,
                fontSize: '1.06rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
            }}>
                {content}
            </div>
        </div>
    )
}

function CluelessBoxes({ attempts }) {
    return (
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            {[0, 1, 2].map(i => {
                const a = attempts?.[i] ?? null
                const done = a != null
                const content = !done ? <DiceFace count={i + 1} size={20} /> : (a === 1 ? '★' : String(Math.min(a, 99)))
                return (
                    <div
                        key={i}
                        style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: done ? '#22c55e' : PUZZLE_SUITE_SURFACE_INCOMPLETE,
                            color: done ? '#fff' : PUZZLE_SUITE_INK,
                            fontWeight: 900,
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s',
                        }}
                    >
                        {content}
                    </div>
                )
            })}
        </div>
    )
}

// ── Share text builders ───────────────────────────────────────────────────────

function buildShareText(key, title, href, completions, perfects, moveCounts) {
    const playUrl = new URL(href, window.location.origin).href
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
    out += playUrl
    return out
}

function buildSingleShareText(title, href, completed, perfect) {
    const playUrl = new URL(href, window.location.origin).href
    let out = title.toUpperCase() + '\n'
    if (completed) {
        const star = perfect ? ' (⭐ First try!)' : ''
        out += `🟩${star}\n`
    } else {
        out += `⬜\n`
    }
    out += playUrl
    return out
}

function buildCluelessShareText(title, href, attempts) {
    const playUrl = new URL(href, window.location.origin).href
    const labels = ['Easy', 'Med', 'Hard']
    let out = title.toUpperCase() + '\n'
    for (let i = 0; i < 3; i++) {
        const a = attempts?.[i] ?? null
        if (a != null) {
            const score = a === 1 ? '★' : String(Math.min(a, 99))
            out += `${labels[i]}   🟩 ${score}\n`
        } else {
            out += `${labels[i]}   ⬜\n`
        }
    }
    out += playUrl
    return out
}

function ShareIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="8" r="2.5" />
            <circle cx="18" cy="16" r="2.5" />
            <path d="M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8" />
        </svg>
    )
}

// ── Game definitions ──────────────────────────────────────────────────────────
// single: true = one puzzle per day (uses clueless:YYYY-MM-DD storage key pattern)

const GAMES = [
    { key: 'allten',      href: `${base}puzzlegames/allten/`,      Icon: AllTenIcon,       title: 'All Ten',     desc: 'Use the given numbers to make each target from 1 to 10.' },
    { key: 'scurry',      href: `${base}puzzlegames/scurry/`,      Icon: BugIcon,         title: 'Scurry',      desc: 'Place bugs to fill every highlighted square.' },
    { key: 'clueless',    href: `${base}puzzlegames/clueless/`,     Icon: CluelessIcon,    title: 'Clueless',    desc: 'Fill in the missing letters to complete six crossing words.', single: false },
    { key: 'folds',       href: `${base}puzzlegames/folds/`,       Icon: FoldsIcon,       title: 'Folds',       desc: 'Reflect triangles to match the target pattern.' },
    { key: 'factorfall',  href: `${base}puzzlegames/factorfall/`,  Icon: FactorfallIcon,  title: 'Factorfall',  desc: 'Drop factors into the grid. Clear same-color groups that multiply to the target.' },
    { key: 'sumtiles',    href: `${base}puzzlegames/sumtiles/`,    Icon: SumTilesIcon,    title: 'Sum Tiles',   desc: 'Slide tiles so every row and column hits its sum.' },
    { key: 'productiles', href: `${base}puzzlegames/productiles/`, Icon: ProductilesIcon, title: 'Productiles', desc: 'Slide tiles so every row and column hits its product.' },
]

const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
})

const TOAST_MS = 2000

export default function Home() {
    const dateKey = useMemo(() => getDailyKey(), [])

    const completions = useMemo(() =>
        Object.fromEntries(GAMES.filter(g => !g.single && g.key !== 'clueless' && g.key !== 'allten').map(g => [g.key, loadCompletions(g.key, dateKey)])),
    [dateKey])
    const perfects = useMemo(() =>
        Object.fromEntries(GAMES.filter(g => !g.single && g.key !== 'clueless' && g.key !== 'allten').map(g => [g.key, loadPerfects(g.key, dateKey)])),
    [dateKey])
    const moveCounts = useMemo(() =>
        Object.fromEntries(GAMES.filter(g => !g.single && g.key !== 'clueless' && g.key !== 'allten').map(g => [g.key, loadMoveCounts(g.key, dateKey)])),
    [dateKey])

    const cluelessAttempts = useMemo(() => loadCluelessAttempts(dateKey), [dateKey])

    const singleCompletions = useMemo(() =>
        Object.fromEntries(GAMES.filter(g => g.single).map(g => [g.key, loadSingleCompletion(g.key, dateKey)])),
    [dateKey])
    const singlePerfects = useMemo(() =>
        Object.fromEntries(GAMES.filter(g => g.single).map(g => [g.key, loadSinglePerfect(g.key, dateKey)])),
    [dateKey])
    const singleAttempts = useMemo(() =>
        Object.fromEntries(GAMES.filter(g => g.single).map(g => [g.key, loadSingleBestAttempts(g.key, dateKey)])),
    [dateKey])
    const singleFailed = useMemo(() =>
        Object.fromEntries(GAMES.filter(g => g.single).map(g => [g.key, loadSingleFailed(g.key, dateKey)])),
    [dateKey])

    const [streakRefresh, setStreakRefresh] = useState(0)
    const streaks = useMemo(() =>
        Object.fromEntries(GAMES.map(g => [g.key, getStreak(g.key, !!g.single)])),
    [dateKey, streakRefresh])

    const allTenTodayCount = useMemo(() => loadAllTenSolvedCountForHubDateKey(dateKey), [dateKey, streakRefresh])

    const [shareToastKey, setShareToastKey] = useState(null)
    const [showInstructions, setShowInstructions] = useState(false)
    const [showLinks, setShowLinks] = useState(false)
    const toastTimeoutRef = useRef(null)
    React.useEffect(() => () => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }, [])

    React.useEffect(() => {
        const bumpStreaks = () => setStreakRefresh(n => n + 1)
        const onVisible = () => {
            if (document.visibilityState === 'visible') bumpStreaks()
        }
        const onPageShow = (e) => {
            if (e.persisted) bumpStreaks()
        }
        document.addEventListener('visibilitychange', onVisible)
        window.addEventListener('pageshow', onPageShow)
        window.addEventListener('storage', bumpStreaks)
        return () => {
            document.removeEventListener('visibilitychange', onVisible)
            window.removeEventListener('pageshow', onPageShow)
            window.removeEventListener('storage', bumpStreaks)
        }
    }, [])

    const handleShare = useCallback((e, key) => {
        e.preventDefault()
        e.stopPropagation()
        const game = GAMES.find(g => g.key === key)
        if (!game) return
        const text = key === 'allten'
            ? (() => {
                const targets = loadAllTenTargetsForHubDateKey(dateKey)
                const now = new Date()
                if (targets && targets.length) {
                    return buildAllTenInPuzzleStyleSharePlaintext(targets, now)
                }
                return `All Ten #${getAllTenPuzzleNumberDisplayString(now)}\n${allTenTodayCount}/10\n`
            })()
            : key === 'clueless'
            ? buildCluelessShareText(game.title, game.href, cluelessAttempts)
            : game.single
                ? buildSingleShareText(game.title, game.href, singleCompletions[key], singlePerfects[key])
                : buildShareText(key, game.title, game.href, completions[key], perfects[key], moveCounts[key])
        navigator.clipboard.writeText(text).then(() => {
            if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
            setShareToastKey(key)
            toastTimeoutRef.current = setTimeout(() => {
                setShareToastKey(null)
                toastTimeoutRef.current = null
            }, TOAST_MS)
        })
    }, [dateKey, allTenTodayCount, cluelessAttempts, completions, perfects, moveCounts, singleCompletions, singlePerfects])

    const hasAnyCompletion = useCallback((key, single) => {
        if (key === 'allten') return allTenTodayCount > 0
        if (key === 'clueless') return cluelessAttempts.some(a => a != null)
        if (single) return singleCompletions[key]
        return completions[key]?.some(Boolean)
    }, [allTenTodayCount, cluelessAttempts, completions, singleCompletions])

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;900&display=swap');

                :root {
                    --bg: #ffffff;
                    --text: var(--puzzle-ink);
                    --muted: var(--puzzle-ink-muted);
                    --hairline: #e7e7e7;
                    --tile: #f4f4f4;
                    --tileHover: #eeeeee;
                    --shadow: 0 1px 0 rgba(24, 53, 94, 0.06);
                    --radius: 10px;
                }

                * { box-sizing: border-box; }

                /* Hub uses shared style.css for TopBar/modals; allow full width (games keep #root capped). */
                #root {
                    max-width: none;
                    width: 100%;
                }

                body {
                    margin: 0;
                    background: var(--bg);
                    color: var(--text);
                    font-family: 'Outfit', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                .hp-shell {
                    min-height: 100dvh;
                    display: flex;
                    flex-direction: column;
                }

                /* Same column as TopBar inner + .game-container (500px cap, 20px sides). */
                .hp-page {
                    flex: 1;
                    width: min(95vw, 500px);
                    max-width: min(95vw, 500px);
                    margin: 0 auto;
                    box-sizing: border-box;
                    padding: 18px 20px 48px;
                }

                .hp-intro {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 18px;
                }

                .hp-tagline {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 1.4;
                    color: var(--puzzle-ink-soft);
                    max-width: 52ch;
                }

                .hp-date {
                    font-size: 13px;
                    color: var(--puzzle-ink-muted);
                    letter-spacing: 0.02em;
                }

                .hp-divider {
                    height: 2px;
                    background: var(--puzzle-grid-line);
                    margin: 18px 0;
                }

                .hp-list {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 14px;
                }

                a.hp-card {
                    display: flex;
                    gap: 16px;
                    text-decoration: none;
                    color: inherit;
                    padding: 12px;
                    border-radius: var(--radius);
                    transition: background 140ms ease, transform 140ms ease;
                }

                a.hp-card:hover {
                    background: rgba(24, 53, 94, 0.06);
                    transform: translateY(-1px);
                }

                a.hp-card:active { transform: translateY(0px); }

                .hp-iconTile {
                    width: 96px;
                    height: 96px;
                    border-radius: var(--radius);
                    display: grid;
                    place-items: center;
                    flex: 0 0 auto;
                }

                .hp-meta {
                    min-width: 0;
                    padding-top: 4px;
                }

                .hp-cardTitle {
                    font-size: 16px;
                    font-weight: 900;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-bottom: 6px;
                }

                .hp-desc {
                    font-size: 14px;
                    line-height: 1.35;
                    color: var(--puzzle-ink-soft);
                    max-width: 52ch;
                }

                @media (max-width: 420px) {
                    .hp-iconTile { width: 84px; height: 84px; }
                }

                a.hp-card:focus-visible {
                    outline: 3px solid rgba(24, 53, 94, 0.35);
                    outline-offset: 3px;
                }

                .hp-cardWrapper {
                    display: flex;
                    align-items: stretch;
                    position: relative;
                }
                .hp-cardWrapper .hp-card { flex: 1; min-width: 0; }

                .hp-shareBtn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    margin: 12px;
                    align-self: center;
                    background: var(--puzzle-ink);
                    color: var(--white);
                    border: none;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    cursor: pointer;
                    transition: background 140ms ease, filter 140ms ease;
                }
                .hp-shareBtn:hover { filter: brightness(0.92); }
                .hp-shareBtn:focus-visible {
                    outline: 3px solid rgba(24, 53, 94, 0.45);
                    outline-offset: 2px;
                }

                .toast-panel {
                    max-width: 420px;
                    background: rgba(24, 53, 94, 0.95);
                    color: var(--white);
                    padding: 14px 16px;
                    border-radius: 12px;
                    box-shadow: 0 10px 28px rgba(24, 53, 94, 0.25);
                    z-index: 50;
                }
                .toast-text { font-size: 0.9rem; line-height: 1.4; }
                .hp-shareToast.toast-panel {
                    position: absolute;
                    bottom: 100%;
                    right: 0;
                    margin-bottom: 6px;
                    left: auto;
                    transform: none;
                }
                .hp-shareToast .toast-text { font-size: 0.85rem; }

                .hp-instructions-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 100;
                    padding: 40px 20px;
                    overflow-y: auto;
                }
                .hp-modal-content {
                    width: 100%;
                    max-width: 500px;
                    padding: 40px 20px;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }
                .hp-modal-close {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    font-size: 22px;
                    font-weight: 900;
                    cursor: pointer;
                }
                .hp-modal-title { margin-bottom: 0.75rem; text-align: center; }
                .hp-modal-icons {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 1.25rem;
                    flex-wrap: wrap;
                }
                .hp-modal-body { font-size: 1rem; line-height: 1.6; }
                .hp-modal-body p { margin: 0 0 1rem; }
                .hp-modal-body ul { margin: 0 0 1rem; padding-left: 1.25rem; }
                .hp-modal-body li { margin-bottom: 0.5rem; }
            `}</style>

            <div className="hp-shell">
                <div style={{ flexShrink: 0, width: '100%' }}>
                    <TopBar
                        title="PUZZLES"
                        showHome={false}
                        showStats={false}
                        onCube={() => setShowLinks(true)}
                        onHelp={() => setShowInstructions(true)}
                    />
                </div>

                <main className="hp-page">
                    <header className="hp-intro">
                        <p className="hp-tagline">
                            Daily puzzles for the breakfast table, the car ride, or the classroom warm-up.
                        </p>
                        <div className="hp-date">{today}</div>
                    </header>

                    <div className="hp-divider" />

                    <section className="hp-list">
                    {GAMES.map(({ key, href, Icon, title, desc, single }) => {
                        const cardHref =
                            key === 'allten'
                                ? href
                                : single
                                  ? href
                                  : key === 'clueless'
                                    ? hubHrefFirstUnfinishedClueless(href, cluelessAttempts)
                                    : hubHrefFirstUnfinishedThree(href, completions[key])
                        return (
                        <div key={href} className="hp-cardWrapper">
                            <a className="hp-card" href={cardHref}>
                                <div className="hp-iconTile">
                                    <Icon size={56} />
                                </div>
                                <div className="hp-meta">
                                    <div className="hp-cardTitle">{title}</div>
                                    <div className="hp-desc">{desc}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                        {key === 'allten' ? (
                                            allTenTodayCount > 0 ? (
                                                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                                                    <div
                                                        style={{
                                                            width: '28px',
                                                            height: '28px',
                                                            borderRadius: '6px',
                                                            background: allTenTodayCount >= 10 ? '#22c55e' : PUZZLE_SUITE_SURFACE_INCOMPLETE,
                                                            color: allTenTodayCount >= 10 ? '#fff' : PUZZLE_SUITE_INK,
                                                            fontWeight: 900,
                                                            fontSize: '1rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                        aria-label={`${allTenTodayCount} of 10 targets solved`}
                                                    >
                                                        {allTenTodayCount}
                                                    </div>
                                                </div>
                                            ) : null
                                        ) : key === 'clueless' ? (
                                            <CluelessBoxes attempts={cluelessAttempts} />
                                        ) : single ? (
                                            <SinglePuzzleBox
                                                completed={singleCompletions[key]}
                                                perfect={singlePerfects[key]}
                                                attempts={singleAttempts[key]}
                                                failed={singleFailed[key]}
                                            />
                                        ) : (
                                            <PuzzleBoxes
                                                gameKey={key}
                                                completions={completions[key]}
                                                perfects={perfects[key]}
                                                moveCounts={moveCounts[key]}
                                            />
                                        )}
                                        {streaks[key] > 0 && (
                                            <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.35 }}>
                                                Streak: {streaks[key]}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </a>
                            {hasAnyCompletion(key, single) && (
                                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {shareToastKey === key && (
                                        <div className="toast-panel hp-shareToast">
                                            <div className="toast-text">RESULTS COPIED TO CLIPBOARD</div>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className="hp-shareBtn"
                                        onClick={(e) => handleShare(e, key)}
                                        aria-label="Share results"
                                    >
                                        <ShareIcon size={18} />
                                        SHARE
                                    </button>
                                </div>
                            )}
                        </div>
                        )
                    })}
                    </section>
                </main>
            </div>

            <AllTenLinksModal show={showLinks} onClose={() => setShowLinks(false)} />

            {showInstructions && (
                <div className="hp-instructions-overlay" role="dialog" aria-modal="true" aria-label="How progress works">
                    <div className="hp-modal-content">
                        <button type="button" className="hp-modal-close" onClick={() => setShowInstructions(false)} aria-label="Close">✕</button>
                        <h2 className="hp-modal-title" style={{ fontSize: '1.5rem', fontWeight: 900 }}>Puzzle Info</h2>
                        <div className="hp-modal-icons" aria-hidden>
                            <BugIcon size={48} />
                            <FoldsIcon size={48} />
                            <SumTilesIcon size={48} />
                        </div>
                        <div className="hp-modal-body">
                            <p>Each day has puzzles of each type listed in order from easiest to hardest.</p>
                            <p><strong>Progress</strong> boxes show how you did on today&apos;s puzzles:</p>
                            <ul>
                                <li><strong>Green</strong> indicates completed puzzles. </li>
                                <li><strong>Numbers</strong> in completed puzzles indicate moves or guesses used.</li>
                                <li><strong>Stars</strong> in unnumbered puzzles indicate solves made without using undo or reset.</li>
                            </ul>
                            <p><strong>Share</strong> copies your results to the clipboard.</p>
                            <p><strong>Streaks</strong> for each puzzle type are maintained by completing at least one puzzle daily.</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}