<template>
    <div>
        <HeaderWithFooter>
            <div>
                <el-carousel class="carousel" :interval="30000" type="card">
                    <el-carousel-item style="height: 360px;"
                                      v-for="(item, $index) in carouselVideos" :key="$index">
                        <el-link :underline="false" style="position: absolute; top: 0; left: 0;" :href="'/video/' + item.videoId">

                            <el-image fit="fit" v-if="item.videoPicPath !== ''" :src="item.videoPicPath"
                                      style="width: 645px; height: 360px;"/>
                            <div class="info">
                                <p style="color: #FFFFFF; padding: 0 5px;">{{item.videoName}}</p>
                            </div>

                        </el-link>

                    </el-carousel-item>
                </el-carousel>
            </div>

            <IndexSector v-for="sector in sectors" :key="sector.sectorName" :sector-name="sector.sectorName"
                         :sector-id="sector.sectorId"/>

        </HeaderWithFooter>
    </div>
</template>

<script>
    import HeaderWithFooter from "@/components/Container/HeaderWithFooter.vue";
    import IndexSector from "@/components/IndexSector";
    import {getSector as getSectorApi} from "@/api/sector";
    import {throwError} from "@/utils/error";
    import {getRandomVideos} from "@/api/video";


    export default {
        name: 'app',
        components: {

            HeaderWithFooter,
            IndexSector
        },
        data() {
            return {
                sectors: [],
                carouselVideos: []

            }
        },
        methods: {
            getSectors() {
                getSectorApi().then(response => {

                    try {
                        const {sectors} = response.data;
                        this.sectors = sectors;

                    } catch (e) {
                        throwError(e, response, this);
                    }


                })
            },
            getRandomVideos() {
                getRandomVideos({}).then(response => {

                    try {

                        const {videos} = response.data;
                        this.carouselVideos = videos

                    } catch (e) {
                        throwError(e, response, this)
                    }


                })
            }
        },
        created() {
            this.getSectors();
            this.getRandomVideos()
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

    }

    .el-carousel__indicators {
        margin-top: 70px;
    }

    .carousel {
        height: 400px;
        margin: 0 auto;
    }

    .carousel .info {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgba(74, 74, 74, 0.4);
    }

</style>
