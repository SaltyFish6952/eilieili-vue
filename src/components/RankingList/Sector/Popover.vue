<template>
    <div>

        <el-popover trigger="hover" placement="right">
            <el-image class="image"
                      :src="scope.row.videoPicPath"
                      />
            <p>{{ scope.row.videoName }}</p>
            <p>{{ scope.row.videoBrief }}</p>
            <div slot="reference" class="name-wrapper">
                <el-link :href="'/video/' + scope.row.videoId" :underline="false">{{scope.row.videoName}}</el-link>
            </div>
        </el-popover>
    </div>

</template>

<script>
    export default {
        name: "Popover",
        props: {
            scope: Object
        }
    }
</script>

<style scoped>
    .name-wrapper .el-link {
        width: 200px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        -webkit-box-align: start;
        overflow: hidden;

    }

    .image {
        width: 192px;
        height: 108px;
        display: block;

    }

</style>