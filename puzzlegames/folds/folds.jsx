import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import puzzleData from './puzzles.js'
import { fillColor } from './palette.js'
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
import { parseHubDailyPuzzleParam } from '../../shared-contracts/hubEntry.js'
import { hasShareableHubProgress } from '../../shared-contracts/hubSharePlaintext.js'
import GameShareNavButton from '../../src/shared/GameShareNavButton.jsx'
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
const BROWN = '#653700'
/** Emphasized fold line / touch confirm (lighter than suite ink for legibility on the grid). */
const FOLD_LINE_ACCENT = '#3473CB'

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

const isPointInsideHex = (x, y) => {
    let inside = false
    for (let i = 0, j = HEX_POLY.length - 1; i < HEX_POLY.length; j = i++) {
        const xi = HEX_POLY[i].x, yi = HEX_POLY[i].y, xj = HEX_POLY[j].x, yj = HEX_POLY[j].y
        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi)) inside = !inside
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

const triangleVertices = (r, c) => {
    const s = pts(r, c)
    return s.split(' ').map(p => { const [x, y] = p.split(',').map(Number); return { x, y } })
}

function pointToSegmentDistSq(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1, dy = y2 - y1
    const len2 = dx * dx + dy * dy
    if (len2 < 1e-12) return (px - x1) ** 2 + (py - y1) ** 2
    let t = ((px - x1) * dx + (py - y1) * dy) / len2
    t = Math.max(0, Math.min(1, t))
    const qx = x1 + t * dx, qy = y1 + t * dy
    return (px - qx) ** 2 + (py - qy) ** 2
}

function getFoldButtonPosition(line, anchor) {
    const midX = (line.x1 + line.x2) / 2, midY = (line.y1 + line.y2) / 2
    if (!anchor || typeof anchor.x !== 'number' || typeof anchor.y !== 'number') return { cx: midX, cy: midY }
    const ax = anchor.x, ay = anchor.y
    const a = -Math.sin(line.theta), b = Math.cos(line.theta), c = a * line.px + b * line.py
    const onLine = (x, y) => Math.abs(a * x + b * y - c) < 1e-6
    const lineLen2 = (line.x2 - line.x1) ** 2 + (line.y2 - line.y1) ** 2

    let bestDist2 = Infinity, bestCx = midX, bestCy = midY

    const [r0, c0] = snap(ax, ay)
    const candidates = []
    if (isInsideHex(r0, c0)) candidates.push([r0, c0])
    const re = Math.round((ay - PAD) / H), ce = Math.round(2 * (ax - PAD) / S) - 1
    for (let r = Math.max(0, re - 3); r <= Math.min(10, re + 3); r++)
        for (let col = Math.max(-6, ce - 4); col <= Math.min(20, ce + 4); col++) {
            if (!isInsideHex(r, col)) continue
            if (candidates.some(([rr, cc]) => rr === r && cc === col)) continue
            candidates.push([r, col])
        }

    for (const [r, col] of candidates) {
        const verts = triangleVertices(r, col)
        for (let i = 0; i < 3; i++) {
            const v0 = verts[i], v1 = verts[(i + 1) % 3]
            if (!onLine(v0.x, v0.y) || !onLine(v1.x, v1.y)) continue
            const dist2 = pointToSegmentDistSq(ax, ay, v0.x, v0.y, v1.x, v1.y)
            if (dist2 < bestDist2) {
                bestDist2 = dist2
                bestCx = (v0.x + v1.x) / 2
                bestCy = (v0.y + v1.y) / 2
            }
        }
    }

    if (bestDist2 < Infinity) return { cx: bestCx, cy: bestCy }

    if (lineLen2 >= 1e-12) {
        const dx = line.x2 - line.x1, dy = line.y2 - line.y1
        let t = ((ax - line.x1) * dx + (ay - line.y1) * dy) / lineLen2
        t = Math.max(0, Math.min(1, t))
        let px = line.x1 + t * dx, py = line.y1 + t * dy
        const vEps = 8
        if ((px - line.x1) ** 2 + (py - line.y1) ** 2 < vEps * vEps) t = Math.min(1, vEps / Math.sqrt(lineLen2))
        else if ((px - line.x2) ** 2 + (py - line.y2) ** 2 < vEps * vEps) t = Math.max(0, 1 - vEps / Math.sqrt(lineLen2))
        px = line.x1 + t * dx
        py = line.y1 + t * dy
        return { cx: px, cy: py }
    }
    return { cx: midX, cy: midY }
}

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
    return [0, 1, 2].map(i => ['1', '2'].includes(localStorage.getItem(`folds:${dateKey}:${i}`)))
}

