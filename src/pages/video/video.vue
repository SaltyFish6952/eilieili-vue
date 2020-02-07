<template>
    <!--    <div>-->
    <!--        <h2>i am video.vue</h2>-->
    <!--        <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--    </div>-->
    <HeaderWithoutFooter>
        <el-container>
            <el-aside width="60%">
                <h2>Title</h2>

                    <VideoPlayer class="player" :options="videoOptions"/>


            </el-aside>
            <el-main width="30%">Main</el-main>
        </el-container>
    </HeaderWithoutFooter>
</template>

<script>
    import VideoPlayer from "@/components/VideoPlayer";
    import HeaderWithoutFooter from "@/components/Container/HeaderWithoutFooter";

    export default {
        name: 'app',
        components: {
            VideoPlayer,
            HeaderWithoutFooter

        },
        data() {
            return {
                videoOptions: {
                    autoplay: true,
                    controls: true,
                    height:360,
                    language:'zh-CN',
                    sources: [
                        {
                            src:
                                "http://192.168.3.101:8011/player/video_name.m3u8",
                            type: "application/x-mpegURL"
                        }
                    ]
                }
            }
        }
    }
</script>

<style>

    .el-container {
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
        width: 640px;
        height: 360px;
        object-fit: fill;
        background-color: #42b983;
        margin: 20px;
    }
</style>
