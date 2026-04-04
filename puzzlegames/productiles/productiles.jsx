import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import puzzleData from './puzzles.js'
import TopBar from '../../src/shared/TopBar.jsx'
import { tileGameFillColor } from '../../src/shared/tileGamePalette.js'
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
import { parseHubDailyPuzzleParam } from '../../shared-contracts/hubEntry.js'
import { hasShareableHubProgress } from '../../shared-contracts/hubSharePlaintext.js'
import GameShareNavButton from '../../src/shared/GameShareNavButton.jsx'
import ProductilesIcon from '../../src/shared/icons/ProductilesIcon.jsx'

const SNAP_SPEED = 0.25
const SOLVE_STEP_MS = 200
const SOLVE_FINAL_MS = 1000

// ── Daily helpers ────────────────────────────────────────────────────────────
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
    const easy = puzzleData.easy || []
    const medium = puzzleData.medium || []
    const hard = puzzleData.hard || []
    return {
        puzzles: [
            easy[dayIndex % easy.length],
            medium[dayIndex % medium.length],
            hard[dayIndex % hard.length],
        ],
        key,
    }
}

function loadCompletions(dateKey) {
    return [0, 1, 2].map(i => ['1', '2'].includes(localStorage.getItem(`productiles:${dateKey}:${i}`)))
}

function loadPerfects(dateKey) {
    return [0, 1, 2].map(i => localStorage.getItem(`productiles:${dateKey}:${i}`) === '2')
}

function getStoredMoveCount(dateKey, idx) {
    const v = localStorage.getItem(`productiles:${dateKey}:${idx}:moves`)
    return v != null ? parseInt(v, 10) : null
}

function markComplete(dateKey, idx, noUndo, movesThisRun) {
    const key = `productiles:${dateKey}:${idx}`
    const existing = localStorage.getItem(key)
    const storedMoves = getStoredMoveCount(dateKey, idx)
    if (existing !== '1' && existing !== '2') {
        localStorage.setItem(key, noUndo ? '2' : '1')
        saveMoveCount(dateKey, idx, movesThisRun)
    } else if (storedMoves != null && movesThisRun < storedMoves) {
        localStorage.setItem(key, '1')
        saveMoveCount(dateKey, idx, movesThisRun)
    }
}

const MAX_MOVE_DISPLAY = 99

function saveMoveCount(dateKey, idx, moves) {
    localStorage.setItem(`productiles:${dateKey}:${idx}:moves`, String(Math.min(moves, MAX_MOVE_DISPLAY)))
}

function loadMoveCounts(dateKey) {
    return [0, 1, 2].map(i => {
        const v = localStorage.getItem(`productiles:${dateKey}:${i}:moves`)
        return v != null ? parseInt(v, 10) : null
    })
}

// ── In-progress game state (save/restore) ─────────────────────────────────────
const GAME_STATE_VERSION = 1

function storageKeyGameState(dateKey, puzzleIndex) {
    return `productiles:${dateKey}:${puzzleIndex}:gameState`
}

function loadGameState(dateKey, puzzleIndex, data) {
    try {
        const raw = localStorage.getItem(storageKeyGameState(dateKey, puzzleIndex))
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (!parsed || parsed.version !== GAME_STATE_VERSION) return null
        if (parsed.size !== data.s) return null
        if (!parsed.targets || parsed.targets.rows?.length !== data.t.rows?.length || parsed.targets.cols?.length !== data.t.cols?.length) return null
        if (data.t.rows?.some((v, i) => parsed.targets.rows[i] !== v) || data.t.cols?.some((v, i) => parsed.targets.cols[i] !== v)) return null
        if (!Array.isArray(parsed.tiles) || parsed.tiles.length !== data.b.length) return null
        for (let i = 0; i < data.b.length; i++) {
            const rawTile = data.b[i]
            const t = parsed.tiles[i]
            if (!t || t.id !== i + 1 || t.w !== rawTile[2] || t.h !== rawTile[3]) return null
            if (!Array.isArray(t.vals) || t.vals.length !== t.w * t.h) return null
        }
        if (!Array.isArray(parsed.moveHistory)) return null
        return { size: parsed.size, targets: parsed.targets, tiles: parsed.tiles, moveHistory: parsed.moveHistory }
    } catch {
        return null
    }
}

