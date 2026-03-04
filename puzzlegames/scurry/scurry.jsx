import React from 'react'
import puzzleData from './puzzles.js'
const { useState, useEffect, useMemo, useCallback } = React;

const Bug = ({ isMoving, isFalling, isCelebrating, size = 42 }) => (
    <div className={`${isFalling ? 'falling-bug' : ''} ${isCelebrating ? 'celebrating-bug' : ''}`}>
        <svg width={size} height={size} viewBox="0 0 28 28" className={isMoving ? 'moving-bug' : ''}>
            <path d="M10 6 Q 8 2 6 4" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18 6 Q 20 2 22 4" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            <g stroke="#000" strokeWidth="1.5" strokeLinecap="round">
                <line x1="8" y1="12" x2="3" y2="10" /><line x1="7" y1="16" x2="2" y2="16" /><line x1="8" y1="20" x2="3" y2="22" />
                <line x1="20" y1="12" x2="25" y2="10" /><line x1="21" y1="16" x2="26" y2="16" /><line x1="20" y1="20" x2="25" y2="22" />
            </g>
            <circle cx="14" cy="16" r="9" fill="#FF3B30" stroke="#000" strokeWidth="1" />
            <path d="M8 13 A 7 7 0 0 1 20 13" fill="#000" />
            <circle cx="11" cy="17" r="1.5" fill="white" />
            <circle cx="17" cy="17" r="1.5" fill="white" />
        </svg>
    </div>
);

