<template>
    <div>
        <div class="infinite-wrapper">
            <div :v-if="userVideos.length !== 0"
                 v-for="(item,$index) in userVideos"
                 :key="$index">
                <div class="video" v-loading="item.loading">
                    <el-image class="image" lazy :src="item.videoPicPath"/>
                    <el-link :href="'/video/' + item.videoId" :underline="false" style="float: left; margin: 0 20px;">

                        <p class="name">{{item.videoName}}</p>
                        <p class="brief">简介：{{item.videoBrief}}</p>
                        <p>分区：{{item.sectorName}}</p>
                    </el-link>

                    <el-popconfirm v-if="$store.getters.uid === $route.params.userId" @onConfirm="handleDelete(item)"
                                   title="确定要删除吗？">
                        <el-button slot="reference" class="delete"
                                   size="mini" type="danger">
                            删除
                        </el-button>
                    </el-popconfirm>

                    <el-button v-if="$store.getters.uid === $route.params.userId" @click="handleClickChange(item)"
                               class="change" size="mini" type="warning">修改
                    </el-button>

                    <el-dialog
                            title="修改视频"
                            :visible.sync="item.active"
                            width="30%"
                            center>

                        <el-form
                                :model="changeForm"
                                ref="form"
                                :rules="rules">

                            <el-form-item label="视频名称" prop="videoName">
                                <el-input type="text" maxlength="20" show-word-limit v-model="changeForm.videoName">

                                </el-input>
                            </el-form-item>


                            <el-form-item label="视频简介" prop="videoBrief">
                                <el-input type="textarea" maxlength="200" show-word-limit
                                          v-model="changeForm.videoBrief">

                                </el-input>
                            </el-form-item>


                            <el-form-item label="所属专区" prop="sectorId">

                                <el-select v-model="changeForm.sectorId" placeholder="请选择">
                                    <el-option
                                            v-for="item in sectors"
                                            :key="item.sectorId"
                                            :label="item.sectorName"
                                            :value="item.sectorId">
                                    </el-option>
                                </el-select>

                            </el-form-item>
                        </el-form>


                        <span slot="footer" class="dialog-footer">
                                <el-button @click="handleCloseDialog(item)">取 消</el-button>
                                <el-button type="primary"
                                           @click="handleSubmitChange">确 定</el-button>
                            </span>
                    </el-dialog>

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

    import {getUserVideos as getUserVideosApi, removeVideo, updateVideo as updateVideoApi} from "@/api/video";
    import {throwError} from "@/utils/error";
    import {getSector as getSectorApi} from "@/api/sector";

    export default {
        name: "index",
        components: {InfiniteLoading},
        data() {
            return {
                userVideos: [],
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
                getUserVideosApi({userId: this.$route.params.userId, page: this.page}).then(response => {

                    try {
                        const {videos} = response.data;

                        for (let i = 0; i < videos.length; i++) {
                            videos[i].active = false;
                            videos[i].loading = false;
                        }

                        if (videos.length) {
                            this.page++;
                            this.userVideos.push(...videos);
                            $state.loaded();
                        } else {
                            $state.complete()
                        }

                    } catch (e) {
                        throwError(e, response, this)
                    }


                })
            }, getSectors() {
                getSectorApi().then(response => {

                    try {

                        const {sectors} = response.data;
                        this.sectors = sectors;

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            }, handleClickChange(item) {


                this.changeForm.sectorId = item.sectorId
                this.changeForm.videoBrief = item.videoBrief
                this.changeForm.videoName = item.videoName
                this.changeForm.videoId = item.videoId
                item.active = true


            }, handleSubmitChange() {


                this.$refs['form'][this.clickTime++].validate((valid) => {

                    if (valid) {

                        updateVideoApi(this.changeForm).then(response => {

                            try {
                                if (response.code === 0) {
                                    this.$message.success('修改成功！');
                                    setTimeout(function () {
                                        location.reload();
                                    }, 500)
                                } else {
                                    this.$message.error("修改失败！")
                                }

                            } catch (e) {
                                throwError(e, response, this)
                            }
                        })

                    }

                })
            },
            handleCloseDialog(item) {

                item.active = false


            },
            handleDelete(item) {

                item.loading = true;

                removeVideo({uuid: item.uuid}).then(response => {


                    try {

                        if (response.code === 0) {
                            this.$message.success('视频删除成功！');

                            setTimeout(function () {
                                location.reload(true)
                            }, 500)

                        } else {
                            throwError("视频删除失败", response, this);
                        }
                        item.loading = false;

                    } catch (e) {
                        throwError(e, response, null)
                    }

                })

            }
        },
        mounted() {
            this.getSectors()
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
        justify-content: left;
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

    .video .change {
        position: absolute;
        bottom: 5px;
        right: 80px;
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