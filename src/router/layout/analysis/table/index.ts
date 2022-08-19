const table = () =>
  import(
    /* webpackChunkName: "table" */ '../../../../view/layout/analysis/table/index.vue'
  )
export default {
  path: '/main/analysis/table',
  name: 'table',
  component: table,
  children: []
}
