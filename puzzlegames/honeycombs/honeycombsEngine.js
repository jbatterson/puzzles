import { CTA_LABELS } from '../../shared-contracts/ctaLabels.js'
import { HONEYCOMBS_BEE_ART_INNER_HTML } from '../../src/shared/icons/honeycombsBeeArtSvg.js'

/**
 * Imperative SVG + keyboard game logic for Honeycombs (mounted inside React).
 * @param {{
 *   mount: HTMLElement,
 *   puzzles: unknown[],
 *   dateKey: string,
 *   hubBaseHref: string,
 *   onRequestNextPuzzle?: () => void,
 *   onCompletionsUpdated?: () => void,
 *   isBlockingModalOpen?: () => boolean,
 *   onWinAnimationComplete?: (puzzleIdx: number) => void,
 *   trackCompletion?: boolean,
 *   finalSolvedAction?: { label: string, href?: string, onClick?: () => void } | null,
 * }} options
 */
export function createHoneycombsEngine({
  mount,
  puzzles: enginePuzzles,
  dateKey: engineDateKey,
  hubBaseHref,
  onRequestNextPuzzle,
  onCompletionsUpdated,
  isBlockingModalOpen,
  onWinAnimationComplete,
  trackCompletion = true,
  finalSolvedAction = null,
}) {
  let svg = mount.querySelector('#hex-grid')
  let keyboard = mount.querySelector('#keyboard')
  if (!svg || !keyboard) {
    throw new Error('createHoneycombsEngine: mount must contain #hex-grid and #keyboard')
  }

// HEX GRID DEFINITIONS
//
// Pointy-top honeycomb geometry:
//   - Hex center-to-center horizontal distance = HEX_W  (= R*√3)
//   - Hex center-to-center vertical distance   = HEX_H * 0.75  (= R*1.5)
//   - Every other row is staggered RIGHT by HEX_W/2
//
// For each grid shape we store the row lengths AND a per-row stagger
// value (in units of HEX_W/2) that places rows correctly so they
// share edges. The stagger is chosen so the whole shape is centered.
//
// Stagger logic for a honeycomb (pointy-top, rows nest left-right):
//   The widest row has stagger 0 (flush left of the bounding box).
//   Each row that is 1 cell shorter than the widest adds +1 stagger.
//   But in a real honeycomb the nesting alternates: each row relative
//   to its neighbor is offset by exactly +0.5 or -0.5 hex widths.
//
// We use absolute pixel offsets per row, computed so edges are shared.
// ═══════════════════════════════════════════════════════════

const GRID_DEFS = {
  // rowOffsets: x-offset of each row's leftmost cell center,
  //             expressed as multiples of HEX_W.
  // 0 = aligned with widest row's left edge.
  // 0.5 = shifted right by half a hex width.
  small:  { rows: [3, 4, 3], rowOffsets: [0.5, 0, 0.5] },
  medium: { rows: [3, 4, 4, 3], rowOffsets: [0.5, 0, 0.5, 1.0] },
  large:  { rows: [3, 4, 5, 4, 3], rowOffsets: [1.0, 0.5, 0, 0.5, 1.0] },
}

const HEX_GAP = 3     // gap between hex edges in pixels
let HEX_R     = 32    // circumradius (responsive)
let HEX_W     = HEX_R * Math.sqrt(3) + HEX_GAP   // center-to-center horizontal
let HEX_H     = HEX_R * 2                          // center-to-center vertical (before 0.75 factor)
let HEX_VER   = HEX_H * 0.75 + HEX_GAP * 0.577    // center-to-center vertical (with gap)
const HEX_R_MIN = 12
// Universal cap across all sizes: max hex height ≈ 2×40 = 80px
const HEX_R_MAX = 40

function setHexGeometry(radius) {
  HEX_R = Math.max(HEX_R_MIN, Math.min(HEX_R_MAX, radius))
  HEX_W = HEX_R * Math.sqrt(3) + HEX_GAP
  HEX_H = HEX_R * 2
  HEX_VER = HEX_H * 0.75 + HEX_GAP * 0.577
}

function measureGridForRadius(size, radius) {
  const { rows, rowOffsets } = GRID_DEFS[size]
  const hexW = radius * Math.sqrt(3) + HEX_GAP
  const hexVer = radius * 1.5 + HEX_GAP * 0.577
  const PAD = 10
  let minCx = Infinity
  let maxCx = -Infinity
  let minCy = Infinity
  let maxCy = -Infinity
  for (let r = 0; r < rows.length; r++) {
    const xBase = rowOffsets[r] * hexW
    for (let c = 0; c < rows[r]; c++) {
      const cx = xBase + c * hexW + hexW / 2
      const cy = r * hexVer + radius
      minCx = Math.min(minCx, cx)
      maxCx = Math.max(maxCx, cx)
      minCy = Math.min(minCy, cy)
      maxCy = Math.max(maxCy, cy)
    }
  }
  return {
    w: (maxCx - minCx) + radius * 2 + PAD * 2,
    h: (maxCy - minCy) + radius * 2 + PAD * 2,
  }
}

function chooseHexRadius(size) {
  const gridShell = mount.querySelector('#grid-shell')
  const availW = Math.floor((gridShell?.clientWidth || window.innerWidth) - 4)
  const availH = Math.floor((gridShell?.clientHeight || window.innerHeight * 0.35) - 4)
  // Start from the same radius for all puzzles (uniform hex size when space allows)
  let radius = HEX_R_MAX
  for (let i = 0; i < 3; i++) {
    const m = measureGridForRadius(size, radius)
    const scale = Math.min(availW / m.w, availH / m.h)
    if (!Number.isFinite(scale) || scale <= 0) break
    if (scale < 0.995) {
      radius *= scale
    } else {
      break
    }
  }
  return Math.max(HEX_R_MIN, Math.min(HEX_R_MAX, radius))
}

// Pointy-top hex polygon points
function hexPoints(cx, cy, r) {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 180 * (60 * i - 30) // pointy-top: first vertex at top
    pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)])
  }
  return pts.map(p => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' ')
}

