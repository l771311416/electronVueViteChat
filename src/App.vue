<!--
 * @Author: 周楠
 * @Description:
 * @Date: 2022-12-27 10:33:58
 * @LastEditTime: 2023-01-13 11:26:19
 * @LastEditors: 周楠
-->


<template>
  <div id="app" class="h-full flex">
    <!-- 头部组件 -->
    <navSider  v-if="mainHeaderShow"/>


    <!-- 主侧边栏 -->
    <div class="flex-1 h-full">
      <mainHeader v-if="mainHeaderShow"/>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive,onBeforeMount,onBeforeUnmount } from "vue";
import mainHeader from "./header/mainHeader.vue";
import navSider from './navSider/navSider.vue'
import bus from './utils/bus'

const mainHeaderShow = ref(true)

onBeforeMount(() => {
  bus.on('mainHeaderShow',settingMain)
})
onBeforeUnmount(() => {
  bus.off('mainHeaderShow',settingMain)
})

const settingMain=(msg:any)=>{
  mainHeaderShow.value = msg
}
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
