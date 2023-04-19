<template lang="">
  <div :class="['common-layout', getAsideCollapse && 'aside-collapse']">
    <el-container direction="horizontal">
      <Aside />
      <el-container direction="vertical" class="common-layout-right">
        <Header />
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
const { getAsideCollapse } = toRefs(settings)
const { setAsideCollapse } = settings

onMounted(() => {
  window.addEventListener('resize', handleWindowResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize)
})

const handleWindowResize = debounce(() => {
  setAsideCollapse(document.documentElement['clientWidth'] <= 992 || getAsideCollapse.value)
}, 200)
</script>
