import React from 'react'

/** Font Awesome share-nodes (requires Font Awesome CSS, e.g. via shared style.css). */
export default function ShareIcon({ size = 18 }) {
  return (
    <i
      className="fa-solid fa-share-nodes"
      style={{ fontSize: size, lineHeight: 1 }}
      aria-hidden="true"
    />
  )
}
