const path = require('path');

const { generateHtmlPlugins } = require('./utils.js');
const htmlPlugins = generateHtmlPlugins('./src/views/pages');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development';

module.exports = {
	context: path.resolve(__dirname, './src'),
	target: 'web',
    mode: mode,
    entry: {
        main: '/index.js'
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        assetModuleFilename: "assets/[name][ext][query]",
        clean: true,
    },
    devServer: {
        open: true,
        port: 9000,
        static: {
            directory: path.resolve(__dirname, './src'),
            watch: true
        }
    },
    devtool: 'source-map',
	stats: {
		children: true,
	},
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
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
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
				generator: {
					filename: '[path][name][ext]'
				},
            },
			{
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
					filename: 'images/icons/[name][ext]'
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
                },
            }
        ]
    },
}