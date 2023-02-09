<template>
  <div
    ref="inputBox"
    id="inputBox"
    class="editor"
    contenteditable="true"
    v-html="msg"
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
  } from 'vue';
  const props = defineProps(['modelValue', 'sendEmoji']);

  //   defineProps(['modelValue', 'sendEmoji']);
  let emoji = ref(props.sendEmoji);
  console.log('emoji', emoji);

  const msg = ref(props.modelValue);

  //   const emoji = ref(props.sendEmoji);
  //   console.log(emoji.value);

  const emit = defineEmits(['update:modelValue']);
  const isChange = ref(true);
  const inputBox = ref();

  //   watch()

  const handleInput = () => {
    emit('update:modelValue', inputBox.value.innerText);
  };

  // 点击输入框的时候获取光标，以及光标位置
  const getRange = () => {
    let selection: any = document.getSelection();
    let inputBox = document.getElementById('inputBox');
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // console.log(inputBox, 'inputBox');

      if (inputBox?.contains(range.commonAncestorContainer)) {
        // rangeOfInputBox.value = range;
      }
    }
  };

  const sendMsg = () => {
    // chatMessage.push({
    //   type: 'text',
    //   text: msg.value,
    //   from: 'self',
    //   to: 3944,
    // });
    // emit()
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
