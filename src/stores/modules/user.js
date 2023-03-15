import { defineStore } from 'pinia'
import { getCurrentInstance } from 'vue'
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
    setUserInfo(info) {
      this.userInfo = info
    },
    loginFun(params) {
      return new Promise((resolve, reject) => {
        request
          .post('login', params)
          .then(({ data }) => {
            this.$patch({ token: data.token })
            setToken(data.token, data.expires)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logoutFun(params) {
      return new Promise((resolve, reject) => {
        request
          .post('logout', params)
          .then((res) => {
            this.setLogout()
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    userInfoFun() {
      return new Promise((resolve, reject) => {
        request
          .get('user')
          .then((res) => {
            this.setUserInfo(res.data)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async setLogout() {
      this.$reset()
      removeToken()
      usePermissionStore().$reset()
    }
  }
})
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
// }