function loadPerfects(dateKey) {
    return [0, 1, 2].map(i => localStorage.getItem(`folds:${dateKey}:${i}`) === '2')
}

function markComplete(dateKey, idx, isPerfect) {
    const key = `folds:${dateKey}:${idx}`
    const existing = localStorage.getItem(key)
    if (existing === '1' || existing === '2') return
    localStorage.setItem(key, isPerfect ? '2' : '1')
}

function foldsWipKey(dateKey, idx) {
    return `folds:${dateKey}:${idx}:wip`
}

function foldsLevelFingerprint(puzzle) {
    if (!puzzle) return ''
    return JSON.stringify({ s: puzzle.start, t: puzzle.target, f: puzzle.folds })
}

function clearFoldsWip(dateKey, idx) {
    try {
        localStorage.removeItem(foldsWipKey(dateKey, idx))
    } catch {
        // ignore
    }
}

function loadFoldsWip(dateKey, idx, puzzle) {
    const fp = foldsLevelFingerprint(puzzle)
    if (!fp) return null
    try {
        const raw = localStorage.getItem(foldsWipKey(dateKey, idx))
        if (!raw) return null
        const d = JSON.parse(raw)
        if (!d || d.v !== 1 || d.fp !== fp || typeof d.board !== 'object' || !Array.isArray(d.history) || typeof d.folds !== 'number') {
            return null
        }
        return { board: d.board, history: d.history, folds: d.folds }
    } catch {
        return null
    }
}

function saveFoldsWip(dateKey, idx, puzzle, board, folds, history) {
    const fp = foldsLevelFingerprint(puzzle)
    if (!fp) return
    try {
        localStorage.setItem(
            foldsWipKey(dateKey, idx),
            JSON.stringify({ v: 1, fp, board, folds, history }),
        )
    } catch {
        // ignore
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
                    fontWeight: 900, fontSize: '1.06rem', cursor: 'pointer', transition: 'all 0.2s',
                    transform: current === i ? 'scale(1.1)' : 'scale(1)',
                    transformOrigin: 'center center',
                }}>
                    {completions[i] ? (perfects && perfects[i] ? '★' : '✓') : <DiceFace count={i + 1} size={20} />}
                </button>
            ))}
        </div>
    )
}

