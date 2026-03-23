import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import puzzles from './puzzles.js'
import TopBar from '../../src/shared/TopBar.jsx'
import DiceFace from '../../src/shared/DiceFace.jsx'
import CluelessIcon from '../../src/shared/icons/CluelessIcon.jsx'

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

/** Red cell when current guess is a letter already ruled wrong for this cell (persists with triedLettersByCell). */
function cellGuessShowsWrong(cellKey, locked, guesses, triedLettersByCell) {
    if (locked.has(cellKey)) return false
    const g = guesses[cellKey]
    if (!g) return false
    return (triedLettersByCell[cellKey] || []).includes(g)
}

function firstUnlockedInputIndex(inputOrder, locked) {
    for (let i = 0; i < inputOrder.length; i++) {
        const { r, c } = inputOrder[i]
        if (!locked.has(`${r},${c}`)) return i
    }
    return -1
}

/** Clue letters outside the active row/column band. */
const CLUELESS_CLUE_FONT = 'clamp(1rem, 4vw, 1.5rem)'
/** Matches input cells; active-band clues use this so they read at the same scale. */
const CLUELESS_INPUT_FONT = 'clamp(1.2rem, 5vw, 2rem)'

/** Next/prev typeable cell index in `inputOrder`, wrapping; +1 forward, -1 back. */
function nextUnlockedNavIndex(inputOrder, locked, fromIdx, delta) {
    const unlocked = []
    for (let i = 0; i < inputOrder.length; i++) {
        const { r, c } = inputOrder[i]
        if (!locked.has(`${r},${c}`)) unlocked.push(i)
    }
    if (unlocked.length === 0) return null
    const pos = unlocked.indexOf(fromIdx)
    if (pos < 0) return unlocked[delta > 0 ? 0 : unlocked.length - 1]
    const nextPos = (pos + delta + unlocked.length) % unlocked.length
    return unlocked[nextPos]
}

const GRID_LINES = [0, 2, 4]

function inputIndicesInRow(inputOrder, r) {
    return inputOrder
        .map((p, i) => ({ ...p, i }))
        .filter(p => p.r === r)
        .sort((a, b) => a.c - b.c)
        .map(p => p.i)
}

function inputIndicesInCol(inputOrder, c) {
    return inputOrder
        .map((p, i) => ({ ...p, i }))
        .filter(p => p.c === c)
        .sort((a, b) => a.r - b.r)
        .map(p => p.i)
}

function nextLineRow(r) {
    const idx = GRID_LINES.indexOf(r)
    const i = idx >= 0 ? idx : 0
    return GRID_LINES[(i + 1) % GRID_LINES.length]
}

function prevLineRow(r) {
    const idx = GRID_LINES.indexOf(r)
    const i = idx >= 0 ? idx : 0
    return GRID_LINES[(i - 1 + GRID_LINES.length) % GRID_LINES.length]
}

function nextLineCol(c) {
    return nextLineRow(c)
}

function prevLineCol(c) {
    return prevLineRow(c)
}

function cellUnlocked(inputOrder, idx, locked) {
    const { r, c } = inputOrder[idx]
    return !locked.has(`${r},${c}`)
}

