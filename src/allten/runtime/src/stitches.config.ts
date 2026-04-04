/**
 * Configuration for Stitches, the CSS-in-JS library. Used in most views.
 */

import {createStitches} from "@stitches/react";

export const {
	styled,
	css,
	globalCss,
	keyframes,
	getCssText,
	theme,
	createTheme,
	config,
} = createStitches({
	theme: {
		colors: {
			main: "#1a3d5b",
			mainLight: "#289ECC",
			white: "#FFF",
			gray: "#AAA",
			lightGray: "#E0E3E4",
			cyan: "#368FB2",
			bg: "$white",
			bgTransparent: "rgba(0, 0, 0, 0.6)",
			start: "#D6002C",
			impossible: "$start",
			op: "$main",
			disabled: "#E0E3E4",
			empty: "$disabled",
			interm1: "#CC52CC",
			interm2: "#CC52CC",
			done: "#7AC45F",
			ambientShadow: "rgba(0, 0, 0, .4)",

			// branding colors
			aopsBlue: "#44C2CC",
			baRed: "#ED1940",
			academyGreen: "#61AD00",

			// Not created by script below, taken from existing hover color on BA.
			baRedHover: "#8c0523",

			// Produced via tools/makeHoverColors.mjs.
			mainHover: "#465D7E",
			mainLightHover: "#53B1D6",
			whiteHover: "#FFFFFF",
			bgHover: "$whiteHover",
			startHover: "#DE3356",
			impossibleHover: "$startHover",
			opHover: "$mainHover",
			disabledHover: "#E6E9E9",
			emptyHover: "$disabledHover",
			interm1Hover: "#FF33FF",
			interm2Hover: "#3333FF",
			doneHover: "#95D07F",
		},
	},
	media: {
		bpXSmall: "(min-width: 374px)",
		bpSmall: "(min-width: 416px)",
		bpMedium: "(min-width: 768px)",
		bpLarge: "(min-width: 992px)",
		bpExtraLarge: "(min-width: 1200px)",
	},
});
