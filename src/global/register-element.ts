/**
 * App：vue内部给 app 添加的类型
 */
import { App } from 'vue'
// 样式文件
import 'element-plus/lib/theme-chalk/base.css'

// 导出 element-plus 组件
import {
  ElButton
} from 'element-plus'

// 需要注册的组件
const components = [
  ElButton
]

// 进行导出
export default function(app: App) {
  // 循环出需要注册的组件
  for (const cpn of components) {
    // 进行全局注册
    app.component(cpn.name, cpn)
  }
}
