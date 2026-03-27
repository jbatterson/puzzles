import React from "react";

import {styled} from "../stitches.config";
import {TargetState} from "../state/AppState";
import {getSortedTargets} from "../state/AppStateUtil";

export type Props = {
	targets: TargetState[];
};

const TargetContainer = styled("div", {
	width: "100%",
	display: "flex",
	justifyContent: "space-between",
});
const Target = styled("div", {
	fontSize: "16px",
	fontWeight: "bold",
	variants: {
		done: {
			true: {
				color: "$done",
			},
		},
	},
});

const SolveOrderDisplay: React.FC<Props> = function (props: Props) {
	const {targets} = props;
	const sortedTargets = getSortedTargets(targets);
	let key = 0;

	const solveOrders: JSX.Element[] = sortedTargets.map((target) => {
		return (
			<Target key={key++} done={!!target.solution}>
				{target.number}
			</Target>
		);
	});
	return <TargetContainer>{solveOrders}</TargetContainer>;
};

export default SolveOrderDisplay;
