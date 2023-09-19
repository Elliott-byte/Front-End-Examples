const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: './client/index.js',
	mode: 'development',
	devtool: 'source-map',
	stats: 'verbose',
	output: {
		libraryTarget: 'var',
		library: 'Client'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'media',
					name: '[name].[ext]',
				},
			},
		]
	},
	output: {
		libraryTarget: 'var',
		library: 'Client'
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./client/html/index.html",
			filename: "./index.html",
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
		// new WorkboxPlugin.GenerateSW({
		// 	clientsClaim: true,
		// 	skipWaiting: true
		// }),
	]
}
