<template>
  <div class="login">
    <div class="form">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <div class="btn">
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { loginType } from './type'
import type { FormInstance, FormRules } from 'element-plus'

const ruleForm: loginType = reactive({ name: '', password: '' })
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}
onMounted(() => {})
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  background: #000;
  position: relative;
  .form {
    width: 450px;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 50px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
