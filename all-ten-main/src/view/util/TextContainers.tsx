import {styled} from "../../stitches.config";
import {HALF_PADDING_UNIT, PADDING_UNIT} from "./Constants";

export const Title = styled("h2", {
	color: "$main",
	width: "100%",
	textAlign: "center",
	marginTop: 0,
	marginBottom: "10px",
	fontSize: "24px",
});

export const Subheading = styled("h3", {
	color: "$main",
	width: "100%",
	textAlign: "center",
	marginTop: 0,
	marginBottom: "10px",
	fontSize: "16px",
});

export const SubtleSubheading = styled("h3", {
	fontSize: "12px",
	textAlign: "center",
	fontWeight: "300",
	letterSpacing: "0.1em",

	variants: {
		bold: {
			true: {
				fontWeight: "bold",
			},
		},
		inline: {
			true: {
				display: "inline",
			},
		},
	},
});

export const SubtleLabel = styled("span", {
	fontSize: "14px",
	textAlign: "center",
	fontWeight: "300",

	variants: {
		onRight: {
			true: {
				paddingLeft: ".15em",
			},
		},
	},
});

export const Container = styled("div", {
	display: "block",
	width: "100%",

	variants: {
		pad: {
			true: {
				padding: "20px",
			},
		},
		horizontal: {
			true: {
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				flexWrap: "nowrap",
			},
		},
	},
});

export const Centered = styled(Container, {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	margin: 0,
	padding: 0,
});

export const Space = styled("div", {
	background: "$bg",
	position: "sticky",
	height: PADDING_UNIT,
	backgroundColor: "$bg",
	zIndex: "-1",
	margin: 0,

	variants: {
		small: {
			true: {
				height: HALF_PADDING_UNIT,
			},
		},
	},
});

export const Paragraph = styled("div", {
	color: "$main",
	fontSize: "12pt",
	marginTop: "6px",
	marginBottom: "6px",

	variants: {
		bold: {
			true: {
				fontWeight: "bold",
			},
		},
		padded: {
			true: {
				marginTop: "10px",
			},
		},
		large: {
			true: {
				fontSize: "24px",
			},
		},
		centered: {
			true: {
				width: "100%",
				textAlign: "center",
			},
		},
	},
});

export const Aside = styled("div", {
	color: "$main",
	fontSize: "18px",
	marginTop: "12px",
	marginBottom: 0,
	fontWeight: "bold",
	textAlign: "center",
});

export const IconButtonContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	marginTop: 4,
	marginBottom: 4,
});

export const ExpressionContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",

	padding: "10px",
	borderWidth: 1,
	backgroundColor: "$lightGray",
	borderRadius: 6,
	margin: "6px",
	variants: {
		margin: {
			large: {
				marginTop: "10px",
				marginBottom: "10px",
			},
		},
	},
});

export const ThreeColumnContainer = styled("div", {
	display: "grid",
	gridTemplateColumns: "1fr 1fr 1fr",
});
