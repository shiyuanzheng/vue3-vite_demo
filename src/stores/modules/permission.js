import { defineStore } from 'pinia'
import request from '@/utils/request'

export const usePermissionStore = defineStore('permission', {
  persist: true,
  state: () => ({
    menuList: [],
    isDynamicAddedRoute: false
  }),
  getters: {
    getMenuList: (state) => state.menuList,
    getIsDynamicAddedRoute: (state) => state.isDynamicAddedRoute
  },
  actions: {
    setMenuList(list) {
      this.menuList = list
    },

    setIsDynamicAddedRoute(bool) {
      this.isDynamicAddedRoute = bool
    },

    menuListFun() {
      return new Promise((resolve, reject) => {
        request
          .get('sys/menu/nav')
          .then(({ data }) => {
            this.$patch({ menuList: data })
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    renderMenu() {}
  }
})
