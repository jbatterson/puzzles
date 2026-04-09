import React from 'react'

/**
 * Error boundary for individual game pages. Catches errors thrown during React's
 * render phase (and lifecycle methods) and shows a recovery UI instead of a blank screen.
 * Wrap the root component in each game's main.jsx entry point.
 */
export default class GameErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { error: null }
    }

    static getDerivedStateFromError(error) {
        return { error }
    }

    componentDidCatch(error, info) {
        console.error('[GameErrorBoundary]', error, info?.componentStack)
    }

    render() {
        if (this.state.error) {
            return (
                <div style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    padding: '32px 24px',
                    maxWidth: '480px',
                    margin: '48px auto',
                    textAlign: 'center',
                }}>
                    <p style={{ fontSize: '2rem', margin: '0 0 12px' }}>⚠️</p>
                    <h1 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px' }}>
                        Something went wrong
                    </h1>
                    <p style={{ fontSize: '14px', color: '#52525b', margin: '0 0 24px' }}>
                        The game ran into an unexpected error.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '10px 20px',
                                background: '#1a3d5b',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 700,
                                cursor: 'pointer',
                            }}
                        >
                            Reload
                        </button>
                        <a
                            href="../../"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '10px 20px',
                                fontSize: '14px',
                                color: '#1a3d5b',
                                textDecoration: 'none',
                                border: '1px solid #1a3d5b',
                                borderRadius: '8px',
                            }}
                        >
                            Back to hub
                        </a>
                    </div>
                    <details style={{ marginTop: '28px', textAlign: 'left' }}>
                        <summary style={{ fontSize: '12px', color: '#71717a', cursor: 'pointer' }}>
                            Error details
                        </summary>
                        <pre style={{
                            marginTop: '8px',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            background: '#f4f4f5',
                            padding: '12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            color: '#3f3f46',
                        }}>
                            {String(this.state.error)}
                        </pre>
                    </details>
                </div>
            )
        }
        return this.props.children
    }
}
