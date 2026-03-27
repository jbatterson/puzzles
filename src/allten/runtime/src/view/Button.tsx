import React from "react";
import {styled} from "../stitches.config";
import {colorVariants} from "./util/Colors";

export type Props = {
	onClick: () => void;
	text: string;
};

const Container = styled("button", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",

	backgroundColor: "$$color",
	color: "$$foreColor",
	borderColor: "$$color",
	borderStyle: "solid",
	borderRadius: 5,
	margin: 0,
	padding: "15px 10px",
	cursor: "pointer",

	// Text jumps by a pixel at scale = 1. So the initial transform is slightly
	// below 1 to avoid the jump.
	transform: `scale(0.999)`,
	transformOrigin: "center",

	height: "20px",
	fontSize: "14pt",
	transition: "color .2s ease-out",

	variants: {
		color: colorVariants,
	},

	defaultVariants: {
		color: "main",
	},
});

const Button: React.FC<Props> = function (props: Props) {
	const {onClick, text} = props;

	return <Container onClick={onClick}>{text}</Container>;
};
export default Button;
