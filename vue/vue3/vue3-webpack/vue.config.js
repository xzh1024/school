const { defineConfig } = require('@vue/cli-service');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = defineConfig({
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
  }
});
