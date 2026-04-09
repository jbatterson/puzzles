import React from 'react'
import ReactDOM from 'react-dom/client'
import GameErrorBoundary from '../../src/shared/GameErrorBoundary.jsx'
import BugPuzzle from './scurry.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <GameErrorBoundary>
        <BugPuzzle />
    </GameErrorBoundary>
)
