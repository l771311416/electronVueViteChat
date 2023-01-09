<!--
 * @Author: 周楠
 * @Description:主侧边栏
 * @Date: 2023-01-04 16:41:47
 * @LastEditTime: 2023-01-06 10:17:39
 * @LastEditors: 周楠
-->
<template>
    <div class="w-52px h-full bg-ele-black-sider text-ele-white text-2xl flex flex-col ">

        <div v-for="(item, index)  in navSider" :key="index"
        class="w-42px h-42px flex items-center justify-center cursor-pointer"
        @click="choiceNav(item)">
            <el-icon>
                <!-- 选择icon -->
                <component :is="item.icon"></component>
            </el-icon>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
let navSider = reactive(
    [
        {
            name: '聊天',
            icon: 'ChatDotRound',
            path: '/chatOnline'
        },
        {
            name: '联系人',
            icon: 'UserFilled',
            path: '/contact'
        },
        {
            name: '收藏',
            icon: 'StarFilled',
            path: '/collect'
        },
        {
            name: '文件',
            icon: 'FolderRemove',
            path: '/myFile'
        },
        {
            name: '日历',
            icon: 'Calendar',
            path: '/calendar'
        }
    ]
)



let choiceNav = (item: object) => {
    // 跳转页面
    router.push(item.path)
}
</script>
