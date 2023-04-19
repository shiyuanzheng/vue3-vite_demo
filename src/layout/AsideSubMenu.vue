<template>
  <el-sub-menu v-if="menu.children && menu.children.length >= 1" :index="menu.id">
    <template #title>
      <el-icon>
        <svg-icon
          v-if="menu.icon && menu.icon.includes('icon')"
          :icon-class="menu.icon"
          class="icon"
        />
        <component v-else class="icons" :is="menu.icon" />
      </el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <SubMenu v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-sub-menu>

  <el-menu-item v-else :index="menu.id" @click="gotoRouteHandle(menu.id)">
    <el-icon v-if="menu.icon">
      <svg-icon :icon-class="menu.icon" class="icon" />
    </el-icon>
    <span v-show="!menu.icon" style="display: inline-block; width: 8px"></span>
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
  </el-menu-item>
</template>

<script setup>
import SubMenu from './AsideSubMenu.vue'
import { useRouter } from 'vue-router'
import { usePermissionStore } from '@/stores'
const router = useRouter()
//defineProps 来接收组件的传值
const props = defineProps({
  menu: {
    type: Object,
    default: () => {}
  }
})

const { dynamicMenuRoutes } = usePermissionStore()

const gotoRouteHandle = (menuId) => {
  const route = dynamicMenuRoutes.filter((item) => item.meta.menuId === menuId)[0]
  if (route) {
    router.push({ name: route.name })
  }
}
</script>
