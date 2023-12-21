import { defineStore } from 'pinia'
import { getCurrentInstance } from 'vue'
import { store } from '@/stores/pinia'
import { setToken, removeToken } from '@/utils/cookie'
import { usePermissionStore } from './permission'
import { useSettingsStore } from './settings'
import request from '@/utils/request'

export const useUserStore = defineStore('user', {
  persist: true,
  state: () => ({
    token: '',
    userInfo: {}
  }),
  getters: {
    getUserInfo: (state) => state.userInfo
  },
  actions: {
    setUserInfo (info) {
      this.userInfo = info
    },

    async loginFun (params) {
      try {
        const data = await request.post('login', params)
        console.log('%c [ data ] ', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        this.$patch({ token: data.token })
        setToken(data.token, data.expires)
        this.userInfoFun()
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async logoutFun (params) {
      try {
        const { data } = await request.post('logout', params)
        this.setLogout()
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async userInfoFun () {
      try {
        const { data } = await request.get('sys/user/info')
        this.setUserInfo(data)
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async setLogout () {
      this.$reset()
      removeToken()
      usePermissionStore().$reset()
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut () {
  return useUserStore(store)
}

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
// }
