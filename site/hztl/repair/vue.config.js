const path = require("path");

const serverUrl = process.env.BASE_API || "api-qa2.hztl3.com";

const moduleKeys = ["united", "basic", "accounts"];

const proxys = {};

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

moduleKeys.forEach(key => {
  proxys[`^/${key}`] = {
    target: `https://${key}.${serverUrl}`,
    changeOrigin: true,
    pathRewrite: { [`^/${key}`]: "" }
  };
});

module.exports = {
  // 基本路径
  publicPath: "/",
  // 运行 build 时的打包文件夹
  outputDir: "release/img-web/public",
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // css相关配置
  css: {
    // 开启 CSS source maps
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/main.scss";
        `
      }
    }
  },
  //接收一个基于 webpack-chain 的 ChainableConfig 实例，允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@css", resolve("src/assets/css"))
      .set("@img", resolve("src/assets/img"))
      .set("@service", resolve("src/common/services"));
    // config.plugin("html").tap(args => {
    //   args[0].title = "配修社区";
    //   return args;
    // });
  },
  // 多页面配置
  pages: {
    operator: {
      entry: "src/pages/operator/operator.ts",
      template: "public/operator.html",
      filename: "operator.html",
      title:
        "配修社区--东方思锐旗下的线上免费信息交流黄页。找货源，找客户，找合作，一站式全搞定！"
    },
    index: {
      // page 的入口
      entry: "src/main.ts",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title:
        "配修社区--东方思锐旗下的线上免费信息交流黄页。找货源，找客户，找合作，一站式全搞定！"
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    port: 8020,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: { ...proxys }
  }
};
