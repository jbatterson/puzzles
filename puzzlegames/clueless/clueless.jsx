import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import puzzles from './puzzles.js'
import TopBar from '../../src/shared/TopBar.jsx'

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

function getDailyPuzzle() {
    const key = getDailyKey()
    const idx = getDayIndex(key) % puzzles.length
    return { puzzle: puzzles[idx], key }
}

// ── Completion tracking ──────────────────────────────────────────────────────
// bestAttempts: 1..5 (fewest CHECKs used to solve). failed: "1" = ran out of guesses (no replay).

function loadBestAttempts(dateKey) {
    const v = localStorage.getItem(`clueless:${dateKey}:bestAttempts`)
    if (v != null) {
        const n = parseInt(v, 10)
        if (n >= 1 && n <= 5) return n
    }
    // Migrate old schema: '2' = perfect (1 attempt), '1' = completed (treat as 2 attempts)
    const legacy = localStorage.getItem(`clueless:${dateKey}`)
    if (legacy === '2') return 1
    if (legacy === '1') return 2
    return null
}

function loadFailed(dateKey) {
    return localStorage.getItem(`clueless:${dateKey}:failed`) === '1'
}

function markComplete(dateKey, attemptsUsed) {
    const existing = loadBestAttempts(dateKey)
    if (existing != null && attemptsUsed >= existing) return
    localStorage.setItem(`clueless:${dateKey}:bestAttempts`, String(attemptsUsed))
}

function markFailed(dateKey) {
    localStorage.setItem(`clueless:${dateKey}:failed`, '1')
}

// ── Grid geometry ────────────────────────────────────────────────────────────
// 5×5 grid. Corners of every 2-cell interval are INPUT cells (9 total).
// Odd-row or odd-col cells (not blocked) are CLUE cells (12 total).
// (1,1), (1,3), (3,1), (3,3) are BLOCKED (4 total).

const BLOCKED = new Set(['1,1', '1,3', '3,1', '3,3'])

const INPUT_ORDER = [] // [{r, c}] — the 9 yellow cells, left-to-right top-to-bottom
const CLUE_CELLS = new Set()

for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
        const key = `${r},${c}`
        if (BLOCKED.has(key)) continue
        if (r % 2 === 0 && c % 2 === 0) INPUT_ORDER.push({ r, c })
        else CLUE_CELLS.add(key)
    }
}

// ── Extract clue/answer letters from a puzzle object ────────────────────────

function getPuzzleData(p) {
    const clues = {}
    const answers = {}

    // Horizontal words fill rows 0, 2, 4
    const hWords = [p.h1, p.h2, p.h3]
    ;[0, 2, 4].forEach((r, i) => {
        const w = hWords[i]
        for (let c = 0; c < 5; c++) {
            const key = `${r},${c}`
            if (c % 2 === 0) answers[key] = w[c]
            else clues[key] = w[c]
        }
    })

    // Vertical words fill cols 0, 2, 4
    const vWords = [p.v1, p.v2, p.v3]
    ;[0, 2, 4].forEach((c, i) => {
        const w = vWords[i]
        for (let r = 0; r < 5; r++) {
            const key = `${r},${c}`
            if (r % 2 !== 0) clues[key] = w[r] // odd rows only; even rows already set by answers
        }
    })

    return { clues, answers }
}

// ── Keyboard rows ────────────────────────────────────────────────────────────

const KB_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']

// ── Main component ───────────────────────────────────────────────────────────

