<template>
    <div>
        <h1>视频管理</h1>
        <el-divider/>
        <el-input class="search" placeholder="请输入内容" v-model="search" clearable>
            <template slot="prepend">筛选</template>
        </el-input>

        <el-table
                v-loading="loading"
                :data="tables"
                tooltip-effect="dark"
                style="width: 100%"
                header-align="center">
            <el-table-column width="50" header-align="center" align="center">
                <template slot-scope="{row,$index}">
                    <span>{{$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="视频id" min-width="50" header-align="center" align="center">

                <template slot-scope="{row}">
                    <span v-html="searchValue(row.videoId)"></span>
                </template>

            </el-table-column>
            <el-table-column label="视频名称" min-width="50" header-align="center" align="center">
                <template slot-scope="{row}">
                    <span v-html="searchValue(row.videoName)"></span>
                </template>
            </el-table-column>
            <el-table-column label="视频简介" width="450" header-align="center" align="center">
                <template slot-scope="{row}">
                    <span v-html="searchValue(row.videoBrief)"></span>
                </template>
            </el-table-column>
            <el-table-column label="所属分区" min-width="30" header-align="center" align="center">
                <template slot-scope="{row}">

                    <!--                    <input   v-model="row.sectorId">-->
                    <span v-html="searchValue(sectors.find(
                        function(item) {
                            return item.sectorId === row.sectorId
                            }).sectorName)"></span>
                </template>
            </el-table-column>

            <el-table-column label="视频状态" prop="Name" min-width="20" header-align="center" align="center">
                <template slot-scope="{row}">

                    <span v-html="searchValue(row.status)"></span>
                </template>
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="40"
                    header-align="center"
                    align="center">
                <template slot-scope="{row,$index}">


                    <el-button v-if="row.status === 1" type="text" size="small"
                               @click.native="handleClickCheck(row)">
                        审核
                    </el-button>


                    <el-button type="text" size="small" @click.native="handleEdit($index, row)">
                        编辑
                    </el-button>
                    <el-popconfirm style="margin-left: 10px;"
                                   @onConfirm="handleDelete($index, row)" title="确定要删除吗？">
                        <el-button slot="reference" type="text" size="small">删除
                        </el-button>
                    </el-popconfirm>


                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                @close="handleClosing"
                title="审核视频"
                :visible.sync="checkActive"
                width="40%"
                center>

            <VideoPlayer
                    v-if="checkVideo.videoId !== undefined"
                    :video-id="checkVideo.videoId"
                    :video-max-quality="checkVideo.maxQuality"
                    :video-path="checkVideo.videoPath"/>

            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="handleCheckVideo(checkVideo,true)">审核通过</el-button>
                                <el-button type="primary"
                                           @click="handleCheckVideo(checkVideo,false)">审核不通过</el-button>
                                <el-button @click="checkActive = false">取消</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="修改视频"
                :visible.sync="editActive"
                @close="handleClosing"
                width="50%"
                center>

            <el-form
                    :model="editVideo"
                    ref="form"
                    :rules="rules">

                <el-form-item label="视频名称" prop="videoName">
                    <el-input type="text" maxlength="20" show-word-limit v-model="editVideo.videoName">

                    </el-input>
                </el-form-item>


                <el-form-item label="视频简介" prop="videoBrief">
                    <el-input class="brief" type="textarea" maxlength="200" show-word-limit
                              v-model="editVideo.videoBrief">

                    </el-input>
                </el-form-item>


                <el-form-item label="所属专区" prop="sectorId">

                    <el-select v-model="editVideo.sectorId" placeholder="请选择">
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
                                <el-button @click="editActive = false">取 消</el-button>
                                <el-button type="primary"
                                           @click="handleEditSubmit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {
        getVideoInfo as getVideosApi, removeVideo,
        updateVideo as updateVideoApi,
        updateVideoStatus as updateVideoStatusApi
    } from "@/api/video";
    import {throwError} from "@/utils/error";
    import VideoPlayer from "@/components/VideoPlayer";
    import {getSector as getSectorApi} from "@/api/sector";

    export default {
        name: "index",
        components: {VideoPlayer},
        data() {
            return {
                tableData: [],

                loading: true,
                search: '',
                checkVideo: {},
                editVideo: {},
                checkActive: false,
                editActive: false,
                sectors: [],
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
        computed: {
            tables: function () {
                const search = this.search
                if (search) {
                    return this.tableData.filter(dataNews => {
                        return Object.keys(dataNews).some(key => {
                            if (key === 'videoName' || key === 'videoId' || key === 'videoBrief')
                                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.tableData
            }

        },
        methods: {

            handleEditSubmit() {

                this.$refs['form'].validate((valid) => {

                    if (valid) {

                        updateVideoApi({
                            videoName: this.editVideo.videoName,
                            videoBrief: this.editVideo.videoBrief,
                            sectorId: this.editVideo.sectorId,
                            videoId: this.editVideo.videoId
                        }).then(response => {

                            try {
                                if (response.code === 0) {
                                    this.$message.success('修改成功！');
                                    setTimeout(function () {
                                        location.reload();
                                    }, 500)
                                } else {
                                    this.$message.error("修改失败！")
                                }

                                this.editActive = false

                            } catch (e) {
                                throwError(e, response, this)
                            }
                        })

                    }

                })

            },

            handleClosing() {
                this.checkVideo = {};
                this.editVideo = {};
            },
            handleClickCheck(row) {
                this.checkVideo = row
                this.checkActive = true
            },
            // eslint-disable-next-line no-unused-vars
            handleCheckVideo(row, isPass) {

                let status = -2;
                if (isPass)
                    status = 0;

                updateVideoStatusApi({status: status, uuid: row.uuid}).then(response => {

                    try {

                        if (response.code === 0) {
                            this.$message.success('审核操作成功')
                            row.status = status
                        } else {
                            throwError('审核操作不成功', response, this)
                        }

                        this.checkActive = false

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })

            },

            // eslint-disable-next-line no-unused-vars
            handleEdit(index, row) {

                this.editVideo = JSON.parse(JSON.stringify(row))
                this.editActive = true

            },


            //点击删除
            // eslint-disable-next-line no-unused-vars
            handleDelete($index, row) {

                this.loading = true

                removeVideo({uuid: row.uuid}).then(response => {


                    try {

                        if (response.code === 0) {
                            this.$message.success('视频删除成功！');

                            setTimeout(function () {
                                location.reload(true)
                            }, 500)

                        } else {
                            throwError("视频删除失败", response, this);
                        }


                    } catch (e) {
                        throwError(e, response, null)
                    }

                    this.loading = false

                })

            },
            searchValue(val) {
                val = val + '';
                if (val.indexOf(this.search) !== -1 && this.search !== '') {
                    return val.replace(this.search, '<font color="#409EFF"><b>' + this.search + '</b></font>')
                } else {
                    return val
                }
            },
            getVideos() {
                getVideosApi().then(response => {
                    try {
                        const {videos} = response.data;


                        this.tableData = videos
                        this.loading = false

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
            }
        },
        // getSectorName(id) {
        //     // for (let i = 0; i < this.sectors.length; i++)
        //     // {
        //     //     if (item.sectorId === id)
        //     //         return item.sectorName
        //     // }
        // }
        // ,
        created() {
            this.getVideos()
            this.getSectors()
        }
    }
</script>

<style scoped>
    .search {
        margin: 5px 20px;
        float: right;
        width: 300px;
    }

    .edit-cell {
        width: 90%;
    }

    .brief .el-input__count {
        right: 25px;
        bottom: 2px;
    }

</style>