<template>
    <div class="rankingList">
        <el-table
                :data="rankings"
                style="width: 100%;">
            <el-table-column
                    type="index"
                    label="排行榜"
                    width="63%"
            >
            </el-table-column>
            <el-table-column>
                <!--                <template slot-scope="scope">-->
                <!--                    <el-popover trigger="hover" placement="right">-->
                <!--                        <p>姓名: {{ scope.row.name }}</p>-->
                <!--                        <p>住址: {{ scope.row.address }}</p>-->
                <!--                        <div slot="reference" class="name-wrapper">-->
                <!--                            <el-link :underline="false">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</el-link>-->
                <!--                        </div>-->
                <!--                    </el-popover>-->
                <!--                </template>-->
                <template slot-scope="scope">
                    <Popover :scope="scope"/>
                </template>

            </el-table-column>

        </el-table>
        <div class="ranking_bottom">
            <MoreButton url="/ranking" :is-router="true" :router-param="rankingSectorId" style="margin: 11px 15px;"/>
        </div>
    </div>
</template>

<script>

    import MoreButton from "@/components/Button/MoreButton";
    import Popover from "@/components/RankingList/Sector/Popover";
    import {getRanking as getRankingListApi} from "@/api/ranking";
    import {throwError} from "@/utils/error";

    export default {
        components: {
            MoreButton,
            Popover
        },
        name: "RankingList",
        data() {
            return {
                rankings: [{}, {}, {}, {}, {}, {}, {}, {}]
            }
        },
        props: {
            rankingSectorId: String
        },
        methods: {

            getRankingList() {
                getRankingListApi({sectorId: this.rankingSectorId})
                    .then(response => {
                        const {videos} = response.data;
                        if (videos === undefined) {
                            throwError(response, this)
                        } else {
                            this.rankings = response.data.videos.slice(0, 8)
                        }


                    })

            }
        },
        created() {
            this.getRankingList();
        }
    }
</script>

<style scoped>
    .name-wrapper .el-link {
        width: 200px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .rankingList {
        width: 300px;
    }
</style>