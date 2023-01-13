/*
 * @Author: 周楠
 * @Description:
 * @Date: 2023-01-12 17:12:24
 * @LastEditTime: 2023-01-13 11:53:08
 * @LastEditors: 周楠
 */
import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
export function onCalendar() {
    ipcMain.on("calendar", (event, val) => {
        //如果val存在打开新窗口
        if (val) {
            const Window = new BrowserWindow({
                minWidth: 1120,
                minHeight: 645,
                width: 1200, // * 指定启动app时的默认窗口尺寸
                height: 800, // * 指定启动app时的默认窗口尺寸
                frame: true, // * app边框(包括关闭,全屏,最小化按钮的导航栏) @false: 隐藏
                transparent: true, // * app 背景透明
                hasShadow: true, // * app 边框阴影
                show: false, // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
                resizable: true, // 禁止手动修改窗口尺寸
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
        } else {

            // 关闭窗口
        console.log(event);


        }
    });
}
