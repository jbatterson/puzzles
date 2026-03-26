import {assertNever} from "../util/Utils";
import {
	Rational,
	ArithmeticOperator,
	ExpressionOperator,
	ExpressionNumberElement,
	ExpressionElement,
	ExpressionLine,
	ExpressionState,
	ExpressionStateFinishResult,
	ExpressionStateFinishError,
	ExpressionTree,
} from "./types";
import {
	buildTreeFromStateMain,
	buildTreeFromStateIntermediate,
} from "./TreeParse";
import {buildLineFromTree} from "./TreeFlatten";
import {evalTree, evalIntermediate} from "./Eval";

export type NumberButtonState = {
	state: "available" | "current" | "used";
	el: ExpressionNumberElement;
};

const PARTIAL_CODES = ["E_DIVIDE_BY_ZERO", "E_UNUSED_NUMBER"];

const PARTIAL_NUM_REMAINING_CODES = [
	"E_EMPTY_EXPRESSION",
	"E_DANGLING_OPERATOR",
];

function isErrorOkIfPartial(
	error: ExpressionStateFinishError,
	usedAllNumbers = false
): boolean {
	if ("partial" in error && error.partial) {
		if (!usedAllNumbers || !PARTIAL_NUM_REMAINING_CODES.includes(error.code)) {
			return true;
		}
	} else if (PARTIAL_CODES.includes(error.code)) {
		return true;
	}
	return false;
}

function stopsFinishingInterm(error: ExpressionStateFinishError): boolean {
	return error.code !== "E_UNUSED_NUMBER";
}

function stopsFinishingMain(_error: ExpressionStateFinishError): boolean {
	return true;
}

export function checkNumberUsage(
	state: ExpressionState
): ExpressionStateFinishError[] {
	const seenStart: Set<number> = new Set();
	const seenInterm: Set<number> = new Set();
	const errors: ExpressionStateFinishError[] = [];

	function checkLine(line: ExpressionLine) {
		line.forEach((el) => {
			if (el.type === "start") {
				if (seenStart.has(el.index)) {
					const s = state.start[el.index]!;
					errors.push({
						code: "E_OVERUSED_NUMBER",
						message: "Starting number " + s + " is used too many times",
						el,
					});
				} else {
					seenStart.add(el.index);
				}
			} else if (el.type === "interm") {
				if (seenInterm.has(el.index)) {
					errors.push({
						code: "E_OVERUSED_NUMBER",
						message: "Intermediate number is used too many times",
						el,
					});
				} else {
					seenInterm.add(el.index);
					const intermLine = state.interm[el.index];
					if (intermLine) {
						checkLine(intermLine);
					}
				}
			}
		});
	}

	checkLine(state.main);

	state.start.forEach((s, i) => {
		if (!seenStart.has(i)) {
			errors.push({
				code: "E_UNUSED_NUMBER",
				message: "Starting number " + s + " is never used",
				el: {type: "start", index: i},
			});
		}
	});

	return errors;
}

function usesEnoughNumbersForInterm(state: ExpressionState): boolean {
	const numbersUsed = state.main.filter(
		(el) => el.type === "start" || el.type === "interm"
	);
	return numbersUsed.length > 1;
}

function getLineIntermIndices(line: ExpressionLine): number[] {
	return line.filter((el) => el.type === "interm").map((el: any) => el.index);
}

function getUnusedIntermIndices(state: ExpressionState): number[] {
	const seen: Set<number> = new Set();
	getLineIntermIndices(state.main).forEach((i) => seen.add(i));

	const unused: number[] = [];
	const n = state.interm.length;
	for (let intermIndex = n - 1; intermIndex >= 0; intermIndex -= 1) {
		if (seen.has(intermIndex)) {
			continue;
		}
		unused.push(intermIndex);
		getLineIntermIndices(state.interm[intermIndex]!).forEach((i) =>
			seen.add(i)
		);
	}
	return unused;
}

function getUsedOpsInTree(tree: ExpressionTree): ArithmeticOperator[] {
	if (tree.type === "op") {
		const ops: ArithmeticOperator[] = [...tree.ops];
		tree.terms.forEach((term) => {
			ops.push(...getUsedOpsInTree(term));
		});
		return ops;
	}
	return [];
}

