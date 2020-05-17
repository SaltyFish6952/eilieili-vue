import request from '@/utils/request'

/***
 * 接口：/video get方法
 * 功能：获取video信息
 * @param params 可选参数：[{videoId: String}]
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
 * @param data 参数：{keyword: String}
 * @returns {AxiosPromise}
 */
export function getRecommendRandomVideos(data) {
    return request({
        url: '/videos/recommend',
        method: 'post',
        data
    })
}


/***
 * 接口：/videos/random get方法
 * 功能：获取某一sector的随机视频列表
 * @param params 可选参数：[{sectorId:Number}]
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


export function postComments(data) {
    return request({
        url: '/comments',
        method: 'post',
        data
    })
}

export function deleteComments(data) {
    return request({
        url: '/comments',
        method: 'delete',
        data
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

export function getVideoStatus(params) {

    return request({
        url: '/transcode',
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

//favorite

/***
 * 接口：/api/video/favorite
 * 功能：获取用户是否收藏
 * @param params 参数：{userId: String, videoId: String}
 * @returns {AxiosPromise}
 */


export function getUserFavorite(params) {
    return request({
        url: '/video/favorite',
        method: 'get',
        params: params
    })
}

/***
 * 接口：/api/video/favorite
 * 功能：用户收藏/取消收藏
 * @param data 参数：{userId: String, videoId: String, isFavorite: Boolean}
 * @returns {AxiosPromise}
 */

export function postUserFavorite(data) {
    return request({
        url: '/video/favorite',
        method: 'post',
        data
    })

}


export function getVideoDownloadURL(params) {
    return request({
        url: "/video/download",
        method: 'get',
        params: params
    })
}


export function removeVideo(data) {
    return request({
        url: '/video',
        method: 'delete',
        data
    })
}

export function getUserFavoriteVideos(params) {
    return request({
        url: '/video/favorites',
        method: 'get',
        params: params
    })

}

export function updateVideo(data) {
    return request({
        url: '/video',
        method: 'put',
        data
    })
}

export function updateVideoStatus(data) {
    return request({
        url: '/video/check',
        method: 'put',
        data
    })
}


export function postCommentReply(data) {
    return request({
        url: '/comment/reply',
        method: 'post',
        data
    })
}

export function deleteCommentReply(data) {
    return request({
        url: '/comment/reply',
        method: 'delete',
        data
    })
}
