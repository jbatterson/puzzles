export const MODAL_INTENTS = Object.freeze({
	INSTRUCTIONS: "instructions",
	LINKS: "links",
	STATS: "stats",
	RESULTS: "results",
});

export const MODAL_CLOSE_ARIA_LABELS = Object.freeze({
	[MODAL_INTENTS.INSTRUCTIONS]: "Close instructions",
	[MODAL_INTENTS.LINKS]: "Close links",
	[MODAL_INTENTS.STATS]: "Close stats",
	[MODAL_INTENTS.RESULTS]: "Close results",
	default: "Close modal",
});

export function getModalCloseAriaLabel(intent) {
	return MODAL_CLOSE_ARIA_LABELS[intent] || MODAL_CLOSE_ARIA_LABELS.default;
}
