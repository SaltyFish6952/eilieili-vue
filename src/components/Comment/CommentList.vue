<template>
    <div class="infinite-wrapper">
        <el-divider/>
        <div v-for="(item, $index) in this.comments" :key="$index">
            <CommentItem :comment="item.comment" :reply="item.reply"/>
<!--            <el-divider/>-->
        </div>

        <div style="overflow: auto;">
            <infinite-loading
                    :force-use-infinite-wrapper="true"
                    @infinite="infiniteHandler"
            ></infinite-loading>
        </div>

    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import CommentItem from "@/components/Comment/CommentItem";
    import {getComments as getCommentsApi} from "@/api/video";

    export default {
        name: "CommentList",
        components: {CommentItem, InfiniteLoading},
        props: {
            videoId: String
        },
        data() {
            return {
                page: 1,
                comments: []
            }
        },
        methods: {

            infiniteHandler($state) {
                getCommentsApi({videoId: this.videoId, page: this.page}).then(response => {
                    const {comments} = response.data;

                    for (let i = 0; i < comments.length; i++) {
                        for (let j = 0; j < comments[i].reply.length; j++) {
                            comments[i].reply[j].active = false
                        }
                    }

                    window.console.log(comments)
                    if (comments.length) {
                        this.page++;
                        this.comments.push(...comments);
                        $state.loaded()
                    } else {
                        $state.complete()
                    }

                })
            },


        },
        mounted() {
            // getComments({videoId: this.videoId, page: this.page}).then(response => {
            //     const {comments} = response.data;
            //     window.console.log(comments)
            //     if (comments.length) {
            //         this.page++;
            //         this.comments.push(...comments);
            //
            //     }
            //
            // })
        }
    }
</script>

<style scoped>

    .infinite-wrapper {
        overflow: auto;
    }


</style>