import { RouteRecordRaw } from 'vue-router'
interface subitem {
  children: []
  createAt: ''
  id: number
  name: string
  parentId: number
  sort: number
  type: number
  updateAt: string
  url: string
}
export function mapMenusToRoutes(menu: any[]): RouteRecordRaw[] {
  const router: RouteRecordRaw[] = []
  const allRouter: RouteRecordRaw[] = []
  //1.先去加载默认的路由
  const routeFiles = import.meta.globEager('../router/layout/**/*.ts')
  Object.values(routeFiles).forEach((key: any) => {
    allRouter.push(key.default)
  })
  // console.log("菜单", allRouter);
  //2.根据菜单获取需要加载的路由
  const menus = (menu: any[]) => {
    menu.forEach((item) => {
      item.children.forEach((subitem: subitem) => {
        if (subitem.type == 2) {
          const route = allRouter.find((route) => {
            return route.path == subitem.url
          })
          if (route) {
            router.push(route)
          }
        }
      })
    })
  }
  menus(menu)
  console.log('router', router)
  return router
}
