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

