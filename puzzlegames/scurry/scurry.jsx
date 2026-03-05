import React, { useState, useEffect, useMemo, useCallback } from 'react'
import puzzleData from './puzzles.js'
import TopBar from '../../src/shared/TopBar.jsx'
import BugIcon from '../../src/shared/icons/BugIcon.jsx'

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

function seededRandom(seed) {
    let h = 0
    for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0
    return () => {
        h ^= h << 13; h ^= h >> 17; h ^= h << 5
        return (h >>> 0) / 0xFFFFFFFF
    }
}

function getDailyPuzzles() {
    const key = getDailyKey()
    const rngEasy   = seededRandom(key + ':easy')
    const rngMedium = seededRandom(key + ':medium')
    const rngHard   = seededRandom(key + ':hard')
    return {
        puzzles: [
            puzzleData.easy[Math.floor(rngEasy()   * puzzleData.easy.length)],
            puzzleData.medium[Math.floor(rngMedium() * puzzleData.medium.length)],
            puzzleData.hard[Math.floor(rngHard()   * puzzleData.hard.length)],
        ],
        key,
    }
}

// ── Completion tracking ──────────────────────────────────────────────────────
function loadCompletions(dateKey) {
    return [0, 1, 2].map(i => localStorage.getItem(`scurry:${dateKey}:${i}`) === '1')
}

function markComplete(dateKey, idx) {
    localStorage.setItem(`scurry:${dateKey}:${idx}`, '1')
}

// ── Bug component ────────────────────────────────────────────────────────────
const Bug = ({ isMoving, isFalling, isCelebrating, size = 42 }) => (
    <div className={`${isFalling ? 'falling-bug' : ''} ${isCelebrating ? 'celebrating-bug' : ''}`}>
        <BugIcon size={size} className={isMoving ? 'moving-bug' : ''} />
    </div>
)

// ── Puzzle number boxes ──────────────────────────────────────────────────────
function PuzzleBoxes({ current, completions, onChange }) {
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            {[0, 1, 2].map(i => (
                <button
                    key={i}
                    onClick={() => onChange(i)}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: 'none',
                        background: completions[i] ? '#22c55e' : current === i ? '#000' : '#d1d5db',
                        color: '#fff',
                        fontWeight: 900,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    {completions[i] ? '✓' : i + 1}
                </button>
            ))}
        </div>
    )
}

// ── Main component ───────────────────────────────────────────────────────────
const SANDBOX_LEVEL = { targets: [], maxBugs: 999, prePlaced: [] }

