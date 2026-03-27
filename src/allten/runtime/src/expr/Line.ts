/**
 * Functions for working with the ExpressionLine type, an array of
 * ExpressionElement objects.
 */

import {assertNever} from "../util/Utils";
import {
	ExpressionElement,
	ExpressionLine,
	ExpressionState,
	ExpressionStringToLineError,
} from "./types";
import {isExpressionOperator} from "./Operators";
import {resolveRules} from "./Rules";

/**
 * Equality operation for ExpressionElement.
 */
export function isExprElEqual(
	e1: ExpressionElement,
	e2: ExpressionElement
): boolean {
	if (e1.type === "op" && e2.type === "op") {
		return e1.op === e2.op;
	} else if (e1.type === "start" && e2.type === "start") {
		return e1.index === e2.index;
	} else if (e1.type === "interm" && e2.type === "interm") {
		return e1.index === e2.index;
	} else {
		return false;
	}
}

/**
 * Returns a string representation of an ExpressionLine. Always succeeds.
 */
export function lineToString(line: ExpressionLine): string {
	const parts: string[] = [];
	for (const el of line) {
		if (el.type === "op") {
			parts.push(el.op);
		} else if (el.type === "start") {
			parts.push("s" + el.index);
		} else if (el.type === "interm") {
			parts.push("i" + el.index);
		} else {
			assertNever(el);
		}
	}
	return parts.join("");
}

/**
 * Result type returned by stringToLine.
 */
export type StringToLineResult = {
	value: ExpressionLine | null;
	errors: ExpressionStringToLineError[];
};

/**
 * Attempts to convert a string to an ExpressionLine. Returns a {value, errors}
 * result.
 */
export function stringToLine(str: string): StringToLineResult {
	let i = 0;
	const line: ExpressionLine = [];
	const errors: ExpressionStringToLineError[] = [];

	function consumeNumIndex(): number | null {
		const m = /^[0-9]+/.exec(str.slice(i));
		if (!m) {
			return null;
		}
		i += m[0]!.length;
		return parseInt(m[0]!);
	}

	// Using while over for since i may be further mutated in some cases.
	while (i < str.length) {
		const char = str[i]!;
		i += 1;
		if (/\s/.test(char)) {
			continue;
		} else if (isExpressionOperator(char)) {
			line.push({type: "op", op: char});
		} else if (char === "s") {
			const numIndex = consumeNumIndex();
			if (numIndex === null) {
				errors.push({
					code: "E_START_NO_INDEX",
					index: i,
					message: "s not followed by digits",
				});
			} else {
				line.push({type: "start", index: numIndex});
			}
		} else if (char === "i") {
			const numIndex = consumeNumIndex();
			if (numIndex === null) {
				errors.push({
					code: "E_INTERM_NO_INDEX",
					index: i,
					message: "i not followed by digits",
				});
			} else {
				line.push({type: "interm", index: numIndex});
			}
		} else {
			errors.push({
				code: "E_INVALID_CHARACTER",
				index: i,
				message: "Invalid character " + char,
			});
		}
	}
	if (errors.length) {
		return {value: null, errors};
	}
	return {value: line, errors};
}

/**
 * Returns the same expression line with parentheses around it.
 */
export function encloseLineInParens(line: ExpressionLine): ExpressionLine {
	return [{type: "op", op: "("}, ...line, {type: "op", op: ")"}];
}

/**
 * Convenience helper for tests and stories. Returns an ExpressionState built
 * from string representations of the lines.
 *
 * Since it's intended for convenience and not runtime, it returns the state
 * directly and throws on any errors.
 */
export function makeStateFromStrings(
	start: number[],
	mainString: string,
	intermStrings: string[] = []
): ExpressionState {
	const mainRes = stringToLine(mainString);
	if (mainRes.errors.length || !mainRes.value) {
		throw new Error(
			"main stringToLine failed: " + JSON.stringify(mainRes.errors)
		);
	}

	const intermLines: ExpressionLine[] = [];
	let i = 0;
	for (const intermString of intermStrings) {
		const intermRes = stringToLine(intermString);
		if (intermRes.errors.length || !intermRes.value) {
			throw new Error(
				`interm[${i}] stringToLine failed: ` + JSON.stringify(intermRes.errors)
			);
		}
		intermLines.push(intermRes.value);
		i += 1;
	}

	const state: ExpressionState = {
		start,
		rules: resolveRules(),
		interm: intermLines,
		main: mainRes.value,
	};
	return state;
}
