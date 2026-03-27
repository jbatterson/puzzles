/**
 * Functions for turning a tree back into an ExpressionLine. Includes a
 * function for determining where parentheses are needed.
 */

import * as Ops from "./Operators";
import {ExpressionLine, ExpressionTree} from "./types";

/**
 * Internal helper for needsParens. Finds the minimum precedence of all
 * operations in a tree node. Returns infinity if no operations.
 */
function getMinPrecInTree(tree: ExpressionTree): number {
	if (tree.type !== "op" || !tree.terms.length) {
		return Infinity;
	}
	const precs = tree.ops.map((op) => Ops.getPrecedence(op));
	if (!precs.length) {
		return getMinPrecInTree(tree.terms[0]!);
	}
	return Math.min(...precs);
}

/**
 * Internal helper. Given an op tree node and an index of a term, returns
 * whether the contents of that node should be wrapped in parentheses. Will
 * include parentheses in most cases if stripParens is false. Will never
 * include unnecessary parentheses if stripParens is true.
 */
function needsParens(
	tree: ExpressionTree,
	index: number,
	stripParens = false
): boolean {
	// If we call with a tree of the wrong kind, just return no parens needed.
	if (tree.type !== "op") {
		return false;
	}
	let child = tree.terms[index];
	// If stripParens is false, just check the child is a nontrivial expression.
	if (!stripParens) {
		return !!child && child.type === "op" && child.ops.length > 0;
	}
	while (child && child.type === "op" && child.terms.length === 1) {
		child = child.terms[0];
	}
	if (!child) {
		return false;
	}
	// The rules:
	// - Parentheses are needed if this term has any operations with lower
	//   precedence then either adjacent operation.
	// - Parentheses are needed if the operation in front is not commutative
	//   and the term has any operations with equal precedence.
	const prevOp = tree.ops[index - 1];
	const nextOp = tree.ops[index];
	const minPrecInChild = getMinPrecInTree(child);
	if (prevOp) {
		const prevPrec = Ops.getPrecedence(prevOp);
		const prevComm = Ops.isCommutative(prevOp);
		if (prevPrec > minPrecInChild) {
			return true;
		} else if (!prevComm && prevPrec === minPrecInChild) {
			return true;
		}
	}
	if (nextOp) {
		const nextPrec = Ops.getPrecedence(nextOp);
		if (nextPrec > minPrecInChild) {
			return true;
		}
	}
	return false;
}

type BuildLineOptions = {
	stripParens?: boolean;
};

/**
 * Main export. Turns an ExpressionTree into an ExpressionLine. Since
 * ExpressionTrees embed intermediates, this can be one part of flattening an
 * ExpressionState into a single line.
 */
export function buildLineFromTree(
	tree: ExpressionTree,
	options?: BuildLineOptions
): ExpressionLine {
	const {stripParens = false} = options || {};

	const line: ExpressionLine = [];

	const stack: {tree: ExpressionTree; index: number; parens?: boolean}[] = [
		{
			tree,
			index: 0,
		},
	];

	while (stack.length) {
		const tail = stack[stack.length - 1]!;
		if (tail.tree.type === "number") {
			if (!tail.tree.source) {
				throw new Error("Tree number node missing source");
			}
			line.push(tail.tree.source);
			stack.pop();
		} else if (tail.tree.type === "concat") {
			const nextTree = tail.tree.terms[tail.index];
			if (!nextTree) {
				stack.pop();
			} else {
				stack.push({tree: nextTree, index: 0});
				tail.index += 1;
			}
		} else if (tail.tree.type === "op") {
			const nextTree = tail.tree.terms[tail.index];
			if (!nextTree) {
				if (tail.parens) {
					line.push({type: "op", op: ")"});
				}
				stack.pop();
			} else {
				if (tail.index > 0) {
					line.push({type: "op", op: tail.tree.ops[tail.index - 1]!});
				}
				const includeParens = needsParens(tail.tree, tail.index, stripParens);
				if (includeParens) {
					line.push({type: "op", op: "("});
					stack.push({tree: nextTree, index: 0, parens: true});
				} else {
					stack.push({tree: nextTree, index: 0});
				}
				tail.index += 1;
			}
		}
	}
	return line;
}
