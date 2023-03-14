<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div>
      <el-row class="mb-4">
        <el-button @click="handleClick">Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
      </el-row>

      <el-row class="mb-4">
        <el-button plain>Plain</el-button>
        <el-button type="primary" plain>Primary</el-button>
        <el-button type="success" plain>Success</el-button>
        <el-button type="info" plain>Info</el-button>
        <el-button type="warning" plain>Warning</el-button>
        <el-button type="danger" plain>Danger</el-button>
      </el-row>

      <el-row class="mb-4">
        <el-button round>Round</el-button>
        <el-button type="primary" round>Primary</el-button>
        <el-button type="success" round>Success</el-button>
        <el-button type="info" round>Info</el-button>
        <el-button type="warning" round>Warning</el-button>
        <el-button type="danger" round>Danger</el-button>
      </el-row>

      <el-row>
        <el-button :icon="Search" circle />
        <el-button type="primary" circle>
          <el-icon color="red" class="no-inherit">
            <Share />
          </el-icon> </el-button
        ><el-button type="primary" circle>
          <Edit style="width: 1em; height: 1em" />
        </el-button>
        <el-button type="primary" :icon="Edit" circle />
        <el-button type="success" :icon="Check" circle />
        <el-button type="info" :icon="Message" circle />
        <el-button type="warning" :icon="Star" circle />
        <el-button type="danger" :icon="Delete" circle />
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { Check, Delete, Edit, Message, Search, Star } from '@element-plus/icons-vue'
function handleClick(e) {
  console.log('%c [ e ] ', 'font-size:13px; background:pink; color:#bf2c9f;', e)
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