/** Next unlocked cell: along row/col, then first unlocked of next grid line (0→2→4→0). */
function advanceAlongAxis(fromIdx, axisMode, inputOrder, locked) {
    if (fromIdx < 0 || fromIdx >= inputOrder.length) return fromIdx

    if (axisMode === 'row') {
        const { r } = inputOrder[fromIdx]
        const sameRow = inputIndicesInRow(inputOrder, r).filter(i => cellUnlocked(inputOrder, i, locked))
        const pos = sameRow.indexOf(fromIdx)
        if (pos >= 0 && pos + 1 < sameRow.length) return sameRow[pos + 1]
        if (pos < 0 && sameRow.length > 0) return sameRow[0]

        let lineR = r
        for (let step = 0; step < GRID_LINES.length; step++) {
            lineR = nextLineRow(lineR)
            const chain = inputIndicesInRow(inputOrder, lineR).filter(i => cellUnlocked(inputOrder, i, locked))
            if (chain.length > 0) return chain[0]
        }
        return fromIdx
    }

    const { c } = inputOrder[fromIdx]
    const sameCol = inputIndicesInCol(inputOrder, c).filter(i => cellUnlocked(inputOrder, i, locked))
    const posC = sameCol.indexOf(fromIdx)
    if (posC >= 0 && posC + 1 < sameCol.length) return sameCol[posC + 1]
    if (posC < 0 && sameCol.length > 0) return sameCol[0]

    let lineC = c
    for (let step = 0; step < GRID_LINES.length; step++) {
        lineC = nextLineCol(lineC)
        const chain = inputIndicesInCol(inputOrder, lineC).filter(i => cellUnlocked(inputOrder, i, locked))
        if (chain.length > 0) return chain[0]
    }
    return fromIdx
}

