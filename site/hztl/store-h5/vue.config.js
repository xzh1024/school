// const autoprefixer = require("autoprefixer");
// const pxtorem = require("postcss-pxtorem");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const envConfigPath = path.resolve(
  __dirname,
  "src/config/" + (process.env.WebEnv || "dev") + ".js"
);
module.exports = {
  publicPath: require(envConfigPath).staticPrefix + "/",
  outputDir: "release/img-web/public",
  productionSourceMap: false, //设置打包不包含map文件
  devServer: {
    disableHostCheck: true, // invalid header host
    port: 8080 // 开发端口
  },
  lintOnSave: false,
  chainWebpack: config => {
    config.optimization.minimizer("terser").tap(args => {
      args[0].terserOptions.output = {
        ...args[0].terserOptions.output,
        comments: false // exclude all comments from output
      };
      return args;
    });
  },
  configureWebpack: {
    resolve: {
      alias: {
        envConfigPath: envConfigPath
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }),
      new CopyWebpackPlugin([
        {
          from: __dirname + "/public/MP_verify_ckGggsUpbX29zdzI.txt"
        },
        {
          from: __dirname + "/public/MP_verify_zuKWKIqojZM5LSGu.txt"
        },
        {
          from: __dirname + "/public/MP_verify_qS6ZM2VPwmNTbtnn.txt"
        },
        {
          from: __dirname + "/public/MP_verify_vX5jEsJDosFJYHP7.txt"
        },
        {
          from: __dirname + "/piblic/MP_verify_yOEGPw1bYIcydC5P.txt"
        },
        {
          from: __dirname + "/public/MP_verify_7tQwCh13uP12qhqa.txt"
        },
        {
          from: __dirname + "/public/MP_verify_JizwDcmuU7yrJNGb.txt"
        },
        {
          from: __dirname + "/public/MP_verify_X9DUR5Fcj6fOUdjY.txt"
        },
        {
          from: __dirname + "/public/MP_verify_Y5jB4QozjbfKVep6.txt"
        },
        {
          from: __dirname + "/public/MP_verify_wFlDfvwz9urSocDx.txt"
        },
        {
          from: __dirname + "/public/FEMk6FmL48pcx9Rz.txt"
        }
      ])
    ]
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.join(
            __dirname,
            "./src/assets/css/resetvant.less"
          )}";`
        }
      }
    }
  }
};
