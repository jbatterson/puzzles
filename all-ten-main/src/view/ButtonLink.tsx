import React from "react";
import {styled} from "../stitches.config";
import {colorVariants} from "./util/Colors";

export type Props = {
	compact?: boolean;
	href: string;
	children: React.ReactNode;
	id?: string;
	hidden?: boolean;
	newTab?: boolean;
};

const Container = styled("a", {
	display: "block",
	backgroundColor: "$baRed",
	color: "$white",
	padding: "16px 18px",
	border: "none",
	fontSize: "24px",
	margin: "1.2rem 0",
	cursor: "pointer",
	borderRadius: 5,
	textAlign: "center",
	textDecoration: "none",
	"&:hover": {
		backgroundColor: "$baRedHover",
	},
	variants: {
		compact: {
			true: {
				padding: "16px 12px",
				margin: "1rem 0",
				fontSize: "20px",
			},
		},
		color: colorVariants,
	},
});

const ButtonLink: React.FC<Props> = function (props: Props) {
	const {compact, id, hidden, children, href, newTab} = props;

	return (
		<Container
			compact={compact}
			id={id}
			href={href}
			hidden={hidden}
			target={newTab ? "_blank" : ""}
		>
			{children}
		</Container>
	);
};
export default ButtonLink;
