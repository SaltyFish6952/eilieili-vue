<template>
    <el-container>
        <el-header>Header</el-header>
        <el-main>
            <slot></slot>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "HeaderWithoutFooter"
    }
</script>

<style scoped>
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
</style>