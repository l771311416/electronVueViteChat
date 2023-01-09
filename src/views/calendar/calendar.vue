<!--
 * @Author: 周楠
 * @Description:我的日历
 * @Date: 2023-01-06 09:57:53
 * @LastEditTime: 2023-01-09 14:00:42
 * @LastEditors: 周楠
-->
<template>
    <div class='calendar'> <el-calendar ref="calendar">
            <template #header="{ date }">
                <span>Custom header content</span>
                <span>{{ date }}</span>
                <el-button-group>
                    <el-button size="small" @click="selectDate('prev-year')">
                        Previous Year
                    </el-button>
                    <el-button size="small" @click="selectDate('prev-month')">
                        Previous Month
                    </el-button>
                    <el-button size="small" @click="selectDate('today')">Today</el-button>
                    <el-button size="small" @click="selectDate('next-month')">
                        Next Month
                    </el-button>
                    <el-button size="small" @click="selectDate('next-year')">
                        Next Year
                    </el-button>
                </el-button-group>
            </template>
        </el-calendar></div>
</template>

<script setup lang='ts'>
import { ref, reactive } from "vue";
const calendar = ref()
const selectDate = (val: string) => {
  calendar.value.selectDate(val)
}

</script>
