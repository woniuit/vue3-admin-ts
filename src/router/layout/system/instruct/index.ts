const instruct = () =>
  import(
    /* webpackChunkName: "instruct" */ '../../../../view/layout/system/instruct/index.vue'
  )
export default {
  path: '/main/system/instruct',
  name: 'instruct',
  component: instruct,
  children: []
}
