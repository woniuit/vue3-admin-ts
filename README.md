# vue3-admin-ts

**代码地址**

```
https://github.com/woniuit/vue3-admin-ts.git
```

**后台管理系统**

**技术栈:**

- vue3+ts
- elementplus
- pinia

## 项目架构搭建

### 代码规范

#### prettier

**安装**

```
npm install prettier -D
```

**根目录创建.prettierrc文件**

```js
{
    "useTabs": false,
    "tabWidth": 2,
    "printWidth": 80,
    "singleQuote": true,
    "trailingComma": "none",
    "semi": false
}
```

**根目录创建.prettierignore忽略文件**

```js
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

**VSCode需要安装prettier的插件**

```
Prettier-Code-formatter
```

**在package.json中配置一个scripts**

```
"prettier": "prettier --write ."
```

#### ESLint

**安装**

```
npm install --save-dev eslint eslint-plugin-vue
```

**执行**

```
npx eslint --init
```

**解决eslint和prettier冲突的问题**

```
npm i eslint-plugin-prettier eslint-config-prettier -D
```

**在.eslintrc.cjs中添加prettier插件**

```
extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'plugin:prettier/recommended'
  ],
```



### 第三方库集成

#### element-plus

**安装**

```
pnpm install element-plus
```

**全局完整引入**

在main.ts中

```js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
```

**按需导入**

首先，需要安装两个插件

```
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到 `Vite`

```js
//vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(), // ...
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
});

```

#### axios

**安装**

```
npm install axios
```

**封装axios**

##### **一.入门版**

```js
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
  //AxiosRequestConfig请求配置，比如:
  //url?: string;
  //method?: Method | string;
  //baseURL?: string;
  //transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  //transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  //headers?: AxiosRequestHeaders;
  //params?: any;
  //paramsSerializer?: (params: any) => string;
  //data?: D;
  //timeout?: number;
class myHttp {
    instance: AxiosInstance;
    constructor(config: AxiosRequestConfig) {
        // 创建axios实例
        this.instance = axios.create(config);
    }
    request(config: AxiosRequestConfig): void{
        this.instance.request(config).then((res) => {
            console.log(res)
        })
    }
}
export default myHttp;
```

**使用**

```js
import myHttp from "./axios";
export const http1 = new myHttp({
    baseURL: "/api",
});
```

```js
import { http1 } from "./http/index";
http1.request({
    url: "/login",
    method: "post",
    data: {
        name: "",
        password: "",
    },
});
```



##### **二.扩展**

- 加loading和Message
- 配置不同的baseurl
- 配置全局的loading和单独请求不需要loading
- 配置不同的请求头

