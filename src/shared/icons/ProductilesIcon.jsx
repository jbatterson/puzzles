import React from 'react'

export default function ProductilesIcon({ size = 28 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28">
            {/* Left tile — green */}
            <rect x="1" y="8" width="11" height="11" rx="2" fill="#16a34a" />
            <text x="6.5" y="17" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="sans-serif">3</text>

            {/* Multiply sign */}
            <text x="14" y="17" textAnchor="middle" fill="#000" fontSize="8" fontWeight="900" fontFamily="sans-serif">×</text>

            {/* Right tile — blue */}
            <rect x="16" y="8" width="11" height="11" rx="2" fill="#3b82f6" />
            <text x="21.5" y="17" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="sans-serif">4</text>

            {/* Result line */}
            <line x1="4" y1="23" x2="24" y2="23" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />

            {/* Result */}
            <text x="14" y="28" textAnchor="middle" fill="#000" fontSize="7" fontWeight="900" fontFamily="sans-serif">12</text>
        </svg>
    )
}