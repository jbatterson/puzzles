/**
 * Strings giving all possible error messages. Some use printf form; the printf
 * call is done in AppState.
 *
 * Careful of length; the error view does not handle wordwrapping right.
 */

export const INCOMPLETE_EXPRESSION = `
Hmm... This looks incomplete.
`.trim();

export const MISPLACED_OPERATOR = `
You need a number here.
`.trim();

export const UNNECESSARY_OPERATORS = `
You used all numbers already.
`.trim();

export const TOO_LONG = `
You don't need an expression this long.
`.trim();

export const INVALID_PARENTHESES = `
The parentheses do not match up.
`.trim();

export const INVALID_CONCAT = `
Combo buttons cannot be used in 2-digit numbers
`.trim();

export const UNUSED_NUMBER = `
Every number must be used.
`.trim();

export const DIVIDE_BY_ZERO = `
Eek! You can't divide by zero.
`.trim();

export const ALREADY_FOUND_TARGET = `
You found another way to get %s.
`.trim();

export const NOT_TARGET = `
%s is not on the list.
`.trim();

export const NOT_INTEGER = `
That does not get an integer.
`.trim();

export const FRACTION_NOT_INTEGER = (fraction: string) =>
	`
${fraction} is not an integer.
`.trim();

export const RULE_FORBIDDEN_OP = `
This problem forbids the operation %s.
`.trim();

export const RULE_FORBIDDEN_PARENS = `
This problem forbids grouping.
`.trim();

export const RULE_FORBIDDEN_CONCAT = `
This problem forbids concatenating.
`.trim();

export const RULE_MULTIPLE_OPS = `
This problem forbids repeated operations.
`.trim();

export const RULE_OPS_OVER_LIMIT = `
This problem limits to %s operations.
`.trim();

export const INTERNAL = `
Oops! An internal error occurred.
`.trim();
