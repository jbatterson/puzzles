export const GAME_KEYS = Object.freeze({
	ALLTEN: "allten",
	SCURRY: "scurry",
	FOLDS: "folds",
	SUMTILES: "sumtiles",
	PRODUCTILES: "productiles",
	FACTORFALL: "factorfall",
	CLUELESS: "clueless",
});

const GAME_CHROME = Object.freeze({
	[GAME_KEYS.ALLTEN]: { title: "All Ten", showStats: true },
	[GAME_KEYS.SCURRY]: { title: "Scurry", showStats: true },
	[GAME_KEYS.FOLDS]: { title: "Folds", showStats: true },
	[GAME_KEYS.SUMTILES]: { title: "Sum Tiles", showStats: false },
	[GAME_KEYS.PRODUCTILES]: { title: "Productiles", showStats: false },
	[GAME_KEYS.FACTORFALL]: { title: "Factorfall", showStats: true },
	[GAME_KEYS.CLUELESS]: { title: "Clueless", showStats: true },
});

export function getGameChrome(gameKey) {
	return GAME_CHROME[gameKey] || { title: "Puzzle", showStats: false };
}
