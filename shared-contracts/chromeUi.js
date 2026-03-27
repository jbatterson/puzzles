import { HEADER_ACTIONS } from "./headerActions.js";

/** Primary ink for puzzle text, borders, and chrome (matches All Ten `main` / Beast Academy navy). */
export const PUZZLE_SUITE_INK = "#18355E";

/** Date row, stats labels, and other secondary chrome (navy-tinted). */
export const PUZZLE_SUITE_INK_MUTED = "rgba(24, 53, 94, 0.62)";

/** Instruction body copy (readable navy-gray). */
export const PUZZLE_SUITE_INK_SOFT = "rgba(24, 53, 94, 0.78)";

/** Softer secondary text (e.g. clue cells when not in band). */
export const PUZZLE_SUITE_INK_FAINT = "rgba(24, 53, 94, 0.5)";

/** Incomplete daily / difficulty tile background (cool gray tinted with navy). */
export const PUZZLE_SUITE_SURFACE_INCOMPLETE = "#d4d9e5";

/** Clueless pre-filled clue cells */
export const PUZZLE_SUITE_SURFACE_GIVEN = "#e4e8f2";

/** Disabled control surface (e.g. CHECK until active) */
export const PUZZLE_SUITE_SURFACE_DISABLED = "#c5cbd8";

/** Label text on disabled gray controls */
export const PUZZLE_SUITE_INK_ON_DISABLED = "rgba(24, 53, 94, 0.52)";

export const CHROME_ASSET_URLS = Object.freeze({
	CUBE_ICON: "https://beastacademy.com/u/AllTen/cube.svg",
	BEAST_ACADEMY_LOGO: "https://beastacademy.com/u/AllTen/beastacademy-logo.svg",
	LINKS_MODAL_IMAGE: "https://beastacademy.com/assets/wf/images/laptop-2.png",
});

export const CHROME_ACTION_ARIA_LABELS = Object.freeze({
	[HEADER_ACTIONS.HOME]: "Home",
	[HEADER_ACTIONS.LINKS]: "Open links",
	[HEADER_ACTIONS.STATS]: "Stats",
	[HEADER_ACTIONS.HELP]: "Help",
});

export const ALLTEN_LINK_TARGETS = Object.freeze({
	SCHOOL: "https://beastacademy.com/educators",
	HOME: "https://beastacademy.com/online",
});
