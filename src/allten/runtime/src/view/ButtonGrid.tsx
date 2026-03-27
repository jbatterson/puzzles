import React from "react";
import {observer} from "mobx-react-lite";
import {styled} from "../stitches.config";

import {
	Rational,
	ExpressionState,
	ExpressionElement,
	ExpressionOperator,
} from "../expr/types";
import {isOpEnabled, getNumberButtonStates} from "../expr/State";
import {evalIntermediate} from "../expr/Eval";
import {getOpButtonColor, getNumberColor} from "./util/Colors";

import AnimationHook from "./AnimationHook";
import IconButton, {Sizes as IconButtonSizes} from "./IconButton";

const REL_NUDGE = 8;

export type Sizes = "small" | "medium" | "mediumLarge" | "large";
export type Props = {
	state: ExpressionState;
	equalsEnabled: boolean;
	onInsertElement: (el: ExpressionElement) => void;
	onEquals: () => void;
	onReset: () => void;
	onBackspace: () => void;
	undosHighlighted?: boolean;
	size?: Sizes;
};

const Column = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
});

const Row = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",

	variants: {
		align: {
			start: {
				alignItems: "flex-start",
			},
			end: {
				alignItems: "flex-end",
			},
		},
	},
});

const Nudge = styled("div", {
	position: "relative",
	variants: {
		up: {
			true: {
				top: -REL_NUDGE,
			},
		},
		down: {
			true: {
				top: REL_NUDGE,
			},
		},
		left: {
			true: {
				left: -REL_NUDGE,
			},
		},
		right: {
			true: {
				left: REL_NUDGE,
			},
		},
	},
});

const ButtonGrid: React.FC<Props> = function (props: Props) {
	const {
		state,
		equalsEnabled,
		onInsertElement,
		onEquals,
		onReset,
		onBackspace,
		undosHighlighted,
		size,
	} = props;

	const numberButtonStates = getNumberButtonStates(state);

	let opButtonSize: IconButtonSizes, mainButtonSize: IconButtonSizes;
	if (size === "small") {
		opButtonSize = "mediumXSmall";
		mainButtonSize = "medium";
	} else if (!size || size === "medium") {
		opButtonSize = "mediumSmall";
		mainButtonSize = "mediumLarge";
	} else if (size === "mediumLarge") {
		opButtonSize = "medium";
		mainButtonSize = "mediumLargeLarge";
	} else {
		opButtonSize = "medium";
		mainButtonSize = "large";
	}

	const numberButtonsPre = numberButtonStates.map((b, i) => {
		const number: number | Rational | null =
			b.el.type === "start"
				? state.start[i]!
				: evalIntermediate(state, b.el.index)!.value;

		const baseProps: any = {
			number,
			size: mainButtonSize,
		};

		if (b.state === "available") {
			const onClick = () => onInsertElement(b.el);
			const color: any = getNumberColor(b.el);
			return <IconButton {...baseProps} color={color} onClick={onClick} />;
		} else if (b.state === "current") {
			return <IconButton {...baseProps} color="disabled" disabled />;
		} else if (b.state === "used") {
			return <IconButton {...baseProps} invis />;
		}
		return null;
	});

	const numberButtons = numberButtonsPre.map((el, i) => {
		return <AnimationHook name={`numberButton${i}`}>{el}</AnimationHook>;
	});

	const makeOpButton = (op: ExpressionOperator) => {
		if (!isOpEnabled(state, op)) {
			return (
				<IconButton icon={op} color="disabled" disabled size={opButtonSize} />
			);
		}
		return (
			<IconButton
				icon={op}
				color={getOpButtonColor(op)}
				onClick={() => onInsertElement({type: "op", op})}
				size={opButtonSize}
			/>
		);
	};

	return (
		<Column>
			<Row align="end">
				{numberButtons[0] || null}
				<Nudge down>{makeOpButton("+")}</Nudge>
				{numberButtons[1] || null}
			</Row>
			<Row>
				{makeOpButton("(")}
				<Nudge right>{makeOpButton("*")}</Nudge>
				<IconButton size={opButtonSize} invis />
				<Nudge left>{makeOpButton("/")}</Nudge>
				{makeOpButton(")")}
			</Row>
			<Row align="start">
				{numberButtons[2] || null}
				<Nudge up>{makeOpButton("-")}</Nudge>
				{numberButtons[3] || null}
			</Row>
			<Row align="end">
				<IconButton
					icon="reset"
					onClick={() => onReset()}
					color={undosHighlighted ? "mainLight" : undefined}
					size={opButtonSize}
				/>
				<div style={{marginLeft: 12}} />
				<IconButton
					icon="="
					color={equalsEnabled ? getOpButtonColor("=") : "disabled"}
					disabled={!equalsEnabled}
					onClick={() => onEquals()}
					size={mainButtonSize}
				/>
				<div style={{marginLeft: 12}} />
				<IconButton
					icon="backspace"
					onClick={() => onBackspace()}
					color={undosHighlighted ? "mainLight" : undefined}
					size={opButtonSize}
				/>
			</Row>
		</Column>
	);
};
export default observer(ButtonGrid);
