import React, { useState, useEffect, useRef, useCallback } from 'react'
import puzzleData from './puzzles.js'
import TopBar from '../../src/shared/TopBar.jsx'
import SumTilesIcon from '../../src/shared/icons/SumTilesIcon.jsx'

const PUZZLES = puzzleData || []
const TUTORIAL_COUNT = 10
const SNAP_SPEED = 0.25
const SOLVE_STEP_MS = 200
const SOLVE_FINAL_MS = 1000

// ── Canvas polyfill ──────────────────────────────────────────────────────────
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

// ── Pure helpers (no DOM / canvas deps) ─────────────────────────────────────
function allowedAxes(t) {
    if (t.w > t.h) return { h: true,  v: false }
    if (t.h > t.w) return { h: false, v: true  }
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

function testMove(tiles, t, axis, dist, visited, gs) {
    if (visited.has(t.id)) return true
    visited.add(t.id)
    const ax = allowedAxes(t)
    if ((axis==='h' && !ax.h) || (axis==='v' && !ax.v)) return false
    const nX = t.x+(axis==='h'?dist:0), nY = t.y+(axis==='v'?dist:0)
    const b = getBounds(t, nX, nY, gs), lim = tiles[0] ? /* p.size */ Math.max(...tiles.map(t=>t.r+t.h)) * gs + gs : 0
    // use puzzle size from context — passed as pSize
    if (b.l<-0.1||b.r>lim+0.1||b.t<-0.1||b.b>lim+0.1) return false
    for (const o of tiles) if (!visited.has(o.id) && overlap(b, getBounds(o,o.x,o.y,gs))) if (!testMove(tiles,o,axis,dist,visited,gs)) return false
    return true
}

function computeSums(tiles, size) {
    const curR = new Array(size).fill(0), curC = new Array(size).fill(0)
    for (const t of tiles)
        for (let rr=0; rr<t.h; rr++) for (let cc=0; cc<t.w; cc++) {
            const v = t.vals[rr*t.w+cc]
            if (v) { curR[t.r+rr] += v; curC[t.c+cc] += v }
        }
    return { curR, curC }
}

// ── Main component ───────────────────────────────────────────────────────────
export default function SumTiles() {
    const canvasRef   = useRef(null)
    const wrapperRef  = useRef(null)
    const stateRef    = useRef(null)   // mutable game state (not React state)
    const rafRef      = useRef(null)
    const dragRef     = useRef({ active: null, axis: null, lastX: 0, lastY: 0 })

    const [tutorialMode, setTutorialMode] = useState(false)
    const [lvlIdx, setLvlIdx]             = useState(0)
    const [isSolved, setIsSolved]         = useState(false)
    const [historyLen, setHistoryLen]     = useState(0)
    const [showInstructions, setShowInstructions] = useState(true)

    // ── Load puzzle into mutable ref ─────────────────────────────────────────
    const loadPuzzle = useCallback((idx, gs) => {
        const data = PUZZLES[idx]
        if (!data) return
        const tiles = data.b.map((raw, i) => parseTile(raw, i+1, gs))
        stateRef.current = {
            size: data.s,
            targets: data.t,
            tiles,
            originalScramble: JSON.parse(JSON.stringify(tiles)),
            moveHistory: [],
            solveAnim: null,
            gridSize: gs,
        }
        setIsSolved(false)
        setHistoryLen(0)
    }, [])

    // ── Compute grid size from wrapper ────────────────────────────────────────
    const getGridSize = useCallback((puzzleSize) => {
        if (!wrapperRef.current) return 72
        const labelCol = 52
        const boardPx  = wrapperRef.current.getBoundingClientRect().width - labelCol
        return Math.min(72, Math.max(20, Math.floor(boardPx / puzzleSize)))
    }, [])

    // ── Resize: recompute grid size & reposition tiles ────────────────────────
    const resizeBoard = useCallback(() => {
        const s = stateRef.current
        if (!s || !canvasRef.current || !wrapperRef.current) return
        const labelCol = 52
        const boardPx  = wrapperRef.current.getBoundingClientRect().width - labelCol
        if (boardPx <= 0) return
        const gs      = Math.min(72, Math.max(20, Math.floor(boardPx / s.size)))
        const actualPx = s.size * gs
        const offset   = Math.floor((boardPx - actualPx) / 2)
        const canvas   = canvasRef.current
        canvas.width  = actualPx; canvas.height = actualPx
        canvas.style.width  = actualPx+'px'; canvas.style.height = actualPx+'px'
        canvas.style.right  = offset+'px';   canvas.style.bottom = offset+'px'
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
        rowCont.style.width  = labelCol+'px'; rowCont.style.height = actualPx+'px'
        colCont.style.width  = actualPx+'px'; colCont.style.height = labelCol+'px'
        colCont.style.width  = actualPx+'px'; colCont.style.right  = offset+'px'
        colCont.style.top    = 'auto';        colCont.style.bottom = (offset+actualPx)+'px'
        rowCont.style.height = actualPx+'px'; rowCont.style.bottom = offset+'px'
        rowCont.style.left   = 'auto';        rowCont.style.right  = (offset+actualPx)+'px'
        s.targets.rows.forEach((val, i) => {
            const d = document.createElement('div')
            d.className='target'; d.id=`row-t-${i}`; d.innerText=val; rowCont.appendChild(d)
        })
        s.targets.cols.forEach((val, i) => {
            const d = document.createElement('div')
            d.className='target'; d.id=`col-t-${i}`; d.innerText=val; colCont.appendChild(d)
        })
    }

    // ── Initial load + resize observer ───────────────────────────────────────
    useEffect(() => {
        installRoundRect()
        const waitForLayout = () => {
            if (!wrapperRef.current) { requestAnimationFrame(waitForLayout); return }
            const labelCol = 52
            const boardPx  = wrapperRef.current.getBoundingClientRect().width - labelCol
            if (boardPx > 50) {
                const gs = Math.min(72, Math.max(20, Math.floor(boardPx / (PUZZLES[lvlIdx]?.s || 3))))
                loadPuzzle(lvlIdx, gs)
                document.fonts.ready.then(() => resizeBoard())
            } else {
                requestAnimationFrame(waitForLayout)
            }
        }
        waitForLayout()
        window.addEventListener('resize', resizeBoard)
        return () => window.removeEventListener('resize', resizeBoard)
    }, [])

    // ── Reload when level changes ─────────────────────────────────────────────
    useEffect(() => {
        if (!wrapperRef.current) return
        const data = PUZZLES[lvlIdx]
        if (!data) return
        const gs = getGridSize(data.s)
        loadPuzzle(lvlIdx, gs)
        resizeBoard()
    }, [lvlIdx])

    // ── Draw loop ─────────────────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const frame = (now) => {
            rafRef.current = requestAnimationFrame(frame)
            const s = stateRef.current
            if (!s) return
            const gs = s.gridSize
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const { curR, curC } = computeSums(s.tiles, s.size)

            // update target colours
            for (let i=0; i<s.size; i++) {
                const rEl = document.getElementById(`row-t-${i}`)
                const cEl = document.getElementById(`col-t-${i}`)
                if (rEl) rEl.classList.toggle('solved', curR[i]===s.targets.rows[i])
                if (cEl) cEl.classList.toggle('solved', curC[i]===s.targets.cols[i])
            }

            // grid lines
            ctx.strokeStyle='rgba(0,0,0,0.1)'; ctx.lineWidth=1
            for (let j=1; j<s.size; j++) {
                ctx.beginPath(); ctx.moveTo(j*gs,0); ctx.lineTo(j*gs,canvas.height); ctx.stroke()
                ctx.beginPath(); ctx.moveTo(0,j*gs); ctx.lineTo(canvas.width,j*gs); ctx.stroke()
            }

            // victory overlay
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

            // tiles
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

    // ── Pointer handlers ──────────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect()
            return { x: e.clientX-rect.left, y: e.clientY-rect.top }
        }

        const onDown = (e) => {
            if (e.pointerType==='mouse' && e.button!==0) return
            e.preventDefault()
            const s = stateRef.current; if (!s || isSolved) return
            const { x:mx, y:my } = getPos(e)
            const gs = s.gridSize
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
            const gs = s.gridSize
            const { x:mx, y:my } = getPos(e)
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
            const steps = Math.abs(Math.round(delta)), dir = Math.sign(delta)
            const lim = s.size * gs
            for (let i=0; i<steps; i++) {
                const visited = new Set()
                // inline testMove with correct lim
                const ok = (() => {
                    const check = (t, ax, dist, vis) => {
                        if (vis.has(t.id)) return true
                        vis.add(t.id)
                        const a = allowedAxes(t)
                        if ((ax==='h'&&!a.h)||(ax==='v'&&!a.v)) return false
                        const nX=t.x+(ax==='h'?dist:0), nY=t.y+(ax==='v'?dist:0)
                        const b=getBounds(t,nX,nY,gs)
                        if (b.l<-0.1||b.r>lim+0.1||b.t<-0.1||b.b>lim+0.1) return false
                        for (const o of s.tiles) if (!vis.has(o.id)&&overlap(b,getBounds(o,o.x,o.y,gs))) if (!check(o,ax,dist,vis)) return false
                        return true
                    }
                    return check(d.active, d.axis, dir, visited)
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
            const gs = s.gridSize
            let moved = false
            for (const t of s.tiles) {
                const oldR=t.r, oldC=t.c
                t.c = Math.round((t.x-(t.w*gs)/2)/gs)
                t.r = Math.round((t.y-(t.h*gs)/2)/gs)
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

    // ── Nav helpers ───────────────────────────────────────────────────────────
    const minIdx = tutorialMode ? 0 : TUTORIAL_COUNT
    const maxIdx = tutorialMode ? TUTORIAL_COUNT-1 : PUZZLES.length-1
    const atTutorialEnd = tutorialMode && isSolved && lvlIdx === TUTORIAL_COUNT-1
    const displayNum = tutorialMode ? lvlIdx+1 : lvlIdx-TUTORIAL_COUNT+1

    const startTutorial = () => { setTutorialMode(true);  setLvlIdx(0);             setShowInstructions(false) }
    const startMainGame = () => { setTutorialMode(false); setLvlIdx(TUTORIAL_COUNT); setShowInstructions(false) }

    const handleUndo = () => {
        const s = stateRef.current; if (!s||s.moveHistory.length===0||isSolved) return
        const state = JSON.parse(s.moveHistory.pop())
        for (const sv of state) { const t=s.tiles.find(t=>t.id===sv.id); if (t){t.r=sv.r;t.c=sv.c} }
        setHistoryLen(s.moveHistory.length)
    }

    const handleReset = () => {
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
        if (atTutorialEnd) { startMainGame(); return }
        if (lvlIdx < PUZZLES.length-1) setLvlIdx(l => l+1)
    }

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="game-container">
            <TopBar title="Sum Tiles" onHelp={() => setShowInstructions(true)} />

            <div className="level-nav">
                <div></div>
                <div className="selector-group">
                    <button
                        className={`nav-arrow ${lvlIdx <= minIdx ? 'disabled' : ''}`}
                        onClick={() => { if (lvlIdx > minIdx) setLvlIdx(l => l-1) }}
                    >←</button>
                    <div className="level-label">
                        <span className="sub">{tutorialMode ? 'Tutorial' : 'Puzzle'}</span>
                        <span className="num">{Math.max(1, displayNum)}</span>
                    </div>
                    <button
                        className={`nav-arrow ${lvlIdx >= maxIdx ? 'disabled' : ''}`}
                        onClick={() => { if (lvlIdx < maxIdx) setLvlIdx(l => l+1) }}
                    >→</button>
                </div>
                <div></div>
            </div>

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

            {!isSolved
                ? <div className="goal-text">Match the Sums</div>
                : <button className="btn-primary" onClick={handlePrimary}>
                    {atTutorialEnd ? 'Play Game' : lvlIdx < PUZZLES.length-1 ? 'Next Puzzle' : "You're Done!"}
                  </button>
            }

            {showInstructions && (
                <div id="instructions-overlay">
                    <div className="modal-content" style={{ position:'relative' }}>
                        <button
                            onClick={() => setShowInstructions(false)}
                            style={{ position:'absolute', top:'16px', right:'16px', background:'none', border:'none', fontSize:'22px', fontWeight:900, cursor:'pointer' }}
                        >✕</button>
                        <h1 className="title" style={{ marginBottom:'2rem', textAlign:'center' }}>Sum Tiles</h1>
                        <div style={{ flex:1, textAlign:'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                                <SumTilesIcon size={80} />
                                </div>
                            <p style={{ fontSize:'1.1rem', lineHeight:'1.6' }}>
                                Slide the tiles so the <b>sum</b> of the numbers in every row and column matches its target.
                                <br /><br />
                                Square tiles can slide in all four directions. Long rectangles only slide the long way.
                            </p>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                            <button className="btn-primary" onClick={startMainGame}>Play Game</button>
                            <button className="btn-secondary" onClick={startTutorial}>Tutorial Puzzles</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}