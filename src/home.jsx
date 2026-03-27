import React, { useMemo, useState, useRef, useCallback } from 'react'
import BugIcon from './shared/icons/BugIcon.jsx'
import FoldsIcon from './shared/icons/FoldsIcon.jsx'
import ProductilesIcon from './shared/icons/ProductilesIcon.jsx'
import SumTilesIcon from './shared/icons/SumTilesIcon.jsx'
import FactorfallIcon from './shared/icons/FactorfallIcon.jsx'
import CluelessIcon from './shared/icons/CluelessIcon.jsx'
import AllTenIcon from './shared/icons/AllTenIcon.jsx'
import DiceFace from './shared/DiceFace.jsx'

const base = import.meta.env.BASE_URL

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
    return [0, 1, 2].map(i => ['1', '2'].includes(localStorage.getItem(`${gameKey}:${dateKey}:${i}`)))
}

function loadPerfects(gameKey, dateKey) {
    return [0, 1, 2].map(i => localStorage.getItem(`${gameKey}:${dateKey}:${i}`) === '2')
}

function loadMoveCounts(gameKey, dateKey) {
    return [0, 1, 2].map(i => {
        const v = localStorage.getItem(`${gameKey}:${dateKey}:${i}:moves`)
        return v != null ? parseInt(v, 10) : null
    })
}

// ── Single-puzzle games (1 per day) ──────────────────────────────────────────
// Clueless uses bestAttempts (1..99 = CHECKs to complete) and legacy failed; others use '1'/'2'.

function loadSingleBestAttempts(gameKey, dateKey) {
    if (gameKey !== 'clueless') return null
    const v = localStorage.getItem(`clueless:${dateKey}:bestAttempts`)
    if (v == null) return null
    const n = parseInt(v, 10)
    return (n >= 1 && n <= 99) ? n : null
}

function loadSingleFailed(gameKey, dateKey) {
    if (gameKey !== 'clueless') return false
    return localStorage.getItem(`clueless:${dateKey}:failed`) === '1'
}

function loadSingleCompletion(gameKey, dateKey) {
    if (gameKey === 'clueless') return loadSingleBestAttempts(gameKey, dateKey) != null
    return ['1', '2'].includes(localStorage.getItem(`${gameKey}:${dateKey}`))
}

function loadSinglePerfect(gameKey, dateKey) {
    if (gameKey === 'clueless') return loadSingleBestAttempts(gameKey, dateKey) === 1
    return localStorage.getItem(`${gameKey}:${dateKey}`) === '2'
}

// ── Clueless difficulties (Easy/Med/Hard) ────────────────────────────────────

const CLUELESS_DIFFS = ['easy', 'medium', 'hard']

