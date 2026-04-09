import React from 'react'
import { HEADER_ACTIONS, ensureHeaderActions } from '../../shared-contracts/headerActions.js'
import { CHROME_ACTION_ARIA_LABELS, CHROME_ASSET_URLS } from '../../shared-contracts/chromeUi.js'

/** Hub (puzzle piece) icon position inside the navy circle — tweak these until it looks centered. Positive x = right, positive y = down. */
const HOME_PUZZLE_ICON_NUDGE_PX = { x: 1.5, y: -1.5 }
/** Settings (gear) icon nudge inside the navy circle — match puzzle-piece optical centering. */
const SETTINGS_ICON_NUDGE_PX = { x: 0, y: 0 }

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
        color: '#1a3d5b',
        fontFamily: 'Roboto, sans-serif',
        background: '#fff',
        boxShadow: '1px 2px 16px 4px rgba(15, 10, 8, .05),1px 1px 8px 1px rgba(15, 10, 8, .08),1px 1px 4px 1px rgba(15, 10, 8, .04)',
    },
    content: {
        width: 'min(95vw, 500px)',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        justifySelf: 'start',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        justifySelf: 'end',
    },
    /** Grid center column: true horizontal center of the bar */
    center: {
        justifySelf: 'center',
        minWidth: 0,
        maxWidth: '100%',
    },
    iconBtn: {
        width: '32px',
        height: '32px',
        borderRadius: '999px',
        border: '2px solid transparent',
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
    /** Same layout as titleWrap; used when the whole title row is a links button */
    titleHit: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: '2px 4px',
        minWidth: 0,
        maxWidth: '100%',
        background: 'none',
        border: 'none',
        borderRadius: '8px',
        color: 'inherit',
        font: 'inherit',
        cursor: 'pointer',
        textAlign: 'left',
    },
    logoContainer: {
        borderRight: '2px solid #1a3d5b',
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
        fontFamily: '"Font Awesome 6 Free"',
        fontWeight: 900,
        fontSize: '1.2rem',
        lineHeight: 1,
        display: 'block',
        transform: `translate(${HOME_PUZZLE_ICON_NUDGE_PX.x}px, ${HOME_PUZZLE_ICON_NUDGE_PX.y}px)`,
    },
    settingsIcon: {
        fontFamily: '"Font Awesome 6 Free"',
        fontWeight: 900,
        fontSize: '1.15rem',
        lineHeight: 1,
        display: 'block',
        transform: `translate(${SETTINGS_ICON_NUDGE_PX.x}px, ${SETTINGS_ICON_NUDGE_PX.y}px)`,
    },
}

export default function TopBar({
    title,
    onHome,
    onCube,
    onStats,
    onHelp,
    onSettings,
    showStats = false,
    /** When false, only the cube/links control is shown on the left (e.g. hub). */
    showHome = true,
    /** Puzzle pages: hide cube; logo + title open the links modal (hub keeps the cube). */
    linksViaTitleOnly = false,
    /** Hub: logo + title also open the links modal (cube stays visible). */
    titleOpensLinks = false,
}) {
    const actions = ensureHeaderActions({
        [HEADER_ACTIONS.HOME]: onHome,
        [HEADER_ACTIONS.LINKS]: onCube,
        [HEADER_ACTIONS.STATS]: onStats,
        [HEADER_ACTIONS.HELP]: onHelp,
    })

    /** Full-bleed bar inside hub / #root max-width column: 50% is parent width, 50vw is viewport. */
    const barStyle = {
        ...styles.bar,
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        boxSizing: 'border-box',
    }

    const titleIsLinksControl =
        typeof onCube === 'function' && (linksViaTitleOnly || titleOpensLinks)

    return (
        <div className="topbar-shell" style={barStyle}>
            <div style={styles.content}>
                <div style={styles.left}>
                    {showHome && (
                        <button
                            type="button"
                            className="titlebar-iconbtn"
                            style={styles.iconBtn}
                            onClick={actions[HEADER_ACTIONS.HOME]}
                            aria-label={CHROME_ACTION_ARIA_LABELS[HEADER_ACTIONS.HOME]}
                        >
                            <i className="fa-solid fa-puzzle-piece" style={styles.homePuzzleIcon} aria-hidden="true" />
                        </button>
                    )}
                    {!linksViaTitleOnly && (
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
                    )}
                </div>

                {titleIsLinksControl ? (
                    <button
                        type="button"
                        className="topbar-title-hit"
                        style={{ ...styles.titleHit, ...styles.center }}
                        onClick={actions[HEADER_ACTIONS.LINKS]}
                        aria-label={CHROME_ACTION_ARIA_LABELS[HEADER_ACTIONS.LINKS]}
                    >
                        <div style={styles.logoContainer} aria-hidden="true">
                            <img
                                style={styles.logo}
                                src={CHROME_ASSET_URLS.BEAST_ACADEMY_LOGO}
                                alt=""
                                loading="eager"
                            />
                        </div>
                        <span className="topbar-title">{title}</span>
                    </button>
                ) : (
                    <div style={{ ...styles.titleWrap, ...styles.center }} aria-label={title}>
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
                )}

                <div style={styles.right}>
                    {showStats && (
                        <button
                            type="button"
                            className="titlebar-iconbtn"
                            style={styles.iconBtn}
                            onClick={actions[HEADER_ACTIONS.STATS]}
                            aria-label={CHROME_ACTION_ARIA_LABELS[HEADER_ACTIONS.STATS]}
                        >
                            <i className="fas fa-chart-column" style={styles.iconGlyph} aria-hidden="true" />
                        </button>
                    )}
                    {typeof onSettings === 'function' && (
                        <button
                            type="button"
                            className="titlebar-iconbtn"
                            style={styles.iconBtn}
                            onClick={onSettings}
                            aria-label="Open settings"
                        >
                            <i className="fa-solid fa-gear" style={styles.settingsIcon} aria-hidden="true" />
                        </button>
                    )}
                    <button
                        type="button"
                        className="titlebar-iconbtn"
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
