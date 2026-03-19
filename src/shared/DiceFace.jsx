import React from 'react'

/**
 * Renders a die face with 1, 2, or 3 dots (dice layout).
 * Used for uncompleted difficulty tiles across puzzles and home.
 * @param {1|2|3} count - Number of dots
 * @param {number} [size] - Side length in px (default 20, fills 28px tile)
 * @param {string} [color] - Dot fill (default 'currentColor')
 */
// viewBox 0 0 4 4 so dot centers (0.5, 2, 3.5) * scale give integer pixels when size=16 (scale 4)
const POSITIONS = {
    1: [[2, 2]],
    2: [[0.5, 0.5], [3.5, 3.5]],
    3: [[0.5, 0.5], [2, 2], [3.5, 3.5]],
}
const R = 0.5 // dot radius in 4x4 units (dice-like)

export default function DiceFace({ count, size = 20, color = 'currentColor' }) {
    const dots = POSITIONS[count] || POSITIONS[1]
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 4 4"
                fill={color}
                style={{ display: 'block' }}
                aria-hidden
            >
                {dots.map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r={R} />
                ))}
            </svg>
        </span>
    )
}
