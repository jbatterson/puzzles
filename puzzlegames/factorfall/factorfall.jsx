import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import puzzleData from './puzzles.js'
import TopBar from '../../src/shared/TopBar.jsx'
import DiceFace from '../../src/shared/DiceFace.jsx'
import SharedModalShell from '../../src/shared/SharedModalShell.jsx'
import SimpleGameStatsModal from '../../src/shared/SimpleGameStatsModal.jsx'
import SuiteGameCompletionModal from '../../src/shared/SuiteGameCompletionModal.jsx'
import AllTenLinksModal from '../../src/shared/AllTenLinksModal.jsx'
import useInstructionsGate from '../../src/shared/useInstructionsGate.js'
import { MODAL_INTENTS } from '../../shared-contracts/modalIntents.js'
import { GAME_KEYS, getGameChrome } from '../../shared-contracts/gameChrome.js'
import { PUZZLE_SUITE_INK, PUZZLE_SUITE_SURFACE_INCOMPLETE } from '../../shared-contracts/chromeUi.js'
import { CTA_LABELS } from '../../shared-contracts/ctaLabels.js'
import { persistHubDailySlot, resolveHubDailySlotOnLoad } from '../../shared-contracts/hubEntry.js'
import { getInitialTutorialNav, persistTutorialResumeState } from '../../shared-contracts/tutorialResume.js'
import { hasShareableHubProgress } from '../../shared-contracts/hubSharePlaintext.js'
import GameShareNavButton from '../../src/shared/GameShareNavButton.jsx'
import FactorfallIcon from '../../src/shared/icons/FactorfallIcon.jsx'
import { buildTierRoster, formatCurateClipboard } from '../../src/shared/curateRoster.js'
import { useCurateModeFromRoster } from '../../src/shared/useCurateMode.js'
import { CurateCopyToast, CurateLevelNav } from '../../src/shared/CurateModeChrome.jsx'
import { PostSolvePrimaryButton, PostSolvePrimaryLink } from '../../src/shared/PostSolvePrimaryCta.jsx'

/** Suite modal: allow last clear animation (highlights, pops, floating “=N” scores) to finish. */
const FACTORFALL_SUITE_MODAL_AFTER_WIN_MS = 1800

// ── Constants ────────────────────────────────────────────────────────────────
const COLS = 5, ROWS = 5
const BASE_CELL = 72   
const BALL_RADIUS_RATIO = 0.37
/** Interior rules — same as Scurry `.grid-line` / `:root --puzzle-grid-line` */
const GRID_COLOR = 'rgba(26, 61, 91, 0.14)'
const GRID_LINE_W = 1.5
const BORDER_W = 2
const BORDER_COLOR = PUZZLE_SUITE_INK
const HIGHLIGHT_COLOR = '#fff0cb'
/** Same as Productiles/Sum Tiles `.target.solved` in shared/style.css */
const MATCH_POPUP_COLOR = '#6b9b3b'
const GRAVITY = 1.2, TERMINAL_VEL = 16

// ── Daily puzzle selection ───────────────────────────────────────────────────
function getDailyKey() {
    const now = new Date()
    const pst = new Date(now.getTime() - 8 * 60 * 60 * 1000)
    return `${pst.getUTCFullYear()}-${String(pst.getUTCMonth() + 1).padStart(2, '0')}-${String(pst.getUTCDate()).padStart(2, '0')}`
}

function getDateLabel() {
    const now = new Date()
    const pst = new Date(now.getTime() - 8 * 60 * 60 * 1000)
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(pst)
}

function getDayIndex(key) {
    const [y, m, d] = key.split('-').map(Number)
    const date = new Date(Date.UTC(y, m - 1, d))
    const epoch = new Date(Date.UTC(2020, 0, 1))
    return Math.floor((date - epoch) / 86400000)
}

function getDailyPuzzles() {
    const key = getDailyKey()
    const dayIndex = getDayIndex(key)
    const easy   = puzzleData.easy   || []
    const medium = puzzleData.medium || []
    const hard   = puzzleData.hard   || []
    return {
        puzzles: [
            easy[dayIndex % easy.length],
            medium[dayIndex % medium.length],
            hard[dayIndex % hard.length],
        ],
        key,
    }
}

// ── Completion tracking ──────────────────────────────────────────────────────
function loadCompletions(dateKey) {
    return [0, 1, 2].map(i => ['1', '2'].includes(localStorage.getItem(`factorfall:${dateKey}:${i}`)))
}
function loadPerfects(dateKey) {
    return [0, 1, 2].map(i => localStorage.getItem(`factorfall:${dateKey}:${i}`) === '2')
}
function markComplete(dateKey, idx, isPerfect) {
    const key = `factorfall:${dateKey}:${idx}`
    const existing = localStorage.getItem(key)
    if (existing === '1' || existing === '2') return
    localStorage.setItem(key, isPerfect ? '2' : '1')
}

// ── In-progress game state (daily only) ─────────────────────────────────────
const GAME_STATE_VERSION = 1

function storageKeyGameState(dateKey, puzzleIndex) {
    return `factorfall:${dateKey}:${puzzleIndex}:gameState`
}

function puzzleFingerprint(p) {
    const boardStr = p.board.map(col => col.map(b => `${b.v}:${b.c}`).join(',')).join('|')
    const queueStr = p.queue.map(b => `${b.v}:${b.c}`).join(',')
    return `${p.target}:${boardStr}:${queueStr}`
}

function slimGrid(grid) {
    return grid.map(col => col.map(b => ({ v: b.val, c: b.color })))
}

