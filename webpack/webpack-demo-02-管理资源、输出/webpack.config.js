const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //简化HTML文件的创建，以便为您的webpack包提供服务
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //用于删除/清除构建文件夹的webpack插件。

const ManifestPlugin = require('webpack-manifest-plugin'); //生成资产清单(一个.json文件)


module.exports = {
    // entry: './src/index.js',
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '学习 webpack',
            template: './src/index.html',
            hash: true
        }),
        new ManifestPlugin()
    ],
    output: {
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