// Build cell list: [{row, col, cx, cy}]
// cx, cy are pixel centers within the SVG (before adding PAD).
function buildCells(size) {
  const { rows, rowOffsets } = GRID_DEFS[size]
  const cells = []
  for (let r = 0; r < rows.length; r++) {
    const cols = rows[r]
    const xBase = rowOffsets[r] * HEX_W  // left edge of this row
    for (let c = 0; c < cols; c++) {
      const cx = xBase + c * HEX_W + HEX_W / 2
      const cy = r * HEX_VER + HEX_R
      cells.push({ row: r, col: c, cx, cy })
    }
  }
  return cells
}

// Adjacency by pixel distance — works for any row offset scheme.
// Two pointy-top hex centers that share an edge are always exactly
// HEX_W (horizontal neighbors) or HEX_VER (diagonal neighbors) apart.
// We use a generous tolerance to handle both cases.
function areAdjacent(size, r1, c1, r2, c2) {
  const cells = buildCells(size)
  const a = cells.find(c => c.row === r1 && c.col === c1)
  const b = cells.find(c => c.row === r2 && c.col === c2)
  if (!a || !b) return false
  const dx = a.cx - b.cx
  const dy = a.cy - b.cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  // The max distance for an adjacent pair is HEX_W (horizontal).
  // Use 1.05× tolerance for float rounding.
  return dist < HEX_W * 1.05
}

// ═══════════════════════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════════════════════

let state = {
  puzzleIdx: 0,
  cells: [],        // [{row, col, cx, cy, value, isClue}]
  solved: false,
  activeDigit: null, // highlighted placeable number (hidden when solved)
  moveHistory: [],   // stack of cell value snapshots for Undo
}

/** If set, solve stores '1' not '2': undo, reset, or tap-clear on a filled player cell. */
let usedUndoOrReset = false

function completionKey(idx) {
  if (!trackCompletion) return null
  return `honeycombs:${engineDateKey}:${idx}`
}

function markSolved(idx) {
  const k = completionKey(idx)
  if (!k) return
  const existing = localStorage.getItem(k)
  if (existing === '2') return
  if (existing === '1' && usedUndoOrReset) return
  localStorage.setItem(k, usedUndoOrReset ? '1' : '2')
  onCompletionsUpdated?.()
}

function currentPuzzle() { return enginePuzzles[state.puzzleIdx] }

function cellKey(r, c) { return `${r},${c}` }

function initPuzzle(idx) {
  const puzzle = enginePuzzles[idx]
  if (!puzzle) return
  const size = puzzle.size
  setHexGeometry(chooseHexRadius(size))
  const rawCells = buildCells(size)

  // Build clue lookup
  const clueMap = {}
  for (const [r, c, v] of puzzle.clues) clueMap[cellKey(r, c)] = v

  state.puzzleIdx  = idx
  state.cells      = rawCells.map(({ row, col, cx, cy }) => ({
    row, col, cx, cy,
    value:  clueMap[cellKey(row, col)] ?? null,
    isClue: !!clueMap[cellKey(row, col)],
  }))
  state.solved     = false
  state.moveHistory = []
  state.activeDigit = computeActiveDigitMinMissing()
  usedUndoOrReset = false
  pathTraceSession++
  clearPathFadeTimeout()
  clearTraceDomImmediate()
  render()
}

function clueValues() {
  return new Set(currentPuzzle().clues.map(([, , v]) => v))
}

