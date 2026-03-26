/**
 * Functions for turning an ExpressionState into an ExpressionTree. Includes
 * inlining the contents of intermediate lines. This is the main way in which
 * ExpressionTree values are constructed.
 */

import {assertNever} from "../util/Utils";
import {
	ArithmeticOperator,
	ExpressionNumberElement,
	ExpressionElement,
	ExpressionLine,
	ExpressionState,
	ExpressionStateLoc,
	ExpressionTreeOp,
	ExpressionTreeNumber,
	ExpressionTree,
	ExpressionTreeParseResult,
	ExpressionTreeParseError,
} from "./types";
import {fromNumber as fromNumberToRational} from "./Rational";
import {isExprElEqual} from "./Line";

/**
 * Internal helper type. Defines the state of an ongoing parsing operation.
 *
 * Unlike the vast majority of types in this project, it is used mutably. Many
 * of the helpers in this file do their work by mutating the parser state
 * passed to them instead of returning anything.
 */
type ExpressionTreeParserState = {
	// These immutable fields are what we are parsing. New parser states are
	// constructed whenever these fields need to change.

	/**
	 * The original ExpressionState object that we are parsing.
	 */
	readonly state: ExpressionState;
	/**
	 * The ExpressionLine that we are parsing.
	 *
	 * This is not necessarily a full line in ExpressionState; it may be a slice
	 * in the case that we are parsing a grouped expression.
	 */
	readonly line: ExpressionLine;
	/**
	 * Which line in the ExpressionState we are parsing, where null indicates
	 * the main line.
	 */
	readonly lineIntermIndex: number | null;
	/**
	 * The parsing "call stack". An element is pushed here each time we encounter
	 * another intermediate line to inline.
	 */
	readonly stack: ExpressionNumberElement[];
	/**
	 * True if we are parsing an expression that is allowed to be incomplete. It
	 * would be set to false when parsing a parenthesized expression.
	 */
	readonly canBePartial: boolean;
	/**
	 * Number to add to lineIndex to give the correct position of an error in
	 * the line.
	 */
	readonly errorOffset: number;

	// The next few fields represent the state of the parser as it goes through
	// the input. These fields do not show up in the final output.

	/**
	 * The element index in the line property that we are parsing now.
	 */
	lineIndex: number;
	/**
	 * The type of the next expected element, either a term or an operation.
	 */
	mode: "term" | "op";
	/**
	 * If we expect an operation but see a term instead, this boolean tells us
	 * whether we are allowed to consider this an implicit use of multiplication.
	 */
	canMultiply: boolean;

	// This last group of fields give the output-in-progress.

	/**
	 * The output tree that we are currently building.
	 */
	partialOp: ExpressionTreeOp;
	/**
	 * The array of all errors encountered so far. Note that parsing continues
	 * even after errors are encountered so that all of them can be reported.
	 */
	errors: ExpressionTreeParseError[];
	/**
	 * An array of all operators encountered during parsing. Tracking this helps
	 * implement some error checking.
	 */
	opLocList: {
		op: ArithmeticOperator;
		loc: ExpressionStateLoc;
		implicit: boolean;
	}[];
};

/**
 * Internal helper type for the createPS helper, defining all of the possible
 * options that can be passed in. See createPS documentation for details.
 */
type CreatePSOptions = {
	stack?: ExpressionNumberElement[];
	isRoot?: boolean;
	canBePartial?: boolean;
	errorOffset?: number;
	lineIntermIndex?: number | null;
};

/**
 * Internal helper. Returns a value suitable to include in the loc field of a
 * tree parsing error. By default, assumes the error applies to a single
 * position of the line (start = end). If not, pass endOffset to give the
 * number of characters from the start that the line should include.
 */
function makeErrorLoc(
	ps: ExpressionTreeParserState,
	index?: number,
	endOffset = 0
): ExpressionStateLoc {
	index = index === undefined ? ps.lineIndex : index;
	return {
		intermIndex: ps.lineIntermIndex,
		start: index + ps.errorOffset,
		end: index + ps.errorOffset + endOffset,
	};
}

/**
 * Internal helper for constructing a new parser state object. A line and state
 * are required. The options field accepts these keys, none required:
 * - stack: The stack field on the new parser state. Defaults to [].
 * - isRoot: If true (default), this is parser state object operates on a full
 *   line of the passed state. The effect is that the returned tree node will
 *   have the source field set.
 * - canBePartial: The canBePartial field on the new parser state.
 * - errorOffset: The errorOffset field on the new parser state.
 * - lineIntermIndex: The lineIntermIndex field on the new parser state.
 *   Defaults to null.
 */
