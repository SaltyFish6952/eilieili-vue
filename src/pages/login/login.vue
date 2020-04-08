<template>
    <div style="width: 100%;height: 100%;">
        <HeaderWithFooter style="height: 100%;width: 100%;">

            <div class="login_div">

                <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm"
                         class="demo-ruleForm">
                    <h2>登录</h2>
                    <el-form-item prop="userAccount">
                        <el-input placeholder="你的账号" type="text" @change="resetForm"
                                  v-model="loginForm.userAccount"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input id="passwd_input" placeholder="密码" type="password" :clearable="true"
                                  v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <!--                    <el-form-item prop="age">-->
                    <!--                        <el-input placeholder="请输入内容" v-model.number="ruleForm.age"></el-input>-->
                    <!--                    </el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </HeaderWithFooter>
    </div>

</template>

<script>

    import HeaderWithFooter from "@/components/Container/HeaderWithFooter";

    export default {
        name: "login",
        components: {
            HeaderWithFooter
        },
        data() {
            var checkUserAccount = (rule, value, callback) => {
                if (value === "") {
                    return callback(new Error('用户名不能为空'));
                }
                callback()
                // setTimeout(() => {
                //     if (!Number.isInteger(value)) {
                //         callback(new Error('请输入数字值'));
                //     } else {
                //         if (value < 18) {
                //             callback(new Error('必须年满18岁'));
                //         } else {
                //             callback();
                //         }
                //     }
                // }, 1000);

            };
            var checkPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                // else {
                //     if (this.ruleForm.checkPass !== '') {
                //         this.$refs.ruleForm.validateField('checkPass');
                //     }
                //     callback();
                // }
                callback()
            };
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
                this.$store.dispatch("user/login", this.loginForm).then(() => {

                    alert('submit!AAA');
                })

            },
            resetForm() {
                this.$refs['loginForm'].fields[1].resetField()
                // // this.$refs.resetFields();
                // this.loginForm.password = "";
                // document.getElementById("passwd_input").value = "";
                // this.$refs['password_input'].resetFields();
            }


        }
        // resetForm(formName) {
        //     this.$refs[password_input].resetFields();
        // }

    }
</script>

<style scoped>

    .login_div {
        width: 800px;
        height: 70%;
        align-items: center;
        margin: 0 auto;
        display: flex;
        justify-content: center;

    }

</style>