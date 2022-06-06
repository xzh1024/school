const { defineConfig } = require('@vue/cli-service');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@css', resolve('src/assets/css'))
      .set('@img', resolve('src/assets/img'));
  },
  css: {
    // 开启 CSS source maps
    sourceMap: false,
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@css/index.scss";
        `
      }
    }
  },
  devServer: {
    https: false,
    // hotOnly: false,
    proxy: {
      '/api': {
        // target: 'https://lianghj.top:8888/api/private/v1/',
        target: 'http://120.78.137.246:8888/api/private/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^api': ''
        }
      }
    }
  }
});
