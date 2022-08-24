<template>
  <div>
    <el-form label-width="100px" style="padding: 20px">
      <el-row>
        <template v-for="item in formItems" :key="item">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label">
              <template v-if="item.type == 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>

              <template v-if="item.type == 'select'">
                <el-select
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  class="m-2"
                  :placeholder="item.placeholder"
                >
                  <el-option
                    v-for="subitem in item.options"
                    :key="subitem.value"
                    :label="subitem.label"
                    :value="subitem.value"
                  />
                </el-select>
              </template>

              <template v-if="item.type == 'radio'">
                <el-radio-group
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-radio :label="3">Option A</el-radio>
                  <el-radio :label="6">Option B</el-radio>
                </el-radio-group>
              </template>

              <template v-if="item.type == 'datePicker'">
                <el-date-picker
                  :value-format="item.format"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  type="date"
                  :placeholder="item.placeholder"
                  :shortcuts="item.shortcuts"
                  :size="item.size"
                  :disabled-date="item.disabledDate"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
// import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array,
    default: () => []
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, 
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const handleValueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style scoped lang="less"></style>