function getUsedOps(
	state: ExpressionState,
	mainTree: ExpressionTree | null
): ArithmeticOperator[] {
	const ops: ArithmeticOperator[] = [];
	if (mainTree) {
		ops.push(...getUsedOpsInTree(mainTree));
	}
	getUnusedIntermIndices(state).forEach((intermIndex) => {
		const res = buildTreeFromStateIntermediate(state, intermIndex);
		if (res.value) {
			ops.push(...getUsedOpsInTree(res.value));
		}
	});
	return ops;
}

function getTooLongErrors(
	state: ExpressionState
): ExpressionStateFinishError[] {
	const errors: ExpressionStateFinishError[] = [];
	const counts = {
		"(": 0,
		")": 0,
		op: 0,
		num: 0,
	};
	const startCount = state.start.length;
	for (const el of state.main) {
		if (el.type === "op" && (el.op === "(" || el.op === ")")) {
			counts[el.op] += 1;
			if (counts[el.op] > startCount) {
				errors.push({
					code: "E_TOO_LONG",
					message: "Expression has too many elements",
					el,
				});
			}
		} else if (el.type === "op") {
			counts.op += 1;
			if (counts.op > startCount - 1) {
				errors.push({
					code: "E_TOO_LONG",
					message: "Expression has too many elements",
					el,
				});
			}
		} else {
			counts.num += 1;
			if (counts.op > startCount) {
				errors.push({
					code: "E_TOO_LONG",
					message: "Expression has too many elements",
					el,
				});
			}
		}
	}
	return errors;
}

function getNumberButtonStatesUnmemo(
	state: ExpressionState
): NumberButtonState[] {
	const buttons: NumberButtonState[] = state.start.map((_s, i) => ({
		state: "available",
		el: {type: "start", index: i},
	}));
	const intermPosTable: {[intermIndex: number]: number} = {};

	function processLine(
		line: ExpressionLine,
		usedState: NumberButtonState["state"]
	) {
		line.forEach((el) => {
			if (el.type === "start" && buttons[el.index]) {
				buttons[el.index]!.state = usedState;
			} else if (el.type === "interm") {
				const index = intermPosTable[el.index];
				if (index !== undefined && buttons[index]) {
					buttons[index]!.state = usedState;
				}
			}
		});
	}

	state.interm.forEach((intermLine, intermIndex) => {
		processLine(intermLine, "used");
		const intermPos = buttons.findIndex((b) => b.state === "used");
		if (intermPos > -1) {
			intermPosTable[intermIndex] = intermPos;
			if (buttons[intermPos]) {
				buttons[intermPos]!.state = "available";
				buttons[intermPos]!.el = {type: "interm", index: intermIndex};
			}
		}
	});
	processLine(state.main, "current");

	return buttons;
}

type Derived = {
	tree: ExpressionTree | null;
	usedAllNumbers: boolean;
	usedOps: ArithmeticOperator[];
	numberButtonStates: NumberButtonState[];
	evalValue: Rational | null;
	errors: ExpressionStateFinishError[];
	finishableInterm: boolean;
	finishableMain: boolean;
	finishErrors: ExpressionStateFinishError[];
};

// Memoization machinery
let _derivedMemoLastInput: ExpressionState | null = null;
let _derivedMemoLastReturn: Derived | null = null;

