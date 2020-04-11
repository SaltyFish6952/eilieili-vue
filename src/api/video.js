import request from '@/utils/request'

export function getRecommendRandomVideos(params) {
    return request({
        url: '/randomVideos/name',
        method: 'get',
        params: params
    })
}


/***
 * 接口：/randomVideos get方法
 * 功能：获取某一sector的随机视频列表
 * @param params 可选参数：{sectorId:Number}
 * @returns {AxiosPromise}
 */

export function getSectorRandomVideos(params) {
    return request({
        url: '/randomVideos/sector',
        method: 'get',
        params: params
    })
}

/***
 * 接口：/allVideos get方法
 * 功能：获取某一sector的所有视频列表(可选page参数)
 * @param params 可选参数：{[sectorId:Number, page:Number]}
 * @returns {AxiosPromise}
 */

export function getAllVideos(params) {

    return request({
        url: '/allVideos',
        method: 'get',
        params: params
    })

}

/***
 * 接口：/video get方法
 * 功能：获取video信息
 * @param params 参数：{videoId}
 * @returns {AxiosPromise}
 */

export function getVideoInfo(params) {
    return request({
        url: '/video',
        method: 'get',
        params: params
    })
}

/***
 * 接口：/comments get方法
 * 功能：获取video评论
 * @param params 参数：{videoId,page}
 * @returns {AxiosPromise}
 */

export function getComments(params) {
    return request({
        url: '/comments',
        method: 'get',
        params: params
    })
}

/***
 * 接口：/replies get方法
 * 功能：获取comment的replies
 * @param params 参数：{commentId}
 * @returns {AxiosPromise}
 */

export function getReplies(params) {
    return request({
        url: '/replies',
        method: 'get',
        params: params
    })
}


/***
 * 接口：/likes get方法
 * 功能：获取video点赞数
 * @param params 参数：{videoId}
 * @returns {AxiosPromise}
 */

export function getLikes(params) {
    return request({
        url: '/likes',
        method: 'get',
        params: params
    })
}

/***
 * 接口：/favorites get方法
 * 功能：获取video收藏数
 * @param params 参数：{videoId}
 * @returns {AxiosPromise}
 */

export function getFavorites(params) {
    return request({
        url: '/favorites',
        method: 'get',
        params: params
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
