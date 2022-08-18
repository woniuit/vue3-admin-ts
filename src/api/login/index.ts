import { axios } from "../../http/index";
import { IAccount,tokenType } from "./type";
export function login(data:IAccount) {
    return axios.request({
        showLoading: true, //是否开启loading
        url: "/login",
        method: "post",
        data: data,
    });
}
export function menu(data:tokenType) {
    return axios.request({
        showLoading: true, //是否开启loading
        url: "/menu",
        method: "post",
        data: data,
    });
}
