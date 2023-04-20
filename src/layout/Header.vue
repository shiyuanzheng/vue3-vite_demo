<template lang="">
  <el-header class="common-header fixed">
    <el-menu class="" mode="horizontal">
      <el-menu-item index="1">Element Plus</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
      <el-menu-item h="full" @click="toggleDark()">
        <button
          class="border-none w-full bg-transparent cursor-pointer"
          style="height: var(--ep-menu-item-height)"
        >
          <i inline-flex i="dark:ep-moon ep-sunny" />
        </button>
      </el-menu-item>
    </el-menu>
    <el-switch
      v-model="darkStatus"
      class="mt-2"
      style="margin-left: 24px"
      inline-prompt
      active-icon="Check"
      inactive-icon="Close"
    />
    1<i-material-symbols-3k-plus-outline /> 2<i-ep-aim /> 3<IconPhAlien /> 4<IconEpAim /> 5<IEpFold
      class="v-icon"
    />
    6<icon-ep-fold class="v-icon" /> 7<i-ph-airplane-light /> 8<i-ic-baseline-5g />
  </el-header>
</template>

<script setup>
import { ref } from 'vue'
import { toggleDark, isDark } from '@/composables'
console.log('%c [ isDark ] ', 'font-size:13px; background:pink; color:#bf2c9f;', isDark)
const darkStatus = ref(isDark)
// import IconBaseline5g from '~icons/ic/baseline-5g'
import IconPhAlien from '~icons/ph/alien'
// import IconEpAim from '~icons/ep/aim'
// console.log('%c [ IconEpAim ] ', 'font-size:13px; background:pink; color:#bf2c9f;', IconEpAim)
</script>

<style>
.v-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: 1em;
}

.v-icon > svg {
  width: 100%;
  height: 100%;
}
</style>
