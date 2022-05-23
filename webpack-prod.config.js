const path = require('path');

const { generateHtmlPlugins } = require('./utils.js');
const htmlPlugins = generateHtmlPlugins('./src/views/pages');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'production'

module.exports = {
	context: path.resolve(__dirname, './src'),
	target: 'web',
    mode: mode,
    entry: {
        main: './index.js',
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        assetModuleFilename: "assets/[name][query]",
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
	stats: {
		children: true,
	},
    performance: {
        maxAssetSize: 10000000,
        maxEntrypointSize: 1000000,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
	].concat(htmlPlugins),
    module: {
        rules: [
            {
            test: /\.html$/i,
            loader: "html-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 3 versions",
											autoprefixer: { grid: true },
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
				generator: {
					filename: '[path][name][ext]'
				},
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
					filename: 'images/icon/[name][ext]'
				}
			},
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
				generator: {
					filename: '[path][name][ext]'
				},
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
}