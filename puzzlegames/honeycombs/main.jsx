import React from 'react'
import ReactDOM from 'react-dom/client'
import GameErrorBoundary from '../../src/shared/GameErrorBoundary.jsx'
import Honeycombs from './honeycombs.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GameErrorBoundary>
    <Honeycombs />
  </GameErrorBoundary>
)
