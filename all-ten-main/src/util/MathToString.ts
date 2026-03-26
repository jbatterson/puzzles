import {ExpressionState} from "../expr/types";
import {Problem} from "../state/Problem";
import {TargetState} from "../state/AppState";

import {encloseLineInParens} from "../expr/Line";
import {evalIntermediate} from "../expr/Eval";
import {COOKIE_DELIM} from "../view/util/Constants";

export function renderExprLineToString(
	exprState: ExpressionState,
	evalInterm: boolean
): string {
	const line = exprState.main;
	return line
		.map((el): string => {
			if (el.type === "start") {
				const number = exprState.start[el.index];
				if (number === undefined) {
					throw new Error("Invalid start index in line: " + el.index);
				}
				return String(number);
			} else if (el.type === "interm") {
				let intermLine = exprState.interm[el.index];
				if (intermLine === undefined) {
					throw new Error("Invalid interm index in line: " + el.index);
				}
				if (evalInterm) {
					const evalRes = evalIntermediate(exprState, el.index);
					return String(evalRes.value);
				}
				intermLine = encloseLineInParens(intermLine);
				return renderExprLineToString(exprState, evalInterm);
			} else if (el.type === "op") {
				return el.op;
			}
			throw new Error("Invalid element type for element " + el);
		})
		.join("");
}

export function renderProblemStateToString(
	problem: Problem,
	targets: TargetState[]
): string {
	return (
		problem.start.join(COOKIE_DELIM) +
		"@" +
		targets
			.map((t) => {
				if (!t.solution) {
					return "";
				} else {
					const exprState: ExpressionState = {
						start: problem.start,
						rules: problem.rules,
						main: t.solution,
						interm: [],
					};
					return renderExprLineToString(exprState, false);
				}
			})
			.join(COOKIE_DELIM)
	);
}
