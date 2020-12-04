// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: false,
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'gzip',
  },
  outputPath: './release/img-web/public',
  qiankun: {
    slave: {
      jsSandbox: true,
    },
  },
  base: '/',
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  devServer: {
    port: 8092,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy,
  history: {
    type: 'browser',
  },
  manifest: {
    basePath: '/',
  },
});
