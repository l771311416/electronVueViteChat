/*
 * @Author: 周楠
 * @Description:是否开启调试工具
 * @Date: 2022-12-29 10:49:37
 * @LastEditTime: 2022-12-29 10:53:58
 * @LastEditors: 周楠
 */
import { BrowserWindow, ipcMain } from "electron";

export function onDevTools() {
    ipcMain.on("devTools", (event, val) => {
    //   如果val 为open 则开启调试工具
        // 如果val 为close 则关闭调试工具
        const window: Electron.BrowserWindow | null = BrowserWindow.fromWebContents(event.sender);
        if (val == "open") {
            window?.webContents.openDevTools();
        }
        if (val == "close") {
            window?.webContents.closeDevTools();
        }
    });

}
