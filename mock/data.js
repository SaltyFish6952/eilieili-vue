import Mock from 'mockjs'
import {getRandomArrayElements} from "./utils";

const videos = [];
let rankings = [];
const users = [];
const sectors = [];
const comments = [];    //评论
const likes = [];       //点赞
const subscribes = [];  //关注
const favorites = [];   //收藏
const replies = []       //回复


function mock() {

    //mock sector
    for (let i = 1; i <= 3; i++) {
        sectors.push({
            sectorId: String(i),
            sectorName: Mock.Random.word(5) + '区'
        })
    }

    //mock user
    for (let i = 1; i <= 1000; i++) {
        users.push({
            userId: String(i),
            userName: Mock.Random.cword(2, 7),
            userPicPath: Mock.Random.image('40x40'),
            userLevel: 1,
            userLevelProgress: 100
        })
    }

    //mock video
    const videoLength = 50;

    for (let i = 1; i <= videoLength; i++) {
        videos.push({
            videoId: String(i),
            videoName: Mock.Random.word(10),
            videoBrief: Mock.Random.sentence(5),
            videoPicPath: Mock.Random.image('640x360'),
            videoViewTimes: Mock.Random.natural(100, 1000),
            videoPath: 'http://192.168.3.101:8011/player/bento4test/output/stream.mpd',
            userId: getRandomArrayElements(users, 1)[0].userId,
            sectorId: getRandomArrayElements(sectors, 1)[0].sectorId
        })
    }


    //mock ranking
    rankings = videos.slice(0);

    let i = rankings.length;

    while (i) {

        let j = Math.floor(Math.random() * i--);

        [rankings[j], rankings[i]] = [rankings[i], rankings[j]];

    }


    //mock comments

    const commentLength = Mock.Random.natural(300, 99999);

    for (let i = 1; i <= commentLength; i++) {
        comments.push({
            videoId: getRandomArrayElements(videos, 1)[0].videoId,
            userId: getRandomArrayElements(users, 1)[0].userId,
            commentId: String(i),
            commentText: Mock.Random.paragraph(1),
            commentTime: Mock.Random.date('T')
        })
    }

    //mock replies
    let o = 1;
    while (o <= Mock.Random.natural(0, videoLength * 100)) {
        let replyerId = getRandomArrayElements(users, 1)[0].userId;
        let replyToId = getRandomArrayElements(users, 1)[0].userId;
        let commentId = getRandomArrayElements(comments, 1)[0].commentId;
        let isToComment = Mock.Random.boolean();


        const oldArr = likes.filter(function (reply) {
            return (replyerId === reply.replyerId &&
                replyToId === reply.replyToId &&
                commentId === reply.commentId)
        });

        if (oldArr.length === 0) {
            replies.push({
                replyId: o,
                replyerId: replyerId,
                replyToId: isToComment ? null : replyToId,
                replyText: Mock.Random.paragraph(1),
                replyTime: Mock.Random.date('T'),
                commentId: commentId
            })
        }

    }


    //mock likes
    let k = 1;

    while (k <= Mock.Random.natural(0, videoLength * 100)) {
        let userId = getRandomArrayElements(users, 1)[0].userId;
        let videoId = getRandomArrayElements(videos, 1)[0].videoId;

        const oldArr = likes.filter(function (like) {
            return (userId === like.userId && videoId === like.videoId)
        });

        if (oldArr.length === 0) {

            likes.push({
                likeId: String(k),
                userId: userId,
                videoId: videoId
            });
            k++;
        }

    }


    //mock subscribes
    let j = 1;
    while (j <= Mock.Random.natural(0, 9999)) {
        let Publisher = getRandomArrayElements(users, 1)[0].userId;
        let Subscriber = getRandomArrayElements(users, 1)[0].userId;

        const oldArr = subscribes.filter(function (subscribe) {
            return (Subscriber === subscribe.subscriber && Publisher === subscribe.publisher)
        });

        if (oldArr.length === 0 && Publisher !== Subscriber) {

            subscribes.push({
                subscribeId: String(j),
                subscriber: Subscriber,
                publisher: Publisher
            });
            j++;
        }

    }

    //mock favourite
    let l = 1;
    while (l <= Mock.Random.natural(0, 9999)) {
        let userId = getRandomArrayElements(users, 1)[0].userId;
        let videoId = getRandomArrayElements(videos, 1)[0].videoId;

        const oldArr = favorites.filter(function (favorite) {
            return (userId === favorite.userId && videoId === favorite.videoId)
        });

        if (oldArr.length === 0) {

            favorites.push({
                favoriteId: String(l),
                userId: userId,
                videoId: videoId
            });
            l++;
        }

    }

}

mock();
window.console.log(rankings, videos, users, sectors);
window.console.log(comments, likes, subscribes, favorites);

export {
    rankings,
    videos,
    users,
    sectors,
    comments,
    likes,
    subscribes,
    favorites
}



