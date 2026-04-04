import React from 'react'
import { getModalCloseAriaLabel } from '../../shared-contracts/modalIntents.js'
import { useModalEscape } from './useModalEscape.js'

/**
 * Full-page instructions overlay (`#instructions-overlay` + white sheet).
 * Kept for optional revert: point `SharedModalShell.jsx` at this module instead of `FloatingModalShell`.
 */
export default function InstructionsModalShell({ show = false, onClose, children, closeAriaLabel, intent, contentClassName = '' }) {
    useModalEscape(show, onClose)

    if (!show) return null
    const resolvedCloseAriaLabel = closeAriaLabel || getModalCloseAriaLabel(intent)

    return (
        <div id="instructions-overlay" onClick={onClose}>
            <div
                className={`modal-content shared-modal-content${contentClassName ? ` ${contentClassName}` : ''}`}
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
