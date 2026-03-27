import {ExpressionNumberElement} from "../../expr/types";

const DEFAULT_OP_COLOR = "main";
const PAREN_COLOR = "main";
const EQUALS_COLOR = "mainLight";

export const colorVariants = {
	main: {
		$$color: "$colors$main",
		$$foreColor: "$colors$white",
		$$borderColor: "transparent",
		$$colorHover: "$colors$mainHover",
		$$foreColorHover: "$colors$whiteHover",
		$$borderColorHover: "transparent",
	},
	mainLight: {
		$$color: "$colors$mainLight",
		$$foreColor: "$colors$white",
		$$borderColor: "transparent",
		$$colorHover: "$colors$mainLightHover",
		$$foreColorHover: "$colors$whiteHover",
		$$borderColorHover: "transparent",
	},
	mainInverted: {
		$$color: "$colors$white",
		$$foreColor: "$colors$main",
		$$borderColor: "transparent",
		$$colorHover: "$colors$mainHover",
		$$foreColorHover: "$colors$whiteHover",
		$$borderColorHover: "transparent",
	},
	white: {
		$$color: "$colors$white",
		$$foreColor: "$colors$main",
		$$borderColor: "$colors$main",
		$$colorHover: "$colors$whiteHover",
		$$foreColorHover: "$colors$mainHover",
		$$borderColorHover: "$colors$mainHover",
	},
	start: {
		$$color: "$colors$start",
		$$foreColor: "$colors$white",
		$$borderColor: "transparent",
		$$colorHover: "$colors$startHover",
		$$foreColorHover: "$colors$whiteHover",
		$$borderColorHover: "transparent",
	},
	disabled: {
		$$color: "$colors$disabled",
		$$foreColor: "$colors$white",
		$$borderColor: "transparent",
		$$colorHover: "$colors$disabledHover",
		$$foreColorHover: "$colors$whiteHover",
		$$borderColorHover: "transparent",
	},
	interm1: {
		$$color: "$colors$interm1",
		$$foreColor: "$colors$white",
		$$borderColor: "transparent",
		$$colorHover: "$colors$interm1Hover",
		$$foreColorHover: "$colors$whiteHover",
		$$borderColorHover: "transparent",
	},
	interm2: {
		$$color: "$colors$interm2",
		$$foreColor: "$colors$white",
		$$borderColor: "transparent",
		$$colorHover: "$colors$interm2Hover",
		$$foreColorHover: "$colors$whiteHover",
		$$borderColorHover: "transparent",
	},
	done: {
		$$color: "$colors$done",
		$$foreColor: "$colors$white",
		$$borderColor: "transparent",
		$$colorHover: "$colors$doneHover",
		$$foreColorHover: "$colors$whiteHover",
		$$borderColorHover: "transparent",
	},
	tertiary: {
		$$color: "$colors$gray",
		$$foreColor: "$colors$gray",
		$$borderColor: "transparent",
		$$colorHover: "$colors$gray",
		$$foreColorHover: "$colors$whiteHover",
		$$borderColorHover: "transparent",
	},
	example: {
		$$color: "$colors$cyan",
		$$foreColor: "$colors$white",
		$$borderColor: "transparent",
		$$colorHover: "$colors$babyBlue",
		$$foreColorHover: "$colors$whiteHover",
		$$borderColorHover: "transparent",
	},
};

export type ColorProp = keyof typeof colorVariants;

export function getForeColor(color: ColorProp | undefined): ColorProp {
	color = color || "main";
	return colorVariants[color]["$$foreColor"].slice(8) as any;
}

export function getIntermColor(index: number): ColorProp {
	return "interm1";
}

export function getNumberColor(el: ExpressionNumberElement): ColorProp {
	if (el.type === "start") {
		return "start";
	}
	return getIntermColor(el.index);
}

export function getOpButtonColor(op: string): ColorProp {
	if (op === "(" || op === ")") {
		return PAREN_COLOR;
	} else if (op === "=") {
		return EQUALS_COLOR;
	} else {
		return DEFAULT_OP_COLOR;
	}
}
