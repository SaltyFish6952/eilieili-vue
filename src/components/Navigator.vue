<template>
    <el-row>
        <el-col :span="8">
            <el-menu class="grid-content " mode="horizontal">
                <el-menu-item>主页</el-menu-item>
                <el-menu-item>排行榜</el-menu-item>
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

                <el-avatar class="user_icon" size="medium" :src="iconPath"/>
                <el-button>登录</el-button>
                <el-button>注册</el-button>

            </div>

        </el-col>
    </el-row>


</template>

<script>
    export default {
        name: "navigator",
        data() {
            return {
                search_input: '',
                iconPath: require('../assets/user.png')
            }
        },


    }
</script>

<style scoped>
    .el-menu {
        background-color: rgba(255, 255, 255, 0);

    }

    .el-col{
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

    .user .user_icon{
        margin: 10px 5px;
        float: left;

    }

    .search_panel {
        border-radius: 4px;
        min-height: 36px;
    }


</style>