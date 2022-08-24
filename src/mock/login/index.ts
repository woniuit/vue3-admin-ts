import Mock from 'mockjs'
import { responseType } from './type'
const Random = Mock.Random
// mock需要给三个参数,url(与axios请求是传的url一致,我这个是本地启动的项目就直接用本地域名了)
// 请求类型: get post...其他看文档
// 数据处理函数,函数需要return数据

// 登录
Mock.mock('http://127.0.0.1:5173/login', 'post', (data: any) => {
  const info = JSON.parse(data.body)
  if (info.name == 'admin' && info.password == '123456') {
    return {
      token: 'tokenfafhkladhf'
    }
  }
  if (info.name == 'user' && info.password == '123456') {
    return {
      token: 'token12314'
    }
  }
})

// 动态菜单
Mock.mock('http://127.0.0.1:5173/menu', 'post', (data: responseType) => {
  const info = JSON.parse(data.body)
  if (info == 'tokenfafhkladhf') {
    return {
      data: {
        list: [
          {
            id: 38,
            name: '常用组件',
            type: 1,
            url: '/main/analysis',
            icon: 'el-icon-monitor',
            sort: 1,
            children: [
              {
                id: 41,
                url: '/main/analysis/echarts',
                name: 'echarts',
                sort: 107,
                type: 2,
                children: null,
                createAt: '2021-01-02 18:09:22.000000',
                parentId: 38,
                updateAt: '2021-08-19 15:56:08.000000'
              },
              {
                id: 39,
                url: '/main/analysis/form',
                name: '表单组件',
                sort: 106,
                type: 2,
                children: null,
                createAt: '2021-01-02 18:09:11.000000',
                parentId: 38,
                updateAt: '2021-08-19 15:54:41.000000'
              },
              {
                id: 40,
                url: '/main/analysis/table',
                name: '表格组件',
                sort: 107,
                type: 2,
                children: null,
                createAt: '2021-01-02 18:09:22.000000',
                parentId: 38,
                updateAt: '2021-08-19 15:56:08.000000'
              },
              {
                id: 41,
                url: '/main/analysis/tinymce',
                name: 'tinymce',
                sort: 107,
                type: 2,
                children: null,
                createAt: '2021-01-02 18:09:22.000000',
                parentId: 38,
                updateAt: '2021-08-19 15:56:08.000000'
              }
            ]
          },
          {
            id: 1,
            name: '系统管理',
            type: 1,
            url: '/main/system',
            icon: 'el-icon-setting',
            sort: 2,
            createAt: '2021-01-02T10:08:14.000Z',
            updateAt: '2021-08-20T07:00:08.000Z',
            children: [
              {
                id: 2,
                url: '/main/system/instruct',
                name: '自定义指令',
                sort: 100,
                type: 2,
                createAt: '2021-01-02 18:08:47.000000',
                parentId: 1,
                updateAt: '2021-08-19 15:52:01.000000'
              },
              {
                id: 2,
                url: '/main/system/menu',
                name: '角色菜单',
                sort: 101,
                type: 2,
                createAt: '2021-01-02 18:08:47.000000',
                parentId: 1,
                updateAt: '2021-08-19 15:52:01.000000'
              }
            ]
          }
        ]
      }
    }
  }
  if (info == 'token12314') {
    return {
      data: {
        list: [
          {
            id: 38,
            name: '常用组件',
            type: 1,
            url: '/main/analysis',
            icon: 'el-icon-monitor',
            sort: 1,
            children: [
              {
                id: 41,
                url: '/main/analysis/echarts',
                name: 'echarts',
                sort: 107,
                type: 2,
                children: null,
                createAt: '2021-01-02 18:09:22.000000',
                parentId: 38,
                updateAt: '2021-08-19 15:56:08.000000'
              },
              {
                id: 39,
                url: '/main/analysis/form',
                name: '表单组件',
                sort: 106,
                type: 2,
                children: null,
                createAt: '2021-01-02 18:09:11.000000',
                parentId: 38,
                updateAt: '2021-08-19 15:54:41.000000'
              },
              {
                id: 40,
                url: '/main/analysis/table',
                name: '表格组件',
                sort: 107,
                type: 2,
                children: null,
                createAt: '2021-01-02 18:09:22.000000',
                parentId: 38,
                updateAt: '2021-08-19 15:56:08.000000'
              },
              {
                id: 41,
                url: '/main/analysis/tinymce',
                name: 'tinymce',
                sort: 107,
                type: 2,
                children: null,
                createAt: '2021-01-02 18:09:22.000000',
                parentId: 38,
                updateAt: '2021-08-19 15:56:08.000000'
              }
            ]
          }
        ]
      }
    }
  }
})
