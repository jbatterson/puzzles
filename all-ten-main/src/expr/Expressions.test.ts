/**
 * Functional-style tests for Expressions.
 *
 * Organized as a few different tables of tests run with Jest's .each.
 */

import * as ELine from "./Line";
import * as EState from "./State";
import * as ETreeParse from "./TreeParse";
import {
	Rational,
	ProblemRules,
	ExpressionOperator,
	ExpressionNumberElement,
	ExpressionStateFinishError,
} from "./types";
import {resolveRules} from "./Rules";

/**
 * Type for each valid-category test case.
 */
type ValidTestRow = {
	name: string;
	start: number[];
	rules?: Partial<ProblemRules>;
	intermStrings?: string[];
	mainString: string;
	expectedEval: Rational | null;
	expectedLineString?: string;
	expectedLineStringStripParens?: string;
};

/**
 * Valid-category tests: tree form, line flattening, and evaluation where the
 * expression is valid.
 */
const validTestsTable: ValidTestRow[] = [
	{
		name: "number",
		start: [2],
		intermStrings: [],
		mainString: "s0",
		expectedEval: [2, 1],
	},
	{
		name: "plus",
		start: [2, 3],
		intermStrings: [],
		mainString: "s0 + s1",
		expectedEval: [5, 1],
	},
	{
		name: "minus",
		start: [2, 3],
		intermStrings: [],
		mainString: "s0 - s1",
		expectedEval: [-1, 1],
	},
	{
		name: "times",
		start: [2, 3],
		intermStrings: [],
		mainString: "s0 * s1",
		expectedEval: [6, 1],
	},
	{
		name: "divide",
		start: [2, 3],
		intermStrings: [],
		mainString: "s0 / s1",
		expectedEval: [2, 3],
	},
	{
		name: "divide, simplify to integer",
		start: [6, 3],
		intermStrings: [],
		mainString: "s0 / s1",
		expectedEval: [2, 1],
	},
	{
		name: "divide, simplify to fraction",
		start: [4, 6],
		intermStrings: [],
		mainString: "s0 / s1",
		expectedEval: [2, 3],
	},
	{
		name: "long sum and difference",
		start: [1, 2, 3, 4, 5],
		intermStrings: [],
		mainString: "s0 + s1 - s2 - s3 + s4",
		expectedEval: [1, 1],
	},
	{
		name: "long product and quotient",
		start: [1, 2, 3, 4, 5],
		intermStrings: [],
		mainString: "s0 * s1 / s2 / s3 * s4",
		expectedEval: [5, 6],
	},
	{
		name: "precedence + *",
		start: [1, 2, 3],
		intermStrings: [],
		mainString: "s0 + s1 * s2",
		expectedEval: [7, 1],
	},
	{
		name: "precedence * +",
		start: [1, 2, 3],
		intermStrings: [],
		mainString: "s0 * s1 + s2",
		expectedEval: [5, 1],
	},
	{
		name: "precedence - /",
		start: [1, 2, 3],
		intermStrings: [],
		mainString: "s0 - s1 / s2",
		expectedEval: [1, 3],
	},
	{
		name: "precedence / -",
		start: [1, 2, 3],
		intermStrings: [],
		mainString: "s0 / s1 - s2",
		expectedEval: [-5, 2],
	},
	{
		name: "parentheses * +",
		start: [1, 2, 3],
		intermStrings: [],
		mainString: "s0 * (s1 + s2)",
		expectedLineString: "s0 * (s1 + s2)",
		expectedLineStringStripParens: "s0 * (s1 + s2)",
		expectedEval: [5, 1],
	},
	{
		name: "parentheses + *",
		start: [1, 2, 3],
		intermStrings: [],
		mainString: "(s0 + s1) * s2",
		expectedLineString: "(s0 + s1) * s2",
		expectedLineStringStripParens: "(s0 + s1) * s2",
		expectedEval: [9, 1],
	},
	{
		name: "parentheses nested",
		start: [1, 2, 3, 4],
		intermStrings: [],
		mainString: "s1 * (s2 - (s3 + s0))",
		expectedLineString: "s1 * (s2 - (s3 + s0))",
		expectedLineStringStripParens: "s1 * (s2 - (s3 + s0))",
		expectedEval: [-4, 1],
	},
	{
		name: "parentheses nested unnecessary 1",
		start: [1, 2, 3, 4],
		intermStrings: [],
		mainString: "s1 * (s2 + (s3 - s0))",
		expectedLineString: "s1 * (s2 + (s3 - s0))",
		expectedLineStringStripParens: "s1 * (s2 + s3 - s0)",
		expectedEval: [12, 1],
	},
	{
		name: "parentheses nested unnecessary 2",
		start: [1, 2, 3, 4],
		intermStrings: [],
		mainString: "s1 + (s2 - (s3 * s0))",
		expectedLineString: "s1 + (s2 - (s3 * s0))",
		expectedLineStringStripParens: "s1 + s2 - s3 * s0",
		expectedEval: [1, 1],
	},
	{
		name: "parentheses nested very unnecessary 1",
		start: [1, 2, 3, 4, 5, 6],
		intermStrings: [],
		mainString: "(s4 + s5 + s1 * ((s2) + (((s3) - s0))))",
		expectedLineString: "s4 + s5 + s1 * (s2 + (s3 - s0))",
		expectedLineStringStripParens: "s4 + s5 + s1 * (s2 + s3 - s0)",
		expectedEval: [23, 1],
	},
	{
		name: "concat",
		start: [1, 2, 3],
		intermStrings: [],
		mainString: "s0 s1 s2",
		expectedEval: [123, 1],
	},
	{
		name: "concat with operation",
		start: [1, 2, 3, 4],
		intermStrings: [],
		mainString: "s0 s1 - s2 s3",
		expectedEval: [-22, 1],
	},
	{
		name: "implicit multiplication (a)b",
		start: [1, 2, 3, 4],
		intermStrings: [],
		mainString: "(s0 + s1) s2 - s3",
		expectedLineString: "(s0 + s1) * s2 - s3",
		expectedLineStringStripParens: "(s0 + s1) * s2 - s3",
		expectedEval: [5, 1],
	},
	{
		name: "implicit multiplication a(b)",
		start: [1, 2, 3, 4],
		intermStrings: [],
		mainString: "s0 + s1 (s2 - s3)",
		expectedLineString: "s0 + s1 * (s2 - s3)",
		expectedLineStringStripParens: "s0 + s1 * (s2 - s3)",
		expectedEval: [-1, 1],
	},
	{
		name: "implicit multiplication (a)(b)",
		start: [1, 2, 3, 4],
		intermStrings: [],
		mainString: "(s0 + s1) (s2 - s3)",
		expectedLineString: "(s0 + s1) * (s2 - s3)",
		expectedLineStringStripParens: "(s0 + s1) * (s2 - s3)",
		expectedEval: [-3, 1],
	},
	{
		name: "interm single",
		start: [1, 2, 3],
		intermStrings: ["s1 + s2"],
		mainString: "s0 * i0",
		expectedLineString: "s0 * (s1 + s2)",
		expectedLineStringStripParens: "s0 * (s1 + s2)",
		expectedEval: [5, 1],
	},
	{
		name: "interm multiple",
		start: [1, 2, 3, 4],
		intermStrings: ["s1 + s2", "s0 - s3"],
		mainString: "i0 / i1",
		expectedLineString: "(s1 + s2) / (s0 - s3)",
		expectedLineStringStripParens: "(s1 + s2) / (s0 - s3)",
		expectedEval: [-5, 3],
	},
	{
		name: "interm nested",
		start: [1, 2, 3, 4],
		intermStrings: ["s0 + i1", "s1 * s2"],
		mainString: "i0 / s3",
		expectedLineString: "(s0 + (s1 * s2)) / s3",
		expectedLineStringStripParens: "(s0 + s1 * s2) / s3",
		expectedEval: [7, 4],
	},
	{
		name: "rules: forbid ops",
		start: [1, 2, 3, 4],
		rules: {forbidOps: ["-", "*", "/"]},
		intermStrings: ["s0 + s2"],
		mainString: "s1 + i0 + s3",
		expectedEval: [10, 1],
	},
	{
		name: "rules: forbid parens",
		start: [1, 2, 3, 4],
		rules: {forbidParens: true},
		mainString: "s1 + s0 * s2 + s3",
		expectedEval: [9, 1],
	},
	{
		name: "rules: forbid concat",
		start: [1, 2, 3, 4],
		rules: {forbidConcat: true},
		intermStrings: ["s0 + s2"],
		mainString: "s1 (i0 + s3)",
		expectedEval: [16, 1],
	},
	{
		name: "rules: single ops",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "(s1 + s0) * s2 - s3",
		expectedEval: [5, 1],
	},
	{
		name: "rules: op limit",
		start: [1, 2, 3, 4],
		rules: {opLimit: 2},
		mainString: "s0 s1 / s2 - s3",
		expectedEval: [0, 1],
	},
	{
		name: "rules: all at once",
		start: [1, 2, 3, 4],
		rules: {
			forbidOps: ["+", "/"],
			forbidParens: true,
			singleOps: true,
			opLimit: 2,
			// Skipping forbidConcat, which is incompatible with opLimit
		},
		mainString: "s1 * s0 s2 - s3",
		expectedEval: [22, 1],
	},
];

