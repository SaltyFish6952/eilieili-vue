import request from '@/utils/request'

/***
 * 接口：/sectors
 * 功能：获取sector列表
 * @returns {AxiosPromise}
 */

// export function getSectors() {
//     return request({
//         url: '/sectors',
//         method: 'get'
//     })
// }

/***
 * 接口：/sector
 * 功能：获取sector信息
 * @param param 可选参数：[{sectorId:Number}]
 * 有该参数则返回该sector，无则返回所有sectors
 * @returns {AxiosPromise}
 */

export function getSector(param) {
    return request({
        url: '/sector',
        method: 'get',
        params: param
    })
}

// export function getInfo(token) {
//     return request({
//         url: '/vue-admin-template/user/info',
//         method: 'get',
//         params: { token }
//     })
// }
//
// export function logout() {
//     return request({
//         url: '/vue-admin-template/user/logout',
//         method: 'post'
//     })
// }
