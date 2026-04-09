import {formatAllTenElapsedMsForShare} from "../../../../../shared-contracts/allTenSharePlaintext.js";
import {pstStringify} from "./Dates";

/** Wall-clock session timer for the daily puzzle; survives reload while in progress. */
export function solveTimerStartKey(problemDate: Date): string {
	return `${pstStringify(problemDate)}-solveTimerStart`;
}

/** Persisted elapsed ms after first All Ten of the day (for results modal after refresh). */
export function solveElapsedKey(problemDate: Date): string {
	return `${pstStringify(problemDate)}-solveElapsedMs`;
}

/**
 * If the puzzle is still in progress, ensure a start timestamp exists (first visit or after prior cleanup).
 */
export function ensureSolveTimerStart(problemDate: Date, completed: boolean): void {
	if (completed) {
		return;
	}
	const startKey = solveTimerStartKey(problemDate);
	if (localStorage.getItem(startKey)) {
		return;
	}
	localStorage.setItem(startKey, String(Date.now()));
}

/**
 * @returns elapsed ms since start, or null if no start was recorded
 */
export function computeElapsedMsSinceStart(
	problemDate: Date,
	endMs: number
): number | null {
	const raw = localStorage.getItem(solveTimerStartKey(problemDate));
	if (raw == null) {
		return null;
	}
	const startMs = parseInt(raw, 10);
	if (!Number.isFinite(startMs)) {
		return null;
	}
	return Math.max(0, endMs - startMs);
}

export function persistSolveElapsedMs(problemDate: Date, elapsedMs: number): void {
	localStorage.setItem(solveElapsedKey(problemDate), String(elapsedMs));
}

export function readPersistedSolveElapsedMs(problemDate: Date): number | null {
	const raw = localStorage.getItem(solveElapsedKey(problemDate));
	if (raw == null) {
		return null;
	}
	const n = parseInt(raw, 10);
	return Number.isFinite(n) ? n : null;
}

export function clearSolveTimerStart(problemDate: Date): void {
	localStorage.removeItem(solveTimerStartKey(problemDate));
}

/** Elapsed milliseconds as HH:MM:SS (same as share / clipboard). */
export function formatSolveElapsedHms(elapsedMs: number): string {
	return formatAllTenElapsedMsForShare(elapsedMs);
}
