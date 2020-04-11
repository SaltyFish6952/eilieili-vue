

import {comments, favorites, likes, replies, videos} from "./data";
import {getRandomArrayElements} from "./utils";
// import Mock from "mockjs";

// function getVideoInfo(videoId) {
//     let video = videos[videoId - 1]
//     return video;
// }

function getVideos(sectorId) {
    let arr = [];
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].sectorId === sectorId) {
            arr.push(videos[i])
        }
    }
    return arr;
}

function getVideosByName(videoName) {
    return videos.filter(function (video) {

        const key = videoName.substring(0,1);

        return (video.videoName.indexOf(key) >= 0)
    });
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

function getReplies(commentId) {

    const arr = [];

    for (let i = 0; i < replies.length; i++) {
        if (replies[i].commentId === commentId) {
            arr.push(replies[i]);
        }
    }

    return arr;
}


export default [
    {
        url: '/randomVideos/name',
        type: 'get',
        response: (req) => {
            const {videoName} = req.query;
            return {
                msg: "操作成功",
                code: 0,
                data: {
                    videos:
                        getRandomArrayElements(getVideosByName(videoName), 8)
                }
            }
        }
    },
    {
        url: '/randomVideos/sector',
        type: 'get',
        response: (req, res) => {
            window.console.log(req, res);

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
            window.console.log(req, res);
            const {sectorId} = req.query;
            window.console.log(req.query.sectorId);
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
            window.console.log(req);
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
    },
    {
        url: '/replies',
        type: 'get',
        response: (req) => {
            const {commentId} = req.query;
            return {
                msg: '操作成功',
                code: 0,
                data: {
                    replies: getReplies(commentId)
                }
            }
        }
    }
]

