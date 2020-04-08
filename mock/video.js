// export const video_1 = [
//     {
//         videoId: 1,
//         userId: 1,
//         sectorId: 1,
//         videoName: "反重力靠谱吗？1",
//         videoBrief: "存在反重力UFO吗？离子飘升机原理揭秘1"
//     },
//     {
//         videoId: 2,
//         userId: 1,
//         sectorId: 1,
//         videoName: "2反重力靠谱吗？",
//         videoBrief: "2存在反重力UFO吗？离子飘升机原理揭秘"
//     },
//     {
//         videoId: 3,
//         userId: 1,
//         sectorId: 1,
//         videoName: "3反重力靠谱吗？",
//         videoBrief: "3存在反重力UFO吗？离子飘升机原理揭秘"
//     },
//     {
//         videoId: 4,
//         userId: 1,
//         sectorId: 1,
//         videoName: "4反重力靠谱吗？",
//         videoBrief: "4存在反重力UFO吗？离子飘升机原理揭秘"
//     },
//     {
//         videoId: 5,
//         userId: 1,
//         sectorId: 1,
//         videoName: "5反重力靠谱吗？",
//         videoBrief: "5存在反重力UFO吗？离子飘升机原理揭秘"
//     }, {
//         videoId: 6,
//         userId: 1,
//         sectorId: 1,
//         videoName: "6反重力靠谱吗？",
//         videoBrief: "6存在反重力UFO吗？离子飘升机原理揭秘"
//     }, {
//         videoId: 7,
//         userId: 1,
//         sectorId: 1,
//         videoName: "7反重力靠谱吗？",
//         videoBrief: "7存在反重力UFO吗？离子飘升机原理揭秘"
//     }, {
//         videoId: 8,
//         userId: 1,
//         sectorId: 1,
//         videoName: "8反重力靠谱吗？",
//         videoBrief: "8存在反重力UFO吗？离子飘升机原理揭秘"
//     }, {
//         videoId: 9,
//         userId: 1,
//         sectorId: 1,
//         videoName: "9反重力靠谱吗？",
//         videoBrief: "9存在反重力UFO吗？离子飘升机原理揭秘"
//     }, {
//         videoId: 118,
//         userId: 1,
//         sectorId: 1,
//         videoName: "118反重力靠谱吗？",
//         videoBrief: "8存在反重力UFO吗？离子飘升机原理揭秘"
//     }, {
//         videoId: 128,
//         userId: 1,
//         sectorId: 1,
//         videoName: "128反重力靠谱吗？",
//         videoBrief: "8存在反重力UFO吗？离子飘升机原理揭秘"
//     }, {
//         videoId: 138,
//         userId: 1,
//         sectorId: 1,
//         videoName: "148反重力靠谱吗？",
//         videoBrief: "8存在反重力UFO吗？离子飘升机原理揭秘"
//     }, {
//         videoId: 158,
//         userId: 1,
//         sectorId: 1,
//         videoName: "158反重力靠谱吗？",
//         videoBrief: "8存在反重力UFO吗？离子飘升机原理揭秘"
//     }, {
//         videoId: 168,
//         userId: 1,
//         sectorId: 1,
//         videoName: "168反重力靠谱吗？",
//         videoBrief: "8存在反重力UFO吗？离子飘升机原理揭秘"
//     }, {
//         videoId: 178,
//         userId: 1,
//         sectorId: 1,
//         videoName: "178反重力靠谱吗？",
//         videoBrief: "8存在反重力UFO吗？离子飘升机原理揭秘"
//     }
// ]

import {comments, favorites, likes, videos} from "./data";
import {getRandomArrayElements} from "./utils";


function getVideos(sectorId) {
    let arr = [];
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].sectorId === sectorId) {
            arr.push(videos[i])
        }
    }
    return arr;
}

function getComments(videoId, page) {
    let arr = [];
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].videoId === videoId) {
            arr.push(comments[i])
        }
    }

    if (page) {
        return arr.slice((page - 1) * 12, (page * 12 - 1) + 1);
    } else {
        return arr;
    }


}

function getCount(arr, videoId) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].videoId === videoId) {
            count++;
        }
    }

    return count;
}

export default [
    {
        url: '/randomVideos',
        type: 'get',
        response: (req, res) => {
            window.console.log(req, res)

            const {sectorId} = req.query;
            if (sectorId !== undefined) {

                return {
                    msg: "操作成功",
                    code: 0,
                    data: {videos: getRandomArrayElements(getVideos(sectorId), 8)}
                }

            } else {
                return {
                    msg: "操作成功",
                    code: 0,
                    data: {videos: getRandomArrayElements(videos, 8)}
                }
            }


        }
    },
    {
        url: '/allVideos',
        type: 'get',
        response: (req, res) => {
            window.console.log(req, res)
            const {sectorId} = req.query
            window.console.log(req.query.sectorId)
            if (sectorId !== undefined) {
                return {
                    msg: "操作成功",
                    code: 0,
                    data: {videos: getVideos(sectorId)}
                }
            } else {
                return {
                    msg: "操作成功",
                    code: 0,
                    data: {videos: videos}
                }
            }


        }
    },
    {
        url: '/video',
        type: 'get',
        response: (req) => {
            const {videoId} = req.query;
            window.console.log(req)
            return {
                msg: "操作成功",
                code: 0,
                data: {
                    //videos[0] ---- videoId=>1
                    video: videos[videoId - 1]
                }
            }
        }
    },
    {
        url: '/comments',
        type: 'get',
        response: (req) => {
            const {videoId, page} = req.query;


            return {
                msg: "操作成功",
                code: 0,
                data: {
                    comments: getComments(videoId, page)
                }
            }


        }
    },

    {
        url: '/favorites',
        type: 'get',
        response: (req) => {
            const {videoId} = req.query;
            return {
                msg: "操作成功",
                code: 0,
                data: {
                    favorites: {
                        videoId: videoId,
                        count: getCount(favorites, videoId)
                    }
                }
            }
        }
    },
    {
        url: '/likes',
        type: 'get',
        response: (req) => {
            const {videoId} = req.query;
            return {
                msg: "操作成功",
                code: 0,
                data: {
                    likes: {
                        videoId: videoId,
                        count: getCount(likes, videoId)
                    }
                }
            }
        }
    }
]

