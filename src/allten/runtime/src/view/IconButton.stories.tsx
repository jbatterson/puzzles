import React from "react";
import {Meta} from "@storybook/react";
import {styled} from "../stitches.config";

import IconButton from "./IconButton";

const Column = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
});

const Row = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-start",

	variants: {
		align: {
			start: {
				alignItems: "flex-start",
			},
			end: {
				alignItems: "flex-end",
			},
		},
	},
});

export const Main = () => {
	return (
		<Column>
			<Row>
				<IconButton number={8} color="start" size="large" />
				<IconButton number={[8, 3]} color="interm1" size="large" />
				<IconButton number={[-2, 1]} color="interm2" size="large" />
				<IconButton number={2} color="disabled" size="large" />
			</Row>
			<div style={{marginBottom: 12}} />
			<Row>
				<IconButton icon="(" color="white" />
				<IconButton icon="*" />
				<IconButton icon="=" color="white" />
				<IconButton icon="/" />
				<IconButton icon=")" color="white" />
			</Row>
			<div style={{marginBottom: 12}} />
			<Row>
				<IconButton icon="share" color="white" size="small" />
				<IconButton icon="help" color="white" size="small" />
			</Row>
		</Column>
	);
};

export default {
	title: "Components/IconButton",
	component: IconButton,
} as Meta;
