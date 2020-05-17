import request from '@/utils/request'

export function getDynamics(params) {
    return request({
        url: '/dynamic',
        method: 'get',
        params: params
    })

}

export function getAllDynamics(params) {
    return request({
        url: '/dynamic/all',
        method: 'get',
        params: params
    })

}


export function postDynamic(data) {
    return request({
        url: '/dynamic',
        method: 'post',
        data
    })
}

export function delDynamic(data) {
    return request({
        url: '/dynamic/delete',
        method: 'post',
        data
    })
}

export function postDynamicReply(data) {
    return request({
        url: '/dynamic/reply',
        method: 'post',
        data
    })
}

export function deleteDynamicReply(data) {
    return request({
        url: '/dynamic/reply',
        method: 'delete',
        data
    })
}