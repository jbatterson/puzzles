import React from "react";
import {observer} from "mobx-react-lite";
import {styled} from "../stitches.config";

import {Rational, ExpressionLine, ExpressionState} from "../expr/types";
import {stringToLine} from "../expr/Line";
import {resolveRules} from "../expr/Rules";
import {TargetState} from "../state/AppState";
import {Problem} from "../state/Problem";

import {TARGET_DISPLAY_HEIGHT} from "./util/Constants";
import IconButton from "./IconButton";
import TargetDisplay from "./TargetDisplay";
import ExpressionDisplay from "./ExpressionDisplay";
import SharedModalShell from "../../../../shared/SharedModalShell.jsx"; // boundary-ok: pure React, no Stitches/MobX, React 17 compatible
import {MODAL_INTENTS} from "@shared-contracts/modalIntents.js";
import {CTA_LABELS} from "@shared-contracts/ctaLabels.js";

export type Props = {
	hideHelp: () => void;
	show: boolean;
};

import {
	Title,
	Container,
	Space,
	Paragraph,
	Aside,
	ExpressionContainer,
	ThreeColumnContainer,
} from "./util/TextContainers";

const TargetDisplayContainer = styled("div", {
	height: TARGET_DISPLAY_HEIGHT,
	margin: "10px 0",
	padding: 0,
});

const IconButtonContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	marginTop: 4,
	marginBottom: 4,
});

const WalkthroughContainer = styled("div", {
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

const Walkthrough = styled("img", {
	maxWidth: "min(60%, 300px)",
	aspectRatio: "auto",
});

function stringToLineWithLog(s: string): ExpressionLine | null {
	const lineRes = stringToLine(s);
	if (lineRes.errors.length) {
		console.warn("Broken instructions line string", {
			string: s,
			errors: lineRes.errors,
		});
	}
	return lineRes.value;
}

const Instructions: React.FC<Props> = function (props: Props) {
	const {hideHelp, show} = props;

	const sampleProblemTarget: Problem = {
		start: [1, 2, 3, 4],
		targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		rules: resolveRules(),
	};
	const sampleTargetSolutions = [
		"(s3 - s2) / (s1 - s0)",
		"s2 - s3 / s1 + s0",
		"s0 + (s3 + s1) / s2",
		"s0 s3 / s1 - s2",
		"s3 + s2 / (s0 + s1)",
		"s1 s3 / (s2 + s0)",
		"s3 + s2 * (s1 - s0)",
		"s2 s1 / s3 * s0",
		"s2 * (s3 / s1 + s0)",
		"s0 + s1 + s2 + s3",
	];

	const sampleTargetStates: TargetState[] = sampleTargetSolutions.map(
		(s, i) => {
			const line = stringToLineWithLog(s);
			return {
				number: i + 1,
				impossible: false,
				solution: line,
				solutionState: null,
				solveOrder: null,
			};
		}
	);

	const sampleExprState1: ExpressionState = {
		start: [1, 2, 3, 4],
		rules: resolveRules(),
		main: stringToLineWithLog("s3 + s2 * (s1 - s0)") || [],
		interm: [],
	};

	const sampleExprState2: ExpressionState = {
		start: [12, 3, 0, 0],
		rules: resolveRules(),
		main: stringToLineWithLog("s0 / s1") || [],
		interm: [],
	};

	const sampleExprState3: ExpressionState = {
		start: [3, 4, 0, 0],
		rules: resolveRules(),
		main: stringToLineWithLog("s0 - s1") || [],
		interm: [],
	};

	const sampleExprState4: ExpressionState = {
		start: [8, 3, 0, 0],
		rules: resolveRules(),
		main: stringToLineWithLog("s0 / s1") || [],
		interm: [],
	};

	const sampleExprResult1 = 4;
	const sampleExprResult2 = -1;
	const sampleExprResult3: Rational = [8, 3];

	return (
		<SharedModalShell
			show={show}
			onClose={hideHelp}
			intent={MODAL_INTENTS.INSTRUCTIONS}
		>
			<Container>
				<Space />
				<Title>How to Play</Title>
				<Paragraph bold>
					Use all four numbers once each to make 1 through 10 using the given
					operations.
				</Paragraph>
				<Space small />
				<WalkthroughContainer>
					<Walkthrough src="/u/AllTen/instructions.gif" />
				</WalkthroughContainer>
				<Space small />
				<Paragraph>For example, with 1, 2, 3, and 4, we can make:</Paragraph>
				<TargetDisplayContainer>
					<TargetDisplay
						problem={sampleProblemTarget}
						targets={sampleTargetStates}
						keySuffix="Instrs"
					/>
				</TargetDisplayContainer>
				<Paragraph>
					You can type all four numbers in one expression and press{" "}
					<IconButton icon="=" inline size="xsmall" color="example" />.
				</Paragraph>
				<ExpressionContainer margin="large">
					<ExpressionDisplay state={sampleExprState1} size="medium" />
				</ExpressionContainer>
				<Paragraph>
					Or, turn any expression into a new combo button with{" "}
					<IconButton icon="=" inline size="xsmall" color="example" />.
				</Paragraph>
				<Paragraph>Fractions and negatives are allowed.</Paragraph>
				<ThreeColumnContainer>
					<ExpressionContainer>
						<ExpressionDisplay state={sampleExprState2} size="medium" />
					</ExpressionContainer>
					<ExpressionContainer>
						<ExpressionDisplay state={sampleExprState3} size="medium" />
					</ExpressionContainer>
					<ExpressionContainer>
						<ExpressionDisplay state={sampleExprState4} size="medium" />
					</ExpressionContainer>
					<IconButtonContainer>
						<IconButton
							number={sampleExprResult1}
							color="interm1"
							size="mediumNum"
						/>
					</IconButtonContainer>
					<IconButtonContainer>
						<IconButton
							number={sampleExprResult2}
							color="interm1"
							size="mediumNum"
						/>
					</IconButtonContainer>
					<IconButtonContainer>
						<IconButton
							number={sampleExprResult3}
							color="interm1"
							size="mediumNum"
						/>
					</IconButtonContainer>
				</ThreeColumnContainer>
				<Paragraph>
					Combo buttons cannot be used to type multi-digit numbers.
				</Paragraph>
				<Paragraph>All four original numbers must be used.</Paragraph>
				<Aside>Try to get all ten!</Aside>
				<Space small />
			</Container>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "stretch",
					gap: "16px",
					marginTop: "12px",
					width: "100%",
				}}
			>
				<a
					href="https://beastacademy.com/privacy"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						fontSize: "0.85rem",
						color: "rgba(26, 61, 91, 0.55)",
						textAlign: "center",
					}}
				>
					Privacy Policy
				</a>
				<button type="button" className="btn-primary" onClick={hideHelp}>
					{CTA_LABELS.PLAY_TODAY}
				</button>
			</div>
		</SharedModalShell>
	);
};
export default observer(Instructions);
