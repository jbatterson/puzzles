import React from 'react'
import { getModalCloseAriaLabel } from '../../shared-contracts/modalIntents.js'
import { useModalEscape } from './useModalEscape.js'

/** Centered card + translucent backdrop (stats, links, completion, suite instructions). */
export default function FloatingModalShell({ show = false, onClose, children, closeAriaLabel, intent, contentClassName = '' }) {
    useModalEscape(show, onClose)

    if (!show) return null
    const resolvedCloseAriaLabel = closeAriaLabel || getModalCloseAriaLabel(intent)

    return (
        <div className="floating-modal-backdrop" onClick={onClose}>
            <div
                className={`floating-modal-panel shared-modal-content${contentClassName ? ` ${contentClassName}` : ''}`}
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
