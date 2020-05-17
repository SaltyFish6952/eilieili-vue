<template>
    <div>
        <HeaderWithFooter>
            <div>
                <h2>上传中心</h2>
                <el-divider/>
            </div>


            <div style="width: 100%;">
                <h3>新的上传</h3>
                <el-divider/>
            </div>
            <div class="upload">
                <el-upload
                        ref="upload_video"
                        class="upload-demo"
                        drag
                        name="videoFile"
                        action="/api/upload/video"
                        :multiple="false"
                        :limit="1"
                        :headers="headers"
                        :data="{uuid:uploadForm.uuid}"
                        :before-upload="handleUploadVideo"
                        :on-success="handleVSuccess"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传mov/flv/mp4/avi视频文件，建议最大分辨率为1080p，且不超过5GB</div>
                </el-upload>


                <el-form class="upload_form"
                         :model="uploadForm"
                         ref="form"
                         :rules="rules">


                    <el-form-item label="视频封面">

                        <el-upload
                                class=""
                                ref="upload_pic"
                                action="/api/upload/video/pic"
                                :multiple="false"
                                name="videoPic"
                                :limit="1"
                                :headers="headers"
                                :data="{uuid:uploadForm.uuid}"
                                :before-upload="handleUploadPicAndInfo"
                                :on-success="handleVPSuccess">

                            <el-button slot="trigger" style="margin-left: 200px;" size="small" type="primary">选取文件
                            </el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb
                            </div>

                        </el-upload>

                    </el-form-item>

                    <el-form-item label="视频名称" prop="videoName">
                        <el-input type="text" maxlength="20" show-word-limit v-model="uploadForm.videoName">

                        </el-input>
                    </el-form-item>


                    <el-form-item label="视频简介" prop="videoBrief">
                        <el-input type="textarea" maxlength="200" show-word-limit v-model="uploadForm.videoBrief">

                        </el-input>
                    </el-form-item>


                    <el-form-item label="所属专区" prop="sectorId">

                        <el-select v-model="uploadForm.sectorId" placeholder="请选择">
                            <el-option
                                    v-for="item in sectors"
                                    :key="item.sectorId"
                                    :label="item.sectorName"
                                    :value="item.sectorId">
                            </el-option>
                        </el-select>

                    </el-form-item>

                    <el-form-item>
                        <el-button :disabled="!(isUploadVideo && isUploadVideoPic)" style="float: right;" type="primary"
                                   @click="submit">上传
                        </el-button>

                    </el-form-item>

                </el-form>

            </div>


            <div>
                <h3>我的上传</h3>
                <el-divider/>
            </div>

            <div>
                <div class="videos" :v-if="userVideos.length !== 0"
                     v-for="(item,$index) in userVideos"
                     :key="$index">

                    <el-image class="image" lazy :src="item.videoPicPath"/>
                    <div style="float: left; margin: 0 20px;">
                        <p>{{item.videoName}}</p>
                        <p v-if="item.status === 0">最大分辨率：{{item.maxQuality}}</p>
                    </div>


                    <div class="status">转码状态：
                        <el-tag v-if="item.status === 0" type="success" effect="dark">
                            {{status[item.status]}}
                        </el-tag>
                        <el-tag v-else-if="item.status === -1" type="danger" effect="dark">
                            转码出错
                        </el-tag>
                        <el-tag v-else-if="item.status === -2" type="danger" effect="dark">
                            审核不通过
                        </el-tag>
                        <el-tag v-else effect="dark">
                            {{status[item.status]}}<i class="el-icon-loading"></i>
                        </el-tag>
                    </div>

                    <el-popconfirm @onConfirm="handleDelete(item.uuid)" title="确定要删除吗？">
                        <el-button slot="reference" v-if="item.status === 0 || item.status === -1|| item.status === -2"
                                   class="delete"
                                   size="mini" type="danger">
                            删除
                        </el-button>
                    </el-popconfirm>


                </div>
            </div>


        </HeaderWithFooter>

    </div>
