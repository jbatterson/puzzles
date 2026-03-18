import React from 'react'

const base = import.meta.env.BASE_URL

export default function TopBar({ title, onHelp }) {
    return (
        <div className="header-row">
            <div className="left-spacer">
                <a
                    href={base}
                    className="home-btn"
                    aria-label="Home"
                >
                    <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden>
                        <path d="M4 11L2.5 11L12 3L21.5 11L20 11L20 21Q20 22 19 22L5 22Q4 22 4 21ZM10 15L14 15Q15 15 15 16L15 22L9 22L9 16Q9 15 10 15Z" />
                    </svg>
                </a>
            </div>

            <h1
                className="title"
                style={{ fontSize: 'clamp(1.2rem, 5vw, 1.8rem)' }}
            >
                {title}
            </h1>

            <div className="help-btn" onClick={onHelp}>?</div>
        </div>
    )
}
