import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
function resolve(dir) {
  return path.join(__dirname, dir)
}
export default defineConfig({
  //   base: './',
  // root: path.join(__dirname, "src"),
  // 配置代理服务器
  server: {
    port: 5173,
    proxy: {
      // 配置的代理不能超过10个
      // "/api": {
      //     target: "http://127.0.0.1:5173",
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //     // httppathRewrite: {
      //     //     "^/api": "",
      //     // },
      //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      // },
    }
  },
  plugins: [
    vue(), // ...
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  build: {
    target: ['edge90', 'chrome90', 'firefox90', 'safari15']
  },
  // 别名
  resolve: {
    // 别名配置
    alias: {
      // "@": path.join(__dirname, "src"),
      '@': path.join('src')
    }
  }
})
