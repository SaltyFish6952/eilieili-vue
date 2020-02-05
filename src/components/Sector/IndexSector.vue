<template>
    <div class="sector">


        <el-container>
            <el-main>
                <div class="title">
                    <h3><i class="el-icon-guide" style="margin: 0 5px;"/>Title</h3>
                    <MoreButton style="margin: 21px 15px;"/>
                </div>
                <el-row class="items">
                    <!--                    <el-col span="5">-->
                    <!--                        <SectorItem/>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col span="5">-->
                    <!--                        <SectorItem/>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col span="5">-->
                    <!--                        <SectorItem/>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col span="5">-->
                    <!--                        <SectorItem/>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col span="5">-->
                    <!--                        <SectorItem/>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col span="5">-->
                    <!--                        <SectorItem/>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col span="5">-->
                    <!--                        <SectorItem/>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col span="5">-->
                    <!--                        <SectorItem/>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col span="5">-->
                    <!--                        <SectorItem/>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col span="5">-->
                    <!--                        <SectorItem/>-->
                    <!--                    </el-col>-->
                    <el-col>
                        <SectorItem/>
                    </el-col>
                    <el-col>
                        <SectorItem/>
                    </el-col>
                    <el-col>
                        <SectorItem/>
                    </el-col>
                    <el-col>
                        <SectorItem/>
                    </el-col>
                    <el-col>
                        <SectorItem/>
                    </el-col>
                    <el-col>
                        <SectorItem/>
                    </el-col>
                    <el-col>
                        <SectorItem/>
                    </el-col>
                    <el-col>
                        <SectorItem/>
                    </el-col>
                    <el-col>
                        <SectorItem/>
                    </el-col>
                    <el-col>
                        <SectorItem/>
                    </el-col>

                </el-row>
            </el-main>
            <el-aside>
                <el-table
                        :data="rankingData"

                        style="width: 100%;">
                    <el-table-column
                            type="index"
                            label="排行榜"
                            width="63%"
                            :index="indexMethod">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            width="236%">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="right">
                                <p>姓名: {{ scope.row.name }}</p>
                                <p>住址: {{ scope.row.address }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-link :underline="false">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</el-link>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="ranking_bottom">
                    <MoreButton style="margin: 11px 15px;"/>
                </div>
            </el-aside>
        </el-container>

    </div>

</template>


<script>
    import SectorItem from "@/components/Sector/SectorItem";
    import MoreButton from "@/components/Button/MoreButton";

    export default {
        name: "IndexSector",
        components: {
            MoreButton,
            SectorItem
        },
        data() {
            return {
                rankingData: [{}, {}, {}, {}, {}, {}, {}, {}],
            }
        },
        methods: {
            indexMethod(index) {
                return index + 1;
            }
        }
    }
</script>

<style scoped>

    h3 {
        float: left;
        margin: 0;
    }

    .items {
        width: 100%;
        /*background-color: #333333;*/

    }

    .items .el-col {
        width: 20%;
        display: flex;
        align-items: center;
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
        height: 68px;
        /*background-color: rgba(255, 51, 116, 1);*/
        line-height: 68px;
    }

    .name-wrapper .el-link{
        width: 200px;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        overflow:hidden;
    }


</style>