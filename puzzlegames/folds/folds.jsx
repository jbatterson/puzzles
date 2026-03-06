import React, { useState, useEffect, useMemo, useRef } from 'react'
import puzzleData from './puzzles.js'
import TopBar from '../../src/shared/TopBar.jsx'
import FoldsIcon from '../../src/shared/icons/FoldsIcon.jsx'

// ── Geometry (unchanged) ─────────────────────────────────────────────────────
const S = 62, H = S * Math.sqrt(3) / 2, PAD = 40, N = 4, ANIM_MS = 450
const up = (r, c) => (r + c) % 2 === 0
const cent = (r, c) => ({ x: PAD + (c + 1) * S / 2, y: PAD + (up(r, c) ? H * (r + 2 / 3) : H * (r + 1 / 3)) })
const pts = (r, c) => {
    const x = PAD + c * S / 2, y = PAD + r * H
    return up(r, c)
        ? `${x + S / 2},${y} ${x},${y + H} ${x + S},${y + H}`
        : `${x},${y} ${x + S},${y} ${x + S / 2},${y + H}`
}
const easeIO = (t) => (t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2)

const HEX_POLY = (() => {
    const L = N * S, V0 = { x: PAD + S / 2, y: PAD }, V1 = { x: V0.x + L, y: V0.y }, V2 = { x: V1.x + L / 2, y: V1.y + N * H }
    const V3 = { x: V2.x - L / 2, y: V2.y + N * H }, V4 = { x: V3.x - L, y: V3.y }, V5 = { x: V4.x - L / 2, y: V4.y - N * H }
    return [V0, V1, V2, V3, V4, V5]
})()

const HEX_BOUNDS = (() => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    HEX_POLY.forEach(p => {
        minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x)
        minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y)
    })
    return { minX, minY, width: maxX - minX, height: maxY - minY }
})()

const VB_PAD = 14
const HEX_VIEWBOX = { x: HEX_BOUNDS.minX - VB_PAD, y: HEX_BOUNDS.minY - VB_PAD, w: HEX_BOUNDS.width + 2 * VB_PAD, h: HEX_BOUNDS.height + 2 * VB_PAD }

const isInsideHex = (r, c) => {
    const p = cent(r, c); let inside = false
    for (let i = 0, j = HEX_POLY.length - 1; i < HEX_POLY.length; j = i++) {
        const xi = HEX_POLY[i].x, yi = HEX_POLY[i].y, xj = HEX_POLY[j].x, yj = HEX_POLY[j].y
        if (((yi > p.y) !== (yj > p.y)) && (p.x < (xj - xi) * (p.y - yi) / (yj - yi + 1e-12) + xi)) inside = !inside
    }
    return inside
}

const snap = (px, py) => {
    const re = Math.round((py - PAD) / H), ce = Math.round(2 * (px - PAD) / S) - 1
    let best = Infinity, br = 0, bc = 0
    for (let r = Math.max(0, re - 2); r <= Math.min(10, re + 2); r++)
        for (let c = Math.max(-6, ce - 4); c <= Math.min(20, ce + 4); c++) {
            const p = cent(r, c), d = (p.x - px) ** 2 + (p.y - py) ** 2
            if (d < best) { best = d; br = r; bc = c }
        }
    return [br, bc]
}

const ALL_TRIANGLES = (() => {
    const tris = []
    for (let r = 0; r <= 8; r++) for (let c = -5; c <= 18; c++) if (isInsideHex(r, c)) tris.push({ r, c, key: `${r},${c}` })
    return tris
})()

