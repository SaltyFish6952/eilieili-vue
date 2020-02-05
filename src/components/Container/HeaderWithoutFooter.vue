<template>
    <el-container>
        <el-header>
            <Navigator/>
        </el-header>
        <el-main>
            <slot></slot>
        </el-main>
    </el-container>
</template>

<script>

    import Navigator from "@/components/Navigator";
    export default {
        name: "HeaderWithoutFooter",
        components:{
            Navigator
        }
    }
</script>

<style scoped>
    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;

    }

    .el-header {
        padding: 0;
        color: #333;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        text-align: center;
        line-height: 60px;
    }

    .el-main{
        width: 90%;
        margin: auto;
    }
</style>