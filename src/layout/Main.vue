<template lang="">
  <el-main class="common-main">
    <el-scrollbar>
      <RouterView v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </RouterView>
      <!-- <RouterView /> -->
    </el-scrollbar>
  </el-main>
</template>
