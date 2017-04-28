const webpack = require('webpack');

module.exports = {
	entry: './index.js',
	output: {
		path: `${__dirname}/bin`,
		filename: 'cli.js',
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader', enforce: 'pre' },
			{ test: /\.js$/, loader: 'babel-loader' },
		],
	},
	plugins: [
		new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
		new webpack.optimize.DedupePlugin(),
	],
	node: {
		fs: 'empty',
		child_process: 'empty',
		readline: 'empty',
	},
	target: 'node',
};
