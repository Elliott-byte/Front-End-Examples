const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");

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
					name: '[path][name].[ext]',
				},
			},
		]
	},
	output: {
		libraryTarget: "var",
		library: "Client",
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
	]
}
