<template>
    <div class="card">
        <el-card :body-style="{ padding: '0px' }">
            <el-image class="image" lazy/>
            <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
<!--                    <time class="time">{{ currentDate }}</time>-->
                    <el-button type="text" class="button">操作按钮</el-button>
                </div>
            </div>
        </el-card>
        
    </div>
</template>

<script>
    export default {
        name: "SectorItem",
        data() {
            return {
                currentDate: new Date()
            };
        }
    }
</script>

<style scoped>

    .card{
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
        width: 206px;
        height: 116px;
        display: block;
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