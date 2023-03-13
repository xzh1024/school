import { defineConfig } from "yapi-to-typescript";
export default defineConfig([
  {
    serverUrl: "https://yapi.huianrong.com",
    typesOnly: false,
    target: "typescript",
    devEnvName: "dev",
    prodEnvName: "prod",
    reactHooks: {
      enabled: false
    },

    outputFilePath: (interfaceInfo) => {
      const url = interfaceInfo._project.basepath;
      switch (url) {
        case "/svc-applet":
          return "src/api/card.ts";
        case "/cbd-api-applet":
          return "src/api/index.ts";
        default:
          return `src/api/${interfaceInfo._project.basepath}.ts`;
      }
    },
    requestFunctionFilePath: "src/api/request.ts",
    dataKey: "data",
    getRequestFunctionName(interfaceInfo, changeCase) {
      return changeCase.camelCase(
        `${interfaceInfo.path} ${interfaceInfo.method}`
      );
    },
    projects: [
      {
        token: [
          "4216e36ada41ed166185f17232e0e5c441e68870f3f2b808bd7133a274cbe630", // T立方
          "039537a0009ac1ec6def5a701cf18391358a13fca42bab974ebca5fec92f5e94", // 储值卡
          "3d776078f6592fdec298ca768cbcfb5e27d927d3edb30379afcaee5179afbd4c" // 场馆
        ],
        categories: [
          {
            id: 0
          }
        ]
      }
    ]
  }
]);
