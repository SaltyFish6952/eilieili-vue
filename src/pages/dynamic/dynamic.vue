<template>
    <HeaderWithoutFooter>
        <div class="dynamic_block">

            <h1>我的动态</h1>

            <el-button size="mini" v-if="!newDynamic" type="primary" @click="newDynamic = true">发表新动态</el-button>
            <el-button size="mini" v-if="newDynamic" type="primary" @click="newDynamic = false">取消</el-button>

            <div class="input" v-if="newDynamic">
                <Tinymce v-model="content" :height="50"/>
            </div>

            <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">所有</el-menu-item>
                <el-menu-item index="2">我的</el-menu-item>
            </el-menu>

            <div class="infinite-wrapper">
                <div v-for="(item, $index) in this.dynamics" :key="$index">
                    <DynamicItem :item="item"/>
                </div>

                <div style="overflow: auto;">
                    <infinite-loading
                            :force-use-infinite-wrapper="true"
                            :identifier="index"
                            @infinite="infiniteHandler"
                    />
                </div>
            </div>

        </div>


    </HeaderWithoutFooter>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import HeaderWithoutFooter from "@/components/Container/HeaderWithoutFooter";
    import Tinymce from "@/components/Tinymce/index";
    import DynamicItem from "@/components/Dynamic/DynamicItem";
    import {getAllDynamics as getAllDynamicsApi, getDynamics as getDynamicsApi} from "@/api/dynamic";
    import {throwError} from "@/utils/error";

    export default {
        name: "dynamic",
        components: {DynamicItem, Tinymce, HeaderWithoutFooter, InfiniteLoading},
        data() {
            return {
                staticIcon: require('../../assets/user.png'),
                content: '',
                dynamics: [],
                dynamicPage: 1,
                index: "1",
                newDynamic: false
            }
        },
        methods: {
            handleSelect(index) {  //number
                this.dynamicPage = 1
                this.dynamics = []
                this.index = index
            },
            infiniteHandler($state) {

                if (this.index === "1") {

                    getAllDynamicsApi({
                        userId: this.$store.getters.uid,
                        page: this.dynamicPage
                    }).then(response => {

                        try {

                            const {dynamics} = response.data

                            for (let i = 0; i < dynamics.length; i++) {

                                for (let j = 0; j < dynamics[i].reply.length; j++) {
                                    dynamics[i].reply[j].active = false
                                }
                            }


                            if (dynamics.length) {
                                this.dynamicPage++;
                                this.dynamics.push(...dynamics);
                                $state.loaded();
                            } else {
                                $state.complete()
                            }

                        } catch (e) {
                            throwError(e, response, this)
                        }

                    })

                } else if (this.index === "2") {


                    getDynamicsApi({
                        userId: this.$store.getters.uid,
                        page: this.dynamicPage
                    }).then(response => {

                        try {

                            const {dynamics} = response.data

                            for (let i = 0; i < dynamics.length; i++) {

                                for (let j = 0; j < dynamics[i].reply.length; j++) {
                                    dynamics[i].reply[j].active = false
                                }
                            }


                            if (dynamics.length) {
                                this.dynamicPage++;
                                this.dynamics.push(...dynamics);
                                $state.loaded();
                            } else {
                                $state.complete()
                            }

                        } catch (e) {
                            throwError(e, response, this)
                        }

                    })


                }


            }
        }
    }
</script>

<style>

    .dynamic_block {
        width: 60%;
        margin: 0 auto;
    }


    .input .inputComment {
        float: right;
        width: 100%;
    }

    .input {
        margin: 10px 0;
        width: 100%;

    }


    .input .inputComment .real_btn {
        height: 95px;
        margin: 0 10px;

    }


    .input .inputComment .input_area {
        width: 85%;
        height: 100px;
        float: left;

    }

    .input_area textarea {
        resize: none !important;
    }

    .input_area .el-input__count {
        bottom: 15px !important;
    }

    .infinite-wrapper {
        overflow: auto;
    }

</style>