import React from 'react'
import ReactDOM from 'react-dom/client'
import GameErrorBoundary from '../../src/shared/GameErrorBoundary.jsx'
import App from './folds.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <GameErrorBoundary>
        <App />
    </GameErrorBoundary>
)