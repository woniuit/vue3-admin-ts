const tinymce = () =>
  import(
    /* webpackChunkName: "tinymce" */ '../../../../view/layout/analysis/tinymce/index.vue'
  )
export default {
  path: '/main/analysis/tinymce',
  name: 'tinymce',
  component: tinymce,
  children: []
}
