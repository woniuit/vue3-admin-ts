import { createApp } from "vue";
import 'normalize.css/normalize.css'
import App from "./App.vue";
import router from './router'
import { createPinia } from "pinia";
const app = createApp(App);
import piniaPluginPersist from "pinia-plugin-persist"; //pinia持久化
const pinia = createPinia();
pinia.use(piniaPluginPersist);
app.use(router)
app.use(pinia);

app.mount("#app");
