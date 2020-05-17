<template>
    <!--    <div>-->
    <!--        <h2>i am index.vue</h2>-->
    <!--        <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--    </div>-->
    <HeaderWithoutFooter>
        <el-container>
            <el-main width="60%">
                <h2 style="display: block; margin: 10px 0;">{{video.videoName}}</h2>
                <p style="text-align: left; font-size: 12px; margin: 0 0 10px 10px; color: #8c939d;">
                    {{video.sectorName}} {{video.videoTime}}</p>
                <p style="text-align: left; font-size: 12px; margin: 0 0 10px 10px; color: #8c939d;">
                    {{video.videoViewTimes}}播放</p>
                <div style="width: 896px;">
                    <VideoPlayer v-if="video.videoId !== null && video.maxQuality !== null"
                                 :video-id="video.videoId"
                                 :video-path="video.videoPath"
                                 :video-pic-path="video.videoPicPath"
                                 :video-max-quality="video.maxQuality"
                                 class="player"/>
                    <div class="bar">
                        <div class="function_btns">

                            <el-button :class="isLike ? 'clicked' : ''" type="text" @click="clickLike"
                                       :title="'点赞数' + video.likes"
                                       style="margin-left: 0;">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dianzan"></use>
                                </svg>
                                {{video.likes !== null ? video.likes : '--'}}
                            </el-button>
                            <el-button :class="isFavorite ? 'clicked' : ''" type="text" @click="clickFavorite"
                                       :title="'收藏数' + video.favorites">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-shoucang"></use>
                                </svg>
                                {{video.favorites !== null ? video.favorites : '--'}}
                            </el-button>
                            <el-button type="text" @click="shareURL">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-zhuanfa"></use>
                                </svg>
                                转发
                            </el-button>
                            <el-button type="text" @click="getVideoDownload">
                                <i class="el-icon-download icon"/>
                                下载
                            </el-button>
                        </div>
                        <el-divider style=""/>
                    </div>


                    <div v-if="video.videoBrief !== null" class="brief">
                        <p>{{video.videoBrief}}</p>
                        <el-divider/>
                    </div>

                    <div class="comments">
                        <div class="commentCount">评论数 {{video.comments !== null
                            ? video.comments : '--'}}
                        </div>
                        <el-divider/>

                        <div class="input">
                            <div class="fake" v-if="$store.getters.uid === ''">
                                <div class="commentIcon">
                                    <el-avatar :size="50"
                                               :src="staticIcon"/>
                                </div>

                                <div class="inputComment">
                                    <div class="fake_input">
                                        请登录后再进行评论
                                    </div>
                                    <div class="fake_btn"></div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="commentIcon">
                                    <el-avatar :size="50" v-if="$store.getters.avatar !== ''"
                                               :src="$store.getters.avatar === null ? staticIcon:this.$store.getters.avatar"/>
                                </div>

                                <div class="inputComment">
                                    <el-input type="textarea"
                                              placeholder="请输入内容"
                                              v-model="commentInput"
                                              maxlength="150"
                                              show-word-limit
                                              rows="4"
                                              class="real_input">
                                    </el-input>
                                    <el-button @click="pushComment" class="real_btn">提交</el-button>
                                </div>
                            </div>
                        </div>

                        <CommentList v-if="this.video.videoId !== null" :video-id="this.video.videoId"/>

                    </div>

                </div>


            </el-main>
            <el-aside width="27%">
                <div class="userInfo">
                    <div class="userIcon">
                        <el-avatar :src="video.userPicPath === null ? staticIcon : video.userPicPath"
                                   :size="50"></el-avatar>
                    </div>
                    <div class="userName">
                        <el-link :href="'/home/' + video.userId" style="font-size: 20px; display: block;"
                                 :underline="false">
                            {{video.userName}}
                        </el-link>
                    </div>
                    <p class="userLevel">
                        Lv.{{video.userLevel}}
                    </p>
                    <div v-if="video.userId !== null && video.userId !== $store.getters.uid && $store.getters.uid"
                         class="subscribe">
                        <el-button @click="clickSubscribe" v-if="!isSubscribe">订阅</el-button>
                        <el-button @click="clickSubscribe" v-else>已订阅</el-button>
                    </div>

                </div>
                <el-divider class="divider"/>
                <h3 style="text-align: left;">相关推荐</h3>
                <div class="recommendList">
                    <el-link class="recommendItem" v-for="(item, $index) in recommendVideos" :key="$index"
                             :href="'/video/'+item.videoId" :underline="false">
                        <el-image class="image" :src="item.videoPicPath" lazy></el-image>
                        <div style="float: left; width: 200px;">
                            <p class="name">{{item.videoName}}</p>
                            <div class="view_times">
                                <i class="el-icon-video-camera"/>{{item.videoViewTimes}}
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dianzan"></use>
                                </svg>
                                {{item.likes}}
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-shoucang"></use>
                                </svg>
                                {{item.favorites}}
                            </div>
                        </div>

                        <!--                        <div>{{item.}}</div>-->
                    </el-link>
                </div>

            </el-aside>

        </el-container>
    </HeaderWithoutFooter>


