import React from 'react'

export default function FactorfallIcon({ size = 24, className = '' }) {
    const r = size * 0.22
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            className={className}
            aria-hidden
        >
            {/* 3x3 grid of factor balls falling into place */}
            {/* Top row — one ball mid-fall */}
            <circle cx="24" cy="10" r={r} fill="#ff5f5f" />
            <text x="24" y="10" textAnchor="middle" dominantBaseline="central"
                fill="white" fontSize="7" fontWeight="900" fontFamily="Outfit, sans-serif">3</text>

            {/* Middle row */}
            <circle cx="14" cy="24" r={r} fill="#3273dc" />
            <text x="14" y="24" textAnchor="middle" dominantBaseline="central"
                fill="white" fontSize="7" fontWeight="900" fontFamily="Outfit, sans-serif">2</text>

            <circle cx="34" cy="24" r={r} fill="#ff5f5f" />
            <text x="34" y="24" textAnchor="middle" dominantBaseline="central"
                fill="white" fontSize="7" fontWeight="900" fontFamily="Outfit, sans-serif">4</text>

            {/* Bottom row — stacked */}
            <circle cx="14" cy="38" r={r} fill="#ff5f5f" />
            <text x="14" y="38" textAnchor="middle" dominantBaseline="central"
                fill="white" fontSize="7" fontWeight="900" fontFamily="Outfit, sans-serif">6</text>

            <circle cx="24" cy="38" r={r} fill="#3273dc" />
            <text x="24" y="38" textAnchor="middle" dominantBaseline="central"
                fill="white" fontSize="7" fontWeight="900" fontFamily="Outfit, sans-serif">2</text>

            <circle cx="34" cy="38" r={r} fill="#3273dc" />
            <text x="34" y="38" textAnchor="middle" dominantBaseline="central"
                fill="white" fontSize="7" fontWeight="900" fontFamily="Outfit, sans-serif">5</text>

            {/* Downward arrow hint */}
            <path d="M24 2 L24 6" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 4.5 L24 7 L26 4.5" stroke="#999" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    )
}