import request from '@/utils/request'

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
 * 接口：/videos/recommend
 * 功能：根据keyword获取videos
 * @param params 参数：{keyword: String}
 * @returns {AxiosPromise}
 */
export function getRecommendRandomVideos(params) {
    return request({
        url: '/videos/recommend',
        method: 'get',
        params: params
    })
}


/***
 * 接口：/videos/random get方法
 * 功能：获取某一sector的随机视频列表
 * @param params 可选参数：{sectorId:Number}
 * @returns {AxiosPromise}
 */

export function getRandomVideos(params) {
    return request({
        url: '/videos/random',
        method: 'get',
        params: params
    })
}

/***
 * 接口：/allVideos get方法
 * 功能：获取某一sector的所有视频列表(可选page参数)
 * @param params 可选参数：{sectorId:Number[, page:Number]}
 * @returns {AxiosPromise}
 */

export function getAllVideos(params) {

    return request({
        url: '/videos/sector',
        method: 'get',
        params: params
    })

}


/***
 * 接口：/videos/user
 * 功能：获取某一用户的所有视频（可选page）
 * @param params 参数：{userId: Number, [page: Number]}
 * @returns {AxiosPromise}
 */

export function getUserVideos(params) {
    return request({
        url: '/videos/user',
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

// /***
//  * 接口：/replies get方法
//  * 功能：获取comment的replies
//  * @param params 参数：{commentId}
//  * @returns {AxiosPromise}
//  */
//
// export function getReplies(params) {
//     return request({
//         url: '/replies',
//         method: 'get',
//         params: params
//     })
// }


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


/***
 * 接口：/upload/video/info
 * 功能：新增video
 * @param data 参数 {uuid: String, videoBrief: String, videoName: String， sectorId: String}
 * @returns {AxiosPromise}
 */

export function postVideoInfo(data) {
    return request({
        url: '/upload/video/info',
        method: 'post',
        data
    })
}

/***
 * 接口：/api/video/search
 * 功能：搜索视频
 * @param params 参数：{query: String}
 * @returns {AxiosPromise}
 */

export function getVideoQuery(params) {
    return request({
        url: "/video/search",
        method: 'get',
        params: params
    })
}


/***
 * 接口：/api/video/viewed
 * 功能：更新视频观看数
 * @param data 参数：{videoId: String}
 * @returns {AxiosPromise}
 */

export function updateVideoViewTimes(data) {
    return request({
        url: '/video/viewed',
        method: 'post',
        data
    })
}


/***
 * 接口：/api/video/like
 * 功能：获取用户是否点赞
 * @param params 参数：{userId: String, videoId: String}
 * @returns {AxiosPromise}
 */

export function getUserLike(params) {
    return request({
        url: '/video/like',
        method: 'get',
        params: params
    })
}

/***
 * 接口：/api/video/like
 * 功能：用户点赞/取消点赞
 * @param data 参数：{userId: String, videoId: String, isLike: Boolean}
 * @returns {AxiosPromise}
 */

export function postUserLike(data) {
    return request({
        url: '/video/like',
        method: 'post',
        data
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
