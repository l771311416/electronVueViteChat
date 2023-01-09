/*
 * @Author: 周楠
 * @Description: electron渲染进程声明
 * @Date: 2022-12-27 11:48:06
 * @LastEditTime: 2023-01-04 09:27:48
 * @LastEditors: 周楠
 */
// ? 扩展window对象
interface Window {
    /**
    * Electron ipcRenderer
    * 后面会将进程通讯方法挂载到window对象上,所以添加此接口防止报错
    */
    ipc: import("electron").IpcRenderer;
}

interface Rectangle {
    x: number
    y: number
    width: number
    height: number
  }
