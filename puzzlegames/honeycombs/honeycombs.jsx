import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react'
import { getDailyHoneycombsPuzzles } from './puzzles.js'
import { createHoneycombsEngine } from './honeycombsEngine.js'
import TopBar from '../../src/shared/TopBar.jsx'
import DiceFace from '../../src/shared/DiceFace.jsx'
import SharedModalShell from '../../src/shared/SharedModalShell.jsx'
import SimpleGameStatsModal from '../../src/shared/SimpleGameStatsModal.jsx'
import SuiteGameCompletionModal from '../../src/shared/SuiteGameCompletionModal.jsx'
import AllTenLinksModal from '../../src/shared/AllTenLinksModal.jsx'
import useInstructionsGate from '../../src/shared/useInstructionsGate.js'
import { MODAL_INTENTS } from '../../shared-contracts/modalIntents.js'
import { GAME_KEYS, getGameChrome } from '../../shared-contracts/gameChrome.js'
import { PUZZLE_SUITE_INK, PUZZLE_SUITE_SURFACE_INCOMPLETE } from '../../shared-contracts/chromeUi.js'
import { parseHubDailyPuzzleParam } from '../../shared-contracts/hubEntry.js'
import HoneycombsIcon from '../../src/shared/icons/HoneycombsIcon.jsx'
import './honeycombs.css'

function getDateLabel() {
  const now = new Date()
  const pst = new Date(now.getTime() - 8 * 60 * 60 * 1000)
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(pst)
}

function storageKey(dateKey, idx) {
  return `honeycombs:${dateKey}:${idx}`
}

function loadCompletions(dateKey) {
  return [0, 1, 2].map((i) => ['1', '2'].includes(localStorage.getItem(storageKey(dateKey, i))))
}

function loadPerfects(dateKey) {
  return [0, 1, 2].map((i) => localStorage.getItem(storageKey(dateKey, i)) === '2')
}

function PuzzleBoxes({ current, completions, perfects, onChange }) {
  return (
    <div id="puzzle-boxes" style={{ display: 'flex', gap: '6px' }}>
      {[0, 1, 2].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: completions[i]
              ? '#22c55e'
              : current === i
                ? PUZZLE_SUITE_INK
                : PUZZLE_SUITE_SURFACE_INCOMPLETE,
            color: completions[i] || current === i ? '#fff' : PUZZLE_SUITE_INK,
            fontWeight: 900,
            fontSize: '1.06rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {completions[i] ? (perfects[i] ? '★' : '✓') : <DiceFace count={i + 1} size={20} />}
        </button>
      ))}
    </div>
  )
}

