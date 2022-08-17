import { axios } from "../../http/index";
import { IAccount } from "./type";
export function login(data: IAccount) {
    return axios.request({
        showLoading: false, //是否开启loading
        url: "/login",
        method: "post",
        data: data,
    });
}