/** Restore cell values to the current puzzle's clues-only baseline (same source as initPuzzle). */
function resetCellsToPuzzleBaseline() {
  const puzzle = currentPuzzle()
  if (!puzzle) return
  const clueMap = {}
  for (const [r, c, v] of puzzle.clues) clueMap[cellKey(r, c)] = v
  for (const cell of state.cells) {
    const k = cellKey(cell.row, cell.col)
    if (Object.prototype.hasOwnProperty.call(clueMap, k)) {
      cell.value = clueMap[k]
      cell.isClue = true
    } else {
      cell.value = null
      cell.isClue = false
    }
  }
}

function placedValues() {
  return new Set(state.cells.map(c => c.value).filter(v => v !== null))
}

function computeActiveDigitMinMissing() {
  const n = maxNumber()
  const placed = placedValues()
  if (placed.size >= n) return null
  for (let k = 1; k <= n; k++) {
    if (!placed.has(k)) return k
  }
  return null
}

function computeActiveDigitAfterFill(lastPlaced) {
  const n = maxNumber()
  const placed = placedValues()
  if (placed.size >= n) return null
  for (let k = lastPlaced + 1; k <= n; k++) {
    if (!placed.has(k)) return k
  }
  for (let k = 1; k <= n; k++) {
    if (!placed.has(k)) return k
  }
  return null
}

/** Snapshot grid values for Undo. */
function pushMoveHistory() {
  state.moveHistory.push(state.cells.map(c => c.value))
}

function handleUndo() {
  if (!state.moveHistory.length) return
  usedUndoOrReset = true
  notifyPathTraceUserInput()
  const prev = state.moveHistory.pop()
  for (let i = 0; i < state.cells.length; i++) {
    state.cells[i].value = prev[i]
  }
  state.solved = false
  state.activeDigit = computeActiveDigitMinMissing()
  render()
}

function applyDigitToCell(row, col, num) {
  const cell = state.cells.find(c => c.row === row && c.col === col)
  if (!cell || cell.isClue) return
  if (
    state.cells.some(
      c =>
        c.value === num &&
        c.isClue &&
        (c.row !== row || c.col !== col)
    )
  ) {
    return
  }
  pushMoveHistory()
  cell.value = num
  state.activeDigit = computeActiveDigitAfterFill(num)
  render()
}

function totalCells() { return state.cells.length }

function maxNumber() { return totalCells() }

function allFilled() {
  return state.cells.every(c => c.value !== null)
}

/**
 * Trace 1→2→… on the board by cell centers. complete=true iff 1..N each once and every step is adjacent.
 */
function buildPathTrace() {
  const n = maxNumber()
  const size = currentPuzzle().size
  const byValue = {}
  for (const cell of state.cells) {
    if (cell.value === null) continue
    if (byValue[cell.value]) return { complete: false, cells: [], bad: 'duplicate' }
    byValue[cell.value] = cell
  }
  for (let v = 1; v <= n; v++) {
    if (!byValue[v]) return { complete: false, cells: [], bad: 'missing' }
  }
  const chain = [byValue[1]]
  for (let v = 2; v <= n; v++) {
    const prev = chain[chain.length - 1]
    const cur = byValue[v]
    if (!areAdjacent(size, prev.row, prev.col, cur.row, cur.col)) {
      return { complete: false, cells: chain }
    }
    chain.push(cur)
  }
  return { complete: true, cells: chain }
}

function computeGridOffsets() {
  const PAD = 10
  const minCx = Math.min(...state.cells.map(c => c.cx))
  const maxCx = Math.max(...state.cells.map(c => c.cx))
  const minCy = Math.min(...state.cells.map(c => c.cy))
  const maxCy = Math.max(...state.cells.map(c => c.cy))
  const svgW = (maxCx - minCx) + HEX_R * 2 + PAD * 2
  const svgH = (maxCy - minCy) + HEX_R * 2 + PAD * 2
  const offX = -minCx + HEX_R + PAD
  const offY = -minCy + HEX_R + PAD
  return { PAD, offX, offY, svgW, svgH }
}

function reflowGeometryForCurrentState() {
  const size = currentPuzzle().size
  setHexGeometry(chooseHexRadius(size))
  const rebuilt = buildCells(size)
  const map = new Map(rebuilt.map(c => [`${c.row},${c.col}`, c]))
  for (const cell of state.cells) {
    const fresh = map.get(`${cell.row},${cell.col}`)
    if (!fresh) continue
    cell.cx = fresh.cx
    cell.cy = fresh.cy
  }
}

// ═══════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════

