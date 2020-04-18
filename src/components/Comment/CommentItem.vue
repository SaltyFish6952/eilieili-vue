<template>

    <div>
        <div class="comment">
            <div class="commentIcon" v-if="user.userPicPath !== undefined">
                <el-avatar v-if="user.userPicPath !== undefined" :size="50" :src="user.userPicPath"/>
            </div>
            <el-link class="uNameLink" :underline="false" href="">{{user.userName ? user.userName : 'xxx'}}</el-link>
            <div class="uLevel">{{'Lv.' + user.userLevel}}</div>
            <p class="commentText">
                {{comment.commentText ? comment.commentText : 'xxxxxxxxxxxxxxxxx'}}
            </p>
            <div class="function">
                <p class="commentTime">{{comment.commentTime}}</p>
                <el-button class="commentBtn" type="text">回复</el-button>
            </div>

            <div v-if="replies.length !== 0" class="replies">
                <div v-for="(item, $index) in replies" :key="$index">
                    <!--                    <ReplyItem :reply="item"/>-->
                </div>
            </div>

        </div>

    </div>


</template>

<script>


    import {getUserInfo as getUserInfoApi} from "@/api/user";
    import {getReplies as getRepliesApi} from "@/api/video";
    import {throwError} from "@/utils/error";
    // import ReplyItem from "@/components/Comment/ReplyItem";


    export default {
        name: "CommentItem",
        components: {},
        props: {
            comment: {
                type: Object,
                default: function () {
                    return {
                        videoId: null,
                        userId: null,
                        commentId: null,
                        commentText: null,
                        commentTime: null
                    }
                }
            }
        },
        data() {
            return {
                user: {
                    userId: null,
                    userName: null,
                    userPicPath: null,
                    userLevel: null,
                    userLevelProgress: null
                },
                replies: []
            }
        },
        methods: {
            getUserInfo() {
                getUserInfoApi({userId: this.comment.userId}).then(response => {

                    try {
                        const {user} = response.data;
                        this.user = user;

                    } catch (e) {
                        throwError(e, response, this)

                    }


                })
            },
            getReply() {
                getRepliesApi({commentId: this.comment.commentId}).then(response => {

                    try {
                        const {replies} = response.data;
                        this.replies = replies;

                    } catch (e) {
                        throwError(e, response, this)

                    }


                })

            }
        },
        mounted() {
            this.getUserInfo();
            this.getReply();
            window.console.log("s")
        }

    }
</script>

<style scoped>
    .comment {
        width: 100%;
        /*height: 50px;*/
        margin: 5px 0;
        overflow: auto;
    }

    .comment .commentIcon {
        float: left;
        width: 10%;
        /*height: 100px;*/
    }

    .comment .uNameLink {
        float: left;
        height: 20px;
    }

    .comment .uLevel {
        float: left;
        margin: 0 5px;
        height: 20px;
        font-size: 14px;
    }

    .comment .commentText {
        width: 90%;
        float: left;

    }

    .comment .function {
        float: right;
        width: 90%;
        text-align: left;
        height: 40px;
    }

    .comment .function .commentTime {
        float: left;
        height: 40px;
        margin: 0;
        display: block;
        line-height: 40px;
    }

    .comment .commentBtn {
        height: 40px;
        margin: 0 10px;
    }

    .comment .replies {
        float: right;
        width: 90%;
        text-align: left;
    }


</style>