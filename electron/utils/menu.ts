/*
 * @Author: 周楠
 * @Description: 菜单栏
 * @Date: 2022-12-29 10:01:20
 * @LastEditTime: 2022-12-29 10:06:40
 * @LastEditors: 周楠
 */
import { Menu } from 'electron'


export function createAppMenu() {
    const AppMenu: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
        { id: '1', label: 'App', submenu: [{ id: '1-1', label: '测试' }] },
        {
            id: '2',
            label: '开发',
            submenu: [
                { id: '2-1', label: '测试' },
                { id: '2-2', label: '检查元素', click(m, window, e) { window?.webContents.openDevTools } },
            ]
        }
    ]
   const appMenu = Menu.buildFromTemplate(AppMenu);
return appMenu;
}


