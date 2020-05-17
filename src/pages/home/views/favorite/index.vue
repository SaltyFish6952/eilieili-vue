<template>
    <div>
        <div class="infinite-wrapper">
            <div :v-if="userFavorites.length !== 0"
                 v-for="(item,$index) in userFavorites"
                 :key="$index">
                <div class="video" v-loading="item.loading">
                    <el-image class="image" lazy :src="item.videoPicPath"/>
                    <el-link :href="'/video/' + item.videoId" :underline="false" style="float: left; margin: 0 20px;">

                        <p class="name">{{item.videoName}}</p>
                        <p class="brief">简介：{{item.videoBrief}}</p>
                        <p>分区：{{item.sectorName}}</p>
                    </el-link>

                    <el-popconfirm v-if="$store.getters.uid === $route.params.userId" @onConfirm="handleDelete(item)" title="确定要删除吗？">
                        <el-button slot="reference" class="delete"
                                   size="mini" type="danger">
                            删除
                        </el-button>
                    </el-popconfirm>

                </div>


            </div>

            <div style="overflow: auto;">
                <infinite-loading
                        :force-use-infinite-wrapper="true"
                        @infinite="infiniteHandler"
                />
            </div>
        </div>

    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';

    import {
        getUserFavoriteVideos as getUserFavoriteVideosApi, postUserFavorite as postUserFavoriteApi,
    } from "@/api/video";
    import {throwError} from "@/utils/error";

    export default {
        name: "index",
        components: {InfiniteLoading},
        data() {
            return {
                userFavorites: [],
                clickTime: 0,

                page: 1,
                index: 0,
                sectors: [],
                changeForm: {
                    videoName: '',
                    videoBrief: '',
                    sectorId: '',
                    videoId: ''
                },
                rules: {
                    videoName: [
                        {required: true, message: '请输入视频名称', trigger: 'blur'},
                        {min: 5, message: '长度在5个字符以上', trigger: 'blur'}
                    ],
                    videoBrief: [
                        {required: true, message: '请输入视频简介', trigger: 'blur'},
                        {min: 5, message: '长度在5个字符以上', trigger: 'blur'}
                    ],
                    sectorId: [
                        {required: true, message: '请选择视频所属分区', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            infiniteHandler($state) {
                getUserFavoriteVideosApi({userId: this.$route.params.userId, page: this.page}).then(response => {

                    try {
                        const {videos} = response.data;

                        for (let i = 0; i < videos.length; i++) {
                            videos[i].active = false;
                            videos[i].loading = false;
                        }

                        if (videos.length) {
                            this.page++;
                            this.userFavorites.push(...videos);
                            $state.loaded();
                        } else {
                            $state.complete()
                        }

                    } catch (e) {
                        throwError(e, response, this)
                    }


                })
            },
            handleDelete(item) {

                item.loading = true;

                postUserFavoriteApi({
                    userId: this.$store.getters.uid,
                    videoId: item.videoId,
                    isFavorite: false
                }).then(response => {

                    try {

                        if (response.code === 0) {
                            this.$message.success('收藏删除成功！');

                            setTimeout(function () {
                                location.reload(true)
                            }, 500)

                        } else {
                            throwError("收藏删除失败", response, this);
                        }
                        item.loading = false;

                    } catch (e) {
                        throwError(e, response, null)
                    }


                })

            }
        },
        mounted() {
            this.userId = this.$route.params.userId;
        }
    }
</script>

<style scoped>

    .infinite-wrapper {
        overflow: auto;
    }

    .videos {

    }

    .video {
        position: relative;
        width: 98%;
        height: 108px;
        margin: 10px auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    }

    .video .image {
        width: 192px;
        height: 108px;
        display: block;
        float: left;
    }

    .video .delete {
        position: absolute;
        bottom: 5px;
        right: 20px;
    }


    .video .name, .video .brief {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        -webkit-box-align: start;
        overflow: hidden;
        width: 1000px;
    }


</style>