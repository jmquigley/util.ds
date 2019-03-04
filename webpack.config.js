const {leader} = require("util.leader");

const MinifyPlugin = require("babel-minify-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const NullPlugin = require("webpack-null-plugin");
const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");

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
	optimization: {
		minimize: false
	},
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
				test: /\.jsx?$/,
				exclude: /node_modules|dist|demo|.*\.test\.tsx|.*\.d.ts/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		banner,
		constants,
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true
		}),
		new MinifyPlugin(),
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			reportFilename: "bundle.report.html"
		})
	]
};
