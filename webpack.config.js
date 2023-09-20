const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
	entry: './client/index.js',
	mode: 'production',
	module: {
		rules: [
			{
				test: '/\.js$/',
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'media/',
					name: '[name].[ext]',
				},
			},
		]
	},
	output: {
		libraryTarget: "var",
		library: "Client",
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./client/html/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
		}),
		new CleanWebpackPlugin({
			// Simulate the removal of files
			dry: true,
			// Write Logs to Console
			verbose: true,
			// Automatically remove all unused webpack assets on rebuild
			cleanStaleWebpackAssets: true,
			protectWebpackAssets: false
		}),
	]
}
