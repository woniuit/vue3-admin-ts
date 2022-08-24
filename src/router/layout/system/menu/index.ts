const menu = () =>
  import(
    /* webpackChunkName: "menu" */ '../../../../view/layout/system/menu/index.vue'
  )
export default {
  path: '/main/system/menu',
  name: 'menu',
  component: menu,
  children: []
}
