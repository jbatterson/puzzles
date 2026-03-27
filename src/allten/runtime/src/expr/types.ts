/**
 * Defines common expression types. See the README for more information on the
 * important ones.
 */

import {Rational} from "./Rational";
import {ArithmeticOperator, ExpressionOperator} from "./Operators";

export {Rational};
export {ArithmeticOperator, ExpressionOperator};

export type StartNumber = number;

//
// Line
//

export type ExpressionNumberElement =
	| {type: "start"; index: number}
	| {type: "interm"; index: number};

export type ExpressionElement =
	| {type: "op"; op: ExpressionOperator}
	| ExpressionNumberElement;

export type ExpressionLine = ExpressionElement[];

//
// State
//

export type ProblemRules = {
	forbidOps: ArithmeticOperator[];
	forbidParens: boolean;
	forbidConcat: boolean;
	singleOps: boolean;
	opLimit: number;
	impossible: number;
};

export type ExpressionState = {
	start: StartNumber[];
	rules: ProblemRules;
	interm: ExpressionLine[];
	main: ExpressionLine;
};

export type ExpressionStateLoc = {
	intermIndex: number | null;
	start: number;
	end: number;
};

export type ExpressionStateFinishResult = {
	value: {
		line: ExpressionLine | null;
		evalValue: Rational | null;
	};
	errors: ExpressionStateFinishError[];
};

//
// Tree
//

export type ExpressionTreeNumber = {
	type: "number";
	source: ExpressionNumberElement | null;
	number: Rational;
};

export type ExpressionTreeOp = {
	type: "op";
	source: ExpressionNumberElement | null;
	terms: ExpressionTree[];
	ops: ArithmeticOperator[];
};

export type ExpressionTree =
	| ExpressionTreeNumber
	| ExpressionTreeOp
	| {
			type: "concat";
			source: ExpressionNumberElement | null;
			terms: ExpressionTreeNumber[];
	  };

export type ExpressionTreeParseResult = {
	value: ExpressionTree | null;
	errors: ExpressionTreeParseError[];
};

//
// Eval
//

export type ExpressionEvalResult = {
	value: Rational | null;
	errors: ExpressionEvalError[];
};

//
// Error types
//

export type ExpressionUnknownError = {
	code: "E_UNKNOWN";
	message: string;
};

export type ExpressionStringToLineError =
	| ExpressionUnknownError
	| {
			code: "E_START_NO_INDEX";
			index: number;
			message: string;
	  }
	| {
			code: "E_INTERM_NO_INDEX";
			index: number;
			message: string;
	  }
	| {
			code: "E_INVALID_CHARACTER";
			index: number;
			message: string;
	  };

// In all of these, partial true means further inputs at the end can
// fix the issue.
export type ExpressionTreeParseError =
	| ExpressionUnknownError
	| {
			code: "E_INVALID_NUMBER_INDEX";
			loc: ExpressionStateLoc;
			message: string;
			partial?: boolean;
			el: ExpressionNumberElement;
	  }
	| {
			code: "E_INTERM_CYCLE";
			loc: ExpressionStateLoc;
			message: string;
			partial?: boolean;
			// The interm indices that formed a cycle
			intermIndices: number[];
	  }
	| {
			code: "E_UNCLOSED_PAREN";
			loc: ExpressionStateLoc;
			message: string;
			partial?: boolean;
	  }
	| {
			code: "E_UNOPENED_PAREN";
			loc: ExpressionStateLoc;
			message: string;
			partial?: boolean;
	  }
	| {
			code: "E_MISPLACED_OPERATOR";
			loc: ExpressionStateLoc;
			message: string;
			partial?: boolean;
			// begin: true means the operator began the expression. begin: false
			// means two operators were consecutive.
			begin: boolean;
	  }
	| {
			code: "E_NO_IMPLICIT_MULTIPLICATION";
			loc: ExpressionStateLoc;
			message: string;
			partial?: boolean;
	  }
	| {
			code: "E_EMPTY_EXPRESSION";
			loc: ExpressionStateLoc;
			message: string;
			partial?: boolean;
	  }
	| {
			code: "E_DANGLING_OPERATOR";
			loc: ExpressionStateLoc;
			message: string;
			partial?: boolean;
	  }
	| {
			code: "E_RULE_FORBIDDEN_OP";
			loc: ExpressionStateLoc;
			message: string;
			op: string;
			implicit: boolean;
	  }
	| {
			code: "E_RULE_FORBIDDEN_PARENS";
			loc: ExpressionStateLoc;
			message: string;
	  }
	| {
			code: "E_RULE_FORBIDDEN_CONCAT";
			loc: ExpressionStateLoc;
			message: string;
	  }
	| {
			code: "E_RULE_MULTIPLE_OPS";
			loc: ExpressionStateLoc;
			message: string;
			op: string;
	  }
	| {
			code: "E_RULE_OPS_OVER_LIMIT";
			loc: ExpressionStateLoc;
			message: string;
			limit: number;
	  };

export type ExpressionEvalError =
	| ExpressionTreeParseError
	| {
			code: "E_DIVIDE_BY_ZERO";
			message: string;
	  }
	| {
			code: "E_CONCAT_NON_DIGIT";
			message: string;
			value: Rational | null;
	  };

export type ExpressionStateFinishError =
	| ExpressionEvalError
	| {
			code: "E_TOO_LONG";
			message: string;
			el: ExpressionElement;
	  }
	| {
			code: "E_UNUSED_NUMBER";
			message: string;
			el: ExpressionNumberElement;
	  }
	| {
			code: "E_OVERUSED_NUMBER";
			message: string;
			el: ExpressionNumberElement;
	  }
	| {
			code: "E_NOT_ENOUGH_FOR_INTERM";
			message: string;
	  };
