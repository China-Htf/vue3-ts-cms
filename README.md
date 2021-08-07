# vue3-ts-cms

## 一、创建项目

### webpack

#### 创建

```node
vue create vue3-ts-cms
```

#### 配置

```
Default ([Vue 2] babel, eslint)
Default (Vue 3) ([Vue 3] babel, eslint)
Manually select features	自己选择配置
```

```
 (*) Choose Vue version		可选择 vue 版本（√）
 (*) Babel					是否选择 babel(例如: es6 转换 es5)（√）
 (*) TypeScript  			是否使用 TypeScript（√）
 ( ) Progressive Web App (PWA) Support  项目是否支持 PWA（X）
 ( ) Router					是否默认添加 router 路由（后续自行配置路由）
 ( ) Vuex					是否默认添加 Vuex 状态管理（后续自行配置）
 (*) CSS Pre-processors		是否选择 CSS 预处理器（√）
 (*) Linter / Formatter		是否选择 ESLint 对代码进行格式化限制（√）
 ( ) Unit Testing			是否添加单元测试（X）
 ( ) E2E Testing			是否添加 E2E 测试（X）
```

#### 版本

```
  2.x
> 3.x	选择 vue3
```

#### 风格

```
Use class-style component syntax? (y/N)	是否使用 class 风格组件（N）不使用
```

#### Babel

```
Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? (Y/n)
是否使用 Babel 处理 TS （Y）使用
```

#### 预处理器

```
  Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
> Less		此时我们使用 LESS
  Stylus
```

#### ESLint

```
  ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
> ESLint + Prettier		Prettier 使代码看起来更优雅 使用这个
  TSLint (deprecated)
```

```
>(*) Lint on save	保存的时候就使用 Lint
 ( ) Lint and fix on commit
```

#### 储放

```
> In dedicated config files		配置信息单独储放一个文件 使用该项
  In package.json
```

#### 保存

```
Save this as a preset for future projects? (y/N)
保存配置信息，方便下次使用 （N）不需要
```

## 二、项目规范

### 代码规范

#### editorconfig

> EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。
>
> VSCode需要安装一个插件：EditorConfig for VS Code

```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

#### prettier

> Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。
>
> VSCode需要安装prettier的插件

##### 安装

```shell
npm install prettier -D
```

##### 配置.prettierrc文件

* useTabs：使用tab缩进还是空格缩进，选择false；
* tabWidth：tab是空格的情况下，是几个空格，选择2个；
* printWidth：当行字符的长度，推荐80，也有人喜欢100或者120；
* singleQuote：使用单引号还是双引号，选择true，使用单引号；
* trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
* semi：语句末尾是否要加分号，默认值true，选择false表示不加；

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

##### 创建.prettierignore忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

##### package.json配置scripts

```json
"prettier": "prettier --write ."
```

## 三、第三方库集成

### vue-router

#### 安装

```shell
npm install vue-router@next
```

#### 创建

```typescript
/**
 * createRouter：创建路由
 * createWebHashHistory：路由模式
 */
import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * type：代表引入的是一个类型
 * RouteRecordRaw：router提供的路由类型
 */
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    // 默认路由
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  },
]

const router = createRouter({
  // 引入路由
  routes,
  // 设置路由模式
  history: createWebHashHistory()
})

export default router

```

#### 配置

```typescript
import router from './router'
createApp(App).use(router).mount('#app')
```

#### 使用

```typescript
<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
  </div>
</template>
```

### vuex

#### 安装

```shell
npm install vuex@next
```

#### 创建

```typescript
/**
 * createStore：创建 vuex
 */
import { createStore } from 'vuex'

const store = createStore({
  state: () => {
    return {
      name: 'coderhtf'
    }
  }
})

export default store

