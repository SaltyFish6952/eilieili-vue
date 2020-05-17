<template>
    <div style="height: 100%;">
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical"
                :router="true"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                >
            <el-menu-item :index="'/admin'">
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item :index="'/admin/user'">
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item :index="'/admin/sector'">
                <span slot="title">分区管理</span>
            </el-menu-item>
            <el-menu-item :index="'/admin/video'">
                <span slot="title">视频管理</span>
            </el-menu-item>
<!--            <el-menu-item index="5">-->
<!--                <span slot="title">评论管理</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="6">-->
<!--                <span slot="title">弹幕管理</span>-->
<!--            </el-menu-item>-->
        </el-menu>

        <div style="padding-left: 205px;">
            <router-view class="router"/>
        </div>
    </div>

</template>

<script>
    export default {
        name: "app",
        methods: {
            // menuSelect(index) {
            //     // const PATH = ['/admin','/admin/user', '/admin/sector', '/admin/video', '/admin/comment', '/admin/danmaku']
            //     // this.$router.push({path: PATH[index - 1]})
            // }
        }
    }
</script>

<style scoped>
    .el-menu-vertical {
        float: left;
        width: 200px;
        height: 100%;
        position: fixed;
        left: 0;
    }

    body {
        height: 100%;
    }

    .router {
        height: 100%;
        float: left;
        width: 100%;
        /*padding-left: 310px;*/
    }
</style>