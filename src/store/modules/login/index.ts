import { defineStore } from "pinia";
import { LoginType } from "./type";
export const loginStore = defineStore("main", {
    state: (): LoginType => {
        return {
            token: "",
            menulist: [], //左侧菜单
        };
    },
    actions: {
        
    },
    persist: {
        enabled: true,
        // 自定义持久化参数
        strategies: [
            {
                // 自定义key
                key: "token",
                // 自定义存储方式，默认sessionStorage
                storage: localStorage,
                // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
                paths: ["token"],
            },
        ],
    },
});