function loadCluelessAttempt(dateKey, diff) {
    const v = localStorage.getItem(`clueless:${dateKey}:${diff}:bestAttempts`)
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

// ── Streaks ───────────────────────────────────────────────────────────────────

const MAX_STREAK_DAYS = 365

/** True if at least one puzzle of this type was completed on that calendar day (PST). */
function dayHasCompletion(gameKey, single, dateKey) {
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
    return (
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            {[0, 1, 2].map(i => {
                const done = completions[i]
                const perfect = perfects && perfects[i]
                const moves = moveCounts && moveCounts[i] != null ? moveCounts[i] : null
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
                            background: done ? '#22c55e' : '#d1d5db',
                            color: '#fff',
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
    const bg = showSuccess ? '#22c55e' : (showFailed ? '#374151' : (done ? '#22c55e' : '#d1d5db'))
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
                color: '#fff',
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
                            background: done ? '#22c55e' : '#d1d5db',
                            color: '#fff',
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
    out += 'Play at ' + playUrl
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
    out += 'Play at ' + playUrl
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
    out += 'Play at ' + playUrl
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
        Object.fromEntries(GAMES.filter(g => !g.single && g.key !== 'clueless').map(g => [g.key, loadCompletions(g.key, dateKey)])),
    [dateKey])
    const perfects = useMemo(() =>
        Object.fromEntries(GAMES.filter(g => !g.single && g.key !== 'clueless').map(g => [g.key, loadPerfects(g.key, dateKey)])),
    [dateKey])
    const moveCounts = useMemo(() =>
        Object.fromEntries(GAMES.filter(g => !g.single && g.key !== 'clueless').map(g => [g.key, loadMoveCounts(g.key, dateKey)])),
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

    const [shareToastKey, setShareToastKey] = useState(null)
    const [showInstructions, setShowInstructions] = useState(false)
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
        const text = key === 'clueless'
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
    }, [cluelessAttempts, completions, perfects, moveCounts, singleCompletions, singlePerfects])

    const hasAnyCompletion = useCallback((key, single) => {
        if (key === 'clueless') return cluelessAttempts.some(a => a != null)
        if (single) return singleCompletions[key]
        return completions[key]?.some(Boolean)
    }, [cluelessAttempts, completions, singleCompletions])

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;900&display=swap');

                :root {
                    --bg: #ffffff;
                    --text: #111111;
                    --muted: #555555;
                    --hairline: #e7e7e7;
                    --tile: #f4f4f4;
                    --tileHover: #eeeeee;
                    --shadow: 0 1px 0 rgba(0,0,0,0.03);
                    --radius: 10px;
                    --maxw: 720px;
                }

                * { box-sizing: border-box; }

                body {
                    margin: 0;
                    background: var(--bg);
                    color: var(--text);
                    font-family: 'Outfit', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                .hp-page {
                    max-width: var(--maxw);
                    margin: 0 auto;
                    padding: 28px 18px 48px;
                }

                .hp-top {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 18px;
                }
                .hp-top-inner {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    min-width: 0;
                }

                .hp-tagline {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 1.4;
                    color: var(--muted);
                    max-width: 480px;
                }

                .hp-date {
                    font-size: 13px;
                    color: var(--muted);
                    letter-spacing: 0.02em;
                    order: 2;
                }

                .hp-h1 {
                    margin: 0;
                    font-size: 28px;
                    line-height: 1.15;
                    font-weight: 900;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                }

                .hp-divider {
                    height: 2px;
                    background: var(--text);
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
                    background: rgba(0,0,0,0.02);
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
                    color: var(--muted);
                    max-width: 52ch;
                }

                @media (max-width: 420px) {
                    .hp-iconTile { width: 84px; height: 84px; }
                    .hp-h1 { font-size: 26px; }
                }

                a.hp-card:focus-visible {
                    outline: 3px solid rgba(0,0,0,0.2);
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
                    background: rgba(15, 23, 42, 0.9);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    cursor: pointer;
                    transition: background 140ms ease;
                }
                .hp-shareBtn:hover { background: rgba(15, 23, 42, 1); }
                .hp-shareBtn:focus-visible {
                    outline: 3px solid rgba(255,255,255,0.5);
                    outline-offset: 2px;
                }

                .toast-panel {
                    max-width: 420px;
                    background: rgba(15, 23, 42, 0.95);
                    color: white;
                    padding: 14px 16px;
                    border-radius: 12px;
                    box-shadow: 0 10px 28px rgba(0,0,0,0.35);
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

                .hp-helpBtn {
                    flex-shrink: 0;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 2px solid var(--text);
                    background: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-weight: 900;
                    font-size: 1.1rem;
                    color: var(--text);
                }
                .hp-helpBtn:hover { background: rgba(0,0,0,0.06); }

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

            <main className="hp-page">
                <header className="hp-top">
                    <div className="hp-top-inner">
                        <h1 className="hp-h1">Daily Puzzles</h1>
                        <p className="hp-tagline">Math and logic puzzles for the breakfast table, the car ride, or the classroom warm-up.</p>
                        <div className="hp-date">{today}</div>
                    </div>
                    <button
                        type="button"
                        className="hp-helpBtn"
                        onClick={() => setShowInstructions(true)}
                        aria-label="Open instructions"
                    >
                        ?
                    </button>
                </header>

                <div className="hp-divider" />

                <section className="hp-list">
                    {GAMES.map(({ key, href, Icon, title, desc, single }) => (
                        <div key={href} className="hp-cardWrapper">
                            <a className="hp-card" href={href}>
                                <div className="hp-iconTile">
                                    <Icon size={56} />
                                </div>
                                <div className="hp-meta">
                                    <div className="hp-cardTitle">{title}</div>
                                    <div className="hp-desc">{desc}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                        {key === 'clueless' ? (
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
                    ))}
                </section>
            </main>

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
                            <p>Each day has three puzzles of each type listed in order from easiest to hardest.</p>
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