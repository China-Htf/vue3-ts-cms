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
