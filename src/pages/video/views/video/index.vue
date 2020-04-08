<template>
    <!--    <div>-->
    <!--        <h2>i am index.vue</h2>-->
    <!--        <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--    </div>-->
    <HeaderWithoutFooter>
        <el-container>
            <el-main width="60%">
                <h2 style="display: block; margin: 10px 0;">{{this.video.videoName}}</h2>

                <div style="width: 896px;">
                    <VideoPlayer class="player"/>
                    <div class="bar">
                        <div class="function_btns">

                            <el-button type="text" :title="'点赞数' + this.likes" style="margin-left: 0;">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dianzan"></use>
                                </svg>
                                {{this.likes ? this.likes : '--'}}
                            </el-button>
                            <el-button type="text" :title="'收藏数' + this.favorites">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-shoucang"></use>
                                </svg>
                                {{this.favorites ? this.favorites : '--'}}
                            </el-button>
                            <el-button type="text">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-zhuanfa"></use>
                                </svg>
                                转发
                            </el-button>
                        </div>
                        <el-divider/>
                    </div>


                    <div v-if="this.video.videoBrief !== null" class="brief">
                        <p>{{this.video.videoBrief}}</p>
                        <el-divider/>
                    </div>

                    <div class="comments">
                        <p>评论数 {{this.commentsCount !== null
                            ? this.commentsCount : '--'}}</p>
                        <el-divider/>

                        <div class="input">
                            <div class="fake" v-if="this.$store.getters.uid === ''">
                                <div class="commentIcon">
                                    <el-avatar :size="50" :src="this.userIcon"/>
                                </div>

                                <div class="inputComment">
                                    <div class="fake_input"></div>
                                    <div class="fake_btn"></div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="commentIcon">
                                    <el-avatar :size="50" :src="this.userIcon"/>
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
                                    <el-button class="real_btn">提交</el-button>
                                </div>
                            </div>
                        </div>

                        <CommentList v-if="this.video.videoId !== null" :video-id="this.video.videoId"/>

                    </div>

                </div>


            </el-main>
            <el-aside width="27%">

                aside

            </el-aside>

        </el-container>
    </HeaderWithoutFooter>


</template>

<script>
    import VideoPlayer from "@/components/VideoPlayer";
    import HeaderWithoutFooter from "@/components/Container/HeaderWithoutFooter";
    import {
        getVideoInfo as getVideoInfoApi,
        getLikes as getLikesApi,
        getFavorites as getFavoritesApi,
        getComments as getCommentsCountApi
    } from "@/api/video";
    import CommentList from "@/components/Comment/CommentList";


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
                    sectorId: null,
                    userId: null
                },
                commentsCount: null,
                likes: null,
                favorites: null,
                commentInput: '',
                userIcon: require('../../../../assets/user.png')


            }
        },
        methods: {

            getVideo() {
                getVideoInfoApi({videoId: this.video.videoId}).then(response => {
                    const {video} = response.data;
                    this.video = video;
                    document.title = this.video.videoName;
                })
            },
            getCommentsCount() {
                getCommentsCountApi({videoId: this.video.videoId}).then(response => {
                    const {comments} = response.data;
                    this.commentsCount = comments.length;
                })
            },

            getLikes() {
                getLikesApi({videoId: this.video.videoId}).then(response => {
                    const {likes} = response.data;
                    this.likes = likes.count;
                })
            },
            getFavorites() {
                getFavoritesApi({videoId: this.video.videoId}).then(response => {
                    const {favorites} = response.data;
                    this.favorites = favorites.count;
                })
            }


        },
        create() {

        },

        mounted() {
            this.video.videoId = this.$route.params.videoId;
            this.getVideo();
            this.getCommentsCount();
            this.getLikes();
            this.getFavorites();


        }
    }
</script>

<style>

    .el-container {
        width: 100%;
    }

    .el-aside {
        width: 70%;
        background-color: #D3DCE6;
        color: #333;
        text-align: center;

    }

    .el-main {
        width: 20%;
        background-color: #E9EEF3;
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
        height: 50px;
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

    .brief p, .comments p {
        text-align: left;
    }

    .comments p {
        font-size: 18px;
        margin: 10px 0;
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
     .input .inputComment .real_btn{
         height: 95.2px;
         margin: 0 10px;

     }

    .input .inputComment .fake_input{
        background-color: #b9b9b9;
        border-radius: 5px;
    }

    .input .inputComment .fake_input, .input .inputComment .real_input {
        width: 700px;
        height: 100px;
        float: left;

    }

    .real_input textarea{
        resize:none;
    }

    .real_input .el-input__count{
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
</style>
