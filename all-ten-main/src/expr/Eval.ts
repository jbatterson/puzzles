/**
 * Contains functions to evaluate an expression as a rational number.
 */

import {assertNever} from "../util/Utils";
import {
	Rational,
	ArithmeticOperator,
	ExpressionState,
	ExpressionTree,
	ExpressionTreeOp,
	ExpressionEvalResult,
} from "./types";
import * as Ratl from "./Rational";
import * as Ops from "./Operators";
import {
	buildTreeFromStateIntermediate,
	buildTreeFromStateMain,
} from "./TreeParse";
import {DIVIDE_BY_ZERO} from "../util/ErrorCopy";

/**
 * Internal helper. Tries to convert a rational number to a base ten digit
 * (0-9). Returns null if the rational is not a digit.
 */
function rationalToDigit(r: Rational | null): number | null {
	if (!r) {
		return null;
	}
	const [p, q] = r;
	if (q !== 1) {
		return null;
	} else if (p < 0 || p > 9) {
		return null;
	}
	return p;
}

/**
 * Internal helper. Returns the evaluation result of an expression tree that is
 * known to be type "op". Assumes the tree is valid (one more term than
 * operation). Includes OOO/associativity logic.
 */
function evalTreeOp(tree: ExpressionTreeOp): ExpressionEvalResult {
	const {terms, ops} = tree;
	if (!terms.length) {
		throw new Error("Tried to evalute expression with no terms");
	}

	// The evaluation-in-progress is represented as [number, op] pairs on a
	// stack. The stack always contains operators in ascending precedence order;
	// operations with higher precedence will be evaluated and removed from the
	// stack immediately if the next operation has low precedence. Also, left
	// associative operations are evaluated as soon as multiple terms with that
	// operator are on the stack.
	const stack: [Rational, ArithmeticOperator][] = [];
	// This value is generally only valid for one loop iteration, but it will
	// also hold the final evaluation in the last iteration.
	let value: Rational | null = null;
	for (let i = 0; i < terms.length; i += 1) {
		const term = terms[i]!;
		// The last iteration is special since there is no operation to go with
		// the term and we need to evaluate everything left.
		const termIsLast = i === terms.length - 1;

		// Recursively evaluate the term.
		const termResult = evalTree(term);
		value = termResult.value;
		if (!value || termResult.errors.length) {
			return termResult;
		}

		const currPrecNum = termIsLast
			? Ops.getTerminalPrecedence()
			: Ops.getPrecedence(ops[i]!);

		let tail = stack[stack.length - 1];
		// This loop pops and evaluates as many elements of the stack as needed to
		// preserve all invariants before pushing this operation. In the termIsLast
		// case, the whole stack will be evaluated per Ops.getTerminalPrecedence.
		while (tail) {
			const [tailValue, tailOp] = tail;
			const tailPrecNum = Ops.getPrecedence(tailOp);
			const tailPrecDir = Ops.getAssocDir(tailOp);
			const evalTailNow =
				currPrecNum < tailPrecNum ||
				(currPrecNum === tailPrecNum && tailPrecDir === Ops.AssocDir.LEFT);
			if (!evalTailNow) {
				break;
			}

			value = Ratl.doOp(tailValue, value, tailOp);
			if (!value) {
				return {
					value: null,
					errors: [
						{
							code: "E_DIVIDE_BY_ZERO",
							message: DIVIDE_BY_ZERO + " Or a value was null.",
						},
					],
				};
			}
			stack.pop();
			tail = stack[stack.length - 1];
		}

		if (!termIsLast) {
			stack.push([value, ops[i]!]);
		}
	}
	return {value, errors: []};
}

/**
 * Return the evaluation result of the given tree. Done recursively.
 */
export function evalTree(tree: ExpressionTree): ExpressionEvalResult {
	if (tree.type === "number") {
		return {value: tree.number, errors: []};
	} else if (tree.type === "concat") {
		let concatValue = 0;
		for (const term of tree.terms) {
			const evalResult = evalTree(term);
			if (!evalResult.value) {
				return evalResult;
			}
			const digit = rationalToDigit(evalResult.value);
			if (digit === null) {
				return {
					value: null,
					errors: [
						{
							code: "E_CONCAT_NON_DIGIT",
							message: "Applied concatenation to non-digit value",
							value: evalResult.value,
						},
					],
				};
			}
			concatValue = 10 * concatValue + digit;
		}
		return {value: Ratl.fromNumber(concatValue), errors: []};
	} else if (tree.type === "op") {
		return evalTreeOp(tree);
	} else {
		assertNever(tree);
	}
}

/**
 * Evaluate a particular intermediate of an expression state.
 */
export function evalIntermediate(
	state: ExpressionState,
	index: number
): ExpressionEvalResult {
	const treeRes = buildTreeFromStateIntermediate(state, index);
	if (!treeRes.value) {
		return {value: null, errors: treeRes.errors};
	}
	const evalRes = evalTree(treeRes.value);
	return {
		value: evalRes.value,
		errors: [...treeRes.errors, ...evalRes.errors],
	};
}

/**
 * Evaluate the main line of an expression state.
 */
export function evalMain(state: ExpressionState): ExpressionEvalResult {
	const treeRes = buildTreeFromStateMain(state);
	if (!treeRes.value) {
		return {value: null, errors: treeRes.errors};
	}
	const evalRes = evalTree(treeRes.value);
	return {
		value: evalRes.value,
		errors: [...treeRes.errors, ...evalRes.errors],
	};
}

/*
 * The number of numbers in the tree.
 */
export function numbersUsed(tree: ExpressionTree): number {
	let count = 0;
	if (tree.type === "number") {
		count += 1;
	} else if (tree.type === "concat") {
		count += tree.terms.length;
	} else if (tree.type === "op") {
		for (const term of tree.terms) {
			count += numbersUsed(term);
		}
	}
	return count;
}
