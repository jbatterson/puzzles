/** Shared Folds hex grid geometry (keep in sync with rendering / fold physics in `folds.jsx`). */

export const S = 62
export const H = (S * Math.sqrt(3)) / 2
export const PAD = 40
export const N = 4

export const up = (r, c) => (r + c) % 2 === 0

export const cent = (r, c) => ({
  x: PAD + ((c + 1) * S) / 2,
  y: PAD + (up(r, c) ? H * (r + 2 / 3) : H * (r + 1 / 3)),
})

export const pts = (r, c) => {
  const x = PAD + (c * S) / 2
  const y = PAD + r * H
  return up(r, c)
    ? `${x + S / 2},${y} ${x},${y + H} ${x + S},${y + H}`
    : `${x},${y} ${x + S},${y} ${x + S / 2},${y + H}`
}

export const HEX_POLY = (() => {
  const L = N * S
  const V0 = { x: PAD + S / 2, y: PAD }
  const V1 = { x: V0.x + L, y: V0.y }
  const V2 = { x: V1.x + L / 2, y: V1.y + N * H }
  const V3 = { x: V2.x - L / 2, y: V2.y + N * H }
  const V4 = { x: V3.x - L, y: V3.y }
  const V5 = { x: V4.x - L / 2, y: V4.y - N * H }
  return [V0, V1, V2, V3, V4, V5]
})()

export const HEX_BOUNDS = (() => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  HEX_POLY.forEach((p) => {
    minX = Math.min(minX, p.x)
    maxX = Math.max(maxX, p.x)
    minY = Math.min(minY, p.y)
    maxY = Math.max(maxY, p.y)
  })
  return { minX, minY, width: maxX - minX, height: maxY - minY }
})()

export const VB_PAD = 14
export const HEX_VIEWBOX = {
  x: HEX_BOUNDS.minX - VB_PAD,
  y: HEX_BOUNDS.minY - VB_PAD,
  w: HEX_BOUNDS.width + 2 * VB_PAD,
  h: HEX_BOUNDS.height + 2 * VB_PAD,
}

/** Rendered board is rotated by this angle in `folds.jsx`. */
export const HEX_ROTATE_DEG = 30

const HEX_CENTER = {
  x: HEX_BOUNDS.minX + HEX_BOUNDS.width / 2,
  y: HEX_BOUNDS.minY + HEX_BOUNDS.height / 2,
}

function rotatePoint(point, degrees, center) {
  const radians = (degrees * Math.PI) / 180
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  const dx = point.x - center.x
  const dy = point.y - center.y
  return {
    x: center.x + dx * cos - dy * sin,
    y: center.y + dx * sin + dy * cos,
  }
}

export const HEX_ROTATED_BOUNDS = (() => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  HEX_POLY.map((p) => rotatePoint(p, HEX_ROTATE_DEG, HEX_CENTER)).forEach((p) => {
    minX = Math.min(minX, p.x)
    maxX = Math.max(maxX, p.x)
    minY = Math.min(minY, p.y)
    maxY = Math.max(maxY, p.y)
  })
  return { minX, minY, width: maxX - minX, height: maxY - minY }
})()

/**
 * Viewbox that matches the post-rotation extents (used by the live SVG).
 *
 * Keep this padding modest so the board can expand toward the stage edges.
 * Too much pad creates dead space; too little clips outer strokes.
 */
export const HEX_ROTATED_VB_PAD = 8
export const HEX_ROTATED_VIEWBOX = {
  x: HEX_ROTATED_BOUNDS.minX - HEX_ROTATED_VB_PAD,
  y: HEX_ROTATED_BOUNDS.minY - HEX_ROTATED_VB_PAD,
  w: HEX_ROTATED_BOUNDS.width + 2 * HEX_ROTATED_VB_PAD,
  h: HEX_ROTATED_BOUNDS.height + 2 * HEX_ROTATED_VB_PAD,
}

export const isInsideHex = (r, c) => {
  const p = cent(r, c)
  let inside = false
  for (let i = 0, j = HEX_POLY.length - 1; i < HEX_POLY.length; j = i++) {
    const xi = HEX_POLY[i].x
    const yi = HEX_POLY[i].y
    const xj = HEX_POLY[j].x
    const yj = HEX_POLY[j].y
    if (yi > p.y !== yj > p.y && p.x < ((xj - xi) * (p.y - yi)) / (yj - yi + 1e-12) + xi)
      inside = !inside
  }
  return inside
}

export const isPointInsideHex = (x, y) => {
  let inside = false
  for (let i = 0, j = HEX_POLY.length - 1; i < HEX_POLY.length; j = i++) {
    const xi = HEX_POLY[i].x
    const yi = HEX_POLY[i].y
    const xj = HEX_POLY[j].x
    const yj = HEX_POLY[j].y
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-12) + xi) inside = !inside
  }
  return inside
}

export const snap = (px, py) => {
  const re = Math.round((py - PAD) / H)
  const ce = Math.round((2 * (px - PAD)) / S) - 1
  let best = Infinity
  let br = 0
  let bc = 0
  for (let r = Math.max(0, re - 2); r <= Math.min(10, re + 2); r++) {
    for (let c = Math.max(-6, ce - 4); c <= Math.min(20, ce + 4); c++) {
      const p = cent(r, c)
      const d = (p.x - px) ** 2 + (p.y - py) ** 2
      if (d < best) {
        best = d
        br = r
        bc = c
      }
    }
  }
  return [br, bc]
}

export const ALL_TRIANGLES = (() => {
  const tris = []
  for (let r = 0; r <= 8; r++) {
    for (let c = -5; c <= 18; c++) {
      if (isInsideHex(r, c)) tris.push({ r, c, key: `${r},${c}` })
    }
  }
  return tris
})()

export const FOLD_FLOURISH_MIN_RC = Math.min(...ALL_TRIANGLES.map((t) => t.r + t.c))
