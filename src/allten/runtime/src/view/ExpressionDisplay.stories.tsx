import React from "react";
import {Meta} from "@storybook/react";

import {makeStateFromStrings} from "../expr/Line";

import ExpressionDisplay from "./ExpressionDisplay";

export const Main = () => {
	const state1 = makeStateFromStrings([3, 3, 8, 8], "s2 / (s0 - s3 / s1)");

	const state2 = makeStateFromStrings([3, 3, 8, 8], "s2 / i1", [
		"s3 / s1",
		"s0 - i0",
	]);

	return (
		<div>
			<ExpressionDisplay state={state1} />
			<ExpressionDisplay state={state2} />
			<ExpressionDisplay state={state2} intermIndex={0} color="interm1" />
			<ExpressionDisplay state={state2} intermIndex={1} color="interm2" />
			<ExpressionDisplay state={state2} evalInterm />
			<ExpressionDisplay
				state={state2}
				evalInterm
				intermIndex={0}
				color="interm1"
			/>
			<ExpressionDisplay
				state={state2}
				evalInterm
				intermIndex={1}
				color="interm2"
			/>
			<ExpressionDisplay state={state2} colorInterm />
			<ExpressionDisplay state={state2} evalInterm colorInterm />
		</div>
	);
};

export default {
	title: "Components/ExpressionDisplay",
	component: ExpressionDisplay,
} as Meta;
