import React from 'react'

export default function FoldsIcon({ size = 28 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28">

            {/* Fold line — vertical through center */}
            <line x1="14" y1="2" x2="14" y2="26" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />

            {/* Left pair — original triangles */}
            <polygon points="2,22 10,6 10,22"  fill="#6366f1" opacity="1" />
            <polygon points="2,22 10,22 6,28"  fill="#818cf8" opacity="1" />

            {/* Ghost mid-reflection — halfway between left and right */}
            <polygon points="8,22 16,6 16,22"  fill="#6366f1" opacity="0.2" />
            <polygon points="8,22 16,22 12,28" fill="#818cf8" opacity="0.2" />

            {/* Right pair — reflected triangles */}
            <polygon points="26,22 18,6 18,22"  fill="#6366f1" opacity="1" />
            <polygon points="26,22 18,22 22,28" fill="#818cf8" opacity="1" />

        </svg>
    )
}