```

#### 配置

```typescript
createApp(App).use(router).use(store).mount('#app')
```

#### 使用

```typescript
<h2>{{ $store.state.name }}</h2>
```

### element-Plus

#### 安装

```shell
npm install element-plus
```

#### 全局

```typescript
// 引入组件库
import ElementPlus from 'element-plus'
// 引入样式
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
```

#### 局部

> 安装babel的插件：

```shell
npm install babel-plugin-import -D
```

> 配置babel.config.js
>
> 详见官方文档，有介绍

```json
module.exports = {
  plugins: [
    [
      'import',
      {
        // 从该库引入东西时
        libraryName: 'element-plus',
        customStyleName: name => {
          // 引入相应的 css 文件
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}

```

> 局部引入组件进行封装
>
> element-plus 的组件进行全局注册，各组件使用的时候，不需要引入
>
> main.js：组件进行全局注册

```typescript
// 引入自定义组件
import { registerApp } from './global'

/**
 * 注册 element-plus
 * app 对象传参过去
 */
app.use(registerApp)
```

> global文件夹的index

```typescript
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

```

> register-element：该文件就是储存全局注册的element组件

```typescript
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

```

### axios

#### 安装

```shell
npm install axios
```

#### 封装

> service/index.ts
>
> 总出口

```typescript
// TFRequest 封装的 axios 请求组件
import TFRequest from './request'

const tfRequest = new TFRequest({
  /**
   * 环境变量中设置的
   * VUE_APP_BASE_URL：请求前缀路径
   * VUE_APP_TIME_OUT：请求超时时间
   */
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: process.env.VUE_APP_TIME_OUT
})

export default tfRequest

```

> service/request/index.ts
>
> 封装的axios组件

```typescript
// 引入 axios
import axios from 'axios'
// 引入类型
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class TFRquest {
  // 创建一个实例对象
  instance: AxiosInstance
  // 构造器：通过new关键字创建一个实例时，构造函数会被调用
  // 构造函数不需要返回任何值，默认返回当前创建出来的实例
  // config：请求的网络地址
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }
  // 开始请求
  // config：请求后缀以及方式
  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then(res => {
      console.log(res)
    })
  }
}

export default TFRquest

```

#### 使用

```typescript
import tfRequest from './service'

tfRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
```

#### 拦截与响应

> TFRequestInterceptors:设置请求接口以及类型
>
> TFRequestConfig：axios内置类型继承过去以及自定义接口赋值进去
>
> interceptors：设置我们的实例对象
>
> ?. 都设置成为可选类型 可使用拦截器可不使用

```typescript
// 定义请求拦截器与响应器接口
interface TFRequestInterceptors {
  // 请求拦截器成功
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 请求拦截器失败
  requestInterceptorCatch?: (error: any) => any
  // 请求响应器成功
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  // 请求响应器失败
  responseInterceptorCatch?: (error: any) => any
}

// TFRequestConfig 继承 AxiosRequestConfig 的类型
// TFRequestInterceptors 定义的类型赋值进去
interface TFRequestConfig extends AxiosRequestConfig {
  interceptors?: TFRequestInterceptors
}

class TFRquest {
  // 创建一个实例对象
  instance: AxiosInstance
  interceptors?: TFRequestInterceptors
  // 构造器：通过new关键字创建一个实例时，构造函数会被调用
  // 构造函数不需要返回任何值，默认返回当前创建出来的实例
  // config：请求的网络地址
  constructor(config: TFRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

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
      return config
    },
    (err) => {
      console.log('所有请求拦截失败')
      return err
    })
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有请求响应成功');
        return res
    },
    (err) => {
      console.log('所有请求响应失败');
      return err
    })
  }
```

> service/index.ts
>
> 使用

```typescript
  interceptors: {
    requestInterceptor: (config) => {
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
```

#### 接口类型封装

> type.ts

```typescript
import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义请求拦截器与响应器接口
export interface TFRequestInterceptors {
  // 请求拦截器成功
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 请求拦截器失败
  requestInterceptorCatch?: (error: any) => any
  // 请求响应器成功
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  // 请求响应器失败
  responseInterceptorCatch?: (error: any) => any
}

// TFRequestConfig 继承 AxiosRequestConfig 的类型
// TFRequestInterceptors 定义的类型赋值进去
export interface TFRequestConfig extends AxiosRequestConfig {
  interceptors?: TFRequestInterceptors
}

```

> index.ts

```typescript
import type {TFRequestInterceptors,TFRequestConfig} from './type'
```

#### 全局请求拦截

```typescript
this.instance.interceptors.request.use(
  (config) => {
  console.log('所有请求成功拦截')
  return config
},
(err) => {
  console.log('所有请求拦截失败')
  return err
})
this.instance.interceptors.response.use(
  (res) => {
    console.log('所有请求响应成功');
    return res
},
(err) => {
  console.log('所有请求响应失败');
  return err
})
```

#### 单独请求拦截

```typescript
  request(config: TFRequestConfig): void {
    // 单独请求拦截
    if(config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    this.instance.request(config).then(res => {
      if(config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res);

    })
  }
```

> 使用
>
> main.ts

```typescript
tfRequest.request({
  url: '/home/multidata',
  method: 'GET',
  // 每个请求单独的拦截
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求');
      return config
    }
  }
})
```

## 四、基本搭建

### token

> 在我们每个实例的请求中，都需要携带 token
>
> service/index.ts

```typescript
// 携带 token 的拦截
const token = ''
 f (token) {
  config.headers.Authorization = `Bearer ${token}`
}
console.log('请求拦截器成功');
```

### 错误信息

```typescript
// 服务器返回错误信息
const data = res.data
if (data.returnCode === '-1001') {
  console.log('错误信息 请求失败');
} else {
  return data
}
```

```typescript
// 响应失败
if (err.response.status === 404) {
  console.log('404的错误');
}
return err
```

### loading

> service/request/index.ts

```typescript
import { ElLoading } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

class TFRquest {
    loading?: ILoadingInstance
    
    // 添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
      console.log('所有请求成功拦截')
      // 开启 loading
      this.loading = ElLoading.service({
        // 开启蒙版效果
        lock: true,
        // 显示文字
        text: '请求加载中....',
        // 背景颜色
        background: 'rgba(0, 0, 0, 0.5)'
      });
      return config
    },
        
    this.instance.interceptors.response.use(
    	(res) => {
        	console.log('所有请求响应成功');
        	// 将loading移除
          	this.loading?.close()
        },
        (err) => {
            // 将 loading 移除
        	this.loading?.close()
        }
    )
}
```

## 五、首页