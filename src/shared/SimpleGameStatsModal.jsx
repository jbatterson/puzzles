import React, { useMemo } from 'react'
import FloatingModalShell from './FloatingModalShell.jsx'
import { MODAL_INTENTS } from '../../shared-contracts/modalIntents.js'
import { computeSimpleGameStats } from '../../shared-contracts/simpleGameStats.js'
import { GAME_KEYS } from '../../shared-contracts/gameChrome.js'

function pluralUnit(n, singular, plural) {
    return n === 1 ? singular : plural
}

export default function SimpleGameStatsModal({ show, onClose, gameKey }) {
    const stats = useMemo(() => {
        if (!show || !gameKey) return { played: 0, streak: 0, stars: 0, avgMoves: '' }
        return computeSimpleGameStats(gameKey)
    }, [show, gameKey])

    const isTileGame = gameKey === GAME_KEYS.SUMTILES || gameKey === GAME_KEYS.PRODUCTILES

    return (
        <FloatingModalShell
            show={show}
            onClose={onClose}
            intent={MODAL_INTENTS.STATS}
            contentClassName="simple-game-stats-shell"
        >
            <h2 className="simple-game-stats-title">Stats</h2>
            <div className="simple-game-stats-row">
                <div className="simple-game-stats-col">
                    <div className="simple-game-stats-label">Played</div>
                    <div className="simple-game-stats-value">{stats.played}</div>
                    <div className="simple-game-stats-unit">{pluralUnit(stats.played, 'day', 'days')}</div>
                </div>
                <div className="simple-game-stats-col">
                    <div className="simple-game-stats-label">Streak</div>
                    <div className="simple-game-stats-value">{stats.streak}</div>
                    <div className="simple-game-stats-unit">{pluralUnit(stats.streak, 'day', 'days')}</div>
                </div>
                {isTileGame ? (
                    <div className="simple-game-stats-col">
                        <div className="simple-game-stats-label">AVG MOVES</div>
                        <div className="simple-game-stats-value">{stats.avgMoves || '–|–|–'}</div>
                        <div className="simple-game-stats-unit"></div>
                    </div>
                ) : (
                    <div className="simple-game-stats-col">
                        <div className="simple-game-stats-label">Stars</div>
                        <div className="simple-game-stats-value">{stats.stars}</div>
                        <div className="simple-game-stats-unit">{pluralUnit(stats.stars, 'time', 'times')}</div>
                    </div>
                )}
            </div>
        </FloatingModalShell>
    )
}
