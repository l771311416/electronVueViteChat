<!--
 * @Author: 周楠
 * @Description:开会
 * @Date: 2023-01-12 17:32:59
 * @LastEditTime: 2023-01-29 17:45:06
 * @LastEditors: 周楠
-->
<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm"
        :size="formSize" status-icon>
        <el-form-item label="Meeting name" prop="name">
            <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Meeting zone" prop="region">
            <el-select v-model="ruleForm.region" placeholder="Meeting zone">
                <el-option label="会议室一" value="shanghai" />
                <el-option label="会议室二" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item label="Meeting count" prop="count">
            <el-select-v2 v-model="ruleForm.count" placeholder="Meeting count" :options="options" />
        </el-form-item>
        <el-form-item label="Meeting time" required>
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker v-model="ruleForm.date1" type="date" label="Pick a date" placeholder="Pick a date"
                        style="width: 100%" />
                </el-form-item>
            </el-col>
            <el-col class="text-center" :span="2">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
                <el-form-item prop="date2">
                    <el-time-picker v-model="ruleForm.date2" label="Pick a time" placeholder="Pick a time"
                        style="width: 100%" />
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery" prop="delivery">
            <el-switch v-model="ruleForm.delivery" />
        </el-form-item>
        <el-form-item label="Meeting type" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="Online activities" name="type" />
                <el-checkbox label="Promotion activities" name="type" />
                <el-checkbox label="Offline activities" name="type" />
                <el-checkbox label="Simple brand exposure" name="type" />
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="Sponsorship" />
                <el-radio label="Venue" />
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Meeting form" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                Create
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
import {useMain} from '../../store/index';
import { ref, reactive, onBeforeMount, } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import bus from '../../utils/bus'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '创建znKnowKnow的会议',
    region: '',
    count: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const rules = reactive<FormRules>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
    count: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'change',
        },
    ],
    date1: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
        },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    desc: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
    ],
})

// 传递参数给app.vue，控制头部组件和侧边栏的隐藏
//! 由于创建新窗口的时候不会再去调用app.vue，所以使用路由进行判断是否展示侧边栏和顶部菜单不再现实
//! 解决办法有使用mitt，pinia，vuex等
//! 考虑到只是传递boolean值，所以使用mitt
onBeforeMount(() => {
    bus.emit('mainHeaderShow', false)
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {


            window.opener.postMessage(ruleForm.name)
            // 传递参数使用bus传参给 calendar.vue
            // bus.emit('mainHeaderShow',false )
            //
            // window.close()
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))
</script>

