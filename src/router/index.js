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
  const { generateMenus, getIsDynamicAddedRoute } = usePermissionStore()
  const { setLogout } = useUserStore()
  NProgress.start()
  if (getToken()) {
    if (getIsDynamicAddedRoute) {
      NProgress.done()
      return next()
    }
    try {
      const asyncRoutes = await generateMenus()
      asyncRoutes.forEach((route) => {
        router.addRoute('layout', route)
      })

      next({ path: `${to.path}`, replace: true })
    } catch (error) {
      next('/login')
      setLogout()
      throw new Error(error)
    }
  } else {
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
