const form = () =>
  import(
    /* webpackChunkName: "form" */ '../../../../view/layout/analysis/form/index.vue'
  )
export default {
  path: '/main/analysis/form',
  name: 'form',
  component: form,
  children: []
}
