<template>
    <div>
        <div>
            <h2>
                我的视频
            </h2>
            <el-divider/>
            <div>
                <VideoBlock style="width: 80%;" :videos="videos"/>
            </div>
        </div>
        <div>
            <h2>
                我的动态
            </h2>
            <el-divider/>
            <div></div>
        </div>

    </div>
</template>

<script>
    import VideoBlock from "@/components/VideoCards/VideoBlock";
    import {getUserVideos as getUserVideosApi} from "@/api/video";
    import {throwError} from "@/utils/error";

    export default {
        name: "index",
        components: {VideoBlock},
        data() {
            return {
                videos: [],
                userId: ''
            }
        },
        methods: {
            getUserVideo() {
                getUserVideosApi({userId: this.userId}).then(response => {

                    try {
                        const {videos} = response.data;
                        this.videos = videos.slice(0,4)
                    } catch (e) {
                        throwError(e, response, this)
                    }


                })
            }
        },
        mounted() {
            this.userId = this.$route.params.userId
            this.getUserVideo()
        }
    }
</script>

<style scoped>

</style>