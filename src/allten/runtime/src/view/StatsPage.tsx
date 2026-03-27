import React from "react";
import {observer} from "mobx-react-lite";
import {styled} from "../stitches.config";

import {ProfileState, TargetState} from "../state/AppState";
import {Container, Paragraph, Space, Title} from "./util/TextContainers";
import TargetDisplay, {FauxTargetDisplay} from "./TargetDisplay";
import StatsWidget from "./StatsWidget";
import Modal from "./Modal";

import {ZERO_TO_TEN_STRINGS} from "./ProgressDisplay";
import {Problem} from "src/state/Problem";
import {getProblemNumbersForDay, SOLUTIONS} from "../util/ProblemUtil";
import {pstStringifyForHumans} from "../util/Dates";

export type Props = {
	hideStats: () => void;
	show: boolean;
	profile: ProfileState;
	yesterdaysDate: Date;
	yesterdaysProblem?: Problem;
	yesterdaysTargets?: TargetState[];
};

const SplitContainer = styled("div", {
	display: "flex",
	width: "100%",
	justifyContent: "space-between",
});

const StatsPage: React.FC<Props> = function (props: Props) {
	const {
		hideStats,
		show,
		profile,
		yesterdaysDate,
		yesterdaysProblem,
		yesterdaysTargets,
	} = props;
	const playedYesterday = yesterdaysProblem && yesterdaysTargets;
	const solutions = SOLUTIONS[getProblemNumbersForDay(yesterdaysDate)];
	let problemStr, problemCommentStr;

	let targetDisplay;
	if (!playedYesterday) {
		// user didn't play yesterday, build a blank one
		problemStr = getProblemNumbersForDay(yesterdaysDate).split("").join(" ");
		problemCommentStr = "You didn't play yesterday.";
		targetDisplay = (
			<FauxTargetDisplay
				userSolutions={new Array(10).fill("")}
				solutions={solutions}
			/>
		);
	} else {
		// user played yesterday, build apt target display
		problemStr = yesterdaysProblem.start.join(" ");
		const numSolved = yesterdaysTargets.filter(
			(target) => target.solution
		).length;
		if (numSolved > 0) {
			problemCommentStr = ZERO_TO_TEN_STRINGS[numSolved] + "!"; // intentionally overflow
		} else {
			problemCommentStr = "You didn't play yesterday.";
		}

		targetDisplay = (
			<TargetDisplay
				problem={yesterdaysProblem}
				targets={yesterdaysTargets}
				solutions={solutions}
			/>
		);
	}
	// const numSolved = validSolutions.length;

	return (
		<Modal close={hideStats} show={show} extraPad center>
			<Container>
				<Title>Stats</Title>
				<StatsWidget profile={profile} />
				<Space />
				<SplitContainer>
					<Paragraph bold>
						Yesterday: {pstStringifyForHumans(yesterdaysDate)}
					</Paragraph>
					<Paragraph>{problemStr}</Paragraph>
				</SplitContainer>
				<Paragraph>{problemCommentStr}</Paragraph>
				<Space small />
				{targetDisplay}
			</Container>
		</Modal>
	);
};
export default observer(StatsPage);
