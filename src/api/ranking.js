import request from '@/utils/request'


/***
 * 接口：/ranking
 * 功能：获取排行榜
 * @param param 可选参数：{sectorId:Number}
 * 有参数，返回该区ranking,无参数，返回总ranking
 * @returns {AxiosPromise}
 */

export function getRanking(param) {
    return request({
        url: '/ranking',
        method: 'get',
        params: param
    })
}