import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import puzzles from './puzzles.js'
import TopBar from '../../src/shared/TopBar.jsx'
import DiceFace from '../../src/shared/DiceFace.jsx'

// ── Daily puzzle selection ───────────────────────────────────────────────────

function getDailyKey() {
    const now = new Date()
    const pst = new Date(now.getTime() - 8 * 60 * 60 * 1000)
    return `${pst.getUTCFullYear()}-${String(pst.getUTCMonth() + 1).padStart(2, '0')}-${String(pst.getUTCDate()).padStart(2, '0')}`
}

function getDateLabel() {
    const now = new Date()
    const pst = new Date(now.getTime() - 8 * 60 * 60 * 1000)
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(pst)
}

function getDayIndex(key) {
    const [y, m, d] = key.split('-').map(Number)
    const date = new Date(Date.UTC(y, m - 1, d))
    const epoch = new Date(Date.UTC(2020, 0, 1))
    return Math.floor((date - epoch) / 86400000)
}

const DIFFS = ['easy', 'medium', 'hard']

function getDailyPuzzle(difficulty) {
    const key = getDailyKey()
    const dayIndex = getDayIndex(key)

    // Pools:
    // - easy/medium: first 240, staggered by 120
    // - hard: remaining (240+)
    const EASY_LEN_RAW = 240
    const MED_OFFSET = 120
    const EASY_LEN = Math.min(EASY_LEN_RAW, puzzles.length)
    const HARD_START = Math.min(EASY_LEN_RAW, puzzles.length)
    const HARD_LEN = Math.max(0, puzzles.length - HARD_START)

    let idx = 0
    if (difficulty === 'easy') {
        idx = EASY_LEN > 0 ? (dayIndex % EASY_LEN) : 0
    } else if (difficulty === 'medium') {
        idx = EASY_LEN > 0 ? ((dayIndex + MED_OFFSET) % EASY_LEN) : 0
    } else {
        idx = HARD_LEN > 0 ? (HARD_START + (dayIndex % HARD_LEN)) : (EASY_LEN > 0 ? (dayIndex % EASY_LEN) : 0)
    }

    return { puzzle: puzzles[idx], key, idx }
}

// ── Completion tracking ──────────────────────────────────────────────────────
// bestAttempts: 1..99 (number of CHECKs used to complete). Legacy: failed, 1..5.

function storageKeyBestAttempts(dateKey, difficulty) {
    return `clueless:${dateKey}:${difficulty}:bestAttempts`
}

function storageKeyLegacyBestAttempts(dateKey) {
    return `clueless:${dateKey}:bestAttempts`
}

function loadBestAttempts(dateKey, difficulty) {
    const v = localStorage.getItem(storageKeyBestAttempts(dateKey, difficulty))
    if (v != null) {
        const n = parseInt(v, 10)
        if (n >= 1 && n <= 99) return n
    }

    // Legacy (pre-difficulty) keys: treat as MEDIUM.
    if (difficulty === 'medium') {
        const legacyV = localStorage.getItem(storageKeyLegacyBestAttempts(dateKey))
        if (legacyV != null) {
            const n = parseInt(legacyV, 10)
            if (n >= 1 && n <= 99) return n
        }
    }

    // Migrate very old schema: '2' = perfect (1 attempt), '1' = completed (treat as 2 attempts)
    const legacy = localStorage.getItem(`clueless:${dateKey}`)
    if (legacy === '2') return 1
    if (legacy === '1') return 2
    return null
}

function loadFailed(dateKey) {
    return localStorage.getItem(`clueless:${dateKey}:failed`) === '1'
}

function markComplete(dateKey, difficulty, attemptsUsed) {
    const existing = loadBestAttempts(dateKey, difficulty)
    if (existing != null && attemptsUsed >= existing) return
    const value = Math.min(Math.max(1, attemptsUsed), 99)
    localStorage.setItem(storageKeyBestAttempts(dateKey, difficulty), String(value))
}

// ── Game state persist/restore ──────────────────────────────────────────────

