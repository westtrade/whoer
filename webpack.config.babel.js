import dotenv from 'dotenv-extended'
import path from 'path'
import webpack from 'webpack'

dotenv.load()

const plugins = [
	new webpack.EnvironmentPlugin(['WHOER_USERNAME', 'WHOER_PASSWORD']),
]

const config = {
	entry: ['babel-polyfill', path.resolve(__dirname, './src/entry.js')],
	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].js',
		publicPath: '/build/',
	},

	devtool: 'source-map',

	module: {
		rules: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, './src'),
				exclude: /node_modules/,
			},
			{
				test: /.(css|styl)/,
				include: [path.resolve(__dirname, './src')],
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: true,
							camelCase: 'dashes',
							// localIdentName:
							// 	'[path]___[name]__[local]___[hash:base64:5]',
						},
					},
					'stylus-loader',
				],
			},
		],
	},

	plugins,

	resolve: {
		extensions: ['.js', '.jsx', '.styl', '.css', '.json'],
	},

	devServer: {
		proxy: {
			'/v2': 'http://new.whoer.net',
			pathRewrite: { '^/v2': '' },
			secure: false,
			changeOrigin: true,
			logLevel: 'debug',
		},
		historyApiFallback: true,
	},
}

export default config