function gridFromSlim(cols, cs) {
    const canvasH = (ROWS + 1) * cs
    return cols.map((col, c) =>
        col.map((b, r) => ({
            val: b.v,
            color: b.c,
            x: c * cs + cs / 2,
            y: canvasH - (r * cs + cs / 2),
            targetY: canvasH - (r * cs + cs / 2),
            vy: 0,
        }))
    )
}

function relayoutBallPositions(gs) {
    const cs = gs.cellSize
    const canvasH = (ROWS + 1) * cs
    for (let c = 0; c < COLS; c++) {
        if (!Array.isArray(gs.grid[c])) continue
        gs.grid[c].forEach((b, r) => {
            b.x = c * cs + cs / 2
            const ty = canvasH - (r * cs + cs / 2)
            b.targetY = ty
            b.y = ty
            b.vy = 0
        })
    }
    if (gs.pendingBall && gs.queue.length > 0 && gs.gameState === 'READY') {
        const b = gs.queue[0]
        gs.pendingBall.val = b.v
        gs.pendingBall.color = b.c
        gs.pendingBall.y = cs / 2
        gs.pendingBall.vy = 0
        gs.pendingBall.x = gs.mouseX || (COLS * cs / 2)
        gs.pendingBall.targetY = 0
    }
}

function clearGameState(dateKey, puzzleIndex) {
    try {
        localStorage.removeItem(storageKeyGameState(dateKey, puzzleIndex))
    } catch {
        // ignore
    }
}

function saveGameState(dateKey, puzzleIndex, puzzle, gs, usedUndoOrReset, ui) {
    try {
        if (!puzzle) return
        const payload = {
            version: GAME_STATE_VERSION,
            fingerprint: puzzleFingerprint(puzzle),
            target: gs.target,
            grid: slimGrid(gs.grid),
            queue: gs.queue.map(b => ({ v: b.v, c: b.c })),
            gameState: gs.gameState,
            mouseX: gs.mouseX,
            score: gs.score,
            history: gs.history.map(h => ({
                grid: slimGrid(h.grid),
                queue: h.queue.map(b => ({ v: b.v, c: b.c })),
                score: h.score,
            })),
            usedUndoOrReset,
            ui: {
                boardCleared: ui.boardCleared,
                gridFull: ui.gridFull,
                outOfBalls: ui.outOfBalls,
            },
        }
        localStorage.setItem(storageKeyGameState(dateKey, puzzleIndex), JSON.stringify(payload))
    } catch {
        // ignore
    }
}

function loadGameState(dateKey, puzzleIndex, puzzle) {
    try {
        const raw = localStorage.getItem(storageKeyGameState(dateKey, puzzleIndex))
        if (!raw) return null
        const d = JSON.parse(raw)
        if (!d || d.version !== GAME_STATE_VERSION) return null
        if (d.fingerprint !== puzzleFingerprint(puzzle) || d.target !== puzzle.target) return null
        if (!Array.isArray(d.grid) || d.grid.length !== COLS) return null
        for (let c = 0; c < COLS; c++) {
            const col = d.grid[c]
            if (!Array.isArray(col) || col.length > ROWS) return null
            for (const b of col) {
                if (typeof b?.v !== 'number' || typeof b?.c !== 'string') return null
            }
        }
        if (!Array.isArray(d.queue) || !d.queue.every(b => typeof b?.v === 'number' && typeof b?.c === 'string')) return null
        if (d.gameState !== 'READY' && d.gameState !== 'GAMEOVER') return null
        if (!d.ui || typeof d.ui.boardCleared !== 'boolean' || typeof d.ui.gridFull !== 'boolean' || typeof d.ui.outOfBalls !== 'boolean') return null
        if (!Array.isArray(d.history)) return null
        for (const h of d.history) {
            if (!Array.isArray(h.grid) || h.grid.length !== COLS) return null
            for (let c = 0; c < COLS; c++) {
                const col = h.grid[c]
                if (!Array.isArray(col) || col.length > ROWS) return null
                for (const b of col) {
                    if (typeof b?.v !== 'number' || typeof b?.c !== 'string') return null
                }
            }
            if (!Array.isArray(h.queue) || typeof h.score !== 'number') return null
            for (const b of h.queue) {
                if (typeof b?.v !== 'number' || typeof b?.c !== 'string') return null
            }
        }
        return d
    } catch {
        return null
    }
}

// ── Puzzle boxes ─────────────────────────────────────────────────────────────
function PuzzleBoxes({ current, completions, perfects, onChange }) {
    return (
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {[0, 1, 2].map(i => (
                <button key={i} onClick={() => onChange(i)} style={{
                    width: '28px', height: '28px', borderRadius: '6px', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: completions[i] ? '#6b9b3b' : current === i ? PUZZLE_SUITE_INK : PUZZLE_SUITE_SURFACE_INCOMPLETE,
                    color: completions[i] || current === i ? '#fff' : PUZZLE_SUITE_INK,
                    fontWeight: 900, fontSize: '1.06rem', cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: current === i ? 'scale(1.1)' : 'scale(1)',
                    transformOrigin: 'center center',
                }}>
                    {completions[i] ? (perfects && perfects[i] ? '★' : '✓') : <DiceFace count={i + 1} size={20} />}
                </button>
            ))}
        </div>
    )
}

// ── Queue preview (horizontal row above the board) ───────────────────────────
function QueuePreview({ queue }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '5px', padding: '6px 0', height: '10px',
        }}>
            {(queue || []).map((b, i) => (
                <div key={i} style={{
                    width: i === 0 ? '32px' : '24px',
                    height: i === 0 ? '32px' : '24px',
                    borderRadius: '50%',
                    backgroundColor: b.c,
                    color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: i === 0 ? '14px' : '10px',
                    fontWeight: 900,
                    border: i === 0 ? `2px solid ${PUZZLE_SUITE_INK}` : 'none',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                }}>
                    {b.v}
                </div>
            ))}
        </div>
    )
}