```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElLoading, ElMessage } from "element-plus";
//Loading
function startLoading() {
    const loading = ElLoading.service({
        lock: true,
        text: "正在请求数据...",
        background: "rgba(0, 0, 0, 0.7)",
    });
    return loading;
}
//
interface interceptorType<T = AxiosResponse> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorCatch?: (error: any) => any;
    responseInterceptor?: (res: T) => T;
    responseInterceptorCatch?: (error: any) => any;
}
interface interceptorTypeConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: interceptorType<T>;
    showLoading?: boolean;
}
class myHttp {
    instance: AxiosInstance;
    interceptors?: interceptorType;
    showLoading: Boolean;
    constructor(config: interceptorTypeConfig) {
        // 创建axios实例
        this.instance = axios.create(config);
        // console.log('config=>>',config)
        //添加拦截
        this.interceptors = config.interceptors;
        this.showLoading = config.showLoading ?? true;
        // 使用拦截器
        // 从config中取出的拦截器是对应的实例的拦截器
        //请求拦截器
        this.instance.interceptors.request.use(this.interceptors?.requestInterceptor, this.interceptors?.requestInterceptorCatch);
        //响应拦截器
        this.instance.interceptors.response.use(this.interceptors?.responseInterceptor, this.interceptors?.responseInterceptorCatch);
        //全局共用的拦截器
        //请求拦截
        this.instance.interceptors.request.use(
            (config) => {
                if (this.showLoading) {
                    startLoading();
                }

                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );
        // 响应拦截
        this.instance.interceptors.response.use(
            (res) => {
                // 将loading移除
                if (this.showLoading) {
                    startLoading().close();
                }
                //

                return res
            },
            (error) => {
                // 将loading移除
                if (this.showLoading) {
                    startLoading().close();
                }
                if (error && error.response) {
                    // 1.公共错误处理
                    // 2.根据响应码具体处理
                    switch (error.response.status) {
                        case 400:
                            error.ElMessage = "错误请求";
                            break;
                        case 401:
                            error.ElMessage = "未授权，请重新登录";
                            break;
                        case 403:
                            error.ElMessage = "拒绝访问";
                            break;
                        case 404:
                            error.ElMessage = "请求错误,未找到该资源";
                            // window.location.href = "/NotFound";
                            break;
                        case 405:
                            error.ElMessage = "请求方法未允许";
                            break;
                        case 408:
                            error.ElMessage = "请求超时";
                            break;
                        case 500:
                            error.ElMessage = "服务器端出错";
                            break;
                        case 501:
                            error.ElMessage = "网络未实现";
                            break;
                        case 502:
                            error.ElMessage = "网络错误";
                            break;
                        case 503:
                            error.ElMessage = "服务不可用";
                            break;
                        case 504:
                            error.ElMessage = "网络超时";
                            break;
                        case 505:
                            error.ElMessage = "http版本不支持该请求";
                            break;
                        default:
                            error.ElMessage = `连接错误${error.response.status}`;
                    }
                } else {
                    // 超时处理
                    if (JSON.stringify(error).includes("timeout")) {
                        ElMessage.error("服务器响应超时，请刷新当前页");
                    }
                    error.ElMessage = "连接服务器失败";
                }

                ElMessage.error(error.response.data);
                /***** 处理结束 *****/
                //如果不需要错误处理，以上的处理过程都可省略
                return Promise.resolve(error.response);
                // return err;
            }
        );
    }
    request<T = any>(config: interceptorTypeConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
    
          // 判断是否需要显示loading
          if (config.showLoading === false) {
            this.showLoading = config.showLoading
          }
    
          this.instance
            .request<any, T>(config)
            .then((res) => {
              // 单个请求对数据的处理
            //   if (config.interceptors?.responseInterceptor) {
            //     res = config.interceptors.responseInterceptor(res)
            //   }
              // 将showLoading设置true, 这样不会影响下一个请求
              this.showLoading = true
    
              // 将结果resolve返回出去
              resolve(res)
            })
            .catch((err) => {
              // 将showLoading设置true, 这样不会影响下一个请求
              this.showLoading = true
              reject(err)
              return err
            })
        })
      }
}
export default myHttp;
```

**使用**

```js
import myHttp from "./axios";
//可以new多个http,互不影响
export const axios = new myHttp({
    baseURL: "/api",
    timeout: 8000,
    headers: {
        "Content-Type": "application/json",
    },
    interceptors: {
        requestInterceptor: (config) => {
            // 携带token的拦截
            console.log("请求拦截1", config);
            return config;
        },
        requestInterceptorCatch: (err) => {
            console.log("请求错误拦截1");
            return err;
        },
        responseInterceptor: (res) => {
            console.log("响应拦截1");
            return res;
        },
        responseInterceptorCatch: (err) => {
            console.log("错误响应拦截1");
            return err;
        },
    },
});
```

```js
axios.request({
    showLoading: true, //是否开启loading
    url: "/login",
    method: "post",
    data: {
   
    },
    //单独的请求头
    //   headers: {
    //     "Content-Type": "application/json123",
    // },
});
```

##### 三.api文件管理

```js
import { axios } from "./http/index";

export function axiosdemo(data) {
  return axios.request({
    showLoading: true, //是否开启loading
    url: "/login",
    method: "post",
    data: {
   
    },
    //单独的请求头
    //   headers: {
    //     "Content-Type": "application/json123",
    // },
});
}
```

#### vue-router

**安装**

```
npm install vue-router@4
```

**使用**

在src下的router文件夹中创建index.ts文件

```typescript
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
];
const router = createRouter({
    routes,
    history: createWebHashHistory(),
});
export default router;

```

在main.ts中

```js
import router from './router'
app.use(router)
```

app.vue

```vue
<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import { onBeforeUpdate, ref } from "vue";
</script>

<style scoped lang="less"></style>

```

#### pinia

**安装**

```
npm install pinia
```

```
npm i pinia-plugin-persist --save //持久化插件
```

mainjs

```js
import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);
```

**index.js**

```js
import { useAppStore } from './modules/app';
export { useAppStore };
```

**在store文件夹中创建modules文件夹**

```js
import { defineStore } from 'pinia'
import {LoginType} from './type'
export const loginStore = defineStore('main', {
    state:():LoginType => {
        return {
            token: "",
            menulist: [], //左侧菜单
        };
    },
})
```

**使用**

```js
 import { useAppStore } from '/@/store';
 const appStore = useAppStore();
```

#### vite.config.ts

```js
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

```

#### 初始化样式

**normalize.css**

1.安装依赖

```npm
npm install --save normalize.css
```

2.main.js(入口)文件引入

```js
import 'normalize.css/normalize.css'
```