const BugPuzzle = () => {
    const daily = useMemo(() => getDailyPuzzles(), [])
    const dateLabel = useMemo(() => getDateLabel(), [])

    const [mode, setMode] = useState('daily') // 'daily' | 'tutorial' | 'sandbox'
    const [tutorialIdx, setTutorialIdx] = useState(0)
    const [dailyIdx, setDailyIdx] = useState(0)
    const [completions, setCompletions] = useState(() => loadCompletions(daily.key))
    const [showInstructions, setShowInstructions] = useState(true)
    const [bugs, setBugs] = useState([])
    const [bugsPlacedCount, setBugsPlacedCount] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isCelebrating, setIsCelebrating] = useState(false)
    const [history, setHistory] = useState([])

    const level = useMemo(() => {
        if (mode === 'tutorial') return puzzleData.tutorial[tutorialIdx]
        if (mode === 'sandbox') return SANDBOX_LEVEL
        return daily.puzzles[dailyIdx]
    }, [mode, tutorialIdx, dailyIdx, daily])

    const resetLevel = useCallback(() => {
        if (!level) return
        const initial = level.prePlaced.map((sq, i) => ({
            id: `pre-${i}-${Date.now()}`,
            square: sq,
            isMoving: false, isFalling: false, virtualPos: null,
        }))
        setBugs(initial)
        setBugsPlacedCount(0)
        setHistory([])
        setIsAnimating(false)
        setIsCelebrating(false)
    }, [level])

    useEffect(() => { resetLevel() }, [resetLevel])

    const allTargetsFilled = level?.targets.length > 0 &&
        level.targets.every(t => bugs.some(b => b.square === t))

    const isSandbox = mode === 'sandbox'
    const bugsLeft = isSandbox ? '∞' : Math.max(0, (level?.maxBugs ?? 0) - bugsPlacedCount)
    const isOutOfBugs = !isSandbox && mode !== 'tutorial' &&
        bugsPlacedCount >= (level?.maxBugs ?? 0) && !allTargetsFilled

    const getPos = (sq) => ({ row: Math.floor((sq - 1) / 5), col: (sq - 1) % 5 })
    const getSq = (r, c) => (r < 0 || r > 4 || c < 0 || c > 4) ? null : r * 5 + c + 1

    const resolveScurry = (clickSq, currentBugs) => {
        let workingBugs = currentBugs.map(b => ({ ...b }))
        const cp = getPos(clickSq)
        const neighbors = workingBugs.filter(b => {
            const bp = getPos(b.square)
            return Math.abs(bp.row - cp.row) <= 1 && Math.abs(bp.col - cp.col) <= 1
        })
        neighbors.forEach(neighbor => {
            const np = getPos(neighbor.square)
            const dr = np.row - cp.row, dc = np.col - cp.col
            let chain = [], target = neighbor
            while (target) {
                chain.push(target)
                const tp = getPos(target.square)
                const nextSq = getSq(tp.row + dr, tp.col + dc)
                target = workingBugs.find(b => b.square === nextSq && !chain.includes(b))
            }
            chain.reverse().forEach(b => {
                const bp = getPos(b.square)
                const nr = bp.row + dr, nc = bp.col + dc
                const nextSq = getSq(nr, nc)
                b.square = nextSq || -100
                b.virtualPos = { row: nr, col: nc }
                b.isFalling = !nextSq
                b.isMoving = true
            })
        })
        return workingBugs
    }

    const placeBug = (square) => {
        if (isAnimating || isCelebrating) return
        if (!isSandbox && mode !== 'tutorial' && bugsPlacedCount >= level.maxBugs) return
        if (bugs.some(b => b.square === square)) return

        setHistory(prev => [...prev, bugs.map(b => ({ ...b }))])
        setIsAnimating(true)

        const scurriedBugs = resolveScurry(square, bugs)
        const newBug = { id: Date.now(), square, isMoving: false, isFalling: false, virtualPos: null }
        const updatedBugs = [...scurriedBugs, newBug]
        setBugs(updatedBugs)
        setBugsPlacedCount(prev => prev + 1)

        setTimeout(() => {
            const finalBugs = updatedBugs
                .filter(b => !b.isFalling)
                .map(b => ({ ...b, isMoving: false, virtualPos: null }))
            setBugs(finalBugs)
            setIsAnimating(false)

            const won = level.targets.length > 0 &&
                level.targets.every(t => finalBugs.some(b => b.square === t))
            if (won) {
                if (mode === 'daily') {
                    markComplete(daily.key, dailyIdx)
                    setCompletions(loadCompletions(daily.key))
                }
                setTimeout(() => {
                    setIsCelebrating(true)
                    setTimeout(() => setIsCelebrating(false), 800)
                }, 300)
            }
        }, 500)
    }

    const undo = () => {
        if (history.length === 0 || allTargetsFilled) return
        setBugs(history[history.length - 1])
        setHistory(prev => prev.slice(0, -1))
        setBugsPlacedCount(prev => prev - 1)
    }

    const handlePrimaryClick = () => {
        if (allTargetsFilled) {
            if (mode === 'tutorial') {
                if (tutorialIdx < puzzleData.tutorial.length - 1) setTutorialIdx(i => i + 1)
                else { setMode('daily'); setDailyIdx(0) }
            } else if (mode === 'daily') {
                const nextUnsolved = [0, 1, 2].find(i => i !== dailyIdx && !completions[i])
                if (nextUnsolved !== undefined) setDailyIdx(nextUnsolved)
                else setMode('sandbox')
            }
        } else if (isOutOfBugs) {
            resetLevel()
        }
    }

    const allDailyDone = completions.every(Boolean)

    const primaryLabel = allTargetsFilled
        ? mode === 'tutorial'
            ? tutorialIdx < puzzleData.tutorial.length - 1 ? 'Next Puzzle' : 'Play Today\'s Puzzles'
            : mode === 'daily'
            ? [0,1,2].find(i => i !== dailyIdx && !completions[i]) !== undefined ? 'Next Puzzle' : 'Sandbox Mode'
            : null
        : isOutOfBugs ? 'Retry Puzzle'
        : null

    const base = import.meta.env.BASE_URL

    return (
        <div className="game-container">
            <TopBar title="Scurry" onHelp={() => setShowInstructions(true)} />

            {/* INFO BAR */}
            {mode === 'tutorial' ? (
                <div className="level-nav">
                    <div className="left-spacer">
                        <button className="skip-link" onClick={() => { setMode('daily'); setDailyIdx(0) }}>
                            Skip Tutorial
                        </button>
                    </div>
                    <div className="selector-group">
                        <button className={`nav-arrow ${tutorialIdx === 0 ? 'disabled' : ''}`}
                            onClick={() => { if (tutorialIdx > 0) setTutorialIdx(i => i - 1) }}>←</button>
                        <div className="level-label">
                            <span className="sub">Tutorial</span>
                            <span className="num">{tutorialIdx + 1}</span>
                        </div>
                        <button className={`nav-arrow ${tutorialIdx === puzzleData.tutorial.length - 1 ? 'disabled' : ''}`}
                            onClick={() => { if (tutorialIdx < puzzleData.tutorial.length - 1) setTutorialIdx(i => i + 1) }}>→</button>
                    </div>
                    <div className="stats-group">
                        <span className="stats-label">Bugs</span>
                        <span className="stats-num">{bugsLeft}</span>
                    </div>
                </div>
            ) : mode === 'sandbox' ? (
                <div className="level-nav">
                    <div></div>
                    <div className="level-label" style={{ textAlign: 'center' }}>
                        <span className="sub">Sandbox</span>
                        <span className="num">∞</span>
                    </div>
                    <div className="stats-group">
                        <span className="stats-label">Bugs</span>
                        <span className="stats-num">∞</span>
                    </div>
                </div>
            ) : (
                <div className="level-nav">
                    <div></div>
                    <div className="selector-group" style={{ flexDirection: 'column', gap: '4px' }}>
                        <div className="level-label" style={{ textAlign: 'center' }}>
                            <span className="sub">{dateLabel}</span>
                        </div>
                        <PuzzleBoxes
                            current={dailyIdx}
                            completions={completions}
                            onChange={setDailyIdx}
                        />
                    </div>
                    <div className="stats-group">
                        <span className="stats-label">Bugs</span>
                        <span className="stats-num">{bugsLeft}</span>
                    </div>
                </div>
            )}

            {/* GAME BOARD */}
            <div className="game-stage">
                <div id="canvas-wrapper">
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
                        gridTemplateRows: 'repeat(5, 1fr)', width: '100%', height: '100%',
                        position: 'absolute', top: 0, left: 0,
                    }}>
                        {[...Array(25)].map((_, i) => {
                            const sq = i + 1
                            const isTarget = level?.targets.includes(sq)
                            return (
                                <div key={sq} onClick={() => placeBug(sq)}
                                    onTouchStart={(e) => { if (e.cancelable) e.preventDefault(); placeBug(sq) }}
                                    className={`grid-line ${isTarget ? 'target-square' : ''}`}
                                    style={{ position: 'relative', cursor: 'pointer', padding: '5px' }}
                                />
                            )
                        })}
                    </div>
                    {bugs.map(bug => {
                        const pos = bug.virtualPos || getPos(bug.square)
                        return (
                            <div key={bug.id} className="bug-layer" style={{
                                left: `${pos.col * 20}%`, top: `${pos.row * 20}%`,
                                width: '20%', height: '20%',
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center', padding: '4px',
                            }}>
                                <Bug isMoving={bug.isMoving} isFalling={bug.isFalling}
                                    isCelebrating={isCelebrating && level?.targets.includes(bug.square)} />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* BUTTONS */}
            <div className="button-tray">
                <button className="btn-secondary" onClick={undo}
                    disabled={history.length === 0 || allTargetsFilled}>Undo</button>
                <button className="btn-secondary" onClick={resetLevel}>Reset</button>
            </div>

            {mode === 'sandbox' ? (
                <a href={base} className="btn-primary"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    All Puzzles
                </a>
            ) : primaryLabel ? (
                <button className="btn-primary" onClick={handlePrimaryClick}>{primaryLabel}</button>
            ) : (
                <div className="goal-text">Fill All Target Squares</div>
            )}

            {/* INSTRUCTIONS */}
            {showInstructions && (
                <div id="instructions-overlay">
                    <div className="modal-content" style={{ position: 'relative' }}>
                        <button onClick={() => setShowInstructions(false)}
                            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '22px', fontWeight: 900, cursor: 'pointer' }}>✕</button>
                        <h1 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>Scurry</h1>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                                <BugIcon size={80} />
                            </div>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                                Place bugs to fill all of the highlighted squares.
                                <br /><br />
                                Placing a bug causes its neighbors to <b>scurry</b>,
                                pushing them away in all directions.
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button className="btn-primary" onClick={() => { setMode('daily'); setDailyIdx(0); setShowInstructions(false) }}> Play Today's Puzzles</button>
                            <button className="btn-secondary"
                                onClick={() => { setMode('tutorial'); setTutorialIdx(0); setShowInstructions(false) }}>
                                Tutorial Puzzles
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BugPuzzle