import { defineStore } from 'pinia'
import { LoginStoreType } from './type'
import { loginType } from '../../../common/type/common'
import { login, menu } from '../../../api/login/index'
import router from '../../../router'
import { mapMenusToRoutes } from '../../../util/MotionMenu'
export const loginStore = defineStore('main', {
  state: (): LoginStoreType => {
    return {
      token: '',
      menulist: [] //左侧菜单
    }
  },
  actions: {
    async Login(data: loginType) {
      const res = await login(data)
      this.token = res.data.token
      if (res.data.token) {
        await this.Menu(this.token)
        
      }
    },
    async Menu(datas: string) {
      const resdata = await menu(datas)
      this.menulist = resdata.data.data.list
      const routes = mapMenusToRoutes(this.menulist)
      routes.forEach((route) => {
        if (route) {
            router.addRoute('main', route)
            router.push('/main/analysis/echarts')
        }
      })
    }
  },
  persist: {
    enabled: true,
    // 自定义持久化参数
    strategies: [
      {
        // 自定义key
        key: 'token',
        // 自定义存储方式，默认sessionStorage
        storage: localStorage,
        // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
        paths: ['token']
      }
    ]
  }
})
