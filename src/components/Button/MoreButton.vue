<template>
    <el-button class="more_btn" @click="more">
        更多<i class="el-icon-arrow-right"/></el-button>
</template>

<script>
    export default {
        name: "MoreButton",
        props: {
            url: String,
            isRouter: Boolean,
            routerParam: String,
            func: {
                default: null,
                type: Function
            }
        },
        methods: {
            more: function () {

                if (this.func === null) {
                    if (this.isRouter)
                        this.$router.push({path: this.url + `/${this.routerParam}`})
                    else
                        window.location.href = this.url;

                }else {
                    this.func()
                }


            }
        }
    }
</script>

<style scoped>
    .more_btn {
        float: right;
        padding: 5px;
    }
</style>