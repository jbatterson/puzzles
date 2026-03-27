import React from "react";
import {styled} from "../stitches.config";
import {VariantProps} from "@stitches/react";

import {ExpressionState, ExpressionLine} from "../expr/types";
import {encloseLineInParens} from "../expr/Line";
import {evalIntermediate} from "../expr/Eval";
import * as Unicode from "../util/Unicode";
import {ColorProp, colorVariants, getIntermColor} from "./util/Colors";

import RationalDisplay from "./RationalDisplay";

export type Props = {
	state: ExpressionState;
	intermIndex?: number;
	evalInterm?: boolean;
	colorInterm?: boolean;
	size?: VariantProps<typeof Container>["size"];
	color?: ColorProp;
};

const Container = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	height: "1.2em",

	variants: {
		size: {
			small: {
				fontSize: "12pt",
			},
			medium: {
				fontSize: "18pt",
			},
			large: {
				fontSize: "24pt",
			},
		},
	},

	defaultVariants: {
		size: "medium",
	},
});

const InnerContainer = styled("div", {
	alignSelf: "stretch",
	position: "relative",

	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",

	variants: {
		forceSpace: {
			true: {
				minWidth: "0.4em",
			},
		},
	},
});

const Operator = styled("div", {
	marginLeft: 2,
	marginRight: 2,
	color: "$$color",

	variants: {
		noLeft: {
			true: {marginLeft: 0},
		},
		noRight: {
			true: {marginRight: 0},
		},
		color: colorVariants,
	},

	defaultVariants: {
		color: "main",
	},
});

function renderLine(props: Props, line: ExpressionLine): React.ReactNode[] {
	const {state, evalInterm, colorInterm, color} = props;
	return line.map((el, i) => {
		if (el.type === "start") {
			const number = state.start[el.index];
			if (number === undefined) {
				throw new Error("Invalid start index in line: " + el.index);
			}
			return <RationalDisplay key={i} number={number} color={color} />;
		} else if (el.type === "interm") {
			let intermLine = state.interm[el.index];
			if (intermLine === undefined) {
				throw new Error("Invalid interm index in line: " + el.index);
			}
			const intermColor = colorInterm ? getIntermColor(el.index) : color;
			if (evalInterm) {
				const evalRes = evalIntermediate(state, el.index);
				return (
					<RationalDisplay key={i} number={evalRes.value} color={intermColor} />
				);
			}
			intermLine = encloseLineInParens(intermLine);
			return renderLine({...props, color: intermColor}, intermLine);
		} else if (el.type === "op") {
			return (
				<Operator
					key={i}
					color={color}
					noLeft={el.op === ")"}
					noRight={el.op === "("}
				>
					{Unicode.convertOperator(el.op)}
				</Operator>
			);
		}
	});
}

/**
 * Convert * to the times symbol, / to the divide symbol that's a horizontal line with two dots, etc.
 */
export function renderOpsAsUnicode(s: string) {
	const EXPRESSION_OPERATORS = ["+", "-", "*", "/", "(", ")"];

	return s
		.split("")
		.map((c) =>
			EXPRESSION_OPERATORS.includes(c) ? Unicode.convertOperator(c) : c
		)
		.join("");
}

const ExpressionDisplay: React.FC<Props> = function (props: Props) {
	const {state, intermIndex, size} = props;

	let line: ExpressionLine = state.main;
	if (intermIndex !== undefined) {
		const maybeLine = state.interm[intermIndex];
		if (!maybeLine) {
			throw new Error("Invalid intermIndex prop " + intermIndex);
		}
		line = maybeLine;
	}

	const els: React.ReactNode[] = renderLine(props, line);
	const wrappedEls: React.ReactNode[] = els.map((el, i) => {
		return <InnerContainer key={i}>{el}</InnerContainer>;
	});

	return <Container size={size}>{wrappedEls}</Container>;
};
export default ExpressionDisplay;
