<template lang="">
  <el-aside :class="['common-aside', 'fixed']">
    <el-scrollbar>
      <el-menu :collapse="settings.getAsideCollapse">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>

      <el-button
        :icon="settings.getAsideCollapse ? 'Expand' : 'Fold'"
        @click="settings.setAsideCollapse(!settings.getAsideCollapse)"
      />
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { useSettingsStore, usePermissionStore } from '@/stores'
const settings = useSettingsStore()

const permission = usePermissionStore()
const routes = permission.getMenuList
</script>
