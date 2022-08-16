import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
    // root: path.join(__dirname, "src"),
    // 配置代理服务器
    server: {
        port: 5173,
        proxy: {
            // 配置的代理不能超过10个
            "/api": {
                target: "http://152.136.185.210:4000",
                rewrite: (path) => path.replace(/^\/api/, ""),
                // httppathRewrite: {
                //     "^/api": "",
                // },
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
            },
        },
    },
    plugins: [
        vue(), // ...
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    // 别名
    // resolve: {
    //     // 别名配置
    //     alias: {
    //         "@static": path.join(__dirname, "src/static"),
    //         "@": path.join(__dirname, "src"),
    //     },
    // },
});
