<template lang="">
  <div :class="['common-layout', asideCollapse && 'aside-collapse']">
    <el-container direction="vertical">
      <Header />
      <el-container style="padding-top: 60px">
        <Aside />
        <Main />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { toRefs, onMounted, onUnmounted } from 'vue'
import Header from './Header.vue'
import Main from './Main.vue'
import Aside from './Aside.vue'
import { debounce } from 'lodash-es'
import { useSettingsStore } from '@/stores'

const settings = useSettingsStore()
const { asideCollapse } = toRefs(settings)
const { setAsideCollapse } = settings

onMounted(() => {
  window.addEventListener('resize', handleWindowResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize)
})

const handleWindowResize = debounce(() => {
  setAsideCollapse(document.documentElement['clientWidth'] <= 992 || asideCollapse.value)
}, 200)
</script>
