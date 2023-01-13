"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCalendar = void 0;
/*
 * @Author: 周楠
 * @Description:
 * @Date: 2023-01-12 17:12:24
 * @LastEditTime: 2023-01-13 11:53:08
 * @LastEditors: 周楠
 */
const electron_1 = require("electron");
function onCalendar() {
    electron_1.ipcMain.on("calendar", (event, val) => {
        //如果val存在打开新窗口
        if (val) {
            const Window = new electron_1.BrowserWindow({
                minWidth: 1120,
                minHeight: 645,
                width: 1200,
                height: 800,
                frame: true,
                transparent: true,
                hasShadow: true,
                show: false,
                resizable: true,
                webPreferences: {
                // webSecurity:false,
                // 加载脚本
                },
            });
            // 加载调试工具
            Window.webContents.openDevTools();
            // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
            Window.once("ready-to-show", () => {
                Window.show(); // 显示窗口
            });
            Window.loadURL('http://localhost:3920/#/meeting');
        }
        else {
            // 关闭窗口
            console.log(event);
        }
    });
}
exports.onCalendar = onCalendar;
