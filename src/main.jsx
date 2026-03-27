import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './home.jsx'

class RootErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { error: null }
    }

    static getDerivedStateFromError(error) {
        return { error }
    }

    componentDidCatch(error, info) {
        console.error('Hub render error:', error, info?.componentStack)
    }

    render() {
        if (this.state.error) {
            return (
                <div style={{
                    fontFamily: 'system-ui, sans-serif',
                    padding: '24px',
                    maxWidth: '520px',
                    margin: '40px auto',
                }}>
                    <h1 style={{ fontSize: '1.1rem' }}>Something went wrong loading the hub</h1>
                    <pre style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        background: '#f4f4f5',
                        padding: '12px',
                        borderRadius: '8px',
                        fontSize: '13px',
                    }}>{String(this.state.error)}</pre>
                    <p style={{ fontSize: '14px', color: '#52525b' }}>
                        Try a hard refresh (Ctrl+Shift+R) or another browser. If this persists, check the browser console for details.
                    </p>
                </div>
            )
        }
        return this.props.children
    }
}

const rootEl = document.getElementById('root')
if (rootEl) {
    ReactDOM.createRoot(rootEl).render(
        <RootErrorBoundary>
            <Home />
        </RootErrorBoundary>,
    )
}
