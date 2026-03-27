import React from "react";
import {styled} from "../stitches.config";

import {Rational} from "../expr/types";
import {fromNumber} from "../expr/Rational";
import * as Unicode from "../util/Unicode";
import {ColorProp, colorVariants} from "./util/Colors";

export type Props = {
	number: number | Rational | null;
	color?: ColorProp;
};

const Text = styled("div", {
	variants: {
		frac: {
			true: {
				fontSize: "0.8em",
			},
		},
		neg: {
			true: {
				position: "relative",
				top: "-0.062em",
			},
		},
	},
});

const FracStackBox = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	marginLeft: "2px",
	marginRight: "2px",
});

const FracBar = styled("div", {
	height: "0.08em",
	alignSelf: "stretch",
});

const Container = styled("span", {
	display: "inline-flex",
	verticalAlign: "middle",
	flexDirection: "row",
	alignItems: "center",

	color: "$$color",

	[`& ${FracBar}`]: {
		backgroundColor: "$$color",
	},

	variants: {
		color: colorVariants,
	},
	defaultVariants: {
		color: "main",
	},
});

const RationalDisplay: React.FC<Props> = function (props: Props) {
	const {number, color} = props;

	const rational: Rational | null =
		typeof number === "number" ? fromNumber(number) : number;
	const negative = rational ? rational[0] < 0 : false;
	const numText = rational ? String(Math.abs(rational[0])) : "?";
	const denomText: string | null =
		rational && rational[1] !== 1 ? String(rational[1]) : null;

	let posPart: React.ReactNode;
	if (denomText === null) {
		posPart = <Text>{numText}</Text>;
	} else {
		posPart = (
			<FracStackBox>
				<Text frac>{numText}</Text>
				<FracBar />
				<Text frac>{denomText}</Text>
			</FracStackBox>
		);
	}
	const negSign = negative ? <Text neg>{Unicode.NEG}</Text> : null;
	return (
		<Container color={color}>
			{negSign}
			{posPart}
		</Container>
	);
};
export default RationalDisplay;
