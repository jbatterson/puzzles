import React from 'react'
import DiceFace from './DiceFace.jsx'
import { GAME_KEYS } from '../../shared-contracts/gameChrome.js'
import { PUZZLE_SUITE_INK, PUZZLE_SUITE_SURFACE_INCOMPLETE } from '../../shared-contracts/chromeUi.js'

const TILE_GAMES = new Set([GAME_KEYS.SUMTILES, GAME_KEYS.PRODUCTILES])

/**
 * Hub-style three dice for the completion modal (matches home card row).
 * @param {{ gameKey: string, completions: boolean[], perfects: boolean[], moveCounts?: (number|null)[], cluelessAttempts?: (number|null)[] | null }} props
 */
export default function SuiteCompletionHubDice({
    gameKey,
    completions,
    perfects,
    moveCounts,
    cluelessAttempts,
}) {
    const isTileGame = TILE_GAMES.has(gameKey)
    const isClueless = gameKey === GAME_KEYS.CLUELESS && Array.isArray(cluelessAttempts)

    return (
        <div
            style={{
                display: 'flex',
                gap: '6px',
                marginTop: '8px',
                justifyContent: 'center',
            }}
        >
            {[0, 1, 2].map((i) => {
                let done = false
                let content = null
                if (isClueless) {
                    const a = cluelessAttempts[i] ?? null
                    done = a != null
                    content = !done ? (
                        <DiceFace count={i + 1} size={20} />
                    ) : a === 1 ? (
                        '★'
                    ) : (
                        String(Math.min(a, 99))
                    )
                } else {
                    done = !!completions[i]
                    const moves = moveCounts != null ? moveCounts[i] : null
                    content = !done ? (
                        <DiceFace count={i + 1} size={20} />
                    ) : isTileGame ? (
                        moves != null ? String(Math.min(moves, 99)) : '✓'
                    ) : perfects[i] ? (
                        '★'
                    ) : (
                        '✓'
                    )
                }
                return (
                    <div
                        key={i}
                        style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: done ? '#6b9b3b' : PUZZLE_SUITE_SURFACE_INCOMPLETE,
                            color: done ? '#fff' : PUZZLE_SUITE_INK,
                            fontWeight: 900,
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s',
                        }}
                    >
                        {content}
                    </div>
                )
            })}
        </div>
    )
}
