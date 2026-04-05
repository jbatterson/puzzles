import React from 'react'

/**
 * Navy panel matching share-result toasts, without auto-dismiss.
 * Parent should be `position: relative`; toast sits below (`top: 100%`).
 */
export default function DismissibleHintToast({
    message,
    onDismiss,
    align = 'center',
}) {
    const alignClass = align === 'center' ? 'share-result-toast--align-center' : 'share-result-toast--align-end'

    return (
        <div
            className={`toast-panel share-result-toast share-result-toast--below ${alignClass}`}
            role="status"
        >
            <div className="toast-row share-result-toast__row">
                <div className="toast-text share-result-toast__inner">
                    <div className="share-result-toast__body">{message}</div>
                </div>
                <button
                    type="button"
                    className="toast-close share-result-toast__close"
                    aria-label="Dismiss notification"
                    onClick={(e) => {
                        e.stopPropagation()
                        onDismiss()
                    }}
                >
                    ✕
                </button>
            </div>
        </div>
    )
}
