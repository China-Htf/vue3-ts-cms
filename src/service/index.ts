// TFRequest 封装的 axios 请求组件
import TFRequest from './request'

const tfRequest = new TFRequest({
  /**
   * 环境变量中设置的
   * VUE_APP_BASE_URL：请求前缀路径
   * VUE_APP_TIME_OUT：请求超时时间
   */
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: process.env.VUE_APP_TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带 token 的拦截
      const token = ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('请求拦截器成功');
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求拦截器失败');
      return err
    },
    responseInterceptor: (res) => {
      console.log('请求响应器成功');
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('请求响应器失败');
      return err
    }
  }
})

export default tfRequest
