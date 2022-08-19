import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import App from './App.vue'
import router from './router'
import './css/common.less'
import './mock/index'
import { createPinia } from 'pinia'

import { loginStore } from './store'
import piniaPluginPersist from 'pinia-plugin-persist' //pinia持久化
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)

const store = loginStore()
if (store.token) {
  await store.Menu(store.token)
}

app.use(router)
app.mount('#app')