let pathTraceSession = 0
let pathFadeTimeout = null
let beeIdleRaf = null
let beeIdleToken = 0
const SVG_NS = 'http://www.w3.org/2000/svg'
const BEE_FORWARD_OFFSET_DEG = 90
const BEE_TURN_MS = 90
const BEE_ART = `
<polygon points="104.88 34.04 45.12 34.04 15.25 85.78 45.12 137.53 104.88 137.53 134.75 85.78 104.88 34.04"/>
<g>
  <rect x="49.35" y="25.83" width="32.86" height="7.04" rx="3.52" ry="3.52" transform="translate(62.83 101.31) rotate(-111.7)"/>
  <circle cx="59.84" cy="14.43" r="6.73"/>
  <rect x="67.8" y="25.83" width="32.86" height="7.04" rx="3.52" ry="3.52" transform="translate(25.81 96.75) rotate(-68.3)"/>
  <circle cx="90.16" cy="14.43" r="6.73"/>
</g>
<polygon fill="#faa80a" points="100.76 41.16 49.24 41.16 23.47 85.78 49.24 130.41 100.76 130.41 126.53 85.78 100.76 41.16"/>
<path d="M144.41,85.42c-2.41-4.9-6.32-10.04-11.72-15.45-5.4-5.4-40.08-8.98-40.08-8.98,0,0,1.21,12.23,3.32,23.34h-41.76c2.11-11.12,3.32-23.34,3.32-23.34,0,0-34.68,3.57-40.08,8.98-5.4,5.4-9.31,10.54-11.72,15.45-2.41,4.88-3.38,9.47-2.91,13.74.47,4.27,2.32,8,5.53,11.22,3.21,3.21,6.92,5.06,11.11,5.53,4.2.47,8.78-.49,13.74-2.91.72-.35,1.44-.74,2.17-1.15l5.2,8.91h67.16l5.86-9.61c1.13.69,2.25,1.31,3.37,1.85,4.96,2.42,9.55,3.38,13.74,2.91,4.2-.47,7.91-2.33,11.11-5.53,3.22-3.22,5.06-6.95,5.53-11.22.47-4.27-.5-8.86-2.91-13.74ZM41.97,107.35c2.18-1.73,4.39-3.7,6.64-5.94.73-.72,1.41-2,2.07-3.63h48.73c.65,1.64,1.34,2.91,2.07,3.63,2.25,2.25,4.46,4.22,6.64,5.94H41.97Z"/>
`

function clearPathFadeTimeout() {
  if (pathFadeTimeout) {
    clearTimeout(pathFadeTimeout)
    pathFadeTimeout = null
  }
}

function stopIdleBeeBuzz() {
  beeIdleToken++
  if (beeIdleRaf !== null) {
    cancelAnimationFrame(beeIdleRaf)
    beeIdleRaf = null
  }
}

function clearTraceDomImmediate() {
  stopIdleBeeBuzz()
  const g = svg.querySelector('#hex-trace')
  if (!g) return
  g.innerHTML = ''
  g.classList.remove('trace-pulse-win')
  g.style.opacity = '1'
  g.style.transition = ''
}

function normalizeAngleDeg(deg) {
  return ((deg % 360) + 360) % 360
}

function shortestAngleDeltaDeg(fromDeg, toDeg) {
  let delta = normalizeAngleDeg(toDeg) - normalizeAngleDeg(fromDeg)
  if (delta > 180) delta -= 360
  if (delta < -180) delta += 360
  return delta
}

function createBeeSprite(traceG, start, initialHeadingDeg) {
  const bee = document.createElementNS(SVG_NS, 'g')
  bee.setAttribute('class', 'trace-bee')
  bee.innerHTML = HONEYCOMBS_BEE_ART_INNER_HTML
  const beeSize = Math.max(18, HEX_R * 1.15)
  const scale = beeSize / 150
  let angle = initialHeadingDeg + BEE_FORWARD_OFFSET_DEG

  const setPose = (x, y, deg) => {
    bee.setAttribute(
      'transform',
      `translate(${x} ${y}) rotate(${deg}) scale(${scale}) translate(-75 -75)`
    )
  }

  traceG.appendChild(bee)
  setPose(start.x, start.y, angle)

  return {
    bee,
    setPose,
    getAngle: () => angle,
    setAngle: (deg) => { angle = deg },
  }
}

function startIdleBeeBuzz(beeCtl, anchor, session) {
  stopIdleBeeBuzz()
  const myToken = ++beeIdleToken
  const radius = HEX_R * 0.7
  const speedPxPerSec = HEX_R * 0.32

  let x = anchor.x
  let y = anchor.y
  let angle = beeCtl.getAngle()
  let targetX = x
  let targetY = y
  let lastTs = performance.now()

  const pickTarget = () => {
    targetX = anchor.x + (Math.random() * 2 - 1) * radius
    targetY = anchor.y + (Math.random() * 2 - 1) * radius
  }
  pickTarget()

  const tick = (now) => {
    if (myToken !== beeIdleToken) return
    if (session !== pathTraceSession || !beeCtl.bee.isConnected) return

    const dt = Math.min(0.05, (now - lastTs) / 1000)
    lastTs = now

    const dx = targetX - x
    const dy = targetY - y
    const dist = Math.hypot(dx, dy)

    if (dist < 1.5) {
      pickTarget()
    } else {
      const move = Math.min(dist, speedPxPerSec * dt)
      x += (dx / dist) * move
      y += (dy / dist) * move
      const desired = (Math.atan2(dy, dx) * 180) / Math.PI + BEE_FORWARD_OFFSET_DEG
      const delta = shortestAngleDeltaDeg(angle, desired)
      angle = normalizeAngleDeg(angle + delta * Math.min(1, dt * 2.8))
      beeCtl.setPose(x, y, angle)
      beeCtl.setAngle(angle)
    }

    beeIdleRaf = requestAnimationFrame(tick)
  }

  beeIdleRaf = requestAnimationFrame(tick)
}