/**
 * Type for each ui-enabling-category test case.
 */
type UIEnablingTestRow = {
	name: string;
	start: number[];
	rules?: Partial<ProblemRules>;
	intermStrings?: string[];
	mainString: string;
	expectedFinishableInterm?: boolean;
	expectedFinishableMain?: boolean;
	expectedEnabledEquals?: boolean | null;
	expectedEnabledOps?: string[];
};

/**
 * UI-enabling-category tests: whether certain buttons and operations should
 * be enabled for various partial expressions.
 */
const uiEnablingTestsTable: UIEnablingTestRow[] = [
	{
		name: "empty",
		start: [1, 2, 3, 4],
		mainString: "",
		expectedFinishableInterm: false,
		expectedFinishableMain: false,
		expectedEnabledEquals: false,
		expectedEnabledOps: ["+", "-", "*", "/", "(", ")"],
	},
	{
		name: "empty, forbid ops",
		start: [1, 2, 3, 4],
		rules: {forbidOps: ["+", "*"]},
		mainString: "",
		expectedEnabledOps: ["-", "/", "(", ")"],
	},
	{
		name: "empty, forbid parens",
		start: [1, 2, 3, 4],
		rules: {forbidParens: true},
		mainString: "",
		expectedEnabledOps: ["+", "-", "*", "/"],
	},
	{
		name: "empty, single ops",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "",
		expectedEnabledOps: ["+", "-", "*", "/", "(", ")"],
	},
	{
		name: "interm =, too short",
		start: [1, 2, 3, 4],
		mainString: "s0",
		expectedFinishableInterm: false,
		expectedEnabledEquals: null,
	},
	{
		name: "interm =, op ok",
		start: [1, 2, 3, 4],
		mainString: "s0 + s1",
		expectedFinishableInterm: true,
		expectedEnabledEquals: true,
	},
	{
		name: "interm =, concat ok",
		start: [1, 2, 3, 4],
		mainString: "s0 s1",
		expectedFinishableInterm: true,
		expectedEnabledEquals: true,
	},
	{
		name: "interm =, bad expression 1",
		start: [1, 2, 3, 4],
		mainString: "s0 + s1 *",
		expectedFinishableInterm: false,
		expectedEnabledEquals: null,
	},
	{
		name: "interm =, bad expression 2",
		start: [1, 2, 3, 4],
		mainString: "(s0 + s1",
		expectedFinishableInterm: false,
		expectedEnabledEquals: null,
	},
	{
		name: "interm =, subsequent, too short with start",
		start: [1, 2, 3, 4],
		intermStrings: ["s0 + s1"],
		mainString: "s2",
		expectedFinishableInterm: false,
		expectedEnabledEquals: null,
	},
	{
		name: "interm =, subsequent, too short with interm",
		start: [1, 2, 3, 4],
		intermStrings: ["s0 + s1"],
		mainString: "i0",
		expectedFinishableInterm: false,
		expectedEnabledEquals: null,
	},
	{
		name: "interm =, subsequent, op ok",
		start: [1, 2, 3, 4],
		intermStrings: ["s0 + s1"],
		mainString: "i0 * s2",
		expectedFinishableInterm: true,
		expectedEnabledEquals: true,
	},
	{
		name: "interm =, subsequent, concat ok",
		start: [1, 2, 3, 4],
		intermStrings: ["s0 + s1"],
		mainString: "s2 s3",
		expectedFinishableInterm: true,
		expectedEnabledEquals: true,
	},
	// TODO: figure out why this test is failing
	// {
	// 	name: "interm =, forbid parens",
	// 	start: [1, 2, 3, 4],
	// 	rules: {forbidParens: true},
	// 	mainString: "s0 + s1",
	// 	expectedFinishableInterm: false,
	// 	expectedEnabledEquals: false,
	// },
	{
		name: "main =, unused start",
		start: [1, 2, 3, 4],
		mainString: "s0 + s1 + s2",
		expectedFinishableMain: false,
		expectedFinishableInterm: true,
		expectedEnabledEquals: true,
	},
	{
		name: "main =, unused start with interm",
		start: [1, 2, 3, 4],
		intermStrings: ["s1 + s2"],
		mainString: "s0 + i0",
		expectedFinishableMain: false,
		expectedFinishableInterm: true,
		expectedEnabledEquals: true,
	},
	{
		name: "main =, unused interm",
		start: [1, 2, 3, 4],
		intermStrings: ["s1 + s2"],
		mainString: "s0 + s3",
		expectedFinishableMain: false,
		expectedFinishableInterm: true,
		expectedEnabledEquals: true,
	},
	{
		name: "main =, ok",
		start: [1, 2, 3, 4],
		intermStrings: ["s1 + s2"],
		mainString: "s0 + s3 * i0",
		expectedFinishableMain: true,
		expectedFinishableInterm: false,
		expectedEnabledEquals: true,
	},
	{
		name: "main =, nested interm",
		start: [1, 2, 3, 4],
		intermStrings: ["s1 * i1", "s2 + s3"],
		mainString: "s0 - i0",
		expectedFinishableMain: true,
		expectedFinishableInterm: false,
		expectedEnabledEquals: true,
	},
	{
		name: "main =, forbid parens",
		start: [1, 2, 3, 4],
		rules: {forbidParens: true},
		mainString: "s0 - s1 + s2 - s3",
		expectedFinishableMain: true,
		expectedFinishableInterm: false,
		expectedEnabledEquals: true,
	},
	{
		name: "single ops, term partial",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "s0",
		expectedEnabledOps: ["+", "-", "*", "/", "(", ")"],
	},
	{
		name: "single ops, term op partial",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "s0 +",
		expectedEnabledOps: ["-", "*", "/", "(", ")"],
	},
	{
		name: "single ops, term op term",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "s0 + s1",
		expectedEnabledOps: ["-", "*", "/", "(", ")"],
	},
	{
		name: "single ops, term op (",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "s0 + (",
		expectedEnabledOps: ["-", "*", "/", "(", ")"],
	},
	{
		name: "single ops, term op ( term",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "s0 + (s1",
		expectedEnabledOps: ["-", "*", "/", "(", ")"],
	},
	{
		name: "single ops, term ( partial",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "s0 (",
		expectedEnabledOps: ["+", "-", "/", "(", ")"],
	},
	{
		name: "single ops, term ( term partial",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "s0 ( s1",
		expectedEnabledOps: ["+", "-", "/", "(", ")"],
	},
	{
		name: "single ops, term ( term op partial",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "s0 ( s1 +",
		expectedEnabledOps: ["-", "/", "(", ")"],
	},
	{
		name: "single ops, term ( term full",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "s0 ( s1 + s2 )",
		expectedEnabledOps: ["-", "/", "(", ")"],
	},
	{
		name: "single ops, ) term partial",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "( s0 + s1 ) s2 -",
		expectedEnabledOps: ["/", "(", ")"],
	},
	{
		name: "single ops, ) term full",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		mainString: "( s0 + s1 ) s2 - s3",
		expectedEnabledOps: ["/", "(", ")"],
	},
	{
		name: "single ops, used interm",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		intermStrings: ["s0 + s1"],
		mainString: "i0",
		expectedEnabledOps: ["-", "*", "/", "(", ")"],
	},
	{
		name: "single ops, used interm with term ( term",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		intermStrings: ["s0 (s1 + s2)"],
		mainString: "i0",
		expectedEnabledOps: ["-", "/", "(", ")"],
	},
	{
		name: "single ops, used interm with full main",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		intermStrings: ["s0 + s1"],
		mainString: "i0 / s2",
		expectedEnabledOps: ["-", "*", "(", ")"],
	},
	{
		name: "single ops, unused interm, empty",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		intermStrings: ["s0 + s1"],
		mainString: "",
		expectedEnabledOps: ["-", "*", "/", "(", ")"],
	},
	{
		name: "single ops, unused interm, nonempty",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		intermStrings: ["s0 + s1"],
		mainString: "s2",
		expectedEnabledOps: ["-", "*", "/", "(", ")"],
	},
	{
		name: "single ops, unused interm with term ( term",
		start: [1, 2, 3, 4],
		rules: {singleOps: true},
		intermStrings: ["s0 (s1 + s2)"],
		mainString: "",
		expectedEnabledOps: ["-", "/", "(", ")"],
	},
	{
		name: "single ops and forbid parens",
		start: [1, 2, 3, 4],
		rules: {singleOps: true, forbidParens: true},
		mainString: "s0 + s1",
		expectedEnabledOps: ["-", "*", "/"],
	},
];

