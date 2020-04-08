<template>
    <HeaderWithFooter class="sector_main">
        <el-page-header @back="goBack" :content="sectorName"/>
        <el-divider/>

        <VideoBlock style="width: 80%;" :videos="showedVideos"/>

        <el-pagination
                background
                layout="prev, pager, next"
                @prev-click="showVideos(false)"
                @next-click="showVideos(true)"
                @current-change="currentChange"
                :page-size="12"
                :total="videos.length">
        </el-pagination>
    </HeaderWithFooter>

</template>

<script>

    import HeaderWithFooter from "@/components/Container/HeaderWithFooter";
    import {getAllVideos as getAllVideosApi} from "@/api/video";
    import {getSector as getSectorApi} from "@/api/sector";
    import VideoBlock from "@/components/VideoCards/VideoBlock";


    export default {
        components: {
            VideoBlock,
            HeaderWithFooter
        },
        name: "index",
        data() {
            return {
                sectorId: '',
                sectorName: '',
                videos: [],
                showedVideos: [],
                totalPage: '',
                page: 1
            }
        },
        methods: {
            getVideosByPage(page) {
                getAllVideosApi({"sectorId": this.sectorId, "page": page}).then(response => {
                    const {videos} = response.data
                    this.videos = videos

                    this.totalPage = Math.ceil(this.videos.length / 12);

                    this.showVideos()
                })
            },
            getSectorInfo() {
                getSectorApi({"sectorId": this.sectorId}).then(response => {
                    window.console.log(response)
                    const {sector} = response.data
                    this.sectorName = sector.sectorName

                })
            },
            goBack() {
                window.console.log("go back")
                // this.$router.back()
                this.$router.push({path: '/'})
            },
            showVideos(isNext) {
                window.console.log("if Next?", isNext)

                if (isNext != null) {
                    if (isNext && this.page + 1 <= this.totalPage)
                        this.page++;
                    else if (this.page - 1 > 0)
                        this.page--;
                    else
                        return;
                }
                /**
                 * 第一页：0-11
                 * 第二页：12-23
                 * 第n页：(n-1)*12 - (n*12-1)
                 */
                this.showedVideos = this.videos.slice((this.page - 1) * 12,
                    (this.page * 12 - 1) + 1)

            },
            currentChange(changeToPage) {
                this.page = changeToPage
                this.showVideos()
            }
        },

        created() {
            this.sectorId = this.$route.params.sectorId
            this.getVideosByPage(this.page)
            this.getSectorInfo()

        }

    }
</script>

<style scoped>
    body {
        margin: auto;
        width: 100%;
        height: 100%;
    }

    html {
        width: 100%;
        height: 100%;
    }

    .el-page-header {
        margin: 20px 5px;
    }

    .el-divider {
        margin: 15px 2px;
    }

    .el-pagination {
        margin: 15px;
        text-align: center;
    }

    .sector_main .main {
        height: 715px;
    }

</style>