function fadeOutAndClearTrace(includeBee) {
  const g = svg.querySelector('#hex-trace')
  if (!g || g.childNodes.length === 0) {
    clearTraceDomImmediate()
    return
  }
  pathTraceSession++
  stopIdleBeeBuzz()
  if (!includeBee) {
    const bee = g.querySelector('.trace-bee')
    if (bee) bee.remove()
  }
  g.style.transition = 'opacity 0.45s ease'
  g.style.opacity = '0'
  setTimeout(() => {
    clearTraceDomImmediate()
  }, 450)
}

function scheduleLossFade() {
  clearPathFadeTimeout()
  pathFadeTimeout = setTimeout(() => {
    pathFadeTimeout = null
    fadeOutAndClearTrace(true)
  }, 2000)
}

function scheduleWinLineFade() {
  clearPathFadeTimeout()
  pathFadeTimeout = setTimeout(() => {
    pathFadeTimeout = null
    const g = svg.querySelector('#hex-trace')
    if (!g || g.childNodes.length === 0) return
    const strokes = g.querySelectorAll('line, polyline, circle')
    if (!strokes.length) return
    for (const node of strokes) {
      node.style.transition = 'opacity 0.6s ease'
      node.style.opacity = '0'
    }
    setTimeout(() => {
      for (const node of strokes) node.remove()
    }, 620)
  }, 1200)
}

/** Called on any gameplay interaction: clear active trace and idle bee. */
function notifyPathTraceUserInput() {
  const g = svg.querySelector('#hex-trace')
  if (!g || g.childNodes.length === 0) {
    clearPathFadeTimeout()
    return
  }
  clearPathFadeTimeout()
  clearTraceDomImmediate()
}

/** Keep in sync with `#hex-trace.trace-pulse-win` in honeycombs.css (0.6s × 3 iterations). */
const WIN_TRACE_PULSE_TOTAL_MS = 0.6 * 3 * 1000

