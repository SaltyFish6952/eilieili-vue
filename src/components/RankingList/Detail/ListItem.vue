<template>
    <div>
        <el-image class="image"
                  :src="scope.row.videoPicPath"
                  />
        <div class="detail">
            <el-link class="info" :underline="false" :href="'/video?videoId=' + scope.row.videoId"
                     target="_blank">
                {{scope.row.videoName}}
            </el-link>
            <el-link class="info" :underline="false" target="_blank">
                {{scope.row.userId}}
            </el-link>
        </div>


    </div>
</template>

<script>
    export default {
        name: "ListItem",
        props: {
            scope: Object
        }
    }
</script>

<style scoped>
    .image {
        width: 128px;
        height: 72px;
        display: block;
        float: left;
    }

    .detail {
        margin: 12px;
        float: left;
    }

    .info{
        margin: 2px;
        display: block;
    }

</style>