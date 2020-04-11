<template>
    <div class="sector">

        <el-container>
            <el-main>
                <div class="title">
                    <router-link :to="{path: '/sector' + `/${sectorId}`}">
                        <el-link :underline="false" style="float: left;">
                            <h3><i class="el-icon-guide" style="margin: 0 5px;"/>{{sectorName}}</h3>
                        </el-link>
                    </router-link>


                    <MoreButton url="/sector" :is-router="true" :router-param="sectorId" style="margin: 21px 15px;"/>
                </div>

                <VideoBlock :videos="videos"/>

            </el-main>
            <el-aside>
                <RankingList :ranking-sector-id="sectorId"/>
            </el-aside>
        </el-container>

    </div>

</template>


<script>
    import VideoBlock from "@/components/VideoCards/VideoBlock";
    import MoreButton from "@/components/Button/MoreButton";
    import RankingList from "@/components/RankingList/Sector/List";
    import {getSectorRandomVideos as getSectorRandomVideosApi} from "@/api/video";
    import {throwError} from "@/utils/error";

    export default {
        name: "IndexSector",
        components: {
            RankingList,
            MoreButton,
            VideoBlock
        },
        data() {
            return {

                videos: []
            }
        },
        methods: {

            getVideos(sectorId) {
                getSectorRandomVideosApi({sectorId: sectorId}).then(response => {
                    const {videos} = response.data;
                    if (videos === undefined) {
                        throwError(response, this);
                    } else {
                        this.videos = videos;
                    }

                })
            }
        },
        props: {
            sectorName: String,
            sectorId: String
        },
        created() {
            window.console.log(this.sectorId);
            this.getVideos(this.sectorId)
        }
    }
</script>

<style scoped>

    h3 {
        float: left;
        margin: 0;
    }


    .sector {
        /*background-color: darkred;*/
        height: 480px;
        margin: 2px;
    }

    .sector .el-main {
        padding: 0;

    }

    .sector .el-aside {

        /*background-color: chartreuse;*/
    }

    .sector .ranking_bottom {
        width: 100%;
        height: 48px;
        /*background-color: #42b983;*/
    }


    .title {
        /*width: 900px;*/
        height: 68px;
        /*background-color: rgba(255, 51, 116, 1);*/
        line-height: 68px;
    }


</style>