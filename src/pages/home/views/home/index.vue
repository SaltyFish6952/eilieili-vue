<template>
    <div>
        <div class="video">
            <MoreButton v-if="videos.length > 0" :func="handleClickVideo" class="more_btn"/>
            <h2>
                {{$store.getters.uid === $route.params.userId ? '我' : 'ta'}}的视频
            </h2>

            <el-divider/>
            <div  v-if="videos.length > 0">
                <VideoBlock style="width: 80%;" :videos="videos"/>
            </div>
            <p style="text-align: center;" v-else>
                暂无视频
            </p>
        </div>
        <div class="favorite">
            <MoreButton v-if="favorites.length > 0" :func="handleClickFavorite" class="more_btn"/>
            <h2>
                {{$store.getters.uid === $route.params.userId ? '我' : 'ta'}}的收藏
            </h2>
            <el-divider/>
            <div v-if="favorites.length > 0">
                <VideoBlock style="width: 80%;" :videos="favorites"/>
            </div>
            <p style="text-align: center;" v-else>
                暂无收藏
            </p>
        </div>

    </div>
</template>

<script>
    import VideoBlock from "@/components/VideoCards/VideoBlock";
    import {getUserFavoriteVideos as getUserFavoriteVideosApi, getUserVideos as getUserVideosApi} from "@/api/video";
    import {throwError} from "@/utils/error";
    import MoreButton from "@/components/Button/MoreButton";

    export default {
        name: "index",
        components: {MoreButton, VideoBlock},
        data() {
            return {
                videos: [],
                favorites: [],
                userId: ''
            }
        },
        methods: {
            getUserVideo() {
                getUserVideosApi({userId: this.userId, page: 1}).then(response => {

                    try {
                        const {videos} = response.data;
                        this.videos = videos
                    } catch (e) {
                        throwError(e, response, this)
                    }


                })
            },
            getUserFavorite() {
                getUserFavoriteVideosApi({userId: this.userId, page:1}).then(response => {

                    try {
                        const {videos} = response.data
                        this.favorites = videos

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            },
            handleClickVideo() {
                document.getElementById("video").click();
            },
            handleClickFavorite() {
                document.getElementById("favorite").click();
            }
        },
        mounted() {
            this.userId = this.$route.params.userId
            this.getUserVideo()
            this.getUserFavorite()
        }
    }
</script>

<style scoped>
    .video, .favorite {
        position: relative;
    }


    .video .more_btn, .favorite .more_btn {
        position: absolute;
        right: 20px;
        top: 20px;
    }
</style>