function createPS(
	state: ExpressionState,
	line: ExpressionLine,
	options: CreatePSOptions = {}
): ExpressionTreeParserState {
	const {
		stack = [],
		isRoot = true,
		canBePartial = true,
		errorOffset = 0,
		lineIntermIndex = null,
	} = options;
	const source = isRoot ? stack[0] || null : null;
	return {
		state,
		line,
		lineIntermIndex,
		stack,
		canBePartial,
		errorOffset,
		partialOp: {
			type: "op",
			source,
			terms: [],
			ops: [],
		},
		errors: [],
		opLocList: [],
		lineIndex: 0,
		mode: "term",
		canMultiply: false,
	};
}

/**
 * Internal helper. Returns the index of a particular element in ps.stack, or
 * -1 if not found.
 */
function findIndexStackEl(
	ps: ExpressionTreeParserState,
	el: ExpressionElement
): number {
	return ps.stack.findIndex((other) => isExprElEqual(el, other));
}

/**
 * Internal helper. Wraps createPS to create a parser state from an existing
 * one, taking only a slice of the elements in the original's line.
 */
function createPSFromRange(
	ps: ExpressionTreeParserState,
	start: number,
	end: number,
	canBePartial = false
): ExpressionTreeParserState {
	const newLine = ps.line.slice(start, end);
	return createPS(ps.state, newLine, {
		lineIntermIndex: ps.lineIntermIndex,
		stack: ps.stack,
		isRoot: false,
		canBePartial,
		errorOffset: start,
	});
}

/**
 * Internal helper. Handles the case where the current line element is an
 * open-parenthesis. Attempts to find and parse a grouped expression, or
 * reports errors with parentheses balancing.
 */
function parseLineOpenParen(ps: ExpressionTreeParserState) {
	const {line, lineIndex} = ps;

	let nestLevel = 1;
	let closeIndex = lineIndex + 1;
	while (closeIndex < line.length) {
		const el = line[closeIndex]!;
		if (el.type === "op" && el.op === ")") {
			nestLevel -= 1;
		} else if (el.type === "op" && el.op === "(") {
			nestLevel += 1;
		}
		if (nestLevel <= 0) {
			break;
		}
		closeIndex += 1;
	}

	// nestLevel > 0 now means unclosed (. Before we check that, parse the rest
	// of the line for errors, and show that one instead if found.
	const restPS = createPSFromRange(
		ps,
		lineIndex + 1,
		closeIndex,
		nestLevel > 0
	);
	const restTree = parseLine(restPS);
	ps.errors.push(...restPS.errors);
	ps.opLocList.push(...restPS.opLocList);

	if (nestLevel > 0) {
		ps.errors.push({
			code: "E_UNCLOSED_PAREN",
			loc: makeErrorLoc(ps, lineIndex),
			message: "Unclosed open parenthesis",
			partial: ps.canBePartial,
		});
	}

	ps.lineIndex = closeIndex + (nestLevel > 0 ? 0 : 1);
	if (restTree) {
		ps.partialOp.terms.push(restTree);
		ps.mode = "op";
		ps.canMultiply = true;
	}
}

/**
 * Internal helper. Handles the case where the current line element is a
 * starting number.
 */
function parseLineStartNumber(ps: ExpressionTreeParserState) {
	const {state, line} = ps;

	const concatEls: ExpressionTreeNumber[] = [];
	const initLineIndex = ps.lineIndex;
	// Loop to find all numbers to treat as concatenated.
	while (ps.lineIndex < line.length) {
		const el = line[ps.lineIndex]!;
		if (el.type !== "start") {
			break;
		}
		const number = state.start[el.index];
		if (number === undefined) {
			ps.errors.push({
				code: "E_INVALID_NUMBER_INDEX",
				loc: makeErrorLoc(ps),
				message: "Invalid start index " + el.index,
				el,
			});
			ps.lineIndex += 1;
			break;
		}
		ps.lineIndex += 1;
		concatEls.push({
			type: "number",
			source: el,
			number: fromNumberToRational(number),
		});
	}

	if (!concatEls.length) {
		return;
	} else if (concatEls.length === 1) {
		ps.partialOp.terms.push(concatEls[0]!);
	} else {
		if (ps.state.rules.forbidConcat) {
			ps.errors.push({
				code: "E_RULE_FORBIDDEN_CONCAT",
				loc: makeErrorLoc(ps, initLineIndex, ps.lineIndex - initLineIndex - 1),
				message: "Concatenating digits is not allowed in this problem",
			});
		}
		ps.partialOp.terms.push({
			type: "concat",
			source: null,
			terms: concatEls,
		});
	}
	ps.mode = "op";
	ps.canMultiply = false;
}

/**
 * Internal helper. Handles the case where the current line element is a
 * intermediate number. This means inlining all elements of that line.
 */
