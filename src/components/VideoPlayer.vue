<template>
    <div>
        <div id="dplayer"/>
    </div>
</template>

<script>
    import 'dashjs'
    import DPlayer from '@/lib/DPlayer.min'
    import '@/assets/icons/iconfont.js'


    export default {
        name: "VideoPlayer",
        props: {
            options: {
                type: Object,
                default() {
                    return {};
                }
            },
            // videoId: Number

        },
        data() {
            return {
                player: null
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
                    quality: [
                        {
                            name: '自动',
                            url: 'http://192.168.3.101:8011/player/bento4test/output/stream.mpd',
                            type: 'dash'
                        },
                        {
                            name: '360p',
                            url: 'http://192.168.3.101:8011/player/bento4test/output/stream.mpd',
                            type: 'dash'
                        },
                        {
                            name: '180p',
                            url: 'http://192.168.3.101:8011/player/bento4test/output/stream.mpd',
                            type: 'dash'
                        }
                    ]
                },
                autoplay: false,
                // contextmenu: [
                //     {
                //         text: 'GitHub',
                //         link: 'https://github.com/MoePlayer/vue-dplayer'
                //     }
                // ]

            });
            // window.console.log(dp.plugins.dash); // Dash 实例


        }
    }


</script>

<style scoped>

    #dplayer {
        text-align: left;
        margin: 0 auto;
    }



</style>