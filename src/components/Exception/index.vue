<template>
  <div class="exception-page">
    <div class="img">
      <img :src="config[props.type].img" />
    </div>
    <div class="content">
      <h1>{{ config[props.type].title }}</h1>
      <div class="desc">{{ config[props.type].desc }}</div>
      <div class="action">
        <el-button type="primary" @click="backHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Config from './typeConfig'
const config = Config
const router = useRouter()
const route = useRoute()

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  homeRoute: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['backHome'])
function backHome() {
  if (props.homeRoute) {
    router.push(props.homeRoute)
  }
  emit('backHome', props.type)
}
</script>

<style lang="scss" scoped>
.exception-page {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  .img {
    padding-right: 52px;
    zoom: 1;
    img {
      max-width: 430px;
    }
  }
  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin: 0 0 24px;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