function runPathTraceAnimation(trace) {
  const cells = trace.cells
  if (cells.length === 0) return

  const session = pathTraceSession
  clearPathFadeTimeout()
  const traceG = svg.querySelector('#hex-trace')
  if (!traceG) return

  if (trace.complete && !state.solved) {
    state.solved = true
    markSolved(state.puzzleIdx)
    renderKeyboard()
  }

  traceG.innerHTML = ''
  traceG.classList.remove('trace-pulse-win')
  traceG.style.opacity = '1'
  traceG.style.transition = ''

  const { offX, offY } = computeGridOffsets()
  const drawColor = 'rgba(107, 114, 128, 0.5)'
  const okColor = '#6b9b3b'
  const badColor = '#9d270c'

  const scheduleWinModalAfterPulse = () => {
    const idx = state.puzzleIdx
    setTimeout(() => {
      if (session !== pathTraceSession) return
      onWinAnimationComplete?.(idx)
    }, WIN_TRACE_PULSE_TOTAL_MS)
  }

  let strokeDone = false
  const finishStroke = () => {
    if (session !== pathTraceSession || strokeDone) return
    strokeDone = true
    if (trace.complete) {
      if (lastBeePoint) startIdleBeeBuzz(beeCtl, lastBeePoint, session)
      scheduleWinLineFade()
      return
    }
    scheduleLossFade()
  }

  const pts = cells.map(c => `${c.cx + offX},${c.cy + offY}`)
  /** Declared before branches so `finishStroke` can safely read on single-cell wins. */
  let beeCtl = null
  let lastBeePoint = null

  const SEG_MS = 150

  if (pts.length === 1) {
    const c0 = cells[0]
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    dot.setAttribute('cx', String(c0.cx + offX))
    dot.setAttribute('cy', String(c0.cy + offY))
    dot.setAttribute('r', '5')
    dot.setAttribute('fill', 'none')
    dot.setAttribute('stroke', drawColor)
    dot.setAttribute('stroke-width', '8')
    traceG.appendChild(dot)
    requestAnimationFrame(() => {
      if (session !== pathTraceSession) return
      dot.setAttribute('stroke', trace.complete ? okColor : badColor)
      if (trace.complete) {
        traceG.classList.add('trace-pulse-win')
        scheduleWinModalAfterPulse()
      }
      finishStroke()
    })
    return
  }

  const lines = []
  let colorApplied = false
  const applyFinalColor = () => {
    if (session !== pathTraceSession || colorApplied) return
    colorApplied = true
    const end = trace.complete ? okColor : badColor
    for (const line of lines) {
      line.style.transition = 'stroke 0.22s ease'
      line.setAttribute('stroke', end)
    }
    if (trace.complete) {
      traceG.classList.add('trace-pulse-win')
      scheduleWinModalAfterPulse()
    }
    setTimeout(finishStroke, 220)
  }

  const parsePt = (s) => {
    const [x, y] = s.split(',').map(Number)
    return { x, y }
  }
  const headingDeg = (a, b) => (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
  const start = parsePt(pts[0])
  const firstTarget = parsePt(pts[1])
  beeCtl = createBeeSprite(traceG, start, headingDeg(start, firstTarget))
  lastBeePoint = { x: start.x, y: start.y }

  const animateBeeSegment = (a, b) => {
    const startedAt = performance.now()
    const startAngle = beeCtl.getAngle()
    const targetAngle = headingDeg(a, b) + BEE_FORWARD_OFFSET_DEG
    const delta = shortestAngleDeltaDeg(startAngle, targetAngle)

    const run = (now) => {
      if (session !== pathTraceSession || !beeCtl.bee.isConnected) return
      const t = Math.min(1, (now - startedAt) / SEG_MS)
      const turnT = Math.min(1, (now - startedAt) / BEE_TURN_MS)
      const easedTurn = 1 - Math.pow(1 - turnT, 3)
      const angle = normalizeAngleDeg(startAngle + delta * easedTurn)
      const x = a.x + (b.x - a.x) * t
      const y = a.y + (b.y - a.y) * t
      beeCtl.setPose(x, y, angle)
      beeCtl.setAngle(angle)
      if (t >= 1) lastBeePoint = { x: b.x, y: b.y }
      if (t < 1) requestAnimationFrame(run)
    }

    requestAnimationFrame(run)
  }

  const runSegment = (i) => {
    if (session !== pathTraceSession) return
    if (i >= pts.length - 1) {
      applyFinalColor()
      return
    }
    const a = parsePt(pts[i])
    const b = parsePt(pts[i + 1])
    const segLen = Math.hypot(b.x - a.x, b.y - a.y)
    if (segLen < 0.5) {
      beeCtl.setPose(b.x, b.y, beeCtl.getAngle())
      lastBeePoint = { x: b.x, y: b.y }
      runSegment(i + 1)
      return
    }
    animateBeeSegment(a, b)

    const line = document.createElementNS(SVG_NS, 'line')
    line.setAttribute('stroke', drawColor)
    line.setAttribute('stroke-width', '8')
    line.setAttribute('stroke-linecap', 'round')
    line.setAttribute('x1', String(a.x))
    line.setAttribute('y1', String(a.y))
    line.setAttribute('x2', String(b.x))
    line.setAttribute('y2', String(b.y))
    line.style.strokeDasharray = String(segLen)
    line.style.strokeDashoffset = String(segLen)
    line.style.transition = `stroke-dashoffset ${SEG_MS}ms ease-out`
    traceG.appendChild(line)
    traceG.appendChild(beeCtl.bee)
    lines.push(line)

    requestAnimationFrame(() => {
      if (session !== pathTraceSession) return
      line.getBoundingClientRect()
      requestAnimationFrame(() => {
        if (session !== pathTraceSession) return
        line.style.strokeDashoffset = '0'
      })
    })

    let advanced = false
    const next = () => {
      if (session !== pathTraceSession || advanced) return
      advanced = true
      runSegment(i + 1)
    }

    line.addEventListener(
      'transitionend',
      (e) => {
        if (e.propertyName !== 'stroke-dashoffset') return
        next()
      },
      { once: true }
    )

    setTimeout(() => {
      if (session !== pathTraceSession || advanced) return
      if (line.style.strokeDashoffset !== '0') return
      next()
    }, SEG_MS + 60)
  }

  runSegment(0)
}

function renderGrid() {
  const { offX, offY, svgW, svgH } = computeGridOffsets()

  svg.setAttribute('width',   Math.ceil(svgW))
  svg.setAttribute('height',  Math.ceil(svgH))
  svg.setAttribute('viewBox', `0 0 ${Math.ceil(svgW)} ${Math.ceil(svgH)}`)

  let cellsGroup = svg.querySelector('#hex-cells')
  let traceGroup = svg.querySelector('#hex-trace')
  if (!cellsGroup) {
    svg.innerHTML = ''
    cellsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    cellsGroup.id = 'hex-cells'
    svg.appendChild(cellsGroup)
    traceGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    traceGroup.id = 'hex-trace'
    svg.appendChild(traceGroup)
  } else {
    cellsGroup.innerHTML = ''
  }

  for (const cell of state.cells) {
    const cx = cell.cx + offX
    const cy = cell.cy + offY

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    g.setAttribute('class', cellClass(cell))
    g.dataset.row = cell.row
    g.dataset.col = cell.col

    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    poly.setAttribute('points', hexPoints(cx, cy, HEX_R - 1))

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', cx)
    text.setAttribute('y', cy)
    text.setAttribute('class', 'hex-label')
    text.textContent = cell.value !== null ? cell.value : ''

    // Font size scaling for 2-digit numbers
    if (cell.value !== null && cell.value >= 10) {
      text.setAttribute('font-size', '12')
    }

    g.appendChild(poly)
    g.appendChild(text)

    if (!cell.isClue) {
      g.addEventListener('pointerup', (e) => { e.stopPropagation(); handleCellClick(cell.row, cell.col) })
    }

    cellsGroup.appendChild(g)
  }
}

function cellClass(cell) {
  if (cell.isClue) return 'hex-cell given'
  if (cell.value !== null) return 'hex-cell filled'
  return 'hex-cell empty'
}

function renderKeyboard() {
  keyboard.innerHTML = ''
  const n = maxNumber()
  const clues = clueValues()
  const playerUsed = new Set(
    state.cells
      .filter(c => !c.isClue && c.value !== null)
      .map(c => c.value)
  )
  const showActive = !state.solved && state.activeDigit !== null

  const size = currentPuzzle().size
  let numRows
  if (size === 'small') {
    numRows = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ]
  } else if (size === 'medium') {
    numRows = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
    ]
  } else {
    numRows = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19],
    ]
  }

  for (let ri = 0; ri < numRows.length; ri++) {
    const row = numRows[ri]
    const rowDiv = document.createElement('div')
    rowDiv.className = 'kb-row'

    for (const num of row) {
      if (num > n) continue
      const btn = document.createElement('button')
      const isFixedKey = clues.has(num)
      const isPlayerUsed = playerUsed.has(num)
      let cls = 'kb-key'
      if (isFixedKey) cls += ' kb-clue'
      else if (isPlayerUsed) cls += ' used'
      else {
        cls += ' available'
        if (showActive && num === state.activeDigit) cls += ' kb-active'
      }
      btn.className = cls
      btn.textContent = num
      if (!isFixedKey) {
        btn.addEventListener('pointerup', (e) => { e.stopPropagation(); handleKeyPress(num) })
      }
      rowDiv.appendChild(btn)
    }

    keyboard.appendChild(rowDiv)
  }

  const actions = document.createElement('div')
  actions.className = 'kb-actions'

  const undoBtn = document.createElement('button')
  undoBtn.type = 'button'
  undoBtn.className = 'kb-action-btn-secondary'
  undoBtn.textContent = 'Undo'
  undoBtn.title = 'Undo last move'
  undoBtn.disabled = state.moveHistory.length === 0
  undoBtn.addEventListener('click', (e) => { e.stopPropagation(); handleUndo() })

  const rst = document.createElement('button')
  rst.type = 'button'
  rst.className = 'kb-action-btn-secondary'
  rst.textContent = 'Reset'
  rst.title = 'Clear all player entries'
  rst.disabled = state.moveHistory.length === 0
  rst.addEventListener('click', (e) => { e.stopPropagation(); handleClearAll() })

  actions.appendChild(undoBtn)
  actions.appendChild(rst)
  keyboard.appendChild(actions)

  const bottom = document.createElement('div')
  bottom.className = 'hc-bottom-strip'
  let hasBottom = false

  if (state.solved && state.puzzleIdx < enginePuzzles.length - 1) {
    hasBottom = true
    const nextBtn = document.createElement('button')
    nextBtn.type = 'button'
    nextBtn.className = 'kb-next-puzzle'
    nextBtn.textContent = CTA_LABELS.NEXT_PUZZLE
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      onRequestNextPuzzle?.()
    })
    bottom.appendChild(nextBtn)
  } else if (state.solved && state.puzzleIdx === enginePuzzles.length - 1 && finalSolvedAction?.label) {
    hasBottom = true
    if (finalSolvedAction.href) {
      const actionLink = document.createElement('a')
      actionLink.href = finalSolvedAction.href
      actionLink.className = 'kb-next-puzzle'
      actionLink.textContent = finalSolvedAction.label
      actionLink.addEventListener('click', (e) => e.stopPropagation())
      bottom.appendChild(actionLink)
    } else {
      const actionBtn = document.createElement('button')
      actionBtn.type = 'button'
      actionBtn.className = 'kb-next-puzzle'
      actionBtn.textContent = finalSolvedAction.label
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        finalSolvedAction.onClick?.()
      })
      bottom.appendChild(actionBtn)
    }
  } else if (state.solved && state.puzzleIdx === enginePuzzles.length - 1 && hubBaseHref) {
    hasBottom = true
    const hub = document.createElement('a')
    hub.href = hubBaseHref
    hub.className = 'kb-next-puzzle'
    hub.textContent = CTA_LABELS.ALL_PUZZLES
    hub.addEventListener('click', (e) => e.stopPropagation())
    bottom.appendChild(hub)
  } else if (!state.solved && allFilled()) {
    hasBottom = true
    const chk = document.createElement('button')
    chk.type = 'button'
    chk.className = 'kb-next-puzzle'
    chk.textContent = 'Check'
    chk.title = 'Check your answer'
    chk.addEventListener('click', (e) => { e.stopPropagation(); handleCheck() })
    bottom.appendChild(chk)
  } else if (!state.solved) {
    hasBottom = true
    const goal = document.createElement('div')
    goal.className = 'hc-goal-line'
    goal.textContent = `Number a path 1–${n}`
    bottom.appendChild(goal)
  }

  if (hasBottom) keyboard.appendChild(bottom)
}