const BugPuzzle = () => {
    const puzzles = useMemo(() => puzzleData || [], []);
    if (!puzzles || puzzles.length === 0) return <div>Loading Puzzles...</div>;

    const [currentPuzzle, setCurrentPuzzle] = useState(10);
    const [isTutorial, setIsTutorial] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [bugs, setBugs] = useState([]);
    const [bugsPlacedCount, setBugsPlacedCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isCelebrating, setIsCelebrating] = useState(false);
    const [history, setHistory] = useState([]);

    const level = (puzzles && puzzles[currentPuzzle])
        ? puzzles[currentPuzzle]
        : (puzzles[puzzles.length - 1] || { targets: [], maxBugs: 0, prePlaced: [] });

    const isSandbox = currentPuzzle === puzzles.length - 1;

    const bugsLeft = isSandbox
        ? '∞'
        : Math.max(0, level.maxBugs - bugsPlacedCount);

    const allTargetsFilled = level.targets.length > 0 && level.targets.every(t => bugs.some(b => b.square === t));

    const isOutOfBugs = !isSandbox && bugsPlacedCount >= level.maxBugs && !allTargetsFilled;

    const resetLevel = useCallback(() => {
        if (!level) return;
        const initial = level.prePlaced.map((sq, i) => ({
            id: `pre-${i}-${currentPuzzle}-${Date.now()}`,
            square: sq,
            isMoving: false,
            isFalling: false,
            virtualPos: null
        }));
        setBugs(initial);
        setBugsPlacedCount(0);
        setHistory([]);
        setIsAnimating(false);
        setIsCelebrating(false);
    }, [level, currentPuzzle]);

    useEffect(() => {
        resetLevel();
    }, [resetLevel]);

    const getPos = (sq) => ({ row: Math.floor((sq - 1) / 5), col: (sq - 1) % 5 });
    const getSq = (r, c) => (r < 0 || r > 4 || c < 0 || c > 4) ? null : r * 5 + c + 1;

    const resolveScurry = (clickSq, currentBugs) => {
        let workingBugs = currentBugs.map(b => ({ ...b }));
        const cp = getPos(clickSq);
        const neighbors = workingBugs.filter(b => {
            const bp = getPos(b.square);
            return Math.abs(bp.row - cp.row) <= 1 && Math.abs(bp.col - cp.col) <= 1;
        });

        neighbors.forEach(neighbor => {
            const np = getPos(neighbor.square);
            const dr = np.row - cp.row;
            const dc = np.col - cp.col;
            let chain = [];
            let target = neighbor;
            while (target) {
                chain.push(target);
                const tp = getPos(target.square);
                const nextSq = getSq(tp.row + dr, tp.col + dc);
                target = workingBugs.find(b => b.square === nextSq && !chain.includes(b));
            }
            chain.reverse().forEach(b => {
                const bp = getPos(b.square);
                const nr = bp.row + dr;
                const nc = bp.col + dc;
                const nextSq = getSq(nr, nc);
                b.square = nextSq || -100;
                b.virtualPos = { row: nr, col: nc };
                b.isFalling = !nextSq;
                b.isMoving = true;
            });
        });
        return workingBugs;
    };

    const placeBug = (square) => {
        if (isAnimating || isCelebrating || (!isSandbox && bugsPlacedCount >= level.maxBugs)) return;
        if (bugs.some(b => b.square === square)) return;

        setHistory(prev => [...prev, bugs.map(b => ({ ...b }))]);
        setIsAnimating(true);

        const scurriedBugs = resolveScurry(square, bugs);
        const newBug = { id: Date.now(), square, isMoving: false, isFalling: false, virtualPos: null };

        const updatedBugs = [...scurriedBugs, newBug];
        setBugs(updatedBugs);
        setBugsPlacedCount(prev => prev + 1);

        setTimeout(() => {
            const finalBugs = updatedBugs
                .filter(b => !b.isFalling)
                .map(b => ({ ...b, isMoving: false, virtualPos: null }));

            setBugs(finalBugs);
            setIsAnimating(false);

            const won = level.targets.length > 0 && level.targets.every(t => finalBugs.some(b => b.square === t));
            if (won) {
                setTimeout(() => {
                    setIsCelebrating(true);
                    setTimeout(() => setIsCelebrating(false), 800);
                }, 300);
            }
        }, 500);
    };

    const undo = () => {
        if (history.length === 0 || allTargetsFilled) return;
        setBugs(history[history.length - 1]);
        setHistory(prev => prev.slice(0, -1));
        setBugsPlacedCount(prev => prev - 1);
    };

    const changeLevel = (delta) => {
        if (isAnimating) return;
        const next = currentPuzzle + delta;
        if (isTutorial) {
            if (next >= 0 && next <= 9) setCurrentPuzzle(next);
        } else {
            if (next >= 10 && next < puzzles.length) setCurrentPuzzle(next);
        }
    };

    const primaryLabel = allTargetsFilled
        ? (isTutorial && currentPuzzle === 9 ? 'Play Game' : 'Next Puzzle')
        : (isOutOfBugs ? 'Retry Puzzle' : 'Fill All Target Squares');

    const handlePrimaryClick = () => {
        if (allTargetsFilled) {
            if (isTutorial && currentPuzzle === 9) {
                setIsTutorial(false);
                setCurrentPuzzle(10);
            } else if (currentPuzzle < puzzles.length - 1) {
                setCurrentPuzzle(prev => prev + 1);
            }
        } else if (isOutOfBugs) {
            resetLevel();
        }
    };

    return (
        <div className="game-container">
            <div className="header-row">
                <div className="left-spacer">
                    {isTutorial && (
                        <button
                            className="skip-link"
                            onClick={() => { setIsTutorial(false); setCurrentPuzzle(10); }}
                        >
                            Skip Tutorial
                        </button>
                    )}
                </div>
                <h1 className="title">Scurry</h1>
                <div className="help-btn" onClick={() => setShowInstructions(true)}>?</div>
            </div>

            {/* INFO BAR */}
            <div className="level-nav">
                <div></div>

                <div className="selector-group">
                    <button
                        className={`nav-arrow ${(isTutorial ? currentPuzzle === 0 : currentPuzzle === 10) ? 'disabled' : ''}`}
                        onClick={() => changeLevel(-1)}
                    >
                        ←
                    </button>

                    <div className="level-label">
                        <span className="sub">{isTutorial ? 'Tutorial' : 'Puzzle'}</span>
                        <span className="num">
                            {isSandbox ? '∞' : (isTutorial ? currentPuzzle + 1 : currentPuzzle - 9)}
                        </span>
                    </div>

                    <button
                        className={`nav-arrow ${(isTutorial ? currentPuzzle === 9 : currentPuzzle === puzzles.length - 1) ? 'disabled' : ''}`}
                        onClick={() => changeLevel(1)}
                    >
                        →
                    </button>
                </div>

                <div className="stats-group">
                    <span className="stats-label">Bugs</span>
                    <span className="stats-num">{bugsLeft}</span>
                </div>
            </div>

            <div className="game-stage">
                <div id="canvas-wrapper">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gridTemplateRows: 'repeat(5, 1fr)',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}>
                        {[...Array(25)].map((_, i) => {
                            const sq = i + 1;
                            const isTarget = level.targets.includes(sq);
                            return (
                                <div
                                    key={sq}
                                    onClick={() => placeBug(sq)}
                                    onTouchStart={(e) => {
                                        if (e.cancelable) e.preventDefault();
                                        placeBug(sq);
                                    }}
                                    className={`grid-line ${isTarget ? 'target-square' : ''}`}
                                    style={{ position: 'relative', cursor: 'pointer', padding: '5px' }}
                                />
                            );
                        })}
                    </div>

                    {bugs.map(bug => {
                        const pos = bug.virtualPos || getPos(bug.square);
                        return (
                            <div
                                key={bug.id}
                                className="bug-layer"
                                style={{
                                    left: `${pos.col * 20}%`,
                                    top: `${pos.row * 20}%`,
                                    width: '20%',
                                    height: '20%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '4px'
                                }}
                            >
                                <Bug
                                    isMoving={bug.isMoving}
                                    isFalling={bug.isFalling}
                                    isCelebrating={isCelebrating && level.targets.includes(bug.square)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="button-tray">
                <button
                    className="btn-secondary"
                    onClick={undo}
                    disabled={history.length === 0 || allTargetsFilled}
                >Undo</button>
                <button
                    className="btn-secondary"
                    onClick={resetLevel}
                    disabled={(bugs.length === level.prePlaced.length && history.length === 0)}
                >Reset</button>
            </div>

            {/* Primary area: text during play, button on win/lose */}
            {(!allTargetsFilled && !isOutOfBugs) ? (
                <div className="goal-text">Fill All Target Squares</div>
            ) : (
                <button className="btn-primary" onClick={handlePrimaryClick}>
                    {primaryLabel}
                </button>
            )}

            {showInstructions && (
                <div id="instructions-overlay">
                    <div className="modal-content" style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowInstructions(false)}
                            aria-label="Close instructions"
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'none',
                                border: 'none',
                                fontSize: '22px',
                                fontWeight: 900,
                                cursor: 'pointer',
                                lineHeight: 1,
                                padding: '4px'
                            }}
                        >✕</button>
                        <h1 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>Scurry</h1>

                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                                <Bug size={80} />
                            </div>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                                Place bugs to fill all of the highlighted squares.
                                <p></p>
                                Placing a bug causes its neighbors to <b>scurry</b>,
                                pushing them away in all directions.
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button
                                className="btn-primary"
                                onClick={() => { setIsTutorial(false); setCurrentPuzzle(10); setShowInstructions(false); }}
                            >Play Game</button>
                            <button
                                className="btn-secondary"
                                onClick={() => { setIsTutorial(true); setCurrentPuzzle(0); setShowInstructions(false); }}
                            >Tutorial Puzzles</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BugPuzzle