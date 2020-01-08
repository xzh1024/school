const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //简化HTML文件的创建，以便为您的webpack包提供服务
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //用于删除/清除构建文件夹的webpack插件。

const ManifestPlugin = require('webpack-manifest-plugin'); //生成资产清单(一个.json文件)


module.exports = {
    // 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
    // 进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
    // 每个依赖项随即被处理，最后输出到称之为 bundles 的文件中
    // entry: './src/index.js',
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    // output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist
    output: {
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // 如果将publicPath设置成./，相对路径在访问本地时可以，但是如果将静态资源托管到CDN上则访问路径显然不能使用相对路径，但是如果将publicPath设置成/，则本地无法访问
        publicPath: '/'
    },
    // loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。
    // 插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
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
    // 此选项控制是否生成，以及如何生成 source map。    追踪错误和警告在源代码中的原始位置
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true, //一切服务都启用gzip 压缩ta'r
        // port: 8080
    }
    // loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。
    // loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
    // module: {
    //     rules: [
    //         //样式文件
    //         {
    //             test: /\.css$/,
    //             use: ['style-loader', 'css-loader']
    //         },
    //         //图片
    //         {
    //             test: /\.(png|svg|jpg|gif)$/,
    //             use: ['file-loader']
    //         }
    //     ]
    // }
};
