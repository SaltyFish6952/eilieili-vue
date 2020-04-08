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
                    window.console.log(response);
                    this.sectors = response.data.sectors;
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
