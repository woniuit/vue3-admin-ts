import myHttp from "./axios";
// 可以new出不同的实例，不同的baseURL不同的headers不同的拦截等，互不影响
export const axios = new myHttp({
    baseURL: "http://127.0.0.1:5173",
    timeout: 10*1000,
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
            console.log("响应拦截1");
            return res;
        },
        responseInterceptorCatch: (err) => {
            // console.log("错误响应拦截1");
            return err;
        },
    },
});
