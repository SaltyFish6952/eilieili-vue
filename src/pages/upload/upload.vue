<template>
    <div>
        <HeaderWithFooter>
            <div>
                <h2>上传中心</h2>
                <el-divider/>
            </div>

            <div>
                <h3>我的上传</h3>
                <el-divider/>
            </div>

            <div>
                <div style="margin: 10px 0;" :v-if="userVideos.length !== 0" v-for="(item,$index) in userVideos"
                     :key="$index">
                    <el-image class="image" lazy :src="item.videoPicPath"/>
                </div>
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
                        :data="{uuid:uploadForm.uuid}"
                        :before-upload="handleUploadVideo"
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
                                :data="{uuid:uploadForm.uuid}"
                                :before-upload="handleUploadPicAndInfo">

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
                        <el-button style="float: right;" type="primary" @click="submit">上传</el-button>

                    </el-form-item>

                </el-form>

            </div>
        </HeaderWithFooter>

    </div>
</template>

<script>
    import HeaderWithFooter from "@/components/Container/HeaderWithFooter";
    import {getSector as getSectorApi} from "@/api/sector";
    import {throwError} from "@/utils/error";
    import {generateUUID} from "@/utils/uuid";
    import {getUserVideos as getUserVideosApi, postVideoInfo} from "@/api/video";

    export default {
        name: "upload",
        components: {HeaderWithFooter},
        data() {
            return {
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
                }
            }
        },
        methods: {
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
                getUserVideosApi({userId: this.$store.getters.uid}).then(response => {

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
    }


</style>