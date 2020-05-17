<template>
    <div>
        <HeaderWithoutFooter>

            <div class="block">
                <div class="user">
                    <div class="userIcon">
                        <el-avatar :src="user.userPicPath ? user.userPicPath:staticIcon" :size="70"/>
                    </div>
                    <div style="float: left;">
                        <p class="name">
                            {{user.userName}}
                        </p>

                        <div>
                            <p style="float: left;">
                                Lv.{{user.userLevel}}
                            </p>

                            <p style="font-size: 12px; float: left; margin: 12px 10px 0 10px">
                                {{user.userLevelProgress}}/{{$store.getters.lvGap[user.userLevel]}}
                            </p>
                        </div>


                    </div>

                </div>
            </div>
            <!--            <el-menu-->
            <!--                    @select="handleSelect"-->
            <!--                    class="menu"-->
            <!--                    :router="true"-->
            <!--                    :default-active="activeIndex"-->
            <!--                    active-text-color="#339999"-->
            <!--                    style="width: 100%" mode="horizontal">-->
            <!--                <el-menu-item :index="activeIndex">主页</el-menu-item>-->
            <!--                <el-menu-item id="video" :index="activeIndex +'/video'">视频</el-menu-item>-->
            <!--                <el-menu-item id="favorite" :index="activeIndex +'/favorite'">收藏</el-menu-item>-->
            <!--                <el-menu-item index="1" @click="handleClickDynamic">动态</el-menu-item>-->
            <!--                <el-menu-item :index="activeIndex +'/settings'">设置</el-menu-item>-->
            <!--            </el-menu>-->
            <el-menu
                    v-if="user.userId"
                    @select="handleSelect"
                    class="menu"
                    :router="true"
                    :default-active="$route.path"
                    active-text-color="#339999"
                    style="width: 100%" mode="horizontal">
                <el-menu-item :index="'/home/' + user.userId">主页</el-menu-item>
                <el-menu-item id="video" :index="'/home/' + user.userId +'/video'">视频</el-menu-item>
                <el-menu-item id="favorite" :index="'/home/' + user.userId +'/favorite'">收藏</el-menu-item>
                <el-menu-item v-if="user.userId === $store.getters.uid" @click="handleClickDynamic">动态</el-menu-item>
                <el-menu-item v-else :index="'/home/' + user.userId +'/dynamics'">动态</el-menu-item>
                <el-menu-item v-if="user.userId === $store.getters.uid" :index="'/home/' + user.userId +'/settings'">设置
                </el-menu-item>
            </el-menu>

            <router-view/>


        </HeaderWithoutFooter>

    </div>
</template>

<script>
    import {getUserInfo as getUserInfoApi} from "@/api/user";
    import {throwError} from "@/utils/error";
    import HeaderWithoutFooter from "@/components/Container/HeaderWithoutFooter";

    export default {
        name: "homeApp",
        components: {HeaderWithoutFooter},
        data() {
            return {
                user: {
                    userId: null,
                    userName: null,
                    userLevel: null,
                    userLevelProgress: null,
                    userPicPath: null,
                },
                staticIcon: require('../../assets/user.png')

            }
        },

        methods: {
            handleSelect(key, keyPath) {
                window.console.log(key, keyPath);
            },
            getUserInfo() {
                getUserInfoApi({userId: this.$route.params.userId}).then(response => {

                    try {

                        const {user} = response.data;
                        this.user = user;

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            },
            handleClickDynamic() {
                location.href = "/dynamic";
            }
        },
        mounted() {

            let _this = this;
            setTimeout(function () {
                _this.user.userId = _this.$route.params.userId
                _this.getUserInfo()
                _this.activeIndex = '/home/' + _this.user.userId
            }, 100);


            // if (location.pathname.lastIndexOf("/") === location.pathname.length - 1) {
            //     this.activeIndex = location.pathname.substring(0, location.pathname.length - 1)
            // } else {
            //     this.activeIndex = location.pathname
            // }


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