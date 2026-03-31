import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import FloatingModalShell from './FloatingModalShell.jsx'
import { MODAL_INTENTS } from '../../shared-contracts/modalIntents.js'
import { computeSimpleGameStats } from '../../shared-contracts/simpleGameStats.js'
import { buildHubSharePlaintext } from '../../shared-contracts/hubSharePlaintext.js'
import { isNowSchoolTime } from '../../shared-contracts/schoolTime.js'
import { GAME_KEYS, getGameChrome } from '../../shared-contracts/gameChrome.js'
import { CTA_LABELS } from '../../shared-contracts/ctaLabels.js'
import ShareIcon from './ShareIcon.jsx'

const TOAST_MS = 2000

/** Win-modal headings (uppercase + punctuation per design). */
const COMPLETION_HEADLINE = Object.freeze({
    [GAME_KEYS.FOLDS]: 'FOLDED!',
    [GAME_KEYS.SCURRY]: 'SCURRIED!',
    [GAME_KEYS.CLUELESS]: 'CLUED IN!',
    [GAME_KEYS.FACTORFALL]: 'FACTORFELL!',
    [GAME_KEYS.SUMTILES]: 'AWE-SUM!',
    [GAME_KEYS.PRODUCTILES]: 'PRODUCTIVE!',
    [GAME_KEYS.HONEYCOMBS]: 'HEX-CELLENT!',
})

function pluralUnit(n, singular, plural) {
    return n === 1 ? singular : plural
}

/**
 * All Ten–style completion surface: Beast promo, suite stats, hub-identical share, ALL PUZZLES.
 * @param {{ show: boolean, onClose: () => void, gameKey: string, dateKey: string }} props
 */
export default function SuiteGameCompletionModal({ show, onClose, gameKey, dateKey }) {
    const base = import.meta.env.BASE_URL
    const { title: gameTitle } = getGameChrome(gameKey)
    const modalTitle = COMPLETION_HEADLINE[gameKey] ?? `${gameTitle.toUpperCase()}!`

    const stats = useMemo(() => {
        if (!show || !gameKey) return { played: 0, streak: 0, stars: 0, avgMoves: '' }
        return computeSimpleGameStats(gameKey)
    }, [show, gameKey])

    const isTileGame = gameKey === GAME_KEYS.SUMTILES || gameKey === GAME_KEYS.PRODUCTILES

    const [shareToast, setShareToast] = useState(false)
    const toastTimeoutRef = useRef(null)

    useEffect(() => () => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }, [])

    const handleShare = useCallback(() => {
        const text = buildHubSharePlaintext(gameKey, dateKey, base)
        navigator.clipboard.writeText(text).then(() => {
            if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
            setShareToast(true)
            toastTimeoutRef.current = setTimeout(() => {
                setShareToast(false)
                toastTimeoutRef.current = null
            }, TOAST_MS)
        })
    }, [gameKey, dateKey, base])

    const schoolTime = isNowSchoolTime()

    return (
        <FloatingModalShell
            show={show}
            onClose={onClose}
            intent={MODAL_INTENTS.RESULTS}
            contentClassName="suite-completion-shell"
        >
            <h2 className="suite-completion-title">{modalTitle}</h2>

            {schoolTime ? (
                <div className="suite-completion-promo" id="suite-completion-plug-educators">
                    <div className="suite-completion-promo-title">Are you a teacher?</div>
                    <p className="suite-completion-promo-copy">
                        Check out our interactive math curriculum for Grades 1-5 designed by
                        the global leaders in advanced math education.
                    </p>
                    <a
                        className="suite-completion-cta"
                        id="suite-completion-educators-button"
                        href="https://beastacademy.com/educators"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Learn More
                    </a>
                </div>
            ) : (
                <div className="suite-completion-promo" id="suite-completion-plug-online">
                    <div className="suite-completion-promo-title">More challenges ahead!</div>
                    <p className="suite-completion-promo-copy">
                        Check out our interactive full math curriculum tailored to advanced
                        learners ages 6-13.
                    </p>
                    <a
                        className="suite-completion-cta"
                        id="suite-completion-online-button"
                        href="https://beastacademy.com/online"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Learn More
                    </a>
                </div>
            )}

            <div className="simple-game-stats-row suite-completion-stats">
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

            <div className="suite-completion-share-block">
                {shareToast && (
                    <div className="toast-panel suite-completion-share-toast" role="status">
                        <div className="toast-text">RESULTS COPIED TO CLIPBOARD</div>
                    </div>
                )}
                <button type="button" className="suite-completion-share-btn" onClick={handleShare} aria-label="Share results">
                    SHARE
                    <ShareIcon size={18} />
                </button>
            </div>

            <a
                href={base}
                className="btn-primary suite-completion-all-puzzles"
                style={{
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >
                {CTA_LABELS.ALL_PUZZLES}
            </a>
        </FloatingModalShell>
    )
}
