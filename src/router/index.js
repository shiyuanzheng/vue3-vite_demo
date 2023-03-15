import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { usePermissionStore } from '@/stores'
import { getToken } from '@/utils/cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteRouteList = ['/login']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

//路由全局前置守卫
router.beforeEach(async (to, from, next) => {
  const { menuListFun, getIsDynamicAddedRoute } = usePermissionStore()
  NProgress.start()
  console.log('路由全局前置守卫', to, from)
  if (getToken()) {
    if (getIsDynamicAddedRoute) {
      NProgress.done()
      return next()
    }
    try {
      await menuListFun()
      next()
    } catch (error) {
      next('/login')
    }
  } else {
    if (whiteRouteList.includes(to.path)) next()
    else next(`/login`)

    NProgress.done()
  }
})

//路由全局后置守卫
router.afterEach((to, from, next) => {
  NProgress.done()
})

export default router
