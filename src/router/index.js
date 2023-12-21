import { createRouter, createWebHistory } from 'vue-router'
import constantRouterMap from './routes'
import { usePermissionStore, useUserStore } from '@/stores'
import { getToken, removeToken } from '@/utils/cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteRouteList = ['/login']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRouterMap
})

/**
 * @description: 路由全局前置守卫
 * @param {*}
 * @return {*}
 */
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  const { generateMenus, getIsDynamicAddedRoute } = usePermissionStore()
  const { setLogout } = useUserStore()

  // 如果已经登录
  if (getToken()) {
    // 如果是动态添加路由
    if (getIsDynamicAddedRoute) {
      NProgress.done()
      return next()
    }
    try {
      // 获取异步路由
      const asyncRoutes = await generateMenus()
      // 遍历异步路由
      asyncRoutes.forEach((route) => {
        // 添加路由
        router.addRoute('layout', route)
      })

      // 跳转到指定路由
      next({ path: `${to.path}`, replace: true })
    } catch (error) {
      // 如果出错，跳转到登录页面
      next('/login')
      setLogout()
      throw error
    }
  } else {
    // 如果未登录，则跳转到登录页面
    if (whiteRouteList.includes(to.path)) next()
    else {
      next('/login')
      setLogout()
    }
    NProgress.done()
  }
})

//路由全局后置守卫
router.afterEach((to, from, next) => {
  NProgress.done()
})

export default router
