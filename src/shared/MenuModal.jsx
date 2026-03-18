import React, { useEffect } from 'react'
import NAV from './nav.js'
import BugIcon from './icons/BugIcon.jsx'
import FoldsIcon from './icons/FoldsIcon.jsx'
import ProductilesIcon from './icons/ProductilesIcon.jsx'
import SumTilesIcon from './icons/SumTilesIcon.jsx'

const ICONS = {
    'Scurry':      BugIcon,
    'Folds':       FoldsIcon,
    'Productiles': ProductilesIcon,
    'Sum Tiles':   SumTilesIcon,
}

export default function MenuModal({ onClose }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <div id="instructions-overlay" onClick={onClose}>
            <div
                className="modal-content"
                style={{ position: 'relative', gap: '0' }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close menu"
                    style={{
                        position: 'absolute', top: '16px', right: '16px',
                        background: 'none', border: 'none', fontSize: '22px',
                        fontWeight: 900, cursor: 'pointer', lineHeight: 1, padding: '4px'
                    }}
                >✕</button>

                <h1 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    Puzzles
                </h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {NAV.map(item => {
                        const Icon = ICONS[item.title]
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '10px 8px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    color: 'black',
                                    transition: 'background 140ms ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                {Icon && (
                                    <div style={{
                                        width: '56px', height: '56px',
                                        display: 'grid', placeItems: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Icon size={48} />
                                    </div>
                                )}
                                <span style={{
                                    fontWeight: 900,
                                    fontSize: '1rem',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                }}>
                                    {item.title}
                                </span>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}