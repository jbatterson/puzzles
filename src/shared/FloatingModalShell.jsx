import React, { useRef, useLayoutEffect } from 'react'
import { getModalCloseAriaLabel, getModalDialogLabel } from '@shared-contracts/modalIntents.js'
import { useModalEscape } from './useModalEscape.js'

/**
 * Elements that can receive keyboard focus and should participate in the Tab cycle.
 * Excludes elements with tabIndex="-1" (programmatically focusable only).
 */
const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function trapTab(e, panel) {
  if (e.key !== 'Tab' || !panel) return
  const focusable = [...panel.querySelectorAll(FOCUSABLE_SELECTORS)]
  if (focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

/** Centered card + translucent backdrop (stats, links, completion, suite instructions). */
export default function FloatingModalShell({
  show = false,
  onClose,
  children,
  closeAriaLabel,
  intent,
  contentClassName = '',
}) {
  useModalEscape(show, onClose)

  const panelRef = useRef(null)

  // On open: capture the trigger element and move focus into the modal.
  // On close (cleanup): restore focus to the trigger so keyboard users land back
  // where they started. useLayoutEffect runs synchronously after DOM mutation so
  // focus changes happen before the browser paints, avoiding a visible flash.
  useLayoutEffect(() => {
    if (!show) return
    const trigger = document.activeElement
    const first = panelRef.current?.querySelector(FOCUSABLE_SELECTORS)
    ;(first ?? panelRef.current)?.focus()
    return () => {
      trigger?.focus()
    }
  }, [show])

  if (!show) return null

  return (
    <div className="floating-modal-backdrop" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={getModalDialogLabel(intent)}
        tabIndex={-1}
        className={`floating-modal-panel shared-modal-content${contentClassName ? ` ${contentClassName}` : ''}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => trapTab(e, panelRef.current)}
      >
        <button
          type="button"
          className="shared-modal-close"
          onClick={onClose}
          aria-label={closeAriaLabel || getModalCloseAriaLabel(intent)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
