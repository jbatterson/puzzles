const {defaults} = require("jest-config");
const path = require("path");

module.exports = {
	testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, "tsout"],
	testEnvironment: "jsdom",
	// shared-contracts/*.js is ESM; it lives outside <rootDir>, so Jest would not
	// transform it unless this folder is a root (see Jest `roots` behavior).
	roots: [
		"<rootDir>",
		path.join(__dirname, "..", "..", "..", "shared-contracts"),
	],
};
