import React from 'react'
import { HEADER_ACTIONS, ensureHeaderActions } from '../../shared-contracts/headerActions.js'
import { CHROME_ACTION_ARIA_LABELS, CHROME_ASSET_URLS } from '../../shared-contracts/chromeUi.js'

/** Hub (puzzle piece) icon position inside the navy circle — tweak these until it looks centered. Positive x = right, positive y = down. */
const HOME_PUZZLE_ICON_NUDGE_PX = { x: 1.5, y: -1.5 }

const styles = {
    bar: {
        width: '100%',
        height: '57px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: '10px',
        boxSizing: 'border-box',
        color: '#18355E',
        fontFamily: 'Roboto, sans-serif',
        background: '#fff',
        boxShadow: '1px 2px 16px 4px rgba(15, 10, 8, .05),1px 1px 8px 1px rgba(15, 10, 8, .08),1px 1px 4px 1px rgba(15, 10, 8, .04)',
    },
    content: {
        width: 'min(95vw, 500px)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    iconBtn: {
        width: '32px',
        height: '32px',
        borderRadius: '999px',
        border: '2px solid transparent',
        background: '#18355E',
        color: '#FFF',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        textDecoration: 'none',
    },
    cubeBtn: {
        background: 'transparent',
        border: 'none',
        padding: 0,
        margin: 0,
        width: '32px',
        height: '32px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cubeImg: {
        width: '30px',
        height: '30px',
        display: 'block',
    },
    titleWrap: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        minWidth: 0,
    },
    logoContainer: {
        borderRight: '2px solid #18355E',
        paddingTop: '0.4em',
        paddingBottom: '0.4em',
        paddingRight: '5px',
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        height: '26px',
        width: 'auto',
        display: 'block',
    },
    /** Slightly larger than default FA icon scale — legible inside the 32px circles */
    iconGlyph: {
        fontSize: '1.2rem',
        lineHeight: 1,
    },
    /** Puzzle piece only — uses `HOME_PUZZLE_ICON_NUDGE_PX` above */
    homePuzzleIcon: {
        fontSize: '1.2rem',
        lineHeight: 1,
        display: 'block',
        transform: `translate(${HOME_PUZZLE_ICON_NUDGE_PX.x}px, ${HOME_PUZZLE_ICON_NUDGE_PX.y}px)`,
    },
}

export default function TopBar({
    title,
    onHome,
    onCube,
    onStats,
    onHelp,
    showStats = false,
    /** When false, only the cube/links control is shown on the left (e.g. hub). */
    showHome = true,
}) {
    const actions = ensureHeaderActions({
        [HEADER_ACTIONS.HOME]: onHome,
        [HEADER_ACTIONS.LINKS]: onCube,
        [HEADER_ACTIONS.STATS]: onStats,
        [HEADER_ACTIONS.HELP]: onHelp,
    })

    const barStyle = {
        ...styles.bar,
        position: 'relative',
        left: '50%',
        width: '100vw',
        transform: 'translateX(-50%)',
    }

    return (
        <div className="topbar-shell" style={barStyle}>
            <div style={styles.content}>
                <div style={styles.left}>
                    {showHome && (
                        <button
                            type="button"
                            style={styles.iconBtn}
                            onClick={actions[HEADER_ACTIONS.HOME]}
                            aria-label={CHROME_ACTION_ARIA_LABELS[HEADER_ACTIONS.HOME]}
                        >
                            <i className="fa-solid fa-puzzle-piece" style={styles.homePuzzleIcon} aria-hidden="true" />
                        </button>
                    )}
                    <button
                        type="button"
                        style={styles.cubeBtn}
                        onClick={actions[HEADER_ACTIONS.LINKS]}
                        aria-label={CHROME_ACTION_ARIA_LABELS[HEADER_ACTIONS.LINKS]}
                    >
                        <img
                            style={styles.cubeImg}
                            src={CHROME_ASSET_URLS.CUBE_ICON}
                            alt=""
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div style={styles.titleWrap} aria-label={title}>
                    <div style={styles.logoContainer} aria-hidden="true">
                        <img
                            style={styles.logo}
                            src={CHROME_ASSET_URLS.BEAST_ACADEMY_LOGO}
                            alt=""
                            loading="eager"
                        />
                    </div>
                    <h1 className="topbar-title">{title}</h1>
                </div>

                <div style={styles.right}>
                    {showStats && (
                        <button
                            type="button"
                            style={styles.iconBtn}
                            onClick={actions[HEADER_ACTIONS.STATS]}
                            aria-label={CHROME_ACTION_ARIA_LABELS[HEADER_ACTIONS.STATS]}
                        >
                            <i className="fas fa-chart-column" style={styles.iconGlyph} aria-hidden="true" />
                        </button>
                    )}
                    <button
                        type="button"
                        style={styles.iconBtn}
                        onClick={actions[HEADER_ACTIONS.HELP]}
                        aria-label={CHROME_ACTION_ARIA_LABELS[HEADER_ACTIONS.HELP]}
                    >
                        <i className="fas fa-question" style={styles.iconGlyph} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    )
}
