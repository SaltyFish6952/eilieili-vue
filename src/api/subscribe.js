import request from '@/utils/request'

export function addSubscribe(data) {
    return request({
        url: '/subscribe',
        method: 'post',
        data
    })
}

export function removeSubscribe(data) {
    return request({
        url: '/subscribe',
        method: 'delete',
        data
    })
}

export function getSubscribe(params) {
    return request({
        url: '/subscribe',
        method: 'get',
        params: params
    })
}