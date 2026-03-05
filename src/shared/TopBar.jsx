import React, { useState } from 'react'
import MenuModal from './MenuModal.jsx'

export default function TopBar({ title, onHelp }) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <div className="header-row">
                <div className="left-spacer">
                    <div
                        className="menu-btn"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >☰</div>
                </div>

                <h1
                    className="title"
                    style={{ fontSize: 'clamp(1.2rem, 5vw, 1.8rem)' }}
                >
                    {title}
                </h1>

                <div className="help-btn" onClick={onHelp}>?</div>
            </div>

            {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}
        </>
    )
}