/*
 * @Author: 周楠
 * @Description: 菜单栏设置窗口大小
 * @Date: 2022-12-28 14:30:15
 * @LastEditTime: 2023-01-04 10:36:42
 * @LastEditors: 周楠
 */
import { BrowserWindow, ipcMain,screen,app } from "electron";
import { Rectangle } from "electron/main";
/**
* @description 进程通讯 渲染进程点击顶部关闭,最小化...按钮时,传递 {val}参数,
* 主进程通过 BrowserWindow.fromWebContents(event.sender)拿到活动窗口的BrowserWindow实例,再通过minimize()等实例方法操作窗口
* @param {Electron.WebContents} event.sender
* @param val {'mini'|'big'|'close'}
* @example
* window.ipc.send('navBar', val) // 渲染进程中
* */


export function onNavbar() {
    ipcMain.on('navBar', (event, val) => {
        /**
        * 通过BrowserWindow.fromWebContents方法拿到window实例
        * event.sender 是发送消息的WebContents实例
        */
        const window: Electron.BrowserWindow | null = BrowserWindow.fromWebContents(event.sender)
        if (val == 'mini') {
            window?.minimize()
        } // 最小化窗口
        if (val == 'close') { window?.close() } // 关闭窗口
        if (val == 'big') { // 全屏/取消全屏
            // 因为在createWindow.ts中禁用了修改窗口尺寸(resizable: false),这里先解除
            window?.setResizable(true)
            // app.whenReady().then(() => {
                // let screenBounds: Rectangle = screen?.getPrimaryDisplay().bounds

                // unmaximize 还原到默认窗口
                // maximize 最大化窗口
                // isMaximized 判断窗口是否最大化
                // if (window?.isMaximized()) {
                //     console.log('还原到默认窗口');

                //     // 恢复默认窗口
                //     animateToDefault(window, screenBounds)
                // } else {
                //     // 最大化窗口
                //     animateToMaximized(window, screenBounds)
                // }
                window?.isMaximized() ? window?.unmaximize() : window?.maximize();

            // }).then(() => {
                window?.setResizable(false)
            // })

        }
    })
}



// let defaultBounds = { x: 300, y: 200, width: 1200, height: 800 };

// function animateToMaximized(window: Electron.BrowserWindow | null,screenBounds:Rectangle ) {
//     if (!window) return
//     let { width, height } = window.getBounds()
//     // console.log(screenBounds, 'screenBounds');
//     console.log(window?.isMaximized());
//     if (width < screenBounds.width || height < screenBounds.height) {
//         window.setBounds({
//             x: defaultBounds.x,
//             y: defaultBounds.y,
//             width: Math.min(screenBounds.width, width + 10),
//             height: Math.min(screenBounds.height, height + 10)
//         })
//          setTimeout(() => animateToMaximized(window, screenBounds), 10)
//     } else {

//     }
//   }

// function animateToDefault(window: Electron.BrowserWindow | null,screenBounds:Rectangle ) {
//     if(!window) return
//     let { width, height } = window.getBounds()
//     if (width > defaultBounds.width || height > defaultBounds.height) {
//         window.setBounds({
//         x: defaultBounds.x,
//         y: defaultBounds.y,
//         width: Math.max(defaultBounds.width, width - 10),
//         height: Math.max(defaultBounds.height, height - 10)
//       })
//       setTimeout(() => animateToDefault(window, screenBounds), 10)
//     }
//   }



