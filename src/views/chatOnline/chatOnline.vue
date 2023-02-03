<!--
 * @Author: 周楠
 * @Description:聊天
 * @Date: 2023-01-05 15:11:24
 * @LastEditTime: 2023-02-01 16:50:57
 * @LastEditors: 周楠
-->
<template>
  <div class="box-content flex h-full">
    <div class="h-full border-r w-250px">
      <div class="p-20px border-b bg-ele-white flex justify-around">
        <div class="w-200px">
          <el-input
            v-model="input"
            placeholder="搜索"
            size="small"
          />
        </div>
        <div class="pl-10px m-auto flex"
          ><el-icon class="text-center"> <CirclePlus /> </el-icon
        ></div>
      </div>
      <div>
        <!-- 聊天联系人 -->
        <div
          class="h-70px bg-ele-gray flex items-center"
          v-for="(item, index) in chatData"
          :key="index"
        >
          <!-- 头像 -->
          <div class="w-50px h-50px ml-10px">
            <img
              class="w-full h-full block"
              :src="item.avatar"
            />
          </div>

          <!-- 内容层 -->
          <div
            class="h-50px flex mx-10px flex-col justify-between content-between flex-1"
          >
            <div class="flex justify-between">
              <!-- 昵称 -->
              <div class="text-sm font-bold">{{ item.name }}</div>
              <!-- 时间 -->
              <div class="text-xs text-gray-400">{{ item.lastChatTime }}</div>
            </div>

            <!-- 摘要内容 -->
            <div class="text-xs text-gray-400">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 聊天窗口 -->
    <div class="h-full flex-1">
      <ChatMessage></ChatMessage>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ChatMessage from './chatMessage/chatMessage.vue';
  import { ref, reactive } from 'vue';
  const input = ref('');

  const chatData = reactive([
    {
      name: '温华',
      lastChatTime: '23/1/19',
      cancelNotice: false,
      content: '直接乱玩',
      avatar: new URL('../../static/testChat2.jpg', import.meta.url).href,
    },
    {
      name: '癫子',
      lastChatTime: '16:29',
      cancelNotice: false,
      content: '[动画表情]',
      avatar: new URL('../../static/testChat.jpg', import.meta.url).href,
    },
    {
      name: '驴蛋子',
      lastChatTime: '16:18',
      cancelNotice: false,
      content: 'OK',
      avatar: new URL('../../static/testChat3.jpg', import.meta.url).href,
    },
  ]);
</script>
