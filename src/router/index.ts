import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { loginStore } from '../store/index'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main/analysis/echarts'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "main" */ '../view/layout/index.vue')
    // children: [
    //   {
    //     path: '/main/analysis/form',
    //     name: 'form',
    //     component: () =>
    //       import(
    //         /* webpackChunkName: "form" */ '../view/layout/analysis/form/index.vue'
    //       )
    //   },
    //   {
    //     path: '/main/analysis/table',
    //     name: 'table',
    //     component: () =>
    //       import(
    //         /* webpackChunkName: "table" */ '../view/layout/analysis/table/index.vue'
    //       )
    //   }
    // ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "not-found" */ '../view/not-found/index.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
router.beforeEach((to) => {
  const store = loginStore()
  if (to.path !== '/login') {
    if (!store.token) {
      return '/login'
    }
    // const allRouter = router.getRoutes()
    // console.log('所有路由', allRouter)
  }
})
export default router