function render() {
  renderGrid()
  renderKeyboard()
}



// ═══════════════════════════════════════════════════════════
// INTERACTION
// ═══════════════════════════════════════════════════════════

function handleCellClick(row, col) {
  if (state.solved) return
  notifyPathTraceUserInput()
  const cell = state.cells.find(c => c.row === row && c.col === col)
  if (!cell || cell.isClue) return

  if (cell.value !== null) {
    const deletedValue = cell.value
    usedUndoOrReset = true
    pushMoveHistory()
    cell.value = null
    state.activeDigit = deletedValue
    render()
    return
  }

  if (!state.solved && state.activeDigit !== null) {
    applyDigitToCell(row, col, state.activeDigit)
  }
}

function handleKeyPress(num) {
  if (state.solved) return
  notifyPathTraceUserInput()
  const clues = clueValues()
  if (clues.has(num)) return

  const playerUsed = new Set(
    state.cells
      .filter(c => !c.isClue && c.value !== null)
      .map(c => c.value)
  )

  if (!state.solved && state.activeDigit === num && !playerUsed.has(num)) return

  if (playerUsed.has(num)) return

  state.activeDigit = num
  render()
}

function handleClearAll() {
  if (!state.moveHistory.length) return
  usedUndoOrReset = true
  notifyPathTraceUserInput()
  resetCellsToPuzzleBaseline()
  state.moveHistory = []
  state.solved = false
  state.activeDigit = computeActiveDigitMinMissing()
  render()
}

