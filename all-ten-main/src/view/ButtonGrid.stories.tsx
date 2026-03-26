import React from "react";
import {Meta} from "@storybook/react";

import {makeStateFromStrings} from "../expr/Line";

import ButtonGrid from "./ButtonGrid";

export const Main = ({
	onInsertElement,
	onEquals,
	onReset,
	onBackspace,
}: any) => {
	const state = makeStateFromStrings([8, 8, 3, 3], "");
	return (
		<div>
			<div>Initial</div>
			<ButtonGrid
				state={state}
				equalsEnabled={true}
				onInsertElement={onInsertElement}
				onEquals={onEquals}
				onReset={onReset}
				onBackspace={onBackspace}
			/>
		</div>
	);
};

export const EqualsDisabled = ({
	onInsertElement,
	onEquals,
	onReset,
	onBackspace,
}: any) => {
	const state = makeStateFromStrings([8, 8, 3, 3], "");
	return (
		<div>
			<div>Equals Disabled</div>
			<ButtonGrid
				state={state}
				equalsEnabled={false}
				onInsertElement={onInsertElement}
				onEquals={onEquals}
				onReset={onReset}
				onBackspace={onBackspace}
			/>
		</div>
	);
};

export const Current = ({
	onInsertElement,
	onEquals,
	onReset,
	onBackspace,
}: any) => {
	const state = makeStateFromStrings([8, 8, 3, 3], "s0 / s2");
	return (
		<div>
			<div>8 / 3, before =</div>
			<ButtonGrid
				state={state}
				equalsEnabled={true}
				onInsertElement={onInsertElement}
				onEquals={onEquals}
				onReset={onReset}
				onBackspace={onBackspace}
			/>
		</div>
	);
};

export const Interm = ({
	onInsertElement,
	onEquals,
	onReset,
	onBackspace,
}: any) => {
	const state = makeStateFromStrings([8, 8, 3, 3], "", ["s0 / s2"]);
	return (
		<div>
			<div>8 / 3 =</div>
			<ButtonGrid
				state={state}
				equalsEnabled={true}
				onInsertElement={onInsertElement}
				onEquals={onEquals}
				onReset={onReset}
				onBackspace={onBackspace}
			/>
		</div>
	);
};

export const IntermCurrent = ({
	onInsertElement,
	onEquals,
	onReset,
	onBackspace,
}: any) => {
	const state = makeStateFromStrings([8, 8, 3, 3], "s3 - i0", ["s0 / s2"]);
	return (
		<div>
			<div>8 / 3 =, 3 - 8/3</div>
			<ButtonGrid
				state={state}
				equalsEnabled={true}
				onInsertElement={onInsertElement}
				onEquals={onEquals}
				onReset={onReset}
				onBackspace={onBackspace}
			/>
		</div>
	);
};

export const IntermTwice = ({
	onInsertElement,
	onEquals,
	onReset,
	onBackspace,
}: any) => {
	const state = makeStateFromStrings([8, 8, 3, 3], "s1 / i1", [
		"s0 / s2",
		"s3 - i0",
	]);
	return (
		<div>
			<div>8 / 3 =, 3 - 8/3 =, 8 / 1/3</div>
			<ButtonGrid
				state={state}
				equalsEnabled={true}
				onInsertElement={onInsertElement}
				onEquals={onEquals}
				onReset={onReset}
				onBackspace={onBackspace}
			/>
		</div>
	);
};

export default {
	title: "Components/ButtonGrid",
	component: ButtonGrid,
	argTypes: {
		onInsertElement: {action: "onInsertElement"},
		onEquals: {action: "onEquals"},
		onReset: {action: "onReset"},
		onBackspace: {action: "onBackspace"},
	},
} as Meta;