function storageKeyGameState(dateKey, difficulty) {
    return `clueless:${dateKey}:${difficulty}:gameState`
}

function storageKeyLegacyGameState(dateKey) {
    return `clueless:${dateKey}:gameState`
}

function loadGameState(dateKey, difficulty, validCellKeys) {
    try {
        const raw = localStorage.getItem(storageKeyGameState(dateKey, difficulty))
            || (difficulty === 'medium' ? localStorage.getItem(storageKeyLegacyGameState(dateKey)) : null)
        if (!raw) return null
        const data = JSON.parse(raw)
        if (!data || typeof data.guesses !== 'object' || !Array.isArray(data.locked) ||
            typeof data.guessCount !== 'number' || typeof data.solved !== 'boolean') return null
        if (data.guessCount < 0) return null
        for (const k of data.locked) {
            if (!validCellKeys.has(k)) return null
        }
        // Optional: letters tried (wrong) per cell for keyboard highlighting
        let triedLettersByCell = {}
        if (data.triedLettersByCell != null && typeof data.triedLettersByCell === 'object') {
            for (const [cellKey, arr] of Object.entries(data.triedLettersByCell)) {
                if (Array.isArray(arr) && arr.every(c => typeof c === 'string' && c.length === 1)) {
                    triedLettersByCell[cellKey] = arr
                }
            }
        }
        return { ...data, triedLettersByCell }
    } catch {
        return null
    }
}

function saveGameState(dateKey, difficulty, state) {
    try {
        const payload = {
            guesses: state.guesses,
            locked: [...state.locked],
            guessCount: state.guessCount,
            solved: state.solved,
            triedLettersByCell: state.triedLettersByCell || {},
        }
        localStorage.setItem(storageKeyGameState(dateKey, difficulty), JSON.stringify(payload))
    } catch {
        // ignore
    }
}

// ── Grid geometry ────────────────────────────────────────────────────────────
// 5×5 grid. Corners of every 2-cell interval are INPUT cells (9 total).
// Odd-row or odd-col cells (not blocked) are CLUE cells (12 total).
// (1,1), (1,3), (3,1), (3,3) are BLOCKED (4 total).

const BLOCKED = new Set(['1,1', '1,3', '3,1', '3,3'])

const ALL_PLAYABLE_KEYS = new Set()

for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
        const key = `${r},${c}`
        if (BLOCKED.has(key)) continue
        ALL_PLAYABLE_KEYS.add(key)
    }
}

// ── Extract clue/answer letters from a puzzle object ────────────────────────

function getPuzzleData(p, difficulty) {
    const clues = {}
    const answers = {}

    // Horizontal words fill rows 0, 2, 4
    const hWords = [p.h1, p.h2, p.h3]
    const vWords = [p.v1, p.v2, p.v3]

    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const key = `${r},${c}`
            if (BLOCKED.has(key)) continue

            let letter = null
            if (r % 2 === 0) {
                const w = hWords[r / 2]
                letter = w[c]
            }
            if (c % 2 === 0) {
                const w = vWords[c / 2]
                const vLetter = w[r]
                if (letter == null) letter = vLetter
            }

            // Medium/Hard: clues at positions 2 and 4 (indices 1 and 3), inputs at 1/3/5 (indices 0/2/4).
            // Easy: only the middle letter (position 3 / index 2) is an input; everything else is a clue.
            let isClue = true
            if (difficulty === 'easy') {
                const isAcrossMiddle = (r % 2 === 0) && (c === 2)
                const isDownMiddle = (c % 2 === 0) && (r === 2)
                isClue = !(isAcrossMiddle || isDownMiddle)
            } else {
                // Determine clue vs input based on index parity within the word.
                // For row words (r even) index is c; for col words (c even) index is r.
                const indexParity = (r % 2 === 0) ? (c % 2) : (r % 2)
                isClue = (indexParity === 1)
            }
            // Medium bonus hints: give the top-left and bottom-right corner letters.
            if (difficulty === 'medium' && (key === '0,0' || key === '4,4')) isClue = true
            if (isClue) clues[key] = letter
            else answers[key] = letter
        }
    }

    return { clues, answers }
}