const ALL_LINES = (() => {
    const seen = {}, lines = []
    const addLine = (theta, px, py) => {
        const tn = ((theta % Math.PI) + Math.PI) % Math.PI, a = -Math.sin(tn), b = Math.cos(tn), c = a * px + b * py
        const key = `${Math.round(tn * 1000)}_${Math.round(c * 100)}`
        if (seen[key]) return
        const hits = []
        for (let i = 0; i < HEX_POLY.length; i++) {
            const p1 = HEX_POLY[i], p2 = HEX_POLY[(i + 1) % HEX_POLY.length], dx = p2.x - p1.x, dy = p2.y - p1.y, denom = a * dx + b * dy
            if (Math.abs(denom) < 1e-9) continue
            const t = (c - (a * p1.x + b * p1.y)) / denom
            if (t >= -0.01 && t <= 1.01) hits.push({ x: p1.x + t * dx, y: p1.y + t * dy })
        }
        if (hits.length >= 2) {
            let dMax = -1, pA = hits[0], pB = hits[1]
            for (let i = 0; i < hits.length; i++) for (let j = i + 1; j < hits.length; j++) {
                const d = (hits[i].x - hits[j].x) ** 2 + (hits[i].y - hits[j].y) ** 2
                if (d > dMax) { dMax = d; pA = hits[i]; pB = hits[j] }
            }
            seen[key] = true
            lines.push({ lineKey: key, theta: tn, px, py, x1: pA.x, y1: pA.y, x2: pB.x, y2: pB.y })
        }
    }
    for (let r = -1; r <= 9; r++) for (let c = -1; c <= 17; c++) {
        const x = PAD + c * S / 2, y = PAD + r * H
        if (up(r, c)) { addLine(Math.atan2(H, -S/2), x+S/2, y); addLine(Math.atan2(H, S/2), x+S/2, y); addLine(0, x, y+H) }
        else { addLine(0, x, y); addLine(Math.atan2(H, -S/2), x, y); addLine(Math.atan2(H, S/2), x+S, y) }
    }
    return lines
})()

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

function seededRandom(seed) {
    let h = 0
    for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0
    return () => {
        h ^= h << 13; h ^= h >> 17; h ^= h << 5
        return (h >>> 0) / 0xFFFFFFFF
    }
}

function getDailyPuzzles() {
    const key = getDailyKey()
    const rngEasy   = seededRandom(key + ':easy')
    const rngMedium = seededRandom(key + ':medium')
    const rngHard   = seededRandom(key + ':hard')
    return {
        puzzles: [
            puzzleData.easy[Math.floor(rngEasy()   * puzzleData.easy.length)],
            puzzleData.medium[Math.floor(rngMedium() * puzzleData.medium.length)],
            puzzleData.hard[Math.floor(rngHard()   * puzzleData.hard.length)],
        ],
        key,
    }
}

function loadCompletions(dateKey) {
    return [0, 1, 2].map(i => localStorage.getItem(`folds:${dateKey}:${i}`) === '1')
}

function markComplete(dateKey, idx) {
    localStorage.setItem(`folds:${dateKey}:${idx}`, '1')
}

// ── Puzzle boxes ─────────────────────────────────────────────────────────────
function PuzzleBoxes({ current, completions, onChange }) {
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            {[0, 1, 2].map(i => (
                <button key={i} onClick={() => onChange(i)} style={{
                    width: '32px', height: '32px', borderRadius: '6px', border: 'none',
                    background: completions[i] ? '#22c55e' : current === i ? '#000' : '#d1d5db',
                    color: '#fff', fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                }}>
                    {completions[i] ? '✓' : i + 1}
                </button>
            ))}
        </div>
    )
}

