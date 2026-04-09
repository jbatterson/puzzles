import React from 'react'

function mergeClass(...parts) {
  return parts.filter(Boolean).join(' ')
}

/**
 * Bottom primary CTA after a puzzle is solved. Optional text-only pulse (CSS) when `attention` is true.
 */
export function PostSolvePrimaryButton({ attention, children, className = '', ...rest }) {
  return (
    <button
      type="button"
      className={mergeClass('btn-primary', attention && 'btn-primary--solve-attention', className)}
      {...rest}
    >
      {attention ? <span className="btn-primary__pulse-label">{children}</span> : children}
    </button>
  )
}

export function PostSolvePrimaryLink({ attention, children, className = '', ...rest }) {
  return (
    <a
      className={mergeClass('btn-primary', attention && 'btn-primary--solve-attention', className)}
      {...rest}
    >
      {attention ? <span className="btn-primary__pulse-label">{children}</span> : children}
    </a>
  )
}
