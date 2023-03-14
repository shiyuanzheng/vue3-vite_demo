import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import pinia from './stores/pinia'

import '@/styles/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  if (key === 'Menu') app.component('IconMenu', component)
  else app.component(key, component)
}

app.mount('#app')
