<template>
    <div class="infinite-wrapper">

        <div v-for="(item, $index) in this.dynamics" :key="$index">
            <DynamicItem :item="item"/>
        </div>

        <div style="overflow: auto;">
            <infinite-loading
                    :force-use-infinite-wrapper="true"
                    @infinite="infiniteHandler"/>
        </div>


    </div>
</template>

<script>
    import DynamicItem from "@/components/Dynamic/DynamicItem";
    import InfiniteLoading from "vue-infinite-loading";
    import {getDynamics as getDynamicsApi} from "@/api/dynamic";
    import {throwError} from "@/utils/error";

    export default {
        name: "index",
        components: {DynamicItem, InfiniteLoading},

        data() {
            return {
                dynamicPage: 1,
                dynamics: [],
                userId: ''
            }
        },
        methods: {
            infiniteHandler($state) {


                getDynamicsApi({
                    userId: this.userId,
                    page: this.dynamicPage
                }).then(response => {

                    try {

                        const {dynamics} = response.data


                        if (dynamics.length) {
                            this.dynamicPage++;
                            this.dynamics.push(...dynamics);
                            $state.loaded();
                        } else {
                            $state.complete()
                        }

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })


            }
        },
        mounted() {
            this.userId = this.$route.params.userId
        }
    }
</script>

<style scoped>
    .infinite-wrapper {
        overflow: auto;
        margin: 0 auto;
        width: 80%;
    }
</style>