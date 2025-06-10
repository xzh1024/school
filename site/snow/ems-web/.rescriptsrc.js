// webpack 配置重写
const { resolve, join, dirname } = require('path');
// store自动引入插plugin
// 新添加store时  由于新文件没有在编译文件的引入关系中不会触发webpack的热更新
// 解决办法： 添加新store后  直接写业务代码  业务代码保存以后 新store会自动引入
const AutoImportStorePlugin = require('./autoStorePlugin');

module.exports = {
  webpack: config => {
    config.plugins = [
      new AutoImportStorePlugin({
        storeDirPath: resolve(__dirname, './src/store'),
        ignoreFiles: ['base'],
      }),
      ...config.plugins,
    ];

    config.resolve.plugins = [];
    // console.log(config.resolve.plugins.length, 2222)

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, './src'),
      '@c': resolve(__dirname, './src/components'),
      '@r': resolve(__dirname, './src/routers'),
      '@s': resolve(__dirname, './src/store'),
      '@u': resolve(__dirname, './src/utils'),
      '@api': resolve(__dirname, './src/api'),
      pages: resolve(__dirname, './src/pages'),
      style: resolve(__dirname, './src/style'),
    };
    config.resolve.plugins = [];

    config.output.path = join(dirname(config.output.path || '/'), 'dist');
    if (['uat', 'prod'].includes(process.env.REACT_APP_ENV)) {
      config.output.publicPath = '/ems-web/';
    }
    return config;
  },

  devServer: _ => {
    const config = _;
    config.port = 9527;
    config.proxy = {
      '/ems-ms': {
        target: 'http://fssc-uat.crb.cn/',
        changeOrigin: true,
        pathRewrite: { '^/ems-ms': '/ems-ms' },
      },
      '/ems-reimburse-service': {
        target: 'http://fssc-uat.crb.cn/',
        changeOrigin: true,
        pathRewrite: { '^/ems-reimburse-service': '/ems-reimburse-service' },
      },
      '/ems-archive-service': {
        target: 'http://fssc-uat.crb.cn/ems-archive-service/',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/ems-archive-service': '' },
      },
      '/ReimbursePlatform': {
        target: 'http://fssc.crb.cn/ReimbursePlatform/',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/ReimbursePlatform': '' },
      },
    };

    return config;
  },
};
