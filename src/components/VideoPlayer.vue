<template>
    <div>
        <div id="dplayer"/>
    </div>
</template>

<script>
    import 'dashjs'
    import DPlayer from '@/lib/DPlayer.min'
    import '@/assets/icons/iconfont.js'
    import {updateVideoViewTimes as updateVideoViewTimesApi} from "@/api/video";
    import {throwError} from "@/utils/error";


    export default {
        name: "VideoPlayer",
        props: {
            videoId: String,
            videoPicPath: String,
            videoPath: String,
            videoMaxQuality: String
        },
        data() {
            return {
                player: null
            }
        },
        methods: {
            getAdaptiveQuality() {
                let quality = []

                const qualityList = ['1920x1080', '1280x720', '640x360']

                quality.push({
                    name: '自动',
                    url: this.videoPath,
                    type: 'dash'
                });

                let flag = false;

                for (let i = 0; i <= 2; i++) {

                    if (qualityList[i] === this.videoMaxQuality) {
                        flag = true;
                    }

                    if (flag) {
                        quality.push({
                            name: qualityList[i].split("x")[1] + "p",
                            url: this.videoPath,
                            type: 'dash'
                        })
                    }


                }

                return quality;


            },
            updateVideoViewTimes() {
                updateVideoViewTimesApi({videoId: this.videoId}).then(response => {

                    try {

                        if (response.code !== 0) {
                            throwError("code err.", response, this);
                        }

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            }
        },

        mounted() {


            // eslint-disable-next-line no-undef
            this.player = new DPlayer({
                container: document.getElementById('dplayer'),
                hotkey: false,
                // subtitle: {
                //     url: 'dplayer.vtt',
                //     type: 'webvtt',
                //     fontSize: '25px',
                //     bottom: '10%',
                //     color: '#b7daff',
                // },
                danmaku: {
                    api: process.env.VUE_APP_BASE_API + '/danmaku/',
                    id: this.videoId,
                    token: this.$store.getters.token,
                    user: this.$store.getters.uid
                    // id: '9E2E3368B56CDBB4',
                    // api: 'https://api.prprpr.me/dplayer/',
                    // token: 'tokendemo',
                    // maximum: 1000,
                    // addition: ['https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142'],
                    // user: 'DIYgod',
                    // bottom: '15%',
                    // unlimited: true,
                },
                video: {
                    defaultQuality: 0,
                    // 'http://192.168.3.101:8011/player/bento4test/output/stream.mpd'
                    quality: this.getAdaptiveQuality()
                    // [
                    //     {
                    //         name: '自动',
                    //         url: this.videoPath,
                    //         type: 'dash'
                    //     },
                    //     // {
                    //     //     name: '1080p',
                    //     //     url: this.videoPath,
                    //     //     type: 'dash'
                    //     // },
                    //     {
                    //         name: '720p',
                    //         url: this.videoPath,
                    //         type: 'dash'
                    //     },
                    //     {
                    //         name: '360p',
                    //         url: this.videoPath,
                    //         type: 'dash'
                    //     },
                    //     // {
                    //     //     name: '180p',
                    //     //     url: this.videoPath,
                    //     //     type: 'dash'
                    //     // }
                    // ]
                },
                autoplay: false,
                // contextmenu: [
                //     {
                //         text: 'GitHub',
                //         link: 'https://github.com/MoePlayer/vue-dplayer'
                //     }
                // ]

            });

            let that = this;

            // window.console.log(dp.plugins.dash); // Dash 实例
            this.player.on('ended', function () {
                that.updateVideoViewTimes()
            });

        }
    }


</script>

<style scoped>

    #dplayer {
        text-align: left;
        margin: 0 auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    }


</style>