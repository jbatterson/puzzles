/**
 * Defines the available rules on a problem and their defaults.
 */

import {ProblemRules} from "../expr/types";

/**
 * Default rules.
 */
const defaultRules: ProblemRules = {
	forbidOps: [],
	forbidParens: false,
	forbidConcat: false,
	singleOps: false,
	opLimit: 0,
	impossible: 0,
};

/**
 * Returns a full rules object given a partial one, filling defaults in.
 */
export function resolveRules(rules?: Partial<ProblemRules>): ProblemRules {
	return {
		...defaultRules,
		...(rules || {}),
	};
}
