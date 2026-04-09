import React, { useCallback, useState } from 'react'
import FloatingModalShell from './FloatingModalShell.jsx'
import { MODAL_INTENTS } from '@shared-contracts/modalIntents.js'
import { PUZZLE_SUITE_INK, PUZZLE_SUITE_SURFACE_INCOMPLETE } from '@shared-contracts/chromeUi.js'
import DiceFace from './DiceFace.jsx'
import {
  getTierMask,
  isThreeTierGameKey,
  readSuiteDashboardPreferences,
  trySetTierEnabled,
  writeSuiteDashboardPreferences,
} from '@shared-contracts/suiteDashboardPreferences.js'

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 0',
  borderBottom: '1px solid rgba(26, 61, 91, 0.12)',
}

/** “On” color for the suite timer toggle only (puzzle rows stay navy). */
const SUITE_TIMER_TOGGLE_ON = '#6b9b3b'

const toggleStyle = (on) => ({
  width: '44px',
  height: '26px',
  borderRadius: '999px',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  background: on ? PUZZLE_SUITE_INK : PUZZLE_SUITE_SURFACE_INCOMPLETE,
  position: 'relative',
  flexShrink: 0,
  transition: 'background 0.2s',
})

const timerToggleStyle = (on) => ({
  ...toggleStyle(on),
  background: on ? SUITE_TIMER_TOGGLE_ON : PUZZLE_SUITE_SURFACE_INCOMPLETE,
})

const knobStyle = (on) => ({
  position: 'absolute',
  top: '3px',
  left: on ? '22px' : '3px',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  background: '#fff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  transition: 'left 0.2s',
})

const diceBtnStyle = (tierOn) => ({
  width: '32px',
  height: '32px',
  borderRadius: '6px',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  background: tierOn ? PUZZLE_SUITE_INK : PUZZLE_SUITE_SURFACE_INCOMPLETE,
  color: tierOn ? '#fff' : PUZZLE_SUITE_INK,
  transition: 'background 0.2s, color 0.2s',
})

/**
 * @param {{ show: boolean, onClose: () => void, games: { key: string, title: string }[], onSaved?: () => void }} props
 */
export default function SuiteSettingsModal({ show, onClose, games, onSaved }) {
  const [prefs, setPrefs] = useState(() => readSuiteDashboardPreferences())

  const bump = useCallback(() => {
    const next = readSuiteDashboardPreferences()
    setPrefs(next)
    onSaved?.()
  }, [onSaved])

  React.useEffect(() => {
    if (show) setPrefs(readSuiteDashboardPreferences())
  }, [show])

  const setPuzzleOn = (gameKey, on) => {
    writeSuiteDashboardPreferences({ puzzleOn: { [gameKey]: !!on } })
    bump()
  }

  const toggleTier = (gameKey, tierIdx) => {
    const cur = getTierMask(gameKey, prefs)
    const wasEnabled = cur[tierIdx]
    const nextEnabled = !wasEnabled
    if (!trySetTierEnabled(gameKey, tierIdx, nextEnabled, prefs)) return
    bump()
  }

  const timerOn = prefs.timerOn !== false

  const toggleTimer = () => {
    writeSuiteDashboardPreferences({ timerOn: !timerOn })
    bump()
  }

  return (
    <FloatingModalShell
      show={show}
      onClose={onClose}
      intent={MODAL_INTENTS.SETTINGS}
      contentClassName="suite-settings-shell"
    >
      <h2
        className="suite-settings-title"
        style={{
          margin: '0 0 8px',
          fontSize: '1.35rem',
          fontWeight: 900,
          letterSpacing: '0.06em',
          textAlign: 'center',
          color: PUZZLE_SUITE_INK,
        }}
      >
        SETTINGS
      </h2>
      <div style={{ marginBottom: '18px' }}>
        <div
          style={{
            fontSize: '0.78rem',
            fontWeight: 900,
            letterSpacing: '0.14em',
            color: PUZZLE_SUITE_INK,
            marginBottom: '6px',
          }}
        >
          MY PUZZLES
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '0.95rem',
            lineHeight: 1.45,
            color: 'var(--puzzle-ink-soft, #4a5f72)',
          }}
        >
          Choose which puzzles appear on your dashboard.
        </p>
      </div>
      <div
        style={{
          maxHeight: 'min(60vh, 420px)',
          overflowY: 'auto',
          margin: '0 -4px',
          padding: '0 4px',
        }}
      >
        {games.map(({ key, title }) => {
          const puzzleOn = prefs.puzzleOn[key] !== false
          const tiers = isThreeTierGameKey(key) ? getTierMask(key, prefs) : null
          return (
            <div key={key} style={rowStyle}>
              <button
                type="button"
                aria-label={puzzleOn ? `Turn off ${title}` : `Turn on ${title}`}
                onClick={() => setPuzzleOn(key, !puzzleOn)}
                style={toggleStyle(puzzleOn)}
              >
                <span style={knobStyle(puzzleOn)} />
              </button>
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  color: PUZZLE_SUITE_INK,
                }}
              >
                {title}
              </div>
              {tiers ? (
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  {[0, 1, 2].map((ti) => {
                    const on = tiers[ti]
                    const onlyOne = tiers.filter(Boolean).length === 1 && on
                    return (
                      <button
                        key={ti}
                        type="button"
                        disabled={!puzzleOn || (onlyOne && on)}
                        title={['Easy', 'Medium', 'Hard'][ti]}
                        aria-label={`${['Easy', 'Medium', 'Hard'][ti]} ${on ? 'on' : 'off'}`}
                        onClick={() => puzzleOn && toggleTier(key, ti)}
                        style={{
                          ...diceBtnStyle(on),
                          opacity: puzzleOn ? 1 : 0.45,
                          cursor: puzzleOn && !(onlyOne && on) ? 'pointer' : 'default',
                        }}
                      >
                        <DiceFace count={ti + 1} size={18} color={on ? '#fff' : undefined} />
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div style={{ width: '102px', flexShrink: 0 }} aria-hidden />
              )}
            </div>
          )
        })}
      </div>
      <div
        style={{
          marginTop: '18px',
          paddingTop: '18px',
          borderTop: '1px solid rgba(26, 61, 91, 0.12)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          aria-label={timerOn ? 'Turn timer off' : 'Turn timer on'}
          onClick={toggleTimer}
          style={timerToggleStyle(timerOn)}
        >
          <span style={knobStyle(timerOn)} />
        </button>
        <i
          className="fa-solid fa-clock"
          style={{ fontSize: '1.15rem', lineHeight: 1, color: PUZZLE_SUITE_INK }}
          aria-hidden
        />
        <span
          style={{
            fontWeight: 900,
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            color: PUZZLE_SUITE_INK,
          }}
        >
          {timerOn ? 'TIMER ON' : 'TIMER OFF'}
        </span>
      </div>
    </FloatingModalShell>
  )
}
