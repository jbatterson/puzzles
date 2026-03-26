import React, {useEffect, useState} from "react";
import {styled} from "../stitches.config";
import {Centered, Space} from "./util/TextContainers";
import {padLeftWith0s} from "../util/Utils";

export type Props = {
	today: string;
};

const SEC_IN_MIN = 60;
const MIN_IN_HR = 60;

const Container = styled("div", {
	display: "block",
});

const TimeLabel = styled("span", {
	fontWeight: "lighter",
	fontSize: "20px",
	paddingRight: "10px",
});

const TimeDisplay = styled("span", {
	fontWeight: "bold",
	fontSize: "36px",
});

/*
 * startOfToday Today's date in YYYY-MM-DD format.
 */
const secondsUntilTomorrow = (startOfToday: string): number => {
	const now = new Date();
	const startOfTomorrow = new Date(startOfToday);
	startOfTomorrow.setHours(0, 0, 0, 0);
	startOfTomorrow.setDate(now.getDate() + 1);

	return Math.round((Number(startOfTomorrow) - Number(now)) / 1000);
};
const PlayAgainTimer: React.FC<Props> = function (props: Props) {
	const {today} = props;

	const [seconds, setSeconds] = useState(secondsUntilTomorrow(today));
	useEffect(() => {
		let remainingSeconds = seconds;
		setInterval(() => {
			setSeconds(remainingSeconds - 1);
			remainingSeconds--;
		}, 1000);
	}, []);

	const minutes = Math.floor(seconds / SEC_IN_MIN);
	const hours = Math.floor(minutes / MIN_IN_HR);
	const [dispSeconds, dispMinutes] = [
		seconds % SEC_IN_MIN,
		minutes % MIN_IN_HR,
	].map((n) => padLeftWith0s("" + n, 2));

	return (
		<Centered>
			<Container>
				<Space />
				{seconds > 0 ? (
					<>
						<TimeLabel>PLAY AGAIN IN:</TimeLabel>
						<TimeDisplay>
							{hours}:{dispMinutes}:{dispSeconds}
						</TimeDisplay>
					</>
				) : (
					<TimeLabel>The Next All Ten is out!</TimeLabel>
				)}
			</Container>
		</Centered>
	);
};

export default PlayAgainTimer;
