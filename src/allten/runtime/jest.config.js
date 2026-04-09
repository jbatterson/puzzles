const path = require("path");
const {defaults} = require("jest-config");

module.exports = {
	testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, "tsout"],
	testEnvironment: "jsdom",
	/** Jest does not resolve ESM outside src; map shared hub module to CJS for tests. */
	moduleNameMapper: {
		"^.+[/\\\\]shared-contracts[/\\\\]schoolTime\\.js$": path.resolve(
			__dirname,
			"../../../shared-contracts/schoolTime.cjs",
		),
		"^.+[/\\\\]shared-contracts[/\\\\]allTenSharePlaintext\\.js$": path.resolve(
			__dirname,
			"../../../shared-contracts/allTenSharePlaintext.cjs",
		),
	},
};
