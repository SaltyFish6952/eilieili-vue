import request from '@/utils/request'


/***
 * 接口：/sector
 * 功能：获取sector信息
 * @param param 可选参数：[{sectorId:String}]
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

export function postSector(data) {
    return request({
        url: '/sector',
        method: 'post',
        data
    })
}

export function updateSector(data) {
    return request({
        url: '/sector',
        method: 'put',
        data
    })
}

export function deleteSector(data) {
    return request({
        url: '/sector',
        method: 'delete',
        data
    })

}