function saveGameState(dateKey, puzzleIndex, state) {
    try {
        if (!state || !state.tiles) return
        const payload = {
            version: GAME_STATE_VERSION,
            size: state.size,
            targets: state.targets,
            tiles: state.tiles.map(t => ({ id: t.id, r: t.r, c: t.c, w: t.w, h: t.h, vals: t.vals })),
            moveHistory: state.moveHistory || [],
        }
        localStorage.setItem(storageKeyGameState(dateKey, puzzleIndex), JSON.stringify(payload))
    } catch {
        // ignore
    }
}

function clearGameState(dateKey, puzzleIndex) {
    try {
        localStorage.removeItem(storageKeyGameState(dateKey, puzzleIndex))
    } catch {
        // ignore
    }
}

// ── Canvas helpers ───────────────────────────────────────────────────────────
function installRoundRect() {
    if (CanvasRenderingContext2D.prototype.roundRect) return
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        const rad = typeof r === 'number' ? { tl:r, tr:r, br:r, bl:r } : { tl:0, tr:0, br:0, bl:0, ...r }
        this.beginPath()
        this.moveTo(x + rad.tl, y)
        this.lineTo(x + w - rad.tr, y)
        this.quadraticCurveTo(x + w, y, x + w, y + rad.tr)
        this.lineTo(x + w, y + h - rad.br)
        this.quadraticCurveTo(x + w, y + h, x + w - rad.br, y + h)
        this.lineTo(x + rad.bl, y + h)
        this.quadraticCurveTo(x, y + h, x, y + h - rad.bl)
        this.lineTo(x, y + rad.tl)
        this.quadraticCurveTo(x, y, x + rad.tl, y)
        return this
    }
}

function allowedAxes(t) {
    if (t.w > t.h) return { h: true, v: false }
    if (t.h > t.w) return { h: false, v: true }
    return { h: true, v: true }
}

function parseTile(raw, id, gridSize) {
    const r = raw[0], c = raw[1], w = raw[2], h = raw[3]
    let vals = raw.slice(4)
    const need = w * h
    if (vals.length < need) vals = vals.concat(new Array(need - vals.length).fill(0))
    vals = vals.slice(0, need).map(v => v == null ? 0 : v)
    return { id, r, c, w, h, vals, x: c * gridSize + (w * gridSize) / 2, y: r * gridSize + (h * gridSize) / 2 }
}

function getBounds(t, px, py, gs) {
    return { l: px-(t.w*gs)/2, r: px+(t.w*gs)/2, t: py-(t.h*gs)/2, b: py+(t.h*gs)/2 }
}

function overlap(b1, b2) {
    const EPS = 0.75
    return (Math.min(b1.r,b2.r)-Math.max(b1.l,b2.l) > EPS) && (Math.min(b1.b,b2.b)-Math.max(b1.t,b2.t) > EPS)
}

function computeProducts(tiles, size) {
    const curR = new Array(size).fill(1), curC = new Array(size).fill(1)
    const hasNumR = new Array(size).fill(false), hasNumC = new Array(size).fill(false)
    for (const t of tiles)
        for (let rr=0; rr<t.h; rr++) for (let cc=0; cc<t.w; cc++) {
            const v = t.vals[rr*t.w+cc]
            if (v) {
                curR[t.r+rr] *= v; curC[t.c+cc] *= v
                hasNumR[t.r+rr] = true; hasNumC[t.c+cc] = true
            }
        }
    for (let i=0; i<size; i++) {
        if (!hasNumR[i]) curR[i] = 0
        if (!hasNumC[i]) curC[i] = 0
    }
    return { curR, curC }
}

