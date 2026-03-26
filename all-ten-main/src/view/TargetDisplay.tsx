/*
 * Target display that shows the status of which targets the student has hit in a 2-column layout.
 */

import React from "react";
import {observer} from "mobx-react-lite";
import {styled, css} from "../stitches.config";

import {ExpressionState} from "../expr/types";
import {TargetState} from "../state/AppState";
import {Problem} from "../state/Problem";

import AnimationHook from "./AnimationHook";
import ExpressionDisplay from "./ExpressionDisplay";
import {prettifySolution} from "../util/ProblemUtil";

export type Props = {
	problem: Problem;
	targets: TargetState[];
	onClick?: (index: number) => void;
	keySuffix?: string;
	compact?: boolean;
	animated?: boolean;
	solutions?: {[key: string]: string};
};

const Container = styled("div", {
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gridTemplateRows: "repeat(5, 30px)",
	gap: "4px",
	height: "100%",
	width: "100%",
	variants: {
		size: {
			large: {
				gridTemplateRows: "repeat(5, 40px)",
			},
			compact: {
				gridTemplateRows: "repeat(2, 50px)",
				gridTemplateColumns: "repeat(5, calc(50px))",
				gap: "5px",
				justifyContent: "center",
				alignItems: "center",
			},
		},
		fill: {
			solution: {
				backgroundColor: "$done",
				cursor: "pointer",
				transition: "background-color 0.2s ease-out",

				[`&:hover`]: {
					backgroundColor: "$doneHover",
				},
			},
			solutionNoClick: {
				backgroundColor: "$done",
			},
			impossible: {
				backgroundColor: "$impossible",
				fontSize: "12pt",
				textAlign: "center",
			},
		},
	},
});

const TargetRow = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	backgroundColor: "$disabled",
	borderRadius: "3px",
	fontSize: 16,

	variants: {
		fill: {
			solution: {
				backgroundColor: "$done",
				cursor: "pointer",
				transition: "background-color 0.2s ease-out",

				[`&:hover`]: {
					backgroundColor: "$doneHover",
				},
			},
			solutionNoClick: {
				backgroundColor: "$done",
			},
			impossible: {
				backgroundColor: "$impossible",
				fontSize: "12pt",
				textAlign: "center",
			},
		},
		compact: {
			true: {
				width: "100%",
				aspectRatio: "1/1",
				borderRadius: "12px",
			},
		},
	},
});

const targetSolutionBoxClassName = css({
	position: "relative",
	flex: "1 0 0",
});

const TargetSolutionBox = styled("div", {
	position: "relative",
	width: "100%",
	textAlign: "center",
	fontSize: "16px",
});

const TargetNumberContainer = styled("div", {
	height: "100%",
	aspectRatio: "1/1",
	borderLeft: "2px solid white",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	variants: {
		compact: {
			true: {
				borderLeft: "none",
			},
		},
	},
});

const TargetNumber = styled("div", {
	textAlign: "center",
	fontWeight: "bold",
	fontSize: 18,
	padding: 3,
	variants: {
		fill: {
			solution: {
				color: "$white",
			},
			solutionNoClick: {
				color: "$white",
			},
			impossible: {
				backgroundColor: "$impossible",
				textAlign: "center",
			},
		},
	},
});

function renderTargetEl(
	problem: Problem,
	target: TargetState,
	i: number,
	onClick?: (index: number) => void,
	keySuffix?: string,
	compact?: boolean,
	animated?: boolean,
	solutions?: {[target: string]: string}
): React.ReactNode {
	let fillVariant: undefined | "solution" | "solutionNoClick" | "impossible";
	let exprEl: React.ReactNode = null;

	if (target.solution) {
		fillVariant = onClick ? "solution" : "solutionNoClick";
		const exprState: ExpressionState = {
			start: problem.start,
			rules: problem.rules,
			main: target.solution,
			interm: [],
		};
		exprEl = <ExpressionDisplay state={exprState} color="white" size="small" />;
	} else if (solutions?.[target.number]) {
		exprEl = (
			<FauxExpressionDisplay>
				<FauxExpressionDisplayText>
					{prettifySolution(solutions[target.number] || "")}
				</FauxExpressionDisplayText>
			</FauxExpressionDisplay>
		);
	} else if (target.impossible) {
		fillVariant = "impossible";
		exprEl = "Impossible";
	}

	const realOnClick = onClick ? () => onClick(i) : () => {};

	return (
		<TargetRow
			key={i}
			fill={fillVariant}
			onClick={realOnClick}
			compact={compact}
		>
			{animated ? (
				<AnimationHook
					name={`targetExpr${i}${keySuffix || ""}`}
					outerClassName={targetSolutionBoxClassName()}
					leavingStyle={{zIndex: 1}}
				>
					<TargetSolutionBox>{!compact && exprEl}</TargetSolutionBox>
				</AnimationHook>
			) : (
				<TargetSolutionBox>{!compact && exprEl}</TargetSolutionBox>
			)}
			<TargetNumberContainer compact={compact}>
				<TargetNumber fill={fillVariant}>{target.number}</TargetNumber>
			</TargetNumberContainer>
		</TargetRow>
	);
}