// ── Main component ───────────────────────────────────────────────────────────
const App = () => {
    const daily = useMemo(() => getDailyPuzzles(), [])
    const dateLabel = useMemo(() => getDateLabel(), [])

    const [mode, setMode] = useState('daily') // 'daily' | 'tutorial'
    const [tutorialIdx, setTutorialIdx] = useState(0)
    const [dailyIdx, setDailyIdx] = useState(0)
    const [completions, setCompletions] = useState(() => loadCompletions(daily.key))
    const [showInstructions, setShowInstructions] = useState(true)

    const [tapFlash, setTapFlash] = useState(null)
    const [hoverLine, setHoverLine] = useState(null)
    const [pendingFoldLine, setPendingFoldLine] = useState(null)
    const [invalidLines, setInvalidLines] = useState({})
    const [toast, setToast] = useState(null)
    const t0 = useRef(0)
    const hoverDelayRef = useRef(null)
    const ignoreBoardPointerUntilRef = useRef(0)

    const puzzle = useMemo(() => {
        if (mode === 'tutorial') return puzzleData.tutorial[tutorialIdx]
        return daily.puzzles[dailyIdx]
    }, [mode, tutorialIdx, dailyIdx, daily])

    const [board, setBoard] = useState(puzzle.start)
    const [history, setHistory] = useState([puzzle.start])
    const [folds, setFolds] = useState(puzzle.folds)
    const [anim, setAnim] = useState(null)

    useEffect(() => {
        setBoard(puzzle.start)
        setHistory([puzzle.start])
        setFolds(puzzle.folds)
        setAnim(null)
        setInvalidLines({})
        setPendingFoldLine(null)
    }, [puzzle])

    useEffect(() => () => {
        if (hoverDelayRef.current) clearTimeout(hoverDelayRef.current)
    }, [])

    const isWon = useMemo(() => {
        const tK = Object.keys(puzzle.target), bK = Object.keys(board)
        if (bK.length !== tK.length) return false
        for (const k of tK) if (board[k] !== puzzle.target[k]) return false
        return true
    }, [board, puzzle])

    // Mark complete when won
    useEffect(() => {
        if (isWon && mode === 'daily') {
            markComplete(daily.key, dailyIdx)
            setCompletions(loadCompletions(daily.key))
        }
    }, [isWon])

    const SNAP_TOL = (S * 0.6) ** 2

    const validateFold = (lineKey) => {
        const line = ALL_LINES.find(l => l.lineKey === lineKey)
        if (!line) return { ok: false, reason: 'offboard' }
        const c2 = Math.cos(2 * line.theta), s2 = Math.sin(2 * line.theta)
        for (const [key, color] of Object.entries(board)) {
            const [r, c] = key.split(',').map(Number)
            const cp = cent(r, c)
            const nx = line.px + (cp.x - line.px) * c2 + (cp.y - line.py) * s2
            const ny = line.py + (cp.x - line.px) * s2 - (cp.y - line.py) * c2
            const [nr, nc] = snap(nx, ny)
            const sp = cent(nr, nc)
            const dist2 = (sp.x - nx) ** 2 + (sp.y - ny) ** 2
            if (!isInsideHex(nr, nc) || dist2 > SNAP_TOL) return { ok: false, reason: 'offboard' }
            const destKey = `${nr},${nc}`
            if (board[destKey] && board[destKey] !== color) return { ok: false, reason: 'color' }
        }
        return { ok: true, reason: null }
    }

    const maybeShowToast = (reason) => {
        const key = reason === 'offboard' ? 'folds_hide_offboard_toast' : 'folds_hide_color_toast'
        if (localStorage.getItem(key) === '1') return
        setToast(reason)
    }

    const handleFold = (lineKey) => {
        if (folds <= 0 || anim || isWon) return
        const result = validateFold(lineKey)
        if (!result.ok) {
            setInvalidLines(prev => ({ ...prev, [lineKey]: true }))
            maybeShowToast(result.reason)
            return
        }
        const line = ALL_LINES.find(l => l.lineKey === lineKey)
        const next = { ...board }
        const c2 = Math.cos(2 * line.theta), s2 = Math.sin(2 * line.theta)
        for (const [key, color] of Object.entries(board)) {
            const [r, c] = key.split(',').map(Number)
            const cp = cent(r, c)
            const nx = line.px + (cp.x - line.px) * c2 + (cp.y - line.py) * s2
            const ny = line.py + (cp.x - line.px) * s2 - (cp.y - line.py) * c2
            const [nr, nc] = snap(nx, ny)
            const sp = cent(nr, nc)
            const dist2 = (sp.x - nx) ** 2 + (sp.y - ny) ** 2
            if (isInsideHex(nr, nc) && dist2 <= SNAP_TOL) next[`${nr},${nc}`] = color
        }
        t0.current = performance.now()
        setAnim({ line, startBoard: { ...board }, finalBoard: next, rawT: 0 })
        setFolds(f => f - 1)
    }

    useEffect(() => {
        if (!anim) return
        let rafId = 0
        const tick = () => {
            const rawT = Math.min(1, (performance.now() - t0.current) / ANIM_MS)
            if (rawT >= 1) { setBoard(anim.finalBoard); setHistory(h => [...h, anim.finalBoard]); setAnim(null); return }
            setAnim(a => (a ? { ...a, rawT } : a)); rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick); return () => cancelAnimationFrame(rafId)
    }, [anim])

    const getLineStroke = (lineKey) => {
        const highlighted = hoverLine === lineKey || pendingFoldLine === lineKey
        if (highlighted) return invalidLines[lineKey] ? '#ef4444' : '#6366f1'
        if (tapFlash === lineKey) return '#6366f1'
        return '#cbd5e1'
    }

    const isLineHighlighted = (lineKey) => hoverLine === lineKey || pendingFoldLine === lineKey

    const handlePrimaryClick = () => {
        if (isWon) {
            if (mode === 'tutorial') {
                if (tutorialIdx < puzzleData.tutorial.length - 1) setTutorialIdx(i => i + 1)
                else { setMode('daily'); setDailyIdx(0) }
            } else {
                const next = [0, 1, 2].find(i => i !== dailyIdx && !completions[i])
                if (next !== undefined) setDailyIdx(next)
            }
        } else if (folds <= 0) {
            setBoard(puzzle.start)
            setHistory([puzzle.start])
            setFolds(puzzle.folds)
        }
    }

    const primaryLabel = isWon
        ? mode === 'tutorial'
            ? tutorialIdx < puzzleData.tutorial.length - 1 ? 'Next Puzzle' : 'Play Today\'s Puzzles'
            : [0, 1, 2].find(i => i !== dailyIdx && !completions[i]) !== undefined ? 'Next Puzzle' : 'All Done!'
        : folds <= 0 ? 'Retry Puzzle'
        : null

    const base = import.meta.env.BASE_URL

    return (
        <div className="game-container">
            <TopBar title="Folds" onHelp={() => setShowInstructions(true)} />

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
                        <span className="stats-label">Folds Left</span>
                        <span className="stats-num">{folds}</span>
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
                        <PuzzleBoxes current={dailyIdx} completions={completions} onChange={setDailyIdx} />
                    </div>
                    <div className="stats-group">
                        <span className="stats-label">Folds Left</span>
                        <span className="stats-num">{folds}</span>
                    </div>
                </div>
            )}

            <div className="game-stage" style={{ border: 'none', boxShadow: 'none', outline: 'none', background: 'transparent' }}>
                <div id="canvas-wrapper" style={{ border: 'none', outline: 'none', boxShadow: 'none' }}>
                    <svg
                        viewBox={`${HEX_VIEWBOX.x} ${HEX_VIEWBOX.y} ${HEX_VIEWBOX.w} ${HEX_VIEWBOX.h}`}
                        preserveAspectRatio="xMidYMid meet"
                        style={{ width: '100%', height: '100%', display: 'block' }}
                    >
                        <g transform={`rotate(30 ${HEX_BOUNDS.minX + HEX_BOUNDS.width/2} ${HEX_BOUNDS.minY + HEX_BOUNDS.height/2})`}>
                            {ALL_TRIANGLES.map(t => <polygon key={t.key} points={pts(t.r, t.c)} fill="none" stroke="#f1f5f9" strokeWidth="1.5" />)}
                            {Object.entries(puzzle.target).map(([k, col]) => {
                                const [r, c] = k.split(',').map(Number)
                                return <polygon key={`t-${k}`} points={pts(r, c)} fill={col} opacity="0.1" stroke={col} strokeWidth="2" />
                            })}
                            {Object.entries(board).map(([k, col]) => {
                                const [r, c] = k.split(',').map(Number)
                                return <polygon key={`b-${k}`} points={pts(r, c)} fill={col} className={isWon ? 'pulse-win' : ''} style={{ transformOrigin: `${cent(r,c).x}px ${cent(r,c).y}px` }} />
                            })}
                            {anim && (
                                <g transform={`matrix(${1 + easeIO(anim.rawT) * (Math.cos(2 * anim.line.theta) - 1)} ${easeIO(anim.rawT) * Math.sin(2 * anim.line.theta)} ${easeIO(anim.rawT) * Math.sin(2 * anim.line.theta)} ${1 - easeIO(anim.rawT) * (1 + Math.cos(2 * anim.line.theta))} ${easeIO(anim.rawT) * (anim.line.px * (1 - Math.cos(2 * anim.line.theta)) - anim.line.py * Math.sin(2 * anim.line.theta))} ${easeIO(anim.rawT) * (anim.line.py * (1 + Math.cos(2 * anim.line.theta)) - anim.line.px * Math.sin(2 * anim.line.theta))})`}>
                                    {Object.entries(anim.startBoard).map(([key, col]) => {
                                        const [r, c] = key.split(',').map(Number)
                                        return <polygon key={`a-${key}`} points={pts(r, c)} fill={col} opacity={0.5} />
                                    })}
                                </g>
                            )}
                            {ALL_LINES.map(l => (
                                <g key={l.lineKey} className="fold-group"
                                    onPointerEnter={(e) => {
                                        if (Date.now() < ignoreBoardPointerUntilRef.current) return
                                        if (e.pointerType !== 'mouse') return
                                        if (hoverDelayRef.current) clearTimeout(hoverDelayRef.current)
                                        hoverDelayRef.current = setTimeout(() => setHoverLine(l.lineKey), 80)
                                    }}
                                    onPointerLeave={(e) => {
                                        if (Date.now() < ignoreBoardPointerUntilRef.current) return
                                        if (e.pointerType !== 'mouse') return
                                        if (hoverDelayRef.current) { clearTimeout(hoverDelayRef.current); hoverDelayRef.current = null }
                                        setHoverLine(h => (h === l.lineKey ? null : h))
                                    }}
                                    onPointerDown={(e) => {
                                        if (Date.now() < ignoreBoardPointerUntilRef.current) return
                                        e.preventDefault()
                                        if (e.pointerType === 'mouse') {
                                            setTapFlash(l.lineKey)
                                            setTimeout(() => setTapFlash(null), 120)
                                            setPendingFoldLine(null)
                                            handleFold(l.lineKey)
                                            return
                                        }
                                        if (e.pointerType === 'touch') {
                                            if (pendingFoldLine === null) {
                                                setPendingFoldLine(l.lineKey)
                                            } else if (pendingFoldLine === l.lineKey) {
                                                setPendingFoldLine(null)
                                                handleFold(l.lineKey)
                                            } else {
                                                setPendingFoldLine(l.lineKey)
                                            }
                                        }
                                    }}
                                >
                                    <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} className="fold-hit" stroke="transparent" strokeWidth="22" style={{ pointerEvents: 'stroke' }} />
                                    <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} className="fold-visual" strokeWidth={isLineHighlighted(l.lineKey) ? 4 : 2} style={{ stroke: getLineStroke(l.lineKey) }} />
                                </g>
                            ))}
                            {pendingFoldLine && (() => {
                                const l = ALL_LINES.find(ln => ln.lineKey === pendingFoldLine)
                                if (!l) return null
                                const cx = (l.x1 + l.x2) / 2, cy = (l.y1 + l.y2) / 2
                                const confirmFold = (e) => {
                                    if (Date.now() < ignoreBoardPointerUntilRef.current) return
                                    e.stopPropagation()
                                    e.preventDefault()
                                    setPendingFoldLine(null)
                                    handleFold(l.lineKey)
                                }
                                return (
                                    <g key="fold-overlay">
                                        <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={getLineStroke(l.lineKey)} strokeWidth={4} style={{ pointerEvents: 'stroke' }} onPointerDown={confirmFold} />
                                        <g transform={`rotate(-30 ${cx} ${cy})`} onPointerDown={confirmFold} style={{ cursor: 'pointer' }}>
                                            <circle cx={cx} cy={cy} r={20} fill={getLineStroke(l.lineKey)} />
                                            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={10} fontWeight={700} style={{ userSelect: 'none', pointerEvents: 'none' }}>FOLD</text>
                                        </g>
                                    </g>
                                )
                            })()}
                        </g>
                    </svg>
                </div>
            </div>

            {toast && (
                <div className="toast toast-panel">
                    <div className="toast-row">
                        <div className="toast-text">
                            {toast === 'offboard'
                                ? 'Reflections that place a triangle off the board are not allowed.'
                                : 'Reflections that place a triangle of one color onto a triangle of a different color are not allowed.'}
                        </div>
                        <button onClick={() => setToast(null)} className="toast-close" aria-label="Dismiss">
                            <span style={{ display: 'inline-block', transform: 'translateY(-0.5px)' }}>✕</span>
                        </button>
                    </div>
                    <label className="toast-checkbox">
                        <input type="checkbox" onChange={(e) => {
                            if (e.target.checked) {
                                const key = toast === 'offboard' ? 'folds_hide_offboard_toast' : 'folds_hide_color_toast'
                                localStorage.setItem(key, '1')
                            }
                        }} />
                        <span>Do not show again.</span>
                    </label>
                </div>
            )}

            <div className="button-tray">
                <button
                    onClick={() => {
                        if (history.length <= 1) return
                        const prev = history.slice(0, -1)
                        setBoard(prev[prev.length - 1])
                        setHistory(prev)
                        setFolds(f => f + 1)
                    }}
                    disabled={history.length <= 1}
                    className="btn-secondary"
                >Undo</button>
                <button
                    onClick={() => {
                        setBoard(puzzle.start)
                        setHistory([puzzle.start])
                        setFolds(puzzle.folds)
                    }}
                    className="btn-secondary"
                >Reset</button>
            </div>

            {(anim || (!isWon && folds > 0)) ? (
                <div className="goal-text">Match the Pattern</div>
            ) : primaryLabel === 'All Done!' ? (
                <a href={base} className="btn-primary"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    All Puzzles
                </a>
            ) : primaryLabel ? (
                <button className="btn-primary" onClick={handlePrimaryClick}>{primaryLabel}</button>
            ) : null}

            {showInstructions && (
                <div id="instructions-overlay">
                    <div className="modal-content" style={{ position: 'relative' }}>
                        <button onClick={() => { setHoverLine(null); setPendingFoldLine(null); ignoreBoardPointerUntilRef.current = Date.now() + 400; setShowInstructions(false) }} aria-label="Close instructions"
                            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '22px', fontWeight: 900, cursor: 'pointer', lineHeight: 1, padding: '4px' }}>✕</button>
                        <h1 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>Folds</h1>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                                <FoldsIcon size={80} />
                            </div>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                                Fold the shapes along the grid lines to match the <b>target pattern</b>.
                                <br />
                                Reflections that place a triangle off the board or onto a triangle of a different color are not allowed.
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button className="btn-primary" onClick={() => { setHoverLine(null); setPendingFoldLine(null); ignoreBoardPointerUntilRef.current = Date.now() + 400; setMode('daily'); setDailyIdx(0); setShowInstructions(false) }}> Play Today's Puzzles</button>
                            <button className="btn-secondary" onClick={() => { setHoverLine(null); setPendingFoldLine(null); ignoreBoardPointerUntilRef.current = Date.now() + 400; setMode('tutorial'); setTutorialIdx(0); setShowInstructions(false) }}>Tutorial Puzzles</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App