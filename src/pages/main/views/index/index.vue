<template>
    <div>
        <HeaderWithFooter>
            <IndexSector v-for="sector in sectors" :key="sector.sectorName" :sector-name="sector.sectorName"
                         :sector-id="sector.sectorId"/>
            <img src="../../../../assets/logo.png">
            <div>
                <p>
                    If Element is successfully added to this project, you'll see an
                    <code v-text="'<el-button>'"></code>
                    below
                </p>
                <el-button>el-button</el-button>
            </div>
            <HelloWorld msg="Welcome to Your Vue.js App"/>
        </HeaderWithFooter>
    </div>
</template>

<script>
    import HelloWorld from '../../../../components/HelloWorld.vue'
    import HeaderWithFooter from "@/components/Container/HeaderWithFooter.vue";
    import IndexSector from "@/components/IndexSector";
    import {getSector as getSectorApi} from "@/api/sector";
    import {throwError} from "@/utils/error";


    export default {
        name: 'app',
        components: {
            HelloWorld,
            HeaderWithFooter,
            IndexSector
        },
        data() {
            return {
                sectors: []

            }
        },
        methods: {
            getSectors() {
                getSectorApi().then(response => {

                    try {
                        const {sectors} = response.data;
                        this.sectors = sectors;

                    } catch (e) {
                        throwError(e, response, this);
                    }


                })
            }
        },
        created() {
            this.getSectors();
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

    }
</style>
