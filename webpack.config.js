const {leader} = require("util.leader");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");

const argv = require("yargs").boolean("disable-bundle-analyzer").argv;
let mode = process.env.NODE_ENV || "development";

const banner = new webpack.BannerPlugin({
	banner:
		"util.ds v" +
		pkg.version +
		"\n" +
		`Mode: ${mode}\n` +
		"https://www.npmjs.com/package/util.ds\n" +
		"Copyright (c) 2019, James Quigley",
	entryOnly: true
});

leader(banner.options.banner);

const constants = new webpack.DefinePlugin({
	UTIL_DS_VERSION: JSON.stringify(pkg.version),
	NODE_ENV: mode
});

module.exports = {
	mode,
	performance: {hints: false},
	entry: [path.resolve(__dirname, "index.js")],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		libraryTarget: "umd"
	},
	resolve: {
		extensions: [".js", ".jsx", ".css"]
	},
	resolveLoader: {
		modules: [path.join(__dirname, "node_modules")]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules|dist|demo|.*\.test\.tsx/,
				loader: "babel-loader"
			}
		]
	},
	plugins: (function(argv) {
		let plugins = [
			banner,
			constants,
			new CircularDependencyPlugin({
				exclude: /node_modules/,
				failOnError: true
			}),
			new CopyWebpackPlugin([
				{
					from: "**/*.d.ts",
					ignore: [
						"bin/**/*",
						"demo/**/*",
						"dist/**/*",
						"node_modules/**/*"
					]
				},
				{
					from: "index.d.ts",
					to: "bundle.d.ts"
				}
			])
		];

		if (!argv.disableBundleAnalyzer) {
			plugins.push(
				new BundleAnalyzerPlugin({
					analyzerMode: "static",
					reportFilename: "bundle.report.html"
				})
			);
		}

		return plugins;
	})(argv)
};
