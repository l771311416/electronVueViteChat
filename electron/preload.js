/*
 * @Author: 周楠
 * @Description:
 * @Date: 2022-12-27 13:45:11
 * @LastEditTime: 2022-12-29 10:00:02
 * @LastEditors: 周楠
 */
import { contextBridge, ipcRenderer } from "electron";
/**
* 通信方法挂载到window对象上
* 在渲染进程中使用:
* <script setup lang="ts">
* window.ipc.on('WindowID', (e, f) => console.log(e, f))
* window.ipc.send('navBar', val)
* </script>
*/

// ipc挂载到window上
contextBridge.exposeInMainWorld("ipc", {

    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    // 通过 channel 向主过程发送消息，并异步等待结果。
    // 如果你不需要回复此消息，请考虑使用 ipcRender.send。
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
     //渲染进行调用监听 channel, 当新消息到达，将通过 listener(event, args...) 调用 listene
    on: (channel, listener) => {
        ipcRenderer.on(channel, listener);
},
});
