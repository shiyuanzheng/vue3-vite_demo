import { defineStore } from 'pinia'
import request from '@/utils/request'

let modules = import.meta.glob('../../views/**/index.vue')

// const componentCache = new Map()
// function loadView(URL) {
//   if (componentCache.has(URL)) {
//     return componentCache.get(URL)
//   }
//   const component = () => import(`../../views/${URL.replace(/\/:id\*/g, '')}/index.vue`)
//   componentCache.set(URL, component)
//   return component
// }

export const usePermissionStore = defineStore('permission', {
  // persist: true, //固化数据，存储在localStorage
  state: () => ({
    menuList: [],
    dynamicMenuRoutes: [],
    isDynamicAddedRoute: false
  }),
  getters: {
    getMenuList: (state) => state.menuList,
    getDynamicMenuRoutes: (state) => state.dynamicMenuRoutes,
    getIsDynamicAddedRoute: (state) => state.isDynamicAddedRoute
  },
  actions: {
    setMenuList(list) {
      this.$patch({ menuList: list })
    },
    setDynamicMenuRoutes(routes) {
      this.$patch({ dynamicMenuRoutes: routes })
    },
    setIsDynamicAddedRoute(bool) {
      this.$patch({ isDynamicAddedRoute: bool })
    },

    async generateMenus() {
      try {
        const { data } = await request.get('sys/menu/nav')
        const routes = await this.fnAddDynamicMenuRoutes(data)
        this.setMenuList(data)
        this.setDynamicMenuRoutes(routes)
        this.setIsDynamicAddedRoute(true)
        return routes
      } catch (error) {
        throw error
      }
    },

    async fnAddDynamicMenuRoutes(menus = [], routes = []) {
      const temp = []
      for (const { url = '', icon, id, name: title, children = [] } of menus) {
        if (children && children.length >= 1) {
          temp.push(...children)
          continue
        }
        const URL = url || ''.replace(/{{([^}}]+)?}}/g, (_, expr) => Function(`return ${expr}`)())
        const path = `/${URL}`
        const name = URL.replace(/\//g, '-').replace(/-:id\*/g, '')
        const component = modules[`../../views/${URL.replace(/\/:id\*/g, '')}/index.vue`]
        const menu = { path, component, name, meta: { menuId: id, title, icon } }
        routes.push(menu)
      }
      if (temp.length >= 1) {
        return await this.fnAddDynamicMenuRoutes(temp, routes)
      }
      return routes
    }
  }
})
