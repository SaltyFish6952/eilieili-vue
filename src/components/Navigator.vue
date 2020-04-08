<template>
    <el-row>
        <el-col :span="8">
            <el-menu class="grid-content " mode="horizontal">
                <el-menu-item @click="redirctTo('/')">主页</el-menu-item>
                <el-menu-item  @click="redirctTo('/ranking')">排行榜</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="8">
            <div class="search_panel">
                <el-input v-model="search_input" placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>

        </el-col>
        <el-col :span="8">
            <div class="user">




                <!--                <el-button @click="redirctTo('/login')">登录</el-button>-->
                <div v-if="this.$store.getters.uid === ''">
                    <el-button  @click="switchLoginVisible">登录</el-button>
                    <el-button  @click="switchRegisterVisible">注册</el-button>
                </div>
                <div v-else>
                    <el-dropdown class="user_icon">
                        <el-avatar  size="medium" :src="iconPath"/>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-user">
                                个人中心
                            </el-dropdown-item>
                            <el-dropdown-item icon="el-icon-video-camera">
                                投稿管理
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button @click="logout">登出</el-button>
                </div>



                <LoginDialog :dialog-form-visible="loginDialogVisible"
                             @closeDialog="switchLoginVisible"
                             @switchToRegister="switchRegisterVisible"/>
                <RegisterDialog :dialog-form-visible="registerDialogVisible"
                                @closeDialog="switchRegisterVisible"
                                @switchToLogin="switchLoginVisible"/>

            </div>

        </el-col>
    </el-row>


</template>

<script>

    import LoginDialog from "@/components/Dialog/LoginDialog";
    import RegisterDialog from "@/components/Dialog/RegisterDialog";

    export default {
        components: {
            RegisterDialog,
            LoginDialog
        },
        name: "navigator",
        data() {
            return {
                search_input: '',
                iconPath: require('../assets/user.png'),
                loginDialogVisible: false,
                registerDialogVisible: false
            }
        },
        methods: {
            redirctTo: function (toPath) {
                // let nowPath = window.document.location.pathname;
                // window.console.log(nowPath,toPath)
                // window.console.log(this.$router)
                // this.$router.push(toPath)
                // if (nowPath === toPath)
                //     window.document.location.reload();
                // else
                window.open(toPath);
                // window.location.href = toPath;

            },
            switchLoginVisible: function () {

                //false
                this.loginDialogVisible = !this.loginDialogVisible;

                //true
                // if (this.loginDialogVisible)
                //     this.loginDialogVisible = !this.loginDialogVisible;
            },
            switchRegisterVisible: function () {
                this.registerDialogVisible = !this.registerDialogVisible;
            },
            logout: function () {
                this.$store.dispatch('user/logout').then((msg) => {
                    // this.close();
                    if(msg === 0){
                        this.$message({
                            message: '已退出登录',
                            type: 'success'
                        });
                    }else {
                        this.$message.error(msg);
                    }

                    // alert('submit!AAA');
                })
            }
        }


    }
</script>

<style scoped>
    .el-menu {
        background-color: rgba(255, 255, 255, 0);

    }

    .el-col {
        height: 60px;
    }

    .el-input {
        width: 90%;
    }

    .search_panel .el-button {

    }

    .user {
        height: 100%;
        float: right;
    }

    .user .el-button {
        margin: 10px 5px !important;
        float: left;

    }

    .user .el-button:after {
        color: #FFFFFF;
    }

    .user .user_icon {
        margin: 10px 5px;
        float: left;

    }

    .search_panel {
        border-radius: 4px;
        min-height: 36px;
    }




</style>