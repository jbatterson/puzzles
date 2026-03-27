import React, { useEffect } from 'react'

export default function SharedModalShell({ show = false, onClose, children, closeAriaLabel = 'Close modal' }) {
    useEffect(() => {
        if (!show) return
        const onKey = (e) => {
            if (e.key === 'Escape') onClose?.()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [show, onClose])

    if (!show) return null

    return (
        <div id="instructions-overlay" onClick={onClose}>
            <div
                className="modal-content shared-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="shared-modal-close"
                    onClick={onClose}
                    aria-label={closeAriaLabel}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    )
}