</template>

<script>
    import VideoPlayer from "@/components/VideoPlayer";
    import HeaderWithoutFooter from "@/components/Container/HeaderWithoutFooter";
    import '@/assets/icons/iconfont.js'

    import {
        getVideoInfo as getVideoInfoApi,
        getRecommendRandomVideos as getRecommendRandomVideosApi,
        getUserLike as getUserLikeApi,
        getUserFavorite as getUserFavoriteApi,
        postUserLike as postUserLikeApi,
        postUserFavorite as postUserFavoriteApi,
        getVideoDownloadURL as getVideoDownloadURLApi,
        postComments as postCommentsApi,

    } from "@/api/video";
    import CommentList from "@/components/Comment/CommentList";

    import {throwError} from "@/utils/error";
    import {
        addSubscribe as addSubscribeApi,
        getSubscribe as getSubscribeApi,
        removeSubscribe as removeSubscribeApi
    } from "@/api/subscribe";


    export default {
        name: 'videoApp',
        components: {
            CommentList,
            VideoPlayer,
            HeaderWithoutFooter
        },
        data() {
            return {
                video: {
                    videoId: null,
                    videoName: null,
                    videoBrief: null,
                    videoPicPath: null,
                    videoPath: null,
                    videoViewTimes: null,
                    maxQuality: null,
                    sectorId: null,
                    sectorName: null,
                    userId: null,
                    userName: null,
                    userPicPath: null,
                    userLevel: null,
                    userLevelProgress: null,
                    likes: null,
                    favorites: null,
                    comments: null
                },

                commentInput: '',
                isLike: false,
                isFavorite: false,
                isSubscribe: false,
                recommendVideos: null,
                staticIcon: require('../../../../assets/user.png')


            }
        },
        methods: {

            getVideo() {
                getVideoInfoApi({videoId: this.video.videoId}).then(response => {

                    try {
                        const {video} = response.data;
                        this.video = video;
                        document.title = this.video.videoName;

                        if (this.$store.getters.uid !== '') {
                            this.getUserLike();
                            this.getUserFavorite();
                            this.getSubscribe();

                        }
                        this.getRecommendVideo();

                    } catch (e) {
                        throwError(e, response, this)
                    }


                })
            },
            getVideoDownload() {
                getVideoDownloadURLApi({videoId: this.video.videoId}).then(response => {

                    try {

                        const {url} = response.data
                        window.open(url)

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            },
            clickLike() {

                if (!this.isLike) {


                    postUserLikeApi({
                        userId: this.$store.getters.uid,
                        videoId: this.video.videoId,
                        isLike: true
                    }).then(response => {

                        try {

                            if (response.code === 0) {

                                this.isLike = true;
                                this.video.likes++;

                            } else {
                                throwError(null, response, this)
                            }

                        } catch (e) {
                            throwError(e, response, this)
                        }


                    })

                } else {

                    postUserLikeApi({
                        userId: this.$store.getters.uid,
                        videoId: this.video.videoId,
                        isLike: false
                    }).then(response => {

                        try {

                            if (response.code === 0) {

                                this.isLike = false;
                                this.video.likes--;

                            } else {
                                throwError(null, response, this)
                            }

                        } catch (e) {
                            throwError(e, response, this)
                        }


                    })

                }

            },
            clickFavorite() {

                if (!this.isFavorite) {

                    postUserFavoriteApi({
                        userId: this.$store.getters.uid,
                        videoId: this.video.videoId,
                        isFavorite: true
                    }).then(response => {

                        try {

                            if (response.code === 0) {

                                this.isFavorite = true;
                                this.video.favorites++;

                            } else {
                                throwError(null, response, this)
                            }


                        } catch (e) {
                            throwError(e, response, this)
                        }


                    })


                } else {

                    postUserFavoriteApi({
                        userId: this.$store.getters.uid,
                        videoId: this.video.videoId,
                        isFavorite: false
                    }).then(response => {

                        try {

                            if (response.code === 0) {

                                this.isFavorite = false;
                                this.video.favorites--;

                            } else {
                                throwError(null, response, this)
                            }


                        } catch (e) {
                            throwError(e, response, this)
                        }


                    })

                }

            },
            clickSubscribe() {
                if (this.isSubscribe) {
                    removeSubscribeApi({
                        subscribeUserId: this.$store.getters.uid,
                        publisherUserId: this.video.userId
                    }).then(response => {

                        try {

                            if (response.code === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '取消订阅成功！'
                                })
                                this.isSubscribe = false

                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '取消订阅失败！'
                                })
                            }

                        } catch (e) {
                            throwError(e, response, this)
                        }

                    })
                } else {
                    addSubscribeApi({
                        subscribeUserId: this.$store.getters.uid,
                        publisherUserId: this.video.userId
                    }).then(response => {

                        try {

                            if (response.code === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '订阅成功！'
                                })
                                this.isSubscribe = true
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '订阅失败！'
                                })
                            }

                        } catch (e) {
                            throwError(e, response, this)
                        }

                    })
                }
            },

            getUserLike() {
                getUserLikeApi({
                    userId: this.$store.getters.uid,
                    videoId: this.video.videoId
                }).then(response => {

                    try {
                        const {isLike} = response.data;
                        this.isLike = isLike;
                    } catch (e) {
                        throwError(e, response, this);
                    }


                })
            },
            getUserFavorite() {
                getUserFavoriteApi({
                    userId: this.$store.getters.uid,
                    videoId: this.video.videoId
                }).then(response => {

                    try {
                        const {isFavorite} = response.data;
                        this.isFavorite = isFavorite;
                    } catch (e) {

                        throwError(e, response, this);
                    }

                })
            },
            getSubscribe() {
                getSubscribeApi({
                    subscribeUserId: this.$store.getters.uid,
                    publisherUserId: this.video.userId
                }).then(response => {


                    try {
                        const {isSubscribe} = response.data;
                        this.isSubscribe = isSubscribe;
                    } catch (e) {

                        throwError(e, response, this);
                    }

                })
            },

            getRecommendVideo() {
                getRecommendRandomVideosApi({videoName: this.video.videoName}).then(response => {


                    try {
                        const {videos} = response.data;
                        this.recommendVideos = videos;
                    } catch (e) {
                        throwError(e, response, this)
                    }


                })
            },
            shareURL() {

                const input = document.createElement('input');
                input.setAttribute('readonly', 'readonly');
                input.setAttribute('value', window.location.href);

                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, 9999);
                // document.execCommand('Copy');

                if (document.execCommand('Copy')) {
                    // 复制成功
                    this.$notify({
                        title: '链接复制成功',
                        message: '链接已复制到粘贴板，快去分享给好友吧！',
                        type: 'success'
                    });
                    input.style.display = 'none';
                }

            },

            pushComment() {

                if (this.commentInput !== '') {

                    if (this.commentInput.length < 5) {
                        this.$message.error('请输入大于五个字符的评论！');
                        return
                    }

                    postCommentsApi({
                        commentText: this.commentInput,
                        videoId: this.video.videoId, userId: this.$store.getters.uid
                    }).then(response => {

                        try {

                            if (response.code === 0) {

                                this.$message({
                                    message: '发表评论成功！',
                                    type: 'success'
                                })

                                setTimeout(function () {
                                    location.reload()
                                }, 500)

                            } else {
                                throwError(null, response, this)
                            }

                        } catch (e) {
                            throwError(e, response, this)
                        }

                    })
                } else {
                    this.$message.error('请输入评论！')
                }
            }


        },
        create() {

        },

        mounted() {
            this.video.videoId = this.$route.params.videoId;
            this.getVideo();


        }
    }
