const serverUrl = process.env.BASE_API;

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
  productionSourceMap: false,
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
      args[0].title = "信息展馆-商家后台";
      return args;
    });
  }
};