function handleCheck() {
  if (!allFilled() || state.solved) return
  pathTraceSession++
  clearPathFadeTimeout()
  clearTraceDomImmediate()

  const trace = buildPathTrace()
  if (trace.bad === 'duplicate' || trace.bad === 'missing' || trace.cells.length === 0) {
    render()
    return
  }

  runPathTraceAnimation(trace)
}

function handleKeyboard(e) {
  if (e.defaultPrevented) return
  const t = e.target
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return

  const key = e.key
  if (key === 'Escape') {
    if (isBlockingModalOpen?.()) return
    e.preventDefault()
    notifyPathTraceUserInput()
    if (state.activeDigit === null) state.activeDigit = computeActiveDigitMinMissing()
    render()
    return
  }

  const n = maxNumber()

  if (key >= '1' && key <= '9') {
    const d = parseInt(key, 10)
    if (d <= n) {
      e.preventDefault()
      handleKeyPress(d)
    }
  } else if (key === '0') {
    if (n >= 10) {
      e.preventDefault()
      handleKeyPress(10)
    }
  }
}

  function onResize() {
    if (!state.cells.length) return
    reflowGeometryForCurrentState()
    render()
  }

  let lastTouchEndTime = 0
  function onTouchEnd(e) {
    const now = Date.now()
    const withinDoubleTapWindow = now - lastTouchEndTime <= 300
    if (
      withinDoubleTapWindow &&
      e.target &&
      e.target.closest &&
      e.target.closest('button, .kb-key, #puzzle-boxes, #hex-grid')
    ) {
      e.preventDefault()
    }
    lastTouchEndTime = now
  }

  document.addEventListener('keydown', handleKeyboard)
  document.addEventListener('touchend', onTouchEnd, { passive: false })
  window.addEventListener('resize', onResize)

  function destroy() {
    document.removeEventListener('keydown', handleKeyboard)
    document.removeEventListener('touchend', onTouchEnd)
    window.removeEventListener('resize', onResize)
    clearPathFadeTimeout()
    stopIdleBeeBuzz()
    clearTraceDomImmediate()
  }

  return { initPuzzle, destroy }
}
