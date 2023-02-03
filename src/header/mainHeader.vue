<!--
 * @Author: 周楠
 * @Description:
 * @Date: 2022-12-28 14:39:55
 * @LastEditTime: 2023-01-31 15:58:31
 * @LastEditors: 周楠
-->
<template>
  <div
    class="bg-ele-white h-30px flex flex-row-reverse self-start items-start absolute top-0 right-0 z-10"
  >
    <!-- 窗口基础功能 ：关闭 最小化，最大化 -->
    <div class="w-100px flex justify-around items-center my-5px border-r">
      <el-icon
        size="18px"
        @click="navBar('close')"
      >
        <Close />
      </el-icon>
      <el-icon
        size="18px"
        @click="navBar('big')"
      >
        <FullScreen />
      </el-icon>
      <el-icon
        size="18px"
        @click="navBar('mini')"
        class=""
      >
        <Minus />
      </el-icon>
    </div>
    <div class="w-40px flex justify-around items-center my-5px text-ele-black">
      <el-dropdown trigger="click">
        <el-icon class="">
          <MoreFilled />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="devTools()">开发者工具</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 拓展工具栏 -->
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';

  const devToolsOpen = ref(true); // 开发者工具开关
  // 窗口事件
  const navBar = (val: string) => {
    console.log(window.ipc, 'window.ipc');

    window.ipc.send('navBar', val);
  };
  // 是否开启开发者工具
  const devTools = () => {
    if (devToolsOpen.value) {
      window.ipc.send('devTools', 'close');
      devToolsOpen.value = false;
    } else {
      window.ipc.send('devTools', 'open');
      devToolsOpen.value = true;
    }
  };
</script>

<style lang="scss" scoped></style>
