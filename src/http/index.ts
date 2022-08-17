import myHttp from "./axios";
export const axios = new myHttp({
    baseURL: "/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    interceptors: {
        requestInterceptor: (config) => {
            // 携带token的拦截
            // console.log("请求拦截1", config);
            return config;
        },
        requestInterceptorCatch: (err) => {
            // console.log("请求错误拦截1");
            return err;
        },
        responseInterceptor: (res) => {
            // console.log("响应拦截1");
            return res;
        },
        responseInterceptorCatch: (err) => {
            // console.log("错误响应拦截1");
            return err;
        },
    },
});
