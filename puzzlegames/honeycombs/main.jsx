import React from 'react'
import ReactDOM from 'react-dom/client'
import GameErrorBoundary from '../../src/shared/GameErrorBoundary.jsx'
import HoneycombsApp from './honeycombs.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <GameErrorBoundary>
        <HoneycombsApp />
    </GameErrorBoundary>
)
