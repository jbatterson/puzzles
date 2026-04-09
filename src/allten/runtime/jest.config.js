const {defaults} = require("jest-config");

module.exports = {
	testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, "tsout"],
	testEnvironment: "jsdom",
	/**
	 * No moduleNameMapper needed. babel.config.js in this directory is a
	 * Babel project-wide config (unlike the "babel" key in package.json, which
	 * is file-relative). babel-jest passes rootDir as Babel's root, so
	 * babel.config.js is found and applied to all imported files — including
	 * shared-contracts/ ESM modules outside this package directory.
	 *
	 * Known: Storyshots.test.ts logs a console.error for Main.stories.tsx because
	 * Main.tsx uses `import.meta.env.BASE_URL` (a Vite-only API). Babel/Jest cannot
	 * parse import.meta, so that one story is skipped at load time. The test suite
	 * still passes — all other stories snapshot correctly.
	 */
};
