<!--
 * @Author: 周楠
 * @Description:
 * @Date: 2022-12-27 10:33:58
 * @LastEditTime: 2023-01-05 17:56:11
 * @LastEditors: 周楠
-->


<template>
  <div id="app" class="h-full flex">
    <!-- 头部组件 -->
    <navSider />


    <!-- 主侧边栏 -->
    <div class="flex-1 h-full">
<mainHeader />
<router-view/>

    </div>

  </div>
</template>

<script setup lang="ts">
import mainHeader from "./header/mainHeader.vue";
import navSider from './navSider/navSider.vue'
// impo
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
