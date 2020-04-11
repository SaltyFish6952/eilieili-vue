<template>
    <div>
<!--        <div v-if="">-->
<!--            <el-avatar></el-avatar>-->
<!--        </div>-->
    </div>
</template>

<script>


    export default {
        name: "ReplyItem",
        props: {
            reply: Array
        },
        data() {
            return {
                replyer: {
                    userId: null,
                    userName: null,
                    userPicPath: null,
                    userLevel: null
                },
                replyTo: {
                    userId: null,
                    userName: null,
                    userPicPath: null,
                    userLevel: null
                }
            }
        }
    }
</script>

<style scoped>

</style>