export default function HoneycombsApp() {
  const chrome = getGameChrome(GAME_KEYS.HONEYCOMBS)
  const daily = useMemo(() => getDailyHoneycombsPuzzles(), [])
  const dateLabel = useMemo(() => getDateLabel(), [])
  const baseRaw = import.meta.env.BASE_URL || '/'
  const base = baseRaw.endsWith('/') ? baseRaw : `${baseRaw}/`

  const [dailyIdx, setDailyIdx] = useState(() => parseHubDailyPuzzleParam())
  const [completions, setCompletions] = useState(() => loadCompletions(daily.dateKey))
  const [perfects, setPerfects] = useState(() => loadPerfects(daily.dateKey))
  const [showLinks, setShowLinks] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)

  const {
    showInstructions,
    setShowInstructions,
    closeInstructions,
  } = useInstructionsGate('honeycombs:hasSeenInstructions', {
    openOnMount: true,
    completionStoragePrefix: 'honeycombs',
  })

  const boardMountRef = useRef(null)
  const engineRef = useRef(null)
  const modalsOpenRef = useRef(false)
  modalsOpenRef.current = showInstructions || showStats || showLinks
  const pendingSuiteModalRef = useRef(false)
  const allDailyDoneCompletionRef = useRef(null)

  const bumpCompletions = useCallback(() => {
    setCompletions(loadCompletions(daily.dateKey))
    setPerfects(loadPerfects(daily.dateKey))
  }, [daily.dateKey])

  const onRequestNext = useCallback(() => {
    setDailyIdx((i) => Math.min(2, i + 1))
  }, [])

  const handleWinAnimationComplete = useCallback(
    (puzzleIdx) => {
      if (!pendingSuiteModalRef.current) return
      if (puzzleIdx !== dailyIdx) return
      pendingSuiteModalRef.current = false
      setShowCompletionModal(true)
    },
    [dailyIdx],
  )

  // Track when all three daily Honeycombs are completed; defer actual modal
  // opening until the engine signals that the win animation has finished.
  useLayoutEffect(() => {
    const done = completions.every(Boolean)
    if (allDailyDoneCompletionRef.current === null) {
      allDailyDoneCompletionRef.current = done
      return
    }
    if (done && !allDailyDoneCompletionRef.current) {
      pendingSuiteModalRef.current = true
    }
    allDailyDoneCompletionRef.current = done
  }, [completions])

  useLayoutEffect(() => {
    const mount = boardMountRef.current
    if (!mount) return
    const engine = createHoneycombsEngine({
      mount,
      puzzles: daily.puzzles,
      dateKey: daily.dateKey,
      hubBaseHref: base,
      onRequestNextPuzzle: onRequestNext,
      onCompletionsUpdated: bumpCompletions,
      isBlockingModalOpen: () => modalsOpenRef.current,
      onWinAnimationComplete: handleWinAnimationComplete,
    })
    engineRef.current = engine
    return () => {
      engine.destroy()
      engineRef.current = null
    }
  }, [daily.puzzles, daily.dateKey, base, onRequestNext, bumpCompletions, handleWinAnimationComplete])

  useLayoutEffect(() => {
    engineRef.current?.initPuzzle(dailyIdx)
  }, [dailyIdx])

  return (
    <div className="game-container">
      <TopBar
        title={chrome.title}
        showStats={chrome.showStats}
        onHome={() => { window.location.href = base }}
        onHelp={() => setShowInstructions(true)}
        onCube={() => setShowLinks(true)}
        onStats={() => setShowStats(true)}
      />

      <div className="level-nav">
        <div className="left-spacer" />
        <div className="selector-group" style={{ flexDirection: 'column', gap: '4px' }}>
          <div className="level-label" style={{ textAlign: 'center' }}>
            <span className="sub">{dateLabel}</span>
          </div>
          <PuzzleBoxes
            current={dailyIdx}
            completions={completions}
            perfects={perfects}
            onChange={setDailyIdx}
          />
        </div>
        <div className="stats-group" />
      </div>

      <div ref={boardMountRef} className="honeycombs-board-mount">
        <div id="play-area">
          <div id="grid-shell">
            <div id="grid-container">
              <svg id="hex-grid" />
            </div>
          </div>
        </div>
        <div id="keyboard" />
      </div>

      <SharedModalShell
        show={showInstructions}
        onClose={closeInstructions}
        intent={MODAL_INTENTS.INSTRUCTIONS}
      >
        <h1 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>Honeycombs</h1>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <HoneycombsIcon size={80} />
          </div>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
            Fill the honeycomb so the numbered hexagons form one connected path that visits every hexagon
            in the honeycomb. Orange hexagons are fixed clues on the path.
          </p>
        </div>
        <button type="button" className="btn-primary" style={{ marginTop: '1.25rem', width: '100%' }} onClick={closeInstructions}>
          Play
        </button>
      </SharedModalShell>

      <AllTenLinksModal show={showLinks} onClose={() => setShowLinks(false)} />
      <SimpleGameStatsModal
        show={showStats}
        onClose={() => setShowStats(false)}
        gameKey={GAME_KEYS.HONEYCOMBS}
      />

      <SuiteGameCompletionModal
        show={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        gameKey={GAME_KEYS.HONEYCOMBS}
        dateKey={daily.dateKey}
      />
    </div>
  )
}
