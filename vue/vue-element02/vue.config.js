// /**
//  * Created by Admin on 2019/3/13.
//  */
// module.exports = {
//     // baseUrl  type:{string} default:'/'
//     // 将部署应用程序的基本URL
//     // 将部署应用程序的基本URL。
//     // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
//     // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.
//
//     baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
//
//     // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
//
//     // outputDir: 'dist',
//
//     // pages:{ type:Object,Default:undfind }
//     /*
//      构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
//      个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
//      的字符串，
//      注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
//      */
//     // pages: {
//     // index: {
//     // entry for the page
//     // entry: 'src/index/main.js',
//     // the source template
//     // template: 'public/index.html',
//     // output as dist/index.html
//     // filename: 'index.html'
//     // },
//     // when using the entry-only string format,
//     // template is inferred to be `public/subpage.html`
//     // and falls back to `public/index.html` if not found.
//     // Output filename is inferred to be `subpage.html`.
//     // subpage: 'src/subpage/main.js'
//     // },
//
//     //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
//     lintOnSave: true,
//     // productionSourceMap：{ type:Bollean,default:true } 生产源映射
//     // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
//     productionSourceMap: false,
//     // devServer:{type:Object} 3个属性host,port,https
//     // 它支持webPack-dev-server的所有选项
//
//     devServer: {
//         port: 8080, // 端口号
//         host: 'localhost',
//         https: false, // https:{type:Boolean}
//         open: true, //配置自动启动浏览器
//         // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
//         proxy: {
//             '/www': {
//                 target: 'http://boxapi.xiyou7.com',
//                 '^/www': '/www'
//             },
//             '/api': {
//                 target: 'http://api.xiyou7.com',
//                 ws: true,
//                 changeOrigin: true,
//                 '^/api': '/api'
//             }
//         },  // 配置多个代理
//     }
// }
// module.exports = {
//     // baseUrl: '/', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
//     publicPath: process.env.NODE_ENV === 'production'
//         ? '/production-sub-path/'
//         : '/',
//     outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
//     assetsDir: 'public', //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
//     indexPath: 'index.html', //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
//     pages: {
//         //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
//         index: {
//             //除了 entry 之外都是可选的
//             entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
//             template: 'public/index.html', // 模板来源
//             filename: 'index.html', // 在 dist/index.html 的输出
//             title: 'Index Page', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
//             chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
//         }
//     },
//     lintOnSave: true, // 是否在保存的时候检查
//     productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
//     css: {
//         extract: true, // 是否使用css分离插件 ExtractTextPlugin
//         sourceMap: false, // 开启 CSS source maps
//         loaderOptions: {}, // css预设器配置项
//         modules: false // 启用 CSS modules for all css / pre-processor files.
//     },
//     //反向代理
//     devServer: {
//       // 环境配置
//       host: 'localhost',
//       port: 8080,
//       https: false,
//       hotOnly: false,
//       open: true, //配置自动启动浏览器
//       proxy: {
//         // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
//         '/www': {
//           target: 'http://boxapi.xiyou7.com',
//           // target: 'http://192.168.1.4:8999',
//           pathRewrite: {
//             '^/www': '/www'
//           }
//         },
//         '/api': {
//           target: 'http://api.xiyou7.com',
//           // target: 'http://192.168.1.4:8999',
//           pathRewrite: {
//             '^/api': '/api'
//           }
//         }
//       }
//     },
//     pluginOptions: {
//         // 第三方插件配置
//         // ...
//     }
// }

module.exports = {
    devServer: {
        proxy: {
            '/www': {
                // target: 'http://testbox.btwan.com',
                target: 'http://boxapi.xiyou7.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/www': '/'
                }
            },
            '/api': {
                // target: 'testsdk.btwan.com',
                target: 'http://api.xiyou7.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
        }
    }
}


