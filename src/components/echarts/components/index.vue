<template>
  <div>
    <div ref="echartsRef" :style="{ width: '100%', height: '360px' }"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const props = defineProps<{
  option: {
    type: Object
    default: () => {}
  }
}>()

const echartsRef = ref<HTMLElement>()
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(echartsRef.value!)
  // 绘制图表
  myChart.setOption(props.option)
})
</script>

<style scoped lang="less"></style>