// ── Main component ───────────────────────────────────────────────────────────
const Factorfall = () => {
    const chrome = getGameChrome(GAME_KEYS.FACTORFALL)
    const daily = useMemo(() => getDailyPuzzles(), [])
    const dateLabel = useMemo(() => getDateLabel(), [])
    const roster = useMemo(() => buildTierRoster(puzzleData), [])
    const { curateMode, curateIdx, setCurateIdx, exitCurateHref } = useCurateModeFromRoster(roster)
    const curateRosterRef = useRef(roster)
    useEffect(() => {
        curateRosterRef.current = roster
    }, [roster])

    const usedUndoOrResetRef = useRef(false)
    const [mode, setMode] = useState(() => getInitialTutorialNav(GAME_KEYS.FACTORFALL, puzzleData.tutorial ?? []).mode)
    const [tutorialIdx, setTutorialIdx] = useState(() => getInitialTutorialNav(GAME_KEYS.FACTORFALL, puzzleData.tutorial ?? []).tutorialIdx)
    const [dailyIdx, setDailyIdx] = useState(() =>
        resolveHubDailySlotOnLoad(GAME_KEYS.FACTORFALL, getDailyKey(), typeof window !== 'undefined' ? window.location.search : ''),
    )
    const [completions, setCompletions] = useState(() => loadCompletions(daily.key))
    const [perfects, setPerfects] = useState(() => loadPerfects(daily.key))
    const canShareHub = useMemo(
        () => hasShareableHubProgress(GAME_KEYS.FACTORFALL, daily.key),
        [daily.key, completions],
    )
    const {
        hasSeenInstructions,
        showInstructions,
        setShowInstructions,
        closeInstructions,
    } = useInstructionsGate('factorfall:hasSeenInstructions', {
        openOnMount: !curateMode,
        completionStoragePrefix: 'factorfall',
        initiallyClosed: curateMode,
    })
    const [showLinks, setShowLinks] = useState(false)
    const [showStats, setShowStats] = useState(false)
    const [curateCopyHint, setCurateCopyHint] = useState(null)
    const [showCompletionModal, setShowCompletionModal] = useState(false)
    const allDailyDoneCompletionRef = useRef(null)

    useEffect(() => {
        if (!curateMode) persistTutorialResumeState(GAME_KEYS.FACTORFALL, mode, tutorialIdx)
    }, [curateMode, mode, tutorialIdx])

    useEffect(() => {
        if (curateMode || mode !== 'daily') return
        persistHubDailySlot(GAME_KEYS.FACTORFALL, daily.key, dailyIdx)
    }, [curateMode, mode, daily.key, dailyIdx])

    const wrapperRef = useRef(null)
    const canvasRef = useRef(null)
    const [cellSize, setCellSize] = useState(BASE_CELL)

    const gsRef = useRef({
        grid: Array.from({ length: COLS }, () => []),
        queue: [],
        pendingBall: null,
        gameState: 'READY',
        mouseX: 0,
        history: [],
        score: 0,
        highlightQueue: [],
        activeHighlight: null,
        ballsToPopAtEnd: new Set(),
        floatingScores: [],
        target: 24,
        cellSize: BASE_CELL,
    })

    const dailyStateRef = useRef({ key: daily.key, dailyIdx, mode, curateMode, curateIdx })
    const dailyRef = useRef(daily)
    const uiSnapshotRef = useRef({ boardCleared: false, gridFull: false, outOfBalls: false })
    const persistDailyGameStateRef = useRef(() => {})

    useEffect(() => {
        dailyStateRef.current = { key: daily.key, dailyIdx, mode, curateMode, curateIdx }
    }, [daily.key, dailyIdx, mode, curateMode, curateIdx])
    useEffect(() => {
        dailyRef.current = daily
    }, [daily])

    const [uiQueue, setUiQueue] = useState([])
    const [uiTarget, setUiTarget] = useState(24)
    const [undoDisabled, setUndoDisabled] = useState(true)

    // Reactive game-over state (replaces overlay)
    const [boardCleared, setBoardCleared] = useState(false)
    const [factorfallPostWinCtaAttention, setFactorfallPostWinCtaAttention] = useState(false)
    const [gridFull, setGridFull] = useState(false)
    const [outOfBalls, setOutOfBalls] = useState(false)

    useEffect(() => {
        uiSnapshotRef.current = { boardCleared, gridFull, outOfBalls }
    }, [boardCleared, gridFull, outOfBalls])

    // ── Puzzle resolution ────────────────────────────────────────────────────
    const getPuzzle = useCallback(() => {
        if (curateMode) return roster[curateIdx]?.puzzle
        if (mode === 'tutorial') return puzzleData.tutorial[tutorialIdx]
        return daily.puzzles[dailyIdx]
    }, [curateMode, curateIdx, roster, mode, tutorialIdx, dailyIdx, daily])

    // ── Canvas sizing ────────────────────────────────────────────────────────
    useEffect(() => {
        const measure = () => {
            if (!wrapperRef.current) return
            const w = wrapperRef.current.clientWidth
            const h = wrapperRef.current.clientHeight
            const newCell = Math.min(
                Math.floor(w / COLS),
                Math.floor(h / (ROWS + 1)),
                BASE_CELL
            )
            setCellSize(newCell)
            gsRef.current.cellSize = newCell
        }
        measure()
        const ro = new ResizeObserver(measure)
        if (wrapperRef.current) ro.observe(wrapperRef.current)
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        const cvs = canvasRef.current
        if (!cvs) return
        const cs = cellSize
        const dpr = window.devicePixelRatio || 1
        cvs.width = COLS * cs * dpr
        cvs.height = (ROWS + 1) * cs * dpr
        cvs.style.width = `${COLS * cs}px`
        cvs.style.height = `${(ROWS + 1) * cs}px`
        const ctx = cvs.getContext('2d')
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }, [cellSize])

    // ── Init level ───────────────────────────────────────────────────────────
    function initLevel(puzzle, cs) {
        if (!puzzle) return
        const gs = gsRef.current
        gs.cellSize = cs
        gs.history = []
        gs.score = 0
        gs.target = puzzle.target
        gs.highlightQueue = []
        gs.activeHighlight = null
        gs.ballsToPopAtEnd = new Set()
        gs.floatingScores = []

        const canvasH = (ROWS + 1) * cs
        gs.grid = puzzle.board.map((col, c) =>
            col.map((b, r) => ({
                val: b.v, color: b.c,
                x: c * cs + cs / 2,
                y: canvasH - (r * cs + cs / 2),
                targetY: canvasH - (r * cs + cs / 2),
                vy: 0,
            }))
        )
        gs.queue = [...puzzle.queue]
        gs.gameState = 'READY'
        nextFromQueue(gs)

        setUiQueue([...gs.queue])
        setUiTarget(puzzle.target)
        setUndoDisabled(true)
        setBoardCleared(false)
        setGridFull(false)
        setOutOfBalls(false)
    }

    useEffect(() => {
        const p = getPuzzle()
        if (!p) return
        const cs = gsRef.current.cellSize
        if (curateMode) {
            const saved = loadGameState('curate', curateIdx, p)
            if (saved) {
                hydrateFromSaved(saved, p, cs)
                return
            }
            clearGameState('curate', curateIdx)
            usedUndoOrResetRef.current = false
            initLevel(p, cs)
            return
        }
        if (mode === 'daily') {
            const saved = loadGameState(daily.key, dailyIdx, p)
            if (saved) {
                hydrateFromSaved(saved, p, cs)
                return
            }
            clearGameState(daily.key, dailyIdx)
        }
        // Fresh puzzle only (not hydrate). Reset/retry call initLevel directly and must keep usedUndoOrResetRef true.
        usedUndoOrResetRef.current = false
        initLevel(p, cs)
    }, [getPuzzle, curateMode, curateIdx, mode, dailyIdx, tutorialIdx, daily.key])

    useEffect(() => {
        gsRef.current.cellSize = cellSize
        relayoutBallPositions(gsRef.current)
        setUiQueue([...gsRef.current.queue])
    }, [cellSize])

    useEffect(() => {
        const onVis = () => {
            if (document.visibilityState !== 'hidden') return
            const gs = gsRef.current
            if (gs.gameState !== 'READY' && gs.gameState !== 'GAMEOVER') return
            persistDailyGameStateRef.current()
        }
        document.addEventListener('visibilitychange', onVis)
        return () => document.removeEventListener('visibilitychange', onVis)
    }, [])

    // ── Queue helpers ────────────────────────────────────────────────────────
    function nextFromQueue(gs) {
        const cs = gs.cellSize
        if (gs.queue.length > 0) {
            const b = gs.queue[0]
            gs.pendingBall = { val: b.v, color: b.c, y: cs / 2, vy: 0, x: gs.mouseX || (COLS * cs / 2), targetY: 0 }
        } else {
            gs.pendingBall = null
        }
    }

    function hydrateFromSaved(saved, puzzle, cs) {
        const gs = gsRef.current
        usedUndoOrResetRef.current = !!saved.usedUndoOrReset
        gs.cellSize = cs
        gs.target = saved.target
        gs.highlightQueue = []
        gs.activeHighlight = null
        gs.ballsToPopAtEnd = new Set()
        gs.floatingScores = []
        gs.grid = gridFromSlim(saved.grid, cs)
        gs.queue = saved.queue.map(b => ({ v: b.v, c: b.c }))
        gs.gameState = saved.gameState
        gs.mouseX = typeof saved.mouseX === 'number' ? saved.mouseX : COLS * cs / 2
        gs.score = typeof saved.score === 'number' ? saved.score : 0
        gs.history = saved.history.map(h => ({
            grid: gridFromSlim(h.grid, cs),
            queue: h.queue.map(b => ({ v: b.v, c: b.c })),
            score: h.score,
        }))
        if (saved.gameState === 'READY' && gs.queue.length > 0) {
            nextFromQueue(gs)
        } else {
            gs.pendingBall = null
        }
        setUiQueue([...gs.queue])
        setUiTarget(puzzle.target)
        setUndoDisabled(gs.history.length === 0)
        setBoardCleared(saved.ui.boardCleared)
        setGridFull(saved.ui.gridFull)
        setOutOfBalls(saved.ui.outOfBalls)
    }

    function persistDaily(overrideUi) {
        const { key, dailyIdx: idx, mode: m, curateMode: cm, curateIdx: ci } = dailyStateRef.current
        if (cm) {
            const p = curateRosterRef.current[ci]?.puzzle
            if (!p) return
            saveGameState('curate', ci, p, gsRef.current, usedUndoOrResetRef.current, overrideUi ?? uiSnapshotRef.current)
            return
        }
        if (m !== 'daily') return
        const p = dailyRef.current.puzzles[idx]
        if (!p) return
        saveGameState(key, idx, p, gsRef.current, usedUndoOrResetRef.current, overrideUi ?? uiSnapshotRef.current)
    }
    persistDailyGameStateRef.current = persistDaily

    // ── Match detection ──────────────────────────────────────────────────────
    function checkMatches(gs) {
        gs.highlightQueue = []
        gs.ballsToPopAtEnd = new Set()
        const target = gs.target
        const foundSetIDs = new Set()

        for (let c = 0; c < COLS; c++) {
            for (let r = 0; r < gs.grid[c].length; r++) {
                const startBall = gs.grid[c][r]
                if (target % startBall.val !== 0) continue

                const findSets = (currentKeys, currentProd, neighbors) => {
                    if (currentProd === target) {
                        const id = [...currentKeys].sort().join('|')
                        if (!foundSetIDs.has(id)) { foundSetIDs.add(id); gs.highlightQueue.push([...currentKeys]) }
                        return
                    }
                    if (currentProd > target) return
                    neighbors.forEach((nKey, i) => {
                        const [nc, nr] = nKey.split(',').map(Number)
                        if (!gs.grid[nc] || !gs.grid[nc][nr]) return
                        const nextProd = currentProd * gs.grid[nc][nr].val
                        if (target % nextProd === 0) {
                            const nextKeys = [...currentKeys, nKey]
                            const nextNeighbors = neighbors.slice(i + 1);
                            [[0,1],[0,-1],[1,0],[-1,0]].forEach(([dc, dr]) => {
                                const nnC = nc + dc, nnR = nr + dr, nnK = `${nnC},${nnR}`
                                if (nnC >= 0 && nnC < COLS && nnR >= 0 && nnR < gs.grid[nnC].length &&
                                    gs.grid[nnC][nnR].color === startBall.color &&
                                    !nextKeys.includes(nnK) && !nextNeighbors.includes(nnK))
                                    nextNeighbors.push(nnK)
                            })
                            findSets(nextKeys, nextProd, nextNeighbors)
                        }
                    })
                }

                const initN = [];
                [[0,1],[0,-1],[1,0],[-1,0]].forEach(([dc, dr]) => {
                    const nc = c + dc, nr = r + dr
                    if (nc >= 0 && nc < COLS && nr >= 0 && nr < gs.grid[nc].length && gs.grid[nc][nr].color === startBall.color)
                        initN.push(`${nc},${nr}`)
                })
                findSets([`${c},${r}`], startBall.val, initN)
            }
        }

        if (gs.highlightQueue.length > 0) {
            gs.gameState = 'HIGHLIGHTING'
            gs.highlightQueue.forEach(g => g.forEach(k => gs.ballsToPopAtEnd.add(k)))
            runHighlights(gs)
        } else {
            if (gs.queue.length === 0) {
                setTimeout(() => {
                    const empty = gs.grid.every(col => col.length === 0)
                    gs.gameState = 'GAMEOVER'
                    if (empty) {
                        const { key, dailyIdx: idx, mode: currentMode, curateMode: cm } = dailyStateRef.current
                        if (currentMode === 'daily' && !cm) {
                            markComplete(key, idx, !usedUndoOrResetRef.current)
                            setCompletions(loadCompletions(key))
                            setPerfects(loadPerfects(key))
                        }
                        setBoardCleared(true)
                        persistDailyGameStateRef.current({ boardCleared: true, gridFull: false, outOfBalls: false })
                    } else {
                        setOutOfBalls(true)
                        persistDailyGameStateRef.current({ boardCleared: false, gridFull: false, outOfBalls: true })
                    }
                }, 300)
            } else {
                gs.gameState = 'READY'
                nextFromQueue(gs)
                persistDailyGameStateRef.current()
            }
        }
    }

    function runHighlights(gs) {
        if (gs.highlightQueue.length === 0) {
            setTimeout(() => popBalls(gs), 100)
            return
        }
        gs.activeHighlight = gs.highlightQueue.shift()
        const cs = gs.cellSize
        const canvasH = (ROWS + 1) * cs
        const [c, r] = gs.activeHighlight[0].split(',').map(Number)
        gs.floatingScores.push({
            x: c * cs + cs / 2,
            y: canvasH - (r * cs + cs),
            label: '=' + gs.target,
            life: 50,
        })
        setTimeout(() => runHighlights(gs), 700)
    }

    function popBalls(gs) {
        const cs = gs.cellSize
        const canvasH = (ROWS + 1) * cs
        gs.activeHighlight = null
        for (let c = 0; c < COLS; c++) {
            gs.grid[c] = gs.grid[c].filter((_, r) => !gs.ballsToPopAtEnd.has(`${c},${r}`))
            gs.grid[c].forEach((b, r) => {
                b.targetY = canvasH - (r * cs + cs / 2)
            })
        }
        gs.gameState = 'ANIMATING'
    }

    // ── Primary button logic (Scurry-style) ──────────────────────────────────
    const handlePrimaryClick = useCallback(() => {
        if (boardCleared) {
            if (curateMode) {
                clearGameState('curate', curateIdx)
                if (curateIdx < roster.length - 1) setCurateIdx(j => j + 1)
                return
            }
            if (mode === 'tutorial') {
                if (tutorialIdx < puzzleData.tutorial.length - 1) setTutorialIdx(i => i + 1)
                else { setMode('daily'); setDailyIdx(0) }
            } else if (mode === 'daily') {
                const newComp = loadCompletions(daily.key)
                const nextUnsolved = [0, 1, 2].find(i => i !== dailyIdx && !newComp[i])
                if (nextUnsolved !== undefined) setDailyIdx(nextUnsolved)
            }
        } else if (outOfBalls || gridFull) {
            usedUndoOrResetRef.current = true
            if (curateMode) clearGameState('curate', curateIdx)
            else if (mode === 'daily') clearGameState(daily.key, dailyIdx)
            const p = getPuzzle()
            if (p) initLevel(p, gsRef.current.cellSize)
        }
    }, [boardCleared, outOfBalls, gridFull, curateMode, curateIdx, roster.length, setCurateIdx, mode, tutorialIdx, dailyIdx, daily.key, getPuzzle])

    const primaryLabel = useMemo(() => {
        if (boardCleared) {
            if (curateMode) {
                return curateIdx < roster.length - 1 ? CTA_LABELS.NEXT_PUZZLE : null
            }
            if (mode === 'tutorial') {
                return tutorialIdx < puzzleData.tutorial.length - 1 ? CTA_LABELS.NEXT_PUZZLE : CTA_LABELS.PLAY_TODAY
            }
            if (mode === 'daily') {
                const newComp = loadCompletions(daily.key)
                return [0,1,2].find(i => i !== dailyIdx && !newComp[i]) !== undefined ? CTA_LABELS.NEXT_PUZZLE : CTA_LABELS.ALL_PUZZLES
            }
            return null
        }
        if (outOfBalls) return 'Retry Puzzle'
        if (gridFull) return 'Retry Puzzle'
        return null
    }, [boardCleared, outOfBalls, gridFull, curateMode, curateIdx, roster.length, mode, tutorialIdx, dailyIdx, daily.key])

    useEffect(() => {
        if (curateMode || mode !== 'daily') return
        const done = completions.every(Boolean)
        if (allDailyDoneCompletionRef.current === null) {
            allDailyDoneCompletionRef.current = done
            return
        }
        if (done && !allDailyDoneCompletionRef.current) {
            window.setTimeout(() => {
                setShowCompletionModal(true)
            }, FACTORFALL_SUITE_MODAL_AFTER_WIN_MS)
        }
        allDailyDoneCompletionRef.current = done
    }, [curateMode, mode, completions])

    useEffect(() => {
        if (!boardCleared) {
            setFactorfallPostWinCtaAttention(false)
            return
        }
        const tid = window.setTimeout(() => setFactorfallPostWinCtaAttention(true), FACTORFALL_SUITE_MODAL_AFTER_WIN_MS)
        return () => clearTimeout(tid)
    }, [boardCleared, dailyIdx, tutorialIdx, curateIdx])

    // ── Undo / Reset ─────────────────────────────────────────────────────────
    const undoMove = useCallback(() => {
        usedUndoOrResetRef.current = true
        const gs = gsRef.current
        if (gs.history.length === 0) return
        const fromClearedWin = boardCleared && gs.gameState === 'GAMEOVER'
        if (gs.gameState !== 'READY' && !fromClearedWin) return
        const last = gs.history.pop()
        gs.grid = last.grid
        gs.queue = last.queue
        gs.score = last.score
        gs.gameState = 'READY'
        setUiQueue([...gs.queue])
        if (fromClearedWin) {
            setBoardCleared(false)
            setGridFull(false)
            setOutOfBalls(false)
        }
        nextFromQueue(gs)
        setUndoDisabled(gs.history.length === 0)
        persistDailyGameStateRef.current()
    }, [boardCleared])

    const resetLevel = useCallback(() => {
        usedUndoOrResetRef.current = true
        if (curateMode) clearGameState('curate', curateIdx)
        else if (mode === 'daily') clearGameState(daily.key, dailyIdx)
        const p = getPuzzle()
        if (p) initLevel(p, gsRef.current.cellSize)
    }, [getPuzzle, curateMode, curateIdx, mode, daily.key, dailyIdx])

    // ── Canvas interaction ───────────────────────────────────────────────────
    const dropBallInColumn = useCallback((col) => {
        const gs = gsRef.current
        if (gs.gameState !== 'READY' || !gs.pendingBall) return
        if (col < 0 || col >= COLS) return
        if (gs.grid[col].length >= ROWS) {
            gs.gameState = 'GAMEOVER'
            setGridFull(true)
            persistDailyGameStateRef.current({ boardCleared: false, gridFull: true, outOfBalls: false })
            return
        }

        const cs = gs.cellSize
        const canvasH = (ROWS + 1) * cs

        // Save state for undo
        const state = {
            grid: gs.grid.map(c => c.map(b => ({ ...b }))),
            queue: [...gs.queue],
            score: gs.score,
        }
        gs.history.push(state)
        if (gs.history.length > 20) gs.history.shift()
        setUndoDisabled(false)

        const ball = gs.pendingBall
        ball.x = col * cs + cs / 2
        ball.targetY = canvasH - (gs.grid[col].length * cs + cs / 2)
        gs.grid[col].push(ball)
        gs.queue.shift()
        setUiQueue([...gs.queue])
        gs.gameState = 'ANIMATING'
    }, [])

    // Mouse: hover to aim, click to drop
    const handleMouseMove = useCallback((e) => {
        const gs = gsRef.current
        const cvs = canvasRef.current
        if (!cvs) return
        const rect = cvs.getBoundingClientRect()
        gs.mouseX = e.clientX - rect.left
        const scale = (COLS * gs.cellSize) / rect.width
        if (gs.gameState === 'READY' && gs.pendingBall) {
            gs.pendingBall.x = gs.mouseX * scale
        }
    }, [])

    const handleMouseDown = useCallback((e) => {
        const cvs = canvasRef.current
        if (!cvs) return
        const rect = cvs.getBoundingClientRect()
        const x = e.clientX - rect.left
        const col = Math.floor(x / (rect.width / COLS))
        dropBallInColumn(col)
    }, [dropBallInColumn])

    // Touch: simple tap to drop (no dragging/aiming)
    const handleTouchStart = useCallback((e) => {
        e.preventDefault()
        const cvs = canvasRef.current
        if (!cvs) return
        const rect = cvs.getBoundingClientRect()
        const touch = e.touches[0]
        const x = touch.clientX - rect.left
        const col = Math.floor(x / (rect.width / COLS))

        // Snap pending ball to column center before dropping
        const gs = gsRef.current
        const cs = gs.cellSize
        if (gs.pendingBall) {
            gs.pendingBall.x = col * cs + cs / 2
        }

        dropBallInColumn(col)
    }, [dropBallInColumn])

    // ── Animation loop ───────────────────────────────────────────────────────
    useEffect(() => {
        const cvs = canvasRef.current
        if (!cvs) return
        let animId

        const draw = () => {
            const ctx = cvs.getContext('2d')
            const gs = gsRef.current
            const cs = gs.cellSize
            const canvasW = COLS * cs
            const canvasH = (ROWS + 1) * cs
            const ballR = cs * BALL_RADIUS_RATIO
            const gridTop = cs  // top of the 5×5 grid area

            ctx.clearRect(0, 0, canvasW, canvasH)

            // Interior grid lines
            ctx.strokeStyle = GRID_COLOR
            ctx.lineWidth = GRID_LINE_W
            for (let i = 1; i < COLS; i++) {
                ctx.beginPath(); ctx.moveTo(i * cs, gridTop); ctx.lineTo(i * cs, canvasH); ctx.stroke()
            }
            for (let i = 2; i <= ROWS; i++) {
                ctx.beginPath(); ctx.moveTo(0, i * cs); ctx.lineTo(canvasW, i * cs); ctx.stroke()
            }

            // 2px border around the 5×5 grid only
            ctx.strokeStyle = BORDER_COLOR
            ctx.lineWidth = BORDER_W
            ctx.strokeRect(
                BORDER_W / 2,
                gridTop + BORDER_W / 2,
                canvasW - BORDER_W,
                canvasH - gridTop - BORDER_W
            )

            // Active highlight
            if (gs.activeHighlight) {
                ctx.fillStyle = HIGHLIGHT_COLOR
                gs.activeHighlight.forEach(k => {
                    const [c, r] = k.split(',').map(Number)
                    ctx.fillRect(c * cs + 1, canvasH - (r + 1) * cs + 1, cs - 2, cs - 2)
                })
            }

            // Draw balls
            const drawBall = (x, y, v, color) => {
                ctx.beginPath()
                ctx.arc(x, y, ballR, 0, Math.PI * 2)
                ctx.fillStyle = color
                ctx.fill()
                ctx.fillStyle = 'white'
                ctx.font = `900 ${Math.round(cs * 0.3)}px Outfit`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(v, x, y)
            }

            gs.grid.forEach(col => col.forEach(b => drawBall(b.x, b.y, b.val, b.color)))
            if (gs.gameState === 'READY' && gs.pendingBall) drawBall(gs.pendingBall.x, gs.pendingBall.y, gs.pendingBall.val, gs.pendingBall.color)

            // Floating scores
            gs.floatingScores.forEach(fs => {
                ctx.save()
                ctx.globalAlpha = fs.life / 50
                ctx.font = `900 ${Math.round(cs * 0.32)}px Outfit`
                ctx.textAlign = 'center'
                ctx.lineJoin = 'round'
                ctx.lineWidth = Math.max(1, Math.round(cs * 0.05))
                ctx.strokeStyle = '#fff'
                ctx.strokeText(fs.label, fs.x, fs.y)
                ctx.fillStyle = MATCH_POPUP_COLOR
                ctx.fillText(fs.label, fs.x, fs.y)
                ctx.restore()
                fs.y -= 1
                fs.life--
            })
            gs.floatingScores = gs.floatingScores.filter(f => f.life > 0)

            // Physics
            let moving = false
            gs.grid.forEach(col => col.forEach(b => {
                if (Math.abs(b.y - b.targetY) > 0.5) {
                    b.vy = Math.min(b.vy + GRAVITY, TERMINAL_VEL)
                    b.y += b.vy
                    if (b.y >= b.targetY) { b.y = b.targetY; b.vy = 0 }
                    moving = true
                }
            }))
            if (gs.gameState === 'ANIMATING' && !moving) {
                gs.gameState = 'SETTLING'
                setTimeout(() => checkMatches(gs), 50)
            }

            animId = requestAnimationFrame(draw)
        }

        animId = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(animId)
    }, [cellSize])

    // ── Render ───────────────────────────────────────────────────────────────
    const base = import.meta.env.BASE_URL

    const handleStatsClick = useCallback(() => {
        if (curateMode) {
            const entry = roster[curateIdx]
            const p = getPuzzle()
            if (!entry || !p) return
            const text = formatCurateClipboard('factorfall', entry.tier, entry.indexInTier + 1, p, 200)
            void navigator.clipboard.writeText(text).then(
                () => {
                    setCurateCopyHint('Copied puzzle id')
                    window.setTimeout(() => setCurateCopyHint(null), 2500)
                },
                () => {
                    setCurateCopyHint('Copy failed')
                    window.setTimeout(() => setCurateCopyHint(null), 2500)
                },
            )
            return
        }
        setShowStats(true)
    }, [curateMode, roster, curateIdx, getPuzzle])

    return (
        <div className="game-container">
            <TopBar
                title={chrome.title}
                showStats={chrome.showStats}
                onHome={() => { window.location.href = base }}
                onHelp={() => setShowInstructions(true)}
                onCube={() => setShowLinks(true)}
                onStats={handleStatsClick}
            />

            <CurateCopyToast message={curateCopyHint} />

            {/* ── Info bar ── */}
            {curateMode ? (
                <CurateLevelNav
                    exitCurateHref={exitCurateHref}
                    curateIdx={curateIdx}
                    setCurateIdx={setCurateIdx}
                    roster={roster}
                    puzzleData={puzzleData}
                    rightSlot={
                        <>
                            <span className="stats-label">Target</span>
                            <span className="stats-num">{uiTarget}</span>
                        </>
                    }
                />
            ) : mode === 'tutorial' ? (
                <div className="level-nav">
                    <div className="left-spacer">
                        <button className="skip-link" onClick={() => { setMode('daily'); setDailyIdx(0) }}>
                            Skip Tutorial
                        </button>
                    </div>
                    <div className="selector-group">
                        <button className={`nav-arrow ${tutorialIdx === 0 ? 'disabled' : ''}`}
                            onClick={() => { if (tutorialIdx > 0) setTutorialIdx(i => i - 1) }}>←</button>
                        <div className="level-label">
                            <span className="sub">Tutorial</span>
                            <span className="num">{tutorialIdx + 1}</span>
                        </div>
                        <button className={`nav-arrow ${tutorialIdx === puzzleData.tutorial.length - 1 ? 'disabled' : ''}`}
                            onClick={() => { if (tutorialIdx < puzzleData.tutorial.length - 1) setTutorialIdx(i => i + 1) }}>→</button>
                    </div>
                    <div className="stats-group">
                        <span className="stats-label">Target</span>
                        <span className="stats-num">{uiTarget}</span>
                    </div>
                </div>
            ) : (
                <div className="level-nav">
                    <div className="left-spacer">
                        <button className="skip-link" onClick={() => { setMode('tutorial'); setTutorialIdx(0) }}>
                            {CTA_LABELS.PLAY_TUTORIAL}
                        </button>
                    </div>
                    <div className="selector-group" style={{ flexDirection: 'column', gap: '4px' }}>
                        <div className="level-label" style={{ textAlign: 'center' }}>
                            <span className="sub">{dateLabel}</span>
                        </div>
                        <div className="game-dice-share-anchor" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="game-dice-share-phantom" aria-hidden />
                            <div className="game-dice-share-gap" aria-hidden />
                            <PuzzleBoxes current={dailyIdx} completions={completions} perfects={perfects} onChange={setDailyIdx} />
                            <div className="game-dice-share-gap" aria-hidden />
                            <GameShareNavButton gameKey={GAME_KEYS.FACTORFALL} dateKey={daily.key} canShare={canShareHub} />
                        </div>
                    </div>
                    <div className="stats-group">
                        <span className="stats-label">Target</span>
                        <span className="stats-num">{uiTarget}</span>
                    </div>
                </div>
            )}

            {/* ── Queue (horizontal, above board) ── */}
            <QueuePreview queue={uiQueue} />

            {/* ── Canvas ── */}
            <div className="game-stage">
                <div id="canvas-wrapper" ref={wrapperRef}>
                    <canvas
                        ref={canvasRef}
                        style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }}
                        onMouseMove={handleMouseMove}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                    />
                </div>
            </div>

            {/* ── Buttons ── */}
            <div className="button-tray">
                <button className="btn-secondary" onClick={undoMove}
                    disabled={undoDisabled}>Undo</button>
                <button className="btn-secondary" onClick={resetLevel} disabled={undoDisabled}>Reset</button>
            </div>

            {primaryLabel === CTA_LABELS.ALL_PUZZLES ? (
                <PostSolvePrimaryLink
                    attention={factorfallPostWinCtaAttention}
                    href={base}
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {CTA_LABELS.ALL_PUZZLES}
                </PostSolvePrimaryLink>
            ) : primaryLabel ? (
                <PostSolvePrimaryButton attention={factorfallPostWinCtaAttention} onClick={handlePrimaryClick}>
                    {primaryLabel}
                </PostSolvePrimaryButton>
            ) : boardCleared ? null : (
                <div className="goal-text">Clear the Board</div>
            )}

            {/* ── Instructions overlay ── */}
            <SharedModalShell show={showInstructions} onClose={closeInstructions} intent={MODAL_INTENTS.INSTRUCTIONS}>
                <h1 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>Factorfall</h1>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                        <FactorfallIcon size={80} />
                    </div>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Drop factors into the grid. Groups of the same color
                        that <b>multiply</b> to the target are cleared from the board.
                        <br /><br />
                        One ball can be part of multiple groups.
                        <br /><br />
                        Clear the entire board to solve the puzzle.
                        <br /><br />
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {!hasSeenInstructions ? (
                        <>
                            <button className="btn-primary" onClick={() => { closeInstructions(); setMode('tutorial'); setTutorialIdx(0) }}>{CTA_LABELS.PLAY_TUTORIAL}</button>
                            <button className="btn-secondary" onClick={() => { closeInstructions(); setMode('daily'); setDailyIdx(0) }}>{CTA_LABELS.SKIP_TUTORIAL}</button>
                        </>
                    ) : (
                        <>
                            <button className="btn-primary" onClick={() => { closeInstructions(); setMode('daily'); setDailyIdx(0) }}>
                                {CTA_LABELS.PLAY_TODAY}
                            </button>
                            <button className="btn-secondary" onClick={() => { closeInstructions(); setMode('tutorial'); setTutorialIdx(0) }}>
                                {CTA_LABELS.TUTORIAL_PUZZLES}
                            </button>
                        </>
                    )}
                </div>
            </SharedModalShell>

            <AllTenLinksModal show={showLinks} onClose={() => setShowLinks(false)} />
            <SimpleGameStatsModal
                show={showStats}
                onClose={() => setShowStats(false)}
                gameKey={GAME_KEYS.FACTORFALL}
            />
            <SuiteGameCompletionModal
                show={showCompletionModal && !curateMode}
                onClose={() => setShowCompletionModal(false)}
                gameKey={GAME_KEYS.FACTORFALL}
                dateKey={daily.key}
            />
        </div>
    )
}

export default Factorfall