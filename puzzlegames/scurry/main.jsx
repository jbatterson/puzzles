import React from 'react'
import ReactDOM from 'react-dom/client'
import GameErrorBoundary from '../../src/shared/GameErrorBoundary.jsx'
import Scurry from './scurry.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GameErrorBoundary>
    <Scurry />
  </GameErrorBoundary>
)
