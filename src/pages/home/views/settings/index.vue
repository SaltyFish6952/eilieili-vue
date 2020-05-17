<template>
    <div>
        <div>
            <h2>设置头像</h2>
            <el-divider/>

            <div style="margin: 0 auto; width: 440px; height: 210px;">

                <el-upload
                        class="avatar-uploader"
                        action="/api/upload/user/pic"
                        :headers="headers"
                        :show-file-list="false"
                        :data="{userId: $store.getters.uid}"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <!--                    <div v-if="imageUrl">-->
                    <!--                        <img :src="imageUrl" class="avatar">-->
                    <!--                        &lt;!&ndash;                        <img :src="this.$store.getters.avatar" class="avatar">&ndash;&gt;-->
                    <!--                    </div>-->

                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <!--                            <el-divider style="float: left;" direction="vertical"/>-->


                <!--                    <img :src="imageUrl" class="avatar">-->
                <img v-if="this.$store.getters.avatar" :src="this.$store.getters.avatar" class="avatar-uploader">


            </div>
            <p style="text-align: center;">请选择图片上传：大小180 * 180像素支持JPG、PNG格式，图片需小于2M</p>

        </div>
        <div>
            <h2>设置个人信息</h2>
            <el-divider/>

            <div class="edit">
                <div class="editBox">
                    <h4>修改用户名</h4>
                    <el-input
                            clearable
                            class="input"
                            v-model="newName"
                            maxlength="15"
                            show-word-limit>
                        <template slot="prepend">用户名</template>
                    </el-input>
                    <p style="text-align: center; height: 20px;">{{nameMention}}</p>
                    <el-popconfirm
                            confirmButtonText='确定'
                            cancelButtonText='取消'
                            icon="el-icon-info"
                            iconColor="red"
                            title="确定要修改吗？"
                            @onConfirm="updateUserName">
                        <el-button :disabled="isDisableReNameBtn" slot="reference" type="warning" class="editBtn">修改
                        </el-button>

                    </el-popconfirm>
                </div>
                <div class="editBox">
                    <h4>修改密码</h4>

                    <el-form :model="updatePasswdForm" status-icon :rules="passwdRules" ref="form"
                             class="demo-ruleForm">

                        <el-form-item prop="oldPasswd">
                            <el-input
                                    class="input"
                                    clearable
                                    type="password"
                                    v-model="updatePasswdForm.oldPasswd"
                                    maxlength="20"
                                    autocomplete="off"
                                    show-word-limit>
                                <template slot="prepend">旧密码</template>
                            </el-input>
                        </el-form-item>


                        <el-form-item prop="newPasswd">
                            <el-input
                                    class="input"
                                    clearable
                                    type="password"
                                    v-model="updatePasswdForm.newPasswd"
                                    maxlength="20"
                                    autocomplete="off"
                                    show-word-limit>
                                <template slot="prepend">新密码</template>
                            </el-input>
                        </el-form-item>


                        <el-form-item prop="renewPasswd">
                            <el-input
                                    class="input"
                                    clearable
                                    type="password"
                                    v-model="updatePasswdForm.renewPasswd"
                                    maxlength="20"
                                    autocomplete="off"
                                    show-word-limit>
                                <template slot="prepend">确认密码</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-popconfirm
                                    confirmButtonText='确定'
                                    cancelButtonText='取消'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="确定要修改吗？"
                                    @onConfirm="updateUserPassword">
                                <el-button slot="reference"

                                           type="warning" class="editBtn">修改
                                </el-button>
                            </el-popconfirm>
                        </el-form-item>

                    </el-form>


                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import _ from 'lodash'
    import {
        checkUserNameValid as checkUserNameValidApi,
        checkUserPasswordValid as checkUserPasswordValidApi,
        updateUserName as updateUserNameApi, updateUserPassword
    } from "@/api/user";
    import {throwError} from "@/utils/error";
    import {Encrypt} from "@/utils/crypto";
    import {getToken} from "@/utils/auth";

    export default {
        name: "index",
        data() {


            return {
                imageUrl: '',
                newName: this.$store.getters.name,
                headers: {Authorization: 'Bearer ' + getToken()},
                nameMention: '',
                updatePasswdForm: {
                    oldPasswd: '',
                    newPasswd: '',
                    renewPasswd: ''
                },
                passwdRules: {
                    oldPasswd: [
                        {
                            validator: this.validOld, trigger: 'blur'
                        }
                    ],
                    newPasswd: [
                        {
                            validator: this.validNew, trigger: 'blur'
                        }
                    ],
                    renewPasswd: [
                        {
                            validator: this.validRenew, trigger: 'blur'
                        }
                    ]
                },
                isDisableReNameBtn: true,
                // isNewValid: false,
                // isRenewValid: false
            };
        },
        watch: {
            newName: function () {
                this.nameMention = 'waiting...'
                this.debouncedGetAnswer()
            }
        },
        created() {
            this.debouncedGetAnswer = _.debounce(this.checkUserNameValid, 500)
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$store.dispatch("user/getInfo");
                this.$message({
                    message: '头像修改成功',
                    type: 'success'
                });

                setTimeout(function () {
                    location.reload()
                }, 1000)

            },
            validOld(rule, value, callback) {

                this.old_psd_check = false;

                if (value === '') {
                    callback(new Error('请输入旧密码'));

                } else {

                    checkUserPasswordValidApi({
                        userId: this.$store.getters.uid,
                        checkPassword: Encrypt(this.updatePasswdForm.oldPasswd)
                    }).then(response => {

                        try {
                            const {isValid} = response.data

                            if (!isValid) {
                                // this.isOldValid = false;
                                callback(new Error('旧密码不正确！'));
                            } else {

                                // this.isOldValid = true;
                                callback();

                            }
                        } catch (e) {
                            throwError(e, response, this)
                        }
                    })
                }
            },
            validNew(rule, value, callback) {
                if (value === '') {
                    // this.isNewValid = false;
                    callback(new Error('请输入新密码'));
                } else {
                    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;

                    if (reg.test(value)) {

                        if (value === this.updatePasswdForm.oldPasswd) {
                            callback(new Error('新密码与旧密码一致！'));

                        } else {
                            callback();
                        }

                    } else {
                        callback(new Error('密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字!'));
                    }
                }
            },
            validRenew(rule, value, callback) {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                    // this.isRenewValid = false;
                } else if (value !== this.updatePasswdForm.newPasswd) {
                    callback(new Error('两次输入密码不一致!'));
                    // this.isRenewValid = false;
                } else {
                    // this.isRenewValid = true;

                    callback();
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (isPNG || isJPG) && isLt2M;
            },
            checkUserNameValid() {
                let that = this
                this.nameMention = '查询中...'
                if (this.newName.length < 3 || this.newName.length > 15) {
                    this.nameMention = '请输入3-15个字符的姓名！'
                    this.isDisableReNameBtn = true
                    return
                }
                checkUserNameValidApi({checkName: this.newName, userId: this.$store.getters.uid}).then(response => {
                    try {
                        const {isValid} = response.data
                        if (isValid) {
                            that.nameMention = '该用户名可用！'
                            that.isDisableReNameBtn = false
                        } else {
                            that.nameMention = '该用户名已被使用！'
                            that.isDisableReNameBtn = true
                        }
                    } catch (e) {
                        throwError(e, response, this)
                    }
                })
            },
            updateUserName() {
                updateUserNameApi({userId: this.$store.getters.uid, newName: this.newName}).then(response => {
                    try {
                        if (response.code === 0) {
                            this.$store.dispatch("user/getInfo");
                            this.isDisableReNameBtn = true
                            this.$message({
                                message: '用户名修改成功',
                                type: 'success'
                            })
                            setTimeout(function () {
                                location.reload()
                            }, 1000)

                        } else {
                            this.$message.error('操作错误！ ' + response)
                        }
                    } catch (e) {
                        throwError(e, response, this)
                    }
                })
            },
            updateUserPassword() {

                this.$refs['form'].validate((valid) => {

                    if (valid) {
                        updateUserPassword({
                            userId: this.$store.getters.uid,
                            newPassword: Encrypt(this.updatePasswdForm.newPasswd)
                        }).then(response => {

                            try {
                                if (response.code === 0) {
                                    this.$message({
                                        message: '密码修改成功',
                                        type: 'success'
                                    })

                                    setTimeout(function () {
                                        location.reload()
                                    }, 1000)

                                } else {
                                    this.$message.error('操作错误！ ' + response)
                                }
                            } catch (e) {
                                throwError(e, response, this)
                            }
                        })
                    }
                })
            }
        },
        beforeRouteEnter(to, from, next) {

            next(vm => {
                if (vm.$store.getters.uid !== vm.$route.params.userId) {
                    window.location.href = '/'
                }
            })


        }
    }
</script>

<style>

    .avatar-uploader {
        float: left;
        width: 178px;
        height: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        margin: 20px;
    }

    .avatar-uploader .el-upload {

        /*cursor: pointer;*/
        /*position: relative;*/
        /*overflow: hidden;*/
    }

    .avatar-uploader:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .edit {
        width: 1000px;
        margin: 0 auto;
    }

    .edit .editBox {
        width: 500px;
        float: left;
    }

    .editBox h4 {
        text-align: center;
    }

    .editBox .editBtn {
        margin: 20px 0 20px 330px;
    }


    .edit .input {
        width: 300px;
        margin-left: 100px;
        margin-top: 20px;
    }

    .edit .el-form-item__error {
        margin-left: 100px;
    }


</style>