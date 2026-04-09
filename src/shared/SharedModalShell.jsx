import React from 'react'
import FloatingModalShell from './FloatingModalShell.jsx'

/**
 * Suite instructions + All Ten help: floating card + dim backdrop (same as stats / links / completion).
 * To use the full-bleed white sheet again, switch this file to re-export InstructionsModalShell.
 */
const INSTRUCTIONS_PANEL_CLASS = 'game-instructions-modal'

export default function SharedModalShell({ contentClassName = '', ...rest }) {
  const merged = [INSTRUCTIONS_PANEL_CLASS, contentClassName].filter(Boolean).join(' ')
  return <FloatingModalShell {...rest} contentClassName={merged} />
}
