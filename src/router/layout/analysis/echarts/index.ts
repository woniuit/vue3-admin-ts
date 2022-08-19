const echarts = () =>
  import(
    /* webpackChunkName: "echarts" */ '../../../../view/layout/analysis/echarts/index.vue'
  )
export default {
  path: '/main/analysis/echarts',
  name: 'echarts',
  component: echarts,
  children: []
}
