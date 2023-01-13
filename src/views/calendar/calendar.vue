<!--
 * @Author: 周楠
 * @Description:我的日历
 * @Date: 2023-01-06 09:57:53
 * @LastEditTime: 2023-01-13 09:50:23
 * @LastEditors: 周楠
-->
<template>
    <div class='calendar'> <el-calendar ref="calendar">

            <!-- 日历头部 -->
            <template #header="{ date }">
                <div class="flex justify-between  items-center w-full h-full">
                    <div class="flex w-240px items-center">
                        <span class="inline-block mr-15px text-ele-gray-hight">我的日程</span>
                        <!--根据年月日选择上一月，下一年等 -->
                        <div class="flex justify-between items-center w-50px h-50px mr-15px">
                            <div @click="preDate()" class="inline-block"><el-icon>
                                    <ArrowLeftBold />
                                </el-icon></div>
                            <div @click="nextDate()" class="inline-block"><el-icon>
                                    <ArrowRightBold />
                                </el-icon></div>
                        </div>
                        <span class="mr-10px font-semibold subpixel-antialiased">{{ date }}</span>
                    </div>

                    <div>
                        <el-select v-model="dateTypeValue" class="m-2" placeholder="Select" size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                </div>
            </template>

            <!-- 日历内部自定义 -->

            <template #date-cell="{ data }">

                <!-- 自定义日历选择框 -->
                <div :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split('-').slice(1).join('-') }}
                    <div ref="titleRef" v-click-outside="onClickOutside"
                        class="w-full h-20px leading-20px text-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
                        v-if="data.isSelected">

                        <span class="text-white text-sm">无标题</span>
                    </div>

                    <!-- 弹出框 -->
                    <el-popover ref="popoverRef" :virtual-ref="titleRef" virtual-triggering placement="right"
                        :width="150" trigger="click" v-if="data.isSelected" content="这里是内容层">
                        <template #reference>
                            <div ref="titleRef" v-click-outside="onClickOutside"
                                class="w-full h-20px leading-20px text-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
                                v-if="data.isSelected">
                                <span class="text-white text-sm">无标题</span>
                            </div>
                        </template>
                        <!-- 弹窗内容层 -->
                        <template #default>
                            <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
                                <div class="hover:bg-slate-50 hover:shadow-lg h-30px leading-30px font-medium"  @click="goMeeting"><span>开 会</span> </div>
                                <div class="hover:bg-slate-50 hover:shadow-lg h-30px leading-30px font-medium"><span>日 程 </span> </div>
                            </div>

                        </template>
                    </el-popover>
                </div>

            </template>

        </el-calendar></div>
</template>

<script setup lang='ts'>
import { DateType } from './calendar.d.ts'
import { ref, reactive, unref } from "vue";
import {useRouter} from 'vue-router'
import { ClickOutside as vClickOutside } from 'element-plus'
const calendar = ref()
const dateTypeValue = ref('month')
const popoverRef = ref()
const titleRef = ref()
const router = useRouter()
const options = [
    {
        id: 2,
        value: 'month',
        label: '月'
    }, {
        id: 3,
        value: 'year',
        label: '年'
    }
]
const selectDate = (val: string) => {

    calendar.value.selectDate(val)
}

// 上一年/上一月
const preDate = () => {

    // 解决ts报错 dateType[dateTypeValue.value]
    // 优雅解决方法：type DateType = Record<string, string>
    // Record 第一个为key，第二个为值
    const dateType: DateType = {
        month: 'prev-month',
        year: 'prev-year',

    }
    calendar.value.selectDate(dateType[dateTypeValue.value])
}


// 下一年/下一月
const nextDate = () => {

    // 解决ts报错 dateType[dateTypeValue.value]
    // 优雅解决方法：type DateType = Record<string, string>
    // Record 第一个为key，第二个为值
    const dateType: DateType = {
        month: 'next-month',
        year: 'next-year',
    }
    calendar.value.selectDate(dateType[dateTypeValue.value])
}


// 二次点击日历某项时弹出自定义框，可以进行自定义
const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
}

// 跳转到会议页面
const goMeeting = () => {
    console.log('跳转到会议页面')
    window.ipc.send('calendar', true)
}
</script>

<style>
.is-selected {
    color: #1989fa;
}
</style>
