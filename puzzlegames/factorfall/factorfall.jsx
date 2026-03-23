import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import puzzleData from './puzzles.js'
import TopBar from '../../src/shared/TopBar.jsx'
import DiceFace from '../../src/shared/DiceFace.jsx'
import FactorfallIcon from '../../src/shared/icons/FactorfallIcon.jsx'

// ── Constants ────────────────────────────────────────────────────────────────
const COLS = 5, ROWS = 5
const BASE_CELL = 72   
const BALL_RADIUS_RATIO = 0.37
const COLORS = { RED: '#ff5f5f', BLUE: '#3273dc' }
const GRID_COLOR = 'rgba(0,0,0,0.9)'
const GRID_LINE_W = 1.5
const BORDER_W = 2
const BORDER_COLOR = 'rgba(0,0,0,0.9)'
const HIGHLIGHT_COLOR = '#ffecb3'
/** Same as Productiles/Sum Tiles `.target.solved` in shared/style.css */
const MATCH_POPUP_COLOR = '#22c55e'
const GRAVITY = 1.2, TERMINAL_VEL = 16
const ENDLESS_ROUND_SIZE = 7

const TARGET_CONFIGS = {
    "12": [1,2,2,2,3,3,4,6], "18": [1,3,3,3,2,2,9,6], "20": [1,2,2,2,5,5,4,10],
    "28": [1,2,2,2,7,7,4,14], "44": [1,2,2,2,11,11,4,22], "45": [1,3,3,3,5,5,9,15],
    "50": [1,5,5,5,2,2,25,10], "63": [1,3,3,3,7,7,9,21], "75": [1,5,5,5,3,3,25,15],
    "24": [1,2,2,2,3,3,4,6,8,12], "40": [1,2,2,2,5,5,4,10,8,20],
    "54": [1,3,3,3,2,2,9,6,27,18], "56": [1,2,2,2,7,7,4,14,8,28],
    "88": [1,2,2,2,11,11,4,22,8,44], "36": [1,2,2,3,3,4,9,6],
    "100": [1,2,2,5,5,4,25,10], "30": [1,2,2,3,3,5,5,6,15,10],
    "42": [1,2,2,3,3,7,7,6,21,14], "66": [1,2,2,3,3,11,11,6,33,22],
    "70": [1,2,2,5,5,7,7,10,35,14], "60": [1,2,2,3,5,4,3,5,2,6,5,2,2,15],
    "84": [1,2,2,3,7,4,3,7,2,6,7,2,2,21], "90": [1,3,3,2,5,9,2,5,3,6,5,3,3,10],
    "99": [1,3,3,3,11,11,9,33], "72": [1,2,2,3,3,4,9,6,8,12],
}

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

