// 引入 axios
import axios from 'axios'
// 引入类型
import type { AxiosInstance } from 'axios'
import type {TFRequestInterceptors,TFRequestConfig} from './type'

import { ElLoading } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEFAULT_LOADING = true

class TFRquest {
  // 创建一个实例对象
  instance: AxiosInstance
  interceptors?: TFRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance
  // 构造器：通过new关键字创建一个实例时，构造函数会被调用
  // 构造函数不需要返回任何值，默认返回当前创建出来的实例
  // config：请求的网络地址
  constructor(config: TFRequestConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 请求拦截器 从 config 取出对应实例的拦截器
    this.instance.interceptors.request.use(
      // interceptors 则是其他组件传过来的参数
      // ps：requestInterceptor 传来这个参数 则使用该方法
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 请求响应器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
      console.log('所有请求成功拦截')
      if(this.showLoading) {
        // 开启 loading
        this.loading = ElLoading.service({
          // 开启蒙版效果
          lock: true,
          // 显示文字
          text: '请求加载中....',
          // 背景颜色
          background: 'rgba(0, 0, 0, 0.5)'
        });
      }
      return config
    },
    (err) => {
      console.log('所有请求拦截失败')
      return err
    })
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有请求响应成功');
        // 将loading移除
        setTimeout(()=> {
          this.loading?.close()
        },1000)

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('错误信息 请求失败');
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有请求响应失败');
        // 将 loading 移除
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404的错误');
        }
        return err
      }
    )
  }
  // 开始请求
  // config：请求后缀以及方式
  request<T>(config: TFRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单独请求对 config 的处理
      if(config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断是否需要显示 loading
      if(config.showLoading === false) {
        this.showLoading = false
      }

      this.instance.request<any, T>(config).then(res => {
        // 单个请求对数据的处理
        if(config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        console.log(res);
        // 将 showLoading 设置为 true 这样不会影响下一个请求
        this.showLoading = DEFAULT_LOADING

        // 将结果返回出去
        resolve(res)
      })
      .catch((err) => {
        // 将 showLoading 设置为 true 这样不会影响下一个请求
        this.showLoading = DEFAULT_LOADING
        reject(err)
        return err
      })
    })
  }

  get<T>(config: TFRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'GET'})
  }
  post<T>(config: TFRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'POST'})
  }
  delete<T>(config: TFRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'DELETE'})
  }
  patch<T>(config: TFRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'PATCH'})
  }
}

export default TFRquest
