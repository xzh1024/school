import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import Pages from 'vite-plugin-pages';
import { viteMockServe } from 'vite-plugin-mock';
import configResolverPlugin from './plugin/resolver';
import VitePluginLocalStoreVersion from './plugin/vite-plugin-local-store-version';
import vitePluginVirtualSettings from './plugin/vite-plugin-virtual-settings';

console.log(process.env.MODE);
export default defineConfig({
  plugins: [
    vitePluginVirtualSettings(),
    VitePluginLocalStoreVersion(),
    configResolverPlugin(),
    vue({
      template: {
        transformAssetUrls: {
          'video': ['src', 'poster'],
          'source': ['src'],
          'img': ['src'],
          'image': ['xlink:href', 'href'],
          'use': ['xlink:href', 'href'],
          'a-image': ['src']
        }
      },
      // reactivityTransform: true
      reactivityTransform: resolve(__dirname, '../src')
    }),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    viteMockServe({
      mockPath: 'mock'
      // configPath: 'mock/index.ts'
    }),
    Pages({
      dirs: 'src/views',
      exclude: [
        '**/components/*.vue',
        '**/locale/*.ts',
        '**/**/mock.ts',
        '**/__components__/*.vue',
        // '**/scv/login/**'  等待后端开放svc auth在关闭入口
        // '**/project/login/**'
      ],
      extendRoute(route) {
        return {
          ...route,
          meta: {
            requiresAuth: !['project-login', 'not-found'].includes(route.name),
            layout: !['project-login'].includes(route.name),
            ...route.meta
          }
        };
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src')
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets')
      },
      // {
      //   find: 'vue-i18n',
      //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js' // Resolve the i18n warning issue
      // },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js' // compile template
      }
    ],
    extensions: ['.ts', '.js']
  },
  define: {
    'process.env': {}
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            'src/styles/breakpoint.less'
          )}";`
        },
        javascriptEnabled: true
      }
    }
  }
});
