import React from "react";
import {styled} from "../stitches.config";

import ImageButton from "./ImageButton";
import {HALF_PADDING_UNIT, QUARTER_PADDING_UNIT} from "./util/Constants";

export type Props = {
	name: string;
	type: "ba";
	compact?: boolean;
	children: React.ReactNode;
	id?: string;
	hidden?: boolean;
};

const Card = styled("div", {
	width: "calc(100% - 12px)", // room for shadows
	boxSizing: "border-box",
	padding: HALF_PADDING_UNIT,
	textAlign: "center",
	variants: {
		compact: {
			true: {
				margin: `${QUARTER_PADDING_UNIT}px 0`,
			},
		},
		hidden: {
			true: {
				display: "none",
			},
		},
	},
});

export const ImageLinkCard: React.FC<Props> = function (props: Props) {
	const {type, name, compact, hidden, id, children} = props;

	return (
		<Card compact={compact} id={id} hidden={hidden}>
			<ImageButton
				type={`${type}-logo`}
				alt={`${name} logo`}
				size={compact ? "compactBanner" : "banner"}
			/>
			{children}
		</Card>
	);
};
