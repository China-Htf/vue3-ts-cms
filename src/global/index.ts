/**
 * App：vue内部给 app 添加的类型
 */
import type { App } from 'vue'
// 自定义组件：element-plus 的使用
import registerElement from './register-element'

// 导出注册的element组件
export function registerApp(app: App) {
  // 自定义组件进行使用，并且  app 传参过去
  app.use(registerElement)
}
