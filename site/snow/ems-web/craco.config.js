/* eslint-disable no-undef */
const { resolve, join, dirname } = require('path');
const AutoImportStorePlugin = require('./autoStorePlugin');

module.exports = {
  // reactScriptsVersion: 'react-scripts',
  webpack: {
    configure: (config, { env, paths }) => {
      config.output.path = join(dirname(config.output.path || '/'), 'dist');
      if (['uat', 'prod'].includes(process.env.REACT_APP_ENV)) {
        config.output.publicPath = '/ems-web/';
      }
      config.resolve.plugins = [];
      return config;
    },
    optimization: {
      portableRecords: true,
    },
    plugins: [
      new AutoImportStorePlugin({
        storeDirPath: resolve(__dirname, './src/store'),
        ignoreFiles: ['base'],
      }),
    ],
    alias: {
      '@': resolve(__dirname, './src'),
      '@c': resolve(__dirname, './src/components'),
      '@r': resolve(__dirname, './src/routers'),
      '@s': resolve(__dirname, './src/store'),
      '@u': resolve(__dirname, './src/utils'),
      '@api': resolve(__dirname, './src/api'),
      pages: resolve(__dirname, './src/pages'),
      style: resolve(__dirname, './src/style'),
      public: resolve(__dirname, './public'),
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    // hot: false,
    liveReload: false,
    proxy: {
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
    },
  },
  style: {
    postcss: {
      postcssOptions: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  },
};
