import {TargetState} from "./AppState";

/**
 * Functional. Makes new sorted list of targets from the given targets with
 * respect to solve order. Unsolved elements go at the end.
 *
 * @param {TargetState[]} targets The list of targets to sort.
 *
 * @returns A new array with the pre-existing elements in sorted order.
 */
export function getSortedTargets(targets: TargetState[]): TargetState[] {
	const sorted = new Array(...targets).sort(
		(a: TargetState, b: TargetState) =>
			// put a first (-1) if only a was solved, but b (1) if only b, else move on
			(a.solveOrder ? -1 : 0) + (b.solveOrder ? 1 : 0) || // sort by solveOrder ascending
			(a.solveOrder || 0) - (b.solveOrder || 0)
	);

	return sorted;
}

/**
 * Functional. Stringifies the solve order from a given array of target states.
 *
 * @param targets The targets to stringify.
 */
export function targetsToSolveOrderString(targets: TargetState[]): string {
	const GREEN_CHECK_MARK = "✅";
	const BLANK_BOX = "⬜";

	const sortedTargets = getSortedTargets(targets);

	const resultArr: string[] = sortedTargets.map((target) => {
		if (target.solution) {
			return `${target.number}${GREEN_CHECK_MARK}`;
		} else {
			return `${target.number}${BLANK_BOX}`;
		}
	});

	return resultArr.join(" ");
}
