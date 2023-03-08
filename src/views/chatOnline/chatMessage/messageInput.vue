<!--
 * @Author: 周楠
 * @Description:
 * @Date: 2023-02-08 17:39:25
 * @LastEditTime: 2023-03-08 15:45:26
 * @LastEditors: 周楠
-->
<template>
  <div
    ref="inputBox"
    id="inputBox"
    class="editor"
    contenteditable="true"
    v-html="props.modelValue"
    @input="handleInput"
    @click="getRange"
    v-on:keyup.enter="sendMsg"
  ></div>
</template>
<script setup lang="ts">
  import {
    ref,
    reactive,
    onMounted,
    getCurrentInstance,
    ComponentInternalInstance,
    watch,
    computed,
    inject,
    watchEffect,
    toRefs,
    nextTick,
    defineProps,
  } from 'vue';
  // const props = defineProps(['modelValue', 'sendEmoji']);
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    sendEmoji: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:modelValue', 'sendMsg']);
  const isChange = ref(true);
  const inputBox = ref();

  // 监听props.sendEmoji 一旦有值就插入到输入框中
  watch(
    () => props.sendEmoji,
    (val) => {
      if (val) {
        emojiInsert();
      }
    }
  );

  const handleInput = (): void => {
    emit('update:modelValue', inputBox.value.innerText);
  };
  const { proxy } = getCurrentInstance() as ComponentInternalInstance;
  // emoji表情插入输入框
  const emojiInsert = (emoji?: string) => {
    const img = `<img src="${props.sendEmoji}" class="w-20px h-20px block">`;
    document.execCommand('insertHTML', false, img);

    const inputBox: any = proxy?.$refs.inputBox;
    inputBox.innerHTML += img;

    if (!inputBox.hasfocus) {
      inputBox.focus();
      window.getSelection().collapseToEnd();
    }
  };
  // 点击输入框的时候获取光标，以及光标位置
  const getRange = () => {
    // console.log(window.getSelection, 'window.getSelection');
    // const inputBox: any = proxy?.$refs.inputBox;
    // let selection: any = window.getSelection();
    // nextTick(() => {
    //   // selection.selectAllChildren(inputBox); //range 选择obj下所有子内容
    //   // selection.collapseToEnd(); //光标移至最后
    // });
    // let inputBox = document.getElementById('inputBox');
    // if (selection.rangeCount > 0) {
    //   const range = selection.getRangeAt(0);
    //   // console.log(inputBox, 'inputBox');
    //   if (inputBox?.contains(range.commonAncestorContainer)) {
    //     // rangeOfInputBox.value = range;
    //   }
    // }
  };

  const sendMsg = () => {
    // chatMessage.push({
    //   type: 'text',
    //   text: msg.value,
    //   from: 'self',
    //   to: 3944,
    // });
    emit('sendMsg', {
      type: 'text',
      text: props.modelValue,
      from: 'self',
      to: 3944,
    });
  };
</script>
<style lang="scss">
  .edit-div {
    width: 100%;
    height: 100%;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;

    &[contenteditable='true'] {
      user-modify: read-write-plaintext-only;

      &:empty:before {
        content: attr(placeholder);
        display: block;
        color: #ccc;
      }
    }
  }
</style>
