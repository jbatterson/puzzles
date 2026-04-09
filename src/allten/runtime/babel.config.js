/**
 * Babel project-wide config for Jest (babel-jest).
 * Declared here as babel.config.js (not the "babel" key in package.json) so it is
 * treated as a Babel project-wide config: applied to ALL files Jest imports,
 * including shared-contracts/ which lives outside this package directory.
 * The "babel" key in package.json remains for the Webpack build.
 */
module.exports = {
	presets: [
		"@babel/preset-typescript",
		"@babel/preset-react",
		["@babel/preset-env", { targets: { node: "16" } }],
	],
}
