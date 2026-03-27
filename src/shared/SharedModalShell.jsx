import React, { useEffect } from 'react'
import { getModalCloseAriaLabel } from '../../shared-contracts/modalIntents.js'

export default function SharedModalShell({ show = false, onClose, children, closeAriaLabel, intent }) {
    useEffect(() => {
        if (!show) return
        const onKey = (e) => {
            if (e.key === 'Escape') onClose?.()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [show, onClose])

    if (!show) return null
    const resolvedCloseAriaLabel = closeAriaLabel || getModalCloseAriaLabel(intent)

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
                    aria-label={resolvedCloseAriaLabel}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    )
}

