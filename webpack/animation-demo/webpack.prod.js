const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //简化HTML文件的创建，以便为您的webpack包提供服务
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        // new UglifyJSPlugin()
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
            template: './src/index.html',
            hash: true
        }),
        // new MiniCssExtractPlugin({
        //     filename: "[name].[chunkhash:8].css",
        //     chunkFilename: "[id].css"
        // })
        new MiniCssExtractPlugin({
            filename: "style.css",  //打包后的css文件
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: "resolve-url-loader"  //因为scss-loader没有重写url的功能，所以必须安装这个
                    },
                    {
                        loader: "sass-loader", // 将 Sass 编译成 CSS
                        options: { sourceMap: true }  //必须要写
                    }
                ]
            }
        ]
    }
});