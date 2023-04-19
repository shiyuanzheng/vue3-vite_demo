<template>
  <exception-page :style="`min-height: ${minHeight}`" home-route="/" type="403" />
</template>

<script setup>
import ExceptionPage from '@/components/Exception/index.vue'
import { computed } from 'vue'
const minHeight = computed(() => {
  return '100vh'
})
</script>
