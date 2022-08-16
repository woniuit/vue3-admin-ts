# vue3-admin-ts
**ts版vue3+elementPlus+viet+pinia后台管理系统**

## 第三方库集成

### vite.config.ts

### element-plus

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

### axios

**安装**

```
npm install axios
```

**封装axios**

#### **一.入门版**

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



#### **二.扩展一**



### vue-router

### pinia

