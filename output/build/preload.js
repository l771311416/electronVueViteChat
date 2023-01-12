"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: 周楠
 * @Description:
 * @Date: 2022-12-27 13:45:11
 * @LastEditTime: 2023-01-10 09:49:49
 * @LastEditors: 周楠
 */
const electron_1 = require("electron");
/**
* 通信方法挂载到window对象上
* 在渲染进程中使用:
* <script setup lang="ts">
* window.ipc.on('WindowID', (e, f) => console.log(e, f))
* window.ipc.send('navBar', val)
* </script>
*/
// ipc挂载到window上
electron_1.contextBridge.exposeInMainWorld("ipc", {
    send: (channel, ...args) => electron_1.ipcRenderer.send(channel, ...args),
    // 通过 channel 向主过程发送消息，并异步等待结果。
    // 如果你不需要回复此消息，请考虑使用 ipcRender.send。
    invoke: (channel, ...args) => electron_1.ipcRenderer.invoke(channel, ...args),
    //渲染进行调用监听 channel, 当新消息到达，将通过 listener(event, args...) 调用 listener
    on: (channel, listener) => {
        electron_1.ipcRenderer.on(channel, listener);
    },
});
