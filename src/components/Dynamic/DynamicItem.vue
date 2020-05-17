<template>
    <div>
        <div class="dynamic">
            <div class="dynamicIcon" v-if="item.dynamic.userPicPath !== undefined">
                <el-avatar v-if="item.dynamic.userPicPath !== undefined" :size="50"
                           :src="item.dynamic.userPicPath ? item.dynamic.userPicPath : staticIcon"/>
            </div>
            <el-link class="uNameLink" :underline="false" :href="'/home/' + item.dynamic.userId">
                {{item.dynamic.userName}}
            </el-link>
            <div class="uLevel">{{'Lv.' + item.dynamic.userLevel}}</div>
            <div class="dynamicText" v-html="item.dynamic.dynamicText">

            </div>
            <div class="function">

                <div style="overflow: auto;">
                    <p class="dynamicTime">{{item.dynamic.dynamicTime}}</p>
                    <el-popconfirm title="确定要删除吗？" @onConfirm="deleteDynamic">
                        <el-button slot="reference" class="dynamicBtn" type="text"
                                   v-if="item.dynamic.userId === $store.getters.uid">删除
                        </el-button>
                    </el-popconfirm>
                    <el-button class="dynamicBtn" v-if="!dynamicReplyActive && $store.getters.uid" type="text"
                               @click="dynamicReplyActive = true">
                        回复
                    </el-button>
                    <!--       回复-->
                    <el-button class="dynamicBtn" v-if="dynamicReplyActive" type="text"
                               @click="dynamicReplyActive = false">
                        取消
                    </el-button>
                </div>

                <Tinymce v-model="content1" :height="50" v-if="dynamicReplyActive" width="95%" :is-send-reply="true"
                         :reply-from="$store.getters.uid" :reply-to="item.dynamic.userId"
                         :dynamic-id="item.dynamic.dynamicId"/>
                <el-divider class="divider"/>
                <div v-if="item.reply.length !== 0" class="replies">
                    <div v-for="(item1, $index) in item.reply" :key="$index" class="reply">

                        <p>
                            <el-link class="userLink" :underline="false" :href="'/home/' + item1.replyFromId">
                                {{item1.replyFromName}}
                            </el-link>
                            回复
                            <el-link class="userLink" :underline="false" :href="'/home/' + item1.replyToId">
                                {{item1.replyToName}}
                            </el-link>
                            :
                        </p>
                        <div v-html="item1.replyText"/>
                        <div class="replyFunc">
                            <p class="replyTime">{{item1.replyTime}}</p>
                            <el-popconfirm title="确定要删除吗？" @onConfirm="handleDeleteReply(item1.replyId)">
                                <el-button slot="reference" class="replyBtn" type="text"
                                           v-if="item1.replyFromId === $store.getters.uid">删除
                                </el-button>
                            </el-popconfirm>
                            <el-button class="replyBtn" v-if="!item1.active && $store.getters.uid" type="text"
                                       @click="item1.active = true">
                                回复
                            </el-button>
                            <el-button class="replyBtn" v-if="item1.active" type="text"
                                       @click="item1.active = false">
                                取消
                            </el-button>
                            <Tinymce v-model="content2[$index]" :height="50" v-if="item1.active" width="95%"
                                     :is-send-reply="true"
                                     :reply-from="$store.getters.uid" :reply-to="item1.replyFromId"
                                     :dynamic-id="item.dynamic.dynamicId"/>

                        </div>

                    </div>
                </div>


            </div>


        </div>
        <!--        <el-divider></el-divider>-->
    </div>
</template>

<script>
    import {delDynamic as delDynamicApi, deleteDynamicReply as deleteDynamicReplyApi} from "@/api/dynamic";
    import {throwError} from "@/utils/error";
    import Tinymce from "@/components/Tinymce/index";

    export default {
        name: "DynamicItem",
        components: {Tinymce},
        data() {
            return {
                dynamicReplyActive: false,
                content1: '',
                content2: [],
                staticIcon: require('../../assets/user.png')

            }
        },
        props: {
            item: Object
        },
        methods: {
            handleDeleteReply(replyId) {
                deleteDynamicReplyApi({replyId: replyId}).then(response => {

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
            deleteDynamic() {
                delDynamicApi({dynamicId: this.item.dynamic.dynamicId}).then(response => {

                    try {

                        if (response.code === 0) {
                            this.$message({
                                type: "success",
                                message: "删除动态成功！"
                            })
                            location.reload(true);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除动态失败！'
                            })
                        }

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            },
            mounted() {

            }
        }
    }
</script>

<style scoped>
    .dynamic {
        width: 100%;
        /*height: 50px;*/
        margin: 20px 0;
        overflow: auto;
    }

    .dynamic .dynamicIcon {
        float: left;
        width: 10%;
        /*height: 100px;*/
    }

    .dynamic .uNameLink {
        float: left;
        height: 20px;
        vertical-align: unset;
    }

    .dynamic .uLevel {
        float: left;
        margin: 0 5px;
        height: 20px;
        font-size: 14px;
    }

    .dynamic .dynamicText {
        width: 90%;
        float: left;

    }

    .function {
        float: right;
        width: 90%;
        text-align: left;
    }

    .function .dynamicTime {
        float: left;
        height: 40px;
        margin: 0;
        display: block;
        line-height: 40px;
    }

    .function .dynamicBtn {
        height: 40px;
        margin-left: 10px;
        overflow: auto;
    }

    .dynamic .replies {
        width: 90%;
        text-align: left;
    }

    .reply {
        margin-left: 20px;
    }

    .replies .reply .replyFunc {
        overflow: auto;
    }

    .replies .reply .replyFunc .replyTime {
        float: left;
    }

    .replies .reply .replyFunc .replyBtn {
        height: 40px;
        margin-left: 10px;
    }

    .replies .reply .userLink {
        vertical-align: unset;
    }


    .divider {
        margin: 5px 0;
    }

</style>