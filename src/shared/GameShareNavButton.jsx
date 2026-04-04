import React, { useCallback, useEffect, useRef, useState } from 'react'
import { buildHubSharePlaintext } from '../../shared-contracts/hubSharePlaintext.js'
import ShareResultToast, { SHARE_RESULT_TOAST_MS } from './ShareResultToast.jsx'

/**
 * 28×28 nav share control (matches difficulty dice tiles). Font Awesome via shared style.css.
 * After copy: shared ShareResultToast; parent row should use .game-dice-share-anchor.
 */
export default function GameShareNavButton({ gameKey, dateKey, canShare }) {
    const base = import.meta.env.BASE_URL
    const [shareToast, setShareToast] = useState(null)
    const toastTimeoutRef = useRef(null)

    useEffect(() => () => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }, [])

    const dismissShareToast = useCallback(() => {
        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current)
            toastTimeoutRef.current = null
        }
        setShareToast(null)
    }, [])

    const handleClick = useCallback(() => {
        if (!canShare) return
        const text = buildHubSharePlaintext(gameKey, dateKey, base)
        if (!text) return
        navigator.clipboard.writeText(text).then(() => {
            if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
            setShareToast({ preview: text, fadeOut: false })
            toastTimeoutRef.current = setTimeout(() => {
                setShareToast(prev => (prev ? { ...prev, fadeOut: true } : null))
                toastTimeoutRef.current = null
            }, SHARE_RESULT_TOAST_MS)
        })
    }, [canShare, gameKey, dateKey, base])

    return (
        <div className="game-nav-share-wrap">
            <button
                type="button"
                className="game-nav-share-btn"
                disabled={!canShare}
                onClick={handleClick}
                aria-label={canShare ? 'Share results' : 'Share results (no progress yet)'}
            >
                <i className="fa-solid fa-share-nodes" aria-hidden="true" />
            </button>
            {shareToast != null && (
                <ShareResultToast
                    preview={shareToast.preview}
                    fadeOut={shareToast.fadeOut}
                    align="end"
                    onDismiss={dismissShareToast}
                    onTransitionEnd={(e) => {
                        if (e.target !== e.currentTarget || e.propertyName !== 'opacity') return
                        setShareToast(prev => (prev?.fadeOut ? null : prev))
                    }}
                />
            )}
        </div>
    )
}