</template>

<script>
    import HeaderWithFooter from "@/components/Container/HeaderWithFooter";
    import {getSector as getSectorApi} from "@/api/sector";
    import {throwError} from "@/utils/error";
    import {generateUUID} from "@/utils/uuid";
    import {getToken} from "@/utils/auth";
    import {getVideoStatus as getVideoStatusApi, postVideoInfo, removeVideo} from "@/api/video";

    export default {
        name: "upload",
        components: {HeaderWithFooter},
        data() {
            return {
                status: ['审核通过', '待审核', '音频转码中', '360p转码中', '720p转码中', '1080p转码中', '转码准备中'],
                headers: {Authorization: 'Bearer ' + getToken()},
                sectors: [],
                userVideos: [],
                selectedSector: '',
                uploadForm: {
                    videoName: '',
                    videoBrief: '',
                    sectorId: '',
                    userId: this.$store.getters.uid,
                    uuid: generateUUID()
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
                },
                isUploadVideo: false,
                isUploadVideoPic: false
            }
        },
        methods: {
            handleVSuccess() {
                this.isUploadVideo = true
            },
            handleVPSuccess() {
                this.isUploadVideoPic = true
            },
            getSectors() {
                getSectorApi().then(response => {

                    try {

                        const {sectors} = response.data;
                        this.sectors = sectors;

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            },
            getUserVideos() {
                getVideoStatusApi({userId: this.$store.getters.uid}).then(response => {

                    try {

                        const {videos} = response.data
                        this.userVideos = videos

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            },
            submit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {

                        postVideoInfo(this.uploadForm).then(response => {

                            try {

                                if (response.code === 0) {
                                    this.$message({
                                        message: '上传视频成功',
                                        type: 'success'
                                    })

                                    location.reload()

                                } else {
                                    this.$message.error('上传视频失败');
                                    throwError(null, response, this)
                                }

                            } catch (e) {
                                throwError(e, response, this)
                            }

                        })


                    } else {

                        return false;
                    }
                });
            },

            handleUploadVideo(file) {

                const suffix = file.name.substring(file.name.lastIndexOf('.') + 1);
                const isMP4 = file.type === 'video/mp4';
                const isMOV = file.type === 'video/quicktime';
                const isFLV = (file.type === 'video/x-flv' || suffix === "flv");
                const isAVI = file.type === 'video/avi';
                const isLt2M = file.size / 1024 / 1024 / 1024 < 5;

                if (!isMOV && !isMP4 && !isFLV && !isAVI) {
                    this.$message.error('上传视频只能是 MOV / AVI / MP4 / FLV 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传视频大小不能超过 5GB!');
                }
                return (isAVI || isFLV || isMP4 || isMOV) && isLt2M;

            },
            handleUploadPicAndInfo(file) {

                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (isJPG || isPNG) && isLt2M;
            },

            handleDelete(uuid) {

                removeVideo({uuid: uuid}).then(response => {

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

                })

            }

        },
        mounted() {
            this.getUserVideos()
            this.getSectors()

        }
    }
</script>

<style scoped>
    .upload {
        width: 800px;
        margin: 0 auto;
    }

    .upload .upload-demo {
        margin: 0 220px;
    }

    .upload .el-upload__tip {
        text-align: center;
    }

    .upload .upload_form {
        margin: 20px 100px;
    }

    .upload_form .el-select {
        margin-left: 50px;
    }

    .upload_form .el-upload__tip {
        /*float: left;*/
        margin: 0;
    }

    .image {
        width: 192px;
        height: 108px;
        display: block;
        float: left;
    }

    .videos {
        position: relative;
        margin: 10px 0;
        width: 100%;
        float: left;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    }

    .videos .status {
        position: absolute;
        line-height: 108px;
        right: 20px;
    }

    .videos .delete {
        position: absolute;
        right: 20px;
        bottom: 5px;
    }


</style>