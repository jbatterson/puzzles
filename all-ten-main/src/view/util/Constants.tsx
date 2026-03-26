export const LAUNCH_DATE = new Date(Date.parse("19 Sep 2022 00:00:00 PST"));

/* assumed facts about All Ten */
export const NUM_TARGETS = 10;

/* game dimensions */
export const MAX_GAME_WIDTH = 450;
export const TITLEBAR_HEIGHT = 57;

// JS breakpoints

// layout
export const COMPACT_LAYOUT_BREAKPOINT = 750;
export const COMPACT_LINKS_BREAKPOINT = 720;
// keyboard
export const SMALL_KEYBOARD_BREAKPOINT = 630; // below this, a small keyboard will be used
export const MEDIUM_KEYBOARD_BREAKPOINT = 655; // below this, a medium keyboard will be used
// target display
export const SHORT_TARGET_DISPLAY_HEIGHT = 105;
export const SHORT_TARGET_DISPLAY_BREAKPOINT = 600;
export const TARGET_DISPLAY_HEIGHT = 170;
export const TALL_TARGET_DISPLAY_HEIGHT = 195;
export const TALL_TARGET_DISPLAY_BREAKPOINT = 750;

/* string helpers */
// delimiter between sections of a cookie
export const COOKIE_SECTION_DELIM = "@";
// delimeter between parts of a cookie section
export const COOKIE_DELIM = "%";
// non-breaking dash
export const NB_DASH = "\u2011";

/* time helpers */
export const TWENTY_YEARS_IN_SECONDS = 20 * 365 * 24 * 3600;
export const DAY_IN_MS = 3600 * 24 * 1000;
export const MONTH_NAMES = [
	"January",
	"Febuary",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
export const SHORT_MONTH_NAMES = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
export const SHORT_WEEKDAY_NAMES = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
];

/* CSS spacing helpers */
export const PADDING_UNIT = 20; // one unit of padding for consistency
export const HALF_PADDING_UNIT = PADDING_UNIT / 2; // half unit of padding for consistency
export const QUARTER_PADDING_UNIT = PADDING_UNIT / 4; // quarter unit of padding for consistency
