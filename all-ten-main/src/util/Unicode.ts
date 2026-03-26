/**
 * Small utility for dealing with unicode representations of some expression
 * elements.
 */

export const PLUS = "+";
export const NEG = "\u2212";
export const MINUS = "\u2212";
export const TIMES = "\u00D7";
export const DIVIDE = "\u00F7";

export function convertOperator(operator: string): string {
	if (operator === "+") {
		return PLUS;
	} else if (operator === "-") {
		return MINUS;
	} else if (operator === "*") {
		return TIMES;
	} else if (operator === "/") {
		return DIVIDE;
	}
	return operator;
}
