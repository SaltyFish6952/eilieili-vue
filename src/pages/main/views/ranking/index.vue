<template>
    <HeaderWithoutFooter>
        <el-page-header @back="goBack" :content="content"/>
        <!--        <el-divider/>-->

        <DetailList v-loading="loading" :ranking-list="rankingList"/>

    </HeaderWithoutFooter>

</template>

<script>
    import DetailList from "@/components/RankingList/Detail/List";
    import {
        getRanking as getRankingApi
    } from "@/api/ranking"
    import {getSector as getSectorApi} from "@/api/sector";
    import {throwError} from "@/utils/error";
    import HeaderWithoutFooter from "@/components/Container/HeaderWithoutFooter";

    export default {
        name: "index",
        components: {HeaderWithoutFooter, DetailList},
        data() {
            return {
                rankingList: [],
                sector: {},
                content: '排行榜',
                loading: true
            }
        },
        methods: {
            goBack() {
                window.console.log("go back")
                // this.$router.back()
                this.$router.push({path: '/'})
            },

            getRankingList() {

                if (this.$route.params.sectorId != null) {

                    getRankingApi({"sectorId": this.$route.params.sectorId})
                        .then(response => {

                            try {
                                const {rankings} = response.data;
                                this.rankingList = rankings;
                                this.loading = false

                            } catch (e) {
                                throwError(e, response, this);

                            }


                        })

                    getSectorApi({"sectorId": this.$route.params.sectorId})
                        .then(response => {

                            try {
                                const {sector} = response.data;
                                this.sector = sector;

                            } catch (e) {
                                throwError(e, response, this);

                            }


                        })

                } else {

                    getRankingApi().then(response => {

                        try {
                            const {rankings} = response.data
                            this.rankingList = rankings
                            this.loading = false
                        } catch (e) {
                            throwError(e, response, this);

                        }


                    })
                }


            }

        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            sector: function (newVal, oldVal) {
                this.content = this.sector.sectorName + '排行榜'
            }
        },
        created() {
            this.getRankingList()

        }
    }
</script>

<style scoped>
    .el-page-header {
        margin: 20px 5px;
    }

    .el-divider {
        margin: 15px 2px;
    }
</style>