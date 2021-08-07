import { createApp } from 'vue'
// 引入自定义组件
import { registerApp } from './global'
import tfRequest from './service'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)
/**
 * 注册 element-plus
 * app 对象传参过去
 */
app.use(registerApp)
app.use(router)
app.use(store)
app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

tfRequest.request<DataType>({
  url: '/home/multidata',
  method: 'GET',
  showLoading: false
})
.then((res) => {
  console.log(res.data);
  console.log(res.returnCode);
  console.log(res.success);
})
