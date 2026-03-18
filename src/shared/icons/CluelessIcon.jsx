import React from 'react'

export default function CluelessIcon({ size = 28 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
            {/* Grid background */}
            <rect width="150" height="150" fill="#ffffff" />

            {/* Blocked cells (black) — corners of the inner 2-step grid */}
            <rect x="50" y="50" width="50" height="50" fill="#111111" />

            {/* Clue cells (light gray) — even/odd positions */}
            {/* Row 0 */}
            <rect x="50"  y="0"   width="50" height="50" fill="#e5e5e5" />
            {/* Row 2 */}
            <rect x="50"  y="100" width="50" height="50" fill="#e5e5e5" />
            {/* Col 0 */}
            <rect x="0"   y="50"  width="50" height="50" fill="#e5e5e5" />
            {/* Col 2 */}
            <rect x="100" y="50"  width="50" height="50" fill="#e5e5e5" />

            {/* Input cells (yellow) — the 4 corners */}
            <rect x="0"   y="0"   width="50" height="50" fill="#FFD600" />
            <rect x="100" y="0"   width="50" height="50" fill="#FFD600" />
            <rect x="0"   y="100" width="50" height="50" fill="#FFD600" />
            <rect x="100" y="100" width="50" height="50" fill="#FFD600" />

            {/* Grid lines */}
            <line x1="50"  y1="0"   x2="50"  y2="150" stroke="#111" strokeWidth="4" />
            <line x1="100" y1="0"   x2="100" y2="150" stroke="#111" strokeWidth="4" />
            <line x1="0"   y1="50"  x2="150" y2="50"  stroke="#111" strokeWidth="4" />
            <line x1="0"   y1="100" x2="150" y2="100" stroke="#111" strokeWidth="4" />
        </svg>
    )
}