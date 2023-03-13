import { defineConfig, mergeConfig } from 'vite';
// import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';
// import checker from 'vite-plugin-checker';

export default mergeConfig(
  defineConfig({
    mode: 'development',
    server: {
      // hmr: false,
      fs: {
        strict: true
      },
      proxy: {
        // '/cbd-api-project': 'https://stgcbd-mis.huianrong.com', // test
        '/cbd-api-project': 'http://192.168.3.232:99', // dev
        // '/cbd-api-portal': 'http://192.3.120.151',
        '/cbd-api-portal': 'http://192.168.3.232:99', // dev
        // '/cbd-api-project': 'http://192.168.40.13:8080', // dev 张贵荣
        '/flowable-engine': 'http://192.168.3.233:50013',
        // '/cbd-api-portal': 'http://192.3.120.151',
        '/svc-web': 'http://192.168.3.151',
        // '/cbd-api-project': 'http://192.168.40.111:8080' // 田奇
        // '/cbd-api-project': 'http://192.168.50.7:8080'
        // '/cbd-api-project': 'http://192.168.50.7:8080', // 陈明明
        // '/cbd-api-project': 'http://192.168.50.12:8080' // 张俊哲,
        // '/cbd-api-project': 'http://192.168.50.53:8080' // 罗驰,
        // '/cbd-api-project': 'http://192.168.3.232:99'
        // '/cbd-api-project': 'http://192.168.40.66:8080' // 梁旭
        /* 成都体投-PC */
        '/ground-pc-api': 'http://192.168.3.232:99'
        // '/ground-pc-api': 'http://192.168.50.7:9402',  // 陈明明
      }
    },
    plugins: [
      // checker({
      //   vueTsc: true
      // })
      // eslint({
      //   include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      //   exclude: ['node_modules']
      // })
    ]
  }),
  baseConfig
);
