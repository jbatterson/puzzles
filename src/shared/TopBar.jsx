import React from 'react'

const styles = {
    bar: {
        width: '100%',
        height: '57px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 0 8px 0',
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
        gap: '6px',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
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
    title: {
        margin: 0,
        paddingTop: 0,
        paddingLeft: '5px',
        fontSize: '26px',
        display: 'inline-block',
        color: 'inherit',
        letterSpacing: 0,
        fontWeight: 600,
        textTransform: 'none',
        whiteSpace: 'nowrap',
        lineHeight: 1,
    },
}

export default function TopBar({ title, onHome, onCube, onStats, onHelp, showStats = false }) {
    const barStyle = {
        ...styles.bar,
        position: 'relative',
        left: '50%',
        width: '100vw',
        transform: 'translateX(-50%)',
    }

    return (
        <div style={barStyle}>
            <div style={styles.content}>
                <div style={styles.left}>
                    <button type="button" style={styles.iconBtn} onClick={onHome} aria-label="Home">
                        <i className="fa-solid fa-house fa-sm" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        style={styles.cubeBtn}
                        onClick={onCube}
                        aria-label="Open links"
                    >
                        <img
                            style={styles.cubeImg}
                            src="https://beastacademy.com/u/AllTen/cube.svg"
                            alt=""
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div style={styles.titleWrap} aria-label={title}>
                    <div style={styles.logoContainer} aria-hidden="true">
                        <img
                            style={styles.logo}
                            src="https://beastacademy.com/u/AllTen/beastacademy-logo.svg"
                            alt=""
                            loading="eager"
                        />
                    </div>
                    <h1 style={styles.title}>{title}</h1>
                </div>

                <div style={styles.right}>
                    {showStats && (
                        <button type="button" style={styles.iconBtn} onClick={onStats} aria-label="Stats">
                            <i className="fas fa-chart-column" aria-hidden="true" />
                        </button>
                    )}
                    <button type="button" style={styles.iconBtn} onClick={onHelp} aria-label="Help">
                        <i className="fas fa-question" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    )
}