export default function CluelessGame() {
    const daily = useMemo(() => getDailyPuzzle(), [])
    const dateLabel = useMemo(() => getDateLabel(), [])
    const { clues, answers } = useMemo(() => getPuzzleData(daily.puzzle), [daily])

    const usedHintRef = useRef(false)

    // Puzzle state
    const [guesses, setGuesses] = useState({})   // "r,c" → letter
    const [locked, setLocked] = useState(new Set())   // confirmed correct cells
    const [wrongCells, setWrongCells] = useState(new Set())
    const [triedLettersByCell, setTriedLettersByCell] = useState({})  // "r,c" → array of letters tried (wrong) in that cell
    const [selected, setSelected] = useState(0)  // index into INPUT_ORDER
    const [guessesLeft, setGuessesLeft] = useState(5)
    const [solved, setSolved] = useState(false)
    const [statusMsg, setStatusMsg] = useState('')
    const [selectionHighlighted, setSelectionHighlighted] = useState(true) // false after CHECK until user clicks a cell

    // Completion: bestAttempts 1..5 (null = not solved), failedLocked = ran out of guesses (no replay)
    const [bestAttempts, setBestAttempts] = useState(() => loadBestAttempts(daily.key))
    const [failedLocked, setFailedLocked] = useState(() => loadFailed(daily.key))

    // When page loads with failed lock, reveal the solution and end the game
    useEffect(() => {
        if (!failedLocked || !Object.keys(answers).length) return
        const revealed = {}
        for (const { r, c } of INPUT_ORDER) revealed[`${r},${c}`] = answers[`${r},${c}`]
        setGuesses(revealed)
        setLocked(new Set(INPUT_ORDER.map(({ r, c }) => `${r},${c}`)))
        setSolved(true)
        setGuessesLeft(0)
    }, [failedLocked]) // eslint-disable-line react-hooks/exhaustive-deps -- only run when failedLocked from load; answers is stable

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
        while (next < INPUT_ORDER.length) {
            const { r, c } = INPUT_ORDER[next]
            if (!locked.has(`${r},${c}`)) { setSelected(next); return }
            next++
        }
        // wrap to first unlocked
        for (let i = 0; i < INPUT_ORDER.length; i++) {
            const { r, c } = INPUT_ORDER[i]
            if (!locked.has(`${r},${c}`)) { setSelected(i); return }
        }
    }, [locked])

    const handleKey = useCallback((key) => {
        if (solved || guessesLeft <= 0) return

        if (key === 'Backspace') {
            const pos = INPUT_ORDER[selected]
            const k = `${pos.r},${pos.c}`
            if (locked.has(k)) return
            if (guesses[k]) {
                setGuesses(prev => { const g = { ...prev }; delete g[k]; return g })
                setWrongCells(prev => { const s = new Set(prev); s.delete(k); return s })
            } else if (selected > 0) {
                let prev = selected - 1
                while (prev >= 0 && locked.has(`${INPUT_ORDER[prev].r},${INPUT_ORDER[prev].c}`)) prev--
                if (prev >= 0) {
                    setSelected(prev)
                    const pk = `${INPUT_ORDER[prev].r},${INPUT_ORDER[prev].c}`
                    setGuesses(g => { const ng = { ...g }; delete ng[pk]; return ng })
                    setWrongCells(s => { const ns = new Set(s); ns.delete(pk); return ns })
                }
            }
            return
        }

        if (/^[a-zA-Z]$/.test(key)) {
            const pos = INPUT_ORDER[selected]
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
    }, [solved, guessesLeft, selected, guesses, locked, advanceSelection, triedLettersByCell])

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
        if (solved || guessesLeft <= 0) return

        const newCorrect = []
        const newWrong = []
        let allFilled = true

        for (const { r, c } of INPUT_ORDER) {
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

        const newGuessesLeft = guessesLeft - 1
        setGuessesLeft(newGuessesLeft)

        const newLocked = new Set([...locked, ...newCorrect])
        setLocked(newLocked)
        setWrongCells(new Set(newWrong))

        if (newWrong.length === 0) {
            // All correct!
            const attemptsUsed = 5 - newGuessesLeft
            markComplete(daily.key, attemptsUsed)
            setBestAttempts(prev => (prev != null && prev <= attemptsUsed ? prev : attemptsUsed))
            setSolved(true)
            setStatusMsg('')
        } else if (newGuessesLeft <= 0) {
            // Out of guesses — reveal and lock (no replay)
            markFailed(daily.key)
            setFailedLocked(true)
            setSolved(true)
            setStatusMsg('')
            // Fill all remaining cells with correct answers
            const revealed = { ...guesses }
            for (const { r, c } of INPUT_ORDER) {
                revealed[`${r},${c}`] = answers[`${r},${c}`]
            }
            setGuesses(revealed)
            setLocked(new Set(INPUT_ORDER.map(({ r, c }) => `${r},${c}`)))
            setWrongCells(new Set())
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
            const firstWrongIdx = INPUT_ORDER.findIndex(({ r, c }) => newWrong.includes(`${r},${c}`))
            if (firstWrongIdx >= 0) setSelected(firstWrongIdx)
        }
    }, [solved, guessesLeft, guesses, locked, answers, daily.key])

    checkAnswerRef.current = checkAnswer

    // ── Cell click ─────────────────────────────────────────────────────────

    const selectCell = useCallback((idx) => {
        if (solved && guessesLeft > 0) return
        const { r, c } = INPUT_ORDER[idx]
        if (locked.has(`${r},${c}`)) return
        setSelectionHighlighted(true)
        setSelected(idx)
    }, [solved, guessesLeft, locked])

    // ── Render helpers ─────────────────────────────────────────────────────

    const allFilled = INPUT_ORDER.every(({ r, c }) => {
        const k = `${r},${c}`
        return locked.has(k) || !!guesses[k]
    })

    const base = import.meta.env.BASE_URL

    // Letters already tried (wrong) in the selected cell, for keyboard highlighting
    const selectedKey = !solved && selected >= 0 && selected < INPUT_ORDER.length
        ? `${INPUT_ORDER[selected].r},${INPUT_ORDER[selected].c}`
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

            if (CLUE_CELLS.has(key)) {
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
            const idx = INPUT_ORDER.findIndex(p => p.r === r && p.c === c)
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
                    {(bestAttempts != null || failedLocked) && (
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: failedLocked ? '#374151' : '#22c55e',
                            color: '#fff',
                            fontWeight: 900,
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {failedLocked ? '•' : bestAttempts === 1 ? '★' : String(bestAttempts)}
                        </div>
                    )}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <span className="stats-label">{dateLabel}</span>
                </div>
                <div className="stats-group">
                    <span className="stats-label">Guesses</span>
                    <span className="stats-num">{guessesLeft}</span>
                </div>
            </div>

            {/* STATUS MESSAGE */}
            <div className="clueless-status" style={{
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: solved && guessesLeft > 0 ? '#15803d' : '#000',
            }}>
                {solved && guessesLeft > 0
                    ? 'Solved!'
                    : solved
                    ? 'Better luck tomorrow'
                    : statusMsg}
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
                            const checkActive = allFilled && !solved && guessesLeft > 0
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
                        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                            The <strong>2nd and 4th letters</strong> of every word are given as clues.
                            Fill in the <strong>1st, 3rd, and 5th letters</strong> — the 9 highlighted cells.
                        </p>
                        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            Each yellow cell is shared by one across word and one down word. You have <strong>5 guesses</strong>. Correct letters lock in green after each submit.
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