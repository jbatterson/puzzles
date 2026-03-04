import React, { useEffect } from 'react'
import NAV from './nav.js'

export default function MenuModal({ onClose }) {
    // Close on Escape key
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <div
            id="instructions-overlay"
            onClick={onClose}
        >
            <div
                className="modal-content"
                style={{ position: 'relative', gap: '12px' }}
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {NAV.map(item => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="btn-secondary"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                textDecoration: 'none',
                            }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}