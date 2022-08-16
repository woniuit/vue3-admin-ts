import { createApp } from "vue";
import App from "./App.vue";
import { http1 } from "./http/index";
const app = createApp(App);
http1.request({
    showLoading: false,
    url: "/login",
    method: "post",
    data: {
        name: "coderwhy",
        password: "123456",
    },
    // headers: {
    //     "Content-Type": "123",
    // },
});
app.mount("#app");
