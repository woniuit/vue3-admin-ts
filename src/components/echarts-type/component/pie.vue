<template>
  <div>
    <echarts :option="options" />
  </div>
</template>
<script setup lang="ts">
import echarts from '../../echarts/index'
import { onBeforeUpdate, ref } from 'vue'
const props = defineProps<{
  options: {
    type: Object
    default: () => {}
  }
}>()
</script>

<style scoped lang="less">

</style>