// ── Puzzle boxes ─────────────────────────────────────────────────────────────
function PuzzleBoxes({ current, completions, perfects, moveCounts, onChange }) {
    return (
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {[0, 1, 2].map(i => (
                <button key={i} onClick={() => onChange(i)} style={{
                    width: '28px', height: '28px', borderRadius: '6px', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: completions[i] ? '#22c55e' : current === i ? PUZZLE_SUITE_INK : PUZZLE_SUITE_SURFACE_INCOMPLETE,
                    color: completions[i] || current === i ? '#fff' : PUZZLE_SUITE_INK,
                    fontWeight: 900, fontSize: '1.06rem', cursor: 'pointer', transition: 'all 0.2s',
                    transform: current === i ? 'scale(1.1)' : 'scale(1)',
                    transformOrigin: 'center center',
                }}>
                    {completions[i] ? (moveCounts && moveCounts[i] != null ? String(Math.min(moveCounts[i], MAX_MOVE_DISPLAY)) : '✓') : <DiceFace count={i + 1} size={20} />}
                </button>
            ))}
        </div>
    )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Productiles() {
    const chrome = getGameChrome(GAME_KEYS.PRODUCTILES)
    const daily = useMemo(() => getDailyPuzzles(), [])
    const dateLabel = useMemo(() => getDateLabel(), [])

    const canvasRef  = useRef(null)
    const wrapperRef = useRef(null)
    const stateRef   = useRef(null)
    const rafRef     = useRef(null)
    const dragRef    = useRef({ active: null, axis: null, lastX: 0, lastY: 0 })
    const usedUndoOrResetRef = useRef(false)
    const dailyKeyRef = useRef(daily.key)
    const dailyIdxRef = useRef(0)
    const modeRef = useRef('daily')
    const [mode, setMode]               = useState('daily') // 'daily' | 'tutorial'
    const [tutorialIdx, setTutorialIdx] = useState(0)
    const [dailyIdx, setDailyIdx]       = useState(() => parseHubDailyPuzzleParam())
    dailyKeyRef.current = daily.key
    dailyIdxRef.current = dailyIdx
    modeRef.current = mode
    const [completions, setCompletions] = useState(() => loadCompletions(daily.key))
    const [perfects, setPerfects]       = useState(() => loadPerfects(daily.key))
    const [moveCounts, setMoveCounts]   = useState(() => loadMoveCounts(daily.key))
    const canShareHub = useMemo(
        () => hasShareableHubProgress(GAME_KEYS.PRODUCTILES, daily.key),
        [daily.key, completions],
    )
    const [isSolved, setIsSolved]       = useState(false)
    const [historyLen, setHistoryLen]   = useState(0)
    const {
        hasSeenInstructions,
        showInstructions,
        setShowInstructions,
        closeInstructions,
    } = useInstructionsGate('productiles:hasSeenInstructions', { openOnMount: true, completionStoragePrefix: 'productiles' })
    const [showLinks, setShowLinks] = useState(false)
    const [showStats, setShowStats] = useState(false)
    const [showCompletionModal, setShowCompletionModal] = useState(false)
    const allDailyDoneCompletionRef = useRef(null)
    const pendingSuiteModalAfterAnimRef = useRef(false)

    const currentPuzzleData = useMemo(() => {
        if (mode === 'tutorial') return puzzleData.tutorial[tutorialIdx]
        return daily.puzzles[dailyIdx]
    }, [mode, tutorialIdx, dailyIdx, daily])

    const loadPuzzle = useCallback((data, gs) => {
        if (!data) return
        const tiles = data.b.map((raw, i) => parseTile(raw, i+1, gs))
        stateRef.current = {
            size: data.s, targets: data.t, tiles,
            originalScramble: JSON.parse(JSON.stringify(tiles)),
            moveHistory: [], solveAnim: null, gridSize: gs,
        }
        setIsSolved(false)
        setHistoryLen(0)
    }, [])

    const resizeBoard = useCallback(() => {
        const s = stateRef.current
        if (!s || !canvasRef.current || !wrapperRef.current) return
        const labelCol = 52
        const boardPx = wrapperRef.current.getBoundingClientRect().width - labelCol
        if (boardPx <= 0) return
        const gs = Math.min(72, Math.max(20, Math.floor(boardPx / s.size)))
        const actualPx = s.size * gs
        const offset = Math.floor((boardPx - actualPx) / 2)
        const canvas = canvasRef.current
        canvas.width = actualPx; canvas.height = actualPx
        canvas.style.width = actualPx+'px'; canvas.style.height = actualPx+'px'
        canvas.style.right = offset+'px'; canvas.style.bottom = offset+'px'
        s.gridSize = gs
        for (const t of s.tiles) { t.x = t.c*gs+(t.w*gs)/2; t.y = t.r*gs+(t.h*gs)/2 }
        rebuildTargetLabels(s, actualPx, offset)
    }, [])

    function rebuildTargetLabels(s, actualPx, offset) {
        const rowCont = document.getElementById('rowTargets')
        const colCont = document.getElementById('colTargets')
        if (!rowCont || !colCont) return
        rowCont.innerHTML = ''; colCont.innerHTML = ''
        const labelCol = 52
        const colGap = Math.max(4, Math.floor((s.gridSize || 20) * 0.2))
        rowCont.style.width = labelCol+'px'; rowCont.style.height = actualPx+'px'
        colCont.style.width = actualPx+'px'; colCont.style.right = offset+'px'
        colCont.style.top = 'auto'; colCont.style.bottom = (offset + actualPx + colGap) + 'px'
        rowCont.style.height = actualPx+'px'; rowCont.style.bottom = offset+'px'
        rowCont.style.left = 'auto'; rowCont.style.right = (offset+actualPx)+'px'
        s.targets.rows.forEach((val, i) => {
            const d = document.createElement('div')
            d.className='target'; d.id=`row-t-${i}`; d.innerText=val; rowCont.appendChild(d)
        })
        s.targets.cols.forEach((val, i) => {
            const d = document.createElement('div')
            d.className='target'; d.id=`col-t-${i}`; d.innerText=val; colCont.appendChild(d)
        })
    }

    // Initial load
    useEffect(() => {
        installRoundRect()
        const waitForLayout = () => {
            if (!wrapperRef.current) { requestAnimationFrame(waitForLayout); return }
            const labelCol = 52
            const boardPx = wrapperRef.current.getBoundingClientRect().width - labelCol
            if (boardPx > 50) {
                const data = currentPuzzleData
                const gs = Math.min(72, Math.max(20, Math.floor(boardPx / (data?.s || 3))))
                loadPuzzle(data, gs)
                document.fonts.ready.then(() => resizeBoard())
            } else requestAnimationFrame(waitForLayout)
        }
        waitForLayout()
        window.addEventListener('resize', resizeBoard)
        return () => window.removeEventListener('resize', resizeBoard)
    }, [])

    // Reload when puzzle changes (or restore saved state for daily)
    useEffect(() => {
        if (!wrapperRef.current) return
        const data = currentPuzzleData
        if (!data) return
        const labelCol = 52
        const boardPx = wrapperRef.current.getBoundingClientRect().width - labelCol
        const gs = Math.min(72, Math.max(20, Math.floor(boardPx / data.s)))
        if (mode === 'daily') {
            const saved = loadGameState(daily.key, dailyIdx, data)
            if (saved) {
                const tiles = saved.tiles.map(t => ({
                    ...t,
                    x: t.c * gs + (t.w * gs) / 2,
                    y: t.r * gs + (t.h * gs) / 2,
                }))
                const initialTiles = data.b.map((raw, i) => parseTile(raw, i + 1, gs))
                stateRef.current = {
                    size: saved.size,
                    targets: saved.targets,
                    tiles,
                    originalScramble: JSON.parse(JSON.stringify(initialTiles)),
                    moveHistory: saved.moveHistory,
                    solveAnim: null,
                    gridSize: gs,
                }
                setHistoryLen(saved.moveHistory.length)
                const { curR, curC } = computeProducts(tiles, saved.size)
                const alreadyWon = saved.targets.rows.every((v, i) => curR[i] === v) && saved.targets.cols.every((v, i) => curC[i] === v)
                setIsSolved(!!alreadyWon)
                resizeBoard()
                usedUndoOrResetRef.current = false
                setMoveCounts(loadMoveCounts(daily.key))
                return
            }
        }
        loadPuzzle(data, gs)
        resizeBoard()
        usedUndoOrResetRef.current = false
        if (mode === 'daily') setMoveCounts(loadMoveCounts(daily.key))
    }, [currentPuzzleData, daily.key, dailyIdx, mode])

    // Mark complete when solved
    useEffect(() => {
        if (isSolved && mode === 'daily') {
            const moves = stateRef.current?.moveHistory?.length ?? 0
            markComplete(daily.key, dailyIdx, !usedUndoOrResetRef.current, moves)
            setCompletions(loadCompletions(daily.key))
            setPerfects(loadPerfects(daily.key))
            setMoveCounts(loadMoveCounts(daily.key))
        }
    }, [isSolved])

    useEffect(() => {
        if (mode !== 'daily') return
        const done = completions.every(Boolean)
        if (allDailyDoneCompletionRef.current === null) {
            allDailyDoneCompletionRef.current = done
            return
        }
        if (done && !allDailyDoneCompletionRef.current) {
            pendingSuiteModalAfterAnimRef.current = true
            const s = stateRef.current
            if (!s?.solveAnim) {
                pendingSuiteModalAfterAnimRef.current = false
                setTimeout(() => setShowCompletionModal(true), 500)
            }
        }
        if (!done) pendingSuiteModalAfterAnimRef.current = false
        allDailyDoneCompletionRef.current = done
    }, [mode, completions])

    // Draw loop
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const frame = (now) => {
            rafRef.current = requestAnimationFrame(frame)
            const s = stateRef.current; if (!s) return
            const gs = s.gridSize
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const { curR, curC } = computeProducts(s.tiles, s.size)
            for (let i=0; i<s.size; i++) {
                const rEl = document.getElementById(`row-t-${i}`)
                const cEl = document.getElementById(`col-t-${i}`)
                if (rEl) rEl.classList.toggle('solved', curR[i]===s.targets.rows[i])
                if (cEl) cEl.classList.toggle('solved', curC[i]===s.targets.cols[i])
            }
            ctx.strokeStyle='rgba(0,0,0,0.1)'; ctx.lineWidth=1
            for (let j=1; j<s.size; j++) {
                ctx.beginPath(); ctx.moveTo(j*gs,0); ctx.lineTo(j*gs,canvas.height); ctx.stroke()
                ctx.beginPath(); ctx.moveTo(0,j*gs); ctx.lineTo(canvas.width,j*gs); ctx.stroke()
            }
            if (s.solveAnim) {
                const elapsed = now - s.solveAnim.startTime, step = SOLVE_STEP_MS
                if (s.solveAnim.phase==='rows') {
                    const i = Math.floor(elapsed/step)
                    if (i >= s.size) { s.solveAnim = { phase:'cols', startTime:now } }
                    else {
                        ctx.fillStyle='rgba(34,197,94,0.25)'; ctx.fillRect(0,i*gs,canvas.width,gs)
                        const el = document.getElementById(`row-t-${i}`)
                        if (el) el.style.transform = `scale(${1+0.35*Math.sin(Math.min(1,(elapsed%step)/step)*Math.PI)})`
                    }
                } else if (s.solveAnim.phase==='cols') {
                    const i = Math.floor(elapsed/step)
                    if (i >= s.size) { s.solveAnim = { phase:'final', startTime:now } }
                    else {
                        ctx.fillStyle='rgba(34,197,94,0.25)'; ctx.fillRect(i*gs,0,gs,canvas.height)
                        const el = document.getElementById(`col-t-${i}`)
                        if (el) el.style.transform = `scale(${1+0.35*Math.sin(Math.min(1,(elapsed%step)/step)*Math.PI)})`
                    }
                } else if (s.solveAnim.phase==='final') {
                    const a = Math.max(0, 1-elapsed/SOLVE_FINAL_MS)
                    ctx.fillStyle=`rgba(34,197,94,${0.15*a})`; ctx.fillRect(0,0,canvas.width,canvas.height)
                    if (elapsed >= SOLVE_FINAL_MS) {
                        s.solveAnim = null
                        if (pendingSuiteModalAfterAnimRef.current && modeRef.current === 'daily') {
                            pendingSuiteModalAfterAnimRef.current = false
                            setTimeout(() => setShowCompletionModal(true), 500)
                        }
                    }
                }
            }
            for (const t of s.tiles) {
                if (!dragRef.current.active) {
                    const tx = t.c*gs+(t.w*gs)/2, ty = t.r*gs+(t.h*gs)/2
                    t.x += (tx-t.x)*SNAP_SPEED; t.y += (ty-t.y)*SNAP_SPEED
                }
                ctx.fillStyle = tileGameFillColor(t)
                ctx.beginPath()
                ctx.roundRect(t.x-(t.w*gs-8)/2, t.y-(t.h*gs-8)/2, t.w*gs-8, t.h*gs-8, 6)
                ctx.fill()
                ctx.fillStyle='white'; ctx.font=`600 ${Math.round(gs*0.32)}px Outfit`
                ctx.textAlign='center'; ctx.textBaseline='middle'
                const left=t.x-(t.w*gs)/2, top=t.y-(t.h*gs)/2
                for (let rr=0; rr<t.h; rr++) for (let cc=0; cc<t.w; cc++) {
                    const v=t.vals[rr*t.w+cc]; if (!v) continue
                    ctx.fillText(v, left+cc*gs+gs/2, top+rr*gs+gs/2)
                }
            }
        }
        rafRef.current = requestAnimationFrame(frame)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    // Pointer events
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return
        const getPos = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX-r.left, y: e.clientY-r.top } }
        const onDown = (e) => {
            if (e.pointerType==='mouse' && e.button!==0) return
            e.preventDefault()
            const s = stateRef.current; if (!s || isSolved) return
            const { x:mx, y:my } = getPos(e); const gs = s.gridSize
            const hit = s.tiles.find(t => { const b=getBounds(t,t.x,t.y,gs); return mx>b.l&&mx<b.r&&my>b.t&&my<b.b })
            if (hit) {
                s.moveHistory.push(JSON.stringify(s.tiles.map(t=>({id:t.id,r:t.r,c:t.c}))))
                setHistoryLen(s.moveHistory.length)
                if (modeRef.current === 'daily') saveGameState(dailyKeyRef.current, dailyIdxRef.current, s)
                dragRef.current = { active:hit, axis:null, lastX:mx, lastY:my }
                canvas.setPointerCapture?.(e.pointerId)
            }
        }
        const onMove = (e) => {
            const d = dragRef.current; if (!d.active) return
            e.preventDefault()
            const s = stateRef.current; if (!s) return
            const gs = s.gridSize; const { x:mx, y:my } = getPos(e)
            if (!d.axis) {
                const dx=Math.abs(mx-d.lastX), dy=Math.abs(my-d.lastY)
                if (dx<=5&&dy<=5) return
                let intended = dx>dy?'h':'v'
                const ax = allowedAxes(d.active)
                if (intended==='h'&&!ax.h&&ax.v) intended='v'
                if (intended==='v'&&!ax.v&&ax.h) intended='h'
                if ((intended==='h'&&!ax.h)||(intended==='v'&&!ax.v)) return
                d.axis = intended
            }
            const delta = d.axis==='h'?mx-d.lastX:my-d.lastY
            const steps = Math.abs(Math.round(delta)), dir = Math.sign(delta), lim = s.size*gs
            for (let i=0; i<steps; i++) {
                const ok = (() => {
                    const check = (t, ax, dist, vis) => {
                        if (vis.has(t.id)) return true; vis.add(t.id)
                        const a = allowedAxes(t)
                        if ((ax==='h'&&!a.h)||(ax==='v'&&!a.v)) return false
                        const b=getBounds(t,t.x+(ax==='h'?dist:0),t.y+(ax==='v'?dist:0),gs)
                        if (b.l<-0.1||b.r>lim+0.1||b.t<-0.1||b.b>lim+0.1) return false
                        for (const o of s.tiles) if (!vis.has(o.id)&&overlap(b,getBounds(o,o.x,o.y,gs))) if (!check(o,ax,dist,vis)) return false
                        return true
                    }
                    return check(d.active, d.axis, dir, new Set())
                })()
                if (ok) {
                    const exec = (t, ax, dist, vis) => {
                        if (vis.has(t.id)) return; vis.add(t.id)
                        const b=getBounds(t,t.x+(ax==='h'?dist:0),t.y+(ax==='v'?dist:0),gs)
                        for (const o of s.tiles) if (!vis.has(o.id)&&overlap(b,getBounds(o,o.x,o.y,gs))) exec(o,ax,dist,vis)
                        if (ax==='h') t.x+=dist; else t.y+=dist
                    }
                    exec(d.active, d.axis, dir, new Set())
                } else break
            }
            if (d.axis==='h') d.lastX=mx; else d.lastY=my
        }
        const onUp = () => {
            const d = dragRef.current; if (!d.active) return
            const s = stateRef.current; if (!s) return
            const gs = s.gridSize; let moved = false
            for (const t of s.tiles) {
                const oldR=t.r, oldC=t.c
                t.c = Math.round((t.x-(t.w*gs)/2)/gs); t.r = Math.round((t.y-(t.h*gs)/2)/gs)
                if (t.c!==oldC||t.r!==oldR) moved=true
            }
            if (!moved) { s.moveHistory.pop(); setHistoryLen(s.moveHistory.length) }
            else {
                const { curR, curC } = computeProducts(s.tiles, s.size)
                const won = s.targets.rows.every((v,i)=>curR[i]===v) && s.targets.cols.every((v,i)=>curC[i]===v)
                if (won) { s.solveAnim = { phase:'rows', startTime:performance.now() }; setIsSolved(true) }
            }
            if (modeRef.current === 'daily') saveGameState(dailyKeyRef.current, dailyIdxRef.current, s)
            dragRef.current = { active:null, axis:null, lastX:0, lastY:0 }
        }
        canvas.addEventListener('pointerdown', onDown, { passive:false })
        window.addEventListener('pointermove', onMove, { passive:false })
        window.addEventListener('pointerup', onUp, { passive:true })
        window.addEventListener('pointercancel', onUp, { passive:true })
        return () => {
            canvas.removeEventListener('pointerdown', onDown)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
            window.removeEventListener('pointercancel', onUp)
        }
    }, [isSolved])

    const handleUndo = () => {
        usedUndoOrResetRef.current = true
        const s = stateRef.current; if (!s || s.moveHistory.length === 0) return
        const state = JSON.parse(s.moveHistory.pop())
        for (const sv of state) { const t = s.tiles.find(t => t.id === sv.id); if (t) { t.r = sv.r; t.c = sv.c } }
        s.solveAnim = null
        setIsSolved(false)
        setHistoryLen(s.moveHistory.length)
        if (modeRef.current === 'daily') saveGameState(dailyKeyRef.current, dailyIdxRef.current, s)
    }

    const handleReset = () => {
        usedUndoOrResetRef.current = true
        const s = stateRef.current; if (!s) return
        const gs = s.gridSize
        s.moveHistory = []; s.solveAnim = null
        for (let i=0; i<s.tiles.length; i++) {
            const t=s.tiles[i]; t.r=s.originalScramble[i].r; t.c=s.originalScramble[i].c
            t.x=t.c*gs+(t.w*gs)/2; t.y=t.r*gs+(t.h*gs)/2
        }
        for (let i=0; i<s.size; i++) {
            const rEl=document.getElementById(`row-t-${i}`), cEl=document.getElementById(`col-t-${i}`)
            if (rEl) rEl.style.transform='scale(1)'; if (cEl) cEl.style.transform='scale(1)'
        }
        setIsSolved(false); setHistoryLen(0)
        if (modeRef.current === 'daily') saveGameState(dailyKeyRef.current, dailyIdxRef.current, s)
    }

    const handlePrimary = () => {
        if (mode === 'tutorial') {
            if (tutorialIdx < puzzleData.tutorial.length - 1) setTutorialIdx(i => i + 1)
            else { setMode('daily'); setDailyIdx(0) }
        } else {
            const next = [0, 1, 2].find(i => i !== dailyIdx && !completions[i])
            if (next !== undefined) setDailyIdx(next)
        }
    }

    const allDone = completions.every(Boolean)
    const primaryLabel = isSolved
        ? mode === 'tutorial'
            ? tutorialIdx < puzzleData.tutorial.length - 1 ? CTA_LABELS.NEXT_PUZZLE : CTA_LABELS.PLAY_TODAY
            : allDone ? CTA_LABELS.ALL_PUZZLES : CTA_LABELS.NEXT_PUZZLE
        : null

    const base = import.meta.env.BASE_URL

    return (
        <div className="game-container">
            <TopBar
                title={chrome.title}
                showStats={chrome.showStats}
                onHome={() => { window.location.href = base }}
                onHelp={() => setShowInstructions(true)}
                onCube={() => setShowLinks(true)}
                onStats={() => setShowStats(true)}
            />

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
                        <span className="stats-label">Moves</span>
                        <span className="stats-num">{Math.min(historyLen, MAX_MOVE_DISPLAY)}</span>
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
                        <div className="game-dice-share-anchor" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="game-dice-share-phantom" aria-hidden />
                            <div className="game-dice-share-gap" aria-hidden />
                            <PuzzleBoxes current={dailyIdx} completions={completions} perfects={perfects} moveCounts={moveCounts} onChange={setDailyIdx} />
                            <div className="game-dice-share-gap" aria-hidden />
                            <GameShareNavButton gameKey={GAME_KEYS.PRODUCTILES} dateKey={daily.key} canShare={canShareHub} />
                        </div>
                    </div>
                    <div className="stats-group">
                        <span className="stats-label">Moves</span>
                        <span className="stats-num">{Math.min(historyLen, MAX_MOVE_DISPLAY)}</span>
                    </div>
                </div>
            )}

            <div className="game-stage">
                <div id="canvas-wrapper" ref={wrapperRef}>
                    <canvas id="gameCanvas" ref={canvasRef} style={{ position:'absolute', bottom:0, right:0 }} />
                    <div id="colTargets" className="col-targets" style={{ position:'absolute', top:0, right:0 }} />
                    <div id="rowTargets" className="row-targets" style={{ position:'absolute', bottom:0, left:0 }} />
                </div>
            </div>

            <div className="button-tray" style={{ marginTop: '16px' }}>
                <button className="btn-secondary" onClick={handleUndo} disabled={historyLen === 0}>Undo</button>
                <button className="btn-secondary" onClick={handleReset} disabled={historyLen === 0}>Reset</button>
            </div>

            {!isSolved ? (
                <div className="goal-text">Match the Products</div>
            ) : primaryLabel === CTA_LABELS.ALL_PUZZLES ? (
                <a href={base} className="btn-primary"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {CTA_LABELS.ALL_PUZZLES}
                </a>
            ) : (
                <button className="btn-primary" onClick={handlePrimary}>{primaryLabel}</button>
            )}

            <SharedModalShell show={showInstructions} onClose={closeInstructions} intent={MODAL_INTENTS.INSTRUCTIONS}>
                <h1 className="title" style={{ marginBottom:'2rem', textAlign:'center' }}>Productiles</h1>
                <div style={{ flex:1, textAlign:'center' }}>
                    <div style={{ display:'flex', justifyContent:'center', marginBottom:'2rem' }}>
                        <ProductilesIcon size={80} />
                    </div>
                    <p style={{ fontSize:'1.1rem', lineHeight:'1.6' }}>
                        Slide the factor tiles so the <b>product</b> of the numbers in every row and column matches its target.
                        <br /><br />
                        Square tiles can slide in all four directions. Long rectangles only slide the long way.
                    </p>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                    {!hasSeenInstructions ? (
                        <>
                            <button className="btn-primary" onClick={() => { closeInstructions(); setMode('tutorial'); setTutorialIdx(0) }}>{CTA_LABELS.PLAY_TUTORIAL}</button>
                            <button className="btn-secondary" onClick={() => { closeInstructions(); setMode('daily'); setDailyIdx(0) }}>{CTA_LABELS.SKIP_TUTORIAL}</button>
                        </>
                    ) : (
                        <>
                            <button className="btn-primary" onClick={() => { closeInstructions(); setMode('daily'); setDailyIdx(0) }}>{CTA_LABELS.PLAY_TODAY}</button>
                            <button className="btn-secondary" onClick={() => { closeInstructions(); setMode('tutorial'); setTutorialIdx(0) }}>{CTA_LABELS.TUTORIAL_PUZZLES}</button>
                        </>
                    )}
                </div>
            </SharedModalShell>

            <AllTenLinksModal show={showLinks} onClose={() => setShowLinks(false)} />
            <SimpleGameStatsModal
                show={showStats}
                onClose={() => setShowStats(false)}
                gameKey={GAME_KEYS.PRODUCTILES}
            />
            <SuiteGameCompletionModal
                show={showCompletionModal}
                onClose={() => setShowCompletionModal(false)}
                gameKey={GAME_KEYS.PRODUCTILES}
                dateKey={daily.key}
            />
        </div>
    )
}