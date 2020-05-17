<template>
    <div>

        <el-dialog title="注册" :visible.sync="dialogVisible" center @close="close">
            <div>
                <div class="register_div">

                    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm"
                             class="demo-ruleForm">

                        <el-form-item prop="userAccount">

                            <el-input placeholder="你的账号" type="text"
                                      v-model="registerForm.userAccount"></el-input>

                        </el-form-item>

                        <el-form-item prop="userName">

                            <el-input placeholder="你的用户名" type="text"
                                      v-model="registerForm.userName">
                            </el-input>


                        </el-form-item>


                        <el-form-item prop="password">

                            <el-input id="passwd_input"
                                      placeholder="密码"
                                      type="password"
                                      :clearable="true"
                                      v-model="registerForm.password">

                            </el-input>
                        </el-form-item>
                        <!--                    <el-form-item prop="age">-->
                        <!--                        <el-input placeholder="请输入内容" v-model.number="ruleForm.age"></el-input>-->
                        <!--                    </el-form-item>-->
                        <!--                <el-form-item>-->
                        <!--                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>-->
                        <!--                </el-form-item>-->
                    </el-form>

                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                已有账号？<el-button @click="openLoginDialog">登 录</el-button>

                <el-button type="primary" @click="submitForm">注 册</el-button>
        </span>
        </el-dialog>
    </div>


</template>

<script>
    import {
        checkNewUserAccount as checkNewUserAccountApi,
        checkUserNameValid as checkUserNameValidApi, insertUser as insertUserApi
    } from "@/api/user";
    import {throwError} from "@/utils/error";
    import {Encrypt} from "@/utils/crypto";

    export default {
        name: "RegisterDialog",
        components: {},
        props: {
            dialogFormVisible: Boolean
        },
        data() {

            // var validatePass2 = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请再次输入密码'));
            //     } else if (value !== this.ruleForm.pass) {
            //         callback(new Error('两次输入密码不一致!'));
            //     } else {
            //         callback();
            //     }
            // };
            return {
                dialogVisible: false,

                registerForm: {
                    userAccount: '',
                    password: '',
                    userName: ''
                },
                rules: {
                    userAccount: [
                        {validator: this.checkUserAccount, trigger: 'change', required: true}
                    ],
                    userName: [
                        {validator: this.checkUserName, trigger: 'change', required: true}
                    ],
                    password: [
                        {validator: this.checkPassword, trigger: 'change', required: true}
                    ]
                    // age: [
                    //     {validator: checkAge, trigger: 'blur'}
                    // ]
                }
            };
        },
        methods: {

            submitForm() {

                this.$refs['registerForm'].validate((valid) => {

                    if (valid) {
                        insertUserApi({
                            userName: this.registerForm.userName,
                            userAccount: this.registerForm.userAccount,
                            userPassword: Encrypt(this.registerForm.password)
                        }).then(response => {

                            try {

                                if (response.code !== 0) {
                                    throwError(null, response, this)
                                } else {
                                    this.$message({
                                        type: 'success',
                                        message: "注册成功！"
                                    })
                                    // setTimeout(function () {
                                    //     location.reload();
                                    // }, 500)

                                    this.dialogVisible = false;
                                    this.resetForm();

                                }

                            } catch (e) {
                                throwError(e, response, this)
                            }

                        })
                    }

                })


            },

            close() {
                this.$emit('closeDialog');
                this.resetForm();
            },
            openLoginDialog() {
                this.dialogVisible = false;
                this.$emit('switchToLogin');
            },
            checkPassword(rule, value, callback) {
                if (value === '') {
                    // this.isNewValid = false;
                    callback(new Error('请输入密码'));
                } else {

                    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;

                    if (reg.test(value)) {
                        // this.isNewValid = true;

                        callback();
                    } else {
                        // this.isNewValid = false;
                        callback(new Error('密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字!'));
                    }

                }
            },
            checkUserName(rule, value, callback) {
                if (value === "") {
                    return callback(new Error('用户名不能为空'));
                } else if (value.length < 3 || value.length > 15) {
                    return callback(new Error('请输入3-15个字符的姓名！'))
                } else {

                    checkUserNameValidApi({checkName: value}).then(response => {

                        try {
                            const {isValid} = response.data
                            if (!isValid) {

                                callback(new Error('该用户名已被使用！'))
                            } else {
                                callback()
                            }
                        } catch (e) {
                            throwError(e, response, this)
                        }
                    })
                }
            },
            checkUserAccount(rule, value, callback) {

                if (value === "") {
                    return callback(new Error('账号不能为空'));
                } else if (value.length < 5 || value.length > 20) {
                    return callback(new Error('请输入5-20个字符的账号！'))
                } else {
                    checkNewUserAccountApi({userAccount: value}).then(response => {
                        try {
                            const {isValid} = response.data
                            if (!isValid) {
                                callback(new Error('该账号已被使用！'))
                            } else
                                callback()
                        } catch (e) {
                            throwError(e, response, this)
                        }
                    })
                }

            },
            resetForm() {
                this.$refs['registerForm'].resetFields();
            }


        },
        watch: {
            dialogFormVisible: function (NEW) {
                this.dialogVisible = NEW;
            }
        },


    }
</script>

<style scoped>
    .register_div {
        width: 250px;

        /*height: 70%;*/
        align-items: center;
        margin: 0 auto;
        display: flex;
        justify-content: center;

    }
</style>