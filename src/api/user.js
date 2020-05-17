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

/***
 * 接口：/api/user
 * 功能：获取用户信息
 * @param params 参数：{userId: Number}
 * @returns {AxiosPromise}
 */

export function getUserInfo(params) {
    return request({
        url: '/user',
        method: 'get',
        params: params
    })
}

/***
 * 接口：/api/user/check/name
 * 功能：检查新的姓名是否被占用
 * @param params 参数：{userId: String, checkName: String}
 * @returns {AxiosPromise}
 */

export function checkUserNameValid(params) {
    return request({
        url: '/user/check/name',
        method: 'get',
        params: params
    })
}

/***
 * 接口：/api/user/check/password
 * 功能：检查密码是否正确
 * @param params 参数：{userId: String, newPassword: String}
 * @returns {AxiosPromise}
 */

export function checkUserPasswordValid(params) {
    return request({
        url: '/user/check/password',
        method: 'get',
        params: params
    })
}


export function checkNewUserAccount(params) {
    return request({
        url: '/user/check/account',
        method: 'get',
        params: params
    })
}


/***
 * 接口：/api/user/update/name
 * 功能：更新用户名
 * @param data 参数：{userId: String, newName: String}
 * @returns {AxiosPromise}
 */

export function updateUserName(data) {
    return request({
        url: '/user/update/name',
        method: 'post',
        data
    })
}

/***
 * 接口：/api/user/update/password
 * 功能: 更新用户密码
 * @param data 参数：{userId: String, newPassword: String}
 * @returns {AxiosPromise}
 */

export function updateUserPassword(data) {
    return request({
        url: '/user/update/password',
        method: 'post',
        data
    })
}

/***
 * 接口：/api/user/register
 * 功能：注册新用户
 * @param user
 * @returns {*}
 */

export function insertUser(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}


export function getAllUsers() {
    return request({
        url: '/user/all',
        method: 'get'
    })
}

export function updateUser(data) {
    return request({
        url: '/user',
        method: 'put',
        data
    })
}

export function deleteUser(data) {
    return request({
        url: '/user',
        method: 'delete',
        data
    })
}


// export function logout() {
//     return request({
//         url: '/vue-admin-template/user/logout',
//         method: 'post'
//     })
// }
