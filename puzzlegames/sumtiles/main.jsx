import React from 'react'
import ReactDOM from 'react-dom/client'
import GameErrorBoundary from '../../src/shared/GameErrorBoundary.jsx'
import SumTiles from './sumtiles.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <GameErrorBoundary>
        <SumTiles />
    </GameErrorBoundary>
)