function getDerivedStateInfo(state: ExpressionState): Derived {
	if (_derivedMemoLastInput === state) {
		return _derivedMemoLastReturn!;
	}
	let derived: Derived;

	const treeRes = buildTreeFromStateMain(state);
	const tree = treeRes.value;
	const usedOps = getUsedOps(state, tree);
	const numberButtonStates = getNumberButtonStatesUnmemo(state);
	const usageErrors = checkNumberUsage(state);
	const usedAllNumbers = !usageErrors.length;
	const tooLongErrors = getTooLongErrors(state);

	if (treeRes.errors.length) {
		const errors = [...treeRes.errors, ...usageErrors, ...tooLongErrors];
		derived = {
			tree: treeRes.value,
			usedAllNumbers,
			usedOps,
			numberButtonStates,
			evalValue: null,
			errors,
			finishableInterm: false,
			finishableMain: false,
			finishErrors: errors,
		};
	} else if (!tree) {
		const errors: ExpressionStateFinishError[] = [
			{code: "E_UNKNOWN", message: "Failed to build expression tree"},
		];
		derived = {
			tree: null,
			usedAllNumbers,
			usedOps,
			numberButtonStates,
			evalValue: null,
			errors,
			finishableInterm: false,
			finishableMain: false,
			finishErrors: errors,
		};
	} else {
		const evalRes = evalTree(tree);
		const errors = [...evalRes.errors, ...usageErrors, ...tooLongErrors];
		const finishableMain = !errors.some(stopsFinishingMain);
		const finishableInterm =
			!finishableMain &&
			!state.rules.forbidParens &&
			usesEnoughNumbersForInterm(state) &&
			!errors.some(stopsFinishingInterm);

		const finishErrors: ExpressionStateFinishError[] = [];
		if (!usageErrors.length && state.rules.forbidParens) {
			finishErrors.push({
				code: "E_RULE_FORBIDDEN_PARENS",
				loc: {intermIndex: null, start: 0, end: state.main.length},
				message: `No parentheses or grouping allowed in this problem`,
			});
		}
		if (!usesEnoughNumbersForInterm(state)) {
			finishErrors.push({
				code: "E_NOT_ENOUGH_FOR_INTERM",
				message: "Not enough numbers to make an intermediate",
			});
		}
		finishErrors.push(...errors);

		derived = {
			tree,
			usedAllNumbers,
			usedOps,
			numberButtonStates,
			evalValue: evalRes.value,
			errors,
			finishableInterm,
			finishableMain,
			finishErrors,
		};
	}

	_derivedMemoLastInput = state;
	_derivedMemoLastReturn = derived;
	return derived;
}

export function getStateErrors(
	state: ExpressionState
): ExpressionStateFinishError[] {
	return getDerivedStateInfo(state).errors;
}

export function getErrorsForPartial(
	state: ExpressionState
): ExpressionStateFinishError[] {
	const derived = getDerivedStateInfo(state);
	return derived.errors.filter(
		(e) => !isErrorOkIfPartial(e, derived.usedAllNumbers)
	);
}

export function getFinishErrors(
	state: ExpressionState
): ExpressionStateFinishError[] {
	return getDerivedStateInfo(state).finishErrors;
}

export function canFinishInterm(state: ExpressionState): boolean {
	return getDerivedStateInfo(state).finishableInterm;
}

export function canFinishMain(state: ExpressionState): boolean {
	return getDerivedStateInfo(state).finishableMain;
}

export function hasUsedAllNumbers(state: ExpressionState): boolean {
	return getDerivedStateInfo(state).usedAllNumbers;
}

export function isEmpty(state: ExpressionState): boolean {
	return !state.main.length && !state.interm.length;
}

export function canFinishDivisionByZero(state: ExpressionState): boolean {
	const acceptedErrors = ["E_DIVIDE_BY_ZERO", "E_UNUSED_NUMBER"];
	const derivedState = getDerivedStateInfo(state);
	return (
		derivedState.finishErrors.length > 0 &&
		derivedState.finishErrors.every(({code}) => acceptedErrors.includes(code))
	);
}

export function isEqualsEnabled(state: ExpressionState): boolean | null {
	if (
		canFinishMain(state) ||
		canFinishInterm(state) ||
		canFinishDivisionByZero(state)
	) {
		return true;
	} else if (!state.main.length) {
		return false;
	} else if (state.rules.forbidParens) {
		return false;
	}
	return null;
}

export function isOpEnabled(
	state: ExpressionState,
	op: ExpressionOperator
): boolean {
	if (op === "(" || op === ")") {
		return !state.rules.forbidParens;
	}
	if (state.rules.forbidOps.includes(op)) {
		return false;
	}
	if (state.rules.singleOps) {
		const derived = getDerivedStateInfo(state);
		if (derived.usedOps.includes(op)) {
			return false;
		}
	}
	if (state.rules.opLimit) {
		const derived = getDerivedStateInfo(state);
		if (derived.usedOps.length >= state.rules.opLimit) {
			return false;
		}
	}
	return true;
}

