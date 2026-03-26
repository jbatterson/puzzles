import React from "react";
import {TargetState} from "src/state/AppState";
import {pstShortStringifyForHumans} from "../util/Dates";
import {styled} from "../stitches.config";

export type Props = {
	style: "fraction" | "text";
	targets: TargetState[];
	problemDate: Date;
	hideIfEmpty?: boolean;
	size?: "large";
	color?: "done";
	margin?: "small";
	bold?: boolean;
	excited?: boolean;
};

const PERFECT_COPY = "TEN-tacular!";

export const ZERO_TO_TEN_STRINGS = [
	"",
	"ONE-derful",
	"TWO-riffic",
	"THREE-mendous",
	"FOUR-bulous",
	"FIVE-tastic",
	"SIX-traordinary",
	"SEVEN-sational",
	"EIGHT-stonishing",
	"NINE-omenal",
	"ALL TEN!",
];

const Container = styled("div", {
	fontSize: "20px",

	variants: {
		size: {
			large: {
				fontSize: "24px",
			},
		},
		color: {
			done: {
				color: "$done",
			},
		},
		margin: {
			small: {
				margin: ".5em 0",
			},
		},
	},
});

const ProgressDisplay: React.FC<Props> = function (props: Props) {
	const {
		style,
		targets,
		hideIfEmpty,
		size,
		color,
		margin,
		bold,
		excited,
		problemDate,
	} = props;

	const numCorrect = targets.filter((target) => !!target.solution).length;
	const numTotal = targets.length;

	if (hideIfEmpty && numCorrect === 0) {
		return <Container size={size} color={color} margin={margin} />;
	}

	if (style === "fraction") {
		return (
			<Container
				size={size}
				color={color}
				margin={margin}
			>{`${numCorrect}/${numTotal}`}</Container>
		);
	}

	// assume style === "text" by default
	const decoration = excited && numCorrect > 0 ? "!" : "";
	let text;
	if (numCorrect < ZERO_TO_TEN_STRINGS.length) {
		if (numCorrect <= 0) {
			text = pstShortStringifyForHumans(problemDate);
		} else {
			text = ZERO_TO_TEN_STRINGS[numCorrect] + decoration;
		}

		if (bold) {
			text = <b>{text}</b>;
		}
	} else {
		text = PERFECT_COPY;
	}
	return (
		<Container size={size} color={color} margin={margin}>
			{text}
		</Container>
	);
};

export default ProgressDisplay;
