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

    <forms :formItems="formItems" v-model="formData">
    </forms>

  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import Forms from '../../../../components/form'
import { FormConfig } from './config/index'
const colLayout = {
  xl: 24,
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24
}
const formItems = FormConfig.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

function onReset() {
  formData.value = formOriginData
}

function onSearch() {
  console.log('formData', formData.value)
}
// watch(
//   () => formData,
//   (newValue, oldValue) => {
//     console.log('newValue', newValue.value)
//   },
//   { deep: true }
// )

components: {
  Forms
}
</script>

<style scoped lang="less">
.handle-btns {
//   text-align: l;
  padding: 0 50px 50px 0;
}
</style>
