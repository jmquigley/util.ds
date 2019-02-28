const {leader} = require("util.leader");

const CircularDependencyPlugin = require("circular-dependency-plugin");
const NullPlugin = require("webpack-null-plugin");
const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");

let mode = process.env.NODE_ENV || "development";

let MinifyPlugin = null;
if (mode === "production") {
	MinifyPlugin = require("babel-minify-webpack-plugin");
}

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
	entry: [path.resolve(__dirname, "index.ts")],
	target: "node",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		library: "ds",
		libraryTarget: "umd",
		globalObject: "window"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".css"]
	},
	resolveLoader: {
		modules: [path.join(__dirname, "node_modules")]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules|dist|demo|.*\.test\.tsx/,
				loader: "ts-loader"
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
		new webpack.optimize.ModuleConcatenationPlugin(),
		MinifyPlugin ? new MinifyPlugin() : new NullPlugin(),
		new webpack.SourceMapDevToolPlugin({
			filename: "[name].js.map"
		})
	]
};
