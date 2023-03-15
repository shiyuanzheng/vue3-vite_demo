import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', {
  persist: true,
  state: () => ({
    // 导航条, 布局风格, default(白色) / colorful(鲜艳)
    navbarLayoutType: 'default',
    // 侧边栏, 布局皮肤, default(白色) / dark(黑色)
    sidebarLayoutSkin: 'default',
    // 侧边栏, 折叠状态
    asideCollapse: false,
    // 侧边栏, 菜单
    sidebarMenuList: [],
    sidebarMenuActiveName: '',
    // 内容, 是否需要刷新
    contentIsNeedRefresh: false,
    // 内容, 标签页(默认添加首页)
    contentTabsActiveName: 'home'
  }),
  getters: {
    getAsideCollapse: (state) => state.asideCollapse
  },
  actions: {
    setNavbarLayoutType(val) {
      this.navbarLayoutType = val
    },
    setSidebarLayoutSkin(val) {
      this.sidebarLayoutSkin = val
    },
    setAsideCollapse(bool) {
      this.asideCollapse = bool
    },
    setSidebarMenuActiveName(val) {
      this.sidebarMenuActiveName = val
    },
    setContentTabsActiveName(name) {
      this.contentTabsActiveName = name
    },
    setContentTabs(val) {
      this.contentTabs = val
    }
  }
})
