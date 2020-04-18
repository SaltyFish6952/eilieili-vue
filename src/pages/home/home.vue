<template>
    <div>
        <HeaderWithFooter>

            <div class="block">
                <div class="user">
                    <div class="userIcon">
                        <el-avatar :src="this.$store.getters.avatar" :size="70"/>
                    </div>
                    <div style="float: left;">
                        <p class="name">
                            {{$store.getters.name}}
                        </p>

                        <div>
                            <p style="float: left;">
                                Lv.{{$store.getters.ulv}}
                            </p>

                            <p style="font-size: 12px; float: left; margin: 12px 10px 0 10px">
                            {{$store.getters.ulvprogress}}/{{$store.getters.lvGap[$store.getters.ulv]}}
                            </p>
                        </div>


                    </div>

                </div>
            </div>
            <el-menu
                    @select="handleSelect"
                    class="menu"
                    :router="true"
                    :default-active="activeIndex"
                    active-text-color="#339999"
                    style="width: 100%" mode="horizontal">
                <el-menu-item :index="activeIndex">主页</el-menu-item>
                <el-menu-item :index="activeIndex +'/video'">视频</el-menu-item>
                <el-menu-item :index="activeIndex +'/settings'">设置</el-menu-item>
            </el-menu>

            <router-view/>


        </HeaderWithFooter>

    </div>
</template>

<script>
    import HeaderWithFooter from "@/components/Container/HeaderWithFooter";
    import {getUserInfo as getUserInfoApi} from "@/api/user";
    import {throwError} from "@/utils/error";

    export default {
        name: "homeApp",
        components: {HeaderWithFooter},
        data() {
            return {
                user: {
                    userId: null,
                    userName: null,
                    userLevel: null,
                    userLevelProgress: null,
                    userPicPath: require('../../assets/user.png')
                },
                activeIndex: ''
            }
        },
        computed: {
            percent: function () {
                const lv = this.$store.getters.ulv;
                const lvprogress = this.$store.getters.ulvprogress;
                const lvArray = this.$store.getters.lvGap;

                window.console.log(((lvprogress - lvArray[lv - 1]) / (lvArray[lv] - lvArray[lv - 1])) * 100)

                return ((lvprogress - lvArray[lv - 1]) / (lvArray[lv] - lvArray[lv - 1])) * 100;
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                window.console.log(key, keyPath);
            },
            getUserInfo() {
                getUserInfoApi({userId: this.$store.getters.uid}).then(response => {

                    try {

                        const {user} = response.data;
                        this.user = user;

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            }
        },
        mounted() {


            this.user.userId = this.$store.getters.uid
            this.activeIndex = '/home/' + this.$store.getters.uid
            this.getUserInfo()
        }
    }
</script>

<style scoped>
    .block {
        width: 100%;
        height: 200px;
        background-image: linear-gradient(#FFFFFF, rgba(27, 177, 136, 0.2));

    }

    .block .user {
        padding-top: 100px;
        height: 100px;
    }

    .user .userIcon {
        float: left;
        height: 70px;
        margin: 15px 20px;
    }

    .menu {
        border: 1px solid #e6e6e6;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-top: none;
    }

    .name {
        font-size: 18px;
    }

    .el-menu-item.is-active {
        /*background-color: rgba(48, 84, 130, 0.02) !important;*/
    }
</style>