<template>

    <div>
        <div class="comment">
            <div class="commentIcon" v-if="user.userPicPath !== undefined">
                <el-avatar :size="50" :src="user.userPicPath"/>
            </div>
            <el-link class="uName_link" :underline="false" href="">{{user.userName ? user.userName : 'xxx'}}</el-link>
            <div class="uLevel">{{'Lv.' + user.userLevel}}</div>
            <p class="commentText">
                {{comment.commentText ? comment.commentText : 'xxxxxxxxxxxxxxxxx'}}
            </p>
        </div>

    </div>



</template>

<script>


    import {getUserInfo as getUserInfoApi} from "@/api/user";

    export default {
        name: "CommentItem",
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
                }
            }
        },
        methods: {
            getUserInfo() {
                getUserInfoApi({userId: this.comment.userId}).then(response => {
                    const {user} = response.data;
                    this.user = user;
                })
            }
        },
        mounted() {
            this.getUserInfo();
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

    .comment .uName_link {
        float: left;
        height: 20px;
    }

    .comment .uLevel{
        float: left;
        margin: 0 5px;
        height: 20px;
        font-size: 14px;
    }

    .comment .commentText{
        width: 90%;
        float: left;
        font-size: 14px;
    }

</style>