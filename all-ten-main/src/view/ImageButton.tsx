import React from "react";

import {styled} from "../stitches.config";

export type Images =
	| "ba-boxes-logo"
	| "aops-logo"
	| "ba-logo"
	| "academy-logo"
	| "beastacademy-logo";

export type Props = {
	type: Images;
	alt: string;
	invis?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	size?: "small" | "medium" | "banner" | "compactBanner" | "titleLogo";
};

const Image = styled("img", {
	display: "inline-block",
	cursor: "pointer",
	variants: {
		disabled: {
			true: {
				cursor: "initial",
			},
		},
	},
});

const ImageButton: React.FC<Props> = function (props: Props) {
	const {type, alt, disabled, onClick, size} = props;
	const realOnClick = disabled ? () => null : onClick;

	// default to the boxes logo
	let source: any = "https://beastacademy.com/u/AllTen/cube.svg";
	if (type === "aops-logo") {
		source = "https://beastacademy.com/u/AllTen/aops-logo.svg";
	} else if (type === "ba-logo") {
		source = "https://beastacademy.com/u/AllTen/ba-logo.svg";
	} else if (type === "academy-logo") {
		source = "https://beastacademy.com/u/AllTen/academy-logo.svg";
	} else if (type === "beastacademy-logo") {
		source = "https://beastacademy.com/u/AllTen/beastacademy-logo.svg";
	}

	const style: any = {};
	if (size === "small") {
		style.width = "20px";
		style.height = "20px";
	} else if (size === "medium") {
		style.width = "30px";
		style.height = "30px";
	} else if (size === "banner") {
		style.height = "40px";
		style.width = "auto";
	} else if (size === "compactBanner") {
		style.height = "35px";
		style.width = "auto";
	} else if (size === "titleLogo") {
		style.height = "26px";
	}

	return (
		<Image
			src={source}
			alt={alt}
			onClick={realOnClick}
			disabled={disabled}
			style={style}
		/>
	);
};
export default ImageButton;
