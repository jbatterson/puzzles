const Path = require("path");
const Webpack = require("webpack");

const production = process.env.NODE_ENV === "production";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const babelLoader = {
	loader: "babel-loader",
	options: {
		babelrc: false,
		presets: [
			["@babel/env", {modules: false}],
			"@babel/react",
			"@babel/typescript",
		],
		plugins: [],
	},
};

const yamlLoader = {
	loader: "js-yaml-loader",
};

const fileLoader = {
	loader: "file-loader",
	options: {
		name: "images/[hash]-[name].[ext]",
	},
};

module.exports = {
	entry: "./src/main.ts",
	output: {
		path: Path.resolve(__dirname, "public", "dist"),
		filename: "bundle_allten.js",
		library: "AllTenClient",
		libraryTarget: "umd",
	},
	resolve: {
		extensions,
		alias: {
			"@shared-contracts": Path.resolve(__dirname, "../../../shared-contracts"),
		},
	},
	mode: production ? "production" : "development",
	devtool: production ? false : "cheap-module-source-map",
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				use: [babelLoader],
			},
			{
				test: /\.ya?ml$/,
				exclude: /node_modules/,
				use: [yamlLoader],
			},
			{
				test: /\.(png|jp(e?)g|svg|gif)$/,
				use: [fileLoader],
			},
		],
	},
	plugins: [
		new Webpack.DefinePlugin({
			"process.env.NODE_ENV": production ? '"production"' : '"development"',
		}),
	],
	cache: {
		type: "filesystem",
	},
	optimization: {
		splitChunks: false,
	},
};
