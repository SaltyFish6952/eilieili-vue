<template>
    <div>
        <router-view class="router-view"/>
    </div>
</template>

<script>

    export default {
        name: "App"
    }
</script>

<style scoped>


    #app {
        height: 100%;
        width: 100%;
    }

    .router-view {
        /*height: 100%;*/
        /*width: 100%;*/
    }
</style>