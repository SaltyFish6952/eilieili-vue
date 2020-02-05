<template>
    <!--    <div>-->
    <!--        <h2>i am video.vue</h2>-->
    <!--        <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--    </div>-->
    <HeaderWithoutFooter>
        <el-container>
            <el-aside width="60%">
                <h2>Title</h2>
                <div class="player">player</div>

            </el-aside>
            <el-main width="30%">Main</el-main>
        </el-container>
    </HeaderWithoutFooter>
</template>

<script>

    import HeaderWithoutFooter from "@/components/Container/HeaderWithoutFooter";

    export default {
        name: 'app',
        components: {

            HeaderWithoutFooter

        }
    }
</script>

<style>

    .el-container{
        width: 100%;
    }

    .el-aside {
        width: 70%;
        background-color: #D3DCE6;
        color: #333;
        text-align: center;

    }

    .el-main {
        width: 20%;
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }

    h2 {
        height: 30px;
        font-size: 20px;
        text-align: left;
        margin: 5px 20px;
        line-height: 30px;
    }

    .player {
        width: 64%;
        height: 540px;
        background-color: #42b983;
        margin: 20px;
    }
</style>
