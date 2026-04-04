import React from "react";
import {Meta} from "@storybook/react";

import {Rational} from "../expr/types";
import RationalDisplay from "./RationalDisplay";

const testNumbers: (Rational | null)[] = [
	[2, 1],
	[8, 1],
	[12, 1],
	[100, 1],
	[-2, 1],
	[-12, 1],
	[1, 2],
	[5, 12],
	[-3, 4],
	null,
];

function makeRow(
	fontSize: number,
	color?: string,
	backgroundColor?: string
): React.ReactNode {
	const rowStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		fontSize: fontSize + "pt",
		backgroundColor,
	};
	const cellStyle = {
		margin: "0.5em",
	};
	const els = testNumbers.map((r) => (
		<div style={cellStyle} key={String(r)}>
			<RationalDisplay number={r} color={color as any} />
		</div>
	));
	return <div style={rowStyle}>{els}</div>;
}

export const GridOfCases = () => {
	const rowMarginStyle = {marginTop: 12};

	return (
		<div>
			<div style={rowMarginStyle}>Size 12</div>
			{makeRow(12)}
			<div style={rowMarginStyle}>Size 20</div>
			{makeRow(20)}
			<div style={rowMarginStyle}>Size 16, interm1</div>
			{makeRow(16, "interm1")}
			<div style={rowMarginStyle}>Size 16, white on dark</div>
			{makeRow(16, "white", "#1a3d5b")}
			<div style={rowMarginStyle}>Size 60</div>
			{makeRow(60)}
		</div>
	);
};

export default {
	title: "Components/RationalDisplay",
	component: RationalDisplay,
} as Meta;
