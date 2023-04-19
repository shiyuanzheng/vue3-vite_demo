<template lang="">
  <el-aside class="common-aside fixed">
    <div class="aside-logo">
      <a href="/">
        <img alt="logo" class="logo" src="@/assets/logo.svg" />
        <span v-show="!settings.getAsideCollapse">ElementPlus Admin</span>
      </a>
    </div>
    <el-scrollbar>
      <el-menu :collapse="settings.getAsideCollapse">
        <SubMenu v-for="menu in menus" :key="menu.id" :menu="menu" />
      </el-menu>
    </el-scrollbar>
    <div class="aside-collapse">
      <el-button
        :icon="settings.getAsideCollapse ? 'Expand' : 'Fold'"
        @click="settings.setAsideCollapse(!settings.getAsideCollapse)"
      />
    </div>
  </el-aside>
</template>

<script setup>
import SubMenu from './AsideSubMenu.vue'
import { useSettingsStore, usePermissionStore } from '@/stores'
const settings = useSettingsStore()

const permission = usePermissionStore()
const menus = permission.getMenuList
</script>
