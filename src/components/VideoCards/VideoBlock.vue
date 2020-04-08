<template>
    <div class="blocks_div">
        <el-row class="items">
            <el-col :span="6" v-for="video in videos" :key="video.videoId">
                <VideoCard
                        :video-id="video.videoId"
                        :video-name="video.videoName"
                        :video-pic-path="video.videoPicPath"
                        :video-user="video.videoUser"/>
            </el-col>
        </el-row>

    </div>
</template>

<script>

    import VideoCard from "@/components/VideoCards/VideoCard";

    export default {
        name: "VideoBlock",
        components:{
          VideoCard
        },
        props:{
            videos:Array
        }
    }
</script>

<style scoped>
    .blocks_div {
        /*width: 920px;*/
        margin: 0 auto;
    }

    .items {
        width: 100%;
        /*background-color: #333333;*/

    }

    .items .el-col {
        /*width: 240px;*/

        display: flex;
        align-items: center;
    }
</style>