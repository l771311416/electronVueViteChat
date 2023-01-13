/*
 * @Author: 周楠
 * @Description: electron主进程
 * @Date: 2022-12-27 11:44:25
 * @LastEditTime: 2023-01-12 17:23:28
 * @LastEditors: 周楠
 */
import { app, BrowserWindow, Menu } from "electron";
// 创建窗口方法
import { createWindow } from "./utils/createWindow";
import { onNavbar } from "./utils/navbar";
import { createAppMenu } from './utils/menu';
import { onCalendar } from "./utils/calendar";
// 是否开启调试工具
import { onDevTools } from "./utils/devTools";

app.on("ready", () => {

    createWindow(); // 创建窗口
    // 设置菜单栏
    Menu.setApplicationMenu(createAppMenu());
    onNavbar();
    onCalendar();
    // 是否开启调试工具
    onDevTools();
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他打开的窗口，那么程序会重新创建一个窗口。
    app.on("activate", () => BrowserWindow.getAllWindows().length === 0 && createWindow());
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 macOS窗口全部关闭时,dock中程序不会退出
app.on("window-all-closed", () => {
    process.platform !== "darwin" && app.quit();
});
