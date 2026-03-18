import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import puzzleData from './puzzles.js'
import TopBar from '../../src/shared/TopBar.jsx'
import SumTilesIcon from '../../src/shared/icons/SumTilesIcon.jsx'

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
    return [0, 1, 2].map(i => ['1', '2'].includes(localStorage.getItem(`sumtiles:${dateKey}:${i}`)))
}

function loadPerfects(dateKey) {
    return [0, 1, 2].map(i => localStorage.getItem(`sumtiles:${dateKey}:${i}`) === '2')
}

function getStoredMoveCount(dateKey, idx) {
    const v = localStorage.getItem(`sumtiles:${dateKey}:${idx}:moves`)
    return v != null ? parseInt(v, 10) : null
}

function markComplete(dateKey, idx, noUndo, movesThisRun) {
    const key = `sumtiles:${dateKey}:${idx}`
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
    localStorage.setItem(`sumtiles:${dateKey}:${idx}:moves`, String(Math.min(moves, MAX_MOVE_DISPLAY)))
}

function loadMoveCounts(dateKey) {
    return [0, 1, 2].map(i => {
        const v = localStorage.getItem(`sumtiles:${dateKey}:${i}:moves`)
        return v != null ? parseInt(v, 10) : null
    })
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

function tileColor(t) {
    if (t.w === 2 && t.h === 2) return '#1e3a8a'
    if (t.w === 3 && t.h === 1) return '#16a34a'
    if (t.w === 1 && t.h === 3) return '#dc2626'
    if (t.w === 2 && t.h === 1) return '#f59e0b'
    if (t.w === 1 && t.h === 2) return '#8b5cf6'
    return '#3b82f6'
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

// KEY DIFFERENCE: addition instead of multiplication
function computeSums(tiles, size) {
    const curR = new Array(size).fill(0), curC = new Array(size).fill(0)
    for (const t of tiles)
        for (let rr=0; rr<t.h; rr++) for (let cc=0; cc<t.w; cc++) {
            const v = t.vals[rr*t.w+cc]
            if (v) { curR[t.r+rr] += v; curC[t.c+cc] += v }
        }
    return { curR, curC }
}

// ── Puzzle boxes ─────────────────────────────────────────────────────────────
function PuzzleBoxes({ current, completions, perfects, moveCounts, onChange }) {
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            {[0, 1, 2].map(i => (
                <button key={i} onClick={() => onChange(i)} style={{
                    width: '32px', height: '32px', borderRadius: '6px', border: 'none',
                    background: completions[i] ? '#22c55e' : current === i ? '#000' : '#d1d5db',
                    color: '#fff', fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                }}>
                    {completions[i] ? (moveCounts && moveCounts[i] != null ? String(Math.min(moveCounts[i], MAX_MOVE_DISPLAY)) : '✓') : i + 1}
                </button>
            ))}
        </div>
    )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function SumTiles() {
    const daily = useMemo(() => getDailyPuzzles(), [])
    const dateLabel = useMemo(() => getDateLabel(), [])

    const canvasRef  = useRef(null)
    const wrapperRef = useRef(null)
    const stateRef   = useRef(null)
    const rafRef     = useRef(null)
    const dragRef    = useRef({ active: null, axis: null, lastX: 0, lastY: 0 })
    const usedUndoOrResetRef = useRef(false)

    const [mode, setMode]               = useState('daily')
    const [tutorialIdx, setTutorialIdx] = useState(0)
    const [dailyIdx, setDailyIdx]       = useState(0)
    const [completions, setCompletions] = useState(() => loadCompletions(daily.key))
    const [perfects, setPerfects]       = useState(() => loadPerfects(daily.key))
    const [moveCounts, setMoveCounts]   = useState(() => loadMoveCounts(daily.key))
    const [isSolved, setIsSolved]       = useState(false)
    const [historyLen, setHistoryLen]   = useState(0)
    const [showInstructions, setShowInstructions] = useState(true)
    const [hasSeenInstructions, setHasSeenInstructions] = useState(() => localStorage.getItem('sumtiles:hasSeenInstructions') === '1')

    const closeInstructions = useCallback(() => {
        localStorage.setItem('sumtiles:hasSeenInstructions', '1')
        setHasSeenInstructions(true)
        setShowInstructions(false)
    }, [])

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

    useEffect(() => {
        if (!wrapperRef.current) return
        const data = currentPuzzleData; if (!data) return
        const labelCol = 52
        const boardPx = wrapperRef.current.getBoundingClientRect().width - labelCol
        const gs = Math.min(72, Math.max(20, Math.floor(boardPx / data.s)))
        loadPuzzle(data, gs)
        resizeBoard()
        usedUndoOrResetRef.current = false
        if (mode === 'daily') setMoveCounts(loadMoveCounts(daily.key))
    }, [currentPuzzleData])

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
        const canvas = canvasRef.current; if (!canvas) return
        const ctx = canvas.getContext('2d')
        const frame = (now) => {
            rafRef.current = requestAnimationFrame(frame)
            const s = stateRef.current; if (!s) return
            const gs = s.gridSize
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const { curR, curC } = computeSums(s.tiles, s.size)
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
                    if (elapsed >= SOLVE_FINAL_MS) s.solveAnim = null
                }
            }
            for (const t of s.tiles) {
                if (!dragRef.current.active) {
                    const tx = t.c*gs+(t.w*gs)/2, ty = t.r*gs+(t.h*gs)/2
                    t.x += (tx-t.x)*SNAP_SPEED; t.y += (ty-t.y)*SNAP_SPEED
                }
                ctx.fillStyle = tileColor(t)
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
                const { curR, curC } = computeSums(s.tiles, s.size)
                const won = s.targets.rows.every((v,i)=>curR[i]===v) && s.targets.cols.every((v,i)=>curC[i]===v)
                if (won) { s.solveAnim = { phase:'rows', startTime:performance.now() }; setIsSolved(true) }
            }
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
        const s = stateRef.current; if (!s||s.moveHistory.length===0||isSolved) return
        const state = JSON.parse(s.moveHistory.pop())
        for (const sv of state) { const t=s.tiles.find(t=>t.id===sv.id); if (t){t.r=sv.r;t.c=sv.c} }
        setHistoryLen(s.moveHistory.length)
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
            ? tutorialIdx < puzzleData.tutorial.length - 1 ? 'Next Puzzle' : 'Play Today\'s Puzzles'
            : allDone ? 'All Done!' : 'Next Puzzle'
        : null

    const base = import.meta.env.BASE_URL

    return (
        <div className="game-container">
            <TopBar title="Sum Tiles" onHelp={() => setShowInstructions(true)} />

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
                        <PuzzleBoxes current={dailyIdx} completions={completions} perfects={perfects} moveCounts={moveCounts} onChange={setDailyIdx} />
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
                <button className="btn-secondary" onClick={handleUndo} disabled={historyLen === 0 || isSolved}>Undo</button>
                <button className="btn-secondary" onClick={handleReset} disabled={historyLen === 0 || isSolved}>Reset</button>
            </div>

            {!isSolved ? (
                <div className="goal-text">Match the Sums</div>
            ) : primaryLabel === 'All Done!' ? (
                <a href={base} className="btn-primary"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    All Puzzles
                </a>
            ) : (
                <button className="btn-primary" onClick={handlePrimary}>{primaryLabel}</button>
            )}

            {showInstructions && (
                <div id="instructions-overlay">
                    <div className="modal-content" style={{ position:'relative' }}>
                        <button onClick={closeInstructions}
                            style={{ position:'absolute', top:'16px', right:'16px', background:'none', border:'none', fontSize:'22px', fontWeight:900, cursor:'pointer' }}>✕</button>
                        <h1 className="title" style={{ marginBottom:'2rem', textAlign:'center' }}>Sum Tiles</h1>
                        <div style={{ flex:1, textAlign:'center' }}>
                            <div style={{ display:'flex', justifyContent:'center', marginBottom:'2rem' }}>
                                <SumTilesIcon size={80} />
                            </div>
                            <p style={{ fontSize:'1.1rem', lineHeight:'1.6' }}>
                                Slide the tiles so the <b>sum</b> of the numbers in every row and column matches its target.
                                <br /><br />
                                Square tiles can slide in all four directions. Long rectangles only slide the long way.
                            </p>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                            {!hasSeenInstructions ? (
                                <>
                                    <button className="btn-primary" onClick={() => { closeInstructions(); setMode('tutorial'); setTutorialIdx(0) }}>PLAY TUTORIAL PUZZLES</button>
                                    <button className="btn-secondary" onClick={() => { closeInstructions(); setMode('daily'); setDailyIdx(0) }}>SKIP TUTORIAL</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn-primary" onClick={() => { closeInstructions(); setMode('daily'); setDailyIdx(0) }}> Play Today's Puzzles</button>
                                    <button className="btn-secondary" onClick={() => { closeInstructions(); setMode('tutorial'); setTutorialIdx(0) }}>Tutorial Puzzles</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}