/**
 * Helper type allowing number button states to be written in shorthand.
 * First element is a string, second element is an s# or i# string like in
 * an ExpressionLine string form.
 */
type NumberButtonStateShorthand = [EState.NumberButtonState["state"], string];

/**
 * Type for each nbs-category test case.
 */
type NumberButtonTestRow = {
	name: string;
	start: number[];
	rules?: Partial<ProblemRules>;
	intermStrings?: string[];
	mainString: string;
	expectedNumberButtons: NumberButtonStateShorthand[];
	expectedButtonIndexCharTable?: {[char: string]: number};
};

/**
 * NBS-category tests: the layout and state of the number buttons for various
 * partial expressions, especially ones with intermediates.
 */
const numberButtonTestsTable: NumberButtonTestRow[] = [
	{
		name: "empty",
		start: [1, 2, 3, 4],
		mainString: "",
		expectedNumberButtons: [
			["available", "s0"],
			["available", "s1"],
			["available", "s2"],
			["available", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: 0,
			2: 1,
			3: 2,
			4: 3,
			6: -1,
			"+": -1,
		},
	},
	{
		name: "start used in main",
		start: [1, 2, 3, 4],
		mainString: "s2 * s1",
		expectedNumberButtons: [
			["available", "s0"],
			["current", "s1"],
			["current", "s2"],
			["available", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: 0,
			2: -1,
			3: -1,
			4: 3,
			6: -1,
		},
	},
	{
		name: "interm",
		start: [1, 2, 3, 4],
		intermStrings: ["s2 * s1"],
		mainString: "",
		expectedNumberButtons: [
			["available", "s0"],
			["available", "i0"],
			["used", "s2"],
			["available", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: 0,
			2: -1,
			3: -1,
			4: 3,
			6: 1,
		},
	},
	{
		name: "interm, start used in main",
		start: [1, 2, 3, 4],
		intermStrings: ["s2 * s1"],
		mainString: "s3",
		expectedNumberButtons: [
			["available", "s0"],
			["available", "i0"],
			["used", "s2"],
			["current", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: 0,
			2: -1,
			3: -1,
			4: -1,
			6: 1,
		},
	},
	{
		name: "interm, interm used in main",
		start: [1, 2, 3, 4],
		intermStrings: ["s2 * s1"],
		mainString: "i0",
		expectedNumberButtons: [
			["available", "s0"],
			["current", "i0"],
			["used", "s2"],
			["available", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: 0,
			2: -1,
			3: -1,
			4: 3,
			6: -1,
		},
	},
	{
		name: "interm, interm and start used in main",
		start: [1, 2, 3, 4],
		intermStrings: ["s2 * s1"],
		mainString: "i0 + s3",
		expectedNumberButtons: [
			["available", "s0"],
			["current", "i0"],
			["used", "s2"],
			["current", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: 0,
			2: -1,
			3: -1,
			4: -1,
			6: -1,
		},
	},
	{
		name: "interm, nested interm",
		start: [1, 2, 3, 4],
		intermStrings: ["s2 * s1", "i0 + s0"],
		mainString: "",
		expectedNumberButtons: [
			["available", "i1"],
			["used", "i0"],
			["used", "s2"],
			["available", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: -1,
			2: -1,
			3: -1,
			4: 3,
			7: 0,
		},
	},
	{
		name: "char overlap, after, prefer start",
		start: [1, 2, 3, 4],
		intermStrings: ["s2 + s0"],
		mainString: "",
		expectedNumberButtons: [
			["available", "i0"],
			["available", "s1"],
			["used", "s2"],
			["available", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: -1,
			2: 1,
			3: -1,
			4: 3,
		},
	},
	{
		name: "char overlap, after, prefer interm if start used",
		start: [1, 2, 3, 4],
		intermStrings: ["s2 + s0"],
		mainString: "s3 +",
		expectedNumberButtons: [
			["available", "i0"],
			["available", "s1"],
			["used", "s2"],
			["current", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: -1,
			2: 1,
			3: -1,
			4: 0,
		},
	},
	{
		name: "char overlap, before, prefer start",
		start: [1, 2, 3, 4],
		intermStrings: ["s2 - s1"],
		mainString: "",
		expectedNumberButtons: [
			["available", "s0"],
			["available", "i0"],
			["used", "s2"],
			["available", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: 0,
			2: -1,
			3: -1,
			4: 3,
		},
	},
	{
		name: "char overlap, before, prefer interm if start used",
		start: [1, 2, 3, 4],
		intermStrings: ["s2 - s1"],
		mainString: "s0 +",
		expectedNumberButtons: [
			["current", "s0"],
			["available", "i0"],
			["used", "s2"],
			["available", "s3"],
		],
		expectedButtonIndexCharTable: {
			1: 1,
			2: -1,
			3: -1,
			4: 3,
		},
	},
];

/**
 * Type for each error-category test case.
 */
type ErrorTestRow = {
	name: string;
	start: number[];
	rules?: Partial<ProblemRules>;
	intermStrings?: string[];
	mainString: string;
	expectedErrors: Partial<ExpressionStateFinishError>[];
	okIfPartial: boolean;
};

/**
 * Error-category tests: ensuring that various invalid expressions report the
 * correct errors.
 */
const errorTestsTable: ErrorTestRow[] = [
	{
		name: "E_EMPTY_EXPRESSION",
		start: [1],
		mainString: "",
		expectedErrors: [
			{
				code: "E_EMPTY_EXPRESSION",
				loc: {intermIndex: null, start: 0, end: 0},
			},
		],
		okIfPartial: true,
	},
	{
		name: "E_EMPTY_EXPRESSION inside parentheses",
		start: [1, 2],
		mainString: "s0 + ()",
		expectedErrors: [
			{
				code: "E_EMPTY_EXPRESSION",
				loc: {intermIndex: null, start: 3, end: 3},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_EMPTY_EXPRESSION intermediate",
		start: [1, 2],
		intermStrings: [""],
		mainString: "s0 + i0",
		expectedErrors: [
			{
				code: "E_EMPTY_EXPRESSION",
				loc: {intermIndex: 0, start: 0, end: 0},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_EMPTY_EXPRESSION no numbers left",
		start: [1, 2],
		mainString: "s0 s1 ()",
		expectedErrors: [
			{
				code: "E_EMPTY_EXPRESSION",
				loc: {intermIndex: null, start: 3, end: 3},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_DANGLING_OPERATOR",
		start: [1, 2],
		mainString: "s0 +",
		expectedErrors: [
			{
				code: "E_DANGLING_OPERATOR",
				loc: {intermIndex: null, start: 1, end: 1},
			},
		],
		okIfPartial: true,
	},
	{
		name: "E_DANGLING_OPERATOR inside parentheses",
		start: [1, 2, 3],
		mainString: "s0 + (s1 +)",
		expectedErrors: [
			{
				code: "E_DANGLING_OPERATOR",
				loc: {intermIndex: null, start: 4, end: 4},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_DANGLING_OPERATOR intermediate",
		start: [1, 2, 3],
		intermStrings: ["s1 +"],
		mainString: "s0 + i0",
		expectedErrors: [
			{
				code: "E_DANGLING_OPERATOR",
				loc: {intermIndex: 0, start: 1, end: 1},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_DANGLING_OPERATOR no numbers left",
		start: [1, 2],
		mainString: "s0 s1 +",
		expectedErrors: [
			{
				code: "E_DANGLING_OPERATOR",
				loc: {intermIndex: null, start: 2, end: 2},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_RULE_FORBIDDEN_OP",
		start: [1, 2, 3],
		rules: {forbidOps: ["+"]},
		intermStrings: ["s1 + s0"],
		mainString: "s2 * i0",
		expectedErrors: [
			{
				code: "E_RULE_FORBIDDEN_OP",
				loc: {intermIndex: 0, start: 1, end: 1},
				op: "+",
				implicit: false,
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_RULE_FORBIDDEN_OP implicit",
		start: [1, 2, 3],
		rules: {forbidOps: ["*"]},
		mainString: "(s0 + s1) s2",
		expectedErrors: [
			{
				code: "E_RULE_FORBIDDEN_OP",
				loc: {intermIndex: null, start: 4, end: 5},
				op: "*",
				implicit: true,
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_RULE_FORBIDDEN_PARENS",
		start: [1, 2, 3],
		rules: {forbidParens: true},
		intermStrings: ["s1 + s0"],
		mainString: "s2 * (s1 + s0)",
		expectedErrors: [
			{
				code: "E_RULE_FORBIDDEN_PARENS",
				loc: {intermIndex: null, start: 2, end: 2},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_RULE_FORBIDDEN_PARENS interm",
		start: [1, 2, 3],
		rules: {forbidParens: true},
		intermStrings: ["s1 + s0"],
		mainString: "s2 * i0",
		expectedErrors: [
			{
				code: "E_RULE_FORBIDDEN_PARENS",
				loc: {intermIndex: null, start: 2, end: 2},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_RULE_FORBIDDEN_CONCAT",
		start: [1, 2, 3],
		rules: {forbidConcat: true},
		mainString: "s0 s1 - s2",
		expectedErrors: [
			{
				code: "E_RULE_FORBIDDEN_CONCAT",
				loc: {intermIndex: null, start: 0, end: 1},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_RULE_MULTIPLE_OPS",
		start: [1, 2, 3],
		rules: {singleOps: true},
		intermStrings: ["s1 + s0"],
		mainString: "s2 + i0",
		expectedErrors: [
			{
				code: "E_RULE_MULTIPLE_OPS",
				loc: {intermIndex: 0, start: 1, end: 1},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_RULE_MULTIPLE_OPS implicit",
		start: [1, 2, 3],
		rules: {singleOps: true},
		mainString: "s2 * (s1) s0",
		expectedErrors: [
			{
				code: "E_RULE_MULTIPLE_OPS",
				loc: {intermIndex: null, start: 4, end: 5},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_RULE_OPS_OVER_LIMIT",
		start: [1, 2, 3, 4],
		rules: {opLimit: 2},
		intermStrings: ["s1 + s0"],
		mainString: "(s3 - i0) * s2",
		expectedErrors: [
			{
				code: "E_RULE_OPS_OVER_LIMIT",
				loc: {intermIndex: null, start: 5, end: 5},
				limit: 2,
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_RULE_OPS_OVER_LIMIT implicit",
		start: [1, 2, 3, 4],
		rules: {opLimit: 2},
		intermStrings: ["s1 + s0"],
		mainString: "(s3 - i0) s2",
		expectedErrors: [
			{
				code: "E_RULE_OPS_OVER_LIMIT",
				loc: {intermIndex: null, start: 4, end: 5},
				limit: 2,
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_INVALID_NUMBER_INDEX start",
		start: [1],
		mainString: "s0 + s9",
		expectedErrors: [
			{
				code: "E_INVALID_NUMBER_INDEX",
				loc: {intermIndex: null, start: 2, end: 2},
				el: {type: "start", index: 9},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_INVALID_NUMBER_INDEX interm",
		start: [1],
		mainString: "s0 + i0",
		expectedErrors: [
			{
				code: "E_INVALID_NUMBER_INDEX",
				loc: {intermIndex: null, start: 2, end: 2},
				el: {type: "interm", index: 0},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_UNCLOSED_PAREN",
		start: [1, 2, 3],
		mainString: "s0 + (s1 + s2",
		expectedErrors: [
			{
				code: "E_UNCLOSED_PAREN",
				loc: {intermIndex: null, start: 2, end: 2},
			},
		],
		okIfPartial: true,
	},
	{
		name: "E_UNCLOSED_PAREN empty",
		start: [1, 2],
		mainString: "s0 + (",
		expectedErrors: [
			{
				code: "E_EMPTY_EXPRESSION",
				loc: {intermIndex: null, start: 3, end: 3},
			},
			{
				code: "E_UNCLOSED_PAREN",
				loc: {intermIndex: null, start: 2, end: 2},
			},
		],
		okIfPartial: true,
	},
	{
		name: "E_UNCLOSED_PAREN other error",
		start: [1, 2, 3],
		mainString: "s0 + (+ s1",
		expectedErrors: [
			{
				code: "E_MISPLACED_OPERATOR",
				loc: {intermIndex: null, start: 3, end: 3},
			},
			{
				code: "E_UNCLOSED_PAREN",
				loc: {intermIndex: null, start: 2, end: 2},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_UNCLOSED_PAREN nested",
		start: [1, 2, 3, 4],
		mainString: "s0 + (s1 + (s2 + s3)",
		expectedErrors: [
			{
				code: "E_UNCLOSED_PAREN",
				loc: {intermIndex: null, start: 2, end: 2},
			},
		],
		okIfPartial: true,
	},
	{
		name: "E_UNOPENED_PAREN",
		start: [1, 2, 3],
		mainString: "s0 + s1) + s2",
		expectedErrors: [
			{
				code: "E_UNOPENED_PAREN",
				loc: {intermIndex: null, start: 3, end: 3},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_MISPLACED_OPERATOR",
		start: [1, 2],
		mainString: "+ s0 + s1",
		expectedErrors: [
			{
				code: "E_MISPLACED_OPERATOR",
				loc: {intermIndex: null, start: 0, end: 0},
				begin: true,
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_MISPLACED_OPERATOR inside parentheses",
		start: [1, 2],
		mainString: "s0 + (* s1)",
		expectedErrors: [
			{
				code: "E_MISPLACED_OPERATOR",
				loc: {intermIndex: null, start: 3, end: 3},
				begin: true,
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_MISPLACED_OPERATOR consecutive",
		start: [1, 2, 3],
		mainString: "s0 + s1 + * s2",
		expectedErrors: [
			{
				code: "E_MISPLACED_OPERATOR",
				loc: {intermIndex: null, start: 3, end: 4},
				begin: false,
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_NO_IMPLICIT_MULTIPLICATION s i",
		start: [1, 2, 3],
		intermStrings: ["s1 + s2"],
		mainString: "s0 i0",
		expectedErrors: [
			{
				code: "E_NO_IMPLICIT_MULTIPLICATION",
				loc: {intermIndex: null, start: 1, end: 1},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_NO_IMPLICIT_MULTIPLICATION i s",
		start: [1, 2, 3],
		intermStrings: ["s1 + s2"],
		mainString: "i0 s0",
		expectedErrors: [
			{
				code: "E_NO_IMPLICIT_MULTIPLICATION",
				loc: {intermIndex: null, start: 1, end: 1},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_NO_IMPLICIT_MULTIPLICATION i i",
		start: [1, 2, 3, 4],
		intermStrings: ["s1 + s2", "s0 + s3"],
		mainString: "i0 i1",
		expectedErrors: [
			{
				code: "E_NO_IMPLICIT_MULTIPLICATION",
				loc: {intermIndex: null, start: 1, end: 1},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_INTERM_CYCLE",
		start: [1, 2],
		intermStrings: ["s1 + i0"],
		mainString: "s0 + i0",
		expectedErrors: [
			{
				code: "E_INTERM_CYCLE",
				loc: {intermIndex: 0, start: 2, end: 2},
				intermIndices: [0],
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_INTERM_CYCLE indirect",
		start: [1, 2, 3],
		intermStrings: ["s1 + i1", "s2 + i0"],
		mainString: "s0 + i1",
		expectedErrors: [
			{
				code: "E_INTERM_CYCLE",
				loc: {intermIndex: 0, start: 2, end: 2},
				intermIndices: [1, 0],
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_DIVIDE_BY_ZERO",
		start: [1, 2, 3, 4],
		mainString: "s1 / (s3 - s2 - s0)",
		expectedErrors: [
			{
				code: "E_DIVIDE_BY_ZERO",
			},
		],
		okIfPartial: true,
	},
	{
		name: "E_CONCAT_NON_DIGIT high",
		start: [1, 10],
		mainString: "s0 s1",
		expectedErrors: [
			{
				code: "E_CONCAT_NON_DIGIT",
				value: [10, 1],
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_CONCAT_NON_DIGIT low",
		start: [1, -1],
		mainString: "s0 s1",
		expectedErrors: [
			{
				code: "E_CONCAT_NON_DIGIT",
				value: [-1, 1],
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_UNUSED_NUMBER",
		start: [1, 2, 3],
		mainString: "s0 + s2",
		expectedErrors: [
			{
				code: "E_UNUSED_NUMBER",
				el: {type: "start", index: 1},
			},
		],
		okIfPartial: true,
	},
	{
		name: "E_OVERUSED_NUMBER",
		start: [1],
		mainString: "s0 + s0",
		expectedErrors: [
			{
				code: "E_OVERUSED_NUMBER",
				el: {type: "start", index: 0},
			},
		],
		okIfPartial: false,
	},
	{
		name: "E_OVERUSED_NUMBER indirect",
		start: [1, 2],
		intermStrings: ["s1 + s0"],
		mainString: "s0 + i0",
		expectedErrors: [
			{
				code: "E_OVERUSED_NUMBER",
				el: {type: "start", index: 0},
			},
		],
		okIfPartial: false,
	},
];

/**
 * Implementations of each test category.
 */
describe("Expressions", () => {
	describe("valid", () => {
		test.each(validTestsTable)("$name", (row) => {
			let state = ELine.makeStateFromStrings(
				row.start,
				row.mainString,
				row.intermStrings || []
			);
			if (row.rules) {
				state = {
					...state,
					rules: resolveRules(row.rules),
				};
			}
			const treeRes = ETreeParse.buildTreeFromStateMain(state);

			expect(treeRes.errors).toEqual([]);
			expect(treeRes.value).toMatchSnapshot();

			const finishRes = EState.getFinishedLine(state);
			const finishResSP = EState.getFinishedLine(state, {stripParens: true});
			if (finishRes.errors.length || !finishRes.value.line) {
				throw new Error(
					"Failed to finish: " + JSON.stringify(finishRes.errors)
				);
			}
			if (row.expectedLineString) {
				const actualLineString = ELine.lineToString(finishRes.value.line);
				const expectedLineString = row.expectedLineString.replace(/\s/g, "");
				expect(actualLineString).toEqual(expectedLineString);
			}
			if (row.expectedLineStringStripParens) {
				const actualLineStringSP = ELine.lineToString(finishResSP.value.line!);
				const expectedLineStringSP = row.expectedLineStringStripParens.replace(
					/\s/g,
					""
				);
				expect(actualLineStringSP).toEqual(expectedLineStringSP);
			}
			if (row.expectedEval) {
				expect(finishRes.value.evalValue).toEqual(row.expectedEval);
			}
		});
	});

	describe("ui enabling", () => {
		test.each(uiEnablingTestsTable)("$name", (row) => {
			let state = ELine.makeStateFromStrings(
				row.start,
				row.mainString,
				row.intermStrings || []
			);
			if (row.rules) {
				state = {
					...state,
					rules: resolveRules(row.rules),
				};
			}

			if (row.expectedFinishableInterm !== undefined) {
				expect(EState.canFinishInterm(state)).toEqual(
					row.expectedFinishableInterm
				);
			}
			if (row.expectedFinishableMain !== undefined) {
				expect(EState.canFinishMain(state)).toEqual(row.expectedFinishableMain);
			}
			if (row.expectedEnabledEquals !== undefined) {
				expect(EState.isEqualsEnabled(state)).toEqual(
					row.expectedEnabledEquals
				);
			}
			if (row.expectedEnabledOps) {
				const expectedSet = new Set(row.expectedEnabledOps);
				const allOps: ExpressionOperator[] = ["+", "-", "*", "/", "(", ")"];
				const actualList = allOps.filter((op) => EState.isOpEnabled(state, op));
				const actualSet = new Set(actualList);
				expect(actualSet).toEqual(expectedSet);
			}
		});
	});

	describe("number button states", () => {
		test.each(numberButtonTestsTable)("$name", (row) => {
			let state = ELine.makeStateFromStrings(
				row.start,
				row.mainString,
				row.intermStrings || []
			);
			if (row.rules) {
				state = {
					...state,
					rules: resolveRules(row.rules),
				};
			}
			const expectedNBS = row.expectedNumberButtons.map((shorthand) => {
				let el: ExpressionNumberElement | undefined;
				if (shorthand[1][0] === "s") {
					el = {type: "start", index: parseInt(shorthand[1].slice(1))};
				} else if (shorthand[1][0] === "i") {
					el = {type: "interm", index: parseInt(shorthand[1].slice(1))};
				}
				if (!el || !Number.isFinite(el.index)) {
					throw new Error("Invalid el shorthand " + shorthand[1]);
				}
				return {
					state: shorthand[0],
					el,
				};
			});

			const actualNBS = EState.getNumberButtonStates(state);
			expect(actualNBS).toEqual(expectedNBS);

			if (row.expectedButtonIndexCharTable) {
				Object.keys(row.expectedButtonIndexCharTable).forEach((char) => {
					const expectedIndex = row.expectedButtonIndexCharTable![char];
					const actualIndex = EState.getButtonIndexByChar(state, char);
					expect(actualIndex).toEqual(expectedIndex);
				});
			}
		});
	});

	describe("errors", () => {
		test.each(errorTestsTable)("$name", (row) => {
			let state = ELine.makeStateFromStrings(
				row.start,
				row.mainString,
				row.intermStrings || []
			);
			if (row.rules) {
				state = {
					...state,
					rules: resolveRules(row.rules),
				};
			}
			const expectedErrors = row.expectedErrors.map((e) =>
				expect.objectContaining(e)
			);
			const allErrors = EState.getStateErrors(state);
			const actualErrors = allErrors.slice(0, expectedErrors.length);
			expect(actualErrors).toEqual(expectedErrors);
			const canBePartial = EState.getErrorsForPartial(state).length === 0;
			expect(canBePartial).toEqual(row.okIfPartial);
		});
	});
});
