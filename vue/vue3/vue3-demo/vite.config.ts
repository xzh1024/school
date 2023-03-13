import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mode',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置前端服务地址和端口
  server: {
    host: '0.0.0.0',
    port: 8991,
    // 是否开启 https
    https: false,
    // 设置反向代理，跨域
    proxy: {
      '/api1': {
        // 后台地址
        target: 'http://127.0.0.1:8990/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, '')
      },
      '/api2': {
        // 后台地址
        target: 'http://127.0.0.1:8956/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api2/, '')
      }
    }
  }
})
