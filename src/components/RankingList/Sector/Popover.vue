<template>
    <div>

        <el-popover trigger="hover" placement="right">
            <el-image class="image" v-if="scope.row.videoPicPath !== undefined "
                      :src="scope.row.videoPicPath"/>
            <p class="name">{{ scope.row.videoName }}</p>
            <div class="view_times">
                <i class="el-icon-video-camera"/>{{scope.row.videoViewTimes}}
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dianzan"></use>
                </svg>
                {{scope.row.likes}}
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shoucang"></use>
                </svg>
                {{scope.row.favorites}}
            </div>
            <div slot="reference" class="name-wrapper">
                <el-link :href="'/video/' + scope.row.videoId" :underline="false">{{scope.row.videoName}}</el-link>
            </div>
        </el-popover>
    </div>

</template>

<script>
    import '@/assets/icons/iconfont.js'


    export default {
        name: "Popover",
        props: {
            scope: Object
        }
    }
</script>

<style scoped>
    .name-wrapper .el-link, .name {
        width: 192px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        -webkit-box-align: start;
        overflow: hidden;

    }

    .name {
        -webkit-line-clamp: 3;
    }

    .image {
        width: 192px;
        height: 108px;
        display: block;

    }

    .view_times{
        width: 160px;
        margin: 0 auto;
    }

    .icon, i {
        font-size: 14px;
        margin: 0 10px;
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

</style>