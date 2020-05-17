<template>
    <el-dialog title="登录" :visible.sync="dialogVisible" center @close="close">
        <div>
            <div class="login_div">

                <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm"
                         class="demo-ruleForm">

                    <el-form-item prop="userAccount">
                        <el-input placeholder="你的账号" type="text"
                                  v-model="loginForm.userAccount"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input id="passwd_input" placeholder="密码" type="password" :clearable="true"
                                  v-model="loginForm.password" @keyup.enter.native="submitForm"></el-input>
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
            <el-button class="foot_btn" @click="openRegisterDialog">注 册</el-button>
            <el-button class="foot_btn"  type="primary" @click="submitForm">登 录</el-button>
        </span>
    </el-dialog>


</template>

<script>


    export default {
        name: "LoginDialog",
        components: {},
        props: {
            dialogFormVisible: Boolean
        },
        data() {
            var checkUserAccount = (rule, value, callback) => {
                if (value === "") {
                    return callback(new Error('用户名不能为空'));
                }
                callback()

            };
            var checkPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }

                callback()
            };

            return {
                dialogVisible: false,
                loginForm: {
                    userAccount: '',
                    password: ''
                    // age: ''
                },
                rules: {
                    userAccount: [
                        {validator: checkUserAccount, trigger: 'blur', message: "请输入账号", required: true}
                    ],
                    password: [
                        {validator: checkPassword, trigger: 'blur', message: "请输入密码", required: true}
                    ]
                    // age: [
                    //     {validator: checkAge, trigger: 'blur'}
                    // ]
                }
            };
        },
        methods: {
            // submitForm(formName) {
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert('submit!');
            //     } else {
            //         window.console.log('error submit!!');
            //         return false;
            //     }
            // });
            submitForm() {

                this.$refs['loginForm'].validate((valid) => {

                    if (valid) {

                        this.$store.dispatch("user/login", this.loginForm).then((msg) => {
                            // this.close();
                            if (msg === 0) {
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                setTimeout(function () {
                                    location.reload();
                                }, 500)

                                this.dialogVisible = false;
                            } else {
                                this.$message.error('用户名或密码错误');
                            }


                        })

                    }

                })


            }
            ,
            // resetForm() {
            //     this.$refs['loginForm'].fields[1].resetField()
            //     // // this.$refs.resetFields();
            //     // this.loginForm.password = "";
            //     // document.getElementById("passwd_input").value = "";
            //     // this.$refs['password_input'].resetFields();
            // }
            // ,
            close() {
                window.console.log("closing");
                this.$emit('closeDialog');
            },
            openRegisterDialog() {
                this.dialogVisible = false;
                this.$emit('switchToRegister');
            }


        },
        watch: {
            dialogFormVisible: function (NEW) {
                this.dialogVisible = NEW;
            }
        },

        // resetForm(formName) {
        //     this.$refs[password_input].resetFields();
        // }

    }
</script>

<style scoped>

    .login_div {
        width: 250px;

        /*height: 70%;*/
        align-items: center;
        margin: 0 auto;
        display: flex;
        justify-content: center;

    }

    .foot_btn {
        margin: 0 20px;
    }

</style>