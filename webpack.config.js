const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
	mode = "production";
	target = "browserslist";
}

const plugins = [
	new MiniCssExtractPlugin({
		filename: "[name].css",
	}),
	new HtmlWebpackPlugin({
		template: "./src/index.html",
	}),
	new Dotenv({
		path: path.resolve(__dirname, ".env"),
	}),
];

if (process.env.SERVE) {
	plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
	mode,
	target,
	plugins,
	devtool: "source-map",
	entry: "./src/index.js",
	devServer: {
		static: "./dist",
		hot: true,
		port: 3000,
		open: true,
	},

	output: {
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "assets/[hash][ext][query]",
		clean: true,
	},

	module: {
		rules: [
			{ test: /\.(html)$/, use: ["html-loader"] },
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
				type: mode === "production" ? "asset" : "asset/resource",
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
					},
				},
			},
		],
	},
};
