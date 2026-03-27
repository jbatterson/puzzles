import React from "react";
import {ProfileState} from "src/state/AppState";
import {styled} from "../stitches.config";
import {PADDING_UNIT} from "./util/Constants";

export type Props = {
	profile: ProfileState;
};

import {SubtleLabel, SubtleSubheading} from "./util/TextContainers";

const WidgetRowContainer = styled("div", {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

const StatsContainer = styled("div", {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	margin: `0 ${1.3 * PADDING_UNIT}px`,
});

const ValueContainer = styled("div", {
	width: "100%",
	height: "100%",
	justifyContent: "center",
	alignItems: "center",
	textAlign: "center",
});

const Amount = styled("span", {
	fontSize: "30px",
	fontWeight: "bold",
});

const StatsWidget: React.FC<Props> = function (props: Props) {
	const {profile} = props;
	const {numPlays, numStreak, numAllTens} = profile;

	// returns "s" suffix to pluralize noun if quantity (n) is not 1
	const getSuffix = (n: number): string => (n === 1 ? "" : "s");

	return (
		<WidgetRowContainer>
			<StatsContainer>
				<SubtleSubheading>PLAYED</SubtleSubheading>
				<ValueContainer>
					<Amount>{numPlays}</Amount>
					<SubtleLabel onRight>day{getSuffix(numPlays)}</SubtleLabel>
				</ValueContainer>
			</StatsContainer>
			<StatsContainer>
				<SubtleSubheading>STREAK</SubtleSubheading>
				<ValueContainer>
					<Amount>{numStreak}</Amount>
					<SubtleLabel onRight>day{getSuffix(numStreak)}</SubtleLabel>
				</ValueContainer>
			</StatsContainer>
			<StatsContainer>
				<SubtleSubheading>ALL&nbsp;TEN</SubtleSubheading>
				<ValueContainer>
					<Amount>{numAllTens}</Amount>
					<SubtleLabel onRight>time{getSuffix(numAllTens)}</SubtleLabel>
				</ValueContainer>
			</StatsContainer>
		</WidgetRowContainer>
	);
};

export default StatsWidget;
