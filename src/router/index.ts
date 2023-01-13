/*
 * @Author: 周楠
 * @Description:
 * @Date: 2023-01-04 15:27:52
 * @LastEditTime: 2023-01-13 09:49:39
 * @LastEditors: 周楠
 */
import { createRouter, createWebHashHistory } from "vue-router"
import ChatOnline from '../views/chatOnline/chatOnline.vue';
import Collect from '../views/collect/collect.vue';
import Contact from "../views/contact/contact.vue";
import MyFile from "../views/myFile/myFile.vue";
import Calendar from "../views/calendar/calendar.vue";
import Meeting from '../views/calendar/Meeting.vue'
import * as path from 'path';
const routes = [
    {
        path: '/',
        // component: ChatOnline
        redirect: '/chatOnline'
    },
    {
        path: '/chatOnline',
        name: "chatOnline",
        component: ChatOnline
    },
    {
        path: '/contact',
        name: "contact",
        component: Contact
    },
    {
        path: '/myFile',
        name: "myFile",
        component: MyFile
    },
    {
        path: '/calendar',
        name: "calendar",
        component: Calendar,

    },
    {
        path: '/meeting',
        name: "meeting",
        component: Meeting
    },
    {
        path: '/collect',
        name: "collect",
        component: Collect
    }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
