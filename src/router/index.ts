import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "login",
        component: () => import("../view/login/login.vue"),
    },
];
const router = createRouter({
    routes,
    history: createWebHashHistory(),
});
router.beforeEach((to) => {
    // const store = loginStore();
    if (to.path !== "/login") {
        // if (!store.token) {
            return "/login";
        // }
        // const allRouter = router.getRoutes()
        // console.log('所有路由', allRouter);
    }
});
export default router;
