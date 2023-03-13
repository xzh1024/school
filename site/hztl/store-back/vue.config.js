const path = require("path");
const envConfigPath = path.resolve(
  __dirname,
  "src/config/" + (process.env.WebEnv || "dev") + ".js"
);

module.exports = {
  publicPath: require(envConfigPath).envConfig.routerPrefix + "/",
  outputDir: "release/img-web/public",
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.join(__dirname, "./src/assets/css/global.less")],
    },
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "我的店铺",
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        envConfigPath: envConfigPath,
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.minimizer("terser").tap((args) => {
      args[0].terserOptions.output = {
        ...args[0].terserOptions.output,
        comments: false, // exclude all comments from output
      };
      return args;
    });
  },
  lintOnSave: false,
  devServer: {
    open: true
  }
};
