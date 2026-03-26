/**
 * Defines available operators for expressions and functions dealing with them.
 */

import {assertNever} from "../util/Utils";

/**
 * Binary arithmetic operations.
 */
export type ArithmeticOperator = "+" | "-" | "*" | "/";

/**
 * All operators that can appear in an expression.
 */
export type ExpressionOperator = ArithmeticOperator | "(" | ")";

/**
 * All expression operators as a Set.
 */
const expressionOperators: readonly string[] = ["+", "-", "*", "/", "(", ")"];

/**
 * Value for whether an operation is left or right associative.
 */
export enum AssocDir {
	LEFT,
	RIGHT,
}

/**
 * Return a precedence lower than any operator precedence. Helps evaluation
 * algorithms.
 */
export function getTerminalPrecedence(): number {
	return -1;
}

/**
 * Return a precedence for an arithmetic operation. Higher precedence means to
 * evaluate it first in an expression.
 */
export function getPrecedence(op: ArithmeticOperator): number {
	if (op === "+" || op === "-") {
		return 0;
	} else if (op === "*" || op === "/") {
		return 1;
	} else {
		assertNever(op);
	}
}

/**
 * Get the associativity direction of an arithmetic operation. All available
 * operations are associative.
 */
export function getAssocDir(op: ArithmeticOperator): AssocDir {
	return AssocDir.LEFT;
}

/**
 * Return whether the arithmetic operation is commutative.
 */
export function isCommutative(op: ArithmeticOperator): boolean {
	return op === "+" || op === "*";
}

/**
 * Return whether an arbitrary string is an expression operator.
 */
export function isExpressionOperator(str: string): str is ExpressionOperator {
	return expressionOperators.includes(str);
}

export function isExpressionOperatorChar(
	str: ExpressionOperator | string
): str is ExpressionOperator {
	return str === "x" || expressionOperators.includes(str);
}

export function toExpressionOperator(
	str: ExpressionOperator | "x"
): ExpressionOperator | null {
	if (str === "x") {
		return "*";
	}
	if (expressionOperators.includes(str)) {
		return str;
	}
	return null;
}
