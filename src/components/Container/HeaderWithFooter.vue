<template>
    <el-container>
        <el-header>
            <Navigator/>
        </el-header>
        <el-main class="main">
            <slot></slot>
        </el-main>
        <el-footer>Copyright © 2019 eilieili.salty-fish.website All rights reserved</el-footer>
    </el-container>
</template>


<script>

    import Navigator from "@/components/Navigator.vue";

    export default {
        name: "HeaderWithFooter",
        components: {
            Navigator
        }
    }
</script>

<style scoped>
    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;


    }

    .el-header, .el-footer {
        padding: 0;
        color: #333;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        text-align: center;
        line-height: 60px;
    }

    .main {
        width: 1300px;
        margin: auto;
        padding: 10px 5px;

    }

</style>