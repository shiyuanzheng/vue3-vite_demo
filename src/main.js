import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import pinia from './stores/pinia'
import http from '@/utils/request'
import SvgIcon from './components/SvgIcon/index.vue'
import '@/icons'

import '@/styles/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.component('svg-icon', SvgIcon)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  if (key === 'Menu') app.component('IconMenu', component)
  else app.component(key, component)
}

app.provide('$http', http)
app.config.globalProperties.$http = http

app.mount('#app')