export function pushStateElement(
	state: ExpressionState,
	el: ExpressionElement
): ExpressionState {
	return {
		...state,
		main: [...state.main, el],
	};
}

export function insertStateElement(
	state: ExpressionState,
	el: ExpressionElement,
	pos: number
): ExpressionState {
	pos = Math.max(0, Math.min(state.main.length, pos));
	const newMain = state.main.slice(0);
	newMain.splice(pos, 0, el);
	return {
		...state,
		main: newMain,
	};
}

export function pushStateElementAsAutoInterm(
	state: ExpressionState,
	el: ExpressionElement
): ExpressionState | null {
	if (el.type !== "op") {
		return null;
	} else if (!state.interm.length) {
		return null;
	}
	const numbersUsed = state.main.filter(
		(mainEl) => mainEl.type === "start" || mainEl.type === "interm"
	);
	if (numbersUsed.length) {
		return null;
	}
	const autoEl: ExpressionElement = {
		type: "interm",
		index: state.interm.length - 1,
	};
	return {
		...state,
		main: [...state.main, autoEl, el],
	};
}

export function pushStateIntermediate(state: ExpressionState): ExpressionState {
	return {
		...state,
		interm: [...state.interm, state.main],
		main: [],
	};
}

export function grabLine(
	state: ExpressionState,
	line: ExpressionLine
): ExpressionState {
	return {
		...state,
		interm: [],
		main: line,
	};
}

export function backspaceStateMain(state: ExpressionState): ExpressionState {
	if (!state.main.length) {
		return state;
	}
	return {
		...state,
		main: state.main.slice(0, -1),
	};
}

export function backspaceStateMainAtPos(
	state: ExpressionState,
	pos: number
): ExpressionState {
	if (!state.main.length) {
		return state;
	} else if (pos <= 0) {
		return state;
	} else if (pos >= state.main.length) {
		return backspaceStateMain(state);
	}
	return {
		...state,
		main: [...state.main.slice(0, pos - 1), ...state.main.slice(pos)],
	};
}

export function undoStateIntermediate(state: ExpressionState): ExpressionState {
	if (!state.interm.length || state.main.length) {
		return state;
	}
	return {
		...state,
		interm: state.interm.slice(0, -1),
		main: state.interm[state.interm.length - 1]!,
	};
}

export function getNumberButtonStates(
	state: ExpressionState
): NumberButtonState[] {
	const derived = getDerivedStateInfo(state);
	return derived.numberButtonStates;
}

export function getButtonIndexByChar(
	state: ExpressionState,
	char: string
): number {
	if (!/^[0-9]$/.test(char)) {
		return -1;
	}
	const numberButtonStates = getNumberButtonStates(state);
	const num = parseInt(char);

	const isWorkingIndex = (allowInterm: boolean, b: NumberButtonState) => {
		if (b.state !== "available") {
			return false;
		}
		if (b.el.type === "interm") {
			if (!allowInterm) {
				return false;
			}
			const intermRes = evalIntermediate(state, b.el.index);
			const intermValue = intermRes.value;
			if (intermValue && intermValue[0] === num && intermValue[1] === 1) {
				return true;
			}
		} else if (b.el.type === "start") {
			if (state.start[b.el.index] === num) {
				return true;
			}
		} else {
			assertNever(b.el);
		}
		return false;
	};

	const indexStart = numberButtonStates.findIndex((b) =>
		isWorkingIndex(false, b)
	);
	if (indexStart > -1) {
		return indexStart;
	}
	const indexInterm = numberButtonStates.findIndex((b) =>
		isWorkingIndex(true, b)
	);
	if (indexInterm > -1) {
		return indexInterm;
	}
	return -1;
}

type FinishOptions = {
	stripParens?: boolean;
};

export function getFinishedLine(
	state: ExpressionState,
	options?: FinishOptions
): ExpressionStateFinishResult {
	const {stripParens = false} = options || {};
	const derived = getDerivedStateInfo(state);
	if (!derived.tree) {
		return {
			value: {line: null, evalValue: null},
			errors: derived.errors,
		};
	}
	const line = buildLineFromTree(derived.tree, {stripParens});
	return {
		value: {line, evalValue: derived.evalValue},
		errors: derived.errors,
	};
}
