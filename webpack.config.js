const webpack = require('webpack');

module.exports = {
	entry: './index.js',
	output: {
		path: './bin/',
		filename: 'cli.js',
	},
	module: {
		preLoaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
		],
		loaders: [
			{ test: /\.js$/, loader: 'babel' },
		],
	},
	plugins: [
		new webpack.BannerPlugin('#!/usr/bin/env node', { raw: true }),
		new webpack.optimize.DedupePlugin(),
	],
	node: {
		fs: 'empty',
		child_process: 'empty',
		readline: 'empty',
	},
	target: 'node',
};