function parseLineIntermNumber(
	ps: ExpressionTreeParserState,
	curr: ExpressionNumberElement
) {
	const stackIndex = findIndexStackEl(ps, curr);
	if (stackIndex > -1) {
		const intermIndices = ps.stack.slice(stackIndex).map((el) => el.index);
		ps.errors.push({
			code: "E_INTERM_CYCLE",
			loc: makeErrorLoc(ps),
			message: "Intermediate expression " + curr.index + " is circular",
			intermIndices,
		});
		ps.lineIndex += 1;
		return;
	}
	const intermLine = ps.state.interm[curr.index];
	if (intermLine === undefined) {
		ps.errors.push({
			code: "E_INVALID_NUMBER_INDEX",
			loc: makeErrorLoc(ps),
			message: "Invalid interm index " + curr.index,
			el: curr,
		});
		ps.lineIndex += 1;
		return;
	}

	const newStack = [...ps.stack, curr];
	const restPS = createPS(ps.state, intermLine, {
		lineIntermIndex: curr.index,
		stack: newStack,
		canBePartial: false,
	});
	const restTree = parseLine(restPS);
	ps.errors.push(...restPS.errors);
	ps.opLocList.push(...restPS.opLocList);

	let subtree: ExpressionTree | null = restTree;
	if (!subtree) {
		// Do nothing
	} else if (subtree.source && isExprElEqual(subtree.source, curr)) {
		// Do nothing
	} else if (subtree.source) {
		subtree = {type: "op", source: curr, terms: [subtree], ops: []};
	} else {
		subtree = {...subtree, source: curr};
	}

	ps.lineIndex += 1;
	if (subtree) {
		ps.partialOp.terms.push(subtree);
		ps.mode = "op";
		ps.canMultiply = false;
	}
}

/**
 * Internal helper. Handles the case where the parser state is expecting a
 * term (starting or intermediate number) next.
 */
function parseLineModeTerm(
	ps: ExpressionTreeParserState,
	curr: ExpressionElement
) {
	if (curr.type === "op") {
		// Found operator when expecting a term. Only valid if "(".
		if (curr.op === "(") {
			parseLineOpenParen(ps);
		} else if (curr.op === ")") {
			ps.errors.push({
				code: "E_UNOPENED_PAREN",
				loc: makeErrorLoc(ps),
				message: "Unopened close parenthesis",
			});
			ps.lineIndex += 1;
		} else if (ps.lineIndex === 0) {
			ps.errors.push({
				code: "E_MISPLACED_OPERATOR",
				loc: makeErrorLoc(ps),
				message: "Started expression with operator",
				begin: true,
			});
			ps.lineIndex += 1;
		} else {
			ps.errors.push({
				code: "E_MISPLACED_OPERATOR",
				loc: makeErrorLoc(ps, ps.lineIndex - 1, 1),
				message: "Two consecutive operators",
				begin: false,
			});
			ps.lineIndex += 1;
		}
	} else if (curr.type === "start") {
		parseLineStartNumber(ps);
	} else if (curr.type === "interm") {
		parseLineIntermNumber(ps, curr);
	} else {
		assertNever(curr);
	}
}

/**
 * Internal helper. Handles the case where the parser state is expecting an
 * operator next.
 */
function parseLineModeOp(
	ps: ExpressionTreeParserState,
	curr: ExpressionElement
) {
	if (curr.type === "op") {
		if (curr.op === "(") {
			// Always allow multiplication if either term is parenthesized.
			// Leave lineIndex unchanged; term parser should consume this element.
			ps.partialOp.ops.push("*");
			ps.opLocList.push({
				op: "*",
				loc: makeErrorLoc(ps, ps.lineIndex, 1),
				implicit: true,
			});
			ps.mode = "term";
		} else if (curr.op === ")") {
			ps.errors.push({
				code: "E_UNOPENED_PAREN",
				loc: makeErrorLoc(ps),
				message: "Unopened close parenthesis",
			});
			ps.lineIndex += 1;
		} else {
			ps.partialOp.ops.push(curr.op);
			ps.opLocList.push({op: curr.op, loc: makeErrorLoc(ps), implicit: false});
			ps.lineIndex += 1;
			ps.mode = "term";
		}
	} else if (curr.type === "start" || curr.type === "interm") {
		if (!ps.canMultiply) {
			ps.errors.push({
				code: "E_NO_IMPLICIT_MULTIPLICATION",
				loc: makeErrorLoc(ps),
				message: "Cannot do implicit multiplication here",
			});
			// Fall through and put multiplication in anyway, so that the errored
			// tree we parse doesn't skip this number entirely.
		}
		// Leave lineIndex unchanged; term parser should consume this element.
		ps.partialOp.ops.push("*");
		ps.opLocList.push({
			op: "*",
			loc: makeErrorLoc(ps, ps.lineIndex - 1, 1),
			implicit: true,
		});
		ps.mode = "term";
	} else {
		assertNever(curr);
	}
}