/** Previous unlocked along axis; previous grid line’s last unlocked when at start of line. */
function retreatAlongAxis(fromIdx, axisMode, inputOrder, locked) {
    if (fromIdx < 0 || fromIdx >= inputOrder.length) return null

    if (axisMode === 'row') {
        const { r } = inputOrder[fromIdx]
        const sameRow = inputIndicesInRow(inputOrder, r).filter(i => cellUnlocked(inputOrder, i, locked))
        const pos = sameRow.indexOf(fromIdx)
        if (pos > 0) return sameRow[pos - 1]

        let lineR = r
        for (let step = 0; step < GRID_LINES.length; step++) {
            lineR = prevLineRow(lineR)
            const chain = inputIndicesInRow(inputOrder, lineR).filter(i => cellUnlocked(inputOrder, i, locked))
            if (chain.length > 0) return chain[chain.length - 1]
        }
        return null
    }

    const { c } = inputOrder[fromIdx]
    const sameCol = inputIndicesInCol(inputOrder, c).filter(i => cellUnlocked(inputOrder, i, locked))
    const posC = sameCol.indexOf(fromIdx)
    if (posC > 0) return sameCol[posC - 1]

    let lineC = c
    for (let step = 0; step < GRID_LINES.length; step++) {
        lineC = prevLineCol(lineC)
        const chain = inputIndicesInCol(inputOrder, lineC).filter(i => cellUnlocked(inputOrder, i, locked))
        if (chain.length > 0) return chain[chain.length - 1]
    }
    return null
}

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
    const selectedRef = useRef(-1)

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
    const [triedLettersByCell, setTriedLettersByCell] = useState({})
    const [selected, setSelected] = useState(-1)
    const [guessCount, setGuessCount] = useState(0)
    const [solved, setSolved] = useState(false)
    const [statusMsg, setStatusMsg] = useState('')
    const [selectionHighlighted, setSelectionHighlighted] = useState(true)
    const [axisMode, setAxisMode] = useState('row')
    const [bestAttempts, setBestAttempts] = useState(null)

    selectedRef.current = selected

    const attemptsByDiff = useMemo(() => {
        return DIFFS.map(d => (d === difficulty ? bestAttempts : loadBestAttempts(daily.key, d)))
    }, [daily.key, difficulty, bestAttempts])

    // Load/restore state whenever difficulty changes
    useEffect(() => {
        const saved = loadGameState(daily.key, difficulty, ALL_PLAYABLE_KEYS)
        const best = loadBestAttempts(daily.key, difficulty)

        let nextLocked = new Set()
        let nextSolved = false

        if (saved) {
            nextLocked = new Set(saved.locked || [])
            setGuesses(saved.guesses || {})
            setLocked(nextLocked)
            setGuessCount(typeof saved.guessCount === 'number' ? saved.guessCount : 0)
            nextSolved = !!saved.solved
            setSolved(nextSolved)
            setTriedLettersByCell(saved.triedLettersByCell || {})
            setBestAttempts(best)
        } else if (best != null) {
            const revealed = {}
            for (const { r, c } of geometry.inputOrder) revealed[`${r},${c}`] = answers[`${r},${c}`]
            nextLocked = new Set(geometry.inputOrder.map(({ r, c }) => `${r},${c}`))
            setGuesses(revealed)
            setLocked(nextLocked)
            setGuessCount(best)
            nextSolved = true
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

        const nextSel = nextSolved ? -1 : firstUnlockedInputIndex(geometry.inputOrder, nextLocked)
        setSelected(nextSel)
        setAxisMode('row')
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

    const advanceAfterType = useCallback((fromIdx) => {
        setSelected(advanceAlongAxis(fromIdx, axisMode, geometry.inputOrder, locked))
    }, [axisMode, geometry.inputOrder, locked])

    const navigateUnlockedCell = useCallback((delta) => {
        if (solved) return
        const next = nextUnlockedNavIndex(geometry.inputOrder, locked, selected, delta)
        if (next == null) return
        if (next !== selected) setAxisMode('row')
        setSelected(next)
        setSelectionHighlighted(true)
    }, [solved, geometry.inputOrder, locked, selected])

    const handleKey = useCallback((key) => {
        if (solved) return
        if (selected < 0 || selected >= geometry.inputOrder.length) return

        if (key === 'Backspace') {
            const pos = geometry.inputOrder[selected]
            const k = `${pos.r},${pos.c}`
            if (locked.has(k)) return
            if (guesses[k]) {
                setGuesses(prev => { const g = { ...prev }; delete g[k]; return g })
            } else {
                const prevIdx = retreatAlongAxis(selected, axisMode, geometry.inputOrder, locked)
                if (prevIdx != null) {
                    setSelected(prevIdx)
                    const pk = `${geometry.inputOrder[prevIdx].r},${geometry.inputOrder[prevIdx].c}`
                    setGuesses(g => { const ng = { ...g }; delete ng[pk]; return ng })
                }
            }
            return
        }

        if (/^[a-zA-Z]$/.test(key)) {
            const pos = geometry.inputOrder[selected]
            const k = `${pos.r},${pos.c}`
            if (locked.has(k)) return
            const letter = key.toLowerCase()
            setGuesses(prev => ({ ...prev, [k]: letter }))
            advanceAfterType(selected)
        }
    }, [solved, geometry.inputOrder, selected, axisMode, guesses, locked, advanceAfterType, triedLettersByCell])

    // Physical keyboard
    useEffect(() => {
        if (showInstructions) return
        const handler = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault()
                navigateUnlockedCell(e.shiftKey ? -1 : 1)
                return
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault()
                navigateUnlockedCell(1)
                return
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault()
                navigateUnlockedCell(-1)
                return
            }
            if (e.key === 'Backspace') { e.preventDefault(); handleKey('Backspace') }
            else if (e.key === 'Enter') { e.preventDefault(); checkAnswer() }
            else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key)
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [showInstructions, handleKey, navigateUnlockedCell])  // checkAnswer added via ref below

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

        if (newWrong.length === 0) {
            // All correct!
            const attemptsUsed = Math.min(nextGuessCount, 99)
            markComplete(daily.key, difficulty, attemptsUsed)
            setBestAttempts(prev => (prev != null && prev <= attemptsUsed ? prev : attemptsUsed))
            setSolved(true)
            setSelected(-1)
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
            if (firstWrongIdx >= 0) {
                setSelected(firstWrongIdx)
                setAxisMode('row')
            }
        }
    }, [solved, geometry.inputOrder, guessCount, guesses, locked, answers, daily.key, difficulty])

    checkAnswerRef.current = checkAnswer

    // ── Cell click ─────────────────────────────────────────────────────────

    const selectCell = useCallback((idx) => {
        if (solved) return
        const { r, c } = geometry.inputOrder[idx]
        if (locked.has(`${r},${c}`)) return
        setSelectionHighlighted(true)
        if (selectedRef.current === idx) {
            setAxisMode(m => (m === 'row' ? 'col' : 'row'))
        } else {
            setAxisMode('row')
            setSelected(idx)
        }
    }, [solved, geometry.inputOrder, locked])

    // ── Render helpers ─────────────────────────────────────────────────────

    const allFilled = geometry.inputOrder.every(({ r, c }) => {
        const k = `${r},${c}`
        return locked.has(k) || !!guesses[k]
    })

    const base = import.meta.env.BASE_URL
    const nextUnsolvedIdx = [0, 1, 2].find(i => i !== difficultyIdx && attemptsByDiff[i] == null)

    // Letters already tried (wrong) in the selected cell, for keyboard highlighting
    const selectedKey = !solved && selected >= 0 && selected < geometry.inputOrder.length
        ? `${geometry.inputOrder[selected].r},${geometry.inputOrder[selected].c}`
        : null
    const triedInSelected = selectedKey ? (triedLettersByCell[selectedKey] || []) : []

    const selPos = !solved && selected >= 0 && selected < geometry.inputOrder.length
        ? geometry.inputOrder[selected]
        : null

    // ── Grid cells ─────────────────────────────────────────────────────────

    const cells = []
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const key = `${r},${c}`

            const inBand = selPos != null && (
                (axisMode === 'row' && r === selPos.r) ||
                (axisMode === 'col' && c === selPos.c)
            )

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
                        background: '#E5E5E5',
                        color: inBand ? '#000' : '#5c5c5c',
                        fontWeight: 900,
                        fontSize: inBand ? CLUELESS_INPUT_FONT : CLUELESS_CLUE_FONT,
                        transition: 'font-size 0.15s ease',
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
            const isWrong = cellGuessShowsWrong(key, locked, guesses, triedLettersByCell)
            const letter = guesses[key] || ''

            let bg = '#fff'
            let color = '#000'
            if (isLocked) { bg = '#c6f6d5'; color = '#15803d' }
            else if (isWrong) { bg = '#fed7d7'; color = '#b91c1c' }
            if (inBand) color = '#000'

            const showActiveOutline = isSelected && selectionHighlighted

            cells.push(
                <div key={key}
                    onClick={() => selectCell(idx)}
                    style={{
                        border: '1px solid #000',
                        outline: showActiveOutline ? '6px solid #f6ae2d' : 'none',
                        outlineOffset: showActiveOutline ? '-6px' : undefined,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: bg,
                        color,
                        fontWeight: 900,
                        fontSize: CLUELESS_INPUT_FONT,
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

            {/* KEYBOARD when playing; next puzzle / hub when solved */}
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
                    nextUnsolvedIdx !== undefined ? (
                        <button type="button" className="btn-primary" onClick={() => setDifficultyIdx(nextUnsolvedIdx)}>
                            Next Puzzle
                        </button>
                    ) : (
                        <a href={base} className="btn-primary"
                            style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            All Puzzles
                        </a>
                    )
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

                        <h1 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>Clueless</h1>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                                <CluelessIcon size={80} />
                            </div>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                            Each puzzle uses six common five-letter, classroom-appropriate words — no plurals, proper nouns, abbreviations, or acronyms. The third puzzle may include some less familiar words.
                            </p>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                                Fill every blank and use the <strong>CHECK</strong> button to reveal which letters are correct.
                            </p>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                If multiple letters can fill a blank, the puzzle uses the one that creates the most common pair.
                            </p>
                        </div>

                        <button className="btn-primary" onClick={closeInstructions}>Play</button>
                    </div>
                </div>
            )}
        </div>
    )
}