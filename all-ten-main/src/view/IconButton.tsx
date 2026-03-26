import React from "react";
import {styled} from "../stitches.config";
import {VariantProps} from "@stitches/react";

import {Rational, ExpressionOperator} from "../expr/types";
import {isExpressionOperator} from "../expr/Operators";
import * as Unicode from "../util/Unicode";
import {ColorProp, colorVariants, getForeColor} from "./util/Colors";

import RationalDisplay from "./RationalDisplay";

type Icons =
	| ExpressionOperator
	| "="
	| "backspace"
	| "reset"
	| "share"
	| "share-mobile"
	| "help"
	| "close"
	| "chart"
	| "menu";

export type Sizes = VariantProps<typeof Container>["size"];

export type Props = {
	icon?: Icons;
	number?: number | Rational;
	text?: string;
	size?: Sizes;
	color?: ColorProp;
	invis?: boolean;
	disabled?: boolean;
	unclickable?: boolean;
	onClick?: () => void;
	noBackground?: boolean;
	inline?: boolean;
	zIndex?: number;
};

const TRANSITION_PROP = [
	"color",
	"background-color",
	"border-color",
	"transform",
]
	.map((prop) => {
		return `${prop} 0.2s ease-out`;
	})
	.join(", ");

const LineContainer = styled("div", {
	variants: {
		inline: {
			true: {
				display: "inline-block",
			},
		},
	},
});

const Container = styled("div", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",

	backgroundColor: "$$color",
	color: "$$foreColor",
	borderStyle: "solid",
	borderWidth: 2,
	borderColor: "$$borderColor",
	borderRadius: "100%",
	margin: 2,
	cursor: "pointer",
	aspectRatio: 1,
	width: 56,
	height: 56,
	fontSize: "24pt",

	// Text jumps by a pixel at scale = 1. So the initial transform is slightly
	// below 1 to avoid the jump.
	transform: `scale(0.999)`,
	transformOrigin: "center",
	transition: TRANSITION_PROP,

	variants: {
		noBackground: {
			true: {
				backgroundColor: "initial",
			},
		},
		size: {
			xsmall: {
				height: 26,
				width: 26,
				fontSize: "12px",
			},
			small: {
				height: 32,
				width: 32,
				fontSize: "14pt",
			},
			mediumXSmall: {
				height: 42,
				width: 42,
				fontSize: "16pt",
			},
			mediumSmall: {
				height: 48,
				width: 48,
				fontSize: "16pt",
			},
			mediumNum: {
				height: 56,
				width: 56,
				fontSize: "18pt",
			},
			medium: {
				height: 56,
				width: 56,
				fontSize: "24pt",
			},
			mediumLarge: {
				height: 64,
				width: 64,
				fontSize: "24px",
			},
			mediumLargeLarge: {
				height: 70,
				width: 70,
				fontSize: "24px",
			},
			large: {
				height: 80,
				width: 80,
				fontSize: "24pt",
			},
		},
		color: colorVariants,
		invis: {
			true: {
				// Set colors for transition purposes.
				color: "$white !important",
				backgroundColor: "$white !important",
				borderColor: "$white !important",
				zIndex: -1,
			},
		},
		disabled: {
			true: {
				cursor: "initial",
			},
			false: {
				[`&:hover`]: {
					color: "$$foreColorHover",
					backgroundColor: "$$colorHover",
					borderColor: "$$borderColorHover",
				},

				[`&:active`]: {
					color: "$$foreColorHover",
					backgroundColor: "$$colorHover",
					borderColor: "$$borderColorHover",

					transform: `scale(0.9)`,
				},
			},
		},
		inline: {
			true: {
				display: "inline-block",
			},
		},
		unclickable: {
			true: {
				pointerEvents: "none",
			},
		},
	},

	defaultVariants: {
		size: "medium",
		color: "main",
		disabled: false,
	},
});

const Icon = styled("div", {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	variants: {
		nudgeUp: {
			true: {
				position: "relative",
				top: "-0.06em",
			},
		},
		nudgeLeft: {
			true: {
				position: "relative",
				left: "-0.12em",
			},
		},
		nudgeRight: {
			true: {
				position: "relative",
				right: "-0.1em",
			},
		},
	},
});

const IconButton: React.FC<Props> = function (props: Props) {
	const {
		icon,
		number,
		text,
		size,
		color,
		invis,
		disabled,
		onClick,
		noBackground,
		inline,
		zIndex,
		unclickable,
	} = props;

	let label: React.ReactNode = "";
	if (icon && isExpressionOperator(icon)) {
		const nudgeUp = icon === "(" || icon === ")";
		const nudgeLeft = icon === "(";
		const nudgeRight = icon === ")";
		label = (
			<Icon nudgeUp={nudgeUp} nudgeLeft={nudgeLeft} nudgeRight={nudgeRight}>
				{Unicode.convertOperator(icon)}
			</Icon>
		);
	} else if (icon === "=") {
		label = (
			<Icon>
				<i className="fa-solid fa-equals" />
			</Icon>
		);
	} else if (icon === "reset") {
		label = (
			<Icon>
				<i className="fas fa-arrow-rotate-left fa-sm" />
			</Icon>
		);
	} else if (icon === "backspace") {
		label = (
			<Icon>
				<i className="fa-solid fa-delete-left fa-xs" />
			</Icon>
		);
	} else if (icon === "share-mobile" || icon === "share") {
		label = (
			<Icon>
				<i className="fa-solid fa-share-nodes" />
			</Icon>
		);
	} else if (icon === "help") {
		label = (
			<Icon>
				<i className="fas fa-question" />
			</Icon>
		);
	} else if (icon === "close") {
		label = (
			<Icon>
				<i className="fa-solid fa-xmark" />
			</Icon>
		);
	} else if (icon === "chart") {
		label = (
			<Icon>
				<i className="fas fa-chart-column" />
			</Icon>
		);
	} else if (icon === "menu") {
		label = (
			<Icon>
				<i className="fa-solid fa-bars fa-lg" />
			</Icon>
		);
	} else if (text !== undefined) {
		label = <div>{text}</div>;
	} else if (number !== undefined) {
		const labelColor = getForeColor(color);
		label = <RationalDisplay number={number} color={labelColor} />;
	}

	const button = (
		<Container
			color={color}
			size={size}
			invis={invis}
			disabled={disabled || invis}
			onClick={disabled ? undefined : onClick}
			noBackground={noBackground}
			style={{zIndex: zIndex}}
			unclickable={unclickable}
		>
			{label}
		</Container>
	);
	if (inline) {
		return (
			<LineContainer inline={inline} style={{zIndex: zIndex}}>
				{button}
			</LineContainer>
		);
	} else {
		return button;
	}
};
export default IconButton;
