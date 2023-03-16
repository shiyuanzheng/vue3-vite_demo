import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { usePermissionStore, useUserStore } from '@/stores'
import { getToken, removeToken } from '@/utils/cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteRouteList = ['/login']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

/**
 * @description: 路由全局前置守卫
 * @param {*}
 * @return {*}
 */
router.beforeEach(async (to, from, next) => {
  const { generateMenus, getIsDynamicAddedRoute, getAddRoutes } = usePermissionStore()
  const { setLogout } = useUserStore()

  NProgress.start()
  if (getToken()) {
    if (getIsDynamicAddedRoute) {
      NProgress.done()
      return next()
    }
    try {
      console.log('%c [ to ] ', 'font-size:13px; background:pink; color:#bf2c9f;', to)
      const Routes = await generateMenus()
      console.log('%c [ Routes ] ', 'font-size:13px; background:pink; color:#bf2c9f;', Routes)
      router.addRoute([
        {
          name: 'main-dynamic-menu',
          children: Routes
        },
        { path: '*', redirect: { name: '404' } }
      ])
      console.log(
        '%c [ router ] ',
        'font-size:13px; background:pink; color:#bf2c9f;',
        router.getRoutes()
      )
      next({ ...to, replace: true })
    } catch (error) {
      throw error
      next('/login')
      setLogout()
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
