<template>
  <div>
    <forms :colLayout="colLayout" :formItems="formItems" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button @click="onReset">重置</el-button>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </div>
      </template>
    </forms>

    <forms ref="formRef" :formItems="formItems" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button @click="onReset">重置</el-button>
          <el-button type="primary" @click="onSearch(formRef)">搜索</el-button>
        </div>
      </template>
    </forms>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { FormConfig } from './config/index'
import type { FormInstance } from 'element-plus'
import Forms from '../../../../components/form'
const colLayout = {
  xl: 12,
  lg: 12,
  md: 12,
  sm: 12,
  xs: 12
}
const formRef = ref<FormInstance>()
const formItems = FormConfig.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

function onReset() {
  formData.value = formOriginData
  formRef?.value?.resetFields()
}

const onSearch = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate().then((valid) => {
    if (valid) {
      console.log('submit2!', formData.value)
    } else {
      return false
    }
  }).catch((err)=>{
      console.log(err)
  })
}
</script>

<style scoped lang="less">
.handle-btns {
  //   text-align: l;
  padding: 0 50px 50px 0;
}
</style>