</script>

<style>

    .el-container {
        width: 100%;
    }

    .el-aside {
        width: 70%;
        /*background-color: #D3DCE6;*/
        color: #333;
        text-align: center;

    }

    .el-main {
        width: 20%;
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
    }

    h2 {
        height: 30px;
        font-size: 20px;
        text-align: left;
        margin: 5px 20px;
        line-height: 30px;
    }

    .player {
        width: 896px;
        /*height: 360px;*/
        object-fit: fill;

        /*background-color: #42b983;*/
        /*margin: 20px;*/
    }

    .bar {
        margin: 5px 0;

    }

    .bar .function_btns {
        height: 45px;
    }

    .bar .function_btns .el-button {
        float: left;
        color: #505050;
        font-size: 18px;
        margin: 0 10px;
    }


    .bar .function_btns .el-button:hover {
        color: #008080;
    }

    .bar .function_btns .clicked {
        color: #008080;
    }

    .brief p, .comments p {
        text-align: left;
    }

    .comments .commentCount {
        margin: 10px 0;
        font-size: 18px;
        text-align: left;
    }

    .bar .el-divider, .comments .el-divider, .brief .el-divider {
        margin: 12px 0;
    }

    .input .commentIcon {

        width: 10%;
        height: 50px;
        float: left;
        margin: 25px 0;
    }

    .input .inputComment {
        float: right;
    }

    .input {
        height: 100px;
    }

    .input .inputComment .fake_btn {
        width: 50px;
        height: 100px;

    }

    .input .inputComment .real_btn {
        height: 95.2px;
        margin: 0 10px;

    }

    .input .inputComment .fake_input {
        background-color: #b9b9b9;
        border-radius: 5px;
        line-height: 100px;
    }

    .input .inputComment .fake_input, .input .inputComment .real_input {
        width: 700px;
        height: 100px;
        float: left;

    }

    .real_input textarea {
        resize: none;
    }

    .real_input .el-input__count {
        bottom: 8px;
    }


    .input .inputComment .fake_btn {
        background-color: #b9b9b9;
        border-radius: 5px;
        float: left;
        margin: 0 10px;
    }


    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    .userInfo {
        overflow: auto;
    }

    .userInfo .userIcon {
        float: left;
        margin: 20px;
    }

    .userInfo .userName {
        float: left;
        line-height: 94px;
        height: 94px;
    }

    .userInfo .userLevel {
        float: left;
        height: 94px;
        line-height: 94px;
        margin: 0 10px;
    }

    .userInfo .subscribe {
        float: left;
        height: 94px;
        line-height: 90px;
    }

    .divider {
        float: left;
        margin: 5px 0;
    }

    .recommendList .image {
        width: 128px;
        height: 72px;
        float: left;
    }

    .recommendList .name {

        text-align: left;
        margin: 5px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 40px;
    }

    .recommendList .view_times {
        text-align: left;
    }

    .recommendList .recommendItem {
        float: left;
        margin: 10px 2px;
    }

    .recommendItem .el-icon-video-camera, .icon {
        font-size: 14px;
        margin: 0 10px;
    }

    .icon {

        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

</style>
