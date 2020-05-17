<template>

    <div>
        <div class="comment">
            <div class="commentIcon" v-if="comment.userPicPath !== undefined">
                <el-avatar v-if="comment.userPicPath !== undefined" :size="50" :src="comment.userPicPath ? comment.userPicPath : staticIcon"/>
            </div>
            <el-link class="uNameLink" :underline="false" :href="'/home/' + comment.userId">{{comment.userName}}
            </el-link>
            <div class="uLevel">{{'Lv.' + comment.userLevel}}</div>
            <p class="commentText">
                {{comment.commentText}}
            </p>
            <div class="function">

                <div style="overflow: auto;">
                    <p class="commentTime">{{comment.commentTime}}</p>

                    <el-popconfirm title="确定要删除吗？" @onConfirm="deleteComment(comment.commentId)">
                        <el-button slot="reference" class="deleteBtn" type="text"
                                   v-if="comment.userId === $store.getters.uid">删除
                        </el-button>
                    </el-popconfirm>
                    <el-button class="commentBtn" v-if="!active && $store.getters.uid" @click="active = true"
                               type="text">
                        回复
                    </el-button>
                    <el-button class="commentBtn" v-if="active && $store.getters.uid" @click="active = false"
                               type="text">
                        取消
                    </el-button>
                </div>


                <div>
                    <el-input show-word-limit maxlength="150" style="width: 90%;" type="textarea"
                              v-model="content1" v-if="active"/>
                    <el-button style="margin-left: 10px;" type="primary"
                               @click="handleSubmitReply(comment.commentId, null, comment.userId, $store.getters.uid)"
                               v-if="active">发送
                    </el-button>
                </div>

                <el-divider class="divider"/>

                <div v-if="reply.length !== 0" class="replies">


                    <div v-for="(item, $index) in reply" :key="$index" class="reply">

                        <p>
                            <el-link :underline="false" style="vertical-align: unset;"
                                     :href="'/home/' + item.replyFromId">{{item.replyFromName}}
                            </el-link>
                            回复
                            <el-link :underline="false" style="vertical-align: unset;"
                                     :href="'/home/' + item.replyToId">{{item.replyToName}}</el-link> :
                        </p>
                        <div v-html="item.replyText"/>
                        <div class="replyFunc">
                            <p class="replyTime">{{item.replyTime}}</p>
                            <el-popconfirm title="确定要删除吗？" @onConfirm="handleDeleteReply(item.replyId)">
                                <el-button slot="reference" class="replyBtn" type="text"
                                           v-if="item.replyFromId === $store.getters.uid">删除
                                </el-button>
                            </el-popconfirm>
                            <el-button class="replyBtn" v-if="!item.active && $store.getters.uid" type="text"
                                       @click="item.active = true">
                                回复
                            </el-button>
                            <el-button class="replyBtn" v-if="item.active" type="text"
                                       @click="item.active = false">
                                取消
                            </el-button>

                            <div>
                                <el-input show-word-limit maxlength="150" style="width: 80%;" type="textarea"
                                          v-model="content2[$index]" v-if="item.active"/>
                                <el-button style="margin-left: 10px;" type="primary"
                                           @click="handleSubmitReply(comment.commentId, $index, item.replyFromId, $store.getters.uid)"
                                           v-if="item.active">发送
                                </el-button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>


        </div>

    </div>


</template>

<script>


    // import {getReplies as getRepliesApi} from "@/api/video";
    // import {throwError} from "@/utils/error";
    // import ReplyItem from "@/components/Comment/ReplyItem";


    import {
        deleteCommentReply as deleteCommentReplyApi,
        deleteComments as deleteCommentsApi,
        postCommentReply
    } from "@/api/video";
    import {throwError} from "@/utils/error";

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
            },
            reply: Array
        },
        data() {
            return {
                active: false,
                content1: '',
                content2: [],
                staticIcon: require('../../assets/user.png')
            }
        },
        methods: {

            handleDeleteReply(replyId) {

                deleteCommentReplyApi({replyId: replyId}).then(response => {

                    try {

                        if (response.code === 0) {

                            this.$message.success('回复删除成功！')
                            setTimeout(function () {
                                location.reload()
                            }, 500)
                        } else {
                            throwError("回复删除失败", response, this)
                        }

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })


            },
            handleSubmitReply(commentId, index, replyTo, replyFrom) {

                let replyText = null

                if (index === null) {
                    replyText = this.content1
                } else {
                    replyText = this.content2[index]
                }

                if (replyText !== null) {

                    if (replyText.length >= 5) {
                        postCommentReply({
                            commentId: commentId,
                            replyText: replyText,
                            replyFrom: replyFrom,
                            replyTo: replyTo
                        }).then(response => {

                            try {

                                if (response.code === 0) {

                                    this.$message.success('回复发送成功！')
                                    setTimeout(function () {
                                        location.reload()
                                    }, 500)
                                } else {
                                    throwError("回复发送失败", response, this)
                                }
                            } catch (e) {
                                throwError(e, response, this)
                            }
                        })
                    } else {
                        this.$message.error("请输入回复大于五个字符的内容！")
                    }


                } else {
                    this.$message.error("请输入回复内容！")
                }

            },


            deleteComment(commentId) {
                deleteCommentsApi({commentId: commentId}).then(response => {

                    try {

                        if (response.code === 0) {

                            this.$message.success('评论删除成功！')
                            setTimeout(function () {
                                location.reload()
                            }, 500)
                        } else {
                            throwError("评论失败", response, this)
                        }

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            }


        },
        mounted() {

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
    }

    .comment .function .commentTime {
        float: left;
        height: 40px;
        margin: 0;
        display: block;
        line-height: 40px;
    }

    .comment .commentBtn, .comment .deleteBtn {

        margin-left: 10px;
        line-height: 38px;
        padding: 0;

    }


    .comment .replies {
        width: 90%;
        text-align: left;
    }

    .reply {
        margin-left: 20px;
    }

    .replies .reply .replyFunc{
        overflow: auto;
    }

    .replies .reply .replyFunc .replyTime {
        float: left;
    }

    .replies .reply .replyFunc .replyBtn {
        height: 40px;
        margin-left: 10px;
    }

    .divider {
        margin: 5px 0;
    }


</style>