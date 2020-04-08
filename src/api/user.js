import request from '@/utils/request'

/***
 * 接口：/login
 * 功能：登录
 * @param data 参数：{userAccount:String, password:String}
 * @returns {AxiosPromise}
 */

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function getUserInfo(params) {
    return request({
        url: 'user',
        method: 'get',
        params: params
    })
}

// export function logout() {
//     return request({
//         url: '/vue-admin-template/user/logout',
//         method: 'post'
//     })
// }
