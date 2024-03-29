const serverUrl = process.env.BASE_API || "api-qa2.hztl3.com";

const moduleKeys = ["united", "basic", "accounts"];

const proxys = {};

moduleKeys.forEach(key => {
  proxys[`^/${key}`] = {
    target: `https://${key}.${serverUrl}`,
    changeOrigin: true,
    pathRewrite: { [`^/${key}`]: "" },
    onProxyReq: proxyReq => {
      if (proxyReq.getHeader("origin")) {
        proxyReq.setHeader("origin", `https://${key}.${serverUrl}`);
      }
    },
    onProxyRes: proxyRes => {
      const cookies = proxyRes.headers["set-cookie"];
      if (cookies) {
        const newCookie = cookies.map(function(cookie) {
          cookie = cookie.replace(`Domain=${serverUrl};`, "");
          cookie = cookie.replace(" Secure; SameSite=None", "");
          return cookie;
        });
        delete proxyRes.headers["set-cookie"];
        proxyRes.headers["set-cookie"] = newCookie;
      }
    }
  };
});

module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  outputDir: "release/img-web/public",
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/main.scss";
        `
      }
    }
  },
  devServer: {
    open: true,
    port: 8080,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: { ...proxys }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "配修社区-商家后台";
      return args;
    });
  }
};
