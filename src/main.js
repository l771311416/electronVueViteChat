/*
 * @Author: 周楠
 * @Description:
 * @Date: 2022-12-27 10:33:58
 * @LastEditTime: 2023-01-13 17:43:43
 * @LastEditors: 周楠
 */
import { createApp } from 'vue'
import './style.css'

import App from './App.vue'
import  router  from "./router/index";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createPinia } from 'pinia'
let app = createApp(App)
const pinia = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router).use(pinia).use(ElementPlus, {
    locale: zhCn,
  }).mount('#app')
