<!--
 * @Author: 周楠
 * @Description:
 * @Date: 2023-01-31 14:23:05
 * @LastEditTime: 2023-02-09 18:06:31
 * @LastEditors: 周楠
-->
<template>
  <div class="h-full w-full flex flex-col bg-ele-white">
    <!-- 顶部昵称名字 -->
    <div
      class="bg-ele-white w-full h-69px flex items-center pl-20px text-lg font-semibold border-b"
      >温华</div
    >

    <!-- 聊天内容层 -->
    <el-scrollbar class="flex-1">
      <!--聊天需要分成两个对象，自己和别人 -->
      <div
        class=""
        v-for="(item, index) in chatMessage"
        :key="index"
      >
        <div
          class="left flex pl-10px"
          v-if="item.from === 3944"
        >
          <!-- 对话人 -->
          <div class="w-600px h-60px flex items-center">
            <!-- 头像 -->
            <div class="w-40px h-40px">
              <img
                src="../../../static/testChat.jpg"
                class="w-full h-full block"
              />
            </div>

            <!-- 对话信息 -->
            <div class="m-5px">
              <div class="bg-white rounded p-5px mt-5px">{{ item.text }}</div>
            </div>
          </div>
        </div>

        <div
          class="right flex justify-end pr-10px"
          v-if="item.from === 'self'"
        >
          <!-- 自己 -->
          <!-- 对话信息 -->
          <div class="m-5px">
            <div class="bg-white rounded p-5px mt-5px">{{ item.text }}</div>
          </div>
          <!-- 头像 -->
          <div class="w-40px h-40px">
            <img
              src="../../../static/testChat2.jpg"
              class="w-full h-full block"
            />
          </div>
        </div>
      </div>
    </el-scrollbar>

    <!-- 输入框 -->
    <div class="h-200px border-t">
      <!-- 工具栏 -->
      <div>
        <div class="chatIcon">
          <el-popover
            placement="top"
            :width="400"
            trigger="click"
          >
            <template #reference>
              <div class="m-10px w-20px h-20px">
                <svg
                  t="1675237565713"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3627"
                  width="20"
                  height="20"
                >
                  <path
                    d="M512 58.181818A453.818182 453.818182 0 1 1 58.181818 512 454.516364 454.516364 0 0 1 512 58.181818M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m276.712727 565.061818a29.090909 29.090909 0 0 0-58.181818 0 218.530909 218.530909 0 0 1-437.061818 0 29.090909 29.090909 0 0 0-58.181818 0 276.712727 276.712727 0 0 0 553.425454 0z"
                    p-id="3628"
                  ></path>
                </svg>
              </div>
            </template>
            <el-scrollbar height="400px">
              <div class="grid grid-cols-8">
                <div
                  class="w-40px h-40px"
                  v-for="(item, index) in faceList"
                  @click="getEmo(index)"
                  :key="item.name"
                >
                  <img
                    class="w-full h-full"
                    :src="item.display"
                  />
                </div>
              </div>
            </el-scrollbar>
          </el-popover>
        </div>
      </div>
      <!-- 输入框 -->
      <div class="h-150px">
        <!-- <div
          contenteditable="true"
          ref="inputBox"
          id="inputBox"
          class="input-box flex flex-wrap text-sm font-medium w-full h-full"
          @click="getRange"
          v-html="chatMsg"
          v-on:keyup.enter="sendMsg"
        ></div> -->
        <MessageInput
          v-model="chatMsg"
          :sendEmoji="sendEmoji"
          class="input-box flex flex-wrap text-sm font-medium w-full h-full"
        ></MessageInput>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    ref,
    reactive,
    onMounted,
    getCurrentInstance,
    ComponentInternalInstance,
    provide,
  } from 'vue';
  import MessageInput from './messageInput.vue';
  // const appData = new URL('../static/emoji.json', import.meta.url).href;
  import emoji from '../../../static/emoji';
  interface Emoji {
    name: string;
    src: string;
    info: string;
    hover: string;
    value: string;
    show?: boolean;
    display?: string;
  }

  const faceList = reactive([]);
  const chatMsg = ref('测试');
  const rangeOfInputBox = ref();
  const sendEmoji = ref('');
  const chatMessage = reactive([
    {
      type: 'text',
      text: '1111',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '2222',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '3333',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '4444',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '5555',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '6666',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '7777',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '8888',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '9999',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '0000',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '1111',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '2222',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '3333',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '4444',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '5555',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '6666',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '7777',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '8888',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '9999',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '0000',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '1111',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '2222',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '3333',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '4444',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '5555',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '6666',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '7777',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '8888',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '9999',
      from: 3944,
      to: 'self',
    },
    {
      type: 'text',
      text: '0000',
      from: 'self',
      to: 3944,
    },
    {
      type: 'text',
      text: '1111',
      from: 3944,
      to: 'self',
    },
  ]);
  // const

  document.onselectionchange = () => {
    let selection: any = document.getSelection();
    let inputBox = document.getElementById('inputBox');
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (inputBox?.contains(range.commonAncestorContainer)) {
        console.log(range);
        rangeOfInputBox.value = range;
      }
    }
  };

  onMounted(() => {
    useData();
  });

  // 获取表情包
  const useData = () => {
    const emojiData: Emoji[] = emoji.map((item: Emoji) => {
      return {
        ...item,
        show: false,
        display: new URL(
          `../../../static/face/${item.src}.png`,
          import.meta.url
        ).href,
      };
    });
    // console.log(emojiData, 'emojiData');
    Object.assign(faceList, emojiData);
    // faceList.push(...emojiData)
  };

  // enter发送消息

  const { proxy } = getCurrentInstance() as ComponentInternalInstance;
  // 获取emoji表情
  const getEmo = (index: number) => {
    let setImg = new URL(
      `../../../static/face/${faceList[index].src}.png`,
      import.meta.url
    ).href;
    const img = `<img src="${setImg}" class="w-20px h-20px block">`;
    document.execCommand('insertHTML', false, img);

    // const inputBox: any = proxy?.$refs.inputBox;
    sendEmoji.value = setImg;
    // inputBox.innerHTML += img;

    // if (!inputBox.hasfocus) {
    //   inputBox.focus();
    // }
  };
  provide('getEmo', sendEmoji.value);
  // 点击输入框的时候获取光标，以及光标位置
  const getRange = () => {
    let selection: any = document.getSelection();
    let inputBox = document.getElementById('inputBox');
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // console.log(inputBox, 'inputBox');

      if (inputBox?.contains(range.commonAncestorContainer)) {
        rangeOfInputBox.value = range;
      }
    }
  };

  // 点击enter发送信息
  // const sendMsg = () => {
  //   chatMessage.push({
  //     type: 'text',
  //     text: chatMsg.value,
  //     from: 'self',
  //     to: 3944,
  //   });
  // };
</script>

<style scoped>
  .chat-input .el-input__inner {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>
