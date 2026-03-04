import React from 'react'

export default function SumTilesIcon({ size = 28 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28">
            {/* Top-left tile */}
            <rect x="1" y="1" width="11" height="11" rx="2" fill="#f59e0b" />
            <text x="6.5" y="10" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="sans-serif">3</text>

            {/* Top-right tile */}
            <rect x="16" y="1" width="11" height="11" rx="2" fill="#f59e0b" />
            <text x="21.5" y="10" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="sans-serif">5</text>

            {/* Plus sign in center */}
            <text x="14" y="10" textAnchor="middle" fill="#000" fontSize="8" fontWeight="900" fontFamily="sans-serif">+</text>

            {/* Bottom-left tile */}
            <rect x="1" y="16" width="11" height="11" rx="2" fill="#3b82f6" />
            <text x="6.5" y="25" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="sans-serif">4</text>

            {/* Bottom-right tile */}
            <rect x="16" y="16" width="11" height="11" rx="2" fill="#3b82f6" />
            <text x="21.5" y="25" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="sans-serif">2</text>

            {/* Plus sign in center */}
            <text x="14" y="25" textAnchor="middle" fill="#000" fontSize="8" fontWeight="900" fontFamily="sans-serif">+</text>
        </svg>
    )
}