// ── Puzzle boxes ─────────────────────────────────────────────────────────────
function PuzzleBoxes({ current, completions, perfects, onChange }) {
    return (
        <div style={{ display: 'flex', gap: '6px' }}>
            {[0, 1, 2].map(i => (
                <button key={i} onClick={() => onChange(i)} style={{
                    width: '28px', height: '28px', borderRadius: '6px', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: completions[i] ? '#22c55e' : current === i ? '#000' : '#d1d5db',
                    color: '#fff', fontWeight: 900, fontSize: '1.06rem', cursor: 'pointer',
                    transition: 'all 0.2s',
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
                    border: i === 0 ? '2px solid #333' : 'none',
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
    const daily = useMemo(() => getDailyPuzzles(), [])
    const dateLabel = useMemo(() => getDateLabel(), [])

    const usedUndoOrResetRef = useRef(false)
    const [mode, setMode] = useState('daily')
    const [tutorialIdx, setTutorialIdx] = useState(0)
    const [dailyIdx, setDailyIdx] = useState(0)
    const [completions, setCompletions] = useState(() => loadCompletions(daily.key))
    const [perfects, setPerfects] = useState(() => loadPerfects(daily.key))
    const [showInstructions, setShowInstructions] = useState(true)
    const [hasSeenInstructions, setHasSeenInstructions] = useState(() => localStorage.getItem('factorfall:hasSeenInstructions') === '1')

    const closeInstructions = useCallback(() => {
        localStorage.setItem('factorfall:hasSeenInstructions', '1')
        setHasSeenInstructions(true)
        setShowInstructions(false)
    }, [])

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
        turnPops: 0,
        highlightQueue: [],
        activeHighlight: null,
        ballsToPopAtEnd: new Set(),
        floatingScores: [],
        isEndless: false,
        shiftingNewRow: [],
        shiftYOffset: 0,
        target: 24,
        cellSize: BASE_CELL,
    })

    const dailyStateRef = useRef({ key: daily.key, dailyIdx, mode })
    useEffect(() => {
        dailyStateRef.current = { key: daily.key, dailyIdx, mode }
    }, [daily.key, dailyIdx, mode])
    useEffect(() => {
        usedUndoOrResetRef.current = false
    }, [daily.key, dailyIdx, mode])

    const [uiQueue, setUiQueue] = useState([])
    const [uiScore, setUiScore] = useState(0)
    const [uiTarget, setUiTarget] = useState(24)
    const [undoDisabled, setUndoDisabled] = useState(true)

    // Reactive game-over state (replaces overlay)
    const [boardCleared, setBoardCleared] = useState(false)
    const [gridFull, setGridFull] = useState(false)
    const [outOfBalls, setOutOfBalls] = useState(false)

    const allDailyDone = completions.every(Boolean)

    // ── Puzzle resolution ────────────────────────────────────────────────────
    const getPuzzle = useCallback(() => {
        if (mode === 'tutorial') return puzzleData.tutorial[tutorialIdx]
        if (mode === 'freeplay') return null
        return daily.puzzles[dailyIdx]
    }, [mode, tutorialIdx, dailyIdx, daily])

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
    const initLevel = useCallback((puzzle) => {
        if (!puzzle) return
        const gs = gsRef.current
        const cs = gs.cellSize
        gs.history = []
        gs.score = 0
        gs.target = puzzle.target
        gs.isEndless = false
        gs.turnPops = 0
        gs.highlightQueue = []
        gs.activeHighlight = null
        gs.ballsToPopAtEnd = new Set()
        gs.floatingScores = []
        gs.shiftingNewRow = []
        gs.shiftYOffset = 0

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
        setUiScore(0)
        setUiTarget(puzzle.target)
        setUndoDisabled(true)
        setBoardCleared(false)
        setGridFull(false)
        setOutOfBalls(false)
    }, [])

    useEffect(() => {
        const p = getPuzzle()
        if (p) initLevel(p)
    }, [getPuzzle, initLevel, cellSize])

    // ── Queue helpers ────────────────────────────────────────────────────────
    function nextFromQueue(gs) {
        const cs = gs.cellSize
        if (gs.queue.length > 0) {
            const b = gs.queue[0]
            gs.pendingBall = { val: b.v, color: b.c, y: cs / 2, vy: 0, x: gs.mouseX || (COLS * cs / 2), targetY: 0 }
        } else {
            gs.pendingBall = null
            if (gs.isEndless) initiateShift(gs)
        }
    }

    function generateRandomBallData(gs) {
        const pool = TARGET_CONFIGS[String(gs.target)] || TARGET_CONFIGS["36"]
        return { v: pool[Math.floor(Math.random() * pool.length)], c: Math.random() < 0.5 ? COLORS.RED : COLORS.BLUE }
    }

    function refillEndlessQueue(gs) {
        gs.queue = []
        for (let i = 0; i < ENDLESS_ROUND_SIZE; i++) gs.queue.push(generateRandomBallData(gs))
    }

    function initiateShift(gs) {
        const cs = gs.cellSize
        const canvasH = (ROWS + 1) * cs
        gs.shiftingNewRow = []
        for (let c = 0; c < COLS; c++) {
            const data = generateRandomBallData(gs)
            gs.shiftingNewRow.push({ val: data.v, color: data.c, x: c * cs + cs / 2, y: canvasH + cs / 2, vy: 0, targetY: 0 })
        }
        gs.gameState = 'SHIFTING'
        gs.shiftYOffset = 0
    }

    function finalizeShift(gs) {
        const cs = gs.cellSize
        const canvasH = (ROWS + 1) * cs
        let hitTop = false
        for (let c = 0; c < COLS; c++) {
            if (gs.grid[c].length >= ROWS) hitTop = true
            gs.grid[c].unshift(gs.shiftingNewRow[c])
            gs.grid[c].forEach((b, r) => {
                b.y = canvasH - (r * cs + cs / 2)
                b.targetY = b.y
                b.vy = 0
            })
        }
        gs.shiftingNewRow = []
        if (hitTop) {
            gs.gameState = 'GAMEOVER'
            setGridFull(true)
        } else {
            refillEndlessQueue(gs)
            setUiQueue([...gs.queue])
            gs.gameState = 'ANIMATING'
        }
    }

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
            if (gs.queue.length === 0 && !gs.isEndless) {
                setTimeout(() => {
                    const empty = gs.grid.every(col => col.length === 0)
                    gs.gameState = 'GAMEOVER'
                    if (empty) {
                        const { key, dailyIdx: idx, mode: currentMode } = dailyStateRef.current
                        if (currentMode === 'daily') {
                            markComplete(key, idx, !usedUndoOrResetRef.current)
                            setCompletions(loadCompletions(key))
                            setPerfects(loadPerfects(key))
                        }
                        setBoardCleared(true)
                    } else {
                        setOutOfBalls(true)
                    }
                }, 300)
            } else if (gs.isEndless && gs.queue.length === 0) {
                initiateShift(gs)
            } else {
                gs.gameState = 'READY'
                nextFromQueue(gs)
            }
        }
    }

    function runHighlights(gs) {
        if (gs.highlightQueue.length === 0) {
            setTimeout(() => popBalls(gs), 100)
            return
        }
        gs.activeHighlight = gs.highlightQueue.shift()
        gs.turnPops++
        if (gs.isEndless) {
            gs.score += gs.turnPops
            setUiScore(gs.score)
        }
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
            if (mode === 'tutorial') {
                if (tutorialIdx < puzzleData.tutorial.length - 1) setTutorialIdx(i => i + 1)
                else { setMode('daily'); setDailyIdx(0) }
            } else if (mode === 'daily') {
                const newComp = loadCompletions(daily.key)
                const nextUnsolved = [0, 1, 2].find(i => i !== dailyIdx && !newComp[i])
                if (nextUnsolved !== undefined) setDailyIdx(nextUnsolved)
                else startFreePlay()
            }
        } else if (outOfBalls || gridFull) {
            if (mode === 'freeplay') {
                // Restart free play
                startFreePlay()
            } else {
                usedUndoOrResetRef.current = true
                const p = getPuzzle()
                if (p) initLevel(p)
            }
        }
    }, [boardCleared, outOfBalls, gridFull, mode, tutorialIdx, dailyIdx, daily.key, getPuzzle, initLevel])

    const primaryLabel = useMemo(() => {
        if (boardCleared) {
            if (mode === 'tutorial') {
                return tutorialIdx < puzzleData.tutorial.length - 1 ? 'Next Puzzle' : "Play Today's Puzzles"
            }
            if (mode === 'daily') {
                const newComp = loadCompletions(daily.key)
                return [0,1,2].find(i => i !== dailyIdx && !newComp[i]) !== undefined ? 'Next Puzzle' : 'Free Play Mode'
            }
            return null
        }
        if (outOfBalls) return 'Retry Puzzle'
        if (gridFull && mode === 'freeplay') return 'Play Again'
        if (gridFull) return 'Retry Puzzle'
        return null
    }, [boardCleared, outOfBalls, gridFull, mode, tutorialIdx, dailyIdx, daily.key])

    // ── Free Play ────────────────────────────────────────────────────────────
    const startFreePlay = useCallback(() => {
        const gs = gsRef.current
        gs.isEndless = true
        gs.score = 0
        gs.grid = Array.from({ length: COLS }, () => [])
        setUiScore(0)
        setBoardCleared(false)
        setGridFull(false)
        setOutOfBalls(false)
        refillEndlessQueue(gs)
        setUiQueue([...gs.queue])
        gs.gameState = 'READY'
        nextFromQueue(gs)
        setMode('freeplay')
    }, [])

    // ── Undo / Reset ─────────────────────────────────────────────────────────
    const undoMove = useCallback(() => {
        usedUndoOrResetRef.current = true
        const gs = gsRef.current
        if (gs.history.length === 0 || gs.gameState !== 'READY' || gs.isEndless) return
        const last = gs.history.pop()
        gs.grid = last.grid
        gs.queue = last.queue
        gs.score = last.score
        setUiScore(gs.score)
        setUiQueue([...gs.queue])
        nextFromQueue(gs)
        setUndoDisabled(gs.history.length === 0 || gs.isEndless)
    }, [])

    const resetLevel = useCallback(() => {
        usedUndoOrResetRef.current = true
        if (mode === 'freeplay') {
            startFreePlay()
        } else {
            const p = getPuzzle()
            if (p) initLevel(p)
        }
    }, [getPuzzle, initLevel, mode, startFreePlay])

    // ── Canvas interaction ───────────────────────────────────────────────────
    const dropBallInColumn = useCallback((col) => {
        const gs = gsRef.current
        if (gs.gameState !== 'READY' || !gs.pendingBall) return
        if (col < 0 || col >= COLS) return
        if (gs.grid[col].length >= ROWS) {
            gs.gameState = 'GAMEOVER'
            setGridFull(true)
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
        setUndoDisabled(gs.isEndless)

        const ball = gs.pendingBall
        ball.x = col * cs + cs / 2
        ball.targetY = canvasH - (gs.grid[col].length * cs + cs / 2)
        gs.grid[col].push(ball)
        gs.queue.shift()
        setUiQueue([...gs.queue])
        gs.gameState = 'ANIMATING'
        gs.turnPops = 0
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
            if (gs.gameState === 'SHIFTING') gs.shiftingNewRow.forEach(b => drawBall(b.x, b.y, b.val, b.color))
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
            if (gs.gameState === 'SHIFTING') {
                const s = 4
                gs.shiftYOffset += s
                gs.grid.forEach(col => col.forEach(b => b.y -= s))
                gs.shiftingNewRow.forEach(b => b.y -= s)
                if (gs.shiftYOffset >= cs) finalizeShift(gs)
            } else {
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
                    setTimeout(() => checkMatches(gs), 700)
                }
            }

            animId = requestAnimationFrame(draw)
        }

        animId = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(animId)
    }, [cellSize])

    // ── Render ───────────────────────────────────────────────────────────────
    const base = import.meta.env.BASE_URL
    const isFreePlay = mode === 'freeplay'

    return (
        <div className="game-container">
            <TopBar title="Factorfall" onHelp={() => setShowInstructions(true)} />

            {/* ── Info bar ── */}
            {mode === 'tutorial' ? (
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
            ) : isFreePlay ? (
                <div className="level-nav">
                    <div className="left-spacer">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span className="stats-label">Score</span>
                            <span className="stats-num">{uiScore}</span>
                        </div>
                    </div>
                    <div className="level-label" style={{ textAlign: 'center' }}>
                        <span className="sub">Free Play</span>
                        <span className="num">∞</span>
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
                            Play Tutorial
                        </button>
                    </div>
                    <div className="selector-group" style={{ flexDirection: 'column', gap: '4px' }}>
                        <div className="level-label" style={{ textAlign: 'center' }}>
                            <span className="sub">{dateLabel}</span>
                        </div>
                        <PuzzleBoxes current={dailyIdx} completions={completions} perfects={perfects} onChange={setDailyIdx} />
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
                    disabled={undoDisabled || boardCleared}>Undo</button>
                <button className="btn-secondary" onClick={resetLevel}>Reset</button>
            </div>

            {isFreePlay && !primaryLabel ? (
                <a href={base} className="btn-primary"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    All Puzzles
                </a>
            ) : primaryLabel ? (
                <button className="btn-primary" onClick={handlePrimaryClick}>{primaryLabel}</button>
            ) : (
                <div className="goal-text">Clear the Board</div>
            )}

            {/* ── Instructions overlay ── */}
            {showInstructions && (
                <div id="instructions-overlay">
                    <div className="modal-content" style={{ position: 'relative' }}>
                        <button onClick={closeInstructions}
                            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '22px', fontWeight: 900, cursor: 'pointer' }}>✕</button>
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
                                    <button className="btn-primary" onClick={() => { closeInstructions(); setMode('tutorial'); setTutorialIdx(0) }}>PLAY TUTORIAL PUZZLES</button>
                                    <button className="btn-secondary" onClick={() => { closeInstructions(); setMode('daily'); setDailyIdx(0) }}>SKIP TUTORIAL</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn-primary" onClick={() => { closeInstructions(); setMode('daily'); setDailyIdx(0) }}>
                                        Play Today's Puzzles
                                    </button>
                                    <button className="btn-secondary" onClick={() => { closeInstructions(); setMode('tutorial'); setTutorialIdx(0) }}>
                                        Tutorial Puzzles
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Factorfall