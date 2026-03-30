import React from 'react'

/** Hub-style share glyph (three nodes + curves). */
export default function ShareIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="8" r="2.5" />
            <circle cx="18" cy="16" r="2.5" />
            <path d="M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8" />
        </svg>
    )
}