const TargetDisplay: React.FC<Props> = function (props: Props) {
	const {problem, targets, onClick, keySuffix, compact, animated, solutions} =
		props;

	const els = [];

	if (compact) {
		for (const el of targets.map((t, i) =>
			renderTargetEl(
				problem,
				t,
				i,
				onClick,
				keySuffix,
				compact,
				animated,
				solutions
			)
		)) {
			els.push(el);
		}
	} else {
		const splitIndex = Math.ceil(targets.length / 2);
		const column1Targets = targets.slice(0, splitIndex);
		const column2Targets = targets.slice(splitIndex);
		const column1Els = column1Targets.map((t, i) =>
			renderTargetEl(
				problem,
				t,
				i,
				onClick,
				keySuffix,
				compact,
				animated,
				solutions
			)
		);
		const column2Els = column2Targets.map((t, i) =>
			renderTargetEl(
				problem,
				t,
				i + splitIndex,
				onClick,
				keySuffix,
				compact,
				animated,
				solutions
			)
		);
		for (let i = 0; i < Math.min(column1Els.length, column2Els.length); i++) {
			els.push(column1Els[i]);
			els.push(column2Els[i]);
		}
	}

	return <Container size={compact ? "compact" : undefined}>{els}</Container>;
};
export default observer(TargetDisplay);

/**
 * Target display that just renders strings instead of trying to render target elements.
 */
export type FauxProps = {
	userSolutions: string[];
	solutions?: {[key: string]: string};
};

const FauxExpressionDisplay = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	height: "1.2em",
	fontSize: "12pt",
});

const FauxExpressionDisplayText = styled("div", {
	textAlign: "center",
});

function renderFauxTargetEl(
	userSolution: string,
	i: number,
	problemSolutions: {[key: string]: string} | undefined = {}
): React.ReactNode {
	const keySuffix = "faux";
	let fillVariant: undefined | "solution" | "solutionNoClick" | "impossible";
	let exprEl: React.ReactNode;
	if (userSolution?.length) {
		fillVariant = "solutionNoClick";
		exprEl = (
			<FauxExpressionDisplay>
				<FauxExpressionDisplayText>{userSolution}</FauxExpressionDisplayText>
			</FauxExpressionDisplay>
		);
	} else {
		const strI = String(i);
		if (
			strI === "1" ||
			strI === "2" ||
			strI === "3" ||
			strI === "4" ||
			strI === "5" ||
			strI === "6" ||
			strI === "7" ||
			strI === "8" ||
			strI === "9" ||
			strI === "10"
		) {
			const solution = problemSolutions[strI];
			exprEl = (
				<FauxExpressionDisplay>
					<FauxExpressionDisplayText>
						{prettifySolution(solution || "")}
					</FauxExpressionDisplayText>
				</FauxExpressionDisplay>
			);
		}
	}
	return (
		<TargetRow key={i} fill={fillVariant}>
			<AnimationHook
				name={`targetExpr${i}${keySuffix}`}
				outerClassName={targetSolutionBoxClassName()}
				leavingStyle={{zIndex: 1}}
			>
				<TargetSolutionBox>{exprEl}</TargetSolutionBox>
			</AnimationHook>
			<TargetNumberContainer>
				<TargetNumber fill={fillVariant}>{i}</TargetNumber>
			</TargetNumberContainer>
		</TargetRow>
	);
}
export const FauxTargetDisplay: React.FC<FauxProps> = function (
	props: FauxProps
) {
	const {userSolutions, solutions} = props;

	const splitIndex = Math.ceil(userSolutions.length / 2);
	const els = [];
	const column1Els = userSolutions.slice(0, splitIndex).map((t, i) => {
		return renderFauxTargetEl(t, i + 1, solutions);
	});
	const column2Els = userSolutions.slice(splitIndex).map((t, i) => {
		return renderFauxTargetEl(t, i + splitIndex + 1, solutions);
	});
	for (let i = 0; i < Math.min(column1Els.length, column2Els.length); i++) {
		els.push(column1Els[i]);
		els.push(column2Els[i]);
	}

	return <Container>{els}</Container>;
};