/**
 * Internal helper. Called near the end of parsing to check some special
 * rules where it helps to have a full view of the expression.
 */
function checkRules(ps: ExpressionTreeParserState) {
	const rules = ps.state.rules;
	const opCounts: Partial<Record<ArithmeticOperator, number>> = {};

	ps.opLocList.forEach(({op, loc, implicit}) => {
		if (rules.forbidOps.includes(op)) {
			ps.errors.push({
				code: "E_RULE_FORBIDDEN_OP",
				loc,
				message: `Operator ${op} is forbidden in this problem.`,
				op,
				implicit,
			});
		}

		opCounts[op] = (opCounts[op] || 0) + 1;
		if (rules.singleOps && opCounts[op]! > 1) {
			ps.errors.push({
				code: "E_RULE_MULTIPLE_OPS",
				loc,
				message: "Using an operator twice is forbidden in this problem",
				op,
			});
		}
	});

	if (rules.opLimit > 0 && ps.opLocList.length > rules.opLimit) {
		const badEntry = ps.opLocList[rules.opLimit]!;
		ps.errors.push({
			code: "E_RULE_OPS_OVER_LIMIT",
			loc: badEntry.loc,
			message: `Limited to ${rules.opLimit} operations in this problem`,
			limit: rules.opLimit,
		});
	}

	if (rules.forbidParens) {
		let i = 0;
		for (const el of ps.state.main) {
			if (el.type === "op" && el.op === "(") {
				ps.errors.push({
					code: "E_RULE_FORBIDDEN_PARENS",
					loc: {intermIndex: null, start: i, end: i},
					message: `No parentheses or grouping allowed in this problem`,
				});
			} else if (el.type === "interm") {
				ps.errors.push({
					code: "E_RULE_FORBIDDEN_PARENS",
					loc: {intermIndex: null, start: i, end: i},
					message: `No parentheses or grouping allowed in this problem`,
				});
			}
			i += 1;
		}
	}
}

/**
 * Internal helper. Parses an expression line that also takes care of the
 * finishing touches on the output when the line has been read. This is the
 * entry point for the recursive parsing helpers.
 */
function parseLine(ps: ExpressionTreeParserState): ExpressionTree | null {
	const {line} = ps;

	while (ps.lineIndex < line.length) {
		const curr = line[ps.lineIndex]!;
		if (ps.mode === "term") {
			parseLineModeTerm(ps, curr);
		} else if (ps.mode === "op") {
			parseLineModeOp(ps, curr);
		} else {
			assertNever(ps.mode);
		}
	}

	const final = ps.partialOp;
	const {terms, ops} = final;
	if (ps.mode === "term" && !terms.length) {
		ps.errors.push({
			code: "E_EMPTY_EXPRESSION",
			loc: makeErrorLoc(ps),
			message: "Empty expression",
			partial: ps.canBePartial,
		});
		return null;
	} else if (ps.mode === "term") {
		ps.errors.push({
			code: "E_DANGLING_OPERATOR",
			loc: makeErrorLoc(ps, ps.lineIndex - 1),
			message: "Dangling operator",
			partial: ps.canBePartial,
		});
	} else if (terms.length !== ops.length + 1) {
		throw new Error(
			"Expected exactly one more term than operator, " +
				`got ${terms.length} terms and ${ops.length} ops`
		);
	}

	checkRules(ps);

	if (terms.length === 1 && ops.length === 0) {
		return terms[0]!;
	} else {
		return final;
	}
}

/**
 * Parses only an intermediate line of a given state into a tree.
 */
export function buildTreeFromStateIntermediate(
	state: ExpressionState,
	index: number
): ExpressionTreeParseResult {
	const line = state.interm[index];
	if (!line) {
		return {
			value: null,
			errors: [
				{
					code: "E_INVALID_NUMBER_INDEX",
					loc: {
						intermIndex: index,
						start: 0,
						end: 0,
					},
					message: "Tried to build tree with invalid interm index " + index,
					el: {type: "interm", index},
				},
			],
		};
	}
	const ps = createPS(state, line);
	const tree = parseLine(ps);
	return {
		value: tree,
		errors: ps.errors,
	};
}

/**
 * Parses the main line of a given state into a tree. The primary export of
 * this file.
 */
export function buildTreeFromStateMain(
	state: ExpressionState
): ExpressionTreeParseResult {
	const ps = createPS(state, state.main);
	const tree = parseLine(ps);
	return {
		value: tree,
		errors: ps.errors,
	};
}
