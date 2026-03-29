/**
 * Plaintext share format for All Ten, matching what Results.tsx copies from the
 * hidden clipboard div (see getResultsAsStr / resultsForMobileSharing).
 * Kept in shared-contracts so the hub can use it without importing All Ten runtime.
 */

const LAUNCH_DATE = new Date(Date.parse("19 Sep 2022 00:00:00 PST"));
const DAY_IN_MS = 86400000;
const MIN_DIGITS_PUZZLE_NUM = 3;
const GREEN_CHECK_MARK = "✅";
const BLANK_BOX = "⬜";

function getSortedTargets(targets) {
	return [...targets].sort(
		(a, b) =>
			(a.solveOrder ? -1 : 0) +
				(b.solveOrder ? 1 : 0) ||
			(a.solveOrder || 0) - (b.solveOrder || 0),
	);
}

export function allTenTargetsToSolveOrderPlaintext(targets) {
	if (!Array.isArray(targets)) return "";
	const sorted = getSortedTargets(targets);
	return sorted
		.map((target) =>
			target.solution
				? `${target.number}${GREEN_CHECK_MARK}`
				: `${target.number}${BLANK_BOX}`,
		)
		.join(" ");
}

/** Same numbering as All Ten getPuzzleNumberAsString(problemDate). */
export function getAllTenPuzzleNumberDisplayString(date) {
	const puzzleNumber = Math.floor(
		(Number(date) - Number(LAUNCH_DATE)) / DAY_IN_MS,
	);
	const s = String(puzzleNumber);
	const prefix =
		s.length < MIN_DIGITS_PUZZLE_NUM
			? "0".repeat(MIN_DIGITS_PUZZLE_NUM - s.length)
			: "";
	return prefix + s;
}

/**
 * @param {Array<{ number: number, solution?: unknown, solveOrder?: number | null }>} targets
 * @param {Date} problemDate — use `new Date()` when sharing “today” to match in-game behavior
 */
export function buildAllTenInPuzzleStyleSharePlaintext(targets, problemDate) {
	if (!Array.isArray(targets) || targets.length === 0) return "";
	const puzzleNumberStr = getAllTenPuzzleNumberDisplayString(problemDate);
	const numCorrect = targets.filter((t) => t && t.solution != null).length;
	const numTotal = targets.length;
	const solveLine = allTenTargetsToSolveOrderPlaintext(targets);
	return `All Ten #${puzzleNumberStr}\n${numCorrect}/${numTotal}\n${solveLine}`;
}
