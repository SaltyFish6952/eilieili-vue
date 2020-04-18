<template>
    <div class="card">
        <el-card shadow="never" bo :body-style="{ padding: '0px' }">
            <el-link :underline="false" :href="'/video/' + videoId" target="_blank">
                <el-image class="image" :src="videoPicPath" lazy/>
                <div style="padding: 14px;">
                    <div class="name">{{videoName}}</div>
                    <div class="bottom clearfix">
                        {{videoId}}
                        <!--                    <time class="time">{{ currentDate }}</time>-->
                        <!--                        <el-button type="text" class="button">操作按钮</el-button>-->
                    </div>
                </div>
            </el-link>


        </el-card>

    </div>
</template>

<script>
    export default {
        name: "VideoCard",
        data() {
            return {
                currentDate: new Date(),
                url: ""
            };
        },

        props: {
            videoName: String,
            videoPicPath: String,
            videoUser: String,
            videoId: String
        },
        watch: {
            videoId: function (newVal, oldVal) {
                window.console.log(oldVal)
                this.url = "/video?videoId=" + newVal
            }
        }

    }
</script>

<style scoped>

    .card {
        text-align: left;
        margin: 5px auto;
        float: left;
    }

    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 192px;
        height: 108px;
        display: block;
    }

    .card .name{
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 164px;
        height: 38.4px;

    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

</style>