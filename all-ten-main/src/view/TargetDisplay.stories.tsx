import React from "react";
import {Meta} from "@storybook/react";
import {styled} from "../stitches.config";

import {stringToLine} from "../expr/Line";
import {createProblem} from "../state/Problem";

import {TargetState} from "../state/AppState";

import TargetDisplay from "./TargetDisplay";

const DEFAULT_TARGETS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Container = styled("div", {
	width: 400,
	height: 200,
	marginLeft: 100,
	fontFamily: "sans-serif",
	color: "$main",
});

function makeTargetStates(
	targets: number[],
	lineStrings: Record<number, string>
): TargetState[] {
	return targets.map((t, i): TargetState => {
		if (lineStrings[t]?.toLowerCase() === "impossible") {
			return {
				number: t,
				impossible: true,
				solution: null,
				solutionState: null,
				solveOrder: null,
			};
		}
		const solution = lineStrings[t]
			? stringToLine(lineStrings[t]!).value
			: null;
		return {
			number: t,
			impossible: false,
			solution,
			solutionState: null,
			solveOrder: i + 1,
		} as TargetState;
	});
}

export const Blank = ({onClick}: any) => {
	const problem = createProblem([1, 2, 3, 4]);
	const targets = makeTargetStates(DEFAULT_TARGETS, {});
	return (
		<Container>
			<TargetDisplay problem={problem} targets={targets} onClick={onClick} />
		</Container>
	);
};

export const Partial = ({onClick}: any) => {
	const problem = createProblem([1, 2, 3, 4]);
	const targets = makeTargetStates(DEFAULT_TARGETS, {
		2: "s1 + s3 - s0 - s2",
		4: "impossible",
		5: "(s0 + s3)(s2 - s1)",
	});
	return (
		<Container>
			<TargetDisplay problem={problem} targets={targets} onClick={onClick} />
		</Container>
	);
};

export default {
	title: "Components/TargetDisplay",
	component: TargetDisplay,
	argTypes: {
		onClick: {action: "onClick"},
	},
} as Meta;
