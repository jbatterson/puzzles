import React from 'react'
import { createRoot } from 'react-dom/client'

import AppState from './runtime/src/state/AppState'
import { createProblemForDate } from './runtime/src/util/ProblemUtil'
import MainContainer from './runtime/src/view/Main'

import TopBar from '../shared/TopBar.jsx'
import '../shared/style.css'
import { computePropsFromQueryString } from './queryProps.js'

function recalculateHeight() {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
}

window.addEventListener('resize', recalculateHeight)
recalculateHeight()

const container = document.getElementById('container')
if (!container) {
  throw new Error('Missing #container')
}

try {
  const props = computePropsFromQueryString(window.location.search)
  const problemDate = new Date()
  const appState = new AppState(createProblemForDate(problemDate, props), problemDate)
  appState.loadFromStorage()
  appState.ensureSolveTimerStarted()

  const root = createRoot(container)
  root.render(
    <React.Fragment>
      <div style={{ flexShrink: 0, width: '100%' }}>
        <TopBar
          title="All Ten"
          showStats
          onHome={() => {
            window.location.href = import.meta.env.BASE_URL
          }}
          onCube={() => appState.showLinks(true)}
          onStats={() => appState.showStats(true)}
          onHelp={() => appState.showHelp(true)}
          linksViaTitleOnly
        />
      </div>
      <MainContainer appState={appState} hideNativeTitleBar />
    </React.Fragment>,
  )
} catch (ex) {
  console.log(ex)
  container.innerText = `Failed to initialize. ${String(ex)}`
}
