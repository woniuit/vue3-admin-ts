import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

interface interceptorType<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
interface interceptorTypeConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: interceptorType<T>
  showLoading?: boolean
}
//Loading
function startLoading() {
  const loading = ElLoading.service({
    lock: true,
    text: '正在请求数据...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return loading
}

class myHttp {
  instance: AxiosInstance
  interceptors?: interceptorType
  showLoading: Boolean
  constructor(config: interceptorTypeConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // console.log('config=>>',config)
    //添加拦截
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true
    // 使用拦截器
    // 从config中取出的拦截器是对应的实例的拦截器
    //请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    //响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //全局共用的拦截器
    //请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          startLoading()
        }

        return config
      },
      (error) => {
        Promise.reject(error)
      }
    )
    // 响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        if (this.showLoading) {
          startLoading().close()
        }
        //
        return res
      },
      (error) => {
        // 将loading移除
        if (this.showLoading) {
          startLoading().close()
        }
        if (error && error.response) {
          // 1.公共错误处理
          // 2.根据响应码具体处理
          switch (error.response.status) {
            case 400:
              error.ElMessage = '错误请求'
              break
            case 401:
              error.ElMessage = '未授权，请重新登录'
              break
            case 403:
              error.ElMessage = '拒绝访问'
              break
            case 404:
              error.ElMessage = '请求错误,未找到该资源'
              // window.location.href = "/NotFound";
              break
            case 405:
              error.ElMessage = '请求方法未允许'
              break
            case 408:
              error.ElMessage = '请求超时'
              break
            case 500:
              error.ElMessage = '服务器端出错'
              break
            case 501:
              error.ElMessage = '网络未实现'
              break
            case 502:
              error.ElMessage = '网络错误'
              break
            case 503:
              error.ElMessage = '服务不可用'
              break
            case 504:
              error.ElMessage = '网络超时'
              break
            case 505:
              error.ElMessage = 'http版本不支持该请求'
              break
            default:
              error.ElMessage = `连接错误${error.response.status}`
          }
        } else {
          // 超时处理
          if (JSON.stringify(error).includes('timeout')) {
            ElMessage.error('服务器响应超时，请刷新当前页')
          }
          error.ElMessage = '连接服务器失败'
        }

        ElMessage.error(error.response.data)
        /***** 处理结束 *****/
        //如果不需要错误处理，以上的处理过程都可省略
        return Promise.resolve(error.response)
        // return err;
      }
    )
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
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
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
export default myHttp
