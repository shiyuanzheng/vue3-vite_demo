<template>
  <exception-page
    :style="`min-height: ${minHeight}`"
    home-route="/"
    type="404"
    @backHome="onBackHome"
  />
</template>

<script>
export default {
  name: 'EXP404'
}
</script>

<script setup>
import ExceptionPage from '@/components/Exception/index.vue'
import { computed } from 'vue'
const minHeight = computed(() => {
  return '100vh'
})
const onBackHome = () => {
  console.log('%c [ emit onBackHome ] ', 'font-size:13px; background:pink; color:#bf2c9f;')
}
</script>
