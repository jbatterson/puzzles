/**
 * Utility defining the data structure describing the problems that can be
 * played.
 */

import {StartNumber, ProblemRules} from "../expr/types";
import {resolveRules} from "../expr/Rules";

/**
 * The possible types for the targets to reach. (If we ever want fractional
 * targets, this may need to be changed to Rational.)
 */
export type TargetNumber = number;

/**
 * The main export, the problem data structure.
 */
export type Problem = {
	start: StartNumber[];
	targets: TargetNumber[];
	rules: ProblemRules;
};

export type ProblemProps = {
	start?: StartNumber[];
	dayOffset?: number;
	date?: Date;
	targets?: TargetArg;
	rules?: Partial<ProblemRules>;
};

/**
 * Helper type for the signature of createProblem.
 */
export type TargetArg = undefined | "default" | number[];

const DEFAULT_TARGETS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Convenience helper for creating a problem object, which automatically fills
 * in defaults for options not passed.
 */
export function createProblem(
	start: StartNumber[],
	options: ProblemProps = {}
): Problem {
	let targets: number[];
	if (Array.isArray(options.targets)) {
		targets = options.targets;
	} else if (!options.targets || options.targets === "default") {
		targets = DEFAULT_TARGETS;
	} else {
		console.warn("Invalid targets value", options.targets);
		targets = DEFAULT_TARGETS;
	}

	const rules = resolveRules(options.rules);

	return {
		start,
		targets,
		rules,
	};
}
