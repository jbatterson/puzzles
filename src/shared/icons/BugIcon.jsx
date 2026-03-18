import React from 'react'

export default function BugIcon({ size = 28, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 28 28"
            className={className}
        >
            <path d="M10 6 Q 8 2 6 4" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18 6 Q 20 2 22 4" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            <g stroke="#000" strokeWidth="1.5" strokeLinecap="round">
                <line x1="8" y1="12" x2="3" y2="10" />
                <line x1="7" y1="16" x2="2" y2="16" />
                <line x1="8" y1="20" x2="3" y2="22" />
                <line x1="20" y1="12" x2="25" y2="10" />
                <line x1="21" y1="16" x2="26" y2="16" />
                <line x1="20" y1="20" x2="25" y2="22" />
            </g>
            <circle cx="14" cy="16" r="9" fill="#FF3B30" stroke="#000" strokeWidth="1" />
            <path d="M8 13 A 7 7 0 0 1 20 13" fill="#000" />
            <circle cx="11" cy="17" r="1.5" fill="white" />
            <circle cx="17" cy="17" r="1.5" fill="white" />
        </svg>
    )
}