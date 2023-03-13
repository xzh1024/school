/* eslint-disable @typescript-eslint/no-var-requires */
const { name } = require("./package");
const path = require("path");
const envConfigPath = path.resolve(
  __dirname,
  "src/config/" + (process.env.ProENV || "dev") + ".js"
);

const envConfig = require(envConfigPath);

const defaultEntrance = {
  index: "src/main.ts",
  print: "src/views/print/print/main.js",
  workbench: "src/views/workbench/main.js"
};

const yunXiuShareEntrance = envConfig.envConfig.hasYX
  ? {
      detection: "src/views/detectionCar/main.js",
      share: {
        entry: "src/views/detectionShare/main.js",
        template: "public/share.html",
        filename: "share.html",
        title: "车辆检测报告"
      },
      insuranceShare: {
        entry: "src/views/insuranceShare/main.js",
        template: "public/insurance.html",
        filename: "insurance.html",
        title: "保险理赔申请单"
      }
    }
  : {};

module.exports = {
  publicPath: envConfig.envConfig.routerPrefix + "/",
  productionSourceMap: process.env.ProENV != "production",
  outputDir:
    (process.env.ReleaseRoot || __dirname + "/release/default") +
    "/img-web/public",
  assetsDir: "vue-static",
  pages: {
    ...defaultEntrance,
    ...yunXiuShareEntrance
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      // publicPath: "/",
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`
    },
    resolve: {
      alias: {
        envConfigPath: envConfigPath
      }
    }
    // entry: {
    //   app: [
    //     "babel-polyfill",
    //     path.resolve(__dirname, "src/views/detectionShare/main.js")
    //   ]
    // }
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch-index");
    config.plugins.delete("preload-index");
    config.plugins.delete("prefetch-print");
    config.plugins.delete("preload-print");
    config.plugins.delete("prefetch-workbench");
    config.plugins.delete("preload-workbench");
    config.plugins.delete("prefetch-detection");
    config.plugins.delete("preload-detection");
    config.plugins.delete("prefetch-share");
    config.plugins.delete("preload-share");
    config.plugins.delete("prefetch-insuranceShare");
    config.plugins.delete("preload-insuranceShare");

    config.optimization.minimizer("terser").tap(args => {
      args[0].terserOptions.output = {
        ...args[0].terserOptions.output,
        comments: false // exclude all comments from output
      };
      return args;
    });
  },
  devServer: {
    port: 8091,
    historyApiFallback: {
      rewrites: [
        { from: /^\/Print\//, to: "/print.html" },
        { from: /^\/Workbench\//, to: "/workbench.html" },
        { from: /^\/detectionCar\//, to: "/detection.html" },
        { from: /^\/detectionShare\//, to: "/share.html" },
        { from: /^\/pc\/bill-JC/, to: "/share.html" },
        { from: /^\/pc\/bill-BL/, to: "/insurance.html" }
      ]
    },
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
