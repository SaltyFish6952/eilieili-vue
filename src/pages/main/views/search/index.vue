<template>
    <HeaderWithFooter>

        <div>
            <h1>搜索结果</h1>
            <el-divider/>
            <div v-if="result.length !== 0">
                <div  v-for="(item, $index) in result" :key="$index" class="block">
                    <el-link style="width: 100%; justify-content: left;" :href="'/video/' + item.id" :underline="false">
                        <el-image class="img" :src="item.videoPicPath"/>
                        <p class="name">{{item.value}}</p>
                    </el-link>
                    <el-divider/>
                </div>
            </div>

            <div style="height: 700px;" v-else>
                <div style="margin: 10px 0; text-align: center;">暂无内容</div>
            </div>


        </div>

    </HeaderWithFooter>
</template>

<script>
    import HeaderWithFooter from "@/components/Container/HeaderWithFooter";
    import {getVideoQuery as getVideoQueryApi} from "@/api/video";
    import {throwError} from "@/utils/error";


    export default {
        name: "Search",
        components: {HeaderWithFooter},
        data() {
            return {
                queryString: null,
                search_input: '',
                result: []
            }
        },
        methods: {
            getQueryResult() {
                getVideoQueryApi({query: this.queryString}).then(response => {

                    try {
                        const {videos} = response.data;

                        this.result = videos


                    } catch (e) {
                        throwError(e, response, this)
                    }


                })
            }
        },
        beforeRouteEnter(to, from, next) {

            if (to.query.string === undefined || to.query.string === '') {
                next({
                    path: '/'
                })
            } else
                next()

        },
        mounted() {
            this.queryString = this.$route.query.string;
            this.getQueryResult()
        }
    }
</script>

<style scoped>

    .block {
        width: 100%;
        overflow: auto;
        margin: 10px 0;
    }

    .block .img {
        height: 108px;
        width: 192px;
        float: left;
    }

    .block .name{
        float: left;
        line-height: 108px;
        margin: 0 5px;
    }
</style>