// ── Keyboard rows ────────────────────────────────────────────────────────────

const KB_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']

// ── Main component ───────────────────────────────────────────────────────────

export default function CluelessGame() {
    // #region agent log
    fetch('http://127.0.0.1:7789/ingest/c63c0e1a-4721-4866-a60f-d01a6afe7afe',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b390e2'},body:JSON.stringify({sessionId:'b390e2',runId:'pre-fix',hypothesisId:'H1',location:'clueless.jsx:CluelessGame(entry)',message:'CluelessGame render entry',data:{},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const [difficultyIdx, setDifficultyIdx] = useState(0)
    const difficulty = DIFFS[difficultyIdx] || 'easy'

    const daily = useMemo(() => getDailyPuzzle(difficulty), [difficulty])
    const dateLabel = useMemo(() => getDateLabel(), [])
    const { clues, answers } = useMemo(() => getPuzzleData(daily.puzzle, difficulty), [daily, difficulty])

    const usedHintRef = useRef(false)

    const geometry = useMemo(() => {
        const clueCells = new Set()
        const inputOrder = []
        
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                const key = `${r},${c}`
                if (BLOCKED.has(key)) continue
                let isClue = true
                if (difficulty === 'easy') {
                    const isAcrossMiddle = (r % 2 === 0) && (c === 2)
                    const isDownMiddle = (c % 2 === 0) && (r === 2)
                    isClue = !(isAcrossMiddle || isDownMiddle)
                } else {
                    const indexParity = (r % 2 === 0) ? (c % 2) : (r % 2)
                    isClue = (indexParity === 1)
                }
                // Medium bonus hints: give the top-left and bottom-right corner letters.
                if (difficulty === 'medium' && (key === '0,0' || key === '4,4')) isClue = true
                if (isClue) clueCells.add(key)
                else inputOrder.push({ r, c })
            }
        }
        return { clueCells, inputOrder }
    }, [difficulty])

    // Puzzle state (loaded per difficulty via effect below)
    const [guesses, setGuesses] = useState({})
    const [locked, setLocked] = useState(new Set())
    const [wrongCells, setWrongCells] = useState(new Set())
    const [triedLettersByCell, setTriedLettersByCell] = useState({})
    const [selected, setSelected] = useState(0)
    const [guessCount, setGuessCount] = useState(0)
    const [solved, setSolved] = useState(false)
    const [statusMsg, setStatusMsg] = useState('')
    const [selectionHighlighted, setSelectionHighlighted] = useState(true)
    const [bestAttempts, setBestAttempts] = useState(null)

    const attemptsByDiff = useMemo(() => {
        const arr = DIFFS.map(d => (d === difficulty ? bestAttempts : loadBestAttempts(daily.key, d)))
        // #region agent log
        fetch('http://127.0.0.1:7789/ingest/c63c0e1a-4721-4866-a60f-d01a6afe7afe',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b390e2'},body:JSON.stringify({sessionId:'b390e2',runId:'pre-fix',hypothesisId:'H1',location:'clueless.jsx:attemptsByDiff',message:'Computed attemptsByDiff',data:{difficulty,dailyKey:daily.key,bestAttempts,attemptsByDiff:arr},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        return arr
    }, [daily.key, difficulty, bestAttempts])

    // Load/restore state whenever difficulty changes
    useEffect(() => {
        // #region agent log
        fetch('http://127.0.0.1:7789/ingest/c63c0e1a-4721-4866-a60f-d01a6afe7afe',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b390e2'},body:JSON.stringify({sessionId:'b390e2',runId:'pre-fix',hypothesisId:'H2',location:'clueless.jsx:loadEffect',message:'Loading/restoring state for difficulty',data:{difficulty,dailyKey:daily.key,inputCount:geometry.inputOrder.length},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        const saved = loadGameState(daily.key, difficulty, ALL_PLAYABLE_KEYS)
        const best = loadBestAttempts(daily.key, difficulty)

        if (saved) {
            setGuesses(saved.guesses || {})
            setLocked(new Set(saved.locked || []))
            setGuessCount(typeof saved.guessCount === 'number' ? saved.guessCount : 0)
            setSolved(!!saved.solved)
            setTriedLettersByCell(saved.triedLettersByCell || {})
            setBestAttempts(best)
        } else if (best != null) {
            const revealed = {}
            for (const { r, c } of geometry.inputOrder) revealed[`${r},${c}`] = answers[`${r},${c}`]
            setGuesses(revealed)
            setLocked(new Set(geometry.inputOrder.map(({ r, c }) => `${r},${c}`)))
            setGuessCount(best)
            setSolved(true)
            setTriedLettersByCell({})
            setBestAttempts(best)
        } else {
            setGuesses({})
            setLocked(new Set())
            setGuessCount(0)
            setSolved(false)
            setTriedLettersByCell({})
            setBestAttempts(null)
        }

        setWrongCells(new Set())
        setSelected(0)
        setSelectionHighlighted(true)
        setStatusMsg('')
    }, [daily.key, difficulty, geometry.inputOrder, answers])

    // Persist game state when it changes
    useEffect(() => {
        saveGameState(daily.key, difficulty, {
            guesses,
            locked,
            guessCount,
            solved,
            triedLettersByCell,
        })
    }, [daily.key, difficulty, guesses, locked, guessCount, solved, triedLettersByCell])

    // UI
    const [showInstructions, setShowInstructions] = useState(
        () => localStorage.getItem('clueless:hasSeenInstructions') !== '1'
    )

    const closeInstructions = useCallback(() => {
        localStorage.setItem('clueless:hasSeenInstructions', '1')
        setShowInstructions(false)
    }, [])

    // ── Input handling ─────────────────────────────────────────────────────

    const advanceSelection = useCallback((fromIdx) => {
        let next = fromIdx + 1
        while (next < geometry.inputOrder.length) {
            const { r, c } = geometry.inputOrder[next]
            if (!locked.has(`${r},${c}`)) { setSelected(next); return }
            next++
        }
        // wrap to first unlocked
        for (let i = 0; i < geometry.inputOrder.length; i++) {
            const { r, c } = geometry.inputOrder[i]
            if (!locked.has(`${r},${c}`)) { setSelected(i); return }
        }
    }, [geometry.inputOrder, locked])

    const handleKey = useCallback((key) => {
        if (solved) return

        if (key === 'Backspace') {
            const pos = geometry.inputOrder[selected]
            const k = `${pos.r},${pos.c}`
            if (locked.has(k)) return
            if (guesses[k]) {
                setGuesses(prev => { const g = { ...prev }; delete g[k]; return g })
                setWrongCells(prev => { const s = new Set(prev); s.delete(k); return s })
            } else if (selected > 0) {
                let prev = selected - 1
                while (prev >= 0 && locked.has(`${geometry.inputOrder[prev].r},${geometry.inputOrder[prev].c}`)) prev--
                if (prev >= 0) {
                    setSelected(prev)
                    const pk = `${geometry.inputOrder[prev].r},${geometry.inputOrder[prev].c}`
                    setGuesses(g => { const ng = { ...g }; delete ng[pk]; return ng })
                    setWrongCells(s => { const ns = new Set(s); ns.delete(pk); return ns })
                }
            }
            return
        }

        if (/^[a-zA-Z]$/.test(key)) {
            const pos = geometry.inputOrder[selected]
            const k = `${pos.r},${pos.c}`
            if (locked.has(k)) return
            const letter = key.toLowerCase()
            const triedInCell = triedLettersByCell[k] || []
            const isKnownWrong = triedInCell.includes(letter)
            setGuesses(prev => ({ ...prev, [k]: letter }))
            setWrongCells(prev => {
                const s = new Set(prev)
                if (isKnownWrong) s.add(k)
                else s.delete(k)
                return s
            })
            advanceSelection(selected)
        }
    }, [solved, geometry.inputOrder, selected, guesses, locked, advanceSelection, triedLettersByCell])

    // Physical keyboard
    useEffect(() => {
        if (showInstructions) return
        const handler = (e) => {
            if (e.key === 'Backspace') { e.preventDefault(); handleKey('Backspace') }
            else if (e.key === 'Enter') { e.preventDefault(); checkAnswer() }
            else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key)
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [showInstructions, handleKey])  // checkAnswer added via ref below

    // ── Check answer ───────────────────────────────────────────────────────

    // Use a ref so the keydown handler always has the latest version
    const checkAnswerRef = useRef(null)

    const checkAnswer = useCallback(() => {
        if (solved) return

        const newCorrect = []
        const newWrong = []
        let allFilled = true

        for (const { r, c } of geometry.inputOrder) {
            const k = `${r},${c}`
            if (locked.has(k)) continue
            const guess = guesses[k]
            const answer = answers[k]
            if (!guess) { allFilled = false; break }
            if (guess === answer) newCorrect.push(k)
            else newWrong.push(k)
        }

        if (!allFilled) {
            setStatusMsg('Fill all cells first')
            return
        }

        const nextGuessCount = guessCount + 1
        setGuessCount(nextGuessCount)

        const newLocked = new Set([...locked, ...newCorrect])
        setLocked(newLocked)
        setWrongCells(new Set(newWrong))

        if (newWrong.length === 0) {
            // All correct!
            const attemptsUsed = Math.min(nextGuessCount, 99)
            markComplete(daily.key, difficulty, attemptsUsed)
            setBestAttempts(prev => (prev != null && prev <= attemptsUsed ? prev : attemptsUsed))
            setSolved(true)
            setStatusMsg('')
        } else {
            setStatusMsg('Not quite — try again')
            // Record wrong letters per cell for keyboard highlighting
            setTriedLettersByCell(prev => {
                const next = { ...prev }
                for (const k of newWrong) {
                    const letter = guesses[k]
                    if (letter) {
                        const arr = next[k] ? [...next[k]] : []
                        if (!arr.includes(letter)) arr.push(letter)
                        next[k] = arr
                    }
                }
                return next
            })
            // Move selection to first wrong cell
            const firstWrongIdx = geometry.inputOrder.findIndex(({ r, c }) => newWrong.includes(`${r},${c}`))
            if (firstWrongIdx >= 0) setSelected(firstWrongIdx)
        }
    }, [solved, geometry.inputOrder, guessCount, guesses, locked, answers, daily.key, difficulty])

    checkAnswerRef.current = checkAnswer

    // ── Cell click ─────────────────────────────────────────────────────────

    const selectCell = useCallback((idx) => {
        if (solved) return
        const { r, c } = geometry.inputOrder[idx]
        if (locked.has(`${r},${c}`)) return
        setSelectionHighlighted(true)
        setSelected(idx)
    }, [solved, geometry.inputOrder, locked])

    // ── Render helpers ─────────────────────────────────────────────────────

    const allFilled = geometry.inputOrder.every(({ r, c }) => {
        const k = `${r},${c}`
        return locked.has(k) || !!guesses[k]
    })

    const base = import.meta.env.BASE_URL

    // Letters already tried (wrong) in the selected cell, for keyboard highlighting
    const selectedKey = !solved && selected >= 0 && selected < geometry.inputOrder.length
        ? `${geometry.inputOrder[selected].r},${geometry.inputOrder[selected].c}`
        : null
    const triedInSelected = selectedKey ? (triedLettersByCell[selectedKey] || []) : []

    // ── Grid cells ─────────────────────────────────────────────────────────

    const cells = []
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const key = `${r},${c}`

            if (BLOCKED.has(key)) {
                cells.push(
                    <div key={key} style={{
                        background: '#000',
                        border: '1px solid #000',
                    }} />
                )
                continue
            }

            if (geometry.clueCells.has(key)) {
                cells.push(
                    <div key={key} style={{
                        border: '1px solid #000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f5f5f5',
                        fontWeight: 900,
                        fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                        textTransform: 'uppercase',
                    }}>
                        {clues[key] || ''}
                    </div>
                )
                continue
            }

            // Input cell
            const idx = geometry.inputOrder.findIndex(p => p.r === r && p.c === c)
            const isSelected = idx === selected && !solved
            const isLocked = locked.has(key)
            const isWrong = wrongCells.has(key)
            const letter = guesses[key] || ''

            let bg = '#fff'
            let color = '#000'
            if (isLocked) { bg = '#c6f6d5'; color = '#15803d' }
            else if (isWrong) { bg = '#fed7d7'; color = '#b91c1c' }

            const showActiveOutline = isSelected && selectionHighlighted

            cells.push(
                <div key={key}
                    onClick={() => selectCell(idx)}
                    style={{
                        border: '1px solid #000',
                        outline: showActiveOutline ? '4px solid #6366f1' : 'none',
                        outlineOffset: showActiveOutline ? '-4px' : undefined,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: bg,
                        color,
                        fontWeight: 900,
                        fontSize: 'clamp(1.2rem, 5vw, 2rem)',
                        textTransform: 'uppercase',
                        cursor: solved ? 'default' : 'pointer',
                        transition: 'background 0.15s',
                        userSelect: 'none',
                    }}
                >
                    {letter}
                </div>
            )
        }
    }

    // ── Render ─────────────────────────────────────────────────────────────

    return (
        <div className="game-container clueless">
            <TopBar title="Clueless" onHelp={() => setShowInstructions(true)} />

            {/* INFO BAR */}
            <div className="level-nav">
                <div className="left-spacer">
                    {/* (badge removed) */}
                </div>
                <div className="selector-group" style={{ flexDirection: 'column', gap: '4px' }}>
                    <div className="level-label" style={{ textAlign: 'center' }}>
                        <span className="sub">{dateLabel}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {['Easy', 'Med', 'Hard'].map((label, i) => {
                            const isActive = i === difficultyIdx
                            const a = attemptsByDiff[i]
                            const done = a != null
                            const content = done ? (a === 1 ? '★' : String(Math.min(a, 99))) : <DiceFace count={i + 1} size={20} />
                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => setDifficultyIdx(i)}
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: done ? '#22c55e' : (isActive ? '#000' : '#d1d5db'),
                                        color: '#fff',
                                        fontWeight: 900,
                                        fontSize: '0.94rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s',
                                    }}
                                    aria-label={`Select ${label}`}
                                >
                                    {content}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="stats-group">
                    <span className="stats-label">Guesses</span>
                    <span className="stats-num">{Math.min(guessCount, 99)}</span>
                </div>
            </div>

            {/* STATUS MESSAGE */}
            <div className="clueless-status" style={{
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: solved ? '#15803d' : '#000',
            }}>
                {solved ? 'Solved!' : statusMsg}
            </div>

            {/* GAME BOARD */}
            {/*
              * Size the grid to fit whatever vertical space is left after the
              * fixed chrome (header ~60px, nav ~60px, status ~24px, keyboard
              * ~170px, bottom padding ~32px = ~346px total).  We also cap it
              * at the viewport width so it stays square on wide screens.
              * flex-shrink:0 on the outer div prevents the flex column from
              * squashing the board when the keyboard rows are tall.
              */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '6px 0',
                flexShrink: 0,
            }}>
                <div style={{
                    width: 'min(calc(100vw - 40px), calc(100dvh - 346px), 460px)',
                    aspectRatio: '1 / 1',
                    position: 'relative',
                    background: '#fff',
                    border: '2px solid #000',
                    minWidth: '200px',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gridTemplateRows: 'repeat(5, 1fr)',
                        width: '100%',
                        height: '100%',
                    }}>
                        {cells}
                    </div>
                </div>
            </div>

            {/* KEYBOARD when playing; ALL PUZZLES when solved */}
            <div style={{
                marginTop: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                width: '100%',
                maxWidth: '400px',
                alignSelf: 'center',
                flexShrink: 0,
            }}>
                {solved ? (
                    <a href={base} className="btn-primary"
                        style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        All Puzzles
                    </a>
                ) : (
                <>
                {KB_ROWS.map((row, ri) => (
                    <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                        {ri === 2 && (
                            <button
                                onClick={() => handleKey('Backspace')}
                                style={{
                                    minWidth: 'clamp(36px, 9vw, 52px)',
                                    height: 'clamp(32px, 7vh, 50px)',
                                    border: '2px solid #000',
                                    borderRadius: '4px',
                                    background: '#fff',
                                    fontWeight: 700,
                                    fontSize: 'clamp(0.65rem, 2vw, 0.85rem)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >←</button>
                        )}
                        {[...row].map(ch => {
                            const isTried = triedInSelected.includes(ch.toLowerCase())
                            return (
                                <button
                                    key={ch}
                                    type="button"
                                    disabled={isTried}
                                    onClick={() => { if (!isTried) handleKey(ch) }}
                                    style={{
                                        minWidth: 'clamp(24px, 7vw, 36px)',
                                        height: 'clamp(32px, 7vh, 50px)',
                                        border: '2px solid #000',
                                        borderRadius: '4px',
                                        background: isTried ? '#fed7d7' : '#fff',
                                        color: isTried ? '#b91c1c' : '#000',
                                        fontFamily: 'Outfit, sans-serif',
                                        fontWeight: 700,
                                        fontSize: 'clamp(0.7rem, 2.5vw, 1rem)',
                                        textTransform: 'uppercase',
                                        cursor: isTried ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {ch}
                                </button>
                            )
                        })}
                        {ri === 2 && (() => {
                            const checkActive = allFilled && !solved
                            return (
                                <button
                                    onClick={checkActive ? checkAnswerRef.current : undefined}
                                    disabled={!checkActive}
                                    style={{
                                        minWidth: 'clamp(36px, 9vw, 52px)',
                                        height: 'clamp(32px, 7vh, 50px)',
                                        border: '2px solid #000',
                                        borderRadius: '4px',
                                        background: checkActive ? '#000' : '#ccc',
                                        color: checkActive ? '#fff' : '#666',
                                        fontWeight: 700,
                                        fontSize: 'clamp(0.55rem, 1.8vw, 0.75rem)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        cursor: checkActive ? 'pointer' : 'not-allowed',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >CHECK</button>
                            )
                        })()}
                    </div>
                ))}
                </>
                )}
            </div>

            {/* INSTRUCTIONS OVERLAY */}
            {showInstructions && (
                <div id="instructions-overlay">
                    <div className="modal-content" style={{ position: 'relative' }}>
                        <button onClick={closeInstructions} style={{
                            position: 'absolute', top: '16px', right: '16px',
                            background: 'none', border: 'none',
                            fontSize: '22px', fontWeight: 900, cursor: 'pointer',
                        }}>✕</button>

                        <h1 className="title" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Clueless</h1>

                        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                            Six five-letter words fill the grid — three across and three down.
                        </p>
                        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            Each yellow cell is shared by one across word and one down word. Use <strong>CHECK</strong> to lock in correct letters after each submit. Try to complete in as few checks as possible — your check count is saved when you finish.
                        </p>

                        {/* Mini grid example */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(5, 28px)',
                                gridTemplateRows: 'repeat(5, 28px)',
                                boxShadow: '0 0 0 2px #000',
                                borderRadius: '2px',
                            }}>
                                {Array.from({ length: 25 }, (_, i) => {
                                    const r = Math.floor(i / 5), c = i % 5
                                    const key = `${r},${c}`
                                    let bg = '#f5f5f5', content = '·'
                                    if (BLOCKED.has(key)) { bg = '#000'; content = '' }
                                    else if (r % 2 === 0 && c % 2 === 0) { bg = 'var(--yellow)'; content = '?' }
                                    return (
                                        <div key={key} style={{
                                            border: '1px solid #000',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: bg,
                                            fontSize: '11px', fontWeight: 900,
                                        }}>{content}</div>
                                    )
                                })}
                            </div>
                        </div>

                        <button className="btn-primary" onClick={closeInstructions}>Play</button>
                    </div>
                </div>
            )}
        </div>
    )
}