// ── Main component ───────────────────────────────────────────────────────────
const App = () => {
    const chrome = getGameChrome(GAME_KEYS.FOLDS)
    const daily = useMemo(() => getDailyPuzzles(), [])
    const dateLabel = useMemo(() => getDateLabel(), [])

    const usedUndoOrResetRef = useRef(false)
    const [mode, setMode] = useState('daily') // 'daily' | 'tutorial'
    const [tutorialIdx, setTutorialIdx] = useState(0)
    const [dailyIdx, setDailyIdx] = useState(() => parseHubDailyPuzzleParam())
    const [completions, setCompletions] = useState(() => loadCompletions(daily.key))
    const [perfects, setPerfects] = useState(() => loadPerfects(daily.key))
    const canShareHub = useMemo(
        () => hasShareableHubProgress(GAME_KEYS.FOLDS, daily.key),
        [daily.key, completions],
    )
    const {
        hasSeenInstructions,
        showInstructions,
        setShowInstructions,
        closeInstructions: closeInstructionsBase,
    } = useInstructionsGate('folds:hasSeenInstructions', { openOnMount: true, completionStoragePrefix: 'folds' })
    const [showLinks, setShowLinks] = useState(false)
    const [showStats, setShowStats] = useState(false)
    const [showCompletionModal, setShowCompletionModal] = useState(false)
    const allDailyDoneCompletionRef = useRef(null)

    const [tapFlash, setTapFlash] = useState(null)
    const [hoverLine, setHoverLine] = useState(null)
    const [pendingFoldLine, setPendingFoldLine] = useState(null)
    const [pendingFoldAnchor, setPendingFoldAnchor] = useState(null)
    const pendingFoldLineRef = useRef(null)
    const svgRef = useRef(null)
    const canvasWrapperRef = useRef(null)
    const t0 = useRef(0)
    const hoverDelayRef = useRef(null)
    const ignoreBoardPointerUntilRef = useRef(0)

    const clientToGrid = useCallback((clientX, clientY) => {
        const svg = svgRef.current
        if (!svg || !svg.createSVGPoint) return null
        const pt = svg.createSVGPoint()
        pt.x = clientX
        pt.y = clientY
        const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse())
        const cx = HEX_BOUNDS.minX + HEX_BOUNDS.width / 2
        const cy = HEX_BOUNDS.minY + HEX_BOUNDS.height / 2
        const angle = -Math.PI / 6
        const cos = Math.cos(angle), sin = Math.sin(angle)
        const rx = svgPt.x - cx, ry = svgPt.y - cy
        return { x: cx + rx * cos - ry * sin, y: cy + rx * sin + ry * cos }
    }, [])

    /** Clears hover / pending fold UI. Use ignorePointerMs (e.g. 400) after modal close to absorb stray pointer events. */
    const clearFoldLineInteractionState = useCallback((options = {}) => {
        const { ignorePointerMs = false } = options
        if (hoverDelayRef.current) {
            clearTimeout(hoverDelayRef.current)
            hoverDelayRef.current = null
        }
        setHoverLine(null)
        setPendingFoldLine(null)
        setPendingFoldAnchor(null)
        setTapFlash(null)
        if (typeof ignorePointerMs === 'number' && ignorePointerMs > 0) {
            ignoreBoardPointerUntilRef.current = Date.now() + ignorePointerMs
        }
    }, [])

    const closeInstructions = useCallback(() => {
        clearFoldLineInteractionState({ ignorePointerMs: 400 })
        closeInstructionsBase()
    }, [closeInstructionsBase, clearFoldLineInteractionState])

    const closeStats = useCallback(() => {
        clearFoldLineInteractionState({ ignorePointerMs: 400 })
        setShowStats(false)
    }, [clearFoldLineInteractionState])

    const closeLinks = useCallback(() => {
        clearFoldLineInteractionState({ ignorePointerMs: 400 })
        setShowLinks(false)
    }, [clearFoldLineInteractionState])

    const puzzle = useMemo(() => {
        if (mode === 'tutorial') return puzzleData.tutorial[tutorialIdx]
        return daily.puzzles[dailyIdx]
    }, [mode, tutorialIdx, dailyIdx, daily])

    const [board, setBoard] = useState(puzzle.start)
    const [history, setHistory] = useState([puzzle.start])
    const [folds, setFolds] = useState(puzzle.folds)
    const [anim, setAnim] = useState(null)

    useEffect(() => {
        clearFoldLineInteractionState()
        if (mode === 'tutorial') {
            setBoard(puzzle.start)
            setHistory([puzzle.start])
            setFolds(puzzle.folds)
            setAnim(null)
            usedUndoOrResetRef.current = false
            return
        }
        const loaded = loadFoldsWip(daily.key, dailyIdx, puzzle)
        if (loaded) {
            setBoard(loaded.board)
            setHistory(loaded.history)
            setFolds(loaded.folds)
            setAnim(null)
            usedUndoOrResetRef.current = false
            return
        }
        setBoard(puzzle.start)
        setHistory([puzzle.start])
        setFolds(puzzle.folds)
        setAnim(null)
        usedUndoOrResetRef.current = false
    }, [puzzle, mode, daily.key, dailyIdx, clearFoldLineInteractionState])

    useEffect(() => {
        if (mode !== 'daily' || !puzzle || anim) return
        saveFoldsWip(daily.key, dailyIdx, puzzle, board, folds, history)
    }, [mode, daily.key, dailyIdx, puzzle, board, folds, history, anim])

    useEffect(() => () => {
        if (hoverDelayRef.current) clearTimeout(hoverDelayRef.current)
    }, [])

    useEffect(() => {
        pendingFoldLineRef.current = pendingFoldLine
    }, [pendingFoldLine])

    useEffect(() => {
        const onPointerDownCapture = (e) => {
            if (showInstructions || showStats || showLinks) return
            const wrap = canvasWrapperRef.current
            if (!wrap || wrap.contains(e.target)) return
            const el = e.target instanceof Element ? e.target : e.target?.parentElement
            if (el && el.closest('[data-fold-confirm]')) return
            clearFoldLineInteractionState()
        }
        window.addEventListener('pointerdown', onPointerDownCapture, true)
        return () => window.removeEventListener('pointerdown', onPointerDownCapture, true)
    }, [showInstructions, showStats, showLinks, clearFoldLineInteractionState])

    const onSvgPointerDownCapture = useCallback((e) => {
        if (e.pointerType !== 'touch') return
        if (!pendingFoldLineRef.current) return
        if (showInstructions || showStats || showLinks) return
        if (Date.now() < ignoreBoardPointerUntilRef.current) return
        const raw = e.target
        const el = raw instanceof Element ? raw : raw?.parentElement
        if (!el || !(el instanceof Element)) return
        if (el.closest('.fold-group') || el.closest('[data-fold-overlay]')) return
        clearFoldLineInteractionState()
    }, [showInstructions, showStats, showLinks, clearFoldLineInteractionState])

    const isWon = useMemo(() => {
        const tK = Object.keys(puzzle.target), bK = Object.keys(board)
        if (bK.length !== tK.length) return false
        for (const k of tK) if (board[k] !== puzzle.target[k]) return false
        return true
    }, [board, puzzle])

    // Mark complete when won
    useEffect(() => {
        if (isWon && mode === 'daily') {
            markComplete(daily.key, dailyIdx, !usedUndoOrResetRef.current)
            setCompletions(loadCompletions(daily.key))
            setPerfects(loadPerfects(daily.key))
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
            if (!isInsideHex(nr, nc) || dist2 > SNAP_TOL) continue
            const destKey = `${nr},${nc}`
            // Color overlaps are allowed; conflicts will become brown in the fold application.
        }
        return { ok: true, reason: null }
    }

    const handleFold = (lineKey) => {
        if (folds <= 0 || anim || isWon) return
        const result = validateFold(lineKey)
        if (!result.ok) return
        const line = ALL_LINES.find(l => l.lineKey === lineKey)
        const next = { ...board }
        const lostKeys = {}
        const c2 = Math.cos(2 * line.theta), s2 = Math.sin(2 * line.theta)
        for (const [key, color] of Object.entries(board)) {
            const [r, c] = key.split(',').map(Number)
            const cp = cent(r, c)
            const nx = line.px + (cp.x - line.px) * c2 + (cp.y - line.py) * s2
            const ny = line.py + (cp.x - line.px) * s2 - (cp.y - line.py) * c2
            const [nr, nc] = snap(nx, ny)
            const sp = cent(nr, nc)
            const dist2 = (sp.x - nx) ** 2 + (sp.y - ny) ** 2
            if (isPointInsideHex(nx, ny) && isInsideHex(nr, nc) && dist2 <= SNAP_TOL) {
                const destKey = `${nr},${nc}`
                const prev = next[destKey]
                if (prev === undefined || prev === color) next[destKey] = color
                else next[destKey] = BROWN
            } else {
                lostKeys[key] = true
            }
        }
        t0.current = performance.now()
        setAnim({ line, startBoard: { ...board }, finalBoard: next, lostKeys, rawT: 0 })
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

    const isFoldLineEmphasized = (lineKey) =>
        hoverLine === lineKey || pendingFoldLine === lineKey || tapFlash === lineKey

    const getLineStroke = (lineKey) => {
        if (isFoldLineEmphasized(lineKey)) return FOLD_LINE_ACCENT
        return '#cbd5e1'
    }

    const confirmPendingFold = useCallback(() => {
        const lineKey = pendingFoldLineRef.current
        if (!lineKey) return
        setPendingFoldLine(null)
        setPendingFoldAnchor(null)
        handleFold(lineKey)
    }, [handleFold])

    const handlePrimaryClick = () => {
        if (isWon) {
            if (mode === 'daily') clearFoldsWip(daily.key, dailyIdx)
            if (mode === 'tutorial') {
                if (tutorialIdx < puzzleData.tutorial.length - 1) setTutorialIdx(i => i + 1)
                else { setMode('daily'); setDailyIdx(0) }
            } else {
                const next = [0, 1, 2].find(i => i !== dailyIdx && !completions[i])
                if (next !== undefined) setDailyIdx(next)
            }
        } else if (folds <= 0) {
            usedUndoOrResetRef.current = true
            if (mode === 'daily') clearFoldsWip(daily.key, dailyIdx)
            setBoard(puzzle.start)
            setHistory([puzzle.start])
            setFolds(puzzle.folds)
        }
    }

    const primaryLabel = isWon
        ? mode === 'tutorial'
            ? tutorialIdx < puzzleData.tutorial.length - 1 ? CTA_LABELS.NEXT_PUZZLE : CTA_LABELS.PLAY_TODAY
            : [0, 1, 2].find(i => i !== dailyIdx && !completions[i]) !== undefined ? CTA_LABELS.NEXT_PUZZLE : CTA_LABELS.ALL_PUZZLES
        : folds <= 0 ? 'Retry Puzzle'
        : null

    useEffect(() => {
        if (mode !== 'daily') return
        const done = completions.every(Boolean)
        if (allDailyDoneCompletionRef.current === null) {
            allDailyDoneCompletionRef.current = done
            return
        }
        if (done && !allDailyDoneCompletionRef.current) {
            setTimeout(() => {
                setShowCompletionModal(true)
            }, 500)
        }
        allDailyDoneCompletionRef.current = done
    }, [mode, completions])

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
                        <div className="game-dice-share-anchor" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="game-dice-share-phantom" aria-hidden />
                            <div className="game-dice-share-gap" aria-hidden />
                            <PuzzleBoxes current={dailyIdx} completions={completions} perfects={perfects} onChange={setDailyIdx} />
                            <div className="game-dice-share-gap" aria-hidden />
                            <GameShareNavButton gameKey={GAME_KEYS.FOLDS} dateKey={daily.key} canShare={canShareHub} />
                        </div>
                    </div>
                    <div className="stats-group">
                        <span className="stats-label">Folds Left</span>
                        <span className="stats-num">{folds}</span>
                    </div>
                </div>
            )}

            <div className="game-stage" style={{ border: 'none', boxShadow: 'none', outline: 'none', background: 'transparent' }}>
                <div id="canvas-wrapper" ref={canvasWrapperRef} style={{ border: 'none', outline: 'none', boxShadow: 'none' }}>
                    <svg
                        ref={svgRef}
                        viewBox={`${HEX_VIEWBOX.x} ${HEX_VIEWBOX.y} ${HEX_VIEWBOX.w} ${HEX_VIEWBOX.h}`}
                        preserveAspectRatio="xMidYMid meet"
                        style={{ width: '100%', height: '100%', display: 'block' }}
                        onPointerDownCapture={onSvgPointerDownCapture}
                    >
                        <g transform={`rotate(30 ${HEX_BOUNDS.minX + HEX_BOUNDS.width/2} ${HEX_BOUNDS.minY + HEX_BOUNDS.height/2})`}>
                            {ALL_TRIANGLES.map(t => <polygon key={t.key} points={pts(t.r, t.c)} fill="none" stroke="#f1f5f9" strokeWidth="1.5" />)}
                            {Object.entries(puzzle.target).map(([k, col]) => {
                                const [r, c] = k.split(',').map(Number)
                                const hex = fillColor(col)
                                return <polygon key={`t-${k}`} points={pts(r, c)} fill={hex} opacity="0.15" stroke={hex} strokeWidth="2" />
                            })}
                            {Object.entries(board).map(([k, col]) => {
                                const [r, c] = k.split(',').map(Number)
                                return <polygon key={`b-${k}`} points={pts(r, c)} fill={fillColor(col)} className={isWon ? 'pulse-win' : ''} style={{ transformOrigin: `${cent(r,c).x}px ${cent(r,c).y}px` }} />
                            })}
                            {anim && (
                                <g transform={`matrix(${1 + easeIO(anim.rawT) * (Math.cos(2 * anim.line.theta) - 1)} ${easeIO(anim.rawT) * Math.sin(2 * anim.line.theta)} ${easeIO(anim.rawT) * Math.sin(2 * anim.line.theta)} ${1 - easeIO(anim.rawT) * (1 + Math.cos(2 * anim.line.theta))} ${easeIO(anim.rawT) * (anim.line.px * (1 - Math.cos(2 * anim.line.theta)) - anim.line.py * Math.sin(2 * anim.line.theta))} ${easeIO(anim.rawT) * (anim.line.py * (1 + Math.cos(2 * anim.line.theta)) - anim.line.px * Math.sin(2 * anim.line.theta))})`}>
                                    {Object.entries(anim.startBoard).map(([key, col]) => {
                                        const [r, c] = key.split(',').map(Number)
                                        const fadeT = easeIO(anim.rawT)
                                        const isLost = !!anim.lostKeys?.[key]
                                        const opacity = isLost ? 0.5 * (1 - fadeT) : 0.5
                                        return <polygon key={`a-${key}`} points={pts(r, c)} fill={fillColor(col)} opacity={opacity} />
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
                                            const grid = clientToGrid(e.clientX, e.clientY)
                                            if (pendingFoldLine === null) {
                                                setPendingFoldLine(l.lineKey)
                                                setPendingFoldAnchor(grid || null)
                                            } else if (pendingFoldLine === l.lineKey) {
                                                setPendingFoldLine(null)
                                                setPendingFoldAnchor(null)
                                                handleFold(l.lineKey)
                                            } else {
                                                setPendingFoldLine(l.lineKey)
                                                setPendingFoldAnchor(grid || null)
                                            }
                                        }
                                    }}
                                >
                                    <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} className="fold-hit" stroke="transparent" strokeWidth="22" style={{ pointerEvents: 'stroke' }} />
                                    {!isFoldLineEmphasized(l.lineKey) && (
                                        <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} className="fold-visual" strokeWidth={2} style={{ stroke: getLineStroke(l.lineKey) }} />
                                    )}
                                </g>
                            ))}
                            {ALL_LINES.filter(l => isFoldLineEmphasized(l.lineKey) && pendingFoldLine !== l.lineKey).map(l => (
                                <line
                                    key={`fold-emphasis-${l.lineKey}`}
                                    x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                                    className="fold-visual"
                                    strokeWidth={4}
                                    style={{ stroke: FOLD_LINE_ACCENT, pointerEvents: 'none' }}
                                />
                            ))}
                            {pendingFoldLine && (() => {
                                const l = ALL_LINES.find(ln => ln.lineKey === pendingFoldLine)
                                if (!l) return null
                                const { cx, cy } = getFoldButtonPosition(l, pendingFoldAnchor)
                                const confirmFold = (e) => {
                                    if (Date.now() < ignoreBoardPointerUntilRef.current) return
                                    e.stopPropagation()
                                    e.preventDefault()
                                    confirmPendingFold()
                                }
                                return (
                                    <g key="fold-overlay" data-fold-overlay="">
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

            <div className="button-tray">
                <button
                    onClick={() => {
                        clearFoldLineInteractionState()
                        usedUndoOrResetRef.current = true
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
                        clearFoldLineInteractionState()
                        usedUndoOrResetRef.current = true
                        if (mode === 'daily') clearFoldsWip(daily.key, dailyIdx)
                        setBoard(puzzle.start)
                        setHistory([puzzle.start])
                        setFolds(puzzle.folds)
                    }}
                    disabled={history.length <= 1 && !pendingFoldLine && !pendingFoldAnchor}
                    className="btn-secondary"
                >Reset</button>
            </div>

            {!anim && !isWon && folds > 0 && pendingFoldLine ? (
                <button className="btn-primary" data-fold-confirm onClick={confirmPendingFold}>FOLD</button>
            ) : (anim || (!isWon && folds > 0)) ? (
                <div className="goal-text">Match the Pattern</div>
            ) : primaryLabel === CTA_LABELS.ALL_PUZZLES ? (
                <a href={base} className="btn-primary"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {CTA_LABELS.ALL_PUZZLES}
                </a>
            ) : primaryLabel ? (
                <button className="btn-primary" onClick={handlePrimaryClick}>{primaryLabel}</button>
            ) : null}

            <SharedModalShell show={showInstructions} onClose={closeInstructions} intent={MODAL_INTENTS.INSTRUCTIONS}>
                <h1 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>Folds</h1>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                        <FoldsIcon size={80} />
                    </div>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Fold the shapes along the grid lines to match the <b>target pattern</b>.
                        <br />
                        Reflections that place triangles off the board will cause those triangles to disappear.
                        Reflections that place a triangle of one color onto a triangle of a different color will create a brown triangle.
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
                            <button className="btn-primary" onClick={() => { closeInstructions(); setMode('daily'); setDailyIdx(0) }}>{CTA_LABELS.PLAY_TODAY}</button>
                            <button className="btn-secondary" onClick={() => { closeInstructions(); setMode('tutorial'); setTutorialIdx(0) }}>{CTA_LABELS.TUTORIAL_PUZZLES}</button>
                        </>
                    )}
                </div>
            </SharedModalShell>

            <AllTenLinksModal show={showLinks} onClose={closeLinks} />
            <SimpleGameStatsModal
                show={showStats}
                onClose={closeStats}
                gameKey={GAME_KEYS.FOLDS}
            />
            <SuiteGameCompletionModal
                show={showCompletionModal}
                onClose={() => setShowCompletionModal(false)}
                gameKey={GAME_KEYS.FOLDS}
                dateKey={daily.key}
            />
        </div>
    )
}

export default App