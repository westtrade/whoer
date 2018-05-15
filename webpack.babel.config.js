import path from 'path'
import webpack from 'webpack'

const plugins = []

const config = {
	entry: ['babel-polyfill', './src/entry.js'],
	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].js',
	},

	module: {
		rules: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
			},
			{
				test: /.(css|styl)/,
				use: ['style-loader', 'css-loader', 'stylus-loader'],
			},
		],
	},

	plugins,
}
