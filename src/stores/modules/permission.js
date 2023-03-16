import { defineStore } from 'pinia'
import request from '@/utils/request'
import Layout from '@/layout/index.vue'

export const usePermissionStore = defineStore('permission', {
  persist: true,
  state: () => ({
    menuList: [],
    addRoutes: [],
    isDynamicAddedRoute: false
  }),
  getters: {
    getMenuList: (state) => state.menuList,
    getAddRoutes: (state) => state.menuList,
    getIsDynamicAddedRoute: (state) => state.isDynamicAddedRoute
  },
  actions: {
    setMenuList(list) {
      this.menuList = list
    },
    setAddRoutes(list) {
      console.log('%c [ list ] ', 'font-size:13px; background:pink; color:#bf2c9f;', list)
      this.addRoutes = list
    },
    setIsDynamicAddedRoute(bool) {
      this.isDynamicAddedRoute = bool
    },

    generateMenus() {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await request.get('sys/menu/nav')
          this.$patch({ menuList: data })
          const routes = await this.fnAddDynamicMenuRoutes(data)
          this.setAddRoutes(routes)
          this.setIsDynamicAddedRoute(true)
          resolve(routes)
        } catch (error) {
          reject(error)
        }
      })
    },

    fnAddDynamicMenuRoutes(data) {
      if (data.length) {
        return data.map((item) => {
          const menu = {
            path: item.url,
            component: Layout,
            name: item.name,
            meta: {
              menuId: item.id,
              title: item.name,
              icon: item.icon
            }
          }
          if (item.children && item.children.length > 0) {
            menu.children = this.fnAddDynamicMenuRoutes(item.children)
          }
          return menu
        })
      }
    }
  }
})
