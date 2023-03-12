import { defineConfig, Required } from 'yapi-to-typescript';

export default defineConfig([
  {
    serverUrl: 'https://yapi.huianrong.com/',
    typesOnly: false,
    target: 'typescript',
    reactHooks: {
      enabled: false
    },
    outputFilePath: (interfaceInfo) => {
      const url = interfaceInfo._project.basepath;
      if (url === '/cbd-api-project') {
        return `src/api/index.ts`;
      }
      return `src/api/${interfaceInfo._project.basepath}.ts`;
    },
    requestFunctionFilePath: 'src/api/request.ts',
    dataKey: 'data',
    preproccessInterface(interfaceInfo) {
      /* eslint-disable */
      const { method, req_query } = interfaceInfo;
      if (method === 'GET' && req_query.length > 0) {
        /* eslint-enable */
        interfaceInfo.req_query.forEach((item) => {
          item.required = Required.false;
        });
      }
      return interfaceInfo;
    },
    projects: [
      {
        token: [
          // mis
          '22b9a32aaf95326326d34134f4861fd832a4c332cd5def0d5e3f8aba95940eea',
          // pcs
          'abb11c9f0ebcd844f74fc3716a408fd530eb34f87f74b16495c08bcd5cc47308',
          // 场馆
          'ae4292c028dd3c962592a39fe650424fe3f26641d5d81c323b54188eeaa33412',
          // 统一登录平台
          '4aac62eeac2bb1eafb22bd70ede2a843a4acc2d65bed07b1d362f1cacc65cb81',
          // 储值卡
          'b90e1106bdc66a41c06686c262b187c7a8f7e5f60ebd1d4423e4bad230fe1feb'
        ],
        categories: [
          {
            id: 0,
            getRequestFunctionName(interfaceInfo, changeCase) {
              return changeCase.camelCase(
                `${interfaceInfo.path} ${interfaceInfo.method}`
              );
            }
          }
        ]
      }
    ]
  }
]);
